const api_url = 'http://localhost:9000';
export const loginApi = (data: object) => {
  return fetch(`${api_url}/login`, {
    method: 'post',
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const registerApi = (data: object) => {
  return fetch(`${api_url}/register`, {
    method: 'post',
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const sendCodeApi = (data: object) => {
  return fetch(`${api_url}/sendCode`, {
    method: 'post',
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
