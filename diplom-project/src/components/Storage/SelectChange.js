import  Axios  from "axios"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { change_column } from "../../data";
import Header from "../Header/Header";

export default function SelectChange() {
    const [res, setRes] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const FetchData = async () => {
            const res = await Axios.get('http://localhost:3001/change')
            setRes(res.data);
            setSearch(res.data)
        }
        FetchData();
    }, [])

    const Filter = (e) => {
        const res = search.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setRes(res);
    }
    return(
        <>
        <Header></Header>
        <DataTable columns={change_column} data={res} pagination fixedHeader highlightOnHover
        subHeader subHeaderComponent = {<input type="text" id="form-input" placeholder="Поиск..." onChange={Filter}/>}
        />
        </>
    )
}