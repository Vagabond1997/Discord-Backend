import express from "express";
import {jwtProtected}   from "../middleware/middleware.js"
import {defaultController,contactForm} from "../controllers/controllers.js"
import {loginUser,saveUser} from "../controllers/userController.js"
import {saveMerch,merchList,merchDetail, saveMerchOrder,updateMerchOrder} from "../controllers/merchController.js";
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
router.post('/savemerchorder',jwtProtected,saveMerchOrder);
router.put('/merch/:id',jwtProtected,updateMerchOrder);
//video details
router.post('/video',jwtProtected,saveVideo);
router.get('/videodetails/:id',videoDetail);
router.get('/video',videoList);
router.put('/updatevideo/:id',jwtProtected,updateVideo);
router.delete('/video/:id',jwtProtected,deleteVideo);
export {router};