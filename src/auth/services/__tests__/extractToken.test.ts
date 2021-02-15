import { Auth } from 'aws-amplify'
import { extractToken } from '../index'

jest.mock('aws-amplify')
Auth.currentSession = jest.fn()
const token = 'testToken'
    Auth.currentSession.mockReturnValueOnce({accessToken: {jwtToken: token}})

test('extract auth token from amplify instance', async () => {
    const val = await extractToken()
    expect(val).toEqual(token)
})
