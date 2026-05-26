//Set URL Songs
const API_URL = 'http://localhost:3000/api/songs';

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