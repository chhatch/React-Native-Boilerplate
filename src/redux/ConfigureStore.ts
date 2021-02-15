import { applyMiddleware, compose, createStore } from 'redux'
import thunk, { ThunkDispatch} from 'redux-thunk'
import thunkMiddleware from 'redux-thunk-recursion-detect'
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler'

import {rootReducer} from './RootReducer'
import { Action } from '../ts/interfaces'
import { RootState } from '../ts/types'
import { asyncErrorReporter, errorReporter } from '../error/middleware'

//@ts-ignore REDUX DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const myErrorHandler = (err) => {
  console.error(err); // write the error to the console
  // your logic here to determine what should be done on different error types
  if (err.message === 'auth_failed') {
    return logoutThunk;
  }
}

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({ onError: myErrorHandler })

const middleware = [errorHandlerMiddleware, thunkMiddleware]
//this is how to get TypeScript to allow dispatch to accept a thunk or an action
type DispatchFunctionType = ThunkDispatch<RootState, undefined, Action>
export const appStore = createStore(rootReducer, composeEnhancers(applyMiddleware<DispatchFunctionType, Action>(...middleware)))
//export const appStore = createStore(rootReducer, applyMiddleware<DispatchFunctionType, Action>(...middleware))
export const dispatch = appStore.dispatch
