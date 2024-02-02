import { HighchartsReactRefObject } from "highcharts-react-official"
import { RefObject } from "react"

const exportToImage = ({
  chartRef,
  fileName,
}: {
  chartRef: RefObject<HighchartsReactRefObject>
  fileName: string
}) => {
  if (chartRef.current) {
    const chartElement =
      chartRef?.current?.container?.current?.querySelector("svg")
    if (chartElement) {
      const svgData = new XMLSerializer().serializeToString(chartElement)
      const canvas = document.createElement("canvas")
      canvas.width = chartElement.clientWidth
      canvas.height = chartElement.clientHeight
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)

        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL("image/png")

        // Create a download link for the image
        const a = document.createElement("a")
        a.href = dataURL
        a.download = fileName
        a.click()
      }

      img.src = "data:image/svg+xml," + encodeURIComponent(svgData)
    }
  }
}

export default exportToImage
