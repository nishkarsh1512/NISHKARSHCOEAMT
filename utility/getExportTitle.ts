import { devices } from "../constants/devices"

const formatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
})

const getExportTitle = ({ assetId }: { assetId: string }) => {
  // Get current time
  const currentDate = new Date()

  const formattedCurrentTime = formatter.format(currentDate)

  // get asset name
  const device = devices.find(({ asset_id }) => assetId === asset_id)

  return `EyeVib: Solution by Centre of Excellence in Advanced Manufacturing Technology\n${
    !!device
      ? `Asset - ${device?.exhauster_name} ${device?.asset_location}`
      : ""
  }\nData exported on - ${formattedCurrentTime}`
}
export default getExportTitle
