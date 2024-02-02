// @ts-ignore
import jsPDF from "jspdf"
import "jspdf-autotable"
import getExportTitle from "./getExportTitle"

const exportToPdf = async ({
  fileName,
  jsonData,
  headers,
  assetId,
}: {
  jsonData: any[]
  fileName: `${string}.pdf`
  headers: string[]
  assetId: string
}) => {
  const pdf = new jsPDF("p", "pt", "a4")

  const pdfTitle = getExportTitle({
    assetId,
  })

  pdf.text(pdfTitle, pdf.internal.pageSize.width / 2, 20, { align: "center" })

  var rows = jsonData.map((data) => [...Object.values(data)])

  // @ts-ignore
  pdf.autoTable(headers, rows, {
    startY: 65,
    theme: "grid",
    styles: {
      font: "times",
      halign: "center",
      cellPadding: 3.5,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
    },
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: "normal",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fillColor: [166, 204, 247],
    },
    alternateRowStyles: {
      fillColor: [212, 212, 212],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    rowStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    tableLineColor: [0, 0, 0],
  })

  pdf.save(fileName)
}

export default exportToPdf
