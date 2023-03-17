const credentials = {
  token: null,
};

export const apiFetch = (url, body, config) => {
  const options = {
    method: "GET",
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + loadCredentials(),
      ...config?.headers,
    },
    body: JSON.stringify(body),
  };

  return fetch(url, options);
};

export const setCredentials = (email, password) => {
  credentials.token = btoa(email + ":" + password);
  localStorage.setItem("token", credentials.token);
};

export const loadCredentials = () => {
  if ([null, ""].includes(credentials.token)) {
    credentials.token = localStorage.getItem("token") ?? "";
  }
  return credentials.token;
};
