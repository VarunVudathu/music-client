import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Jukebox.css';

function Jukebox() {
    const [searchKey, setSearchKey] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [track, setTrack] = useState([])
    const [queue, setQueue] = useState([])
    const [host, setHost] = useState("");
    const token = window.localStorage.getItem("token");
    const navigate = useNavigate();

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track",
                limit: 5
            }
        })
        setTrack(data.tracks.items)
    }

    const renderTracks = () => {
        return track.map(track => (
            <div className="trackData" key={track.id}>
                <div className="trackImg">
                  {track.album.images.length ? <img width={"100%"} src={track.album.images[2].url} alt=""/> : <div>No Image</div>}
                </div>
                <div className="trackItems">
                  <div className="trackInfo">
                    <span>{track.name}</span>
                    <span>{track.artists[0].name}</span>
                  </div>
                  <button className="addBtn" onClick={() => {setQueue(queue.concat([{"id":track.id, "img":track.album.images[2].url, "track_name":track.name, "artist_name": track.artists[0].name}]))}}>Add</button>
                </div>
            </div>
        ))
    }

    const renderQueue = () => {
        return queue.map(song => (
            <div className="trackData" key={song.id}>
                <div className="trackImg">
                  <img width={"100%"} src={song.img} alt=""/>
                </div>
                <div className="trackInfo">
                  <span>{song.track_name}</span>
                  <span>{song.artist_name}</span>
                </div>
            </div>
        ))
    }

    const startSession = () => {
        const code = uuidv4()
        console.log(code);
        setHost(code)
    }

    return (
            <div className="container">
                <div className="allArea">
                    <div className="titleInfo">
                        <div className="titleTop">
                            <h1>Jukebox</h1>
                        </div>
                        <button className="backBtn" onClick={() => navigate("/")}>Back</button>
                    </div>
                    {host ?
                        <div className="infoArea">
                            <div className="inArea">
                                <h2>Search Song</h2>
                                <form onSubmit={searchArtists}>
                                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                                    <br></br>
                                    <button className="searchBtn" type="submit">Search</button>
                                </form>
                                <div className="trackLoc">
                                    {renderTracks()}
                                </div>
                            </div>
                            <div className="inArea">
                                <h2>Songs In Queue</h2>
                                <div className="trackPlace">
                                    {renderQueue()}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="infoArea">
                            <div className="inArea">
                                <h2>Join Host</h2>
                                <input id="hostId" type="text"/>
                                <br></br>
                                <button className="searchBtn" onClick={() => {setHost(document.getElementById("hostId").value)}}>Join</button>
                            </div>
                            <div className="inArea">
                                <h2>Start a Session</h2>
                                <button className="searchBtn" onClick={startSession}>Start</button>
                            </div>
                        </div>
                    }
                </div>  
            </div>
    );
}

export default Jukebox;