import { dispatch } from '../../redux/ConfigureStore'
import {
    savingValue,
    savingValueFail,
    savingValueSuccess,
} from '../actionCreators'
//we don't want this exported from index
import { storageSave } from './storageSave'

export const saveValue = (key: string) => (value: any) => {
    dispatch(savingValue(key)(value))
    return storageSave(key, value)
        .then(() => dispatch(savingValueSuccess(key)(value)))
        .catch((err) => {
            dispatch(savingValueFail(key)(value))
            throw err
        })
}
