export const matchMock = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: { dataValues: {teamName: 'Barcelona'} },
  awayTeam: { dataValues: {teamName: 'Real Madrid'} },
}

export const matchesMock = [matchMock];

export const resultMatchMock = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: { teamName: 'Barcelona' },
    awayTeam: { teamName: 'Real Madrid' },
  }
  ]

  export const reqBodyCreateMatchMock = {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
  }

  export const resultCreateMatchMock = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
  }