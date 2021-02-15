import { Auth } from 'aws-amplify'
import { confirmUser } from '../thunks'
import { confirmUserFail, confirmUserSuccess } from '../workflows/index'

jest.mock('aws-amplify')
jest.mock('../workflows/index')

const email = 'email'
const confirmationCode = 'code'
const dispatch = 'dispatch'

curryMock(confirmUserSuccess, 1)

describe('Sign up', () => {
    it.only('should iniate the sign up confirmation process', async () => {
        Auth.confirmSignUp.mockReturnValueOnce(Promise.resolve())
        await expect(confirmUser(email, confirmationCode)(dispatch)).resolves.not.toThrow()
        expect(Auth.confirmSignUp).toBeCalledWith(email, confirmationCode)
        //called with undefined to keep the promise chaining clean
        expect(confirmUserSuccess).toHaveBeenCalledWith(email, undefined)
        expect.assertions(3)
    })

    it.only('should iniate the sign up confirmation process, calling confirmUserFail with error on error', async () => {
        const error = new Error('test')
        Auth.confirmSignUp.mockReturnValueOnce(Promise.reject(error))
        await expect(confirmUser(email, confirmationCode)(dispatch)).resolves.not.toThrow()
        expect(confirmUserFail).toHaveBeenCalledWith(error)
        expect.assertions(2)
    })
})
