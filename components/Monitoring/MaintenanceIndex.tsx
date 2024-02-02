import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official"
import Highcharts from "highcharts"
import HighChartsExporting from "highcharts/modules/exporting"
import HighChartsData from "highcharts/modules/data"
import HighChartsIndicators from "highcharts/indicators/indicators"
import HighChartsPivotPoints from "highcharts/indicators/pivot-points"
import HighChartsMacD from "highcharts/indicators/macd"
import HighChartsMaP from "highcharts/modules/map"
import HighChartsAccessibility from "highcharts/modules/accessibility"
import HighChartsExportData from "highcharts/modules/export-data"
import HighChartsMore from "highcharts/highcharts-more"
import Property from "./Property"
import { useState, useEffect, useRef } from "react"
import ExportMenu from "../Core/ExportMenu"
import exportToImage from "../../utility/exportToImage"
import exportToPdf from "../../utility/exportToPdf"
import exportToXLSX from "../../utility/exportToXlsx"
import html2canvas from "html2canvas"
import { Skeleton } from "@mui/material"
import useDeviceStore from "../../store/device"

if (typeof Highcharts === "object") {
  HighChartsExporting(Highcharts)
  HighChartsIndicators(Highcharts)
  HighChartsPivotPoints(Highcharts)
  HighChartsMacD(Highcharts)
  HighChartsMaP(Highcharts)
  HighChartsData(Highcharts)
  HighChartsAccessibility(Highcharts)
  HighChartsExportData(Highcharts)
  HighChartsMore(Highcharts)
}

const InstantaneousParameters: React.FC<{
  data: { name: any[] }[]

  isRmsDataLoading: boolean
}> = (props) => {
  const chartRef = useRef<HighchartsReactRefObject>(null)

  let h1 = !!props.data[0].name ? { ...props.data[0].name[0] } : undefined

  const recentTimeArray: string[] | undefined = !!h1
    ? [...h1["timeup"]]
    : undefined

  const [operational, setOperational] = useState<string>("0")
  const [caution, setCaution] = useState<string>("0")
  const [warning, setWarning] = useState<string>("0")
  const [disconnected, setDisconnected] = useState<string>("0")
  const [receivedAt, setReceivedAt] = useState("")

  const { selectedDevice } = useDeviceStore()

  // Get Chart json data
  const getChartJsonData = () => [
    {
      operational,
      caution,
      warning,
      disconnected,
    },
  ]

  const captureSnapshot = ({ id }: { id: string }) => {
    const elementToCapture = document.getElementById(id)

    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL("image/png")

        // Create a download link for the image
        const a = document.createElement("a")
        a.href = dataURL
        a.download = "snapshot.png"
        a.click()
      })
    }
  }

  useEffect(() => {
    if (props.data[0].name) {
      const fakeArray = [...h1["summary"]]
      const operationalAsString = "" + fakeArray[0].operational
      setOperational(operationalAsString)
      const cautionAsString = "" + fakeArray[0].caution
      setCaution(cautionAsString)
      const warningAsString = "" + fakeArray[0].warning
      setWarning(warningAsString)
      const disconnectedVarr = 100 - fakeArray[0].operational
      const disconnectedAsString = "" + disconnectedVarr
      setDisconnected(disconnectedAsString)
      const date = fakeArray[0]?.date

      setReceivedAt(date)
    }
  }, [props.data[0].name])

  const maintenanceOptions = () => ({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: '<div class="font-semibold relative right-10">Maintenance Index</div>',
      align: "left",
      margin: -10,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Operational",
            y: Math.floor(parseFloat(operational ?? "0")),
            color: "#31E802",
          },
          {
            name: "Caution",
            y: Math.floor(parseFloat(caution ?? "0")),
            color: "#ffc107",
          },
          {
            name: "Warning",
            y: Math.floor(parseFloat(warning ?? "0")),
            color: "#FF0022",
          },
          {
            name: "Disconnected",
            y: Math.floor(100 - parseFloat(operational ?? "0")),
            color: "#9e9e9e",
          },
        ],
      },
    ],
  })

  return (
    <div
      className="bg-white rounded-lg pt-3 pb-3 px-4 overflow-hidden grid grid-cols-2 h-[65%] relative"
      id="maintenance-index"
    >
      {props.isRmsDataLoading && (
        <div className="absolute h-full w-full top-0 right-0 z-20 flex items-center justify-center">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={"100%"}
            width={"100%"}
            color="white"
            className="bg-black/10 backdrop-blur-[0.5px]"
          />
        </div>
      )}

      <div className="col-span-2 block">
        <div className="default relative">
          <ExportMenu
            menuItems={[
              {
                label: "Download PNG",
                onClick: () =>
                  captureSnapshot({
                    id: "maintenance-index",
                  }),
                image: "",
              },
              {
                label: "Download PDF",
                onClick: () =>
                  exportToPdf({
                    jsonData: getChartJsonData(),
                    fileName: "maintenanceIndex.pdf",
                    headers: [...Object.keys(getChartJsonData())],
                    assetId: selectedDevice?.asset_id,
                  }),
                image: "",
              },
              {
                label: "Download XLSX",
                onClick: () =>
                  exportToXLSX({
                    jsonData: getChartJsonData(),
                    fileName: "maintenanceIndex.xlsx",
                    headers: [...Object.keys(getChartJsonData()[0])],
                  }),
                image: "",
              },
            ]}
            position="right-[-9px] top-[6px]"
          />
          <HighchartsReact
            ref={chartRef}
            containerProps={{ style: { height: "350px" } }}
            highcharts={Highcharts}
            options={maintenanceOptions()}
          />

          <p className="text-xs text-gray-500 mt-2 pl-4">
            {!!props.data &&
              !!recentTimeArray &&
              `Data received at: ${receivedAt}`}
          </p>
        </div>
      </div>
      <div className="col-span-2">
        <div className="px-3 pt-3">
          <Property
            name="Operational"
            percentage={String(Math.floor(parseFloat(operational)))}
            colorDark="#31E802"
            colorLightClass="bg-infoCardLightGreen"
            paddingBottom={true}
          />
          <Property
            name="Caution"
            percentage={String(Math.floor(parseFloat(caution)))}
            colorDark="#ffc107"
            colorLightClass="bg-yellow-100"
            paddingBottom={true}
          />
          <Property
            name="Warning"
            percentage={String(Math.floor(parseFloat(warning)))}
            colorDark="#FF0022"
            colorLightClass="bg-infoCardLightRed"
            paddingBottom={true}
          />
          <Property
            name="Disconnected"
            percentage={String(Math.floor(parseFloat(disconnected)))}
            colorDark="#9e9e9e"
            colorLightClass="bg-gray-200"
            paddingBottom={false}
          />
        </div>
      </div>
    </div>
  )
}

export default InstantaneousParameters
