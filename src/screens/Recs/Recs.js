import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Recs.css';

function Recs() {
    const [searchKey, setSearchKey] = useState("")
    const [track, setTrack] = useState([])
    const token = window.localStorage.getItem("token");
    const options = ["country", "pop", "hip-hop", "classical", "anime", "edm", "jazz", "indian", "rock"];
    const defaultOption = "Choose"
    const navigate = useNavigate();

    const getRecs = async (e) => {
        const {data} = await axios.get("https://api.spotify.com/v1/recommendations", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit: 5,
                seed_genres: searchKey
            }
        })
        setTrack(data.tracks)
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
                  <button className="addBtn" onClick={() => {}}>Add</button>
                </div>
            </div>
        ))
    }
    return (
      <div className="recArea">
        <div className="inRec">
            <h1>Reccomendations</h1>
          <button className="backBtn" onClick={() => navigate("/")}>Back</button>
          <Dropdown options={options} onChange={(e) => {setSearchKey(e.label)}} value={defaultOption} placeholder="Select an option" />
          <button className="backBtn" onClick={() => getRecs()}>Submit</button>
          <div>
            {renderTracks()}
          </div>
        </div>
      </div>
    );
}

export default Recs;