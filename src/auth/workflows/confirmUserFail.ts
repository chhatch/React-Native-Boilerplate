import { setAlert } from '../../alert/services/setAlert'

export const confirmUserFail = (err) => {
    setAlert(err.message, 'error')
}
