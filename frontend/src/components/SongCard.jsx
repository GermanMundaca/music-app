function SongCard({ song }) {
  return (
    <div className="song-card">
      <img
        src={`https://img.youtube.com/vi/${
          song.youtube_url.split('v=')[1]
        }/hqdefault.jpg`}
        alt={song.title}
      />

      <div className="song-info">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>

        <a
          href={song.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en YouTube
        </a>
      </div>
    </div>
  );
}

export default SongCard;