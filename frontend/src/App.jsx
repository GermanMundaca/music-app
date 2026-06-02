import { useEffect, useState } from "react";
import { getSongs, createSong, deleteSong } from "./services/songsApi";

import SongCard from "./components/SongCard";
import SongForm from "./components/SongForm";

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true); //true=>cargando false=>termino
  const [error, setError] = useState(null); //null=>todo bien string=>error
  //carga canciones
  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true); //inicializacion
        setError(null);

        const data = await getSongs();

        setSongs(data);
      } catch (err) {
        setError("No se pudieron cargar las canciones");
      } finally {
        //se ejecuta siempre
        setLoading(false);
      }
    };

    loadSongs();
  }, []);
  //creacion canciones
  const handleAddSong = async (songData) => {
    const newSong = await createSong(songData); //los datos viajan hacia el backend a través del servicio

    setSongs([...songs, newSong]); // se actualiza la pantalla con lo que devolvió el backend
  };
  //eliminacion canciones
  const handleDeleteSong = async (id) => {
    await deleteSong(id);
    setSongs(songs.filter((song) => song.id !== id));
  };
  //=> no cargaron las canciones
  if (loading) {
    return <div className="loading">Cargando canciones...</div>;
  }
  //=>error al cargar canciones
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="container">
      <h1>Music App</h1>

      <SongForm onAddSong={handleAddSong} />

      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onDelete={handleDeleteSong} />
        ))}
      </div>
    </div>
  );
}

export default App;
