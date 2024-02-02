import React, { Dispatch, SetStateAction, useState } from "react"
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
import Select from "@mui/material/Select"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import {
  Box,
  FormControlLabel,
  MenuItem,
  Skeleton,
  Button,
  Tooltip,
  Switch,
} from "@mui/material"

import { Checkbox } from "@mui/material"
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined"
import { QueryClient, useQuery } from "@tanstack/react-query"
import axiosConfig from "../../config/axiosConfig"
import useDeviceStore from "../../store/device"
import useTimeStore from "../../store/time"
import moment from "moment"
import { showNotification } from "@mantine/notifications"
import { useEffect, useRef } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "./AppContext"
import exportToXLSX from "../../utility/exportToXlsx"
import exportToPdf from "../../utility/exportToPdf"
import ExportMenu from "../Core/ExportMenu"
import exportToImage from "../../utility/exportToImage"
import { BACKEND_URL } from "../../constants"

let interval: NodeJS.Timeout | undefined

if (typeof Highcharts === "object") {
  HighChartsExporting(Highcharts)
  HighChartsIndicators(Highcharts)
  HighChartsPivotPoints(Highcharts)
  HighChartsMacD(Highcharts)
  HighChartsMaP(Highcharts)
  HighChartsData(Highcharts)
  HighChartsAccessibility(Highcharts)
}

interface Props {
  data: any[]
  isRmsDataLoading: boolean
  isRealtime: boolean
  setIsRealtime: Dispatch<SetStateAction<boolean>>
}

