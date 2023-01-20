function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  if (!fetch) {
    throw new Error('The "fetch" function does not exist.');
  }

  return fetch(url, config)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data as TResponse;
    });
}

export default request;
