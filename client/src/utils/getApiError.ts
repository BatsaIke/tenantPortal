// Parse different error shapes that come back from Axios requests.
// Always return a user-friendly string.
export const getApiError = (err: unknown): string => {
    if (err && typeof err === 'object') {
      const e = err as any;
  
      /* Axios response present? ------------------------------------ */
      const data = e.response?.data;
      if (data) {
        if (typeof data === 'string')          return data;
        if (typeof data.error   === 'string')  return data.error;
        if (typeof data.message === 'string')  return data.message;
        if (Array.isArray(data.errors) && data.errors[0]?.message)
          return data.errors[0].message;
      }
  
      /* Fallback to Error.message ---------------------------------- */
      if (typeof e.message === 'string') return e.message;
    }
  
    return 'Something went wrong. Please try again.';
  };
  