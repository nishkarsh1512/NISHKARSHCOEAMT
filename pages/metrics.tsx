import React, { useState, memo, useEffect } from "react"
import Highcharts from "highcharts"
import DashboardLayout from "../layout/dashboard"
import useDeviceStore from "../store/device"
import OptionsDrawer from "../components/Core/DrawerButton/OptionsDrawer"
import { Grid } from "@mui/material"
import MetricCard from "./metriccard"
import useTimeStore from "../store/time"
import HealthStatus from "../components/Metrics/HealthStatus/index"
import InstantaneousHealth from "../components/Metrics/InstantaneousHealth"
import useMetricsData from "../api/hooks/charts/useMetricsData"
import { devices } from "../constants/devices"
import MetricBox from "../components/Metrics/MetricBox"
import useGetLatestMetrics from "../api/hooks/charts/useGetLatestMetrics"

interface DataItem {
  et: number
  knn: number
  rf: number
  bp: number
  start_time: string
}

interface MyObject {
  [key: string]: number
}

const Metrics: React.FC = () => {
  const [isRealtime, setIsRealtime] = useState<boolean>(true)

  const [isLoading, setIsLoading] = useState(false)

  const [isMetricsDataRefreshing, setIsMetricsDataRefreshing] = useState(false)

  const [selectedModel, setSelectedModel] = useState<
    "ET" | "KNN" | "BEST_PREDICTION" | "RF"
  >("BEST_PREDICTION")

  // Initial data array
  const [data, setData] = useState<number[]>([1, 2, 3, 4, 5])

  const yLabels: Record<number, string> = {
    0: "Healthy",
    1: "Looseness",
    2: "Misalignment",
    3: "Anomalous Vibration",
    4: "No RMS Value Found",
    5: "No Data Found",
  }

  const {
    data: metricsData,
    isLoading: isMetricsDataLoading,
    isFetching: isMetricsDataFetching,
    error: isMetricsDataError,
    refetch: refetchMetricsData,
  } = useMetricsData({ isRealtime, setIsMetricsDataRefreshing })

  const {
    data: latestMetricsData,
    isLoading: isLatestMetricsLoading,
    error: isLatestMetricsError,
    isFetching: isLatestMetricsFetching,
  } = useGetLatestMetrics()

  const xLabels = !!metricsData
    ? metricsData?.map((data: any) => data?.start_time).reverse()
    : []

  const allYLabels = Object.values(yLabels)

  // Highcharts configuration options
  const options: Highcharts.Options = {
    title: {
      text: "",
      align: "left",
      margin: 160,
    },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: xLabels.slice().reverse(), // Set x-axis labels
    },
    yAxis: {
      title: {
        text: "Status",
      },
      categories: allYLabels, // Set y-axis labels
      labels: {
        formatter: function () {
          const value = Number(this.value)
          if (!isNaN(value) && yLabels[value] !== undefined) {
            return yLabels[value]
          }
          return this.value.toString()
        },
      },
    },
    series: [
      {
        name: "Data",
        data: !!metricsData
          ? metricsData?.map((data: any) =>
              selectedModel === "BEST_PREDICTION"
                ? data?.bp
                : selectedModel === "ET"
                ? data?.et
                : selectedModel === "KNN"
                ? data?.knn
                : data?.rf
            )
          : [],
        type: "line",
      },
    ],
  }

  const getJsonData = () => {
    const temp = data.map((value, index) => ({
      state: value,
      timestamp: xLabels.length > index ? xLabels[index] : null,
    }))

    return {
      all: [
        ...temp,
        { Health_Status: "0 = Healthy" },
        { Health_Status: "1 = Looseness" },
        { Health_Status: "2 = Misalignment" },
        { Health_Status: "3 = Anomalous Vibration" },
        { Health_Status: "4 = No RMS Values Found" },
        { Health_Status: "5 = No Data Found" },
      ],
      data: [...temp],
    }
  }

  return (
    // @ts-ignore
    <DashboardLayout>
      <div className="w-full overflow-y-scroll">
        <div className="py-5">
          {/* @ts-ignore */}
          <HealthStatus
            isRealtime={isRealtime}
            options={options}
            setIsRealtime={setIsRealtime}
            jsonData={getJsonData()}
            isLoading={
              (isMetricsDataLoading && isMetricsDataFetching) ||
              isMetricsDataRefreshing
            }
            refetchMetricsData={() => {
              setIsRealtime(false)
              setIsMetricsDataRefreshing(true)

              setTimeout(() => {
                refetchMetricsData()
              }, 1000)
            }}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <br />
          {/* @ts-ignore */}
          <InstantaneousHealth />
          <br />
          {/* @ts-ignore */}
          <Grid container spacing={2}>
            {devices.map((device) => (
              // @ts-ignore
              <MetricBox
                device={device}
                threshold={
                  !!latestMetricsData
                    ? latestMetricsData[device?.asset_id]
                    : undefined
                }
                key={device?.asset_id}
              />
            ))}
          </Grid>
        </div>
      </div>

      {/* @ts-ignore */}
      <OptionsDrawer
        isRmsDataLoading={isLoading}
        refetchMetricsData={() => {
          setIsRealtime(true)

          setTimeout(() => {
            refetchMetricsData()
          }, 2000)
        }}
        setIsMetricsDataRefreshing={setIsMetricsDataRefreshing}
      />
    </DashboardLayout>
  )
}

export default memo(Metrics)
