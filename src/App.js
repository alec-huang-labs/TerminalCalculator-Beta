import React from 'react';
import './App.css';

const math = require("mathjs")

function shortDate(){
  let today = new Date();
  let month = today.getMonth() + 1;
  return (
    today.getFullYear() +
    "-" +
    month +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    ":" 
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: "",
      savedInput: [],
      currentDate: Date()
    }
    this.handleInput = this.handleInput.bind(this);
    this.solve = this.solve.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.clear = this.clear.bind(this);
    this.delete = this.delete.bind(this);
  }
  
  handleInput(event){
    this.setState({
      userInput: event.target.value
    });
  }


  solve(event){
    const prevOutput = this.state.savedInput; //array of previous inputs
    if(event.key === 'Enter' || event.target.id === "="){
      event.preventDefault();
      if(this.state.userInput === "Clear" || this.state.userInput === "clear" ){
        this.setState({
          userInput: "",
          savedInput: []
        })
      }else{
        try{
          var solution = math.evaluate(this.state.userInput)
          prevOutput.unshift(shortDate().concat(" " + this.state.userInput + " = " + solution));
          this.setState({
            userInput: "",
           savedInput: prevOutput
          })
        }
        catch(error){
          prevOutput.unshift(shortDate().concat(" " + this.state.userInput + " = " + error));
          this.setState({
            userInput:"",
            savedInput: prevOutput
          })
        }
      }
    }
  }

  handleButton(event){
    const prevInput = this.state.userInput
    const id = event.target.id
    this.setState({
      userInput: prevInput.concat(id)
    })
  }
  
  clear(){
    this.setState({
        userInput: " ",
        savedInput: []
      })
  }
  
  delete() {
    this.setState({
      userInput: this.state.userInput.slice(0,-1)
    })
    
  }

  render() {
    return(
      <div className="body">
      <div className = "left-column">
      <div className = "button-row">
      <button id="c" onClick={this.clear}>c</button>
      <button id="(" onClick={this.handleButton}>(</button>
      <button id=")" onClick={this.handleButton}>)</button>
      <button id="del" onClick={this.delete}>del</button>
      <button id="%" onClick={this.handleButton}>%</button>
      <button id="!" onClick={this.handleButton}>x!</button>
      <button id="^" onClick={this.handleButton}>x^n</button>
    </div>
    <div className = "button-row">
      <button id="7" onClick={this.handleButton}>7</button>
      <button id="8" onClick={this.handleButton}>8</button>
      <button id="9" onClick={this.handleButton}>9</button>
      <button id="*" onClick={this.handleButton}>*</button>
      <button id="/" onClick={this.handleButton}>/</button>
      <button id="log(" onClick={this.handleButton}>log</button>
      <button id="10^x" onClick={this.handleButton}>10^x</button>
    </div>
    <div className = "button-row">
      <button id="4" onClick={this.handleButton}>4</button>
      <button id="5" onClick={this.handleButton}>5</button>
      <button id="6" onClick={this.handleButton}>6</button>
      <button id="+" onClick={this.handleButton}>+</button>
      <button id="^2" onClick={this.handleButton}>x^2</button>
      <button id="ln(" onClick={this.handleButton}>ln</button>
      <button id="sin(" onClick={this.handleButton}>sin</button>
    </div>
    <div className = "button-row">
      <button id="1" onClick={this.handleButton}>1</button>
      <button id="2" onClick={this.handleButton}>2</button>
      <button id="3" onClick={this.handleButton}>3</button>
      <button id="-" onClick={this.handleButton}>-</button>
      <button id="sqrt(" onClick={this.handleButton}>sqrt</button>
      <button id="e" onClick={this.handleButton}>e</button>
      <button id="cos(" onClick={this.handleButton}>cos</button>
    </div>
    <div className = "button-row">
      <button id="." onClick={this.handleButton}>.</button>
      <button id="0" onClick={this.handleButton}>0</button>
      <button id="deg" onClick={this.handleButton}>deg</button>
      <button id="=" onClick={this.solve}>=</button>
      <button id="pi" onClick={this.handleButton}>pi</button>
      <button id="1/" onClick={this.handleButton}>1/x</button>
      <button id="tan(" onClick={this.handleButton}>tan</button>
    </div>
    <div>
        <div className="user-instructions">
          <p>Last login: {this.state.currentDate} 
           <br />
           <br />
           Instructions: 
           <br />Click on icons above or type in equation.
           Use "Enter" key or "=" button to calculte. 
           Will save up to 15 time stamped entries. Click 'c' or type "clear" to clear memory. 
           Press 'del' or the backspace key to delete previous character. 
           Incorrect equations will return an "ERROR" message. 
           default input for trigonometirc functions is in radians unless explicitly written otherwise: 
           cos(360) is cos(360 rad) = -0.2837.  cos(360 deg) = 1
           <br />
          </p>
        </div>
      </div>
      </div>
        <div className="right-column">
          <p className="prev-states">{this.state.savedInput[0]}
            <br /> {this.state.savedInput[1]}
            <br /> {this.state.savedInput[2]}
            <br /> {this.state.savedInput[3]}
            <br /> {this.state.savedInput[4]}
            <br /> {this.state.savedInput[5]}
            <br /> {this.state.savedInput[6]}
            <br /> {this.state.savedInput[7]}
            <br /> {this.state.savedInput[8]}
            <br /> {this.state.savedInput[9]}
            <br /> {this.state.savedInput[10]}
            <br /> {this.state.savedInput[11]}
            <br /> {this.state.savedInput[12]}
            <br /> {this.state.savedInput[13]}
            <br /> {this.state.savedInput[14]}
          </p>
         </div>
        <div className="bottom-row">
          <label>
            Scientific-Terminal-Calculator: </label>
            <textarea                                 className="userText"
                                                      style={{rows:1}}
                                                      onChange={this.handleInput} 
                                                      value={this.state.userInput}
                                                      onKeyDown={this.solve}
                                                      autoFocus/>
        </div>
      </div>
    )
  }
}
export default App;
