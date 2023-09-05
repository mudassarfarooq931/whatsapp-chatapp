import axios from 'axios';

export const postRequestWithToken = async (token, id) => {
  try {
    const apiUrl = 'http://192.168.18.130:5000/api/allUsers'; // Replace with your API URL

    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      // id: '64f7107c989e9b97c3a076d9',
      id: '64f728d4744bf2350dac5582',
    };

    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });

    return res;
    // Handle the response here, e.g., update state or perform other actions
  } catch (error) {
    // Handle errors here, e.g., show an error message
    console.error('Error:...contacts', error);
  }
};
