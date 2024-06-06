import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import db from '../config/db.config.js';
import Product from '../models/product.model.js';

describe('Product API', () => {
    let product;

    before(async () => {
        await db.sync({ force: true }); // Reset the database before tests
        product = await Product.create({
            make: 'Test Make',
            model: 'Test Model',
            details: 'Test Details',
            price: 123.45,
            category: 'Test Category',
            image: 'test-image.jpg',
            quantity: 10
        });
    });

    describe('POST /api/products', () => {
        it('should create a new product', (done) => {
            request(app)
                .post('/api/products')
                .send({
                    make: 'New Make',
                    model: 'New Model',
                    details: 'New Details',
                    price: 199.99,
                    category: 'New Category',
                    image: 'new-image.jpg',
                    quantity: 20
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('id');
                    expect(res.body.make).to.equal('New Make');
                    done();
                });
        });
    });

    describe('GET /api/products', () => {
        it('should retrieve all products', (done) => {
            request(app)
                .get('/api/products')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.greaterThan(0);
                    done();
                });
        });
    });

    describe('GET /api/products/:id', () => {
        it('should retrieve a single product by ID', (done) => {
            request(app)
                .get(`/api/products/${product.id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('id', product.id);
                    done();
                });
        });
    });

    describe('PUT /api/products/:id', () => {
        it('should update a product by ID', (done) => {
            request(app)
                .put(`/api/products/${product.id}`)
                .send({
                    make: 'Updated Make',
                    model: 'Updated Model',
                    details: 'Updated Details',
                    price: 299.99,
                    category: 'Updated Category',
                    image: 'updated-image.jpg',
                    quantity: 30
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('make', 'Updated Make');
                    done();
                });
        });
    });

    describe('DELETE /api/products/:id', () => {
        it('should delete a product by ID', (done) => {
            request(app)
                .delete(`/api/products/${product.id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message', 'Product deleted successfully');
                    done();
                });
        });
    });
});