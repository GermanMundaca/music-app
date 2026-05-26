import { useEffect, useState } from 'react';
import { getSongs } from './services/songsApi';
import SongCard from './components/SongCard';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      const data = await getSongs();
      setSongs(data);
    };

    loadSongs();
  }, []);

  return (
    <div className="container">
      <h1>Music App</h1>

      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default App;