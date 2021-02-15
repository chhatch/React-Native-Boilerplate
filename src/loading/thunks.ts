import { AppDispatch } from '../ts/types'
import { doneLoading } from './actionCreators'
import { LOADING } from '../redux/ActionTypes'

export const loading = (promise: Promise<{}>) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOADING,
    })
   promise.finally(() => dispatch(doneLoading()))
}
