import apiRequest from '../apiRequest'
import { setAuthToken } from '../actionCreators'
import { SET_AUTH_TOKEN } from '../../redux/ActionTypes'

test('set auth token', () => {
    const token = 'testToken'
    const action = { type: SET_AUTH_TOKEN, payload: token }
    const dispatch = (action) => (resultingAction = action)
    var resultingAction = null

    setAuthToken(token)(dispatch)

    expect(resultingAction).toEqual(action)
    expect(apiRequest.defaults.headers.common['Authorization']).toEqual(token)
})
