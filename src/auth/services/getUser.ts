import { apiRequest } from './index'
import { dispatch } from '../../redux/ConfigureStore'
import { axiosError } from '../../error/actionCreators'
import {
    fetchingUser,
    fetchUserFail,
    fetchUserSuccess,
    updateUser,
} from '../actionCreators'
import { setAlert } from '../../alert/services/setAlert'

export const getUser = async (email: string) => {
    dispatch(fetchingUser(email))
    return apiRequest
        .get('/user', { params: { email } })
        .then((res) => {
            const user = res.data
            dispatch(fetchUserSuccess(email))
            dispatch(updateUser(user))
        })
        .catch((err) => {
            dispatch(fetchUserFail(email))
            if (err?.response?.status === 404) {
                    setAlert(
                        'There was a problem fetching your data. You are being logged out.',
                        'error'
                    )
            } else {
                dispatch(axiosError(err))
            }
            return Promise.reject(err)
        })
}
