import merge from 'lodash/merge';

export function getMe(options) {
  return this.api('/me', options);
}

export function updateMe({ address, birthdate, country, firstName, identity, lastName, password, settings, state, username }, otp, options) {
  options = merge({
    body: {
      address,
      birthdate,
      country,
      firstName,
      identity,
      lastName,
      password,
      settings,
      state,
      username
    },
    method: 'patch'
  }, options);

  if (otp) {
    options.headers = {
      'otp-token': otp,
      ...options.headers
    };
  }

  return this.api('/me', options);
}
