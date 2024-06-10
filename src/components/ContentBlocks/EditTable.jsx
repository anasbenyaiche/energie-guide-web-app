import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import parseHTMLTable from '../../utils/parseHTMLTable';
import convertTable from '../../utils/convertTable';

const EditTable = ({ block, onClose, onSave }) => {
    const [tableData, setTableData] = useState(() => {
        if (typeof block.content === 'string') {
            return parseHTMLTable(block.content);
        } else {
            return block.content;
        }
    });
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

    useEffect(() => {
        if (typeof block.content === 'string') {
            setTableData(parseHTMLTable(block.content));
        } else {
            setTableData(block.content);
        }
    }, [block.content]);
    const handleSave = () => {
        const updatedBlock = { ...block, content: convertTable(tableData) };
        onSave(updatedBlock);
    };
    return (
        <div>
            <h1>Edit Table</h1>
            <div className="flex justify-start mb-6">
                <button onClick={addColumn} className="bg-blue-500 text-white px-2 py-1 rounded">Add Column</button>
                <button onClick={removeColumn} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Remove Column</button>
            </div>
            <HotTable
                data={tableData}
                colHeaders={true}
                rowHeaders={true}
                width="600"
                height="300"
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
            <div className="flex justify-end mt-4">
                <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={onClose}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}
EditTable.propTypes = {
    block: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
export default EditTable
