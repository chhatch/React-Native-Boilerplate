import {REMOVE_ALERT, SET_ALERT} from '../redux/ActionTypes'
import { Action } from '../ts/interfaces'

interface IAlertState {
    alerts: [
        {
            id: number
            msg: string
            type: string
        }?
    ]
}

const ALERT_STATE: IAlertState = {
    alerts: [],
}

const alertReducer = (state = ALERT_STATE, action: Action) => {
    switch (action.type) {
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload),
            }
        case SET_ALERT:
            return {
                ...state,
                alerts: state.alerts.concat(action.payload),
            }
        default:
            return state
    }
}

export default alertReducer
