import { dispatch } from '../../redux/ConfigureStore'
import { logOut } from '../thunks'
import { clearAuthData } from '../workflows/index'
import { LOG_OUT } from '../actionTypes'
import { logError } from '../../error/actionCreators'

jest.mock('../workflows/index')

describe('Log Out', () => {
    it('should log user out, returning a resolved promise on success', async () => {
        clearAuthData.mockReturnValueOnce(Promise.resolve())
        await expect(logOut(dispatch)).resolves.not.toThrow()
        expect(dispatch).toHaveBeenCalledWith({ type:LOG_OUT })
        expect(clearAuthData).toHaveBeenCalled()
        expect.assertions(3)
    })

    it('should log user out, returning a rejected promise on failure', async () => {
        const err = new Error('test')
        clearAuthData.mockReturnValueOnce(Promise.reject(err))
        await expect(logOut(dispatch)).rejects.toBe(err)
        expect.assertions(1)
    })
})
