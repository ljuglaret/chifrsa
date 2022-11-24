
import React from 'react';
import './App.css';
import {encrypt} from './MathsRSA.tsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:undefined,p:undefined,q:undefined};
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
      document.getElementById(1).textContent = 
      encrypt(
        this.state.msg,
        parseInt(this.state.p),
        parseInt( this.state.q)
      ).join('')
    event.preventDefault();
  }

  render() {
    return (
     
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <p>
              <label>Enter p
                <input id = "p"
                      value={this.state.p} 
                      onChange={this.handleChange} 
              />
              </label>
              <label>Enter  q  
                <input id = "q"
                      value={this.state.q} 
                      onChange={this.handleChange} 
                /> 
              </label>
            </p>
          <p>
            <label>Message:
              <input id = "msg" 
                    value={this.state.msg} 
                    onChange={this.handleChange} />
            </label>
          </p>     
          <p>
            <input type="submit" value="Encrypt" />
          </p>
          <p>
            <label id = "1" ></label>
          </p>
        </form>
      </header>
    </div>
    ); 
  }
}

export default App