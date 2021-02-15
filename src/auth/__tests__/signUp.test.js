import { Auth } from 'aws-amplify'
import { signUp } from '../thunks'
import { signUpFail, signUpSuccess } from '../workflows/index'

jest.mock('aws-amplify')
jest.mock('../workflows/index')

const email = 'email'
const password = 'password'
const dispatch = 'dispatch'

curryMock(signUpSuccess, 1)

describe('Sign up', () => {
    it.only('should iniate the sign up process', async () => {
        Auth.signUp.mockReturnValueOnce(Promise.resolve())
        await expect(signUp(email, password)(dispatch)).resolves.not.toThrow()
        expect(Auth.signUp).toBeCalledWith({username: email, password})
        //called with undefined to keep the promise chaining clean
        expect(signUpSuccess).toHaveBeenCalledWith(email, undefined)
        expect.assertions(3)
    })

    it.only('should iniate the sign up process, calling signUpFail with error on error', async () => {
        const error = new Error('test')
        Auth.signUp.mockReturnValueOnce(Promise.reject(error))
        await expect(signUp(email, password)(dispatch)).resolves.not.toThrow()
        expect(signUpFail).toHaveBeenCalledWith(error)
        expect.assertions(2)
    })
})
