const Wordle = {
  score: 0,

  getRandomWord: function () {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  },

  createGame: function () {
    for (let i = 0; i < 30; i++)
      this.board.innerHTML += '<div class="cell" </div>';
    for (let i = 0; i < letters.length; i++)
      this.keyboard.innerHTML += `<div class="key"> ${letters[i]}</div>`;
  },

  createModal: function (flg) {
    this.score += this.calculateScore();
    modal.innerHTML = `
        <h3>You ${flg ? "Win" : "Lose"}!</h3>
        <p style="color: red;">${this.answer}</p>
        <p>You found the solution in ${this.calculateScore()} guesses</p>
        <p>Your score : ${this.score}</p>
        <div id="Buttons">
            <button id="continue"> Continue </button>
            <button id="restart"> Restart </button>
        </div>
    `;

    this.restart = document.querySelector("#restart");
    this.continue = document.querySelector("#continue");

    restart.addEventListener("click", () => {
      modal.style.display = "none"; 
      window.location.reload();
    });

    this.continue.addEventListener("click", () => {
      this.onContinue();
    });

    this.board.classList.add("blur-background");
    this.keyboard.classList.add("blur-background");
    this.modal.style.display = "block";
  },

  calculateScore: function () {
    let currrow = parseInt(this.rightIndex / 5) + 1;

    return currrow;
  },

  onContinue: function () {
    this.board.innerHTML = "";
    this.keyboard.innerHTML = "";
    this.modal.style.display = "none";
    this.board.classList.remove("blur-background");
    this.keyboard.classList.remove("blur-background");
    this.init();
  },

  onRowChange: function () {
    let cnt = 0;
    for (let i = this.leftIndex; i <= this.rightIndex; i++) {
      if (this.cells[i].innerText === this.answer[i % 5]) {
        cnt++;
        this.cells[i].classList.add("green");
      } else if (this.answer.includes(this.cells[i].innerText))
        this.cells[i].classList.add("yellow");
      else this.cells[i].classList.add("grey");
    }

    if (this.rightIndex >= 29 || cnt === 5) this.createModal(cnt == 5);
  },

  onKeyPress: function (e) {
    if (this.rightIndex > 29 || this.modal.style.display === "block") return;

    let key = (e.key || e.target.innerText).toUpperCase();

    if (key === "ENTER" && this.index > this.rightIndex) {
      this.onRowChange();
      this.rightIndex += 5;
      this.leftIndex += 5;
      return;
    }

    if (key === "BACKSPACE" && this.index - 1 >= this.leftIndex) {
      this.index--;
      this.cells[this.index].innerText = "";
      this.cells[this.index].classList.remove("scale");
      return;
    }

    if (
      key.length === 1 &&
      /[A-Z]/.test(key) &&
      this.index >= this.leftIndex &&
      this.index <= this.rightIndex
    ) {
      this.cells[this.index].innerText = key;
      this.cells[this.index].classList.add("scale");
      this.index++;
    }
  },

  init: function () {
    this.index = 0;
    this.leftIndex = 0;
    this.rightIndex = 4;
    this.board = document.querySelector(".board");
    this.keyboard = document.querySelector(".keyboard");
    this.modal = document.querySelector("#modal");
    this.answer = this.getRandomWord().toUpperCase();

    this.createGame();

    this.keys = document.querySelectorAll(".key");
    this.cells = document.querySelectorAll(".cell");

    document.addEventListener("keydown", this.onKeyPress.bind(this));

    this.keys.forEach((key) => {
      key.addEventListener("click", this.onKeyPress.bind(this));
    });
  },
};

Wordle.init();
