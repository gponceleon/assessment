const chai = require('chai')
const app = require('../app');
const request = require('supertest');

describe('Data from cliens', () => {
    test('Get client by id should return 200', () => {
        request(app)
            .get('/clients/a0ece5db-cd14-4f21-812f-966633e7be86')
            .expect(200);
    });

    test('Get client by username should return 200  ', () => {
        request(app)
            .get('/clients/?lperez@z.c')
            .expect(200);
    });

    test('Given /client/book should return 404', () => {
        request(app)
            .get('/client/book')
            .expect(404);
    });
});

describe('Data from polices', () => {
    test('Get policies by id should return 200', () => {
        request(app)
            .get('/policies/a0ece5db-cd14-4f21-812f-966633e7be86')
            .expect(200);
    });

    test('Get client by username should return 200  ', () => {
        request(app)
            .get('/policies/?lperez@z.c')
            .expect(200);
    });

    test('Given /policies/book should return 404', () => {
        request(app)
            .get('/client/book')
            .expect(404);
    });
})