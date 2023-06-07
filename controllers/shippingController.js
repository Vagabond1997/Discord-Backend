//save ShippingOrder 
import  {ShippingModel} from "../database/mydb.js";

const shippingOrder = async(req,res) => {
try {
let user_id = req.user._id;
let phone = req.body.phone;
let city = req.body.city;
let address = req.body.address;
let landmark = req.body.landmark;

if(!address || !price) {
    return res.status(422).json({ error: "Please filled the field properly" });
}

const Shipping = new ShippingModel({
    address,
    price,
})
const shippingRegister = await Shipping.save();
if (shippingRegister) {
    res.status(201).json({ message: "Sucessfully created" });
  } else {
    res.status(500).json({ error: "Failed" });
  }
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message:err})
    }


}
export {shippingOrder};