import { apiRequest, saveToken, setAuthToken } from '../../services'
import { handleAuthData } from '../index'

const email = 'email'
const token = 'token'

apiRequest.setAuthToken = jest.fn(() => token)

jest.mock('../../services/setAuthToken')
setAuthToken.mockReturnValue(token)

jest.mock('../../services/saveToken')
curryMock(saveToken, 1)

test('handle auth data', async () => {
    await expect(handleAuthData(email)(token)).resolves.not.toThrow()
    expect(apiRequest.setAuthToken).toBeCalledWith(token)
    expect(setAuthToken).toBeCalledWith(token)
    expect(saveToken).toBeCalledWith(email, token)
})

test('handle auth data, reject with error if error', async () => {
    const error = new Error('error')
    apiRequest.setAuthToken.mockImplementation(() => {
        throw error
    })
    await expect(handleAuthData(email)(token)).rejects.toBe(error)
})
