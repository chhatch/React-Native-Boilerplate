import { FetchResponse } from '../../ts/interfaces'
import { handleError, NetworkError } from '../../errors/module'

export default (res: FetchResponse) => {
    if (res.ok) {
        return res
    } else {
        throw NetworkError(res)
    }
}
