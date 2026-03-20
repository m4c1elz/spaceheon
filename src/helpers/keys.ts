import { ok, err, Result } from 'neverthrow'
import keytar from 'keytar'
import { AppError, Keys } from '../types'

export async function saveUserKeys(spaceheyKey: string, napoleonKey: string) {
    await Promise.all([
        keytar.setPassword('spaceheon', 'spacehey_sessid', spaceheyKey),
        keytar.setPassword('spaceheon', 'napoleon_sessid', napoleonKey),
    ])
}

export async function getUserKeys(): Promise<Result<Keys, AppError>> {
    const [spaceheyKey, napoleonKey] = await Promise.all([
        keytar.getPassword('spaceheon', 'spacehey_sessid'),
        keytar.getPassword('spaceheon', 'napoleon_sessid'),
    ])

    if (!spaceheyKey || !napoleonKey) {
        return err({
            message:
                'Setup keys were not found! Please run "spaceheon setup" first.',
        })
    }

    return ok({ spaceheyKey, napoleonKey })
}
