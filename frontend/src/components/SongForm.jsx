import { useState } from "react";

function SongForm({ onAddSong }) {
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

    await onAddSong(formData); // Se envía el objeto completo al componente padre; el código espera a que termine

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

      <button type="submit">Agregar canción</button>
    </form>
  );
}

export default SongForm;
