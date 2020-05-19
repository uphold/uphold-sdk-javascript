import errors from '../errors';

export function createError(error, response) {
  // eslint-disable-next-line no-unused-vars
  for (const SDKError of errors) {
    if (SDKError.hasError && SDKError.hasError(error)) {
      return new SDKError({ ...error, response });
    }
  }
}
