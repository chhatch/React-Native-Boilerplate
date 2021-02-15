import { dispatch } from '../redux/ConfigureStore'
import {
    DELETE_LOCAL_DATA,
    DELETE_LOCAL_DATA_FAIL,
    DELETE_LOCAL_DATA_SUCCESS,
    LOAD_LOCAL_DATA,
    LOAD_LOCAL_DATA_FAIL,
    LOAD_LOCAL_DATA_SUCCESS,
    SAVE_LOCAL_DATA,
    SAVE_LOCAL_DATA_FAIL,
    SAVE_LOCAL_DATA_SUCCESS,
} from '../localStorage/actionTypes'


export const savingValue = (key: string) => (value: any) => ({
    type: SAVE_LOCAL_DATA,
    payload: { key, value },
})
export const savingValueFail = (key: string) => (value: any) => ({
    type: SAVE_LOCAL_DATA_FAIL,
    payload: { key, value },
})
export const savingValueSuccess = (key: string) => (value: any) => ({
    type: SAVE_LOCAL_DATA_SUCCESS,
    payload: { key, value },
})

export const deletingValue = (key: string) => ({
    type: DELETE_LOCAL_DATA,
    payload: key,
})
export const deletingValueFail = (key: string) => ({
    type: DELETE_LOCAL_DATA_FAIL,
    payload: key,
})
export const deletingValueSuccess = (key: string) => ({
    type: DELETE_LOCAL_DATA_SUCCESS,
    payload: key,
})
