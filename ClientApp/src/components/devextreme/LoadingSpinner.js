import React from 'react';

const LoadingSpinner = () => {
    return (
       <div className="dx-flex-layout flex-column justify-content-center align-items-center">
           <div className="spinner-border " role="status"></div>
           <h1>Conectando con Up...</h1>
       </div>
    );
};

export default LoadingSpinner;
