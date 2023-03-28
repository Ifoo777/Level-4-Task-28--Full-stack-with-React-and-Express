// Fetch data from API and Add, Update, Delete and Amend data
export const carsApiAmend = (url, dataMethod, data) =>{
    
    console.log(data)
    return fetch(url, {
        
        method: dataMethod,
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
    })
    .then(response => response.json()); // parses response to JSON           
};

