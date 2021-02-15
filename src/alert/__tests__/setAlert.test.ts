import { setAlert } from '../services/setAlert'
import { issueAlert, removeAlert } from '../actionCreators'
import { v4 as uuidv4 } from 'uuid'
import { dispatch } from '../../redux/ConfigureStore'
import { SET_ALERT, REMOVE_ALERT } from '../../redux/ActionTypes'

jest.mock('uuid')
jest.mock('../actionCreators')
jest.useFakeTimers()

const msg = 'test'
const id = 'testId-123'
uuidv4.mockReturnValue(id)

describe('Set alert', () => {
    it('should dispatch actions to set alerts and remove them after a set amount of time.', async () => {
        const alertType = 'error'
        const timeout = 2000
        const payload = { msg, type: alertType, id }

        setAlert(msg, alertType, timeout)

        expect(issueAlert).toHaveBeenCalledWith(payload)
        setTimeout(() => expect(removeAlert).not.toHaveBeenCalled(), timeout/2)
        setTimeout(() => expect(removeAlert).toHaveBeenCalled(), timeout)
        jest.advanceTimersByTime(timeout/2)
        jest.advanceTimersByTime(timeout)
        expect(dispatch).toHaveBeenCalledTimes(2)

        expect.assertions(4)
    })

    it('should set defaults for alert type and timeout.', async () => {
        jest.clearAllMocks()
        //current defaults in setAlert
        const alertType = 'success'
        const timeout = 5000
        const payload = { msg, type: alertType, id }

        setAlert(msg, alertType, timeout)

        expect(issueAlert).toHaveBeenCalledWith(payload)
        setTimeout(() => expect(removeAlert).not.toHaveBeenCalled(), timeout/2)
        setTimeout(() => expect(removeAlert).toHaveBeenCalled(), timeout)
        jest.advanceTimersByTime(timeout/2)
        jest.advanceTimersByTime(timeout)
        expect(dispatch).toHaveBeenCalledTimes(2)

        expect.assertions(4)
    })
})
