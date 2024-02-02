import { Box, CardContent } from "@mui/material"
import { memo, Fragment } from "react"

const index = () => (
  <Box sx={{ minWidth: 275 }} className="bg-white rounded-lg">
    <Fragment>
      <CardContent>
        <div className="font-bold text-lg">Metric Information</div>

        <div className="flex items-center gap-3">
          {[
            {
              label: "0: Healthy",
              color: "#2e8545",
            },
            {
              label: "1: Looseness",
              color: "#ba8950",
            },
            {
              label: "2: Misalignment",
              color: "#de381f",
            },
            {
              label: "3: Anomalous Vibration",
              color: "#b806c4",
            },
            {
              label: "4: No RMS Values Found",
              color: "#007BFF",
            },
            {
              label: "5: No Data Found",
              color: "#8B8000",
            },
          ].map(({ color, label }) => (
            <span
              className="text-lg font-semibold"
              style={{ color }}
              key={label}
            >
              {label}
            </span>
          ))}
        </div>
      </CardContent>
    </Fragment>
  </Box>
)

export default memo(index)
