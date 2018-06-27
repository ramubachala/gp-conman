import {Store} from '../../flux/Store'
import constants from '../../common/constants';
export default class LoginStore extends Store {
    __onDispatch(action){
        switch (action.type) {
            case constants.USERNAME_UPDATE:
                this.__state.username = action.value;
                this.__emitChange(action);
                break;
            case constants.PASSWORD_UPDATE:
                this.__state.password = action.value;
                this.__emitChange(action);
                break;
            case constants.FIRSTNAME_UPDATE:
                this.__state.firstname = action.value;
                this.__emitChange(action);
                break;
            case constants.LASTNAME_UPDATE:
                this.__state.lastname = action.value;
                this.__emitChange(action);
                break;
            case constants.EMAIL_UPDATE:
                this.__state.email = action.value;
                this.__emitChange(action);
                break;
            case constants.USERID:
                this.__state.userid = action.value;
                this.__emitChange(action);
                break;
            default:
                console.log('unknown action type')
                break;
        }
    }
    getInitialState(){
        return {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            userid: ''
        };
    }
};
