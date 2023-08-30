import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './screens/Landing/Landing'
import Jukebox from './screens/Jukebox/Jukebox';
import Recs from './screens/Recs/Recs';
import Shazam from './screens/Shazam/Shazam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <Landing/> } />
        <Route path="jukebox" element={ <Jukebox/> } />
        <Route path="recs" element={ <Recs/> } />
        <Route path="shazam" element={ <Shazam/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
