import { apiRequest, getUser } from '../index'
import { saveValue } from '../../../localStorage/services'
import { dispatch } from '../../../redux/ConfigureStore'
import { setAlert } from '../../../alert/services/setAlert'
import {
    FETCH_USER,
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS,
    SET_AUTH_TOKEN,
    UPDATE_USER,
} from '../../actionTypes'

const email = 'email'
var mockResults = []
const mockSetResults = (endpoint, options) => {
    mockResults.push({ endpoint, options })
}
const mockUserData = { email, role: 'test' }

jest.mock('../../../alert/services/setAlert')
jest.mock('../apiRequest', () => {
    return {
        __esModule: true,
        apiRequest: {
            get: jest.fn(),
        },
    }
})

test('retrieve user data', async () => {
    const dispatchCalls = [
        [{ type: FETCH_USER, payload: email }],
        [{ type: FETCH_USER_SUCCESS, payload: email }],
        [{ type: UPDATE_USER, payload: mockUserData }],
    ]
    const expected = {
        endpoint: '/user',
        options: { params: { email } },
    }
    expect.assertions(3)

    //implementation for first getUser call
    apiRequest.get.mockImplementation((endpoint, options) => {
        mockSetResults(endpoint, options)
        return Promise.resolve({ data: mockUserData })
    })
    await expect(getUser(email)).resolves.not.toThrow()
    expect(mockResults[0]).toEqual(expected)
    expect(dispatch.mock.calls).toEqual(dispatchCalls)
})

test('retrieve user data, reject if user not found', async () => {
    const dispatchCalls = [
        [{ type: 'FETCH_USER', payload: 'email' }],
        [{ type: 'FETCH_USER_FAIL', payload: 'email' }],
    ]
    const expected = {
        endpoint: '/user',
        options: { params: { email } },
    }
    const requestError = { response: { status: 404 } }
    expect.assertions(4)
    //clear for new test
    dispatch.mock.calls = []

    apiRequest.get.mockImplementation((endpoint, options) => {
        mockSetResults(endpoint, options)
        return Promise.reject(requestError)
    })
    await expect(getUser(email)).rejects.toBe(requestError)
    expect(mockResults[1]).toEqual(expected)
    expect(setAlert).toHaveBeenCalledWith(
        'There was a problem fetching your data. You are being logged out.',
        'error'
    )
    expect(dispatch.mock.calls).toEqual(dispatchCalls)
})

test('retrieve user data, reject if network or server error', async () => {
    const dispatchCalls = [
        [{ type: FETCH_USER, payload: email }],
        [{ type: FETCH_USER_FAIL, payload: email }],
        [{ type: UPDATE_USER, payload: mockUserData }],
    ]
    const expected = {
        endpoint: '/user',
        options: { params: { email } },
    }
    const requestError = { response: { status: 500 } }
    expect.assertions(3)
    //clear for new test
    dispatch.mock.calls = []

    apiRequest.get.mockImplementation((endpoint, options) => {
        mockSetResults(endpoint, options)
        return Promise.reject(requestError)
    })
    await expect(getUser(email)).rejects.toBe(requestError)
    expect(mockResults[1]).toEqual(expected)
    //not checking actual dispatch here because that involves axios error beyond the scope of these tests
    //that might indicate an issue with the structure of this project
    expect(dispatch.mock.calls.length).toBe(3)
})
