import React,{useState} from 'react'
import { carsApiAmend } from './CarsApiAmend';

// Function to Delete Cars on the System by ID
function CarsDelete() {

    //Declare state of variables
    const[started, setStarter]= useState(false);

    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    const[deleteCarById,setDeleteCarById] = useState(-1);
    const[deletedCar,setDeletedCar] = useState([])
   

    // Fetch the data from the API and Delete
    function componentDidMount(deleteCarById) {

        //Method Delete
        let method = "DELETE"
      
        // If a blank ID or negative - give error display
        if(deleteCarById ==="" || deleteCarById<0 ){
            setIsLoaded(true);
            setDeletedCar({"id":`${deleteCarById}`,"make":"N/A","model":"N/A","seats":"N/A","img":"https://toppng.com/uploads/preview/cross-wrong-cross-transparent-background-11562851969ihtu0kgnjy.png"});
        }
        else{
        // Fetch data from API and Delete Car
        carsApiAmend(`cars/${deleteCarById}`,method)
        .then(result => {
            setIsLoaded(true);
            setDeletedCar(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
        } 
    }

    // If not started, Ask user for ID of car to be deleted
    if(started === false){
        return(<div>
            <h2>DELETE CAR BY ID</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>ID:</td>
                            <td><input  name="deleteCarById" onChange={e => {setDeleteCarById(e.target.value)}}  type="number"/></td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={() =>{ componentDidMount(deleteCarById); setStarter(true)}}>DELETE CAR</button>
            </div>)
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Display back to the user the information of the car that was deleted
        return(
        <div>
            <h2>DELETED CAR:</h2>
            <table>
                <thead>
                    <tr>
                    <th>ID</th><th>MAKE</th><th>MODEL</th><th>SEATS</th><th>IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{deletedCar.id}</td>
                        <td>{deletedCar.make}</td>
                        <td>{deletedCar.model}</td>
                        <td>{deletedCar.seats}</td>
                        <td><img src={deletedCar.img} alt="car"></img></td>
                    </tr> 
                </tbody>
            </table>
            <button onClick={() =>{ setStarter(false)}}>CLOSE INFORMATION</button>
        </div>
      )
    }
}

export default CarsDelete