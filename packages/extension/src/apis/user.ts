const api_url = 'http://localhost:9000';
export const loginApi = async (data: object) => {
  const res = await fetch(`${api_url}/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const registerApi = async (data: object) => {
  const res = await fetch(`${api_url}/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const sendCodeApi = async (data: object) => {
  const res = await fetch(`${api_url}/verifyCode`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return await res.json();
};
