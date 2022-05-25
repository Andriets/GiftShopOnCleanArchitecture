import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { UpdateUserRole } from '../../UserProfile/UserAction';

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null
        }
    }

    handleChangeRole = (event) => {
        this.setState({
            role: event.target.value
        });

        const userData = {
            userId: this.props.user.id,
            newRole: event.target.value
        };

        this.props.updateUserRole(userData);
    }

    render() {
        const { user } = this.props;
        const userName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
        return (
            <div className='user-card'>
                <div className='user-photo'>
                    <img src={user?.photo?.img ? "data:image/png;base64," + user?.photo?.img : process.env.PUBLIC_URL + '/img/userIcon.png'}/>
                </div>
                <div className='user-username'>
                    <span>{userName !== " " ? userName : "Unknown"}</span>
                </div>
                <div className='user-role'>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                        <Select
                            value={this.state.role ?? user?.role}
                            onChange={this?.handleChangeRole}
                            label="Role">
                            <MenuItem value={"User"}>User</MenuItem>
                            <MenuItem value={"Moderator"}>Moderator</MenuItem>
                            <MenuItem value={"SuperAdmin"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserRole: (userData) => dispatch(UpdateUserRole(userData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCard);