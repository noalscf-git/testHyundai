import { combineReducers } from 'redux';
import event, {EventState} from "./eventReducer";

export declare type AppState = {
    event: EventState
}

export default combineReducers({
    event
})