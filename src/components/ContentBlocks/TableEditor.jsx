import React, { useState } from 'react'
import Handsontable from 'handsontable';
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
    return (
        <div>
            <div>
                <h1>Create Table</h1>
                <div className="flex justify-start mb-6">
                    <button onClick={addColumn} className="bg-blue-500 text-white px-2 py-1 rounded">Add Column</button>
                    <button onClick={removeColumn} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Remove Column</button>
                </div>
                <HotTable
                    data={tableData}
                    colHeaders={true}
                    rowHeaders={true}
                    height="auto"
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
