import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([])

    const [track, setTrack] = useState(songsData[0])
    const [playerStatus, setPlayerStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayerStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(false);
    }

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item);
            }
        })
        await audioRef.current.play();
        setPlayerStatus(true)
    }

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (item._id === track._id && index > 0) {
                await setTrack(songsData[index - 1])
                await audioRef.current.play()
                setPlayerStatus(true)
            }
        })
        //    if(track.id > 0){
        //     await setTrack(songsData[track.id - 1])
        //     await audioRef.current.play()
        //     setPlayerStatus(true)
        //    } 
    }

    const next = async () => {
        songsData.map(async (item, index) => {
            if (item._id === track._id && index < songsData.length) {
                await setTrack(songsData[index + 1])
                await audioRef.current.play()
                setPlayerStatus(true)
            }
        })
        // if(track.id < songsData.length - 1){
        //  await setTrack(songsData[track.id + 1])
        //  await audioRef.current.play()
        //  setPlayerStatus(true)
        // } 
    }

    const seekSong = async (e) => {
        //    console.log(e);
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getsSongsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/song/list')
            if (response.data.success) {
                setSongsData(response.data.songs)
                setTrack(response.data.songs[0])
            } else {
                console.log("Error Ocureed in Song Listed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAlbumData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/album/list')
            if (response.data.success) {
                setAlbumsData(response.data.albums)
            } else {
                console.log("Error Ocureed in Album Listed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getsSongsData()
        getAlbumData()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData, albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider