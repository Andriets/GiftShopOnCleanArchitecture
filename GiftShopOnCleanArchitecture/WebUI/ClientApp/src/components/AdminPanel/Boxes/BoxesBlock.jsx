import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxCard from './BoxCard';
import '../Admin.css';

class BoxesBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const numbers = [1, 2, 3, 4, 5];

        return (
            <div className='boxes-block'>
                <div className='boxes-actions'>
                    <button>
                        ADD NEW BOX
                    </button>
                </div>
                <div className='boxes-list'>
                    {
                      numbers.map( number =>
                        <BoxCard key={number.toString()} />
                      )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxesBlock);