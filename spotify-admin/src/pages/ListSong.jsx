
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import { backendUrl } from '../App'

const ListSong = () => {
    const [data, setData] = useState([])

    const fetchSongs = async () => {
 
        try {

            const response = await axios.get(backendUrl + '/api/song/list')
            // console.log(response);
            if(response.data.success){
                // toast.success("Song Listed")
                setData(response.data.songs)
            } else {
                toast.error("Error Ocureed in Song Listed")
            }
         
        } catch (error) {
         console.log(error);
         toast.error(error.message)
        }
     }

     const removeSong = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/song/remove', {id})
            // console.log(response);
            if(response.data.success){
                toast.success(response.data.message)
                // setData(response.data.songs)
                await fetchSongs();
            } else {
                toast.error("Error Ocureed in Removed Song")
            }
         
        } catch (error) {
         console.log(error);
         toast.error(error.message)
        }
        // setLoading(false)
     }

     useEffect(() => {
        fetchSongs()
     }, [])

  return (
    <div>
        <p>All Songs List</p>
        <br />
        <div>
            <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                <b>Name</b>
                <b>Album</b>
                <b>Duration</b>
                <b>Action</b>
            </div>
            {
                data.map((item, index) => {
                    return (<div className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' key={index}>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <p onClick={() => removeSong(item._id)} className='cursor-pointer'>X</p>

                    </div>)
                })
            }
        </div>
    </div>
  )
}

export default ListSong