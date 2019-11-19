// tests for /api/dishes

// supertest is a module that allows us to test our express server
const request = require('supertest');
const { app } = require('./../server/app.js');
const { db, Dish, Person, seed } = require('./../db/index.js');

beforeEach(async done => {
  // wipe the db before each test block
  await db.sync({ force: true });
  done();
  afterAll(async done => {
    // close the db connection upon completion of all tests
    await db.close();
    done();
  });
});
describe('/api/dishes routes', () => {
  describe('GET to /api/dishes', () => {
    it('returns all of the dishes in the database', async () => {
      const testDish = await Dish.create({
        name: 'good dish',
        description: 'a good good dish'
      });
      const allDishes = await request(app).get('/api/dishes');
      console.log('ALL DISHES ', allDishes.body);
      expect(allDishes.body.length).toBeTruthy();
    });
  });

  describe('GET to /api/dishes/:id', () => {
    it('returns one dish with a given id', async () => {
      const testDish = await Dish.create({
        name: 'good dish',
        description: 'a good good dish'
      });
      const testDish2 = await Dish.create({
        name: 'good dish',
        description: 'a good good dish'
      });
      const filteredDishes = await request(app).get('/api/dishes/?id=1');
      expect(filteredDishes.body.length).toEqual(1);
      expect(filteredDishes.body[0].id.toString()).toEqual('1');
    });
  });

  describe('POST to /api/dishes/', () => {
    it('adds a dish to the database', async () => {
      const newDish = await request(app).post(
        '/api/dishes/?name=dumplings&description=5+for+1+dollar'
      );
      console.log('NEW DISH ', newDish.body);
      expect(newDish.body.name).toEqual('dumplings');
      expect(newDish.body.description).toEqual('5 for 1 dollar');
    });
  });

  xdescribe('PUT to /api/dishes/:id', () => {
    it('updates a dish with a given id', async () => {
      const testDish = await Dish.create({
        name: 'good dish',
        description: 'a good good dish'
      });
      const putRequestResponse = await request(app).put(
        '/api/dishes/?id=1&description=new+description&name=new+name'
      );
      console.log('PUT REQUEST RES ', putRequestResponse.body);
      expect(putRequestResponse.body[1][0].id).toEqual(1);
      expect(putRequestResponse.body[1][0].name).toEqual('new name');
      expect(putRequestResponse.body[1][0].description).toEqual(
        'new description'
      );
    });
  });

  xdescribe('DELETE to /api/dishes/:id', () => {
    it('deletes the dish with the given id', async () => {
      const deletedDish = await request(app).delete('/api/dishes/?id=1');
      expect(deletedDish).toEqual(1);
    });
  });
});
