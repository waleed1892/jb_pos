import React from "react";

/**
 *
 * @param title {string}
 * @param columns {array}
 * @param data {array}
 * @param showTitle {boolean}
 * @param bordered {boolean}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Table({title, columns = [], data, showTitle = false, bordered = true}) {
    const renderCell = (item, column) => {
        if ('cell' in column && column.cell instanceof Function) {
            return column.cell(item)
        }
        return item[column.accessor]
    }
    return (
        <div
            className={"relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-white"}>
            {
                showTitle &&
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={"font-semibold text-lg text-blueGray-700"}>{title}</h3>
                        </div>
                    </div>
                </div>
            }
            <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className={`items-center w-full bg-transparent border-collapse`}>
                    <thead>
                    <tr>
                        {
                            columns.map((column, columnIndex) =>

                                <th key={columnIndex}
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                                >
                                    {column.header}
                                </th>
                            )
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map(item =>
                            <tr key={item.id}>
                                {
                                    columns.map(column =>
                                        <td key={`${column.accessor}_${item.id}`}
                                            className={`px-6 align-middle text-xs whitespace-nowrap p-4 text-left ${bordered && 'border border-gray-100'}`}>
                                            {renderCell(item, column)}
                                        </td>)
                                }
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
