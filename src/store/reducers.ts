import { combineReducers } from 'redux'
import * as actions from './actions'

const selectedDateState = {
    startDateTime: new Date(),
    endDateTime: new Date()
};

function selectedDate(state = selectedDateState, action) {
    const { type, startDateTime, endDateTime } = action;

    switch (type) {
        case actions.SET_START_DATE:
            return {
                ...state,
                startDateTime
            }
        case actions.SET_END_DATE:
            return {
                ...state,
                endDateTime
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({ selectedDate });

export default rootReducer;