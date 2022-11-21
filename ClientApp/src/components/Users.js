import {FileUploader} from "devextreme-react";
import {useRef} from "react";
import {toast} from "react-hot-toast";
import {getDs} from "../dynamic/api/api-service";
import {readEmployeesFromXlsx} from "../services/readEmployessFromXlsx";
import {getDsLookup} from "./api/api-service";
import CustomDataGrid from "./devextreme/CustomDataGrid";
import {ColumnTypes} from "./devextreme/GridColumns";
import Overlay from "./navigation/Overlay";


const FileUploaderSection = ({grid}) => {
    return(
        <>
            <FileUploader
                onValueChanged={(e) => {
                    const reader = new FileReader();
                    reader.onload = (reader) => {
                        const fn = async () => {
                            const file = reader.target.result;
                            const employees = readEmployeesFromXlsx(file).map((employee) => ({
                                firstName: employee.Nombre,
                                lastName: employee.Apellido,
                                contractEmployee: {
                                    typeContractId: employee.TipoContrato,
                                    paymentDateId: employee.TipoPago,
                                    salary: employee.Salario,
                                    startDate: employee.FechaInicio,
                                    endDate: employee.FechaFinalizacion
                                }
                            }))

                            const ds = getDs("migrateEmployees");
                            const {success, message, errors} = await ds.insert({employees});

                            if(!success){
                                let msg = "";
                                errors.forEach((fErrors, i) => {
                                    msg += `Fila [${i}]: ${fErrors.join(", ")}\n`
                                })
                                throw new Error(msg);
                            }
                        };

                         toast.promise(fn(), {
                            loading: "Migrando datos...",
                            success: "Datos migrados correctamente!",
                            error: e => "Error al migrar datos: \n\n" + e.message,
                        },{
                             duration: 10000,
                         }).finally(async () => {
                             await grid.current.instance.refresh();
                             e.component.option("value", []);
                         });
                    }
                    reader.readAsBinaryString(e.value[0]);
                }}
                labelText={""}
                multiple={true}
                accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
                uploadMode={"useForm"}
                name={"file"} />
        </>
    )

}

const MigrationSection = ({grid}) => {
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center shadow-lg rounded-2 p-1 col-sm-3" style={{height: "200px",}}>
                <h6 className="my-3">Migración de empleados</h6>
                <div className="mx-3 row">
                    <p> Si lo desea puede migrar los empleados desde un archivo de excel. </p>
                    <FileUploaderSection grid={grid}/>
                </div>
            </div>
        </>
    )
}

const Users = () => {
    const grid = useRef(null);

    return (
        <Overlay title={"Gestion de empleados"} text={"Administre los empleados de la empresa:"}>
            <div className="row">
                <div className="col-sm-9">
                    <CustomDataGrid
                        reference={grid}
                        ds={"Employees"}
                        pageSize={12}
                        allowAdding={true}
                        columns={[
                            {dataField: "firstName", name:"Nombre", isRequired: true},
                            {dataField: "lastName", name:"Apellido", isRequired: true},
                            {dataField: "contractEmployee.typeContractId", name:"Tipo de contrato", sortOrder: 'asc', isRequired: true, lookup: getDsLookup("TypeContracts")},
                            {dataField: "contractEmployee.paymentDateId", name:"Tipo de pago", isRequired: true, lookup: getDsLookup("TypePaymentDates")},
                            {dataField: "contractEmployee.salary", name:"Salario", isRequired: true, isMoney: true, type: ColumnTypes.Number},
                            {dataField: "contractEmployee.startDate", name:"Fecha inicio", isRequired: true, type: ColumnTypes.Date},
                            {dataField: "contractEmployee.endDate", name:"Fecha finalización", type: ColumnTypes.Date},
                        ]}>
                    </CustomDataGrid>
                </div>
                <MigrationSection grid={grid}/>
            </div>
        </Overlay>
    );
};

export default Users;
