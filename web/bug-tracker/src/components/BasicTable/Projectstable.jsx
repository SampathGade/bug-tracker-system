import React, { useMemo } from "react";

import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel} from '@tanstack/react-table'
import './BasicTable.css'


export default function Projtable() {

    const mdata = [
        {
            "Project Name": "COLT",
            "project Code": 106044,
            "Project Manager": "Vamsi Krishna",
        },
        {
            "Project Name": "AMS",
            "project Code": 106045,
            "Project Manager": "Vamsi Krishna",
        },
        {
            "Project Name": "Integration Framework",
            "project Code": 106046,
            "Project Manager": "Amenadiel Morningstar",
        },
        {
            "Project Name": "Alpha",
            "project Code": 106047,
            "Project Manager": "Sherlock Homes",
        }
    ];
    const data = useMemo(() => mdata, []);
    /** @type import('@tanstack/react-table').columnDef<any> */
    const columns = [
        {
            header: 'Project Name',
            accessorKey: 'Project Name'
        },
        {
            header: 'Project Code',
            accessorKey: 'project Code'
        },
        {
            header: 'Project Manager',
            accessorKey: 'Project Manager'
        }
    ];    
    const table = useReactTable({data, columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
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