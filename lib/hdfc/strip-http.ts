/**
 * Removes SDK HTTP metadata before returning responses to callers or clients.
 */
export function stripHttpField<T extends Record<string, unknown>>(
  response: T
): Omit<T, "http"> {
  const { http: _http, ...rest } = response;
  return rest;
}
