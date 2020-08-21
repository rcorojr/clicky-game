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



  /*
   *  ----------------------------------------------------------------------------------
   *
   *  Functions for game logic
   *
   *  ----------------------------------------------------------------------------------
   */

  // Main click handler function
  handleSaveClick = id => {
    // Variable to hold the chars state.
    const charChar = this.state.chars;
    // Search through character chars to find the one that matches the clicked id.
    const tileClicked = charChar.filter(tile => tile.id === id);

    // If the tile isn't clicked...
    if (!tileClicked[0].clicked) {
      // ...set it to now be clicked
      tileClicked[0].clicked = true;
      // ...call this function to register the correct guess
      this.handleCorrectClick();

      // ... randomize character chars
      this.randomizeCharacters(charChar);

      this.setState({ charChar });
    } else {
      this.handleIncorrectClick();
    }
  };

  // Function to randomize the characters
  randomizeCharacters = characters => {
    characters.sort((a, b) => {
      return 0.5 - Math.random();
    });
  };

  // Handler for correct guesses/clicks
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

  // Handler for incorrect guesses/clicks
  handleIncorrectClick = () => {
    this.setState({
      message: "INCORRECT. PLAY AGAIN?",
      isGuessCorrect: false
    });
    this.resetGame();
  };

  // Resets the game
  resetGame = id => {
    const charChar = this.state.chars;
    for (let i = 0; i < charChar.length; i++) {
      charChar[i].clicked = false;
    }
    this.setState({ score: 0 });
  };

  /*
   *  ----------------------------------------------------------------------------------
   *
   *  Render and Return
   *
   *  ----------------------------------------------------------------------------------
   */

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