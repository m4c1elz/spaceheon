import { createSpinner } from 'nanospinner'
import { homedir } from 'node:os'

// file path for session keys
export const keysPath = homedir().concat('/.spaceheon/keys.json')

export const spinner = createSpinner()
