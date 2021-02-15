import { deleteAuthToken } from '../actionCreators'
import { deleteValue } from '../../localStorage/services/deleteValue'
import { apiRequest } from '../services/apiRequest'
import { dispatch } from '../../redux/ConfigureStore'

export const clearAuthData = async () => {
    apiRequest.deleteAuthToken()
    dispatch(deleteAuthToken())
    return deleteValue('authData')
}
