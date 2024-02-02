import MoreVertIcon from "@mui/icons-material/MoreVert"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import useDeviceStore from "../../store/device"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Button, Tooltip } from "@mui/material"
import { showNotification } from "@mantine/notifications"
import * as React from "react"
let interval: NodeJS.Timeout | undefined

const DevicePanel = () => {
  const { selectedDevice } = useDeviceStore()

  return (
    <div className="bg-white rounded-lg py-3 px-4 overflow-hidden h-[35%]">
      <div className="flex justify-between items-center mb-2 pl-3">
        <p className="font-semibold text-lg">Device Details</p>
        <span className="py-1.5 px-2 transition-all cursor-pointer hover:bg-gray-200 rounded-full">
          {/* @ts-ignore */}
          <MoreVertIcon className="text-lg" />
        </span>
      </div>
      <div className="flex flex-col justify-between h-80 px-3">
        <div>
          <p className="font-semibold">Asset ID</p>
          <p className={`text-lightBlue2 flex justify-between items-center`}>
            {selectedDevice?.asset_id.slice(0, 29)}...
            <CopyToClipboard
              text={selectedDevice?.asset_id}
              onCopy={() => {
                showNotification({
                  title: "User notification",
                  message: "Copied to clipboard !",
                  autoClose: 2500,
                  styles: () => ({
                    root: {
                      width: "300px",
                      padding: "12.5px 5px 20px 22px",
                      "&::before": { backgroundColor: "#1340E8" },
                    },
                  }),
                })
              }}
            >
              {/* @ts-ignore */}
              <Tooltip
                title="Copy"
                arrow
                classes={{
                  tooltip: "bg-gray-200 text-black",
                  arrow: "text-gray-200",
                }}
              >
                {/* @ts-ignore */}
                <Button className="min-w-fit">
                  {/* @ts-ignore */}
                  <ContentCopyIcon className="text-lg cursor-pointer" />
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </p>
        </div>
        <div>
          <p className="font-semibold">Asset Mac ID</p>
          <p className="text-infoCardDarkGreen flex justify-between items-center">
            {selectedDevice?.asset_mac_id}
            <CopyToClipboard
              text={selectedDevice?.asset_mac_id}
              onCopy={() => {
                showNotification({
                  title: "User notification",
                  message: "Copied to clipboard !",
                  autoClose: 2500,
                  styles: () => ({
                    root: {
                      width: "300px",
                      padding: "12.5px 5px 20px 22px",
                      "&::before": { backgroundColor: "#1340E8" },
                    },
                  }),
                })
              }}
            >
              {/* @ts-ignore */}
              <Tooltip
                title="Copy"
                arrow
                classes={{
                  tooltip: "bg-gray-200 text-black",
                  arrow: "text-gray-200",
                }}
              >
                {/* @ts-ignore */}
                <Button className="min-w-fit">
                  {/* @ts-ignore */}
                  <ContentCopyIcon className="text-lg cursor-pointer" />
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </p>
        </div>
        <div>
          <p className="font-semibold">Exhauster Name</p>
          <p className="text-gray-400">{selectedDevice?.exhauster_name}</p>
        </div>
        <div>
          <p className="font-semibold">Asset Name</p>
          <p className="text-gray-400">{selectedDevice?.asset_name}</p>
        </div>
        <div>
          <p className="font-semibold">Asset Location</p>
          <p className="text-gray-400">{selectedDevice?.asset_location}</p>
        </div>
      </div>
    </div>
  )
}

export default DevicePanel

export const stopTimer = () => {
  clearInterval(interval)
}
