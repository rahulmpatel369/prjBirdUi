import React from 'react';

const Input = ({ type, name, label, error, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} type={type || "text"} className="form-control" id={name} />
            <span className="text-danger">{error}</span>
        </div>
    );
}
 
export default Input;