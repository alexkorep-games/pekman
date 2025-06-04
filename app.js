function App() {
  React.useEffect(() => {
    if (window.initGame) {
      window.initGame();
    }
  }, []);
  return (
    <>
      <div id="uiContainer">
        <div id="score">Score: 0</div>
        <div id="lives">Lives: 3</div>
      </div>
      <div id="gameContainer">
        <canvas id="gameCanvas"></canvas>
        <div id="messageOverlay" style={{ display: 'none' }}>
          <h2 id="messageText">Game Over!</h2>
          <button id="restartButton">Play Again</button>
        </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

