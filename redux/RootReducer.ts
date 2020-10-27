import { combineReducers } from 'redux'
import { Action } from '../ts/interfaces'

const INITIAL_STATE = {
    test: 'loading..',
}

const testReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'ADD_TEST':
            return {...state, test: action.payload}
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    test: testReducer,
})
