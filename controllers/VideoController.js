import {VideoModel} from "../database/mydb.js";

const saveVideo = async(req,res) => {
    const{title,url} = req.body;

    if(!title || !url) {
        return res.status(422).json({message:"Please fill the field properly"});
    }

    try {
        const Videos = new VideoModel({title,url});

        const VideoRegister = await Videos.save();
        if(VideoRegister) {
            return res.status(201).json({message:"Successfully Created!"});
        } else {
            return res.status(500).json({message:"Failed"});
        }
    }
        catch(err) {
            console.log(err);
        }
}

const videoList = async(req,res) => {
    try {
        let videoData = await VideoModel.find({});
        return res.status(200).json({videoData});
    }
    catch(err){
        console.log(err);
    }
};


const videoDetail = async(req,res) => {
    try {
        let videoId = req.params.id;
        //1st step console.log(req.params);
        //declare variable as let 

        if(videoId) {
            let videoDetails = await VideoModel.findOne({_id:videoId});
            return res.status(200).json(videoDetails);
        }
        else {
           return  res.status(203).json({message:"videoID is required"});
        }
    }
    catch(err) {
       return  res.status(500).json({message:err})
    }
}

 // Update video 
 const updateVideo = async(req,res) => {
    try {
          let updateId = req.params.id;
          if(updateId) {
            let updateVideo = await VideoModel.updateOne({_id:updateId}, {
                $set: {
                    title:req.body.title,
                    url:req.body.url
                }

            }
            );
            return res.status(200).json({updateVideo});
          }
          else {
            return res.status(203).json({message:"updateId is required"});
          }
    }
    catch(err){
        return res.status(500).json({message: err})
    }
 }
// delete 
const deleteVideo = async(req,res) => {
    // console.log("delete called");
    try {
        let deleteId = req.params.id;
        if(deleteId) {
            let deleteVideo = await VideoModel.deleteOne({_id:deleteId});
            return res.status(200).json({deleteVideo});
        }

        else {
            return res.status(203).json({message:"deleteId is required"});
        }
    }
    catch(err) {
        return res.status(500).json({message:err});
    }
}

export {saveVideo,videoList,videoDetail,updateVideo,deleteVideo};