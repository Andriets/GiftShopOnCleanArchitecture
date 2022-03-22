import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxesBlock from './Boxes/BoxesBlock';
import './Admin.css';

const boxesBlock = "boxesBlock";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTab: boxesBlock
        }
    }

    handleChangeTab = (tabName) => {
        this.setState({
            openTab: tabName
        });
    }

    render() {
        const componentByTabName = {
            boxesBlock: BoxesBlock,
        }

        const CurrentComponent = componentByTabName[this.state.openTab];
        return(
            <div className='admin-page'>
                <div className='page-name'>
                    <h3>MANAGE PANEL</h3>
                </div>
                <div className='admin-content'>
                    <div className='switch-btns'>
                        <button>
                            Boxes
                        </button>
                        <button>
                            Users
                        </button>
                        <button>
                            Statistic
                        </button>
                    </div>
                    <div className='content-block'>
                        <CurrentComponent />
                    </div>
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
)(AdminPage);