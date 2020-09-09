import React, { Component } from "react";

import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import chars from "./chars.json";


class App extends Component {
  constructor() {
    super();
    this.state = {
      isGuessCorrect: true,
      chars: chars,
      score: 0,
      maxScore: 12,
      topScore: 0,
      message: "CLICK AN IMAGE TO BEGIN!"
    };
  }

  handleSaveClick = id => {
    const charChar = this.state.chars;
    const tileClicked = charChar.filter(tile => tile.id === id);

    if (!tileClicked[0].clicked) {
      tileClicked[0].clicked = true;
      this.handleCorrectClick();

      this.randomizeCharacters(charChar);

      this.setState({ charChar });
    } else {
      this.handleIncorrectClick();
    }
  };

  //Randomize!
  randomizeCharacters = characters => {
    characters.sort((a, b) => {
      return 0.5 - Math.random();
    });
  };

  //Handle click events true/false

  handleCorrectClick = () => {
    this.setState({ isGuessCorrect: true });
    if (this.state.score + 1 > this.state.topScore) {
      this.setState({ topScore: this.state.topScore + 1 });
    }
    if (this.state.score + 1 >= this.state.maxScore) {
      this.setState({
        score: this.state.score + 1,
        message: "CONGRATS! YOU WIN!",
        messageClass: "correct"
      });
    } else {
      this.setState({
        score: this.state.score + 1,
        message: "YOU GUESSED CORRECTLY!",
        messageClass: "correct"
      });
    }
  };

  handleIncorrectClick = () => {
    this.setState({
      message: "INCORRECT. PLAY AGAIN?",
      isGuessCorrect: false
    });
    this.resetGame();
  };

  resetGame = id => {
    const charChar = this.state.chars;
    for (let i = 0; i < charChar.length; i++) {
      charChar[i].clicked = false;
    }
    this.setState({ score: 0 });
  };



  // Render the App component on the page
  render() {
    const { message, score, chars, topScore } = this.state;
    return (
      <div className="fluid-container lodge h-100vh">
        <Navbar
          className="row"
          score={score}
          topScore={topScore}
          message={message}
        />
        <Header className="bg-header row" />

        <div className="d-flex justify-content-center main-content mx-auto padding-main flex-wrap row">
          {chars.map(({ id, name, image, clicked }) => (
            <Card
              key={id}
              id={id}
              name={name}
              image={image}
              clicked={clicked}
              clickHandler={this.handleSaveClick}
            />
          ))}
        </div>

        <Footer className="footer-mgn row" />
      </div>
    );
  }
}

export default App;