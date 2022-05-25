import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxesBlock from './Boxes/BoxesBlock';
import TagsBlock from './Tags/TagsBlock';
import UsersBlock from './Users/UsersBlock';
import './Admin.css';

const boxesBlock = "boxesBlock";
const tagsBlock = "tagsBlock";
const usersBlock = "usersBlock";

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
            tagsBlock: TagsBlock,
            usersBlock: UsersBlock
        }

        const CurrentComponent = componentByTabName[this.state.openTab];
        return(
            <div className='admin-page'>
                <div className='page-name'>
                    <h3>MANAGE PANEL</h3>
                </div>
                <div className='admin-content'>
                    <div className='switch-btns'>
                        <button onClick={() => this.handleChangeTab(boxesBlock)}>
                            Boxes
                        </button>
                        <button onClick={() => this.handleChangeTab(tagsBlock)}>
                            Tags
                        </button>
                        <button onClick={() => this.handleChangeTab(usersBlock)}>
                            Users
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