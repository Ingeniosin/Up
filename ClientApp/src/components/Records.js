import Overlay from "./navigation/Overlay";
import CustomDataGrid from "./devextreme/CustomDataGrid";
import {getDs} from "./api/api-service";
import PayrollBooks from "./grids/payrollBooks";

const Records = () => {
    return (
        <Overlay title={"Libros de nomina generados"} text={"A continuación se muestran los libros de nomina generados:"}>
            <PayrollBooks/>
        </Overlay>
    );
};

export default Records;
