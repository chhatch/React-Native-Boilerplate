import Amplify, { Auth } from 'aws-amplify'
import { apiRequest } from './services/apiRequest'
import { dispatch } from '../redux/ConfigureStore'
import {
    clearAuthData,
    confirmUserFail,
    confirmUserSuccess,
    handleAuthData,
} from './workflows'
import { doneLoading, loading } from '../loading/actionCreators'
import { axiosError, logError } from '../error/actionCreators'
import { setAlert } from '../alert/services/setAlert'
import { signingIn } from './actionCreators'
import {
    signInFail,
    signInSuccess,
    signUpSuccess,
    signUpFail,
} from './workflows/index'
import { extractToken } from './services'
import { saveValue } from '../localStorage/services/saveValue'

import {
    LOG_OUT,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    UPDATE_USER,
} from '../redux/ActionTypes'

import config from '../../aws-exports'
//put this in initamplify function somewhere?
//call with other app init stuff
Amplify.configure(config)

export const logOut = (dispatch: AppDispatch) => {
    dispatch({ type: LOG_OUT })
    //what do we do if this fails??
    return clearAuthData()
}

export const updateUser = (userData: any) => async (dispatch: AppDispatch) => {
    //should be apiRequest.updateUser
    //axios errors should be handled by apiRequest catching here should address how to handle failed update
    apiRequest
        .post('/user', userData)
        .then((res) => dispatch({ type: UPDATE_USER, payload: res.data }))
        .then(() => dispatch(setAlert('User data saved successfully!')))
        .catch((e) => dispatch(axiosError(e)))
}

export const signIn = (email: string, password: string) => (_: AppDispatch) =>
    Auth.signIn(email, password)
        .then(extractToken)
        .then(signInSuccess(email))
        .catch(signInFail(email))

export const signUp = (email: string, password: string) => (
    dispatch: AppDispatch
) =>
    Auth.signUp({
        username: email,
        password: password,
    })
        .then(signUpSuccess(email))
        .catch(signUpFail)

export const confirmUser = (email: string, authCode: string) => (
    dispatch: AppDispatch
) =>
    Auth.confirmSignUp(email, authCode)
        .then(confirmUserSuccess(email))
        .catch(confirmUserFail)
