import songModel from "../models/songModel.js";
import {v2 as cloudinary} from 'cloudinary';


export const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"})
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})

        // console.log(name, desc, album, audioUpload, imageUpload);
        const duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(audioUpload.duration % 60)}`
        
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }
        
        const song = songModel(songData)
        await song.save();
        res.json({
            success: true,
            message: "Song Added!"
        })
        
    } catch (error) {
        console.log("Error in addSong Controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({})

        res.json({
            success: true,
            message: "List Songs",
            songs: allSongs
        })
        
    } catch (error) {
        console.log("Error in listSong Controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const removeSong = async (req, res) => {
    try {
        const {id} = req.body
        console.log(id);
        
         const result = await songModel.findByIdAndDelete(id)
         console.log(result);
         
        res.json({
            success: true,
            message: "Remove Songs",
         
        })
        
    } catch (error) {
        console.log("Error in removeSong Controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}


