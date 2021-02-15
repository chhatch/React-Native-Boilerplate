import { Action } from '../ts/interfaces'
import { ERROR } from './actionTypes'

const INITIAL_STATE = {
    errors: [],
}

const errorReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ERROR:
            console.log('ACTION', action)
            return { ...state, errors: state.errors.concat(action.payload) }
        default:
            return state
    }
}

export default errorReducer
