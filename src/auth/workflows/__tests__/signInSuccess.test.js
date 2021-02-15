import { dispatch } from '../../../redux/ConfigureStore'
import { getUser } from '../../services'
import { handleAuthData } from '../handleAuthData'
import { signInSuccessful } from '../../actionCreators'
import {signInSuccess} from '../signInSuccess'

jest.mock('../../../redux/ConfigureStore')
jest.mock('../../services')
jest.mock('../handleAuthData')
curryMock(handleAuthData, 1)

const email = 'email'
const token = 'token'

describe('Sign In Success', () => {
    it('should handle sign in success, returning a promise that resolves with the auth token', async () => {
        await expect(signInSuccess(email)(token)).resolves.toBe(token)
        expect(handleAuthData).toHaveBeenCalledWith(email, token)
        expect(getUser).toHaveBeenCalledWith(email)
        expect(dispatch).toHaveBeenCalledWith(signInSuccessful())
        expect.assertions(4)
    })

    it('should handle sign in success, returning a promise that rejects with error on error', async () => {
        const error = new Error('test')
        getUser.mockReturnValue(Promise.reject(error))
        await expect(signInSuccess(email)(token)).rejects.toBe(error)
        expect.assertions(1)
    })
})
