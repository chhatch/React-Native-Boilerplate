import { dispatch } from '../../redux/ConfigureStore'
import { SET_AUTH_TOKEN } from '../../redux/ActionTypes'

export const setAuthToken = (token: string) => {
    dispatch({ type: SET_AUTH_TOKEN, payload: token })
    return token
}
