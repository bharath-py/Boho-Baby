import React, { useRef, useEffect } from 'react'
import { Spreadsheet, Worksheet } from '@jspreadsheet-ce/react'
function ReportEditor({ reportData, onUpdate, readOnly = false }) {
const spreadsheetRef = useRef()
const columns = [
{ type: 'text', title: 'Item', width: 200 },
{ type: 'numeric', title: 'Quantity', width: 120 },
{ type: 'numeric', title: 'Unit Price', width: 120, mask: '$ #.##,00' },
{ type: 'numeric', title: 'Total', width: 120, mask: '$ #.##,00' },
{ type: 'calendar', title: 'Date', width: 150 },
{ type: 'dropdown', title: 'Status', width: 120, source: ['Pending', 'Approved', 'Rej
{ type: 'text', title: 'Comments', width: 250 }
]
const handleChange = (instance, cell, x, y, value) => {
if (onUpdate && !readOnly) {
const data = instance.getData()
onUpdate(data)
}
}
return (
<div className="report-editor">
<Spreadsheet
ref={spreadsheetRef}
toolbar={!readOnly}
editable={!readOnly}
allowInsertRow={!readOnly}
allowInsertColumn={!readOnly}
allowDeleteRow={!readOnly}
allowDeleteColumn={!readOnly}
>
<Worksheet
data={reportData || []}
columns={columns}
minDimensions={[7, 10]}
onChange={handleChange}
/>
</Spreadsheet>
</div>
)
}
export default ReportEditor
