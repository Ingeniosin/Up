const FormOverlay = ({children}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{height: '100vh',}}>
            <div className="p-5 rounded bg-white shadow-lg" style={{width: '400px', minHeight: '400px', textAlign: "center"}}>
                {children}
            </div>
        </div>
    );
};

export default FormOverlay;
