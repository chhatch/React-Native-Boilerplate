import storage from '../../localStorage/storage'

export const storageSave = (key: string, value: string) =>
    storage.save({
        key: key, // Note: Do not use underscore("_") in key!
        data: value,

        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600,
    })
