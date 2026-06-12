function SongCard({ song, onDelete, onEdit }) {
  return (
    <div className="song-card">
      <img
        src={`https://img.youtube.com/vi/${
          song.youtube_url.split("v=")[1]
        }/hqdefault.jpg`}
        alt={song.title}
      />

      <div className="song-info">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>

        <a href={song.youtube_url} target="_blank" rel="noopener noreferrer">
          Ver en YouTube
        </a>
        <div className="container-delete-btn">
        <button onClick={() => onDelete(song.id)} className="delete-btn">
          🗑️ Eliminar
        </button>
        <button onClick={() => onEdit(song)} className="edit-btn">
          ✏️ Editar
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default SongCard;
