import {
    AppState
} from "react-native";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux';

export const url = 'https://api.github.com/events'
const per_page=25

export declare type TAction<R = void> = ThunkAction<R, AppState, undefined, Action>


export const SET_EVENT = "SET_EVENT";
export const SET_LOADING= "SET_LOADING";


export type TEvents={
    id: string,
    type: string,
    created_at: string,
}

export interface SetEvents {
    type: typeof SET_EVENT,
    events: Array<TEvents>,
}

export interface SetLoading {
    type: typeof SET_LOADING,
    loading: boolean
}

export type Actions=SetEvents|SetLoading


export type WithEventActions = {
    getEvents: () => TAction<void>,
}

const EventActions: WithEventActions = {
    getEvents: () => {
        return async (dispatch) => {
            console.log("getEvents")
            dispatch({
                type: SET_LOADING,
                loading:true,
            });
            const response = await fetch(url+'?per_page='+per_page, 
                {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
                console.log("response",response)
            if (response.ok) {
                const json = await response.json();
                console.log("response json",json)
                    dispatch({
                        type: SET_EVENT,
                        events:json,
                    });
                
            } else {
                console.error("Ошибка: " + response.status);
            }
            dispatch({
                type: SET_LOADING,
                loading:false,
            });
        }
    },
  
}

export default EventActions;
