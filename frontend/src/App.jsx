import { useEffect, useState } from 'react';
import { getSongs } from './services/songsApi';

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
    <div>
      <h1>Music App</h1>

      {songs.map((song) => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <p>{song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default App;