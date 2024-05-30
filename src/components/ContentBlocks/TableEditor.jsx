import React, { useState } from 'react'
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import PropTypes from 'prop-types';

const TableEditor = ({ tableData, setTableData }) => {


    return (
        <div>
            <div>
                <h1>Create Table</h1>
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
