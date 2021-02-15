import { dispatch } from '../../redux/ConfigureStore'
import { setAlert } from '../../alert/services/setAlert'
import { updateUser } from '../actionCreators'

export const signUpSuccess = (email: string) => () => {
    dispatch(updateUser({ email: email }))
    setAlert(
        'Sign up successful! You should receive an email with an authentication code shortly.'
    )
}
