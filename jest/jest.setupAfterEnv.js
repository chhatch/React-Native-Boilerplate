curryMock = (baseFn, maxCurries = 0) => {
    var callIndex = 0
    var curries = []
    let returnFn

    baseFn.mockImplementation((arg) => {
        curries[callIndex] = 0
        const fn = returnFn(callIndex)
        callIndex++
        return fn
    })

    returnFn = (index) => {
        if (curries[index] < maxCurries) {
            curries[index]++
            return (...args) => {
                baseFn.mock.calls[index] = [...baseFn.mock.calls[index], ...args]
                return returnFn(index)
            }
        }
    }
}

sleep = (ms) => new Promise((resolve, _) => setTimeout(resolve, ms))
