import {Box, Step, StepContent, StepLabel, Stepper} from "@mui/material";
import {Button, Popup} from "devextreme-react";
import {Button as GridButton, Column} from "devextreme-react/data-grid";
import {RequiredRule, SimpleItem} from "devextreme-react/form";
import {useEffect, useRef, useState} from "react";
import {getDs, getDsLookup, getDsOptions} from "./api/api-service";
import CustomDataGrid from "./devextreme/CustomDataGrid";
import CustomForm from "./devextreme/CustomForm";
import {ColumnTypes} from "./devextreme/GridColumns";
import Overlay from "./navigation/Overlay";


const Users = () => {
    return (
        <Overlay title={"Gestion de empleados"}>
            <CustomDataGrid
                ds={"employee"}
                pageSize={12}
                allowAdding={true}
                columns={[
                    {dataField: "firstName", name:"Nombre", isRequired: true},
                    {dataField: "lastName", name:"Apellido", isRequired: true},
                    {dataField: "contractEmployee.typeContractId", name:"Tipo de contrato", sortOrder: 'asc', isRequired: true, lookup: getDsLookup("typecontract")},
                    {dataField: "contractEmployee.paymentDateId", name:"Tipo de pago", isRequired: true, lookup: getDsLookup("typepaymentdate")},
                    {dataField: "contractEmployee.salary", name:"Salario", isRequired: true, isMoney: true, type: ColumnTypes.Number},
                    {dataField: "contractEmployee.startDate", name:"Fecha inicio", isRequired: true, type: ColumnTypes.Date},
                    {dataField: "contractEmployee.endDate", name:"Fecha finalización", type: ColumnTypes.Date},
                ]}>
            </CustomDataGrid>
        </Overlay>

    );
};

export default Users;
