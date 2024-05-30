const convertTable = (tableData) => {
    let html = `
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-yellow-400">
        <tr>
          <th colspan="3" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
  `;
    const columns = tableData[0] || [];

    tableData.forEach((row, rowIndex) => {
        html += `<tr class="${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">`;
        row.forEach((cell) => {
            html += `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cell}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    return html;
};

export default convertTable;