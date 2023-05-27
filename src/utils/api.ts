export function isIResponseError(object: any): object is IResponseError & {error?: string} {
    return "isError" in object || 'error' in object;
  }