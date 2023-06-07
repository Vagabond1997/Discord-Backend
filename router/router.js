import express from "express";
//admin bro setup 


import {jwtProtected}   from "../middleware/middleware.js";
import {defaultController,contactForm} from "../controllers/controllers.js";
import { shippingOrder } from "../controllers/shippingController.js";
import {merchOrder,orderList} from "../controllers/merchOrderController.js";
import {loginUser,saveUser} from "../controllers/userController.js"
import { addToCart,cartList,deleteList } from "../controllers/cartController.js";
import {saveMerch,merchList,merchDetail, saveMerchOrder,updateMerch} from "../controllers/merchController.js";
import { saveVideo, videoDetail,videoList,updateVideo,deleteVideo } from "../controllers/VideoController.js";
const router = express.Router();
router.get('/', defaultController);
router.post('/contact',contactForm);
//user details 
router.post('/register',saveUser);
router.post('/login',loginUser);
//merch details
router.post('/merch',saveMerch);
router.get('/merchdetails/:id',merchDetail);
router.get('/merch',merchList);
router.post('/savemerchorder',saveMerchOrder);
router.put('/merch/:id',jwtProtected,updateMerch);
//video details
router.post('/video',jwtProtected,saveVideo);
router.get('/videodetails/:id',videoDetail);
router.get('/video',videoList);
router.put('/updatevideo/:id',jwtProtected,updateVideo);
router.delete('/video/:id',jwtProtected,deleteVideo);
//cart details 
router.post('/addtocart',jwtProtected,addToCart);
router.get('/cartlist',jwtProtected,cartList);
router.delete('/deletelist',jwtProtected,deleteList);
// add to cart merch order details
router.post('/merchorder',jwtProtected,merchOrder); 
router.get('/merchorderlist',jwtProtected,orderList);
//user shipping details 
// router.post('/shippingorder',jwtProtected,shippingOrder);
export {router};