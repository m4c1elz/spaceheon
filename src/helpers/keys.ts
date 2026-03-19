import keytar from 'keytar'

export async function saveUserKeys(spaceheyKey: string, napoleonKey: string) {
    await Promise.all([
        keytar.setPassword('spaceheon', 'spacehey_sessid', spaceheyKey),
        keytar.setPassword('spaceheon', 'napoleon_sessid', napoleonKey),
    ])
}

export async function getUserKeys() {
    const spaceheyKey = await keytar.getPassword('spaceheon', 'spacehey_sessid')
    const napoleonKey = await keytar.getPassword('spaceheon', 'napoleon_sessid')

    if (!spaceheyKey || !napoleonKey) {
        throw new Error('Keys not found')
    }

    return { spaceheyKey, napoleonKey }
}
