import {MasterDetail} from "devextreme-react/data-grid";
import {useMemo} from "react";
import useCustomGrid from "../../dynamic/devextreme/useDefaultDataGrid";
import PayrollBooks from "./payrollBooks";
import PayrollBooksDetail from "./payrollBooksDetail";

const captions = {
    name: 'Name',
    startDate: 'Start Date',
    endDate: 'End Date'
}

const columns = [
    {dataField: 'name', dataType: 'string', caption: captions['name'], required: true},
    {dataField: 'startDate', dataType: 'datetime', caption: captions['startDate'], required: true},
    {dataField: 'endDate', dataType: 'datetime', caption: captions['endDate'], required: true}
]

const Grid = ({filter, reference}) => {
    const configuration = useMemo(() => ({
        reference,
        columns,
        editorMode: 'cell',
        dataSource: {
            api: "PayrollBooks",
            pageSize: 10,
            filter
        },
        childs: () => {

            return (
                <MasterDetail enabled={true} component={(e) => {
                    const {id} = e.data.data;
                    return (
                        <div>
                            <PayrollBooksDetail payrollBookId={id}/>
                        </div>
                    )
                }}/>
            )

        }
    }), [filter, reference]);
    return useCustomGrid(configuration)
};

export default Grid;
