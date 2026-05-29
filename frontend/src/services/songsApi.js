//Set URL Songs
const API_URL = 'http://localhost:3000/api/songs';
//pide datos al backend 
export const getSongs = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Error al obtener canciones');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
//envía datos al backend usando POST
export const createSong = async(songData) =>{
  try {
    const response = await fetch(API_URL,{
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify(songData),

    });
    if (!response.ok) {
      throw new Error('Error al crear canción');
    }
      return await response.json();
  } catch (error) {
    console.error(error);
  }

};
//delete
export const deleteSong = async(id)=>{
try {
  // Concatenamos el ID a la URL para que el backend sepa cuál borrar (Ej: /api/songs/5)
  const response = await fetch(`${API_URL}/${id}`,{
    method: 'DELETE',
  });

  if(!response.ok){
    throw new error('error al eliminar cancion');
  }
  return await response.json();
} catch (error) {
  console.error(error);
}

};
