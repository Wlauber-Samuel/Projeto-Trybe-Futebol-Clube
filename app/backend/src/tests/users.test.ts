import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { team, teams } from './mocks/teamsMocks'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route tests', () => {
  beforeEach(function () { sinon.restore(); });
  console.log('At teams.test.ts:', 'To completely simulate the structure that this.model should return, including the dataValues that you try to access, just do a build when mock the value:', 'SequelizeTeams.build(table data)')

  it('Should return all teams', async function() {
    const teamMock = SequelizeTeams.build(team)
    sinon.stub(SequelizeTeams, 'findAll').resolves([teamMock]);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Should return a team by id', async function() {
    const teamMock = SequelizeTeams.build(team)
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teamMock);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Should return null because of the invalid id', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/10000');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(null);
  });
}); 
