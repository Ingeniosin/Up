import React from 'react';
import {Column, EmailRule, Lookup, NumericRule, RequiredRule, StringLengthRule} from "devextreme-react/data-grid";

export const ColumnTypes = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Date: 'date',
    Object: 'object',
    DateTime: 'datetime',
}

export const GridColumns = ({columns = []}) => {
    columns.unshift({dataField: 'id', type: ColumnTypes.Number, name: 'id', sortOrder: columns?.some(x => x.sortOrder) ? null : 'desc'})
    return columns?.map(({name, dataField, type, isRequired, isEmail, lookup, sortOrder, isMoney, format, isPhone, allowEditing = true, visible}) => {
        if (lookup) {
            lookup = {...{valueExpr: 'id', displayExpr: 'nombre'}, ...lookup}
            type = ColumnTypes.String
        }
        console.log(lookup)
        const displayName = name ?? dataField;
        return <Column sortOrder={sortOrder} format={isMoney ? 'currency' : format} allowEditing={allowEditing} dataType={type} visible={visible} dataField={dataField} key={dataField} caption={displayName} editorOptions={{
            onInitialized: (e) => {
                if (isRequired) e.component.option('validationRules', [{type: 'required'}])
            }
        }}>

            {
                lookup && <Lookup dataSource={lookup.dataSource} valueExpr={lookup.valueExpr} displayExpr={lookup.displayExpr}/>
            }
            {
                isRequired && <RequiredRule message={"¡El campo '"+displayName+"' es requerido!'"} />
            }
            {
                isPhone && (<StringLengthRule min={10} max={10} message={"El campo '"+displayName+"' es un telefono celular invalido."} />)
            }
            {
                isEmail && <EmailRule message={"El campo '"+displayName+"' es una direction de correo invalida."} />
            }
        </Column>
    })
};

export default GridColumns;
