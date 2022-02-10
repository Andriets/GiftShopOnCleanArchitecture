import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as LoginReducer } from '../components/Login/LoginReducer';

const rootReducers = {
    routing: routerReducer,
    form: formReducer,
    login: LoginReducer
};

export default rootReducers;
