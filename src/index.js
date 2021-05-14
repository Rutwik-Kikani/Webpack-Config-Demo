import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Card from './components/Card';

function App () {
    return(
        <div className="main-container">
            <Card />
        </div>
    )
}

render( <App/> , document.getElementById("root") );