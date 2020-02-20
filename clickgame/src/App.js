import React, { Component } from "react";
import Matched from "./components/Matched";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matched.json";
import "./App.css";

let correctGuesses = 0;
let topScore = 0;
let clickMessage = "Save Eleven and the gang from the demogorgons! Click on them once to take them out of the upside down, but click on them twice and they go back!";

class App extends Component {
    state = {
        matches,
        correctGuesses,
        topScore,
        clickMessage
    };
    setClicked = id => {
        const matches = this.state.matches;
        const clickedMatch = matches.filter(match => match.id === id);
        if (clickedMatch[0].clicked){
            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Top Score: " + topScore);
            correctGuesses = 0;
            clickMessage = "The demogorgons have attacked and the upside down has won."
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }
            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});
        } else if (correctGuesses < 11) {
            clickedMatch[0].clicked = true;
            correctGuesses++;
            clickMessage = "Great! Don't let the demogorgons win, keep playing.";
            if (correctGuesses > topScore){
                topScore = correctGuesses;
                this.setState({ topScore });
            }
          matches.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {
            clickedMatch[0].clicked = true;
            correctGuesses = 0;
            clickMessage = "You beat the upside down! Everyone is safe...for now.";
            topScore = 12;
            this.setState({ topScore });
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }
            matches.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        }
    };
    render() {
        return (
            <Wrapper>
                <Title>Clickity Clack Stranger Things Game</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Top Score: {this.state.topScore} 
                </h3>
                <div className="container">
                <div className="row">
                {this.state.matches.map(match => (
                    <Matched
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
                </div>
                </div>
            </Wrapper>
        );
    }
}

export default App;
