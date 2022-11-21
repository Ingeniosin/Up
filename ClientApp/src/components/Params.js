import {getDs} from "./api/api-service";
import CustomDataGrid from "./devextreme/CustomDataGrid";
import Overlay from "./navigation/Overlay";

const Params = () => {
    return (
        <Overlay title={"Prametros de UP"} text={"Parametriza UP para que funcione correctamente:"}>
            <CustomDataGrid dataSource={getDs("ParameterValues")}
                allowAdding={false}
                allowDeleting={false}
                columns={[
                    {dataField: "name", name:"Nombre", isRequired: true, allowEditing: false},
                    {dataField: "value", name:"Valor", isRequired: true, isMoney: true},
                ]}
            />
        </Overlay>
    );
};

export default Params;
