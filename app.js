const express = require('express');
const bodyParser = require('body-parser');
const consultas = require('./consultas');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); //se referencia a index.html
});

app.use(bodyParser.json());

app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;
    try {
        await consultas.agregarCancion(titulo, artista, tono);
        res.send('Canción agregada correctamente');
    } catch (error) {
        console.error('Error al agregar la canción:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/canciones', async (req, res) => {
    try {
        const canciones = await consultas.obtenerCanciones();
        res.json(canciones);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.put('/cancion/:id', async (req, res) => {
    const id = req.params.id;
    const { titulo, artista, tono } = req.body;
    try {
        await consultas.editarCancion(id, titulo, artista, tono);
        res.send('Canción actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la canción:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.delete('/cancion/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await consultas.eliminarCancion(id);
        res.send('Canción eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la canción:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
