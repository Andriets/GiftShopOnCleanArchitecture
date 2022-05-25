import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetAllUsers } from '../../UserProfile/UserAction';
import UserCard from './UserCard';
import '../Admin.css';

class UsersBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: "",
            role: ""
        }
    }

    componentDidMount() {
        const filterData = {
            keyWord: "",
            role: ""
        }
        this.props.getAllUsers(filterData);
    }

    handleChangeKeyWord = (event) => {
        this.setState({
            keyWord: event.target.value
        });
    }

    handleChangeRole = (event) => {
        this.setState({
            role: event.target.value
        });
    }

    handleClick = () => {
        const filterData = {
            keyWord: this.state.keyWord,
            role: this.state.role
        }
        this.props.getAllUsers(filterData);
    }

    render() {
        const { users } = this.props;
        debugger;
        return (
            <div className='users-block'>
                <div className='user-filters'>
                    <input type="text" onChange={this.handleChangeKeyWord}/>
                    <select onChange={this.handleChangeRole}>
                        <option value="">All</option>
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                        <option value="SuperAdmin">Admin</option>
                    </select>
                    <button onClick={this.handleClick}> OK </button>
                </div>
                <div className='users-list'>
                    {users?.map(u => <UserCard key={u.id} user={u}/>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: (filterData) => dispatch(GetAllUsers(filterData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersBlock);