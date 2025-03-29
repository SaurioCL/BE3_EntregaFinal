import request from 'supertest';
import app from '../app.js';

describe('Pruebas del router de adopciones', () => {
  it('Debe obtener todas las adopciones', async () => {
    const res = await request(app).get('/adoptions');
    expect(res.statusCode).toBe(200);
    // Más aserciones según la respuesta esperada
  });

  // Otras pruebas para POST, PUT, DELETE, etc.
});
