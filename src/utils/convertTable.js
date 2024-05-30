const convertTable = (tableData) => {
    let html = '<table border="1"><thead><tr>';
    const columns = tableData[0] || [];

    // Add table headers
    columns.forEach((col, index) => {
        html += `<th>${String.fromCharCode(65 + index)}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Add table rows
    tableData.forEach((row) => {
        html += '<tr>';
        row.forEach((cell) => {
            html += `<td>${cell}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    return html;
};

export default convertTable;