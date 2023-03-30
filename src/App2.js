
import React from 'react';
import './App.css';
import {decrypt} from './MathsRSA.tsx';

class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:undefined,n:undefined,d:undefined};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;

    this.setState({
      ...this.state,
      [evt.target.id]: value
  
    });
   
  }


  handleSubmit(event) {

    
        var n = this.state.n
        var d =this.state.d
        var msg =  this.state.msg.split("")
        document.getElementById("resultat").textContent = decrypt(msg,d,n).join("")
        event.preventDefault();
  }

  

  render() {
    return (
     
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            
          
              <label>Enter d
                <input id = "d"
                      value={this.state.d} 
                      onChange={this.handleChange} 
              />
              </label>
              <label>Enter  n  
                <input id = "n"
                      value={this.state.n} 
                      onChange={this.handleChange} 
                /> 
              </label>
          
            <p><label>Message:
              <input id = "msg" 
                    value={this.state.msg} 
                    onChange={this.handleChange} />
            </label>
            
            </p>
            <p> <input type="submit" value="Decrypt" /></p>
             <p id = "resultat"></p>
        </form>
        <button type="Submit"><a href="#/ch">ch</a></button>
      </header>
    </div>
    ); 
  }
}

export default App2