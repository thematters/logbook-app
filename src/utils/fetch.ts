type ErrorResponse = {
  code: any;
  fields?: (string | undefined)[];
  message?: string;
};

type Options = {
  cookie?: string;
};

/**
 * Fetch Wrapper
 *
 * @see {https://jasonwatmore.com/post/2020/04/18/fetch-a-lightweight-fetch-wrapper-to-simplify-http-requests}
 */
const handleResponse = async (res: any) => {
  if (!res.ok) {
    const error = (await res.json()) as ErrorResponse;
    throw error;
  }

  return res.json();
};

function _get(url: string, options?: Options) {
  const { cookie } = options || {};

  return fetch(url, {
    method: "GET",
    credentials: "include",
    ...(cookie ? { headers: { cookie } } : {}),
  }).then(handleResponse);
}

function _post(url: string, body: any, options?: Options) {
  const { cookie } = options || {};

  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...(cookie ? { headers: { cookie } } : {}),
  }).then(handleResponse);
}

export const fetchWrapper = {
  get: _get,
  post: _post,
  handleResponse,
};
