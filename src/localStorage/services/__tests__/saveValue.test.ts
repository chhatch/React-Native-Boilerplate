import { dispatch } from '../../../redux/ConfigureStore'
import { saveValue } from '../index'
import {
    savingValue,
    savingValueFail,
    savingValueSuccess,
} from '../../actionCreators'
//we don't want this exported from index
import { storageSave } from '../storageSave'

jest.mock('../storageSave')
jest.mock('../../actionCreators')

curryMock(savingValue, 1)
curryMock(savingValueFail, 1)
curryMock(savingValueSuccess, 1)

describe('Save key value pairs to local storage, dispatch action also, returning a promise', () => {
    const key = 'key'
    const value = 'test'
    it('should save with the key and value provided, returning a promise', async () => {
        storageSave.mockReturnValue(Promise.resolve())
        await expect(saveValue(key)(value)).resolves.not.toThrow()
        expect(storageSave).toHaveBeenCalledWith(key, value)
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(savingValue).toHaveBeenCalledWith(key, value)
        expect(savingValueSuccess).toHaveBeenCalledWith(key, value)
        expect.assertions(5)
    })
})
