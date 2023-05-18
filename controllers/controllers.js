import { ContactModel,BookModel,MerchlistModel } from "../database/mydb.js";
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const defaultController = (req, res) => { res.send("<h1>Hello world from the connection server</h1>") };

const contactForm = async(req, res) => {
    //getting data 
    const {firstname, lastname,phone, email,address,message} = req.body;
    // validation checking if user has not forgot to unfill the data
    if(!firstname || !lastname || !phone || !email || !address || !message) {
        return res.status(422).json({error:"Please filled the field properly"});
    }  
    try {
        // checking whether user already writing exisitng email or not 
        const userExist = await ContactModel.findOne({ email: email});

        if(userExist) {
            return res.status(422).json({error: "Email already Exist"});
        }
        //if user is not existed then 
        const Items = new ContactModel({firstname, lastname, phone, email, address, message});

        const contact = await Items.save();
        if(contact) {
            let emailData = {
                email:email,
                name:firstname,
                phone:phone,
                address:address,
                message:message,
                subject:"Contact Form Recieved"  

            }
            await sendEmail(emailData);
            res.status(201).json({message: "user registered successfully"});
        } else {
            res.status(500).json({error: "Failed to registered"});
        }

    } catch (err){ 
        console.log(err);

    }
    
}

const sendEmail = async(emailData) => {
    // let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      // to connect with smtp 
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: `${process.env.SMTP_EMAILID}`, // generated ethereal user
            pass: "ycyigsvixklhkdmo", // generated ethereal password
        },
    });
    console.log("env file",process.env.SMTP_EMAILID);

    var mailOptions = {
        // sender info
        from: '"Admin" <kojumanish@gmail.com>',
        to: 'jaman.centrix@gmail.com',
        subject: emailData.subject,
        text: `Dear Admin, We have received new contact \n\n Name:${emailData.name}\n\n Email: ${emailData.email} \n\n Phone: ${emailData.phone}  \n\n Address: ${emailData.address} \n\n Message: ${emailData.message}
        \n\n Regards,\n Discord `,
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

export {defaultController,contactForm};