import { deleteValue } from '../index'
import {
    deletingValue,
    deletingValueFail,
    deletingValueSuccess,
} from '../../actionCreators'
import { dispatch } from '../../../redux/ConfigureStore'
import { storageSave } from '../storageSave'

jest.mock('../../actionCreators')
jest.mock('../saveValue')
jest.mock('../storageSave')

const key = 'key'

describe('Delete values from local storage', () => {
    it('should replace the value for a given key with null', async () => {
        storageSave.mockReturnValueOnce(Promise.resolve())
        await expect(deleteValue(key)).resolves.not.toThrow()
        expect(storageSave).toHaveBeenCalledWith(key, null)
        expect(deletingValue).toHaveBeenCalled()
        expect(deletingValueSuccess).toHaveBeenCalled()
        expect.assertions(4)
    })

    it('should return rejected promise with error on error', async () => {
        const err = new Error('test')
        storageSave.mockReturnValueOnce(Promise.reject(err))
        await expect(deleteValue(key)).rejects.toBe(err)
        expect(storageSave).toHaveBeenCalledWith(key, null)
        expect(deletingValue).toHaveBeenCalled()
        expect(deletingValueFail).toHaveBeenCalled()
        expect.assertions(4)
    })
})
