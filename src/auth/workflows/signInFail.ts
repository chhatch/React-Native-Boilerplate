import { clearAuthData } from '../workflows'
import { dispatch } from '../../redux/ConfigureStore'
import { logError } from '../../error/actionCreators'
import { setAlert } from '../../alert/services/setAlert'
import { signInFailed } from '../actionCreators'

export const signInFail = (email: string) => async (err) => {
    try {
        dispatch(logError(err))
        dispatch(signInFailed())
        setAlert('An error has occured. You have been signed out.', 'error')
        await clearAuthData()
    } catch (error) {
        dispatch(logError(error))
        return Promise.reject(error)
    }
}
