const XLSX = require("xlsx")
import FileSaver from "file-saver"

const exportToXLSX = ({
  jsonData,
  fileName,
  headers,
}: {
  jsonData: any[]
  fileName: string
  headers: string[]
}): void => {
  const ws = XLSX.utils.book_new()

  XLSX.utils.sheet_add_aoa(ws, [headers])
  XLSX.utils.sheet_add_json(ws, jsonData, { origin: "A2", skipHeader: true })

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] }

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  })

  const finalData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  FileSaver.saveAs(finalData, fileName)
}

export default exportToXLSX
