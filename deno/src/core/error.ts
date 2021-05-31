import { ApiError, ResponseParameters } from '../platform.ts'

/**
 * This class represents errors that are thrown by grammY because the Telegram
 * Bot API responded with an error.
 *
 * Instances of this class hold the information that the Telegram backend
 * returned.
 *
 * If this error is thrown, grammY could successfully communicate with the
 * Telegram Bot API servers, however, an error code was returned for the
 * respective method call.
 */
export class GrammyError extends Error implements ApiError {
    /** Flag that this request was unsuccessful. Always `false`. */
    public readonly ok: false = false
    /** An integer holding Telegram's error code. Subject to change. */
    public readonly error_code: number
    /** A human-readable description of the error. */
    public readonly description: string
    /** Further parameters that may help to automatically handle the error. */
    public readonly parameters: ResponseParameters
    constructor(
        message: string,
        err: ApiError,
        /** The called method name which caused this error to be thrown. */
        public readonly method: string,
        /** The payload that was passed when calling the method. */
        public readonly payload: Record<string, unknown>
    ) {
        super(`${message} (${err.error_code}: ${err.description})`)
        this.error_code = err.error_code
        this.description = err.description
        this.parameters = err.parameters ?? {}
    }
}

/**
 * This class represents errors that are thrown by grammY because an HTTP call
 * to the Telegram Bot API failed.
 *
 * Instances of this class hold the error object that was created because the
 * fetch call failed. It can be inspected to determine why exactly the network
 * request failed.
 *
 * If an [API transformer
 * function](https://grammy.dev/advanced/transformers.html) throws an error,
 * grammY will regard this as if the network request failed. The contained error
 * will then be the error that was thrown by the transformer function.
 */
export class HttpError extends Error {
    constructor(
        message: string,
        /** The thrown error object. */
        public readonly error: unknown
    ) {
        super(message)
    }
}
