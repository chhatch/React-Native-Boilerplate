import storage from '../../localStorage/storage'

export const loadValue = (key: string) =>
    storage
        .load({
            key: key,
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return Promise.reject(err)
        })
