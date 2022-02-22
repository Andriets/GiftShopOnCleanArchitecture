import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as LoginReducer } from '../components/Login/LoginReducer';
import { Register } from '../components/Register/RegisterAction';
import { reducer as RegifterReducer } from '../components/Register/RegisterReducer';
import { reducer as UserReducer } from '../components/UserProfile/UserReducer';
import { reducer as ChangePasswordModalReducer } from '../components/UserProfile/ChangePasswordModalReducer';

const rootReducers = {
    routing: routerReducer,
    form: formReducer,
    login: LoginReducer,
    register: RegifterReducer,
    user: UserReducer,
    changePasswordModal: ChangePasswordModalReducer
};

export default rootReducers;
