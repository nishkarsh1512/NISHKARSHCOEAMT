import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ResponseError } from "../../client"
import useDeviceStore from "../../../store/device"
import { getMetricsData } from "../../charts"
import useTimeStore from "../../../store/time"
import { Dispatch, SetStateAction } from "react"

interface Props {
  isRealtime: boolean
  setIsMetricsDataRefreshing: Dispatch<SetStateAction<boolean>>
}

const useMetricsData = ({
  isRealtime,
  setIsMetricsDataRefreshing,
}: Props): UseQueryResult<any, ResponseError> => {
  const { selectedDevice } = useDeviceStore()
  const { tw_startTime: startTime, tw_endTime: endTime } = useTimeStore()

  const assetId = selectedDevice?.asset_id

  const params = {
    assetId,
    isRealtime,
    startTime,
    endTime,
  }

  const metricsDataResult = useQuery<any, ResponseError>(
    ["metricsData"],
    () =>
      getMetricsData({
        ...params,
        setIsMetricsDataRefreshing,
      }),
    {
      enabled: !!assetId,
      refetchInterval: 45000,
      staleTime: 0,
      cacheTime: 0,
    }
  )

  return metricsDataResult
}

export default useMetricsData
