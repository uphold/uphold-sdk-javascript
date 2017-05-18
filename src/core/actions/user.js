import merge from 'lodash.merge';

export function getMe(options) {
  return this.api('/me', options);
}

export function updateMe({ address, birthdate, country, firstName, identity, lastName, settings, state, username }, options) {
  return this.api('/me', merge({
    body: {
      address,
      birthdate,
      country,
      firstName,
      identity,
      lastName,
      settings,
      state,
      username
    },
    method: 'patch'
  }, options));
}
