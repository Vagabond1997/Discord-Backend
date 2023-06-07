import {UserModel} from "../database/mydb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import bodyParser from "body-parser";

const saveUser = async (req, res) => {
  //getting data
  const { firstname, lastname, email, phone,password} = req.body;
 

  // validation checking if user has not forgot to unfill the data
  if (!firstname || !lastname || !email || !phone  || !password) {
    return res.status(422).json({ error: "Please filled the field properly" });
  }

  try {
    const userExist = await UserModel.findOne({ email: email});

    if(userExist) {
        return res.status(422).json({error: "Email already Exist"});
    }
    // } else if (password !== cpassword) {
    //    return res.status(422).json({error:"Password are not matching"});
    // }
    const Users = new UserModel({
      firstname,
      lastname,
      email,
      phone,
      password,
      username:firstname.trim().toLowerCase()+lastname.trim().toLowerCase()
    });
    const userRegister = await Users.save();

    if (userRegister) {
      res.status(201).json({ message: "Sucessfully created" });
    } else {
      res.status(500).json({ error: "Failed" });
    }
  } catch (err) {
    console.log(err);
  }
};


const loginUser = async (req, res) => {
  let token;
    //getting data
    const {email,password} = req.body;
    // console.log("request",req.body);
//    validation checking if user has not forgot to unfill the data
    if (!email || !password ) {
      return res.status(422).json({ error: "Please filled the field properly" });
    }
  
    try {
      const userloginExist = await UserModel.findOne({ email: email});
    //   console.log(userloginExist);
    //   res.json({message: "user sigin successfully"});

    if(userloginExist) {
       //using bcrypt compare for comparing database password and user password 
       const checkPassword = await bcrypt.compare(password,userloginExist.password);
       if(checkPassword){
         const token = await userloginExist.generateAuthToken();
        //  console.log('token',userloginExist);
         //storing token into 0cookies 
  
        //  res.cookie("jwtoken", token, {
        //   expires:new Date(Date.now() + 25892000000),
        //   httpOnly: true
        //  })
         let userData = {
          token:token,
          email:userloginExist.email,
          username:userloginExist.username
         }
         
        res.status(201).json({ message: "User created Successfully!",data:userData });
       } else {
        res.status(400).json({ error: "Error Credentials Pass!" });
       }

    } else {
      res.status(400).json({ error: "User Not Exist!" });
    }
    } catch (err) {
      console.log(err);
    }
  };
  

export {saveUser,loginUser};