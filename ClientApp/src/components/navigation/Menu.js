import {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, ScrollView, TreeView} from "devextreme-react";
import logo from '../../assets/logo.gif'
import userLogo from '../../assets/user.svg';
import {AuthContext} from "../../context/AuthContext";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {user, logout} = useContext(AuthContext);
    console.log(user)

    return (
        <ScrollView className="menu p-1 py-3">
            <div className="d-inline-flex align-items-center gap-1 justify-content-center">
                <img src={logo} alt="logo" className="menu-logo rounded-circle w-25 border border-1"/>
                <h5 className="m-0 fw-bold">Nomina</h5>
            </div>

            <hr/>

            <div className=" d-flex flex-column justify-content-center align-items-center mb-2">
                <Button type="icon" icon="close" className="position-absolute" onClick={async () => await logout()} style={{
                    top: 90,
                    right: 10,
                }}/>
                <img src={userLogo} alt="users" className="menu-logo rounded-circle w-50"/>
                <h7 className="m-0 fw-bold">Hola, {user.displayName}</h7>
            </div>

            <hr/>
            <TreeView
                id="treeview"
                items={
                    [
                        ["Registros", "floppy", ""],
                        ["Generar nomina", "floppy", "generate"],
                        ["Empleados", "user", "users"],
                        ["Configuracion", "preferences", "params"]
                    ].map((item, index) => {
                        if (typeof item[0]!== 'string') {
                            item[0].id = index;
                            let selected = false;
                            item[0].items.forEach(item => {
                                item.selected = location.pathname.includes(item.url);
                                if (!selected) selected = item.selected;
                            })
                            item[0].selected = selected;
                            return item[0];
                        }
                        return {id: index, text: item[0], icon: item[1], url: item[2], selected: location.pathname.includes(item[2])};
                    })}
                width={"100%"}
                elementAttr={{class: "mt-3 mx-2"}}
                animationEnabled={true}
                selectionMode={'single'}
                displayExpr={'text'}
                itemsExpr={'items'}
                expandedExpr={'expanded'}
                searchMode={'contains'}
                height={"100%"}
                searchEditorOptions={{
                    name: 'Buscar',
                }}
                onItemClick={e => {
                    let url = e.node.itemData.url;
                    if (url === undefined) return;
                    navigate("/"+url);
                }}
            />


        </ScrollView>
    )
}

export default Menu;
