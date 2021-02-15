import { AppDispatch } from '../ts/types'
import { DONE_LOADING, LOADING } from '../redux/ActionTypes'

export const loading = (dispatch: AppDispatch) => ({
    type: LOADING
})

export const doneLoading = (dispatch: AppDispatch) => ({
    type: DONE_LOADING
})
