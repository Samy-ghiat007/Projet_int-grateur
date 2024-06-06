import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import db from '../config/db.config.js';
import User from '../models/user.model.js';

describe('Auth API', () => {
    before(async () => {
        await db.sync({ force: true }); // Reset the database before tests
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', (done) => {
            request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test',
                    lastName: 'User',
                    email: 'testuser@example.com',
                    username: 'testuser',
                    password: 'password123'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message', 'Utilisateur créé avec succès!');
                    done();
                });
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login the user', (done) => {
            request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('accessToken');
                    done();
                });
        });

        it('should fail to login with incorrect credentials', (done) => {
            request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword'
                })
                .expect(401)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message', 'Mot de passe incorrect!');
                    done();
                });
        });
    });
});
