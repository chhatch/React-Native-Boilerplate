import { signInSuccess } from '../../auth/workflows'
import { loadValue } from '../../localStorage/services'

export const loadAuthToken = async () => {
    const authData = await loadValue('authData')

    if (authData?.email && authData?.token) {
        signInSuccess(authData.email)(authData.token)
    } else {
        console.log('Could not load authData.')
    }
}
