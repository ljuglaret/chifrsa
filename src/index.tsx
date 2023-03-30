import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Ch from './App';
import Dch from './App2';

import reportWebVitals from './reportWebVitals';
import {
  Routes,
  Route,
  Link,
  HashRouter 
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element= {
          <div>
            <div> 
            
            </div>
            <nav>
              <div className='row'>
            <div className='column'>
            <Link to="/ch">  <img alt = "ch" src={require('../src/assets/img/fermeture.jpg')}></img></Link>
            </div>
            <div className='column'>
            <Link to="/dch">  <img alt = "dch" src={require('../src/assets/img/ouverture.jpg')}></img></Link>
            </div>
            </div>
            </nav>
        </div>
        }
          />
      <Route path="/ch" element={<Ch />} />
      <Route path="/dch" element={<Dch />} />

    </Routes>
  </HashRouter>,

);
reportWebVitals();