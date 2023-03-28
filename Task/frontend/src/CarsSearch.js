import React,{useState} from 'react'
import { getCarsFromApi } from './CarsApi';

// Search by Car Make
function CarsSearch() {

    //Declare state
    const[started, setStarter]= useState(false);
    const[cars,setCars] = useState([]);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    const[searchCar,setSearchCar] = useState("");
    

    // Fetch the data from the API
    function componentDidMount(searchCar) {
      
        if(searchCar ===""){
            searchCar="No Car"
        }
        // Fetch data from API and update
        getCarsFromApi(`cars/${searchCar}`)
        .then(result => {
            setIsLoaded(true);
            setCars(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        });  
    }

    // If not started yet, display Search Field
    if(started === false){
        return(<div>
            <h2>SEARCH BY CAR MAKE</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>MAKE:</td>
                            <td><input value={searchCar}   name="searchCar" onChange={e => {setSearchCar(e.target.value)}} type="text"/></td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={() =>{ componentDidMount(searchCar); setStarter(true)}}>DISPLAY SEARCH CARS</button>
            </div>)
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        //Return the search results
        return(
            <div>
                <h2>SEARCH BY CAR MAKE:</h2>
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

export default CarsSearch