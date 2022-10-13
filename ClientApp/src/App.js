import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import {Button} from "@mui/material";
import {Drawer, TreeView} from "devextreme-react";
import {useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import './App.css'
import Generate from "./components/Generate";
import Overlay from "./components/navigation/Overlay";
import Params from "./components/Params";
import Users from "./components/Users";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={"menu"}>

            <TreeView
                id="treeview"
                items={
                    [
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
                elementAttr={{class: "mt-3 mx-3"}}
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

        </div>
    )
}


const App = () => {
    let [opened, setOpened]= useState(true);

    return (
        <div className="up-container">

            <div className={"header"}>
                <MenuIcon onClick={() => setOpened(!opened)} />
            </div>

            <Drawer
                opened={opened}
                openedStateMode={'shrink'}
                position={'left'}
                revealMode={'slide'}
                component={Menu}
                width={"100%"}
                height={"100%"}>
                <div className="up-content">
                    <Routes>
                        <Route path={"/users"} element={<Users/>}/>
                        <Route path={"/params"} element={<Params/>}/>
                        <Route path={"/generate"} element={<Generate/>}/>
                    </Routes>
                </div>
            </Drawer>
        </div>
    );
};


export default App;
