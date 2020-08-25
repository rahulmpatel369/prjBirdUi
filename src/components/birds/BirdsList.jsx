import React, { useEffect, useState } from 'react';
import { getBirds, getUnverifiedBirds, verifyBird as verifyBirdServer } from "./../../services/birdService";
import { handleHttpError } from "./../../services/httpErrorService";
import { generateNotification } from "./../../services/notificationService";

const BirdsList = ({ type }) => {
    const [ birds, setBirds ] = useState([]);

    const handleSuccess = (response) => {
        if(response.status === 200){
            const birds = response.data.result;
            setBirds(birds);
        }
    }

    const handleBirdVerifySuccess = (response) => {
        if(response.status === 200){    
            generateNotification({title: "Bird Verified", text: "", icon: "success"}); 
        }
    }

    useEffect(() => {
        console.log(type)
        if(type === "unverified"){
            getUnverifiedBirds()
            .then(httpResponse => handleSuccess(httpResponse))
            .catch(httpResponse => handleHttpError(httpResponse.response));
        }else{
            getBirds()
            .then(httpResponse => handleSuccess(httpResponse))
            .catch(httpResponse => handleHttpError(httpResponse.response));
        }
    }, []);

    const verifyBird = (birdId) => {
        verifyBirdServer(birdId)
        .then(httpResponse => handleBirdVerifySuccess(httpResponse))
        .catch(httpResponse => handleHttpError(httpResponse.response));
        console.log(birdId);
    }

    return (
        <div className="row mt-2">
            {birds.length == 0 && <div className="col-md-12 alert alert-warning">No Birds Found</div>}
            {birds && birds.map((bird, key) => {
                return <div className="col-md-4" key={key}>
                    <div className="card">
                    <img src={"http://local.prjbirdservice.com" + bird.image} alt="..." className="img-thumbnail" />
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
                    {type === "unverified"  && 
                    <div className="card-footer">
                        <button type="button" className="btn btn-success btn-sm float-right" onClick={e => verifyBird(bird.id)}>Verify</button>
                    </div>
                    }
                    </div>
                </div>;
            })}
        </div>
    );
}
 
export default BirdsList;