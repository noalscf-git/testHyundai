import { SET_EVENT, SET_LOADING, Actions, TEvents} from "../actions/EventActions";

export declare type EventState = {
    events: Array<TEvents>,
    loading:boolean
}

const initialState: EventState = {
    events: [],
    loading:false
};

const eventsReducer = (state = initialState, action: Actions): EventState => {
    let newState=state;
    switch (action.type) {
        case SET_EVENT:
            newState = { ...state, events: action.events};
            break;
        case SET_LOADING:
            newState = { ...state, loading: action.loading};
            break;
    }
    return newState || state;
};

export default eventsReducer;