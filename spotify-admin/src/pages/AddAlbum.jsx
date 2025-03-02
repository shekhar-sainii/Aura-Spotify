import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { backendUrl } from '../App'

const AddAlbum = () => {

    const [image, setImage] = useState(false)
    const [colour, setColour] = useState("#ffffff")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [loading, setLoading] = useState(false)
    // const [albumData, setAlbumData] = useState([])


    const onSubmithandler = async (e) => {
        e.preventDefault();
        setLoading(true)
 
        try {
         const formData = new FormData();
         formData.append('name', name)
         formData.append('desc', desc)
         formData.append('image', image)
         formData.append('bgColour', colour)
 
 
         const response = await axios.post(backendUrl + '/api/album/add', formData)
         // console.log(response);
         if(response.data.success){
             toast.success("Album Added")
             setName("")
             setDesc("")
             setImage(false)
             
         } else {
             toast.error("Error Ocureed in Album Add")
         }
         
        } catch (error) {
         console.log(error);
         toast.error(error.message)
        }
        setLoading(false)
     }

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
        <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onSubmithandler} className='flex flex-col items-start gap-8 text-gray-600'>
        <div className='flex flex-col gap-4 '>
            <p>Update Image</p>
            <input onChange={(e) => setImage(e.target.files[0])}
             type="file" id='image' accept='image/*' hidden/>
            <label htmlFor="image">
                <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
        </div>

        <div className='flex flex-col gap-2.5 '>
            <p>Album name</p>
            <input onChange={(e) => setName(e.target.value)} 
                value={name}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='Type here..' required/>
        </div>
        <div className='flex flex-col gap-2.5 '>
            <p>Album Description</p>
            <input onChange={(e) => setDesc(e.target.value)} 
                value={desc}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='Type here..' required/>
        </div>
        <div className='flex flex-col gap-3 '>
            <p>Background Color</p>
            <input onChange={(e) => setColour(e.target.value)}
            value={colour}
             type="color" placeholder='Type here..' required/>
        </div>

        <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>Add</button>
    </form>
  )
}

export default AddAlbum