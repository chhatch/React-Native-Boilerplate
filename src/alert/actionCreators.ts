//uuid needs secure random number generator
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { dispatch } from '../redux/ConfigureStore'
import { SET_ALERT, REMOVE_ALERT } from '../redux/ActionTypes'
import { Action } from '../ts/types'

type AlertPayload = {
    type: 'success' | 'error'
    msg: string
    id: string
}

type IssueAlert = (payload: AlertPayload) => Action
type RemoveAlert = (id: string) => Action

export const issueAlert: IssueAlert = payload => ({
    type: SET_ALERT,
    payload,
})

export const removeAlert: RemoveAlert = id => ({ type: REMOVE_ALERT, payload: id })
