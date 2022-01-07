function fetchImages(query, page) {
    return fetch(`https://pixabay.com/api/?key=24148386-011d38fdfa24550f9a52c4ec8&q=${query}&image_type=photo&per_page=12&page=${page}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error('No matches found'),);
    });
}

const api = {
    fetchImages
}

export default api;