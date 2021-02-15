import { saveValue } from '../../localStorage/services/saveValue'

export const saveToken = (email: string) => async (token: string) => {
    await saveValue('authData')({ email, token })
    return token
}
