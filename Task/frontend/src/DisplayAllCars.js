import React,{useState} from 'react'
import { getCarsFromApi } from './CarsApi';

// Search for all the cars on the system
function DisplayAllCars() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[cars,setCars] = useState([]);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    
    // Fetch the data from the API
    function componentDidMount() {
        // Fetch data from API and update
        getCarsFromApi(`/api`)
        .then(result => {
            setIsLoaded(true);
            setCars(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        });  
    }

    // If not started yet, return button to start search
    if(started === false){
        return(
            <div>
                <h2>DISPLAY ALL THE CARS:</h2>
                <button onClick={() =>{ componentDidMount(); setStarter(true)}}>SEARCH ALL CARS</button>
            </div>
        )
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Show all Cars on the system
        return(
            <div>
                <h2>DISPLAY ALL THE CARS:</h2>
                <table>
                    <thead>
                        <tr>
                        <th>ID</th><th>MAKE</th><th>MODEL</th><th>SEATS</th><th>IMAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(element => {
                            return(
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.make}</td>
                                    <td>{element.model}</td>
                                    <td>{element.seats}</td>
                                    <td><img src={element.img} alt="car"></img></td>
                                </tr> 
                            )  
                        })}
                    </tbody>
                </table>
                <button onClick={() =>{ setStarter(false)}}>CLOSE SEARCH</button>
            </div>
        )
    }
}

export default DisplayAllCars