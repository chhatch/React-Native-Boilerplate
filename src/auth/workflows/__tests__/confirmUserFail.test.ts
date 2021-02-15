import { confirmUserFail } from '../confirmUserFail'
import { setAlert } from '../../../alert/services/setAlert'

jest.mock('../../../alert/services/setAlert')

test('handle confirm user failure', () => {
    const err = { message: 'test' }
    confirmUserFail(err)
    expect(setAlert).toHaveBeenCalledWith(err.message, 'error')
})
