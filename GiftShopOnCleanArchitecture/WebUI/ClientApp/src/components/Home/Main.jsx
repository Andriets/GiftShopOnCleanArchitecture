import React, { Component } from 'react';
import './Home.css';

export default class Main extends Component {

  render () {
    
    return (
      <div className='main-page'>
        <button className='main-button'>
            <a href='/home/catalog'>
                TO THE SHOP
            </a>
        </button>
      </div>
    );
  }
}
