export { ThunkAction } from 'redux-thunk'

export interface Action {
    type: string
    payload: any
}

export interface FetchResponse {
    ok: boolean
    status: any
    statusText: string
    text(): Promise<string>
}
