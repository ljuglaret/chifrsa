
import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:" ",p:1,q:2};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//a^n [m]
  puissmod(a,n,m){
    var x=a
    var y=1;
    var p=m;
    do {
 
         if (n%2===0) {
            x=(x*x)%p;
            n=n/2;
         }
         else {
             y=(y*x)%p;
             n=n-1;
         }
     }
     while (n!==0);
     return y;
 
 }
 

  //lettre transformée en sa position dans l'alphabet
  f1(value){
    return value.split('')
    .map(char => char.charCodeAt(0))
    .reduce((current, previous) => current + "-"+previous)
  }

   //ASCII vers lettre
   f2(str2){
    return str2.map(c => String.fromCharCode(c))
          .reduce((current,previous) => current + ""+previous)
   }

   //M^e [n]
   //avec n = p*q , et e premier avec (p - 1) * (q - 1)
  encrypt(value){
 
    var n = this.state.p*this.state.q
    console.log("p : "+this.state.p+ " ; q :" + this.state.q + "; msg  :" + this.state.msg)

    var e =100
    var str =""
    str = this.f1(value)    
    //à chaque caractère obtenu : applicaiion de la formule RSA
    return this.f2(
      str.split('-')
      .map(char => this.puissmod(parseInt(char),e,n))
      )
  }

  handleChange(evt) {
    const value = evt.target.value;

    this.setState({
  
      ...this.state,
  
      [evt.target.name]: value
  
    });
  }

  handleSubmit(event) {
   
  
      document.getElementById(1).textContent = this.encrypt(
       this.state.msg,
       parseInt(this.state.p),
        parseInt( this.state.q))
    event.preventDefault();
  }

  render() {
    return (
     
      <div className="App">
<header className="App-header">

      <form onSubmit={this.handleSubmit}>
      
        <p><label>Enter p
          <input id = "p"
           name="p"
           value={this.state.p} 
           onChange={this.handleChange} 
          />
          </label>
        <label>
          Enter  q  
          <input id = "q"
          name="q"
          value={this.state.q} 
          onChange={this.handleChange} 
          /> 
        </label>
        </p>
        <p>
          <label>
          Message:
          <input id = "msg" 
          type="text" 
          name="msg"
          value={this.state.msg} 
          onChange={this.handleChange} />
        </label>
        </p> 
        
        <p>
        <input type="submit" value="Submit" />
        </p>
        <p>
        <label id = "1" type="submit" value="Submit" ></label>
        </p>
      </form>
      </header>
      </div>
    ); 
  }
}

export default App