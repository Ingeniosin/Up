import {Box, Typography} from "@mui/material";
import {Button} from "devextreme-react";
import {ButtonItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {useRef, useState} from "react";
import {getDs, getDsLookup, getDsOptions} from "./api/api-service";
import CustomDataGrid from "./devextreme/CustomDataGrid";
import CustomForm from "./devextreme/CustomForm";
import {ColumnTypes} from "./devextreme/GridColumns";

const Generate = () => {

    const [requestId, setRequestId] = useState();
    const [payrollId, setPayrollId] = useState();

    const handleSaveRequest = async (e) => {
        const payrollId = await getDs("createPayroll").insert({
            IdPayrollBookRequest: requestId
        });

        setPayrollId(payrollId);
    }

    return (
        <div>
            <Typography variant={"h5"} align={"center"} marginBottom={3}>Generar nómina</Typography>
            <GenerateForm setRequestId={setRequestId} setPayrollId={setPayrollId}/>
            {
                requestId && !payrollId && (
                    <Box marginY={5}>
                        <GridRequest requestId={requestId} handleSaveRequest={handleSaveRequest}/>
                    </Box>
                )
            }

            {
                payrollId && (
                    <Box marginY={5}>
                        <GridPayroll payrollId={payrollId}/>
                    </Box>
                )
            }

        </div>
    );
};

const GridPayroll = ({payrollId}) => {
    return (
        <>

            <CustomDataGrid allowDeleting={false} allowAdding={false} allowUpdating={false}
            ds={"payrollbook"}
            add={["payrollBookRowRequest"]}
            pageSize={12}
            filter={['PayrollBookId','=',payrollId]}
            columns={[
                {dataField: "payrollBookRowRequest.employeeId", name:"Empleado", isRequired: true, lookup: getDsLookup("employee", null, "fullName")},
                {dataField: "payrollBookRowRequest.employee.contractEmployee.typeContractId", sortOrder: 'asc', name:"Tipo de contrato", isRequired: true, lookup: getDsLookup("typecontract")},
                {dataField: "payrollBookRowRequest.employee.contractEmployee.paymentDateId", name:"Tipo de pago", isRequired: true, lookup: getDsLookup("typepaymentdate")},
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


const GridRequest = ({requestId, handleSaveRequest}) => {
    return (
        <>
            <CustomDataGrid allowDeleting={false} allowAdding={false} editorMode={'cell'}
                ds={"payrollbookrequests"}
                add={["employee.contractEmployee"]}
                            pageSize={12}
                filter={['PayrollBookRequestId','=',requestId]}
                columns={[
                    {dataField: "startDate", name:"Fecha de inicio", type: ColumnTypes.Date, isRequired: true, allowEditing: false},
                    {dataField: "endDate", name:"Fecha de finalización", type: ColumnTypes.Date, isRequired: true, allowEditing: false},
                    {dataField: "employeeId", name:"Empleado", allowEditing: false, isRequired: true, lookup: getDsLookup("employee", null, "fullName")},
                    {dataField: "employee.contractEmployee.typeContractId", allowEditing: false, sortOrder: 'asc', name:"Tipo de contrato", isRequired: true, lookup: getDsLookup("typecontract")},
                    {dataField: "employee.contractEmployee.paymentDateId", allowEditing: false, name:"Tipo de pago", isRequired: true, lookup: getDsLookup("typepaymentdate")},
                    {dataField: "daysSettled", name:"Días liquidados", isRequired: true, type: ColumnTypes.Number},
                    {dataField: "overtime", name:"Horas extras", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "nightlySurcharges", name:"Recargos nocturnos", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "sundayAndHolidayWork", name:"Domingos y festivos", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "otherDeductions", name:"Otros descuentos", type: ColumnTypes.Number, isMoney: true},
                    {dataField: "earnedIncome", name:"Salario devengado", allowEditing: false, isRequired: true, type: ColumnTypes.Number, isMoney: true},
                ]}>
            </CustomDataGrid>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={2}>
                <Button text={"Guardar"} type={"success"} onClick={handleSaveRequest}/>
            </Box>
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
        <CustomForm reference={formRef} onEnterKey={onSubmit}  formOptions={{
            colCount: 11
        }}>
            <SimpleItem colSpan={5} dataField={"startDate"} editorType={"dxDateBox"} label={{text: "Fecha de inicio"}} editorOptions={{
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

            <SimpleItem colSpan={5} dataField={"endDate"} editorType={"dxDateBox"} label={{text: "Fecha de finalización"}}>
                <RequiredRule message={"La fecha de finalización es requerida"}/>
            </SimpleItem>

            <ButtonItem colSpan={1} horizontalAlignment={"center"} verticalAlignment={"center"} buttonOptions={{
                text: "Generar",
                type: "default",
                onClick: onSubmit
            }}/>
        </CustomForm>
    );
}

export default Generate;
