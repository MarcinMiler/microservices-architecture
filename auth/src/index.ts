import * as TE from 'fp-ts/lib/TaskEither'
import * as P from 'fp-ts/lib/pipeable'

import { tryConnectToRabbit } from './common/connections/rabbitmq'

const program = P.pipe(
    tryConnectToRabbit,
    TE.chain(rabbitClient =>
        TE.tryCatch(
            () => rabbitClient.createChannel(),
            () => 'Failed on creating channel'
        )
    ),
    TE.chain(channel => {
        channel.assertQueue('hello')
        channel.consume('hello', msg => {
            console.log(msg.content.toString())
        })

        return TE.right(channel)
    })
)

program()
