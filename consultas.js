const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'repertorio',
    password: '3022',
    port: 5432,
});

const agregarCancion = async (titulo, artista, tono) => {
    const query = {
        text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)',
        values: [titulo, artista, tono],
    };
    await pool.query(query);
};

const obtenerCanciones = async () => {
    const result = await pool.query('SELECT * FROM canciones');
    return result.rows;
};

const editarCancion = async (id, titulo, artista, tono) => {
    const query = {
        text: 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4',
        values: [titulo, artista, tono, id],
    };
    await pool.query(query);
};

const eliminarCancion = async (id) => {
    const query = {
        text: 'DELETE FROM canciones WHERE id = $1',
        values: [id],
    };
    await pool.query(query);
};

module.exports = {
    agregarCancion,
    obtenerCanciones,
    editarCancion,
    eliminarCancion,
};
