const parseHTMLTable = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const rows = Array.from(doc.querySelectorAll('tr'));

    return rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent);
    }).slice(1);
};

export default parseHTMLTable;
