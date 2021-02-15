import { dispatch } from '../../../redux/ConfigureStore'
import { setAlert } from '../../../alert/services/setAlert'
import { signUpFail } from '../index'

jest.mock('../../../alert/services/setAlert')

const err = { message: 'test' }

test('handle signup failure', () => {
    signUpFail(err)
    expect(setAlert).toHaveBeenCalledWith(err.message, 'error')
})
