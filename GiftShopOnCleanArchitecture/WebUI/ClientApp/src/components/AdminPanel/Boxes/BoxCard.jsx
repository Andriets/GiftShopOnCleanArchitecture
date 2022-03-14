import React, { Component } from 'react';

export default class BoxCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = "Super duper mega krytoi box dlya the best people";
        const description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
        const price = 999;

        return (
            <div className='box-card'>
                <div className='box-left'>
                    <div className='box-photo'>
                        <img />
                    </div>
                    <div className='box-info'>
                        <h4 className='box-title'>{title}</h4>
                        <h5 className='box-price'>${price}</h5>
                        <p className='box-description'>{description}</p>
                    </div>
                </div>
                <div className='box-actions'>
                    <img src={process.env.PUBLIC_URL + '/img/Edit.svg'}/>
                    <img src={process.env.PUBLIC_URL + '/img/Trash.svg'}/>
                </div>
            </div>
        );
    }
}