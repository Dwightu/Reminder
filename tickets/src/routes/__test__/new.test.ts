import request from 'supertest';
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('Has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
})

it('Can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
})

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', await global.signin())
        .send({
            title: '',
            price: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', await global.signin())
        .send({
            price: 10,
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', await global.signin())
        .send({
            title: 'asldkjf',
            price: -10,
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', await global.signin())
        .send({
            title: 'laskdfj',
        })
        .expect(400);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);
    // add in a check to make sure a ticket was saved
    await request(app)
        .post('/api/tickets')
        .set('Cookie', await global.signin())
        .send({
            title: 'asdasdas',
            price: 20
        })
        .expect(201);
});