import { dispatch } from '../../redux/ConfigureStore'
import { getUser } from '../services'
import { handleAuthData } from '../workflows'
import { signInSuccessful } from '../actionCreators'

export const signInSuccess = (email: string) => async (token: string) => {
    try {
        dispatch(signInSuccessful())
        await handleAuthData(email)(token)
        await getUser(email)
        return Promise.resolve(token)
    } catch(err) {
        return Promise.reject(err)
    }
}
