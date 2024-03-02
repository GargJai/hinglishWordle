const Wordle = {
  index: 0,
  leftIndex: 0,
  rightIndex: 4,

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
    this.board.classList.add("blur-background");
    this.keyboard.classList.add("blur-background");
    this.modal.style.display = "flex";
    if (!flg) {
      this.modal.querySelector("p").innerText = "You Lose!";
    }
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
    if (this.rightIndex > 29 || this.modal.style.display === "flex") return;

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
    this.board = document.querySelector(".board");
    this.keyboard = document.querySelector(".keyboard");
    this.modal = document.querySelector(".modal");
    this.answer = this.getRandomWord().toUpperCase();

    this.createGame();

    this.keys = document.querySelectorAll(".key");
    this.cells = document.querySelectorAll(".cell");

    const restart = document.querySelector("#restart");
    restart.addEventListener("click", () => {
      window.location.reload();
    });

    document.addEventListener("keydown", this.onKeyPress.bind(this));

    this.keys.forEach((key) => {
      key.addEventListener("click", this.onKeyPress.bind(this));
    });
  },
};

Wordle.init();
