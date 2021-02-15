import { apiRequest, saveToken, setAuthToken } from '../services'

export const handleAuthData = (email: string) => (token: string) =>
        Promise.resolve(token)
            .then(apiRequest.setAuthToken)
            .then(setAuthToken)
            .then(saveToken(email))
            .catch((err) => Promise.reject(err))
