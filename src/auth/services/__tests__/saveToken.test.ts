import { saveToken } from '../'
import { saveValue } from '../../../localStorage/services'
import { dispatch } from '../../../redux/ConfigureStore'
import { SET_AUTH_TOKEN } from '../../actionTypes'

const mockResult = { arg1: null, arg2: null }

jest.mock('../../../localStorage/services/saveValue', () => {
    return {
        __esModule: true,
        saveValue: (arg1) => (arg2) => {
            mockResult.arg1 = arg1
            mockResult.arg2 = arg2
        },
    }
})

test('save auth token in local storage', async () => {
    const email = 'email'
    const expected = {
        arg1: 'authData',
        arg2: { email: 'email', token: 'testToken' },
    }
    const token = 'testToken'
    const action = { type: SET_AUTH_TOKEN, payload: token }

    const returnValue = await saveToken(email)(token)
    expect(mockResult).toEqual(expected)
    expect(returnValue).toEqual(token)
})
