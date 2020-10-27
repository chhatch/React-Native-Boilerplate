import { ADD_TEST } from './ActionTypes'
import {  AppDispatch } from '../ts/types'
import { handleError, NetworkError } from '../errors/module'

import dispatchResText from './utilities/dispatchResText'
import verifyRes from './utilities/verifyRes'

export const fetchTest = async (dispatch: AppDispatch) => {
    fetch('https://dev2.aedmarket.com/api/test')
        .then(verifyRes)
        .then(dispatchResText(dispatch, ADD_TEST))
        .catch(handleError)
}

export const setTest = (val: string) => async (dispatch: AppDispatch) => {
    const options = {
        body: val,
        method: 'POST',
    } 

    fetch('https://dev2.aedmarket.com/api/test', options)
        .then(verifyRes)
        .then(() => dispatch({ type: ADD_TEST, payload: val }))
        .catch(handleError)
}
