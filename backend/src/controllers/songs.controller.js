import pool from '../config/db.js';

// GET all
export const getSongs = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM songs ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET by ID
export const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM songs WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// CREATE
export const createSong = async (req, res, next) => {
  try {
    const { title, artist, youtube_url } = req.body;

    if (!title || !artist) {
      return res.status(400).json({
        message: 'title y artist son obligatorios'
      });
    }

    const result = await pool.query(
      `INSERT INTO songs (title, artist, youtube_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, artist, youtube_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, artist, youtube_url } = req.body;

    const result = await pool.query(
      `UPDATE songs
       SET title = $1, artist = $2, youtube_url = $3
       WHERE id = $4
       RETURNING *`,
      [title, artist, youtube_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM songs WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    res.json({ message: 'Canción eliminada' });
  } catch (error) {
    next(error);
  }
};