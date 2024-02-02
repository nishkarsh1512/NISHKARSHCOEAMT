import { Grid } from "@mui/material"
import { memo } from "react"
import MetricCard from "../../../pages/metriccard"

interface Props {
  device: {
    asset_id: string
    exhauster_name: string
    asset_name: string
    asset_location: string
    asset_mac_id: string
  }
  threshold?: any
}

const index = ({ device, threshold }: Props) => {
  const { exhauster_name, asset_name, asset_location } = device

  const location = asset_location
    .split(" ")
    .map((str) => str.slice(0, 1))
    .join("")

  const title = `${exhauster_name} ${asset_name} ${location}`

  return (
    <Grid item xs={3}>
      <MetricCard
        title={title}
        value={1200}
        unit="units"
        color={
          !!threshold
            ? threshold?.bp === 0
              ? "#2e8545"
              : threshold?.bp === 1
              ? "#ba8950"
              : threshold?.bp === 2
              ? "#de381f"
              : threshold?.bp === 3
              ? "#b806c4"
              : threshold?.bp === 4
              ? "#007BFF"
              : "#8B8000"
            : ""
        }
        trend="up"
        et={!!threshold ? threshold?.et : undefined}
        knn={!!threshold ? threshold?.knn : undefined}
        rf={!!threshold ? threshold?.rf : undefined}
        best={!!threshold ? threshold?.bp : undefined}
      />
    </Grid>
  )
}

export default memo(index)
