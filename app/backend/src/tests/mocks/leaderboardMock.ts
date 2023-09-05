export const resultHomeStats = [{
  name: 'Barcelona',
  totalPoints: 1,
  totalGames: 1,
  totalVictories: 0,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 1,
  goalsOwn: 1,
  goalsBalance: 0,
  efficiency: '33.33',
},
{
  name: 'Real Madrid',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 'No match',
}]

export const resultAwayStats = [
  {
    name: 'Real Madrid',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
  { 
    name: 'Barcelona',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 'No match',
}
]

export const homeTeamMock = {
  id: 16,
  teamName: 'Barcelona',
}

export const awayTeamMock = {
  id: 8,
  teamName: 'Real Madrid',
}

export const allTeamsMock = [{dataValues: homeTeamMock}, {dataValues: awayTeamMock}];
