import { showNotification } from "@mantine/notifications"
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Switch,
  Tooltip,
} from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dispatch, SetStateAction, memo, useRef } from "react"
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined"
import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official"
import Highcharts from "highcharts"
import ExportMenu from "../../Core/ExportMenu"
import exportToImage from "../../../utility/exportToImage"
import exportToPdf from "../../../utility/exportToPdf"
import exportToXLSX from "../../../utility/exportToXlsx"
import moment from "moment"
import useTimeStore from "../../../store/time"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query"
import { ResponseError } from "../../../api/client"
import useDeviceStore from "../../../store/device"

interface Props {
  setIsRealtime: Dispatch<SetStateAction<boolean>>
  isRealtime: boolean
  jsonData: {
    all: any[]
    data: any[]
  }
  isLoading: boolean
  options: Highcharts.Options
  selectedModel: "ET" | "KNN" | "BEST_PREDICTION" | "RF"
  setSelectedModel: Dispatch<
    SetStateAction<"ET" | "KNN" | "BEST_PREDICTION" | "RF">
  >
  refetchMetricsData: () => void
}

const Index = ({
  setIsRealtime,
  isRealtime,
  options,
  jsonData,
  isLoading,
  refetchMetricsData,
  selectedModel,
  setSelectedModel,
}: Props) => {
  const chartRef = useRef<HighchartsReactRefObject>(null)

  const {
    set_tw_StartTime: setStartTime,
    set_tw_EndTime: setEndTime,
    tw_startTime: startTime,
    tw_endTime: endTime,
  } = useTimeStore()

  const { selectedDevice } = useDeviceStore()

  const location = selectedDevice?.asset_location
    .split(" ")
    .map((str) => str.slice(0, 1))
    .join("")

  const title = `${selectedDevice?.exhauster_name}, ${
    selectedDevice?.asset_name?.slice(0, 1).toUpperCase() +
    selectedDevice?.asset_name?.slice(1).toLowerCase()
  }, ${location}`

  const modelSelectItems: {
    label: string
    value: "ET" | "KNN" | "BEST_PREDICTION" | "RF"
  }[] = [
    {
      label: "ET",
      value: "ET",
    },
    {
      label: "KNN",
      value: "KNN",
    },
    {
      label: "Best Prediction",
      value: "BEST_PREDICTION",
    },
    {
      label: "RF",
      value: "RF",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-3 pt-0 overflow-hidden relative">
      {isLoading && (
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

      <div className="flex flex-col gap-3 pl-2 pt-4">
        <div className="font-bold text-lg">
          Health State Prediction ({title})
        </div>
        <div className="flex items-center gap-5 z-10">
          <div className="flex items-center gap-2.5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time picker"
                value={startTime}
                inputFormat="DD/MM/YYYY hh:mm A"
                onChange={(value) => {
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
                          "&::before": {
                            backgroundColor: "rgb(255, 193, 7)",
                          },
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
                        backgroundColor: "transparent",
                      }}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="flex items-center gap-2.5">
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
                          "&::before": {
                            backgroundColor: "rgb(255, 193, 7)",
                          },
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
                        backgroundColor: "transparent",
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
            <IconButton onClick={refetchMetricsData}>
              <RefreshOutlinedIcon />
            </IconButton>
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
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Model</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedModel}
              label="Model"
              onChange={(event) =>
                setSelectedModel(
                  event.target.value as "ET" | "KNN" | "BEST_PREDICTION" | "RF"
                )
              }
            >
              {modelSelectItems.map(({ label, value }) => (
                <MenuItem value={value} key={value}>
                  <em>{label}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="relative">
        <ExportMenu
          menuItems={[
            {
              label: "Download PNG",
              onClick: () =>
                exportToImage({
                  chartRef,
                  fileName: "health_state.png",
                }),
              image: "",
            },
            {
              label: "Download PDF",
              onClick: () =>
                exportToPdf({
                  jsonData: [...jsonData.data],
                  fileName: "health_state.pdf",
                  headers: [...Object.keys(jsonData.data[0])],
                  assetId: selectedDevice?.asset_id,
                }),
              image: "",
            },
            {
              label: "Download XLSX",
              onClick: () =>
                exportToXLSX({
                  jsonData: [...jsonData.all],
                  fileName: "health_state.xlsx",
                  headers: [...Object.keys(jsonData.all[0]), "Health_Status"],
                }),
              image: "",
            },
          ]}
          position="right-[-9px] top-[-105px]"
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      </div>
    </div>
  )
}

export default memo(Index)
