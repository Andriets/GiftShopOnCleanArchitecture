import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as LoginReducer } from '../components/Login/LoginReducer';
import { Register } from '../components/Register/RegisterAction';
import { reducer as RegifterReducer } from '../components/Register/RegisterReducer';
import { reducer as UserReducer } from '../components/UserProfile/UserReducer';
import { reducer as ChangePasswordModalReducer } from '../components/UserProfile/ChangePasswordModalReducer';
import { reducer as BoxesReducer } from '../components/AdminPanel/Boxes/BoxReducer';
import { reducer as AddBoxReducer } from '../components/AdminPanel/Boxes/AddBoxReducer';
import { reducer as BoxModalReducer } from '../components/AdminPanel/Boxes/BoxModalReducer';
import { reducer as TagReducer } from '../components/AdminPanel/Tags/TagReducer';
import { reducer as AddTagReducer } from '../components/AdminPanel/Tags/AddTagReducer';
import { reducer as EditTagReducer } from '../components/AdminPanel/Tags/EditTagReducer';
import { reducer as FiltersReducer } from '../components/Catalog/FiltersReducer';
import { reducer as CartReducer } from '../components/Cart/CartReducer';


const rootReducers = {
    routing: routerReducer,
    form: formReducer,
    login: LoginReducer,
    register: RegifterReducer,
    user: UserReducer,
    changePasswordModal: ChangePasswordModalReducer,
    boxes: BoxesReducer,
    boxModal: BoxModalReducer,
    addBox: AddBoxReducer,
    tags: TagReducer,
    addTag: AddTagReducer,
    editTag: EditTagReducer,
    filters: FiltersReducer,
    cart: CartReducer
};

export default rootReducers;
