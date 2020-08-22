import React, { useEffect, useState } from 'react';
import { getBirds } from "./../../services/birdService";
const BirdsList = () => {
    const [ birds, setBirds ] = useState();
    const [ username, setUsername ] = useState([]);
    useEffect(() => {
        getBirds()
        .then(response => {
            let birds = response.data.result;
            setBirds(birds);
        })
        .catch(error => console.log(error, error.response));
    }, []);
    return (
        <div className="row mt-2">
            <div className="col-md-3">
                {birds && birds.map((bird, key) => {
                    return <div className="card">
                        <img src="https://images.unsplash.com/5/unsplash-kitsune-4.jpg" alt="..." class="img-thumbnail" />
                        <div className="card-body">
                            <h5 className="card-title">{bird.local_name}</h5>
                            <p className="card-text">
                                <strong>Distribution / Residential status : </strong> {bird.residential_status}
                            </p>
                            <p className="card-text">
                                <strong>Diet of Bird : </strong> {bird.diet}
                            </p>
                            <p className="card-text">
                                <strong>Published by : </strong> {bird.created_by_user.name}
                            </p>
                        </div>
                    </div>;
                })}
            </div>
        </div>
    );
}
 
export default BirdsList;