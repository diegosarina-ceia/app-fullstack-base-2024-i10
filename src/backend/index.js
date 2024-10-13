//=======[ Settings, Imports & Data ]==========================================

const express = require('express');
const utils = require('./mysql-connector');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
// Middleware para servir archivos estáticos
app.use(express.static('/home/node/app/static/'));

//=======[ Helper Functions ]==================================================

/**
 * Helper para manejar consultas a la base de datos y manejar errores
 */
const queryHandler = (query, params, res, successStatusCode = 200) => {
    utils.query(query, params, (error, result) => {
        if (error) {
            res.status(500).send({ error: error.sqlMessage });
        } else {
            res.status(successStatusCode).send(result);
        }
    });
};

/**
 * Valida si un valor es un número
 */
const isValidNumber = (value) => !isNaN(value) && value !== null && value !== undefined;

//=======[ Main module code ]==================================================

// Obtener un dispositivo por su identificar (ID)
app.get('/device/:id', (req, res) => {
    const deviceId = parseInt(req.params.id, 10);

    if (!isValidNumber(deviceId)) {
        return res.status(400).send({ error: 'Numero de ID no valido' });
    }

    queryHandler('SELECT id, description FROM Devices WHERE id = ?', [deviceId], res);
});

// Obtener todos los dispositivos disponibles (detalle)
app.get('/devices', (req, res) => {
    queryHandler('SELECT * FROM Devices', [], res);
});

// Agregar un nuevo dispositivo al panel
app.post('/device', (req, res) => {
    const { name, description, typeId } = req.body;

    if (!name || !description || !isValidNumber(typeId)) {
        return res.status(400).send({ error: 'Parametros invalidos' });
    }

    queryHandler(
        'INSERT INTO Devices (name, description, state, typeId) VALUES (?, ?, ?, ?)',
        [name, description, 0.0, typeId],
        res,
        201
    );
});

// Actualizar un dispositivo existente en el panel
app.put('/device/:id', (req, res) => {
    const deviceId = parseInt(req.params.id, 10);
    const { name, description, typeId } = req.body;

    if (!isValidNumber(deviceId) || !name || !description || !isValidNumber(typeId)) {
        return res.status(400).send({ error: 'Parametros invalidos' });
    }

    queryHandler(
        'UPDATE Devices SET name = ?, description = ?, typeId = ? WHERE id = ?',
        [name, description, typeId, deviceId],
        res
    );
});

// Actualizar el estado de un dispositivo en el panel
app.patch('/device/:id/state', (req, res) => {
    const deviceId = parseInt(req.params.id, 10);
    const { state } = req.body;

    if (!isValidNumber(deviceId) || !isValidNumber(state) || state < 0 || state > 1) {
        return res.status(400).send({ error: 'Parametros invalidos' });
    }

    const query = 'UPDATE Devices SET state = ? WHERE id = ?';
    queryHandler(query, [state, deviceId], res);
});

// Eliminar un dispositivo en el panel
app.delete('/device/:id', (req, res) => {
    const deviceId = parseInt(req.params.id, 10);

    if (!isValidNumber(deviceId)) {
        return res.status(400).send({ error: 'Invalid device ID' });
    }

    queryHandler('DELETE FROM Devices WHERE id = ?', [deviceId], res, 200);
});

// Obtener tipos de dispositivos del panel
app.get('/deviceTypes', (req, res) => {
    queryHandler('SELECT id, name, material_icon_name FROM DevicesTypes', [], res);
});

// Obtener dispositivos por tipo
app.get('/devices/type/:typeId', (req, res) => {
    const typeId = parseInt(req.params.typeId, 10);

    if (!isValidNumber(typeId)) {
        return res.status(400).send({ error: 'Invalid type ID' });
    }

    queryHandler('SELECT * FROM Devices WHERE typeId = ?', [typeId], res);
});

// Obtener el número total de dispositivos en el panel
app.get('/devices/count', (req, res) => {
    console.log('Solicitud recibida para /devices/count'); // Log para verificar que la solicitud llega

    // Usar el queryHandler para obtener el conteo
    queryHandler('SELECT COUNT(*) as count FROM Devices', [], res, 200);
});


//=======[ Start Server ]======================================================

app.listen(PORT, () => {
    console.log(`NodeJS API running on port ${PORT}`);
});

//=======[ End of file ]=======================================================
