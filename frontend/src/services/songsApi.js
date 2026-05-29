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
}