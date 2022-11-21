const Overlay = ({title, children, text}) => {
    return (
        <div className="container-sm p-5 rounded rounded-3 bg-white shadow h-100">

            {
                title &&  <h2 style={{marginBottom: "30px", textAlign: 'center'}}>{title}</h2>

            }
            {
                text &&  <p>{text}</p>
            }

            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Overlay;
