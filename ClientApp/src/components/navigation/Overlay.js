const Overlay = ({title, children}) => {
    return (
        <>
            <h3 style={{marginBottom: "30px", textAlign: 'center'}}>{title}</h3>
            {children}
        </>
    );
};

export default Overlay;
