import mongoose from 'mongoose';
import ProductDAO from '../src/dao/ProductDAO.js';
import { config } from '../src/config/config.js';
import { describe, it, before, beforeEach } from "mocha";
import { expect, should } from 'chai'
import supertest from 'supertest'

await mongoose.connect(config.MONGO_URI, { dbName: config.DB_NAME });

//const assert = Assert.strict;

const requester = supertest('http://localhost:8080');

describe('Testing ProductDAO', function () {
  this.timeout(8000);

  beforeEach(async function () {
    await mongoose.connection.collection('products').deleteMany({ title: 'test' });
  })

  it('should return an array of products', async function () {
    const products = await ProductDAO.getProducts();
    // assert.strictEqual(Array.isArray(products.docs), true);
    // assert.ok(products.docs.length > 0);
    expect(products.docs.length).to.be.greaterThan(0);
    expect(Array.isArray(products.docs)).to.be.true;
    if (products.docs.length > 0) {
      // assert.ok(products.docs[0]._id);
      // assert.ok(products.docs[0].title);
      // assert.equal(Object.keys(products.docs[0]).includes("title"), true);
      expect(products.docs[0]).to.have.property('_id');
      expect(products.docs[0]).to.have.property('title');
    }
  });

  it("should save a product", async function () {
    const product = {
      title: "test",
      description: "test",
      price: 100,
      stock: 100,
      category: "test",
      thumbnails: "",
    }
    const savedProduct = await ProductDAO.addProduct(product, { _id: "662ed6586252f849ea859a9a" });
    //assert.ok(savedProduct._id);
    expect(savedProduct._id).to.be.ok;
  })
});

describe('Testing Product Routes', function () {
  this.timeout(8000);

  beforeEach(async function () {
    await mongoose.connection.collection('products').deleteMany({ title: 'test' });
  })

  let adminToken

  before(async function () {
    const adminPayload = { email: 'adminCoder@coder.com', password: 'adminCod3r123' };
    const adminResponse = await requester.post('/api/sessions/login').send(adminPayload);
    adminToken = adminResponse.body.message.token;
  })

  it('should return an array of products', async function () {
    const response = await requester.get('/api/products');
    expect(response.status).to.be.equal(200);
    expect(response.body.message.payload.length).to.be.greaterThan(0);
  })

  it('should create a product', async function () {
    const product = { title: 'test', description: 'test', price: 100, stock: 100, category: 'test', thumbnails: '' };
    const response = await requester.post('/api/products').set('Authorization', `Bearer ${adminToken}`).send(product);
    expect(response.status).to.be.equal(200);
  })
})
