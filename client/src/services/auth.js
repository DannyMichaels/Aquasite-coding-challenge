import api from './apiConfig';

export const loginUser = async (loginData) => {
  try {
    const resp = await api?.post('/auth/login', { authentication: loginData });
    localStorage.setItem('authToken', resp?.data?.token);
    api.defaults.headers.common.authorization = `Bearer ${resp?.data?.token}`;
    return resp?.data?.user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/users/', { user: registerData });
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    try {
      const resp = await api.get('/auth/verify');
      return resp.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

export const putUser = async (id, userData) => {
  try {
    const token = localStorage.getItem('authToken');
    const resp = await api.put(
      `/users/${id}`,
      { user: userData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getOneUser = async (id) => {
  try {
    const resp = await api.get(`/users/${id}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
};
