import axios from 'axios'

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})


// Get Method
export const getApiData =  async() =>{ 
    const res = await api.get('posts');
    console.log(res);
    return res.data;
}


//Delete Method
export const deleteApiData = async(id) => {
    const response = await api.delete(`posts/${id}`);
    return response;
}


//Post Method

export const addApiData = async (newPost) => {
  const response = await api.post('posts', newPost);
  return response.data;
};

//Put Method

export const updateApiData = async (id, updatedPost) => {
    const response = await api.put(`/posts/${id}`, updatedPost);
    return response.data;
};

