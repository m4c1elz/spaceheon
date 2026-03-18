import enquirer from 'enquirer'
import { saveUserKeys } from '../helpers/keys'

export async function setup() {
    const { napoleonSessionId, spaceheySessionId } = await enquirer.prompt<{
        spaceheySessionId: string
        napoleonSessionId: string
    }>([
        {
            message: 'Insert your Spacehey Session ID: ',
            name: 'spaceheySessionId',
            type: 'input',
        },
        {
            message: 'Insert your Napoleon Session ID: ',
            name: 'napoleonSessionId',
            type: 'input',
        },
    ])

    await saveUserKeys(spaceheySessionId, napoleonSessionId)
}
