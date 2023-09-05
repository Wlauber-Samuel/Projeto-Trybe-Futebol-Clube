import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matchMock } from './mocks/matchesMock';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { awayTeamMock, homeTeamMock, resultAwayStats, resultHomeStats } from './mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard route tests', () => {
  beforeEach(() => sinon.restore());

  it('Should successfully return home teams stats', async function() {
    // the build is needed to create in Sequelize the connection between the tables through the id.
    const stubHomeTeam = SequelizeTeams.build(homeTeamMock);
    const stubAwayTeam = SequelizeTeams.build(awayTeamMock);
    const stubAllTeams = [stubHomeTeam, stubAwayTeam];

    const stubMatch = SequelizeMatches.build(matchMock as any);
    const stubAllMatches = [stubMatch];

    sinon.stub(SequelizeTeams, 'findAll').resolves(stubAllTeams as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(stubAllMatches as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultHomeStats);
  });

  it('Should successfully return away teams stats', async function() {
    // the build is needed to create in Sequelize the connection between the tables through the id.
    const stubHomeTeam = SequelizeTeams.build(homeTeamMock);
    const stubAwayTeam = SequelizeTeams.build(awayTeamMock);
    const stubAllTeams = [stubHomeTeam, stubAwayTeam];

    const stubMatch = SequelizeMatches.build(matchMock as any);
    const stubAllMatches = [stubMatch];

    sinon.stub(SequelizeTeams, 'findAll').resolves(stubAllTeams as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(stubAllMatches as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultAwayStats);
  });
}); 
