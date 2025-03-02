import albumModel from "../models/albumModel.js";
import {v2 as cloudinary} from 'cloudinary';

export const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})

        // console.log(name, desc, album, audioUpload, imageUpload);
        
        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url,
        }
        
        const album = albumModel(albumData)
        await album.save();
        res.json({
            success: true,
            message: "Album Added!"
        })
        
    } catch (error) {
        console.log("Error in addAlbum Controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({})

        res.json({
            success: true,
            message: "List Album",
            albums: allAlbums
        })
        
    } catch (error) {
        console.log("Error in listAlbum Controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const removeAlbum = async (req, res) => {
    try {
         await albumModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Remove Album",
         
        })
        
    } catch (error) {
        console.log("Error in removeSong Controller");
        res.json({
            success: false,
            message: error.message
        })
    }
}