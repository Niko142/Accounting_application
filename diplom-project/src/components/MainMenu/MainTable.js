import DataTable from "react-data-table-component";
const MainTable = ({column, data}) => {
    return (
        <>
        <DataTable columns={column} data={data} pagination fixedHeader highlightOnHover/>
        </>
    )
}
export default MainTable;