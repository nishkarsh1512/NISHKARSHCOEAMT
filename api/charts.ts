import axios from "axios"
import { BACKEND_URL } from "../constants"
import { Dispatch, SetStateAction } from "react"

const getRmsData = async ({ asset_id }: { asset_id: string }) => {
  if (!!asset_id) {
    const queryParams = new URLSearchParams({
      asset_id,
    })

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/threshold/rms?${queryParams}`
      )

      return response.data
    } catch (error) {
      console.error({ error })
      return null
    }
  } else return null
}

const getMetricsData = async ({
  assetId,
  isRealtime,
  endTime,
  startTime,
  setIsMetricsDataRefreshing,
}: {
  assetId: string
  startTime?: string
  endTime?: string
  isRealtime: boolean
  setIsMetricsDataRefreshing: Dispatch<SetStateAction<boolean>>
}) => {
  if (!!assetId) {
    const queryParams = new URLSearchParams({
      assetId,
      isRealtime: String(isRealtime),
      endTime: String(endTime),
      startTime: String(startTime),
    })

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/threshold/metrics?${queryParams}`
      )

      setIsMetricsDataRefreshing(false)

      return response.data
    } catch (error) {
      console.error({ error })
      return null
    }
  } else return null
}

const getLatestMetrics = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/threshold/latestMetrics`
    )

    return response.data
  } catch (error) {
    console.error({ error })
    return null
  }
}

export { getRmsData, getMetricsData, getLatestMetrics }
