import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


mongoose.connect('mongodb://localhost:27017/apidb3')
    .then(()=> console.log('Mongodb connected sucessfully'))
    .catch((err)=> console.log(err));
 
    const contactSchema = new mongoose.Schema({
        firstname: {type: String, required: true, trim: true},
       lastname: {type: String, required: true, trim: true},
        email: {type: String, required: false, trim: true},
        address: {type: String, required: true, trim: true},
        message: {type: String, required: true, trim: true},
    });
    
    const ContactModel = mongoose.model('contacts', contactSchema);


             

    const videoSchema = new mongoose.Schema({
        title: {type: String, required: true, trim: true},
        url: {type: String, required: true, trim: true}
    });
    
    const VideoModel = mongoose.model('videos', videoSchema);

    const bookingSchema = new mongoose.Schema({
        merch_id: {type: String, required: true, trim: true},
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true},
        address: {type: String, required: false, trim: true},
        color: {type: String, required: false, trim: true},
        size: {type: String, required: false, trim: true},
        phone: {type: String, required: false, trim: true},
        total_amount: {type: String, required: false, trim: true},
        quantity: {type: String, required: false, trim: true}
    });
    
    const BookModel = mongoose.model('books', bookingSchema);

    const merchandizeSchema = new mongoose.Schema({
        name: {type: String, required: true, trim: true},
        category: {type: String, required: true, trim: true},
        amount: {type: String, required: false, trim: true},
        image: {type: String, required: true, trim: true},
        images: {type: String, required: true, trim: true},
        color: {type: Array, required: false, trim: true},
        company: {type: String, required: true, trim: true},
        
    });
    
    const MerchlistModel = mongoose.model('merches', merchandizeSchema);

    
    const userSchema = new mongoose.Schema({
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true},
        phone: {type: String, required: true, trim: true},
        username: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        cpassword: {type: String, required: true, trim: true},
        role:{type:String, default:'general',trim:true},
        tokens: [
            {
              token: {
                type: String,
                required:true
              }      
        }
    ]
    });

    //hashing password 
    userSchema.pre('save',async function (next) {
        console.log("it is running up to here");
        if(this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = await bcrypt.hash(this.cpassword, 12);
        }
        next();
    });
    
       // we are generating token 
      userSchema.methods.generateAuthToken = async function (req,res) {
        try {
            let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;
        }  catch(err) {
            console.log(err);
        }
      }

    const UserModel = mongoose.model('users', userSchema);
    
    export {ContactModel,BookModel,VideoModel,MerchlistModel,UserModel};