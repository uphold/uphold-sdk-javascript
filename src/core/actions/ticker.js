export function getTicker(pair, options) {
  return this.api(`/ticker${pair ? `/${pair}` : ''}`, {
    authenticate: false,
    ...options
  });
}
