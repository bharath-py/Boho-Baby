import React, { useState } from 'react';
import './ReportEditor.css';

const ReportEditor = ({ report, onClose }) => {
  const [title, setTitle] = useState(report?.title || 'New Report');
  const [rows, setRows] = useState([
    ['Item', 'Quantity', 'Price', 'Total'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newRows = rows.map((row, i) => {
      if (i === rowIndex) {
        return row.map((cell, j) => (j === cellIndex ? value : cell));
      }
      return row;
    });
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, ['', '', '', '']]);
  };

  const handleSave = () => {
    console.log('Saving report:', { title, data: rows });
    alert('Report saved successfully!');
    onClose();
  };

  return (
    <div className="report-editor">
      <div className="editor-header">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="report-title-input"
          placeholder="Report Title"
        />
        <div className="editor-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Report
          </button>
        </div>
      </div>
      
      <div className="spreadsheet-wrapper">
        <table className="simple-table">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                      className="cell-input"
                      placeholder="Enter data"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        <button className="btn btn-secondary" onClick={handleAddRow} style={{ marginTop: '10px' }}>
          + Add Row
        </button>
      </div>
    </div>
  );
};

export default ReportEditor;
