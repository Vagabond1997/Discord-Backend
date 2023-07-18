import {
  MerchOrderModel,
  MerchItemOrderModel,
  CartModel,
  ShippingModel,
  MerchlistModel,
} from "../database/mydb.js";
// save merchOrder
const merchOrder = async (req, res) => {
  try {
    let cartId = req.body.cart_id;
    let user_id = req.user._id;
    let phone = req.body.shipping_details.phone;
    let city = req.body.shipping_details.city;
    let address = req.body.shipping_details.address;
    let landmark = req.body.shipping_details.landmark;
    if (!phone || !city || !address || !landmark) {
      return res
        .status(422)
        .json({ error: "Please filled the field properly" });
    }
    //
    const Shipping = new ShippingModel({
      user_id: user_id,
      phone: phone,
      city: city,
      address: address,
      landmark: landmark,
    });
    const shippingRegister = await Shipping.save();
    if (shippingRegister) {
      let orderItems = [];
      let totalPrice = 0;
      let cartIdList = await CartModel.find({ _id: { $in: cartId } });
      // console.log('cartIdList',cartIdList);
      // return res.status(201) .json({data:cartIdList});
      cartIdList.forEach((item) => {
        totalPrice += Number(item.total_amount);
      });
      //save to merch order schema with field user_id and total_amount
      const Merches = new MerchOrderModel({
        user_id: req.user._id,
        total_amount: totalPrice,
      });
      const merchRegister = await Merches.save();
      cartIdList.forEach((item) => {
        orderItems.push({
          order_id: merchRegister._id.toString(),
          merch_id: item.merch_id,
          quantity: item.quantity,
          total_amount: item.total_amount,
        });
      });
      const merchOrderItems = await MerchItemOrderModel.insertMany(orderItems);
      const deletemerchOrderItems = await CartModel.deleteMany({
        _id: cartId,
      });
      return res.status(201).json({ merchOrderItems }); //201 means database ma create vayeko
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

//list order and orderitems

const orderList = async (req, res) => {
  try {
    let products = [];
    let orderDataList = await MerchItemOrderModel.aggregate([
      {
        $group: { _id: "$order_id", order_items: { $push: "$$ROOT" } },
      },
    ])
    // .exec(function (error, result) {
    //   for(let element of result){
    //     for(let item of element.order_items){
    //       MerchItemOrderModel.findOne({ _id: item._id })
    //         .populate("merch_id")
    //         .then((product) => {
    //           products.push(product);
    //           return item.merch_id = product;
    //         });
    //     }
    //   }
    // });
    // orderDataList.forEach(element => {

    // ,function( e, result ) {
    //   if ( e ) return;
    //   // You would probably have to do some loop here, as probably 'result' is array
    //   if(result.length > 0 ){
    //     result.forEach( (order,orderKey) => {
    //         order.order_items.forEach( (orderItem,orderItemKey) => {
    //         MerchlistModel.findOne( {_id : orderItem.merch_id}, function( e, merch ) {
    //           if ( e ) return;
    //           return result[orderKey].order_items[orderItemKey].merch_id = 22;
    //         });
    //       });
    //     });
    //   }
    // }
    // console.log('item',products);
    return res.status(200).json({ orderDataList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
export { merchOrder, orderList };

// console.log('request-user',req.user);

//    console.log('merchRegister',merchRegister._id);
//    console.log('merchRegister',Merches.user_id);

//    return res.status(201) .json({cartIdList,orderItems,totalPrice});

//get id of recently created order and insert multiple records in merch order item table with order id
// let order_id = merchRegister;
// console.log('order_id',order_id._id.toString());
// delete record from add to cart

//   return res.status(201) .json({cartIdList,orderItems,totalPrice});

//     if(cartIdList.length > 0) {
//         for (let item of cartIdList) {
//             merch_id=item.merch_id,
//             quantity=item.quantity,
//             total_amount=item.total_amount * item.quantity;

//     orderItems.push({
//         merch_id:merch_id,
//         quantity:quantity,
//         total_amount:total_amount
// }) ;

// }
// totalPrice += total_amount;

// }
//  return res.status(201) .json({cartIdList,totalPrice});
// array banauney loop lagauney tesko total amount quantity push garney

//    console.log('req',req.body);
//     return res.json({aasda:"asdasd"})
//     let user_id = req.body.user_id;
// let total_amount = req.body.total_amount;
//    try {
//     let user_id = req.user._id;
//     let total_amount = req.body.total_amount;
//    }
//    catch {

//    }
