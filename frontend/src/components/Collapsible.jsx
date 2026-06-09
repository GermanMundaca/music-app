import { useState } from "react";

function Collapsible({children}) {
     const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container-collap">
      <button className="btn-collap" onClick={() => setIsOpen(!isOpen)} >
        {isOpen ? "🔼 Ocultar Contenido" : "🔽 Agrega una cancion"}
      </button>
      {isOpen && (
        children
      )}
    </div>
  );
}
export default Collapsible;
