import { setAlert } from '../../alert/services/setAlert'

export const signUpFail = (err) => {
    setAlert(err.message, 'error')
}
