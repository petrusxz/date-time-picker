import { combineReducers } from 'redux'
import * as actions from './actions'

const selectedDateState = {
    date: new Date()
};

function selectedDate(state = selectedDateState, action) {
    const { type, date } = action

    switch (type) {
        case actions.SET_DATE:
            return {
                ...state,
                date
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({ selectedDate })

export default rootReducer