import storage from '../../storage'
import { loadValue } from '../index'

jest.mock('../../storage')

describe('Load values from local storage from given key', () => {
    const key = 'key'
    const value = 'test'
    storage.load.mockReturnValueOnce(Promise.resolve(value))
    it('should return a promise that resolves with the request value', async () => {
        await expect(loadValue(key)).resolves.toBe(value)
        expect(storage.load).toHaveBeenCalledWith({ key })
        expect.assertions(2)
    })

    it('should reject with an error on error', async () => {
        const err = new Error('test')
        storage.load.mockReturnValueOnce(Promise.reject(err))
        await expect(loadValue(key)).rejects.toBe(err)
        expect(storage.load).toHaveBeenCalledWith({ key })
        expect.assertions(2)
    })
})
