import { Auth } from 'aws-amplify'

export const extractToken = async () => {
    const {
        accessToken: { jwtToken: token },
    } = await Auth.currentSession()
    return token
}
