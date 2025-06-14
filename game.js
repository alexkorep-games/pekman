function initGame() {
      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");
      const scoreDisplay = document.getElementById("score");
      const livesDisplay = document.getElementById("lives");
      const messageOverlay = document.getElementById("messageOverlay");
      const messageText = document.getElementById("messageText");
      const restartButton = document.getElementById("restartButton");

      const GRID_SIZE = 20; // Size of each cell in the grid
      const PACMAN_RADIUS = GRID_SIZE / 2 - 2;
      const DOT_RADIUS = 2;
      const POWER_PELLET_RADIUS = 5;

      const WALL_COLOR = "#0033cc";
      const DOT_COLOR = "#ffccaa";
      const POWER_PELLET_COLOR = "#ff9900";
      const PACMAN_COLOR = "#ffff00";
      const GHOST_COLORS = ["#ff0000", "#00ff00", "#00ffff", "#ff00ff"];
      const FRIGHTENED_GHOST_COLOR = "#aaaaff";
      const EYES_COLOR = "#ffffff";
      const PUPIL_COLOR = "#000000";

      const map = [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 2, 2, 0,
        ],
        [
          0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 3, 2, 0,
        ],
        [
          0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 2, 2, 0,
        ],
        [
          0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0,
          0, 0, 0, 0, 2, 2, 0,
        ],
        [
          0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0,
          0, 0, 0, 0, 2, 2, 0,
        ],
        [
          0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2,
          2, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 4, 4, 0, 0, 0, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 1, 4, 4, 1, 1, 0, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 4, 4, 1, 1, 0, 1, 1, 1, 2, 1,
          1, 1, 1, 1, 1, 1, 5,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 2, 2, 0,
        ],
        [
          0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0,
          0, 0, 0, 0, 3, 2, 0,
        ],
        [
          0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0,
          0, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0,
          0, 2, 0, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0,
          0, 2, 0, 0, 0, 0, 0,
        ],
        [
          0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2,
          2, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 2, 2, 0,
        ],
        [
          0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
      ];
      const originalMap = map.map((row) => row.slice());
      const MAP_ROWS = map.length;
      const MAP_COLS = map[0].length;
      canvas.width = MAP_COLS * GRID_SIZE;
      canvas.height = MAP_ROWS * GRID_SIZE;

      let pacman = {};
      let ghosts = [];
      let score = 0;
      let lives = 3;
      let dotsCount = 0;
      let powerPelletActive = false;
      let powerPelletTimer = 0;
      const POWER_PELLET_DURATION = 7000; // 7 seconds
      const GHOST_POINTS = [200, 400, 800, 1600];
      let ghostsEatenThisPowerup = 0;
      let gameOver = false;
      let gameWon = false;
      let gamePaused = true;

      const GHOST_HOUSE_EXIT = { x: 14.5, y: 11.5 };
      const GHOST_SPAWNS = [
        { x: 14.5, y: 11.5 }, // Blinky (starts outside ghost house conceptually)
        { x: 14.5, y: 14.5 }, // Pinky (center of house)
        { x: 12.5, y: 14.5 }, // Inky
        { x: 16.5, y: 14.5 }, // Clyde
      ];
      const PACMAN_START_POS = { x: 1.5, y: 1.5 };

      function initPacman() {
        pacman = {
          x: PACMAN_START_POS.x * GRID_SIZE,
          y: PACMAN_START_POS.y * GRID_SIZE,
          dx: 0,
          dy: 0,
          nextDx: GRID_SIZE, // Default initial intention
          nextDy: 0,
          mouthOpen: true,
          mouthAngle: 0.2,
          mouthChangeSpeed: 0.05,
          animationFrame: 0,
        };
      }

      function initGhosts() {
        ghosts = [];
        for (let i = 0; i < GHOST_COLORS.length; i++) {
          ghosts.push({
            x: GHOST_SPAWNS[i].x * GRID_SIZE,
            y: GHOST_SPAWNS[i].y * GRID_SIZE,
            dx: 0,
            dy: -GRID_SIZE,
            color: GHOST_COLORS[i],
            isFrightened: false,
            isEaten: false,
            id: i,
            targetX: 0,
            targetY: 0,
            speedFactor: 0.75,
            animationFrame: Math.random() * 2, // Stagger animation
          });
        }
        // Blinky starts outside the ghost house and moving
        ghosts[0].x = GHOST_SPAWNS[0].x * GRID_SIZE;
        ghosts[0].y = GHOST_SPAWNS[0].y * GRID_SIZE; // Actual exit point
        ghosts[0].dx = -GRID_SIZE; // Start moving left for Blinky
        ghosts[0].dy = 0;
      }

      function resetLevelKeepScore() {
        // Called when Pacman dies but game not over
        initPacman();
        ghosts.forEach((ghost, i) => {
          ghost.x = GHOST_SPAWNS[i].x * GRID_SIZE;
          ghost.y = GHOST_SPAWNS[i].y * GRID_SIZE;
          ghost.isFrightened = false;
          ghost.isEaten = false;
          ghost.dx = i === 0 ? -GRID_SIZE : 0; // Blinky moves left; other ghosts start moving upward
          ghost.dy = i !== 0 ? -GRID_SIZE : 0; // Others try to move up
          if (i === 0) {
            // Blinky starts outside
            ghost.x = GHOST_SPAWNS[0].x * GRID_SIZE;
            ghost.y = GHOST_SPAWNS[0].y * GRID_SIZE;
          }
        });
        powerPelletActive = false;
        powerPelletTimer = 0;
        gamePaused = true; // Pause briefly
        showMessage("Ready?", false); // No button
        setTimeout(() => {
          messageOverlay.style.display = "none";
          gamePaused = false;
        }, 1500); // Brief pause
      }

      function fullResetGame() {
        // Called for new game
        for (let y = 0; y < MAP_ROWS; y++) {
          for (let x = 0; x < MAP_COLS; x++) {
            map[y][x] = originalMap[y][x];
          }
        }
        dotsCount = 0;
        map.forEach((row) =>
          row.forEach((cell) => {
            if (cell === 2 || cell === 3) dotsCount++;
          })
        );
        initPacman();
        initGhosts();
        score = 0;
        lives = 3;
        powerPelletActive = false;
        powerPelletTimer = 0;
        ghostsEatenThisPowerup = 0;
        gameOver = false;
        gameWon = false;
        gamePaused = false; // Will be set true by initial showMessage
        updateUI();
        messageOverlay.style.display = "none";
      }

      function showMessage(text, showButton = true) {
        messageText.textContent = text;
        restartButton.style.display = showButton ? "block" : "none";
        messageOverlay.style.display = "flex";
        gamePaused = true; // Critical: always pause when a message is shown
      }

      restartButton.addEventListener("click", () => {
        fullResetGame(); // Perform a full reset
        messageOverlay.style.display = "none"; // Ensure overlay is hidden
        gamePaused = false; // Unpause the game
        // gameLoop will continue due to requestAnimationFrame
      });

      function updateUI() {
        scoreDisplay.textContent = `Score: ${score}`;
        livesDisplay.textContent = `Lives: ${lives}`;
      }

      function drawWall(x, y) {
        ctx.fillStyle = WALL_COLOR;
        ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }

      function drawDot(x, y) {
        ctx.beginPath();
        ctx.arc(
          x * GRID_SIZE + GRID_SIZE / 2,
          y * GRID_SIZE + GRID_SIZE / 2,
          DOT_RADIUS,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = DOT_COLOR;
        ctx.fill();
        ctx.closePath();
      }

      function drawPowerPellet(x, y) {
        ctx.beginPath();
        ctx.arc(
          x * GRID_SIZE + GRID_SIZE / 2,
          y * GRID_SIZE + GRID_SIZE / 2,
          POWER_PELLET_RADIUS,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = POWER_PELLET_COLOR;
        ctx.fill();
        ctx.closePath();
      }

      function drawMap() {
        for (let y = 0; y < MAP_ROWS; y++) {
          for (let x = 0; x < MAP_COLS; x++) {
            if (map[y][x] === 0) {
              drawWall(x, y);
            } else if (map[y][x] === 2) {
              drawDot(x, y);
            } else if (map[y][x] === 3) {
              drawPowerPellet(x, y);
            }
          }
        }
      }

      function drawPacman() {
        ctx.beginPath();
        let angleOffset = 0;
        let currentDx = pacman.dx !== 0 ? pacman.dx : pacman.nextDx; // Use nextDx if stationary for orientation
        let currentDy = pacman.dy !== 0 ? pacman.dy : pacman.nextDy;

        if (currentDx > 0) angleOffset = 0;
        else if (currentDx < 0) angleOffset = Math.PI;
        else if (currentDy > 0) angleOffset = Math.PI / 2;
        else if (currentDy < 0) angleOffset = -Math.PI / 2;

        ctx.arc(
          pacman.x,
          pacman.y,
          PACMAN_RADIUS,
          pacman.mouthAngle + angleOffset,
          -pacman.mouthAngle + angleOffset
        );
        ctx.lineTo(pacman.x, pacman.y);
        ctx.fillStyle = PACMAN_COLOR;
        ctx.fill();
        ctx.closePath();

        pacman.animationFrame++;
        if (pacman.animationFrame % 5 === 0) {
          if (pacman.mouthOpen) {
            pacman.mouthAngle += pacman.mouthChangeSpeed;
            if (pacman.mouthAngle >= 0.4) pacman.mouthOpen = false;
          } else {
            pacman.mouthAngle -= pacman.mouthChangeSpeed;
            if (pacman.mouthAngle <= 0.05) pacman.mouthOpen = true;
          }
        }
      }

      function drawGhost(ghost) {
        const bodyHeight = GRID_SIZE * 0.8;
        const bodyWidth = GRID_SIZE * 0.8;
        const headRadius = bodyWidth / 2;
        const legRadius = bodyWidth / 4;
        const eyeRadius = bodyWidth / 5;
        const pupilRadius = eyeRadius / 2;

        const currentDrawColor = ghost.isEaten
          ? EYES_COLOR
          : ghost.isFrightened
          ? FRIGHTENED_GHOST_COLOR
          : ghost.color;

        if (!ghost.isEaten) {
          ctx.fillStyle = currentDrawColor;
          // Head
          ctx.beginPath();
          ctx.arc(ghost.x, ghost.y - headRadius / 2, headRadius, Math.PI, 0);
          ctx.closePath();
          ctx.fill();

          // Body
          ctx.fillRect(
            ghost.x - headRadius,
            ghost.y - headRadius / 2,
            bodyWidth,
            bodyHeight * 0.6
          );

          // Legs
          ghost.animationFrame = ghost.animationFrame + 0.2;
          const legOffset =
            (Math.sin((ghost.animationFrame * Math.PI) / 2) * legRadius) / 3; // Smoother leg animation

          ctx.beginPath();
          ctx.arc(
            ghost.x - headRadius + legRadius,
            ghost.y + bodyHeight * 0.6 - legRadius - legOffset,
            legRadius,
            0,
            Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            ghost.x,
            ghost.y + bodyHeight * 0.6 - legRadius + legOffset,
            legRadius,
            0,
            Math.PI
          ); // Middle leg
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            ghost.x + headRadius - legRadius,
            ghost.y + bodyHeight * 0.6 - legRadius - legOffset,
            legRadius,
            0,
            Math.PI
          );
          ctx.fill();
        }

        // Eyes (always drawn)
        const eyeOffsetX = headRadius / 2.5;
        const eyeOffsetY = ghost.isEaten ? 0 : -headRadius / 3; // Eyes centered if eaten

        ctx.fillStyle = EYES_COLOR;
        ctx.beginPath();
        ctx.arc(
          ghost.x - eyeOffsetX,
          ghost.y + eyeOffsetY,
          eyeRadius,
          0,
          Math.PI * 2
        );
        ctx.arc(
          ghost.x + eyeOffsetX,
          ghost.y + eyeOffsetY,
          eyeRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = PUPIL_COLOR;
        let pupilDx = 0,
          pupilDy = 0;
        if (ghost.isFrightened && !ghost.isEaten) {
          pupilDx = (Math.random() - 0.5) * pupilRadius;
          pupilDy = (Math.random() - 0.5) * pupilRadius; // Jittery scared pupils
        } else {
          if (ghost.dx > 0) pupilDx = pupilRadius / 1.5;
          else if (ghost.dx < 0) pupilDx = -pupilRadius / 1.5;
          if (ghost.dy > 0) pupilDy = pupilRadius / 1.5;
          else if (ghost.dy < 0) pupilDy = -pupilRadius / 1.5;
          if (ghost.dx === 0 && ghost.dy === 0) {
            // Look forward if still
            // Optional: Make them look at Pacman if close
          }
        }
        ctx.beginPath();
        ctx.arc(
          ghost.x - eyeOffsetX + pupilDx,
          ghost.y + eyeOffsetY + pupilDy,
          pupilRadius,
          0,
          Math.PI * 2
        );
        ctx.arc(
          ghost.x + eyeOffsetX + pupilDx,
          ghost.y + eyeOffsetY + pupilDy,
          pupilRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      function getGridCoords(pixelX, pixelY) {
        return {
          x: Math.floor(pixelX / GRID_SIZE),
          y: Math.floor(pixelY / GRID_SIZE),
        };
      }

      function isWall(gridX, gridY, forGhost = false) {
        if (gridX < 0 || gridX >= MAP_COLS || gridY < 0 || gridY >= MAP_ROWS) {
          return true;
        }
        const cellType = map[gridY][gridX];
        if (forGhost && cellType === 4) return false;
        return cellType === 0;
      }

      function isTunnel(gridX, gridY) {
        if (gridX < 0 || gridX >= MAP_COLS || gridY < 0 || gridY >= MAP_ROWS)
          return false;
        return map[gridY][gridX] === 5;
      }

      function movePacman() {
        const currentGridX = Math.round(pacman.x / GRID_SIZE - 0.5);
        const currentGridY = Math.round(pacman.y / GRID_SIZE - 0.5);
        const movementAmount = GRID_SIZE / 12; // Move 1/12th grid cell (3x slower)

        if (
          Math.abs(pacman.x - (currentGridX * GRID_SIZE + GRID_SIZE / 2)) <
            movementAmount / 2 &&
          Math.abs(pacman.y - (currentGridY * GRID_SIZE + GRID_SIZE / 2)) <
            movementAmount / 2
        ) {
          pacman.x = currentGridX * GRID_SIZE + GRID_SIZE / 2; // Snap to center
          pacman.y = currentGridY * GRID_SIZE + GRID_SIZE / 2;

          let nextPotentialGridX =
            currentGridX + (pacman.nextDx > 0 ? 1 : pacman.nextDx < 0 ? -1 : 0);
          let nextPotentialGridY =
            currentGridY + (pacman.nextDy > 0 ? 1 : pacman.nextDy < 0 ? -1 : 0);

          if (!isWall(nextPotentialGridX, nextPotentialGridY)) {
            pacman.dx = pacman.nextDx;
            pacman.dy = pacman.nextDy;
          }
        }

        let moveX = (pacman.dx / GRID_SIZE) * movementAmount;
        let moveY = (pacman.dy / GRID_SIZE) * movementAmount;

        let leadingEdgeX =
          pacman.x +
          (pacman.dx > 0 ? PACMAN_RADIUS : pacman.dx < 0 ? -PACMAN_RADIUS : 0);
        let leadingEdgeY =
          pacman.y +
          (pacman.dy > 0 ? PACMAN_RADIUS : pacman.dy < 0 ? -PACMAN_RADIUS : 0);

        const targetCellX = Math.floor((leadingEdgeX + moveX) / GRID_SIZE);
        const targetCellY = Math.floor((leadingEdgeY + moveY) / GRID_SIZE);

        if (!isWall(targetCellX, targetCellY)) {
          pacman.x += moveX;
          pacman.y += moveY;
        } else {
          // Snap to grid center if moving towards a wall and current direction is into wall
          pacman.x = currentGridX * GRID_SIZE + GRID_SIZE / 2;
          pacman.y = currentGridY * GRID_SIZE + GRID_SIZE / 2;
          pacman.dx = 0; // Stop movement
          pacman.dy = 0;
        }

        // Tunnel
        if (pacman.x < -PACMAN_RADIUS) pacman.x = canvas.width + PACMAN_RADIUS;
        else if (pacman.x > canvas.width + PACMAN_RADIUS)
          pacman.x = -PACMAN_RADIUS;

        const pacmanGridX = Math.floor(pacman.x / GRID_SIZE);
        const pacmanGridY = Math.floor(pacman.y / GRID_SIZE);

        if (
          pacmanGridX >= 0 &&
          pacmanGridX < MAP_COLS &&
          pacmanGridY >= 0 &&
          pacmanGridY < MAP_ROWS
        ) {
          if (map[pacmanGridY][pacmanGridX] === 2) {
            map[pacmanGridY][pacmanGridX] = 1;
            score += 10;
            dotsCount--;
          } else if (map[pacmanGridY][pacmanGridX] === 3) {
            map[pacmanGridY][pacmanGridX] = 1;
            score += 50;
            dotsCount--;
            activatePowerPellet();
          }
        }
        if (dotsCount === 0) {
          gameWon = true;
          gameOver = true;
        }
      }

      function activatePowerPellet() {
        powerPelletActive = true;
        powerPelletTimer = POWER_PELLET_DURATION;
        ghostsEatenThisPowerup = 0;
        ghosts.forEach((ghost) => {
          if (!ghost.isEaten) {
            ghost.isFrightened = true;
            ghost.speedFactor = 0.5; // Slower when frightened
            // Reverse direction (if they have one)
            if (ghost.dx !== 0 || ghost.dy !== 0) {
              ghost.dx *= -1;
              ghost.dy *= -1;
            } else {
              // If they were still, pick a random valid direction
              // This part needs the decideGhostMove logic to be robust
            }
          }
        });
      }

      function updatePowerPellet() {
        if (powerPelletActive) {
          powerPelletTimer -= 1000 / 60;
          if (
            powerPelletTimer < POWER_PELLET_DURATION / 3 &&
            Math.floor(powerPelletTimer / 250) % 2 === 0
          ) {
            // Flash ghosts
            ghosts.forEach((g) => {
              if (g.isFrightened && !g.isEaten) g.color = "#FFFFFF";
            });
          } else {
            ghosts.forEach((g, i) => {
              if (g.isFrightened && !g.isEaten) g.color = GHOST_COLORS[i];
            }); // Restore original color concept for flashing
          }

          if (powerPelletTimer <= 0) {
            powerPelletActive = false;
            ghosts.forEach((ghost) => {
              ghost.isFrightened = false;
              ghost.speedFactor = 0.75; // Reset speed
            });
          }
        }
      }

      function moveGhosts() {
        ghosts.forEach((ghost) => {
          const movementAmount = (GRID_SIZE / 12) * ghost.speedFactor; // 3x slower
          const currentGridX = Math.round(ghost.x / GRID_SIZE - 0.5);
          const currentGridY = Math.round(ghost.y / GRID_SIZE - 0.5);

          if (
            Math.abs(ghost.x - (currentGridX * GRID_SIZE + GRID_SIZE / 2)) <
              movementAmount / 2 &&
            Math.abs(ghost.y - (currentGridY * GRID_SIZE + GRID_SIZE / 2)) <
              movementAmount / 2
          ) {
            ghost.x = currentGridX * GRID_SIZE + GRID_SIZE / 2; // Snap
            ghost.y = currentGridY * GRID_SIZE + GRID_SIZE / 2;
            decideGhostMove(ghost);
          }

          ghost.x += (ghost.dx / GRID_SIZE) * movementAmount;
          ghost.y += (ghost.dy / GRID_SIZE) * movementAmount;

          if (ghost.x < -GRID_SIZE / 2) ghost.x = canvas.width + GRID_SIZE / 2;
          else if (ghost.x > canvas.width + GRID_SIZE / 2)
            ghost.x = -GRID_SIZE / 2;

          if (ghost.isEaten) {
            const spawnX = GHOST_SPAWNS[ghost.id].x * GRID_SIZE;
            const spawnY = GHOST_SPAWNS[ghost.id].y * GRID_SIZE;
            if (
              Math.hypot(ghost.x - spawnX, ghost.y - spawnY) <
              GRID_SIZE / 2
            ) {
              ghost.isEaten = false;
              ghost.isFrightened = false;
              ghost.speedFactor = 0.75;
              ghost.x = spawnX;
              ghost.y = spawnY;
              // Logic to exit ghost house (e.g. target GHOST_HOUSE_EXIT)
              ghost.targetX = GHOST_HOUSE_EXIT.x * GRID_SIZE;
              ghost.targetY = GHOST_HOUSE_EXIT.y * GRID_SIZE;
            }
          }
        });
      }

      function decideGhostMove(ghost) {
        const currentGridX = Math.round(ghost.x / GRID_SIZE - 0.5);
        const currentGridY = Math.round(ghost.y / GRID_SIZE - 0.5);

        // Define target based on state
        if (ghost.isEaten) {
          ghost.targetX = GHOST_SPAWNS[ghost.id].x * GRID_SIZE;
          ghost.targetY = GHOST_SPAWNS[ghost.id].y * GRID_SIZE;
          // If at ghost house door but still "eaten", target inside spawn
          if (
            currentGridX === Math.round(GHOST_HOUSE_EXIT.x - 0.5) &&
            currentGridY === Math.round(GHOST_HOUSE_EXIT.y - 0.5)
          ) {
            ghost.targetX = GHOST_SPAWNS[ghost.id].x * GRID_SIZE;
            ghost.targetY = GHOST_SPAWNS[ghost.id].y * GRID_SIZE;
          }
        } else if (ghost.isFrightened) {
          // Simple runaway: Pick a random valid direction not towards Pac-Man (preferring away)
          // More advanced: target a corner or a fixed point away from Pac-Man
          ghost.targetX =
            currentGridX * GRID_SIZE +
            (currentGridX - Math.floor(pacman.x / GRID_SIZE)) * GRID_SIZE * 5; // Project away
          ghost.targetY =
            currentGridY * GRID_SIZE +
            (currentGridY - Math.floor(pacman.y / GRID_SIZE)) * GRID_SIZE * 5;
        } else {
          // Basic chase AI (Blinky: targets Pacman directly)
          // More advanced: Pinky (ahead of Pacman), Inky (complex), Clyde (near/far Pacman)
          switch (ghost.id) {
            case 0: // Blinky
              ghost.targetX = pacman.x;
              ghost.targetY = pacman.y;
              break;
            case 1: // Pinky (targets 4 tiles ahead of Pac-Man)
              let aheadX = pacman.x,
                aheadY = pacman.y;
              if (pacman.dx > 0) aheadX += 4 * GRID_SIZE;
              else if (pacman.dx < 0) aheadX -= 4 * GRID_SIZE;
              if (pacman.dy > 0) aheadY += 4 * GRID_SIZE;
              else if (pacman.dy < 0) aheadY -= 4 * GRID_SIZE;
              ghost.targetX = aheadX;
              ghost.targetY = aheadY;
              break;
            default: // Inky, Clyde - simplified to Blinky for now
              ghost.targetX = pacman.x;
              ghost.targetY = pacman.y;
              break;
          }
          // Special logic for leaving ghost house if inside area type 4
          if (
            map[currentGridY] &&
            map[currentGridY][currentGridX] === 4 &&
            !ghost.isEaten
          ) {
            ghost.targetX = GHOST_HOUSE_EXIT.x * GRID_SIZE;
            ghost.targetY = GHOST_HOUSE_EXIT.y * GRID_SIZE;
          }
        }

        let possibleMoves = [];
        const directions = [
          { dx: GRID_SIZE, dy: 0 },
          { dx: -GRID_SIZE, dy: 0 },
          { dx: 0, dy: -GRID_SIZE },
          { dx: 0, dy: GRID_SIZE },
        ];

        for (const dir of directions) {
          if (
            dir.dx === -ghost.dx &&
            dir.dy === -ghost.dy &&
            !ghost.isFrightened &&
            !ghost.isEaten
          )
            continue; // No 180 turns unless necessary

          let nextGridX = currentGridX + (dir.dx > 0 ? 1 : dir.dx < 0 ? -1 : 0);
          let nextGridY = currentGridY + (dir.dy > 0 ? 1 : dir.dy < 0 ? -1 : 0);

          if (!isWall(nextGridX, nextGridY, true)) {
            possibleMoves.push(dir);
          }
        }

        if (possibleMoves.length === 0) {
          if (
            !isWall(
              currentGridX + (ghost.dx > 0 ? 1 : ghost.dx < 0 ? -1 : 0),
              currentGridY + (ghost.dy > 0 ? 1 : ghost.dy < 0 ? -1 : 0),
              true
            )
          ) {
            // If stuck, try to continue current direction if it's valid (shouldn't happen if map is good)
          } else {
            // Reverse
            ghost.dx *= -1;
            ghost.dy *= -1;
          }
          return;
        }

        possibleMoves.sort((a, b) => {
          // Sort by distance to target
          const distA = Math.hypot(
            currentGridX * GRID_SIZE + a.dx - ghost.targetX,
            currentGridY * GRID_SIZE + a.dy - ghost.targetY
          );
          const distB = Math.hypot(
            currentGridX * GRID_SIZE + b.dx - ghost.targetX,
            currentGridY * GRID_SIZE + b.dy - ghost.targetY
          );
          return distA - distB;
        });

        ghost.dx = possibleMoves[0].dx;
        ghost.dy = possibleMoves[0].dy;
      }

      function checkCollisions() {
        ghosts.forEach((ghost) => {
          if (ghost.isEaten) return;

          const dist = Math.hypot(pacman.x - ghost.x, pacman.y - ghost.y);
          if (dist < PACMAN_RADIUS + GRID_SIZE * 0.3) {
            if (ghost.isFrightened) {
              score +=
                GHOST_POINTS[ghostsEatenThisPowerup % GHOST_POINTS.length];
              ghostsEatenThisPowerup++;
              ghost.isEaten = true;
              ghost.isFrightened = false;
              ghost.speedFactor = 1.5; // Faster when returning
            } else {
              lives--;
              updateUI();
              if (lives <= 0) {
                gameOver = true;
              } else {
                resetLevelKeepScore();
              }
            }
          }
        });
      }

      function update() {
        if (gameOver || gamePaused) return;

        movePacman();
        moveGhosts();
        checkCollisions(); // Check after moves
        updatePowerPellet();
        updateUI();

        if (gameOver) {
          // Check again after collisions might set it
          if (gameWon) {
            showMessage("You Won! Congratulations!", true);
          } else {
            showMessage("Game Over!", true);
          }
        }
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap();
        // Draw ghosts before Pacman so Pacman is on top
        ghosts.forEach((ghost) => drawGhost(ghost));
        drawPacman();
      }

      let lastFrameTime = 0;
      const FRAME_DURATION = 1000 / 60; // Target 60 FPS (leave as is for smooth animation)

      function gameLoop(currentTime) {
        if (!lastFrameTime) lastFrameTime = currentTime;
        let deltaTime = currentTime - lastFrameTime;

        // We call update and draw regardless of pause state for messages,
        // but actual game logic in update() is guarded by gamePaused/gameOver.
        // This ensures messages are responsive.
        if (!gamePaused && !gameOver) {
          update(); // Game logic update
        } else if (gameOver && messageOverlay.style.display === "none") {
          // This handles showing game over/win message if not already displayed
          if (gameWon) showMessage("You Won! Congratulations!", true);
          else showMessage("Game Over!", true);
        }

        draw(); // Always draw current state (map, characters, even if static)

        lastFrameTime = currentTime;
        requestAnimationFrame(gameLoop);
      }

      document.addEventListener("keydown", (e) => {
        if (messageOverlay.style.display !== "none") {
          // If overlay is visible
          if (e.key === "Enter" && restartButton.style.display !== "none") {
            restartButton.click();
          }
          return; // Absorb all other key presses when overlay is up
        }

        // If overlay is not visible (i.e., game is running or paused by 'P' without overlay)
        if (e.key === "p" || e.key === "P") {
          gamePaused = !gamePaused;
          if (gamePaused) {
            // Just paused, no message overlay needed here
            console.log("Game Paused (P key)");
          } else {
            console.log("Game Unpaused (P key)");
          }
          return;
        }

        if (gamePaused || gameOver) return; // No movement input if paused (by P) or game over

        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          pacman.nextDx = GRID_SIZE;
          pacman.nextDy = 0;
        } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          pacman.nextDx = -GRID_SIZE;
          pacman.nextDy = 0;
        } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          pacman.nextDx = 0;
          pacman.nextDy = -GRID_SIZE;
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          pacman.nextDx = 0;
          pacman.nextDy = GRID_SIZE;
        }
      });

      function handleDirectionInput(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;

        const dx = clickX - pacman.x;
        const dy = clickY - pacman.y;

        if (Math.abs(dx) > Math.abs(dy)) {
          pacman.nextDx = dx > 0 ? GRID_SIZE : -GRID_SIZE;
          pacman.nextDy = 0;
        } else {
          pacman.nextDx = 0;
          pacman.nextDy = dy > 0 ? GRID_SIZE : -GRID_SIZE;
        }
      }

      function pointerInputAllowed() {
        return (
          !gamePaused &&
          !gameOver &&
          messageOverlay.style.display === "none"
        );
      }

      canvas.addEventListener("pointerdown", (e) => {
        if (!pointerInputAllowed()) return;
        e.preventDefault();
        handleDirectionInput(e.clientX, e.clientY);
      });

      canvas.addEventListener(
        "touchstart",
        (e) => {
          if (!pointerInputAllowed()) return;
          e.preventDefault();
          const touch = e.touches[0];
          if (touch) handleDirectionInput(touch.clientX, touch.clientY);
        },
        { passive: false }
      );

      // ---- INITIAL SETUP ----
      // 1. Prepare all game data and visual elements BEFORE showing the initial message.
      fullResetGame(); // This sets up pacman, ghosts, score, lives, dots, and sets gamePaused = false initially.

      // 2. Draw the static initial game board based on the reset state
      draw();

      // 3. Now, show the "Get Ready!" message. This will set gamePaused = true.
      showMessage("Get Ready!", true);
      restartButton.textContent = "Start Game";

      // 4. Start the game loop. It will be initially paused by showMessage.
      requestAnimationFrame(gameLoop);
}
window.initGame = initGame;
