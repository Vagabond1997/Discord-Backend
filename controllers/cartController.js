import  {CartModel,UserModel,MerchlistModel} from "../database/mydb.js";

const addToCart = async (req, res) => {
    try {   
      // console.log('requestuser',req.user);
      const authUser = req.user._id;
    //   const { merch_id, user_id, color, quantity } = req.body;
      let merch_id = req.body.merch_id;
      //get merch details by merch id 
      //get price of merch id 
      // from the MerchlistModel collection using findOne. It searches for a document with the specified merch_id (assuming merch_id is a valid identifier) and selects only the amount field from that document.
      const merch_amount = await MerchlistModel.findOne({ _id:merch_id}).select("amount");
      // If a merch_amount is found, proceed with the following code...
      if(merch_amount){
        let user_id = authUser;
        let quantity = req.body.quantity;
        let color = req.body.color;
        let size = req.body.size;
        let total_amount = merch_amount.amount*quantity;
        const query = {merch_id,user_id};
        const update = { $set: {quantity,color,size,total_amount:total_amount,amount:merch_amount.amount}};
        const options = { upsert: true };
        await CartModel.updateOne(query, update, options);
    
     return res.status(201).json({message:"Merch Added to Cart Successfully"});
      }
      // calculation price * quantity 
    } catch (error) {
        console.log(error)
     return res.status(500).json({ error: 'Failed to add item to cart' });
    }
 };
  
  

  // list 
 //1.cart list by user . (user id anusar)
 //2. list ma product ko price tanne look for mongo populated 
 //3. 
  
  // list all
const cartList = async (req, res) => {
  
   try {
    let cartdataList= await CartModel.find({user_id:req.user._id}).populate({
      path:"merch_id",
      select:{"_id":1,"name":1,"amount":1,"image":1,"size":1,"color":1}
    });
    //for subtotal of list 
    let cartTotal = 0
    if(cartdataList.length > 0) {
      for(let item of cartdataList){
        cartTotal += Number(item.total_amount);
      }
    }
    return  res.status(200).json({cartdataList,cartTotal});
   }
   catch (err){
    console.log(err);
    return res.status(500).json({message:err})
   }
};

// delete 
const deleteList = async (req,res) => {
  try {
    let deleteId = req.body._id;
    if(deleteId) {
        let deleteItem = await CartModel.deleteOne({_id:deleteId});
        return res.status(200).json({message:"Item has been deleted."});
    }

    else {
        return res.status(203).json({message:"deleteId is required"});
    }
}
catch(err) {
    return res.status(500).json({message:err});
}
}


export {addToCart,cartList,deleteList};








  