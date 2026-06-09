import { useEffect, useState } from "react";
import {
  getSongs,
  createSong,
  deleteSong,
  updateSong,
} from "./services/songsApi";

import SongCard from "./components/SongCard";
import SongForm from "./components/SongForm";
import collapsible from "./components/Collapsible";
import Collapsible from "./components/Collapsible";
function App() {
  //Estados
  const [songs, setSongs] = useState([]);
  const [songToEdit, setSongToEdit] = useState(null); //null=> no estamos editando
  const [loading, setLoading] = useState(true); //true=>cargando false=>termino
  const [error, setError] = useState(null); //null=>todo bien string=>error
  const [searchTerm, setSearchTerm] = useState(""); //Estado Busqueda Canciones
  //cargar canciones
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
  //Crear canciones
  const handleAddSong = async (songData) => {
    const newSong = await createSong(songData); //los datos viajan hacia el backend a través del servicio

    setSongs([...songs, newSong]); // se actualiza la pantalla con lo que devolvió el backend
  };
  //Eliminar canciones
  const handleDeleteSong = async (id) => {
    await deleteSong(id);
    setSongs(songs.filter((song) => song.id !== id));
  };
  //UPDATE
  const handleEditSong = async (song) => {
    setSongToEdit(song);
  };

  const handleUpdateSong = async (id, songData) => {
    const updatedSong = await updateSong(id, songData);

    setSongs(songs.map((song) => (song.id === id ? updatedSong : song)));

    setSongToEdit(null);
  };
  //=> no cargaron las canciones
  if (loading) {
    return <div className="loading">Cargando canciones...</div>;
  }
  //=>error al cargar canciones
  if (error) {
    return <div className="error">{error}</div>;
  }

  //Crear Lista Filtrada
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Music App</h1>
      <Collapsible>
      <SongForm
        onAddSong={handleAddSong}
        onUpdateSong={handleUpdateSong}
        songToEdit={songToEdit}
      />
      </Collapsible>
      
      
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar canción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="songs-grid">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onDelete={handleDeleteSong}
            onEdit={handleEditSong}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
