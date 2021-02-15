import {REMOVE_ALERT, SET_ALERT} from '../redux/ActionTypes'
import { Action } from '../ts/interfaces'

import { DONE_LOADING, LOADING } from '../redux/ActionTypes'

interface ILoadingState {
    loading: boolean
}

const LOADING_STATE: ILoadingState = {
    loading: false
}

const loadingReducer = (state = LOADING_STATE, action: Action) => {
    switch (action.type) {
        case DONE_LOADING:
            return {
                ...state,
                loading: false,
            }
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export default loadingReducer
