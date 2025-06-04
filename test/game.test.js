let game;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="score"></div>
    <div id="lives"></div>
    <canvas id="gameCanvas"></canvas>
    <div id="messageOverlay" style="display:none"></div>
    <h2 id="messageText"></h2>
    <button id="restartButton"></button>
  `;
  document.getElementById('gameCanvas').getContext = () => ({ });
  jest.resetModules();
  game = require('../game');
});

test('fullResetGame resets score, lives, and dots', () => {
  game.state.score = 50;
  game.state.lives = 1;
  game.state.dotsCount = 0;
  game.fullResetGame();
  expect(game.state.score).toBe(0);
  expect(game.state.lives).toBe(3);
  const expectedDots = game.map.reduce((sum,row) =>
    sum + row.filter(cell => cell === 2 || cell === 3).length
  , 0);
  expect(game.state.dotsCount).toBe(expectedDots);
});
