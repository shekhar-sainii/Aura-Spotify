
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import { backendUrl } from '../App'

const ListAlbum = () => {
    const [data, setData] = useState([])

    const fetchAlbums = async () => {
 
        try {

            const response = await axios.get(backendUrl + '/api/album/list')
            if(response.data.success){
                setData(response.data.albums)
            } else {
                toast.error("Error Ocureed in Album Listed")
            }
         
        } catch (error) {
         console.log(error);
         toast.error(error.message)
        }
     }

     const removeAlbum = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/album/remove', {id})
            // console.log(response);
            if(response.data.success){
                toast.success(response.data.message)
                // setData(response.data.songs)
                await fetchAlbums();
            } else {
                toast.error("Error Ocureed in Removed Album")
            }
         
        } catch (error) {
         console.log(error);
         toast.error(error.message)
        }
     }

     useEffect(() => {
        fetchAlbums()
     }, [])


  return (
    <div>
        <p>All Album List</p>
        <br />
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                <b>Name</b>
                <b>Description</b>
                <b>Album Colour</b>
                <b>Action</b>
        </div>
        {
                data.map((item, index) => {
                    return (<div className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' key={index}>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColour} readOnly />
                            <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>X</p>
                    </div>)
                })
        }
    </div>
  )
}

export default ListAlbum