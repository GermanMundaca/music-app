import { useEffect, useState } from 'react';
import { getSongs, createSong, deleteSong } from './services/songsApi';

import SongCard from './components/SongCard';
import SongForm from './components/SongForm';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      const data = await getSongs();
      setSongs(data);
    };

    loadSongs();
  }, []);

  const handleAddSong = async (songData) => {
    
    const newSong = await createSong(songData);//los datos viajan hacia el backend a través del servicio

    setSongs([...songs, newSong]); // se actualiza la pantalla con lo que devolvió el backend
  };

  const handleDeleteSong = async(id) =>{
     await deleteSong(id);
  setSongs(
    songs.filter((song)=> song.id !== id)
  );
  };

  return (
    <div className="container">
      <h1>Music App</h1>

        <SongForm onAddSong={handleAddSong} />

      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard key={song.id} 
          song={song} 
          onDelete={handleDeleteSong}
          />
        ))}
      </div>
    </div>
  );
}

export default App;