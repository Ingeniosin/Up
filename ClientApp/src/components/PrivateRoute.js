import {Navigate} from "react-router-dom";

const PrivateRoute = ({condition, children, eject}) => {
    return condition ? children : <Navigate to={eject} />;
};

export default PrivateRoute;
