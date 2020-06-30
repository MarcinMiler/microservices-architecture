import * as TE from 'fp-ts/lib/TaskEither'
import * as O from 'fp-ts/lib/Option'
import * as P from 'fp-ts/lib/pipeable'
import * as A from 'fp-ts/lib/Array'

import * as amqplib from 'amqplib'

import { getEnv } from '../../utils'
import { tryToConnect } from '../../retry'

const RABBITMQ_USER_ENV = 'RABBITMQ_DEFAULT_USER'
const RABBITMQ_PASS_ENV = 'RABBITMQ_DEFAULT_PASS'
const RABBITMQ_HOST_ENV = 'RABBITMQ_HOST'

const buildRabbitConnectionString = () =>
    P.pipe(
        [RABBITMQ_USER_ENV, RABBITMQ_PASS_ENV, RABBITMQ_HOST_ENV],
        A.map(key =>
            P.pipe(
                getEnv(key),
                O.getOrElse(() => '')
            )
        ),
        ([user, pass, host]) => `amqp://${user}:${pass}@${host}`
    )

export const connectToRabbit = TE.tryCatch(
    () => amqplib.connect(buildRabbitConnectionString()),
    () => 'Failed connecting to rabbitmq'
)

export const tryConnectToRabbit = tryToConnect<amqplib.Connection>(
    connectToRabbit
)
