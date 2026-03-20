import { ok, err, Result, fromPromise } from 'neverthrow'
import keytar from 'keytar'
import { AppError, Keys } from '../types'
import { homedir } from 'node:os'
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { keysPath } from '../constants'

export async function saveUserKeys(spaceheyKey: string, napoleonKey: string) {
    await mkdir(homedir().concat('/.spaceheon'))

    return writeFile(
        keysPath,
        JSON.stringify({ spaceheyKey, napoleonKey }, null, 2),
    )
}

export async function getUserKeys(): Promise<Result<Keys, AppError>> {
    const fileResult = await fromPromise(
        readFile(keysPath, { encoding: 'utf-8' }),
        e => e as Error,
    )

    if (fileResult.isErr()) {
        return err({
            message:
                'Could not get session IDs! Please run "spaceheon setup" first.',
        })
    }

    const { napoleonKey, spaceheyKey } = JSON.parse(fileResult.value) as {
        spaceheyKey: string
        napoleonKey: string
    }

    if (!spaceheyKey || !napoleonKey) {
        return err({
            message:
                'Setup keys were not found! Please run "spaceheon setup" first.',
        })
    }

    return ok({ spaceheyKey, napoleonKey })
}
