import Background from "./background/Background";
import FormOverlay from "./FormOverlay";

const AuthOverlay = ({children}) => {
    return (
        <>
            <Background/>
            <FormOverlay>
                {children}
            </FormOverlay>
        </>
    );
};

export default AuthOverlay;
