import { dispatch } from '../../../redux/ConfigureStore'
import { setAlert } from '../../../alert/services/setAlert'
import { updateUser } from '../../actionCreators'
import { signUpSuccess } from '../index'

jest.mock('../../actionCreators')
jest.mock('../../../alert/services/setAlert')

const email = 'email'

test('handle signup failure', () => {
    signUpSuccess(email)()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(updateUser).toHaveBeenCalledWith({ email })
    expect(setAlert).toHaveBeenCalledWith(
        'Sign up successful! You should receive an email with an authentication code shortly.'
    )
})
