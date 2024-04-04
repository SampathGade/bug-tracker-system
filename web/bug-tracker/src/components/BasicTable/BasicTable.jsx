import React, { useMemo } from "react";

import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel} from '@tanstack/react-table'
import './BasicTable.css'
import { useState, useEffect } from 'react';

export default function BasicTable(props) {

    const [items, setItems] = useState([]);
    const BACKEND_ENDPOINT = 'http://localhost:8080';

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${BACKEND_ENDPOINT}/user/projects/${props.username}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);
          setItems(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
  }, []);
  

    // todo call a symple async await to backend chaggpt can easily do it. for incidens
    const data = useMemo(() => items, []);
    /** @type import('@tanstack/react-table').columnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'First Name',
            accessorKey: 'first_name'
        },
        {
            header: 'Last Name',
            accessorKey: 'last_name'
        },
        {
            header: 'Email',
            accessorKey: 'email'
        }
    ];    
    const table = useReactTable({data, columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    // todo call sync await to backend for projects
    const mdataProj = [
        {
            "id": 1,
            "first_name": "Nithin",
            "last_name": "sai",
            "email": "sample@gmail.com",
        }
    ]
    const dataproj = useMemo(() => mdataProj, []);
    /** @type import('@tanstack/react-table').columnDef<any> */
    const columnsproj = [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'First Name',
            accessorKey: 'first_name'
        },
        {
            header: 'Last Name',
            accessorKey: 'last_name'
        },
        {
            header: 'Email',
            accessorKey: 'email'
        }
    ];
    const tableproj = useReactTable({dataproj, columnsproj, getCoreRowModel: getCoreRowModel()})    


    return(
        <div className="w3-container">
            <h3>Tickets Working On:</h3>
            <table className="w3-table-all">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => <th key = {header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext)}
                        </th>)}
                    </tr>
                ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}