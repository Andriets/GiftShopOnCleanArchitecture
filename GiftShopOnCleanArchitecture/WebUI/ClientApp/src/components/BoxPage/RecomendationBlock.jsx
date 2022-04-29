import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecomendationCardContainer from './RecomendationCardContainer';
import { GetRecomendationForUser } from '../AdminPanel/Boxes/BoxAction';
import './BoxPage.css';

class RecomendationBlock extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const userId = localStorage.getItem("Id");
        if (userId) {
            this.props.getRecomendationForUser(userId);
        }
    }

    render() {
        const { boxes, isAuthenticated } = this.props;

        return (
            <div className='recomendation-block'>
                <h3>Recomendations</h3>
                <div className='recomendation-list'>
                    {isAuthenticated 
                        ? boxes?.map(box => <RecomendationCardContainer box={box}/>)
                        : <h4>You should be authorized to see recommendations</h4>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: localStorage.getItem("Id"),
        isAuthenticated: !!localStorage.getItem('JwtToken'),
        boxes: state.recomendation?.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRecomendationForUser: (userId) => dispatch(GetRecomendationForUser(userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecomendationBlock);