import { Action } from '../ts/interfaces'
import { DELETE_AUTH_TOKEN, LOG_OUT, SET_AUTH_TOKEN, SIGN_IN_FAIL, SIGN_IN_SUCCESS, UPDATE_USER } from './actionTypes'
const AUTH_STATE = {
    authenticated: false,
    authToken: null,
    user: {email: '', role: ''},
}

const authReducer = (state = AUTH_STATE, action: Action) => {
    switch (action.type) {
        case DELETE_AUTH_TOKEN:
            return { ...state, authToken: null }
        case LOG_OUT:
            return {...state, authenticated: false, authToken: null, user: {email: ''} }
        case SET_AUTH_TOKEN:
            return { ...state, authToken: action.payload }
        case SIGN_IN_SUCCESS:
            return { ...state, authenticated: true }
        case SIGN_IN_FAIL:
            return { ...state, authenticated: false }
        case UPDATE_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}

export default authReducer
