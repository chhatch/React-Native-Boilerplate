import { setAuthToken } from '../'
import { dispatch } from '../../../redux/ConfigureStore'
import { SET_AUTH_TOKEN } from '../../../redux/ActionTypes'

test('set auth token in store, return token', () => {
    const token = 'testToken'
    const action = { type: SET_AUTH_TOKEN, payload: token }

    const returnValue = setAuthToken(token)
    expect(returnValue).toEqual(token)
    expect(dispatch.mock.calls[0][0]).toEqual(action)
})
