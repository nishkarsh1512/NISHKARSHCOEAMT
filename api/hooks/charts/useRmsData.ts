import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ResponseError } from "../../client"
import useDeviceStore from "../../../store/device"
import { getRmsData } from "../../charts"

const useRmsData = (): UseQueryResult<any, ResponseError> => {
  const { selectedDevice } = useDeviceStore()

  const asset_id = selectedDevice?.asset_id

  const params = {
    asset_id,
  }

  const rmsDataResult = useQuery<any, ResponseError>(
    ["rmsData"],
    () =>
      getRmsData({
        ...params,
      }),
    {
      enabled: !!asset_id,
      refetchInterval: 45000,
      staleTime: 0,
      cacheTime: 0,
    }
  )

  return rmsDataResult
}

export default useRmsData
