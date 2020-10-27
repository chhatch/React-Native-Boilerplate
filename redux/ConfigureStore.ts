import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkDispatch} from 'redux-thunk'

import {rootReducer} from './RootReducer'
import { Action } from '../ts/interfaces'
import { RootState } from '../ts/types'

//this is how to get TypeScript to allow dispatch to accept a thunk or an action
type DispatchFunctionType = ThunkDispatch<RootState, undefined, Action>
export const appStore = createStore(rootReducer, applyMiddleware<DispatchFunctionType, Action>(thunk))
