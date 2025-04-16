document.addEventListener('DOMContentLoaded', () => {
    let dino = document.getElementById('dino');
    let obstacle = document.getElementById('obstacle');
    let gameContainer = document.getElementById('game-container');
    let gameStart = document.getElementById('game-start');
    let scoreDisplay = document.getElementById('score');
    let isGameStarted = false;
    let score = 0;
    let isJumping = false;

    function startGame() {
        if (!isGameStarted) {
            isGameStarted = true;
            gameStart.style.display = 'none';
            obstacle.style.animation = 'moveObstacle 1.5s infinite linear';
            updateScore();
        }
    }

    function jump() {
        if (!isJumping && isGameStarted) {
            isJumping = true;
            dino.classList.add('jump');
            
            setTimeout(() => {
                dino.classList.remove('jump');
                isJumping = false;
            }, 500);
        }
    }

    function updateScore() {
        if (isGameStarted) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            setTimeout(updateScore, 100);
        }
    }

    function checkCollision() {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        
        if (obstacleLeft < 90 && obstacleLeft > 40 && dinoTop <= 40) {
            gameOver();
        }
    }

    function gameOver() {
        isGameStarted = false;
        score = 0;
        obstacle.style.animation = 'none';
        gameStart.style.display = 'block';
        gameStart.textContent = 'Game Over! Click to Restart';
    }

    // Event Listeners
    gameContainer.addEventListener('click', startGame);
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            jump();
        }
    });

    setInterval(checkCollision, 10);
}); 