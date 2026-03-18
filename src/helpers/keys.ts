import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { keysPath } from '../constants'
import { homedir } from 'node:os'

export async function saveUserKeys(spaceheyKey: string, napoleonKey: string) {
    await mkdir(homedir().concat('/.spaceheon'))

    return writeFile(
        keysPath,
        JSON.stringify({ spaceheyKey, napoleonKey }, null, 2),
    )
}

export async function getUserKeys() {
    const file = await readFile(keysPath, { encoding: 'utf-8' })
    const { napoleonKey, spaceheyKey } = JSON.parse(file) as {
        spaceheyKey: string
        napoleonKey: string
    }

    return { spaceheyKey, napoleonKey }
}
