function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function generateColorOptions(correctColor) {
    const options = [correctColor];
    while (options.length < 6) {
      const newColor = generateRandomColor();
      if (!options.includes(newColor)) {
        options.push(newColor);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }
  
  class ColorGame {
    constructor() {
      this.score = 0;
      this.targetColor = '';
      this.colorBox = document.querySelector('[data-testid="colorBox"]');
      this.gameStatus = document.querySelector('[data-testid="gameStatus"]');
      this.scoreElement = document.querySelector('[data-testid="score"]');
      this.colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
      this.newGameButton = document.querySelector('[data-testid="newGameButton"]');
  
      this.newGameButton.addEventListener('click', () => this.startNewGame());
      this.colorOptions.forEach(option => {
        option.addEventListener('click', () => this.handleColorGuess(option.style.backgroundColor));
      });
  
      this.startNewGame();
    }
  
    startNewGame() {
      this.targetColor = generateRandomColor();
      this.colorBox.style.backgroundColor = this.targetColor;
      this.gameStatus.textContent = '';
      this.gameStatus.className = 'game-status';
  
      const options = generateColorOptions(this.targetColor);
      this.colorOptions.forEach((option, index) => {
        option.style.backgroundColor = options[index];
      });
    }
  
    handleColorGuess(guessedColor) {
      const isCorrect = this.normalizeColor(guessedColor) === this.normalizeColor(this.targetColor);
      
      if (isCorrect) {
        this.score++;
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.gameStatus.textContent = 'Correct! Well done! 🎉';
        this.gameStatus.className = 'game-status correct';
        setTimeout(() => this.startNewGame(), 1500);
      } else {
        this.gameStatus.textContent = 'Wrong guess! Try again! 😅';
        this.gameStatus.className = 'game-status wrong';
      }
    }
  
    normalizeColor(color) {
      // Convert both RGB and hex to the same format for comparison
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      return ctx.fillStyle;
    }
  }
  
  // Initialize the game when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new ColorGame();
  });