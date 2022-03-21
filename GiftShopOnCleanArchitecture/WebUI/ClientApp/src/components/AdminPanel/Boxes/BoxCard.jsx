import React, { Component } from 'react';

export default class BoxCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, description, price, photoBytes } = this.props.boxInfo;
        return (
            <div className='box-card'>
                <div className='box-left'>
                    <div className='box-photo'>
                        <img src={"data:image/png;base64," + photoBytes?.img}/>
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