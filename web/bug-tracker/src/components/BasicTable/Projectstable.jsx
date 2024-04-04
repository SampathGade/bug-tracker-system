import React, { useMemo } from "react";

import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel} from '@tanstack/react-table'
import './BasicTable.css'
import { useState, useEffect } from 'react';



export default function Projtable(props) {

    const [items, setItems] = useState([]);
    const BACKEND_ENDPOINT = 'http://localhost:8080';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${BACKEND_ENDPOINT}/api/user/projects/admin`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);
    const data = useMemo(() => items, [items]);
    /** @type import('@tanstack/react-table').columnDef<any> */
    const columns = [
        {
            header: 'Project Name',
            accessorKey: 'name'
        },
        {
            header: 'Project Code',
            accessorKey: 'code'
        },
        {
            header: 'Project Manager',
            accessorKey: 'projectManager'
        }
    ];    
    const table = useReactTable({data, columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="w3-container">
            <h3>Projects:</h3>
            <table className="w3-table-all">
            <thead>
                {/* todo need to change the var to tableproj, but is giving error, need to look at it */}
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