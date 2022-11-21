import {useMemo} from "react";
import useCustomGrid from "../../dynamic/devextreme/useDefaultDataGrid";
import {getDsLookup} from "../api/api-service";
import {ColumnTypes} from "../devextreme/GridColumns";

const captions = {
    payrollBook: 'Payroll Book',
    payrollBookRowRequest: 'Payroll Book Row Request',
    payrollBookRowRequestId: 'Payroll Book Row Request Id',
    transportAssistance: 'Transport Assistance',
    totalDevengated: 'Total Devengated',
    health: 'Health',
    pension: 'Pension',
    netPaid: 'Net Paid'
}

const columns = [
    {dataField: "payrollBookRowRequest.employeeId", caption:"Empleado", isRequired: true, lookup: getDsLookup("Employees", null, "fullName")},
    {dataField: "payrollBookRowRequest.employee.contractEmployee.typeContractId", sortOrder: 'asc', caption:"Tipo de contrato", isRequired: true, lookup: getDsLookup("TypeContracts")},
    {dataField: "payrollBookRowRequest.employee.contractEmployee.paymentDateId", caption:"Tipo de pago", isRequired: true, lookup: getDsLookup("TypePaymentDates")},
    {dataField: "payrollBookRowRequest.employee.contractEmployee.paymentDate.classificationDaysType.days", caption:"Información dias", isRequired: true, dataType: ColumnTypes.Number},
    {dataField: "payrollBookRowRequest.daysSettled", caption:"Días liquidados", isRequired: true, dataType: ColumnTypes.Number},
    {dataField: "payrollBookRowRequest.overtime", caption:"Horas extras", dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "payrollBookRowRequest.nightlySurcharges", caption:"Recargos nocturnos", dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "payrollBookRowRequest.sundayAndHolidayWork", caption:"Domingos y festivos", dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "payrollBookRowRequest.otherDeductions", caption:"Otros descuentos", dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "payrollBookRowRequest.earnedIncome", caption:"Salario devengado", isRequired: true, dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "transportAssistance", caption:"Auxilio de transporte",  dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "totalDevengated", caption:"Total devengado",  dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "health", caption:"Salud",  dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "pension", caption:"Pension",  dataType: ColumnTypes.Number, isMoney: true},
    {dataField: "netPaid", caption:"Neto pagado",  dataType: ColumnTypes.Number, isMoney: true, sortOrder: 'desc'},
    {dataField: "payrollBookRowRequest.startDate", caption:"Fecha de inicio", dataType: ColumnTypes.DateTime, isRequired: true},
    {dataField: "payrollBookRowRequest.endDate", caption:"Fecha de finalización", dataType: ColumnTypes.DateTime, isRequired: true},
]

const Grid = ({filter, reference, payrollBookId}) => {
    const configuration = useMemo(() => ({
        reference,
        columns,
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        editorMode: 'cell',
        dataSource: {
            api: "PayrollBooksRows",
            pageSize: 10,
            filter: ['PayrollBookId', '=', payrollBookId]
        },
    }), [filter, reference]);
    return useCustomGrid(configuration)
};

export default Grid;
