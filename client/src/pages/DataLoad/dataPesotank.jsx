import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import dayjs from 'dayjs';
import axios from 'axios'
// import "react-data-table-component-extensions/dist/index.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { differenceInDays } from 'date-fns'


const customStyles = {
  header: {
    style: {
      fontSize: '22px',
      color: '#fff',
      backgroundColor: '#4CAF50',
      minHeight: '56px',

    },
  },
  rows: {
    style: {
      minHeight: '72px',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#e0e0e0',
      },
    },
  },
  headCells: {
    style: {

      fontSize: '18px',
      fontWeight: 'bold',
      color: '#4CAF50',
      backgroundColor: '#F1F1F1',
    },
  },
  cells: {
    style: {

      fontSize:'19px',


    },
  },
};


const MyTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
console.log(filterData)

  const currentDate = new Date();
  
const downloadExcel = (filterData) => {
  const worksheet = XLSX.utils.json_to_sheet(filterData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PesoTank");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `PesoTank_${currentDate.getDate()}_${currentDate.getMonth()}_${currentDate.getFullYear()}.xlsx`);
};

  useEffect(() => {
    axios.get('https://chartap.com/api/pesotank')
      .then(response => setData(response.data))

      .catch(error => console.error('Error fetching data:', error));
  }, []);



  const columns = [
    {
      name: 'Company Name',
      selector: row => row.companyName,
      sortable: true,
    },
    {
      name: 'Capacity',
      selector: row => row.capacity,
      sortable: true,
    },
    {
      name: 'Tank No',
      selector: row => row.tankNo,
      sortable: true,
    },
    {
      name: 'License Expiry',
      selector: row => dayjs(row.licDate).format('YYYY-MM-DD'),
      sortable: true,
    },
  {
      name: 'Lic Progress',
      selector: row => differenceInDays(row.licDate, currentDate)>0?differenceInDays(row.licDate, currentDate):"Expired",
      sortable: false,
    },
    {
      name: 'Rule-18 Expiry',
      selector: row => dayjs(row.rule18Date).format('YYYY-MM-DD'),
      sortable: true,
    },
  {
      name: 'Rule-18 Progress',
      selector: row =>differenceInDays(row.rule18Date, currentDate)>0?differenceInDays(row.rule18Date, currentDate):"Expired",
      sortable: false,
    },
    {
      name: 'Rule-19 Expiry',
      selector: row => dayjs(row.rule19Date).format('YYYY-MM-DD'),
      sortable: true,
    },
  {
      name: 'Rule-19 Progress',
      selector: row =>differenceInDays(row.rule19Date, currentDate)>0? differenceInDays(row.rule19Date, currentDate):"Expired",
      sortable: false,
    },
    {
      name: 'Mobile No',
      selector: row => row.phoneNumber,
      sortable: true,
    },
  ];


  const tableData = {
    columns,
    data,
  };

  return (
    <div  className=" " >
      <h3  className="text-3xl font-bold mb-2 text-center">Peso Tank Data</h3>
      <div >
        <div style={{"padding-right":'50px',"text-align": "right",}}>
        <button style={{ 'border-radius': '15px','cursor': 'pointer','margin':'3px',"padding":'4px 28px',"text-align": "center","fontSize": '22px', "border": "2px solid green"}} onClick={() => downloadExcel(data)}>Download as Excel</button>
        </div>
      
      <DataTable
     
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        defaultSortAsc={true}
        striped
        responsive
        defaultSortField="licDate"
        customStyles={customStyles}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setFilterData(selectedRows)}
        
      />
    
    </div>
    </div>
  );
};

export default MyTable;
