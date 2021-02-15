import { combineReducers } from 'redux'

import { Action } from '../ts/interfaces'
import alertReducer from '../alert/reducer'
import authReducer from '../auth/reducer'
import errorReducer from '../error/reducer'
import loadingReducer from '../loading/reducer'

const ALERT_STATE = {
    alerts: [],
}

const AUTH_STATE = {
    authenticated: false,
}

export const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    error: errorReducer,
    loading: loadingReducer
})
