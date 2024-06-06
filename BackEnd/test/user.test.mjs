import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import db from '../config/db.config.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

describe('User API', () => {
    let token;

    before(async () => {
        await db.sync({ force: true }); // Reset the database before tests
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            name: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            username: 'testuser',
            password: hashedPassword
        });

        // Login to get the token
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        token = res.body.accessToken;
    });

    describe('GET /api/users/profile', () => {
        it('should get user profile', (done) => {
            request(app)
                .get('/api/users/profile')
                .set('x-access-token', token)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('name', 'Test');
                    expect(res.body).to.have.property('lastName', 'User');
                    expect(res.body).to.have.property('email', 'testuser@example.com');
                    expect(res.body).to.have.property('username', 'testuser');
                    done();
                });
        });

        it('should fail to get profile with invalid token', (done) => {
            request(app)
                .get('/api/users/profile')
                .set('x-access-token', 'invalidtoken')
                .expect(401)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message', 'Non autorisé!');
                    done();
                });
        });
    });
});