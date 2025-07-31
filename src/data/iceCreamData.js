import axios from 'axios';

export const getMenu = () => {
    return axios.get('/api/menu').then((response) =>
        response.data.sort((a, b) => {
            if (a.iceCream.name < b.iceCream.name) return -1;
            if (a.iceCream.name > b.iceCream.name) return 1;
            return 0;
        })
    );
};

export const getIceCreamById = (id) => {
    return axios
        .get(`/api/menu/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const updateIceCream = (updatedIceCream) => {
    return axios
        .put(`/api/menu/${updatedIceCream.id.toString()}`, updatedIceCream)
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
};
