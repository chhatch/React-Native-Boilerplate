import { loadValue } from '../../../localStorage/services'
import { loadAuthToken } from '../index'
import { signInSuccess } from '../../workflows'

jest.mock('../../../localStorage/services/loadValue')
jest.mock('../../workflows/signInSuccess')

const email = 'email'
const token = 'testToken'
const innerFunc = jest.fn()
const outerFunc = jest.fn()

loadValue.mockReturnValueOnce({email, token}).mockReturnValueOnce({email, token: null})
signInSuccess.mockImplementation(x => y => {innerFunc(y); outerFunc(x)})

test('load auth token from local storage', async () => {
    await loadAuthToken()
    expect(innerFunc.mock.calls[0][0]).toEqual(token)
    expect(outerFunc.mock.calls[0][0]).toEqual(email)

    await loadAuthToken()
    expect(innerFunc.mock.calls[1]).toBeUndefined()
    expect(outerFunc.mock.calls[1]).toBeUndefined()
})
