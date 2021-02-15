import { Auth } from 'aws-amplify'
import { extractToken } from '../services/extractToken'
import { signIn } from '../thunks'
import { signInFail, signInSuccess } from '../workflows/index'

jest.mock('aws-amplify')
jest.mock('../services/extractToken')
jest.mock('../workflows/index')

const email = 'email'
const password = 'password'
const token = 'token'
const dispatch = 'dispatch'

extractToken.mockReturnValue(token)
curryMock(signInSuccess, 1)
curryMock(signInFail, 1)

describe('Sign in', () => {
    it.only('should iniate the sign in process', async () => {
        Auth.signIn.mockReturnValueOnce(Promise.resolve())
        await expect(signIn(email, password)(dispatch)).resolves.not.toThrow()
        expect(Auth.signIn).toBeCalledWith(email, password)
        expect(extractToken).toHaveBeenCalled()
        expect(signInSuccess).toHaveBeenCalledWith(email, token)
        expect.assertions(4)
    })

    it.only('should iniate the sign in process, calling signInFail on error', async () => {
        const error = new Error('test')
        Auth.signIn.mockReturnValueOnce(Promise.reject(error))
        await expect(signIn(email, password)(dispatch)).resolves.not.toThrow()
        expect(signInFail).toHaveBeenCalledWith(email, error)
        expect.assertions(2)
    })
})
