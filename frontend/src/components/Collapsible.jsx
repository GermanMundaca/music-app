function Collapsible({ isOpen, onToggle, children }) {
  return (
    <div className="container-collap">
      <button
        className="btn-collap"
        onClick={onToggle}
      >
        {isOpen
          ? "🔼 Ocultar Contenido"
          : "🔽 Agrega una canción"}
      </button>

      {isOpen && children}
    </div>
  );
}

export default Collapsible;
