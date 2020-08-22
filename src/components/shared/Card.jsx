import React from 'react';

const Card = ({title, error, children}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4 mt-1">{title}</h4>
                <span className="text-danger">{error}</span>
                {children}
            </div>
        </div>
    );
}
 
export default Card;