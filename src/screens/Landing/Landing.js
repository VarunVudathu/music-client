import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const CLIENT_ID = "9e479da222af4dc19da03d2bc5fdfe9c"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const navigate = useNavigate();

  const [token, setToken] = useState("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    
    setToken(token)
  })

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
      <div className="loginArea">
        <div className="inLogin">
          {!token ? 
            <p className="title">Log In to <br></br>Music</p>
            : <p className="title">Select a Mode for <br></br>Music</p>
          }
          {token ?
            <div className="optionsCont">
              {/* <button className="options" onClick={() => navigate("/jukebox")}>Jukebox</button>
              <button className="options" onClick={() => navigate("/recs")}>Recs</button>
              <button className="options" onClick={() => navigate("/shazam")}>Shazam</button> */}
            <nav class="menu">
              <input checked="checked" class="menu-toggler" type="checkbox" />
              <label for="menu-toggler"></label>
              <ul>
                <li class="menu-item">
                  <a onClick={() => navigate("/jukebox")}></a>
                </li>
                <li class="menu-item">
                  <a onClick={() => navigate("/recs")}></a>
                </li>
                <li class="menu-item">
                  <a onClick={() => navigate("/shazam")}></a>
                </li>
                <li class="menu-item">
                  <a class="fab fa-fly"href="#"></a>
                </li>
                <li class="menu-item">
                  <a href="#"></a>
                </li>
                <li class="menu-item">
                  <a href="#"></a>
                </li>
              </ul>
            </nav>
            </div>
            : <p> </p>
          }
          {!token ? 
            <a className="loginBtn" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> 
            : <button className="logoutBtn" onClick={logout}>Logout</button>
          }
        </div>
      </div>
  );
}

export default Landing;
