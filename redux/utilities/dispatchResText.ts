import { AppDispatch } from '../../ts/types'
import { FetchResponse } from '../../ts/interfaces'

export default (dispatch: AppDispatch, actionType: string) => async (
    res: FetchResponse
) => {
    const text: string = await res.text()
    const action = { type: actionType, payload: text }
    dispatch(action)
}
