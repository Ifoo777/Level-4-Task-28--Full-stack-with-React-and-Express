// Fetch data from API to show cars
export const getCarsFromApi = (url) =>{
    return fetch(url)
    .then(res => res.json())
};
