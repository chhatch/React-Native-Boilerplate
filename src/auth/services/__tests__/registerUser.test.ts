import { apiRequest, registerUser } from '../index'
import { saveValue } from '../../../localStorage/services'
import { dispatch } from '../../../redux/ConfigureStore'
import { UPDATE_USER } from '../../actionTypes'

const email = 'email'
const role = 'test'
var mockResults = []
const mockSetResults = (endpoint, payload) => {
    mockResults.push({ endpoint, payload })
}
const mockUserData = { email, role: 'test' }

jest.mock('../apiRequest', () => {
    return {
        __esModule: true,
        apiRequest: {
            post: jest.fn(),
        },
    }
})

test('retrieve user data', async () => {
    const dispatchCalls = [
        [
            {
                payload: {
                    email,
                    role,
                },
                type: UPDATE_USER,
            },
        ],
    ]

    const expected = {
        endpoint: '/user/new',
        payload: { email },
    }
    expect.assertions(3)

    //implementation for first registerUser call
    apiRequest.post.mockImplementation((endpoint, payload) => {
        mockSetResults(endpoint, payload)
        return Promise.resolve({ data: mockUserData })
    })
    await expect(registerUser(email)()).resolves.not.toThrow()
    expect(mockResults[0]).toEqual(expected)
    expect(dispatch.mock.calls).toEqual(dispatchCalls)
})

test('retrieve user data, do not set user if not found', async () => {
    const expected = {
        endpoint: '/user/new',
        payload: { email },
    }
    const requestError = { response: { status: 500 } }
    dispatch.mock.calls = []

    expect.assertions(3)

    //implementation for first registerUser call
    apiRequest.post.mockImplementation((endpoint, payload) => {
        mockSetResults(endpoint, payload)
        return Promise.reject(requestError)
    })
    await expect(registerUser(email)()).rejects.toBe(requestError)
    expect(mockResults[1]).toEqual(expected)
    expect(dispatch.mock.calls.length).toEqual(1)
})
