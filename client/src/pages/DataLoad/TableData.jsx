import React, {useState,useEffect, useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import axios from 'axios'
import { formatDistanceToNow,  differenceInDays } from 'date-fns';

const TableData = () => {
  const [pesodata, setPesodata] = useState([]);
 console.log(pesodata)
  const currentDate = new Date();
  
const downloadExcel = (pesodata) => {
  const worksheet = XLSX.utils.json_to_sheet(filterData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PesoTank");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `PesoTank_${currentDate.getDate()}_${currentDate.getMonth()}_${currentDate.getFullYear()}.xlsx`);
};

  useEffect(() => {
    axios.get('https://chartap.com/api/pesotank')
      .then(response => setPesodata(response.data))

      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = pesodata

  const columns = useMemo(
    () => [
      { Header: 'Company Name', accessor: 'companyName' },
      { Header: 'Tank No', accessor: 'tankNo' },
      { Header: 'Capacity', accessor: 'capacity' },
      { Header: 'Licence date', accessor: 'licDate',
        Cell: ({ value }) => (
          <div>
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-sm text-gray-500">
          {differenceInDays(value, currentDate)>0?formatDistanceToNow(new Date(value), { addSuffix: true }):"Expired"}
          </div>
        </div>
        )
       },
       { Header: 'Rule18 Date', accessor: 'rule18Date',
        Cell: ({ value }) => (
          <div>
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-sm text-gray-500">
          {differenceInDays(value, currentDate)>0?formatDistanceToNow(new Date(value), { addSuffix: true }):"Expired"}
          </div>
        </div>
        )
       },
       { Header: 'Rule19 Date', accessor: 'rule19Date',
        Cell: ({ value }) => (
          <div>
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-sm text-gray-500">
          {differenceInDays(value, currentDate)>0?formatDistanceToNow(new Date(value), { addSuffix: true }):"Expired"}
          </div>
        </div>
        )
       },
       { Header: 'Aggrement', accessor: 'aggrement' },
       { Header: 'Mobile No', accessor: 'phoneNumber' },


       {
        Header: 'Set Remainder',
        accessor: 'setRemainder',
        Cell: ({ row,value }) => {
          const [reminderDate, setReminderDate] = useState('');
  
          const handleSetReminder = async(e,index) => {
            const newReminders = {id:row.original.id,setRemainder:e.target.value}
            console.log(newReminders)
            setReminderDate(e.target.value);
            try {
              await axios.post('https://chartap.com/api/updatepesotank', newReminders);
              alert('Reminder set successfully!');
            } catch (error) {
              console.error('Error setting reminder:', error);
        
            }
          };
  
          return (
            <div>
              <div>{new Date(value).toLocaleDateString()}</div>
<input type="date"  value={new Date(value).toLocaleDateString()}
                        onChange={(e) => handleSetReminder(e, row.index)} />
              {reminderDate && (
                <div className="mt-1 text-xs text-gray-500">
                  Reminder: {reminderDate}
                </div>
              )}
            </div>
          );
        },
      },
    ],
    []
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
    },
    useSortBy,
    usePagination
  );

  return (
    <div className=' m-5 p-5 overflow-x-auto'>
      <table
        {...getTableProps()}
        className="w-full divide-y divide-gray-200 overflow-x-auto"
      >
        <thead className="bg-gray-750 bg-green-700">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xl font-medium text-white text-center uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : '🔽'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="  py-2 whitespace-nowrap text-lg text-gray-700 text-center "
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className=" bg-green-500 text-center">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-4 py-2 border rounded-md"
        >
          {'<<'}
        </button>{' '}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 border rounded-md"
        >
          {'<'}
        </button>{' '}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 border rounded-md"
        >
          {'>'}
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-4 py-2 border rounded-md"
        >
          {'>>'}
        </button>{' '}
        <span className="px-4 py-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        {/* <span className="px-4 py-2">
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
            className="border rounded-md px-2"
          />
        </span>{' '} */}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="border rounded-md px-2"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableData;
