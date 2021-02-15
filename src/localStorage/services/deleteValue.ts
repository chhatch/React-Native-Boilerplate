import { deletingValue, deletingValueFail, deletingValueSuccess } from '../actionCreators'
import { dispatch } from '../../redux/ConfigureStore'
import { storageSave } from './storageSave'

export const deleteValue = (key: string) => {
    dispatch(deletingValue(key))
    return storageSave(key, null)
        .then(() => dispatch(deletingValueSuccess(key)))
        .catch((err) => {
            dispatch(deletingValueFail(key))
            return Promise.reject(err)
        })
}