const TimeWaveformChart = (props: Props) => {
  const chartRef = useRef<HighchartsReactRefObject>(null)

  const { isRealtime, setIsRealtime } = props

  const [progress, setProgress] = React.useState(0)

  const progressRef = React.useRef(() => {})

  // Get Chart json data
  const getChartJsonData = () => {
    const data = props.data[0].name.length > 0 ? props.data[0].name[0] : null

    if (!!data) {
      const jsonData = data?.timeup.map((time: string, index: number) => {
        const x_rms_acl =
          data?.x_rms_acl.length > index ? data?.x_rms_acl[index] : "null"

        const y_rms_acl =
          data?.y_rms_acl.length > index ? data?.y_rms_acl[index] : "null"

        const z_rms_acl =
          data?.z_rms_acl.length > index ? data?.z_rms_acl[index] : "null"

        const x_rms_vel =
          data?.x_rms_vel.length > index ? data?.x_rms_vel[index] : "null"

        const y_rms_vel =
          data?.y_rms_vel.length > index ? data?.y_rms_vel[index] : "null"

        const z_rms_vel =
          data?.z_rms_vel.length > index ? data?.z_rms_vel[index] : "null"

        return {
          x_rms_acl,
          y_rms_acl,
          z_rms_acl,
          x_rms_vel,
          y_rms_vel,
          z_rms_vel,
          timestamp: time,
        }
      })

      return jsonData
    }
  }

  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0)
      } else {
        const diff = Math.random() * 10

        setProgress(progress + diff)
      }
    }
  })

  const [axis, setAxis] = useState<string[]>(["X-Axis"])
  const [feature, setFeature] = useState("Acceleration Time Waveform")

  const { selectedDevice } = useDeviceStore()

  const [myArray, setMyArray] = useState<number[]>([12, 23, 65])
  const [myArray2, setMyArray2] = useState<number[]>([12, 23, 65])
  const [myArray3, setMyArray3] = useState<number[]>([12, 23, 65])
  const [myArray5, setMyArray5] = useState<number[]>([12, 23, 65])
  const [myArray6, setMyArray6] = useState<number[]>([12, 23, 65])
  const [myArray7, setMyArray7] = useState<number[]>([12, 23, 65])
  const [normal, setNormal] = useState<number>(0)
  const [caution, setCaution] = useState<number>(0)
  const [warning, setWarning] = useState<number>(0)
  const [myString, setMyString] = useState<string[]>([" ", " ", " "])
  const [fillArray, setFillArray] = useState<any[]>([])

  let h1 = { ...props.data[0].name[0] }
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [filter, setFilter] = useState<boolean>(false)

  const [myState, setMyState] = useState<string>(h1.asset_id)
  const prevMyStateRef = useRef<string>("")

  if (myState !== prevMyStateRef.current) {
    prevMyStateRef.current = myState
  }

  const [myThreshold, setMyThreshold] = useState<any>({})

  useEffect(() => {
    if (isRealtime) {
      setMyState(h1.asset_id)

      if (props.data[0].name[0]) {
        const stringArray: string[] = [...h1["x_rms_acl"]]
        const stringArray2: string[] = [...h1["y_rms_acl"]]
        const stringArray3: string[] = [...h1["z_rms_acl"]]
        const stringArray4: string[] = [...h1["timeup"]]
        const stringArray5: string[] = [...h1["x_rms_vel"]]
        const stringArray6: string[] = [...h1["y_rms_vel"]]
        const stringArray7: string[] = [...h1["z_rms_vel"]]

        const obj: any = { ...h1["threshold"] }
        const objs: any = { ...obj[selectedDevice?.asset_id] }
        const obj1: any = { ...objs["X_Axis_Velocity_Time_Waveform"] }

        const floatArray: number[] = stringArray.map((str) => parseFloat(str))
        const floatArray2: number[] = stringArray2.map((str) => parseFloat(str))
        const floatArray3: number[] = stringArray3.map((str) => parseFloat(str))
        const floatArray5: number[] = stringArray5.map((str) => parseFloat(str))
        const floatArray6: number[] = stringArray6.map((str) => parseFloat(str))
        const floatArray7: number[] = stringArray7.map((str) => parseFloat(str))

        setMyArray(floatArray)
        setMyArray2(floatArray2)
        setMyArray3(floatArray3)
        setMyArray5(floatArray5)
        setMyArray6(floatArray6)
        setMyArray7(floatArray7)
        setMyString(stringArray4)
        setMyThreshold(obj)
        setNormal(obj1.normal)
        setCaution(obj1.caution)
        setWarning(obj1.warning)
      }
    }
  }, [props, isRealtime])

  useEffect(() => {
    const objs: any = {
      ...myThreshold[selectedDevice?.asset_id],
    }
    const obj1: any = {
      ...objs["X_Axis_Velocity_Time_Waveform"],
    }
    const obj2: any = {
      ...objs["Y_Axis_Velocity_Time_Waveform"],
    }
    const obj3: any = {
      ...objs["Z_Axis_Velocity_Time_Waveform"],
    }
    if (axis.includes("X-Axis") && axis.length == 1) {
      setNormal(obj1.normal)
      setCaution(obj1.caution)
      setWarning(obj1.warning)
    } else if (axis.includes("Y-Axis") && axis.length == 1) {
      setNormal(obj2.normal)
      setCaution(obj2.caution)
      setWarning(obj2.warning)
    } else if (axis.includes("Z-Axis") && axis.length == 1) {
      setNormal(obj3.normal)
      setCaution(obj3.caution)
      setWarning(obj3.warning)
    }
  }, [axis])

  const stopTimer = () => {
    if (interval) {
      clearInterval(interval) // Stop the timer by calling clearInterval with the interval variable
      interval = undefined // Reset the interval variable
    }
  }

  const options = (
    x_axis: boolean,
    y_axis: boolean,
    z_axis: boolean,
    y_label: string,
    titles: string
  ): Highcharts.Options => ({
    title: {
      text: `<div class="font-semibold relative right-10 capitalize">${titles}</div>`,
      align: "left",
      margin: 160,
    },

    // credits: {
    //   enabled: false,
    // },
    exporting: {
      enabled: false,
    },
    xAxis: {
      categories: myString,
      tickInterval: 1,
      labels: {
        enabled: true,
        formatter: function () {
          // Display only every 5th label
          if (this.pos % 15 === 0) {
            return this.value.toString() // Explicitly cast to string
          } else {
            return "" // Return an empty string
          }
        },
      },
    },
    yAxis: {
      title: {
        text: `<p class="font-semibold text-gray-400">${y_label}</p>`,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        name: "Warning",
        data: isEnabled ? Array(300).fill(warning) : undefined, // Adjust the values according to your requirement
        color: "#FF0000", // Adjust the color as needed
        dashStyle: "Dash", // Adjust the dash style as needed
        enableMouseTracking: false, // Disable tooltip for the line
        visible: isEnabled, // Set to true to show the line
      },

      // Horizontal line 2
      {
        type: "line",
        name: "Caution",
        data: isEnabled ? Array(300).fill(caution) : undefined, // Adjust the values according to your requirement
        color: "#8B8000", // Adjust the color as needed
        dashStyle: "Dash", // Adjust the dash style as needed
        enableMouseTracking: false, // Disable tooltip for the line
        visible: isEnabled, // Set to true to show the line
      },

      // Horizontal line 3
      {
        type: "line",
        name: "Normal",
        data: isEnabled ? Array(300).fill(normal) : undefined, // Adjust the values according to your requirement
        color: "#013220", // Adjust the color as needed
        dashStyle: "Dash", // Adjust the dash style as needed
        enableMouseTracking: false, // Disable tooltip for the line
        visible: isEnabled, // Set to true to show the line
      },
      {
        type: "line",
        name: "X AXIS",
        data: isEnabled ? myArray5 : myArray,
        color: "#1340E8",
        tooltip: {
          valueDecimals: 2,
        },
        visible: x_axis,
      },
      {
        name: "Y AXIS",
        data: isEnabled ? myArray6 : myArray2,
        type: "spline",
        color: "#31E802",
        tooltip: {
          valueDecimals: 2,
        },
        visible: y_axis,
      },
      {
        name: "Z AXIS",
        data: isEnabled ? myArray7 : myArray3,
        type: "spline",
        color: "#FF0022",
        tooltip: {
          valueDecimals: 2,
        },
        visible: z_axis,
      },
    ],
  })

  const {
    tw_startTime: startTime,
    tw_endTime: endTime,
    set_tw_StartTime: setStartTime,
    set_tw_EndTime: setEndTime,
  } = useTimeStore()

  const queryClient = new QueryClient()

  const [isFetchingByDate, setIsFetchingByDate] = useState(false)

  const { isFetching, refetch: loadData } = useQuery(
    ["timeWaveForm"],
    async ({ signal }) => {
      return await axiosConfig({
        method: "put",
        url: `${BACKEND_URL}/api/analytics/timeWaveForm`,
        data: {
          start_time: startTime,
          end_time: endTime,
          asset_id: selectedDevice?.asset_id,
        },
        signal,
      }).then((res) => res.data)
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
      onSuccess: (data) => {
        // setTimeWaveForm(data)
      },
      onError: (err) => {
        console.log("Fetching error: ", err)
        showNotification({
          title: "User notification",
          message: "Some error occurred !",
          autoClose: 2500,
          styles: () => ({
            root: {
              width: "300px",
              padding: "12.5px 5px 20px 22px",
              "&::before": { backgroundColor: "#FF0022" },
            },
          }),
        })
      },
    }
  )

  return (
    <div className="bg-white rounded-lg p-3 pt-0 overflow-hidden max-h-[700px] h-[700px] relative">
      {/* Loading */}
      {(props.isRmsDataLoading || isFetchingByDate) && (
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

      {isFetching && (
        <>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
            className="absolute z-20 top-0 right-0 left-0 bottom-0"
          />

          <Button
            className="py-2 px-4 rounded absolute w-fit z-30 h-fit m-auto top-0 right-0 left-0 bottom-0 text-white font-semibold shadow hover:scale-95 hover:bg-lightBlue bg-lightBlue transition-all normal-case duration-300"
            onClick={() => {
              queryClient.cancelQueries(["timeWaveForm"])
            }}
          >
            Stop Loading
          </Button>
        </>
      )}

      {/* Feature & Interval Dropdowns  */}
      <div className="flex flex-col gap-3 mt-16">
        <div className="flex items-center gap-5 pl-2 z-10">
          <div className="flex items-center gap-2.5">
            <p className="font-semibold text-gray-400">START</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time picker"
                value={startTime}
                inputFormat="DD/MM/YYYY hh:mm A"
                onChange={(value) => {
                  stopTimer()
                  //@ts-ignore
                  if (moment(value?.$d).isBefore(endTime)) {
                    //@ts-ignore
                    setStartTime(moment(value?.$d).format())
                    //@ts-ignore
                  } else {
                    showNotification({
                      title: "User notification",
                      message: "Start_ts can't be greater than end_ts !",
                      autoClose: 2500,
                      styles: () => ({
                        root: {
                          width: "300px",
                          padding: "12.5px 5px 20px 22px",
                          "&::before": { backgroundColor: "rgb(255, 193, 7)" },
                        },
                      }),
                    })
                  }
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    className="shadow py-3 px-4 border rounded"
                  >
                    <input
                      ref={inputRef}
                      {...inputProps}
                      style={{
                        border: "none",
                        outline: "none",
                        width: "155px",
                      }}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="flex items-center gap-2.5">
            <p className="font-semibold text-gray-400">END</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time picker"
                value={endTime}
                inputFormat="DD/MM/YYYY hh:mm A"
                onChange={(value) => {
                  //@ts-ignore
                  if (moment(value?.$d).isAfter(startTime)) {
                    //@ts-ignore
                    setEndTime(moment(value?.$d).format())
                    //@ts-ignore
                  } else {
                    showNotification({
                      title: "User notification",
                      message: "End_ts can't be lesss than start_ts !",
                      autoClose: 2500,
                      styles: () => ({
                        root: {
                          width: "300px",
                          padding: "12.5px 5px 20px 22px",
                          "&::before": { backgroundColor: "rgb(255, 193, 7)" },
                        },
                      }),
                    })
                  }
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    className="shadow py-3 px-4 border rounded"
                  >
                    <input
                      ref={inputRef}
                      {...inputProps}
                      style={{
                        border: "none",
                        outline: "none",
                        width: "155px",
                      }}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>

          <Tooltip
            title="Refetch"
            arrow
            classes={{
              tooltip: "bg-gray-200 text-black",
              arrow: "text-gray-200",
            }}
          >
            <Button
              className="shadow border py-[10.25px] min-w-fit px-3 rounded-md transition-all duration-300 bg-lightBlue hover:bg-lightBlue text-white bg-opacity-90 hover:bg-opacity-100"
              onClick={async () => {
                const article = {
                  title: h1.asset_id,
                  startDate: startTime,
                  endDate: endTime,
                }

                setFilter(true)

                if (moment(startTime).isBefore(endTime)) {
                  if (moment(endTime).diff(startTime, "days") <= 7 || true) {
                    setIsRealtime(false)

                    const article = {
                      title: selectedDevice?.asset_id,
                      startDate: startTime,
                      endDate: endTime,
                    }

                    try {
                      setIsFetchingByDate(true)

                      let response = await axios.post(
                        `${BACKEND_URL}/api/threshold/filter`,
                        article
                      )

                      setIsFetchingByDate(false)

                      setIsRealtime(false)
                      setFillArray(response.data)

                      const copy = [...response.data[0].x_rms_acl]
                      const copy2 = [...response.data[0].y_rms_acl]
                      const copy3 = [...response.data[0].z_rms_acl]
                      const copy4 = [...response.data[0].timeup]
                      const copy5 = [...response.data[0].x_rms_vel]
                      const copy6 = [...response.data[0].y_rms_vel]
                      const copy7 = [...response.data[0].z_rms_vel]

                      const copyFloatArray: number[] = copy.map((str) =>
                        parseFloat(str)
                      )
                      const copyFloatArray2: number[] = copy2.map((str) =>
                        parseFloat(str)
                      )
                      const copyFloatArray3: number[] = copy3.map((str) =>
                        parseFloat(str)
                      )

                      const copyFloatArray5: number[] = copy5.map((str) =>
                        parseFloat(str)
                      )

                      const copyFloatArray6: number[] = copy6.map((str) =>
                        parseFloat(str)
                      )

                      const copyFloatArray7: number[] = copy7.map((str) =>
                        parseFloat(str)
                      )

                      setMyArray(copyFloatArray)
                      setMyArray2(copyFloatArray2)
                      setMyArray3(copyFloatArray3)
                      setMyString(copy4)
                      setMyArray5(copyFloatArray5)
                      setMyArray6(copyFloatArray6)
                      setMyArray7(copyFloatArray7)

                      setIsRealtime(false)
                    } catch (error) {
                      setIsFetchingByDate(false)
                      console.error({ error })
                    }
                  } else {
                    showNotification({
                      title: "User notification",
                      message: "Max time range is 7 days !",
                      autoClose: 2500,
                      styles: () => ({
                        root: {
                          width: "300px",
                          padding: "12.5px 5px 20px 22px",
                          "&::before": { backgroundColor: "rgb(255, 193, 7)" },
                        },
                      }),
                    })
                  }
                } else {
                  showNotification({
                    title: "User notification",
                    message: "Start_ts can't be greater than end_ts !",
                    autoClose: 2500,
                    styles: () => ({
                      root: {
                        width: "300px",
                        padding: "12.5px 5px 20px 22px",
                        "&::before": { backgroundColor: "rgb(255, 193, 7)" },
                      },
                    }),
                  })
                }
              }}
            >
              <RefreshOutlinedIcon />
            </Button>
          </Tooltip>
          <FormControlLabel
            className="relative right-1"
            classes={{
              label: `font-semibold ${
                isRealtime ? "text-gray-500" : "text-gray-400 transition-all"
              }`,
            }}
            control={
              <Switch
                checked={isRealtime}
                onChange={(e) => setIsRealtime(e.target.checked)}
                classes={{ track: "bg-infoCardDarkGreen" }}
                size="medium"
              />
            }
            label="Realtime"
          />
        </div>
        <div className="flex items-center z-10">
          {/* FEATURE SECTION  */}
          <div className="items-center mr-2 px-2 hidden sm:flex">
            <p className="mr-2 font-semibold text-gray-400">FEATURE</p>
            <Select
              value={feature}
              variant="standard"
              classes={{
                select: "relative left-2 focus:bg-transparent ",
                icon: "relative",
              }}
              sx={{ color: "#303a4e" }}
              className=" border w-40 ml-auto py-1.5 px-4 shadow rounded"
              disableUnderline={true}
              onChange={(event) => {
                setFeature(event.target.value)
                if (event.target.value == "Acceleration Time Waveform") {
                  setIsEnabled(false)
                  if (filter) {
                    const copied1 = [...fillArray[0].x_rms_acl]
                    const copyFloatArray1: number[] = copied1.map((str) =>
                      parseFloat(str)
                    )
                    setMyArray(copyFloatArray1)

                    const copied2 = [...fillArray[0].y_rms_acl]
                    const copyFloatArray2: number[] = copied2.map((str) =>
                      parseFloat(str)
                    )
                    setMyArray2(copyFloatArray2)

                    const copied3 = [...fillArray[0].z_rms_acl]
                    const copyFloatArray3: number[] = copied3.map((str) =>
                      parseFloat(str)
                    )
                    setMyArray3(copyFloatArray3)
                  } else {
                    const stringArray: string[] = [...h1["x_rms_acl"]]
                    const stringArray2: string[] = [...h1["y_rms_acl"]]
                    const stringArray3: string[] = [...h1["z_rms_acl"]]
                    const floatArray: number[] = stringArray.map((str) =>
                      parseFloat(str)
                    )
                    const floatArray2: number[] = stringArray2.map((str) =>
                      parseFloat(str)
                    )
                    const floatArray3: number[] = stringArray3.map((str) =>
                      parseFloat(str)
                    )

                    setMyArray(floatArray)
                    setMyArray2(floatArray2)
                    setMyArray3(floatArray3)
                  }
                }
                if (event.target.value == "Velocity Time Waveform") {
                  setIsEnabled(true)
                  if (filter) {
                    const copied1 = [...fillArray[0].x_rms_vel]
                    const copyFloatArray1: number[] = copied1.map((str) =>
                      parseFloat(str)
                    )
                    setMyArray5(copyFloatArray1)

                    ///
                    const copied2 = [...fillArray[0].y_rms_vel]
                    const copyFloatArray2: number[] = copied2.map((str) =>
                      parseFloat(str)
                    )
                    setMyArray6(copyFloatArray2)

                    const copied3 = [...fillArray[0].z_rms_vel]
                    const copyFloatArray3: number[] = copied3.map((str) =>
                      parseFloat(str)
                    )
                    setMyArray7(copyFloatArray3)
                  } else {
                    const stringArray5: string[] = [...h1["x_rms_vel"]]
                    const stringArray6: string[] = [...h1["y_rms_vel"]]
                    const stringArray7: string[] = [...h1["z_rms_vel"]]

                    const floatArray5: number[] = stringArray5.map((str) =>
                      parseFloat(str)
                    )
                    const floatArray6: number[] = stringArray6.map((str) =>
                      parseFloat(str)
                    )
                    const floatArray7: number[] = stringArray7.map((str) =>
                      parseFloat(str)
                    )

                    setMyArray5(floatArray5)
                    setMyArray6(floatArray6)
                    setMyArray7(floatArray7)
                    const objs: any = {
                      ...myThreshold[selectedDevice?.asset_id],
                    }
                    const obj1: any = {
                      ...objs["X_Axis_Velocity_Time_Waveform"],
                    }
                    const obj2: any = {
                      ...objs["Y_Axis_Velocity_Time_Waveform"],
                    }
                    const obj3: any = {
                      ...objs["Z_Axis_Velocity_Time_Waveform"],
                    }
                    setNormal(obj1.normal)
                    setCaution(obj1.caution)
                    setWarning(obj1.warning)
                  }
                }
              }}
            >
              {["Acceleration Time Waveform", "Velocity Time Waveform"].map(
                (item) => (
                  <MenuItem
                    value={item}
                    key={item}
                    onClick={() => {
                      if (item === "Velocity Time Waveform") {
                        // Call your function here
                        setIsEnabled(true)
                        const objs: any = {
                          ...myThreshold[selectedDevice?.asset_id],
                        }
                        const obj1: any = {
                          ...objs["X_Axis_Velocity_Time_Waveform"],
                        }
                        const obj2: any = {
                          ...objs["Y_Axis_Velocity_Time_Waveform"],
                        }
                        const obj3: any = {
                          ...objs["Z_Axis_Velocity_Time_Waveform"],
                        }
                        setNormal(obj1.normal)
                        setCaution(obj1.caution)
                        setWarning(obj1.warning)
                      }
                      if (item === "Acceleration Time Waveform") {
                        // Call your function here
                        setIsEnabled(false)
                      }
                    }}
                  >
                    {item}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          {/* AXIS SECTION  */}
          <div className="flex items-center gap-4px-2 ">
            <p className="mr-2 font-semibold text-gray-400">AXIS</p>
            <div className="flex items-center gap-2">
              {[
                { label: "X-Axis", color: "#1340E8" },
                { label: "Y-Axis", color: "#31E802" },
                { label: "Z-Axis", color: "#FF0022" },
              ].map((item) => (
                <FormControlLabel
                  className="flex items-center gap-2"
                  key={item.label}
                  control={
                    <Checkbox
                      sx={{
                        color: item.color,
                        "&.Mui-checked": {
                          color: item.color,
                        },
                      }}
                      checked={axis.includes(item.label)}
                      key={item.label}
                      onChange={(e: any) => {
                        if (!e.target.checked) {
                          if (axis.length === 1) {
                            if (item.label == "X-Axis") {
                              const objs: any = {
                                ...myThreshold[selectedDevice?.asset_id],
                              }
                              const obj1: any = {
                                ...objs["X_Axis_Velocity_Time_Waveform"],
                              }
                              const obj2: any = {
                                ...objs["Y_Axis_Velocity_Time_Waveform"],
                              }
                              const obj3: any = {
                                ...objs["Z_Axis_Velocity_Time_Waveform"],
                              }
                              setNormal(obj1.normal)
                              setCaution(obj1.caution)
                              setWarning(obj1.warning)
                            } else if (item.label == "Y-Axis") {
                              const objs: any = {
                                ...myThreshold[selectedDevice?.asset_id],
                              }
                              const obj1: any = {
                                ...objs["X_Axis_Velocity_Time_Waveform"],
                              }
                              const obj2: any = {
                                ...objs["Y_Axis_Velocity_Time_Waveform"],
                              }
                              const obj3: any = {
                                ...objs["Z_Axis_Velocity_Time_Waveform"],
                              }
                              setNormal(obj2.normal)
                              setCaution(obj2.caution)
                              setWarning(obj2.warning)
                            } else {
                              const objs: any = {
                                ...myThreshold[selectedDevice?.asset_id],
                              }
                              const obj1: any = {
                                ...objs["X_Axis_Velocity_Time_Waveform"],
                              }
                              const obj2: any = {
                                ...objs["Y_Axis_Velocity_Time_Waveform"],
                              }
                              const obj3: any = {
                                ...objs["Z_Axis_Velocity_Time_Waveform"],
                              }
                              setNormal(obj3.normal)
                              setCaution(obj3.caution)
                              setWarning(obj3.warning)
                            }
                          }
                          let temp = axis
                          setAxis(temp.filter((axis) => axis !== item.label))
                        } else {
                          setAxis([item.label].concat(axis))
                        }
                        if (item.label == "X-Axis") {
                          const objs: any = {
                            ...myThreshold[selectedDevice?.asset_id],
                          }
                          const obj1: any = {
                            ...objs["X_Axis_Velocity_Time_Waveform"],
                          }
                          const obj2: any = {
                            ...objs["Y_Axis_Velocity_Time_Waveform"],
                          }
                          const obj3: any = {
                            ...objs["Z_Axis_Velocity_Time_Waveform"],
                          }
                          setNormal(obj1.normal)
                          setCaution(obj1.caution)
                          setWarning(obj1.warning)
                        } else if (item.label == "Y-Axis") {
                          const objs: any = {
                            ...myThreshold[selectedDevice?.asset_id],
                          }
                          const obj1: any = {
                            ...objs["X_Axis_Velocity_Time_Waveform"],
                          }
                          const obj2: any = {
                            ...objs["Y_Axis_Velocity_Time_Waveform"],
                          }
                          const obj3: any = {
                            ...objs["Z_Axis_Velocity_Time_Waveform"],
                          }
                          setNormal(obj2.normal)
                          setCaution(obj2.caution)
                          setWarning(obj2.warning)
                        } else {
                          const objs: any = {
                            ...myThreshold[selectedDevice?.asset_id],
                          }
                          const obj1: any = {
                            ...objs["X_Axis_Velocity_Time_Waveform"],
                          }
                          const obj2: any = {
                            ...objs["Y_Axis_Velocity_Time_Waveform"],
                          }
                          const obj3: any = {
                            ...objs["Z_Axis_Velocity_Time_Waveform"],
                          }
                          setNormal(obj3.normal)
                          setCaution(obj3.caution)
                          setWarning(obj3.warning)
                        }
                      }}
                    />
                  }
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* SPLINE CHART  */}
      <div className="relative bottom-40">
        {/* Menu */}
        <ExportMenu
          menuItems={[
            {
              label: "Download PNG",
              onClick: () =>
                exportToImage({
                  chartRef,
                  fileName: "timewaveform.png",
                }),
              image: "",
            },
            {
              label: "Download PDF",
              onClick: () =>
                exportToPdf({
                  jsonData: getChartJsonData(),
                  fileName: "timewaveform.pdf",
                  headers: [...Object.keys(getChartJsonData()[0])],
                  assetId: selectedDevice?.asset_id,
                }),
              image: "",
            },
            {
              label: "Download XLSX",
              onClick: () =>
                exportToXLSX({
                  jsonData: getChartJsonData(),
                  fileName: "timewaveform.xlsx",
                  headers: [...Object.keys(getChartJsonData()[0])],
                }),
              image: "",
            },
          ]}
          position="right-[-9px] top-[6px]"
        />
        <HighchartsReact
          ref={chartRef}
          containerProps={{ style: { height: "42.5rem" } }}
          highcharts={Highcharts}
          options={options(
            axis.includes("X-Axis"),
            axis.includes("Y-Axis"),
            axis.includes("Z-Axis"),
            `Amplitude ${
              feature === "Acceleration Time Waveform" ? "( m/s² )" : "m/s"
            }`,
            `Time Waveform Data (${selectedDevice.exhauster_name.toLowerCase()}, ${selectedDevice.asset_name.toLowerCase()}, ${
              selectedDevice.asset_location.split(" ")[0][0]
            }${selectedDevice.asset_location.split(" ")[1][0]}${
              selectedDevice.asset_location.split(" ").length === 3
                ? selectedDevice.asset_location.split(" ")[2][0]
                : ""
            })`
          )}
        />
      </div>
    </div>
  )
}

export default TimeWaveformChart
