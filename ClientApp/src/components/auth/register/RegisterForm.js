import {ButtonItem, CompareRule, EmailRule, GroupItem, RequiredRule, SimpleItem, StringLengthRule} from "devextreme-react/form";
import {useContext, useRef} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import CustomForm from "../../../dynamic/devextreme/CustomForm";

const Form = () => {
    const formRef = useRef(null);

    const {register} = useContext(AuthContext);

    const onSubmit = async (e) => {
        const {getData, isValidAsync} = formRef.current;
        const isValid = await isValidAsync();
        if (!isValid) return;
        const {firstName, lastName, email, password} = getData();

        await register(firstName, lastName, email, password);
    }

    return (
        <CustomForm onEnterKey={onSubmit} reference={formRef}>
            <GroupItem colCount={2} >
                <SimpleItem dataField={"firstName"} editorType={"dxTextBox"} label={{text: "Nombre"}}>
                    <RequiredRule message={"El nombre es requerido"}/>
                </SimpleItem>
                <SimpleItem dataField={"lastName"} editorType={"dxTextBox"} label={{text: "Apellido"}}>
                    <RequiredRule message={"El apellido es requerido"}/>
                </SimpleItem>
            </GroupItem>
            <SimpleItem dataField={"email"} editorType={"dxTextBox"} label={{text: "Correo electrónico"}}>
                <RequiredRule message={"El correo electrónico es requerido"}/>
                <EmailRule message={"El correo electrónico no es válido"}/>
            </SimpleItem>
            <SimpleItem dataField={"password"} editorType={"dxTextBox"} label={{text: "Contraseña",}} editorOptions={{mode: "password"}}>
                <RequiredRule message={"La contraseña es requerida"}/>
                <StringLengthRule min={8} message={"La contraseña debe tener al menos 8 caracteres"}/>
            </SimpleItem>

            <SimpleItem dataField={"confirmPassword"} editorType={"dxTextBox"} label={{text: "Confirma tu contraseña",}} editorOptions={{mode: "password"}}>
                <CompareRule message={"Las contraseñas no coinciden"} comparisonTarget={() => formRef.current.instance.getEditor("password").option("value")}/>
                <StringLengthRule min={8} message={"La contraseña debe tener al menos 8 caracteres"}/>
                <RequiredRule message={"La confirmación de contraseña es requerida"}/>
            </SimpleItem>

            <ButtonItem horizontalAlignment={"center"} colSpan={2} buttonOptions={{text: "Registrarse", type: "default", onClick: onSubmit}}/>
        </CustomForm>
    )
}

const RegisterForm = () => {
    return (
        <>
            <h5>Registrarse</h5>
            <hr/>
            <Form/>
            <hr/>
            <span className="text-muted" style={{fontSize: "0.8rem",}}>¿Ya tienes una cuenta?
                <Link to={"/auth/login"} className="text-decoration-none" style={{color: "#8000ff",}}> Inicia sesión</Link>
            </span>
        </>
    );
};

export default RegisterForm;
