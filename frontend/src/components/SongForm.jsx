import { useState, useEffect } from "react";

function SongForm({ onAddSong, onUpdateSong, songToEdit }) {
  //Actualizamos si cambia songToEdit
  useEffect(() => {
    if (songToEdit) {
      setFormData({
        title: songToEdit.title,
        artist: songToEdit.artist,
        youtube_url: songToEdit.youtube_url,
      });
    }
  }, [songToEdit]);

  //Objeto
  const [formData, setFormData] = useState({
    //almacenamos estado
    title: "",
    artist: "",
    youtube_url: "",
  });
  //Cambios
  const handleChange = (e) => {
    setFormData({
      ...formData, //copia del estado actual
      [e.target.name]: e.target.value, //actualiza dinamicamente, interpretando input usuario
    });
  };
  //al enviar
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita que la página web se recargue
    if (songToEdit) {
      await onUpdateSong(songToEdit.id, formData);
    } else {
      await onAddSong(formData);
    }
    //await onAddSong(formData); // Se envía el objeto completo al componente padre; el código espera a que termine

    setFormData({
      //limpia el estado
      title: "",
      artist: "",
      youtube_url: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="song-form">
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="artist"
        placeholder="Artista"
        value={formData.artist}
        onChange={handleChange}
      />

      <input
        type="text"
        name="youtube_url"
        placeholder="URL YouTube"
        value={formData.youtube_url}
        onChange={handleChange}
      />

      <button type="submit">
        {songToEdit ? "Actualizar canción" : "Agregar canción"}
      </button>
    </form>
  );
}

export default SongForm;
