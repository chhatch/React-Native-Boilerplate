import { AppDispatch } from '../ts/types'
import { AxiosError } from 'axios'
import { dispatch } from '../redux/ConfigureStorej'
import { ERROR } from './actionTypes'
import { setAlert } from '../alert/actionCreators'

export const axiosError = (err: AxiosError) => (dispatch: AppDispatch) => {
    if (err.response) {
        //android errors to here
        dispatch(
            setAlert(
                "There was an error fetching a resource. We'll try again",
                'error'
            )
        )
        // client received an error response (5xx, 4xx)
        dispatch(logError(err))
    } else if (err.request) {
        //web errors to here
        // client never received a response, or request never left
        dispatch(
            setAlert(
                "There was an error fetching a resource. We'll try again",
                'error'
            )
        )
        dispatch(logError(err))
    } else {
        dispatch(logError(err))
    }
}

export const logError = (err: Error) => ({ type: ERROR, payload: err })
