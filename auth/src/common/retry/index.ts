import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as P from 'fp-ts/lib/pipeable'
import * as C from 'fp-ts/lib/Console'
import * as Retry from 'retry-ts'
import * as RetryTE from 'retry-ts/lib/Task'

const defaultPolicyOfRetrying = Retry.capDelay(
    2000,
    Retry.monoidRetryPolicy.concat(
        Retry.exponentialBackoff(200),
        Retry.limitRetries(10)
    )
)

const log = (status: Retry.RetryStatus) =>
    TE.rightIO(
        C.log(
            P.pipe(
                status.previousDelay,
                O.map(delay => `Retrying in ${delay} miliseconds...`),
                O.getOrElse(() => 'First attempt...')
            )
        )
    )

export const tryToConnect = <Connection>(
    connection: TE.TaskEither<string, Connection>,
    policy: Retry.RetryPolicy = defaultPolicyOfRetrying
) =>
    RetryTE.retrying(
        policy,
        status => P.pipe(log(status), TE.apSecond(connection)),
        E.isLeft
    )
