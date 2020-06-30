import * as O from 'fp-ts/lib/Option'

export const getEnv = (key: string) => O.fromNullable(process.env[key])
