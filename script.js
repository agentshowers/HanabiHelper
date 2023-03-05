const COLORS = ["red", "white", "green", "blue", "yellow"]
const NUMBERS = ["1", "2", "3", "4", "5"]

class Card {
  constructor() {
    this.colors = COLORS.map(color => { return { id: color, possible: true } });
    this.numbers = NUMBERS.map(number => { return { id: number, possible: true } });
  }
}

const App = {
  data() {
    return {
      cards: [new Card(), new Card(), new Card(), new Card(), new Card()],
      history: [],
      selectedCards: [],
      selectedClue: "red"
    }
  },

  created() {
    this.CLUE_OPTIONS = {
      Colors: COLORS.map(color => { return { id: color, value: color } }),
      Numbers: NUMBERS.map(number => { return { id: number, value: number } })
    }
  },

  methods: {
    playCard(index) {
      this.backup();
      this.cards.splice(index, 1);
      this.cards.unshift(new Card());
      this.selectedCards = [];
    },

    clue() {
      this.backup();

      let clueIndex = COLORS.includes(this.selectedClue) ? COLORS.indexOf(this.selectedClue) : NUMBERS.indexOf(this.selectedClue);

      this.cards.forEach((card, idx) => {
        let array = COLORS.includes(this.selectedClue) ? card.colors : card.numbers;
        if (this.selectedCards.includes(idx)) {
          array.forEach(clr => {
            clr["possible"] = clr["id"] === this.selectedClue;
          });
        } else {
          array[clueIndex]["possible"] = false;
        }
      });

      this.selectedCards = [];
    },

    antiClue() {
      this.backup();

      let clueIndex = COLORS.includes(this.selectedClue) ? COLORS.indexOf(this.selectedClue) : NUMBERS.indexOf(this.selectedClue);

      this.cards.forEach((card, idx) => {
        let array = COLORS.includes(this.selectedClue) ? card.colors : card.numbers;
        if (this.selectedCards.includes(idx)) {
          array[clueIndex]["possible"] = false;
        }
      });

      this.selectedCards = [];
    },

    backup() {
      let deep_copy = JSON.parse(JSON.stringify(this.cards));
      this.history.push(deep_copy);
    },

    restore() {
      this.cards = this.history.pop();
    }
  }
}

Vue.createApp(App).mount("#app")