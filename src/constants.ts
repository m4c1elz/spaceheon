import { createSpinner } from 'nanospinner'
import { homedir } from 'node:os'

export const keysPath = homedir().concat('/.spaceheon/keys.json')

export const spinner = createSpinner()
