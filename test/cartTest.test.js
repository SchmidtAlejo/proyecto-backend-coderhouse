import mongoose from 'mongoose';
import { config } from '../src/config/config.js';
import { describe, it, before, beforeEach } from "mocha";
import { expect, should } from 'chai'
import supertest from 'supertest'

const requester = supertest('http://localhost:8080');

describe('Testing Cart Routes', function () {
  this.timeout(8000);

  beforeEach(async function () {

  })

  let userToken
  let cart

  before(async function () {
    const userPayload = { email: 'userCoder@coder.com', password: 'userCod3r123' };
    const userResponse = await requester.post('/api/sessions/login').send(userPayload);
    userToken = userResponse.body.message.token;
  })

  it('should create a cart for a user', async function () {
    const response = await requester.post('/api/carts').set('Authorization', `Bearer ${userToken}`).send();
    expect(response.status).to.be.equal(201);
    cart = response.body.message;
  })

  this.afterAll(async function () {
    await mongoose.connection.collection('carts').deleteMany({ _id: cart._id });
  })
})