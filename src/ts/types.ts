import { rootReducer } from '../redux/RootReducer'
import { appStore } from '../redux/ConfigureStore'

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type Action = {
    type: string
    payload?: any
}
