import { FetchResponse } from '../ts/interfaces'

export const NetworkError = (res: FetchResponse) => {
    const error = new Error('Error ' + res.status + ': ' + res.statusText)
    return error
}
