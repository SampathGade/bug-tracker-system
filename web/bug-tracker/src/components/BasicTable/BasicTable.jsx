import React, { useMemo } from "react";

import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel} from '@tanstack/react-table'
import './BasicTable.css'

export default function BasicTable() {

    // todo call a symple async await to backend chaggpt can easily do it. for incidens
    const mdata = [
        {
            "id": 1,
            "first_name": "Nithin",
            "last_name": "sai",
            "email": "sample@gmail.com",
        }
    ];
    const data = useMemo(() => mdata, []);
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
            <br/>
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