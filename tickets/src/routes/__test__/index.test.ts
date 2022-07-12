import request from 'supertest';
import { app } from '../../app';

const createTicket = async () => {
    return request(app).post('/api/tickets').set('Cookie', await global.signin()).send({
        title: 'asldkf',
        price: 20,
    }).expect(201);
};

it('can fetch a list of tickets', async () => {
    await request(app).post('/api/tickets').set('Cookie', await global.signin()).send({
        title: 'asldkf',
        price: 20,
    }).expect(201);
    await createTicket();
    await createTicket();

    const response = await request(app).get('/api/tickets').send().expect(200);

    expect(response.body.length).toEqual(3);
});
