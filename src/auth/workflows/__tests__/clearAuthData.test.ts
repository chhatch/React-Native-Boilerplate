import { dispatch } from '../../../redux/ConfigureStore'
import { deleteAuthToken } from '../../actionCreators'
import { deleteValue } from '../../../localStorage/services/deleteValue'
import { apiRequest } from '../../services/apiRequest'
import { clearAuthData } from '../index'

jest.mock('../../actionCreators')
jest.mock('../../../localStorage/services/deleteValue')
jest.mock('../../services/apiRequest')
apiRequest.deleteAuthToken = jest.fn()

test('purge authentication data from all sources, return resolved promise', async () => {
    await expect(clearAuthData()).resolves.not.toThrow()
    expect(apiRequest.deleteAuthToken).toHaveBeenCalled()
    expect(deleteAuthToken).toHaveBeenCalled()
    expect(deleteValue).toHaveBeenCalledWith('authData')
})

test('purge authentication data from all sources, reject with error if error', async () => {
    const err = { err: 'test error' }
    deleteValue.mockImplementation(() => Promise.reject(err))
    await expect(clearAuthData()).rejects.toBe(err)
})
