import {ButtonItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {useContext, useRef} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import CustomForm from "../../../dynamic/devextreme/CustomForm";

const Form = () => {
    const formRef = useRef(null);

    const {login} = useContext(AuthContext);

    const onSubmit = async (e) => {
        const {getData, isValidAsync} = formRef.current;
        const isValid = await isValidAsync();
        if (!isValid) return;
        const {email, password} = getData();
        await login(email, password);
    }

    return (
        <CustomForm onEnterKey={onSubmit} reference={formRef}>
            <SimpleItem dataField={"email"} editorType={"dxTextBox"} label={{text: "Correo electrónico"}}>
                <RequiredRule message={"El correo electrónico es requerido"}/>
            </SimpleItem>
            <SimpleItem dataField={"password"} editorType={"dxTextBox"} label={{text: "Contraseña",}} editorOptions={{mode: "password"}}>
                <RequiredRule message={"La contraseña es requerida"}/>
            </SimpleItem>
            <ButtonItem horizontalAlignment={"center"} colSpan={2} buttonOptions={{text: "Iniciar sesión", type: "default", onClick: onSubmit}}/>
        </CustomForm>
    )
}

const LoginForm = () => {
    const {login} = useContext(AuthContext);

    return (
        <>
            <h5>Iniciar sesión</h5>
            <hr/>
            <Form/>
            <hr/>
            <span className="text-muted" style={{fontSize: "0.8rem",}}>¿No tienes una cuenta?
                <Link to={"/auth/register"} className="text-decoration-none" style={{color: "#8000ff",}}> Regístrate</Link>
            </span>
            <br/>
            <span className="text-muted" style={{fontSize: "0.8rem",}}>¿Olvidaste tu contraseña?
                <Link to={"/auth/recover"} className="text-decoration-none" style={{color: "#8000ff",}}> Recupérala</Link>
            </span>

        </>
    );
};

export default LoginForm;
