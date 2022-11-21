import {ButtonItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {useContext, useRef} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import CustomForm from "../../../dynamic/devextreme/CustomForm";

const Form = () => {
    const formRef = useRef(null);

    const {recoverPassword} = useContext(AuthContext);

    const onSubmit = async (e) => {
        const {getData, isValidAsync} = formRef.current;
        const isValid = await isValidAsync();
        if (!isValid) return;
        const {email} = getData();
        await recoverPassword(email);
    }

    return (
        <CustomForm onEnterKey={onSubmit} reference={formRef}>
            <SimpleItem dataField={"email"} editorType={"dxTextBox"} label={{text: "Correo electrónico"}}>
                <RequiredRule message={"El correo electrónico es requerido"}/>
            </SimpleItem>
            <ButtonItem horizontalAlignment={"center"} colSpan={2} buttonOptions={{text: "Recuperar contraseña", type: "default", onClick: onSubmit}}/>
        </CustomForm>
    )
}
const RecoverForm = () => {
    return (
        <>
            <h5>Recuperar contraseña</h5>
            <hr/>
            <Form/>
            <hr/>
            <span className="text-muted" style={{fontSize: "0.8rem",}}>¿Ya tienes una cuenta?
                <Link to={"/auth/login"} className="text-decoration-none" style={{color: "#8000ff",}}> Inicia sesión</Link>
            </span>
        </>
    );
};

export default RecoverForm;
