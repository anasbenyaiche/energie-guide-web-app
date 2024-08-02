import React, { useState } from 'react'
import Handsontable from 'handsontable';
import { FaPlus, FaMinus } from "react-icons/fa";
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import PropTypes from 'prop-types';

const TableEditor = ({ tableData, setTableData }) => {

    const addColumn = () => {
        setTableData(prevData => {
            return prevData.map(row => [...row, '']);
        });
    };

    const removeColumn = () => {
        setTableData(prevData => {
            return prevData.map(row => row.slice(0, -1));
        });
    };

    const addRow = () => {
        setTableData(prevData => {
            const newRow = Array(prevData[0].length).fill('');
            return [...prevData, newRow];
        });
    };

    const removeRow = () => {
        setTableData(prevData => {
            return prevData.slice(0, -1);
        });
    }
    return (
        <div>
            <div>
                <div className="flex justify-center mb-6 gap-2">
                    <button onClick={addColumn} className=" flex items-center justify-between gap-2 bg-bg-btn px-3 py-3 text-white">
                        <FaPlus className="mr-2" />Ajouter une colonne</button>
                    <button onClick={removeColumn} className="bg-red-500 flex gap-2 justify-between items-center text-white px-3 py-3 ml-2">
                        <FaMinus />Remove Column</button>
                    <button onClick={addRow} className=" flex items-center justify-between gap-2 bg-bg-btn px-3 py-3 text-white">
                        <FaPlus className="mr-2" />Ajouter une ligne</button>
                    <button onClick={removeRow} className="bg-red-500 flex gap-2 justify-between items-center text-white px-3 py-3 ml-2">
                        <FaMinus />Remove Row</button>
                </div>
                <HotTable
                    data={tableData}
                    colHeaders={true}
                    rowHeaders={true}
                    height="auto"
                    stretchH="all"
                    cell={[
                        {
                            row: 0,
                            col: 0,
                            className: 'custom-cell',
                        },
                    ]}
                    className="custom-table"
                    autoWrapRow={true}
                    autoWrapCol={true}
                    licenseKey="non-commercial-and-evaluation"
                    afterChange={(changes, source) => {
                        if (source !== 'loadData' && changes) {
                            setTableData((prevData) => {
                                const newData = [...prevData];
                                changes.forEach(([row, prop, oldValue, newValue]) => {
                                    newData[row][prop] = newValue;
                                });
                                return newData;
                            });
                        }
                    }}
                />
            </div>
        </div>
    )
}
TableEditor.propTypes = {
    tableData: PropTypes.array,
    setTableData: PropTypes.func
}
export default TableEditor
