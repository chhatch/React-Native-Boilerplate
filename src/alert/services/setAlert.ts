//uuid needs secure random number generator
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { dispatch } from '../../redux/ConfigureStore'
import { SET_ALERT, REMOVE_ALERT } from '../../redux/ActionTypes'
import { issueAlert, removeAlert } from '../actionCreators'

type SetAlert = (msg: string, alertType?: string, timeout?: number) => void

export const setAlert: SetAlert = (msg, alertType = 'success', timeout = 5000) => {
    const id = uuidv4()
    const payload = { msg, type: alertType, id }

    setTimeout(() => dispatch(removeAlert(id)), timeout)
    dispatch(issueAlert(payload))
}
