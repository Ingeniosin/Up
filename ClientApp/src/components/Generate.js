import {Button, TextBox} from "devextreme-react";
import {ButtonItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {useRef, useState} from "react";
import {getDs, getDsLookup, getDsOptions} from "./api/api-service";
import CustomDataGrid from "./devextreme/CustomDataGrid";
import CustomForm from "./devextreme/CustomForm";
import {ColumnTypes} from "./devextreme/GridColumns";
import Overlay from "./navigation/Overlay";

const Generate = () => {

    const [requestId, setRequestId] = useState();
    const [payrollId, setPayrollId] = useState();

    const nameRef = useRef();

    const handleSaveRequest = async (e) => {
        const payrollId = await getDs("createPayroll").insert({
            IdPayrollBookRequest: requestId,
            name: nameRef.current.instance.option("value")
        });

        setPayrollId(payrollId);
    }

    return (
        <Overlay>


                <h2 style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}>Generar un nuevo libro de nomina</h2>

                <p style={{
                    textAlign: "center",
                    marginBottom: "30px"

                }}>Genera un nuevo libro de momina, ingresa la siguiente información para calcular los conceptos y valores deducidos y devengados!</p>


                <GenerateForm setRequestId={setRequestId} setPayrollId={setPayrollId}/>
                {
                    requestId && !payrollId && (
                        <div className={"my-5"}>
                            <GridRequest requestId={requestId} handleSaveRequest={handleSaveRequest}>
                                <TextBox ref={nameRef} placeholder={"Nombre del libro de nomina"}></TextBox>
                            </GridRequest>


                        </div>
                    )
                }

                {
                    payrollId && (
                        <div className={"my-5"}>
                            <GridPayroll payrollId={payrollId}/>
                        </div>
                    )
                }

        </Overlay>
    );
};

const GridPayroll = ({payrollId}) => {
    return (
        <>

            <hr/>
            <h3 style={{textAlign: "center", marginBottom: "30px"}}>¡Nuevo libro de nomina guardado!</h3>

            <p style={{textAlign: "center", marginBottom: "30px"}}>
                Generaste un nuevo libro de nomina, aqui podras ver los detalles de la nomina, puedes descargar el libro de nomina en formato Excel o imprimirlo, puedes verlo desde ya en la seccion de <strong>registros</strong>.
            </p>

            <CustomDataGrid allowDeleting={false} allowAdding={false} allowUpdating={false}
            ds={"PayrollBooksRows"}
            add={["payrollBookRowRequest"]}
            pageSize={12}
            filter={['PayrollBookId','=',payrollId]}
            columns={[
                {dataField: "payrollBookRowRequest.employeeId", name:"Empleado", isRequired: true, lookup: getDsLookup("Employees", null, "fullName")},
                {dataField: "payrollBookRowRequest.employee.contractEmployee.typeContractId", sortOrder: 'asc', name:"Tipo de contrato", isRequired: true, lookup: getDsLookup("TypeContracts")},
                {dataField: "payrollBookRowRequest.employee.contractEmployee.paymentDateId", name:"Tipo de pago", isRequired: true, lookup: getDsLookup("TypePaymentDates")},
                {dataField: "payrollBookRowRequest.employee.contractEmployee.paymentDate.classificationDaysType.days", name:"Información dias", isRequired: true, type: ColumnTypes.Number},
                {dataField: "payrollBookRowRequest.startDate", name:"Fecha de inicio", type: ColumnTypes.Date, isRequired: true},
                {dataField: "payrollBookRowRequest.endDate", name:"Fecha de finalización", type: ColumnTypes.Date, isRequired: true},
                {dataField: "payrollBookRowRequest.daysSettled", name:"Días liquidados", isRequired: true, type: ColumnTypes.Number},
                {dataField: "payrollBookRowRequest.overtime", name:"Horas extras", type: ColumnTypes.Number, isMoney: true},
                {dataField: "payrollBookRowRequest.nightlySurcharges", name:"Recargos nocturnos", type: ColumnTypes.Number, isMoney: true},
                {dataField: "payrollBookRowRequest.sundayAndHolidayWork", name:"Domingos y festivos", type: ColumnTypes.Number, isMoney: true},
                {dataField: "payrollBookRowRequest.otherDeductions", name:"Otros descuentos", type: ColumnTypes.Number, isMoney: true},
                {dataField: "payrollBookRowRequest.earnedIncome", name:"Salario devengado", isRequired: true, type: ColumnTypes.Number, isMoney: true},
                {dataField: "transportAssistance", name:"Auxilio de transporte",  type: ColumnTypes.Number, isMoney: true},
                {dataField: "totalDevengated", name:"Total devengado",  type: ColumnTypes.Number, isMoney: true},
                {dataField: "health", name:"Salud",  type: ColumnTypes.Number, isMoney: true},
                {dataField: "pension", name:"Pension",  type: ColumnTypes.Number, isMoney: true},
                {dataField: "netPaid", name:"Neto pagado",  type: ColumnTypes.Number, isMoney: true, sortOrder: 'desc'},
            ]}>

            </CustomDataGrid>
        </>
    );
}


