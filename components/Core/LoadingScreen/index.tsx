import { memo } from "react"
import EyeVibLogo from "../../Logos/EyeVibLogo"
import { LinearProgress } from "@mui/material"

const index = () => (
  <div className="h-screen w-screen max-h-screen overflow-hidden flex items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-4 scale-150">
      <EyeVibLogo mode="light" />

      <LinearProgress
        className="top-0 w-[200px] right-5 relative z-50 rounded-full"
        style={{ zIndex: "120" }}
        classes={{ bar: "bg-lightBlue" }}
      />
    </div>
  </div>
)

export default memo(index)
