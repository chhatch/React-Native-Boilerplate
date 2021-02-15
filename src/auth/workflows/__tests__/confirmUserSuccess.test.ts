import { confirmUserSuccess } from '../index'
import { navigate } from '../../../navigation/RootNavigation'
import { setAlert } from '../../..//alert/services/setAlert'
import { registerUser } from '../../services'

jest.mock('../../../navigation/RootNavigation')
jest.mock('../../../alert/services/setAlert')
jest.mock('../../services/registerUser')
registerUser.mockReturnValueOnce(Promise.resolve())

const email = 'email'

test('handle new user confimation success', async () => {
    await expect(confirmUserSuccess(email)).resolves.not.toThrow()
    expect(registerUser).toBeCalledWith(email)
    expect(navigate).toBeCalledWith('sign-in')
    expect(setAlert).toBeCalledWith(
        'Your email address has been confirmed! You can sign in now.',
        'success'
    )
})
