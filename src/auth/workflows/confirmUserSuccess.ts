import { navigate } from '../../navigation/RootNavigation'
import { setAlert } from '../../alert/services/setAlert'
import { registerUser } from '../services'

export const confirmUserSuccess = (email: string) =>
    //how should errors be handled here?
    registerUser(email)
        .then(() => navigate('sign-in'))
        .then(() =>
            setAlert(
                'Your email address has been confirmed! You can sign in now.',
                'success'
            )
        )