const GridRequest = ({requestId, handleSaveRequest, children}) => {
    return (
        <>
            <hr/>
            <h3 style={{textAlign: "center", marginBottom: "30px"}}>¡Nomina generada con exito!</h3>
            <p style={{
                textAlign: "center",
                marginBottom: "30px"
            }}>Esta es la previsualización de la nomina, aqui podras modificar los valores de los conceptos y los dias liquidados, una vez termines de modificar los valores, presiona el boton de guardar para generar el libro de nomina.</p>

            <CustomDataGrid allowDeleting={false} allowAdding={false} editorMode={'cell'}
                ds={"PayrollBookRowRequests"}
                add={["employee.contractEmployee"]} pageSize={12}
                filter={['PayrollBookRequestId','=',requestId]}
                columns={[
                    {dataField: "startDate", name:"Fecha de inicio", type: ColumnTypes.Date, isRequired: true, allowEditing: false},
                    {dataField: "endDate", name:"Fecha de finalización", type: ColumnTypes.Date, isRequired: true, allowEditing: false},
                    {dataField: "employeeId", name:"Empleado", allowEditing: false, isRequired: true, lookup: getDsLookup("Employees", null, "fullName")},
                    {dataField: "employee.contractEmployee.typeContractId", allowEditing: false, sortOrder: 'asc', name:"Tipo de contrato", isRequired: true, lookup: getDsLookup("TypeContracts")},
                    {dataField: "employee.contractEmployee.paymentDateId", allowEditing: false, name:"Tipo de pago", isRequired: true, lookup: getDsLookup("TypePaymentDates")},
                    {dataField: "daysSettled", name:"Días liquidados", isRequired: true, type: ColumnTypes.Number},
                    {dataField: "overtime", name:"Horas extras", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "nightlySurcharges", name:"Recargos nocturnos", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "sundayAndHolidayWork", name:"Domingos y festivos", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "otherDeductions", name:"Otros descuentos", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "earnedIncome", name:"Salario devengado", allowEditing: false, isRequired: true, type: ColumnTypes.Number, isMoney: true},
                ]}>
            </CustomDataGrid>
            <div className="mx-5 my-4 px-5">
                {children}
            </div>

            <div className={"d-flex justify-content-center align-items-center my-2"}>
                <Button text={"Guardar"} type={"default"} onClick={handleSaveRequest}/>
            </div>

        </>
    );
}

const GenerateForm = ({setRequestId, setPayrollId}) => {

    const formRef = useRef();

    const onSubmit = async () => {
        const {isValid, getData} = formRef.current;
        if(!isValid()) return;
        const data = getData();
        const store = getDs("createPayrollRequest");
        const response = await store.insert(data);
        setRequestId(null);
        setPayrollId(null)
        setImmediate(() => {
            setRequestId(response);
        });
    }

    return (
        <div>

            <CustomForm reference={formRef} onEnterKey={onSubmit}  formOptions={{
                colCount: 11
            }}>
                <SimpleItem colSpan={4} dataField={"startDate"} editorType={"dxDateBox"} label={{text: "Fecha de inicio"}} editorOptions={{
                    onValueChanged: ({value}) => {
                        const endEditor = formRef.current.instance.getEditor('endDate');
                        const endVal = endEditor.option('value');
                        if(endVal && endVal < value){
                            endEditor.option('value', null);
                        }
                        endEditor.option('min', value);

                    }
                }}>
                    <RequiredRule message={"La fecha de inicio es requerida"}/>
                </SimpleItem>

                <SimpleItem colSpan={4} dataField={"endDate"} editorType={"dxDateBox"} label={{text: "Fecha de finalización"}}>
                    <RequiredRule message={"La fecha de finalización es requerida"}/>
                </SimpleItem>

                <ButtonItem colSpan={3} horizontalAlignment={"center"} verticalAlignment={"center"} buttonOptions={{
                    text: "Generar",
                    type: "default",
                    onClick: onSubmit
                }}/>
            </CustomForm>
        </div>

    );
}

export default Generate;
