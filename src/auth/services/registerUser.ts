import {apiRequest} from './index'
import {axiosError} from '../../error/actionCreators'
import {dispatch} from '../../redux/ConfigureStore'
import {updateUser} from '../actionCreators'

export const registerUser = (email: string) => () =>
    apiRequest
        .post('/user/new', { email })
        .then((res) => dispatch(updateUser(res.data)))
        .catch((e) => {
            dispatch(axiosError(e))
            return Promise.reject(e)
        })
