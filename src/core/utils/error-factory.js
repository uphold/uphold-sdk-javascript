import errors from '../errors';

export function createError(response) {
  for (const SDKError of errors) {
    if (SDKError.hasError && SDKError.hasError(response)) {
      return new SDKError(response);
    }
  }
}
