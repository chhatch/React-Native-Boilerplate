import { API_URL } from '@env'
import { deleteApiToken, setApiToken } from '../actionCreators'
import { dispatch } from '../../redux/ConfigureStore'
import axios from 'axios'

const apiRequest = axios.create({ baseURL: API_URL })

//this is mutation. How do I avoid it?
apiRequest.setAuthToken = (token: string) => {
    dispatch(setApiToken())
    apiRequest.defaults.headers.common['Authorization'] = token
    return token
}
apiRequest.deleteAuthToken = () => {
    dispatch(deleteApiToken())
    apiRequest.defaults.headers.common['Authorization'] = null
}

export { apiRequest }
