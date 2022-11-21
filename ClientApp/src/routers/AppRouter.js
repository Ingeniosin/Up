import {Drawer} from "devextreme-react";
import {useContext, useState} from "react";
import {Route, Routes} from "react-router-dom";
import LoginForm from "../components/auth/login/LoginForm";
import AuthOverlay from "../components/auth/AuthOverlay";
import RecoverForm from "../components/auth/recover/RecoverForm";
import RegisterForm from "../components/auth/register/RegisterForm";
import Generate from "../components/Generate";
import Menu from "../components/navigation/Menu";
import Params from "../components/Params";
import PrivateRoute from "../components/PrivateRoute";
import Records from "../components/Records";
import Users from "../components/Users";
import {AuthContext} from "../context/AuthContext";

const AppRouter = () => {
    const {isLogged} = useContext(AuthContext);
    return (

            <Routes>
                <Route path={"/auth/*"} element={
                    <PrivateRoute condition={!isLogged} eject={"/"}>
                        <AuthRouter/>
                    </PrivateRoute>
                }/>
                <Route path={"/*"} element={
                    <PrivateRoute condition={isLogged} eject={"/auth/login"}>
                        <DashRouter/>
                    </PrivateRoute>
                }/>
            </Routes>
    );
};

const AuthRouter = () => {
    return (
        <AuthOverlay>
            <Routes>
                <Route path={"/login"} element={<LoginForm/>}/>
                <Route path={"/register"} element={<RegisterForm/>}/>
                <Route path={"/recover"} element={<RecoverForm/>}/>
            </Routes>
        </AuthOverlay>
    );
};

const DashRouter = () => {
    const [opened, setOpened]= useState(true);

    return (
        <div className="up-container dx-viewport">
            <Drawer
                opened={opened}
                openedStateMode={'shrink'}
                position={'left'}
                revealMode={'slide'}
                component={Menu}
                width={"100%"}
                height={"100%"}>
                <div className="up-content py-5 {/*d-flex flex-column align-items-center justify-content-center*/}">
                    <div className="container-sm">
                        <Routes>
                            <Route path={"/users"} element={<Users/>}/>
                            <Route path={"/"} element={<Records/>}/>
                            <Route path={"/params"} element={<Params/>}/>
                            <Route path={"/generate"} element={<Generate/>}/>
                        </Routes>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};


export default AppRouter;
