import { clearAuthData } from '../../workflows'
import { dispatch } from '../../../redux/ConfigureStore'
import { logError } from '../../../error/actionCreators'
import { setAlert } from '../../../alert/services/setAlert'
import { signInFailed } from '../../actionCreators'

//for some reason importing from index here cause the module to be mocked by jest
import { signInFail } from '../signInFail'

jest.mock('../../workflows')
jest.mock('../../../redux/ConfigureStore')
jest.mock('../../../error/actionCreators')
jest.mock('../../../alert/services/setAlert')
jest.mock('../../actionCreators')

const email = 'email'
const err = { message: 'test' }

test('handle sign in failure', async () => {
    await expect(signInFail(email)(err)).resolves.not.toThrow()
    //this is how I'm currently testing dispatch calles because setAlert's
    //randomness is hard to handle
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(logError).toBeCalledWith(err)
    expect(signInFailed).toBeCalled()
    expect(setAlert).toBeCalledWith('An error has occured. You have been signed out.', 'error')
    expect(clearAuthData).toBeCalled()
})

test('handle sign in failure, return rejected promise on failure', async () => {
    jest.clearAllMocks()
    const error = new Error(err)
    clearAuthData.mockImplementation(() => {throw error})
    await expect(signInFail(email)(err)).rejects.toBe(error)
    //dispatch gets called 2 times as above, but then clearAuthData fails
    //and dispatch gets called again in the catch block
    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(logError).toBeCalledWith(error)
})
