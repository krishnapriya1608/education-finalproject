import axios from 'axios';

export const commonAPI = async (method, url, data, headers) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: headers?headers:['Content-Type:application/json'],
    });
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
