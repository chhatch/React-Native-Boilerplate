import storage from '../../storage'
import { storageSave } from '../storageSave'

jest.mock('../../storage')
storage.save.mockReturnValue(Promise.resolve())
describe('Save key/value pairs to local storage', () => {
    const key = 'key'
    const value = 'test'
    it('should save with the key and value provided, returning a promise', async () => {
        await expect(storageSave(key, value)).resolves.not.toThrow()
        expect(storage.save).toHaveBeenCalledWith({'data': value, 'expires': 3600000, key})
        expect.assertions(2)
    })
})
