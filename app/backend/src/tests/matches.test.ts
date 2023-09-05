import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matchMock, matchesMock, resultMatchMock, reqBodyCreateMatchMock, resultCreateMatchMock } from './mocks/matchesMock';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { userDb } from './mocks/usersMocks';
import { testToken } from './mocks/usersMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches route tests', () => {
  beforeEach(() => sinon.restore());

  it('Should return all matches successfully', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultMatchMock);
  });

  it('Should return all matches not in progress successfully', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches').query({inProgress: 'false'});

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultMatchMock);
  });


  it('Should finish a match by id successfully', async function() {
    // Part 1 - Login and validate token
    const userMock = SequelizeUsers.build(userDb)
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);
      // The testToken is the token that the JWT make based on userDb.
    const { status, body } = await chai.request(app).patch('/matches/:id/finish')
    .set('authorization',testToken);;

  // Part 2 - Match finalization test
    const match = SequelizeMatches.build(matchMock as any)
    sinon.stub(SequelizeMatches, 'update').resolves(match as any);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });


  it('Should update a score by id successfully', async function() {
    // Part 1 - Login and validate token
    const userMock = SequelizeUsers.build(userDb)
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);
      // The testToken is the token that the JWT make based on userDb.
    const { status, body } = await chai.request(app).patch('/matches/:id')
    .set('authorization', testToken);;

  // Part 2 - Update score test
    const match = SequelizeMatches.build(matchMock as any)
    sinon.stub(SequelizeMatches, 'update').resolves(match as any);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Score updated successfully!' });
  });


  it('Should create a match successfully', async function() {
    // Part 1 - Login and validate token
    const userMock = SequelizeUsers.build(userDb)
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);

    // Part 2 - Create a match test
    const match = SequelizeMatches.build(resultCreateMatchMock as any)
    sinon.stub(SequelizeMatches, 'create').resolves(match as any);
      // The testToken is the token that the JWT make based on userDb.
    const { status, body } = await chai.request(app).post('/matches')
    .set('authorization', testToken).send(reqBodyCreateMatchMock);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(match.dataValues);
  });
}); 
