
import React from 'react';
import './App.css';
import { encrypt,decrypt,calcE,modInverse,estPremier} from './MathsRSA.tsx';

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
    console.log(this.state.p + " - " + this.state.q)

    if(this.state.p!==undefined && this.state.q !== undefined && !isNaN(this.state.p)  && !isNaN(this.state.q)){

      if( estPremier (this.state.p) &&  estPremier (this.state.q)) {
       
        var phin = (this.state.p - 1)*(this.state.q - 1)
        var n = (this.state.p )*(this.state.q)
        var e = calcE(phin)
        var d = modInverse(e,phin)
        
          document.getElementById(1).textContent = 
          encrypt(
            this.state.msg,
            parseInt(this.state.p),
            parseInt( this.state.q)
          ).join(' ')
        event.preventDefault();
        
        document.getElementById("pk").textContent =      
        "private key (n ; e) : "+ n+" ; "+e
    
        document.getElementById("puk").textContent =      
        "public key (n ; d) : "+ n+" ; "+d
        console.log(decrypt(encrypt( this.state.msg, parseInt(this.state.p),parseInt( this.state.q)),d,n))
      }
     
    }
   
    else{
     alert("p et q doivent être des nombres premiers")
    }
  

  }

  

  render() {
    return (
     
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            
          
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
            
          
            <p id ="pk"> </p>
            <p id ="puk"> </p>
            <label>Message:
              <input id = "msg" 
                    value={this.state.msg} 
                    onChange={this.handleChange} />
            </label>
            
         
            <p> <input type="submit" value="Encrypt" /></p>
             <p><label id = "1" ></label></p>
             <p id = "resultat"></p>
        </form>
      </header>
    </div>
    ); 
  }
}

export default App