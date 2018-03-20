import errors from '../errors';

export function createError(error, response) {
  for (const SDKError of errors) {
    if (SDKError.hasError && SDKError.hasError(error)) {
      return new SDKError({ ...error, response });
    }
  }
}
