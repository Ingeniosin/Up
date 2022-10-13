import React, {useMemo} from 'react';
import DataGrid, {MasterDetail} from "devextreme-react/data-grid";
import {getDsOptions} from "../api/api-service";
import GridColumns from "./GridColumns";


const CustomDataGrid = ({customChildrens = () => null, customizeColumns, ds, add = [], pageSize = 12, filter, columns, allowAdding, allowDeleting, allowUpdating, dataSource, onChangeAny, onNewRowDefaults, editorMode, reference, customProps = {}, children, masterDetail, autoExpand }) => {

    if (ds) {
        dataSource = getDsOptions(ds, {
            filter,
            select: columns.map(c => c.dataField),
            paginate: true,
            pageSize: pageSize,
        })
    }

    const finalProps = useMemo(() => {
        return {...properties({customizeColumns, dataSource, allowAdding, allowDeleting, allowUpdating, onChangeAny, onNewRowDefaults, editorMode}), ...customProps}
    }, [])
    return (
        <DataGrid  ref={reference}{...finalProps}>
            {
                GridColumns({columns})
            }
            {
                customChildrens()
            }
            {
                masterDetail && (
                    <MasterDetail enabled={true} component={masterDetail} autoExpandAll={autoExpand}/>
                )
            }
            {children}
        </DataGrid>
    );
};

const properties = ({customizeColumns, dataSource, onChangeAny, allowAdding = true, allowDeleting= true, allowUpdating= true, onNewRowDefaults = {}, editorMode = 'cell'}) => ({
    loadPanel: {
        enabled: true,
        animation: true,
    },
    remoteOperations: {
        filtering: true,
        paging: true,
        sorting: true,
    },
    allowColumnResizing: true,
    highlightChanges: false,
    activeStateEnabled: false,
    cellHintEnabled: false,
    autoNavigateToFocusedRow: false,
    hoverStateEnabled: false,
    defaultSearchPanel: {
        visible: false,
        placeholder: 'Buscar'
    },
    defaultEditing: {
        mode: editorMode,
        allowAdding: allowAdding,
        allowDeleting: allowDeleting,
        allowUpdating: allowUpdating,
        useIcons: true,
        confirmDelete: false,
        editColumnName: true,
        texts: {
            addRow: "Añadir",
            cancelAllChanges: "Cancelar",
            cancelRowChanges: "Cancelar",
            confirmDeleteMessage: "¿Está seguro de que desea eliminar este registro?",
            deleteRow: "Eliminar",
            editRow: "Editar",
            saveAllChanges: "Guardar",
            saveRowChanges: "Guardar",
            undeleteRow: "Deshacer eliminación",
            validationCancelChanges: "Cancelar",
        }
    },
    repaintChangesOnly: true,
    showBorders: true,
    columnAutoWidth: true,
    wordWrapEnabled: false,
    allowColumnReordering: true,
    showColumnLines: true,
    columnResizingMode: 'widget',
    customizeColumns: (columns) => {
        if (customizeColumns) {
            Object.keys(customizeColumns).forEach(name => {
                columns.filter(column => column.dataField === name).forEach(column => {
                    customizeColumns[name](column);
                })
            })
        }
    },
    columnChooser: {
        enabled: true,
        allowSearch: true,
        mode: "select",
        title: "Selecciona las columnas",
        emptyPanelText: "No hay columnas que mostrar",
    },

    noDataText: '¡Nada por aqui!',
    dataSource: dataSource,
    onRowUpdated: onChangeAny,
    onRowInserted: onChangeAny,
    onRowRemoved: onChangeAny,
    onInitNewRow: e => {
        e.data = onNewRowDefaults;
    }
})

export default React.memo(CustomDataGrid);
