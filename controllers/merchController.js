import {MerchlistModel,BookModel} from "../database/mydb.js";
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

//creating a new merch
const saveMerch = async (req, res) => {
    //getting data
  const { name, category, amount, image, images, color, company } = req.body;
  if(!name){
    return res.status(422).json({ error: "Name field is required" });
  }
  // validation checking if user has not forgot to unfill the data
  if (
    !name ||
    !category ||
    !amount ||
    !image ||
    !images ||
    !color ||
    !company
  ) {
    return res.status(422).json({ error: "Please filled the field properly" });
  }

  try {
    //get all products

    const Merches = new MerchlistModel({
      name,
      category,
      amount,
      image,
      images,
      company,
      color,
    });

    const merchRegister = await Merches.save();
    
    if (merchRegister) {
      res.status(201).json({ message: "Sucessfully created" });
    } else {
      res.status(500).json({ error: "Failed" });
    }
  } catch (err) {
    console.log(err);
  }
};
//list all created merch
const merchList = async (req, res) => {
   try {
    let merchData= await MerchlistModel.find({});
     res.status(200).json({merch:merchData});
   }
   catch (err){
    console.log(err);
   }
};

//merch detail
const merchDetail = async (req, res) => {
   try{
       let merchId = req.params.id;
        if(merchId){
            let merchDetails = await MerchlistModel.findOne({_id:merchId});
            res.status(200).json(merchDetails);
        } else {
            res.status(203).json({message:"Merch id is required"})
        }
   }catch(err) {
        console.log(err)

        res.status(500).json({message:err})
    }
};

//save merch order 
const saveMerchOrder = async(req,res) => {
   //getting data
   const {merch_id,name,email,address,color,size,phone,remarks,quantity} = req.body;

   // validation checking if user has not forgot to unfill the data
   if (
    !merch_id ||
     !name ||
     !email ||
     !address ||
     !color ||
     !size ||
     !phone ||
     !remarks ||
     !quantity

   ) {
     return res.status(422).json({ error: "Please filled the field properly" });
   }
 
   try {
     //get all products
     const MerchId = await MerchlistModel.findOne({_id:merch_id});
      if(!MerchId){
        res.status(203).json({message: "MerchId not found."});
      } 
      let total_amount = MerchId.amount*quantity;
     const Merches = new BookModel({
      merch_id, 
      name,
       email,
       address,
       color,
       size,
       phone,
       remarks,
       quantity,
       total_amount
     });
 
     const merchBooking = await Merches.save();
     if (merchBooking) { 
     let emailData = {
      email:email,
      name:name,
      phone:phone,
      merch_id:merch_id,
    merchname:MerchId.name,
      size:size,
      color:color,
      total_amount:total_amount,
      address:address,
      remarks:remarks,
      subject:"MerchOrder Form Recieved"  

     }
     await sendEmail(emailData);
       res.status(201).json({ message: "Sucessfully created" });
     } else {
       res.status(500).json({ error: "Failed" });
     }
   } catch (err) {
     console.log(err);
     res.status(500).json({ error: err.message });

   }
 };

 
const sendEmail = async(emailData) => {
  // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // to connect with smtp 
  let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: "jaman.centrix@gmail.com", // generated ethereal user
          pass: "ycyigsvixklhkdmo", // generated ethereal password
      },
  });

  var mailOptions = {
      // sender info
      from: '"Admin" <kojumanish@gmail.com>',
      to: 'jaman.centrix@gmail.com',
      subject: emailData.subject,
      text: `Dear Admin, We have received new merchorder. \n\n Name:${emailData.name}\n\n Email: ${emailData.email} \n\n Phone: ${emailData.phone} \n\n MerchName: ${emailData.merchname}  \n\n Color: ${emailData.color}
      \n\n Size: ${emailData.size}  \n\n Totalamount: ${emailData.total_amount} \n\n Remarks: ${emailData.remarks}     \n\n Regards,\n Discord `,
  };
  transport.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log('error',error);
      } else {
          console.log('Message sent: ' + info);
          transport.close();
      }
  })
}

 //update merch order 
 const updateMerchOrder = async(req,res) => {
  try {
    let updateId = req.params.id;
    //get merch by id
    let merch = await MerchlistModel.findOne({_id:updateId});
    if(!merch){
      // message response no merch found
      return res.status(203).json({message:"No Merch Found!"}); 
    }
    if(req.body.name){
      merch.name = req.body.name;
    }
    if(req.body.category){
      merch.category = req.body.category;
    }
    if(req.body.color){
      merch.color = req.body.color;
    }
    if(req.body.amount){
      merch.amount = req.body.amount;
    }
    if(req.body.remarks){
      merch.remarks = req.body.remarks;
    }
    if(req.body.company){
      merch.company=req.body.company;
    }
 
    await merch.save();
    return res.status(200).json({message:"The merch has been updated",merch});
}
catch(err){
  return res.status(500).json({message: err});
}
}
 


export {saveMerch,merchList,merchDetail,saveMerchOrder,updateMerchOrder};
