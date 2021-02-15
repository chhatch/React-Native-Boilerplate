import { apiRequest } from '../'
import { dispatch } from '../../../redux/ConfigureStore'
import { DELETE_API_TOKEN, SET_API_TOKEN } from '../../actionTypes'

test('set auth token', () => {
    const token = 'testToken'
    const action = { type: SET_API_TOKEN }

    const returnVal = apiRequest.setAuthToken(token)
    expect(returnVal).toEqual(token)
    expect(apiRequest.defaults.headers.common['Authorization']).toEqual(token)
    expect(dispatch.mock.calls[0][0]).toEqual(action)
})

test('delete auth token', () => {
    const action = { type: DELETE_API_TOKEN }

    apiRequest.deleteAuthToken()
    expect(apiRequest.defaults.headers.common['Authorization']).toEqual(null)
    expect(dispatch.mock.calls[1][0]).toEqual(action)
})
