import express from "express";
import {defaultController,contactForm} from "../controllers/controllers.js"
import {loginUser,saveUser} from "../controllers/userController.js"
import {saveMerch,merchList,merchDetail, saveMerchOrder,updateMerchOrder} from "../controllers/merchController.js";
import { saveVideo, videoDetail,videoList,updateVideo,deleteVideo } from "../controllers/VideoController.js";
const router = express.Router();
router.get('/', defaultController);
router.post('/contact',contactForm);
//user details 
router.post('/register',saveUser);
router.post('/signin',loginUser);
//merch details
router.post('/merch',saveMerch);
router.get('/merchdetails/:id',merchDetail);
router.get('/merch',merchList);
router.post('/savemerchorder',saveMerchOrder);
router.put('/merch/:id',updateMerchOrder);
//video details
router.post('/video',saveVideo);
router.get('/videodetails/:id',videoDetail);
router.get('/video',videoList);
router.put('/updatevideo/:id',updateVideo);
router.delete('/video/:id',deleteVideo);
export {router};