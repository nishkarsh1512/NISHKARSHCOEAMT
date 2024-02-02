import React, { useMemo, useState } from "react"
import { useRouter } from "next/router"
import classNames from "classnames"
import { useAppStateContext } from "../../../context/contextProvider"
import { Divider } from "@mui/material"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import { NoSsr } from "@mui/base"
import useAuthStore from "../../../store/auth"
import { useContext } from "react"
import { AppContext } from "../../../components/Monitoring/AppContext"
import LogoutIcon from "@mui/icons-material/Logout"
import { AppContextProvider } from "../../../context/contextProvider"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import IIT from "../../../assets/images/iit-logo.png"
import { SiGoogleanalytics } from "react-icons/si"
import clsx from "clsx"
import Settings from "../../../assets/icons/Settings"
import Monitoring from "../../../assets/icons/Monitoring"
import Administration from "../../../assets/icons/Administration"
import Metrics from "../../../assets/icons/Metrics"
import Developer from "../../../assets/icons/Developer"
import Image from "next/image"

const menuItems: {
  id: number
  label: string
  link: string
  active: boolean
}[] = [
  {
    id: 1,
    label: "Monitoring",
    link: "/monitoring",
    active: true,
  },
  {
    id: 2,
    label: "Configuration",
    link: "/configuration",
    active: false,
  },
  {
    id: 3,
    label: "Administration",
    link: "/administration",
    active: true,
  },
  {
    id: 4,
    label: "Metrics",
    link: "/metrics",
    active: true,
  },
  {
    id: 5,
    label: "Developers",
    link: "/developers",
    active: true,
  },
]

export const Sidebar = () => {
  const context = useAppStateContext() // Get the entire context object

  const router = useRouter()
  const [collapseIconActive, setCollapseIconActive] = useState(false)
  const { me } = useAuthStore()

  // @ts-ignore
  const [sidebarToggleCollapse, setSidebarToggleCollapse] = useState(true)
  const { myBoolean, setMyBoolean } = useContext(AppContext)
  const activeMenu: any = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  )

  const wrapperClasses = classNames(
    "h-screen pt-1 bg-sidebarDark1 max-h-screen flex justify-between flex-col transition-all duration-500 absolute z-[1000]",
    {
      "w-[270px]": !sidebarToggleCollapse,
      "w-[83.75px]": sidebarToggleCollapse,
      absolute: false,
    }
  )

  const getNavItemClasses = (menu: {
    id: number
    label: string
    link: string
  }) => {
    return classNames(
      "flex items-center cursor-pointer overflow-hidden whitespace-nowrap transition-all duration-500 rounded my-0.5 relative",
      {
        "bg-lightBlue bg-opacity-80 hover:bg-lightBlue hover:bg-opacity-80":
          activeMenu.id === menu.id,
        "hover:bg-lightBlue hover:bg-opacity-25": activeMenu.id !== menu.id,
      }
    )
  }

  const collapseIconClasses = classNames(
    "bg-black bg-opacity-20 absolute w-11 h-11 -right-5 top-[63.5px] rounded-full hover:scale-105 transition-all duration-300",
    {
      "rotate-180": sidebarToggleCollapse,
      "opacity-100": collapseIconActive,
      "opacity-0": !collapseIconActive,
    }
  )

  const getNavItemLinkClasses = (menu: {
    id: number
    label: string
    link: string
  }) =>
    classNames(
      "flex py-4 px-3 items-center h-full transition-all duration-500 text-white gap-3",
      {
        "w-60": !sidebarToggleCollapse,
        "w-12": sidebarToggleCollapse,
        "text-white text-opacity-40 hover:text-white hover:text-opacity-100":
          menu.link !== router.pathname,
      }
    )

  const getNavItemIndicatorCLasses = (menu: {
    id: number
    label: string
    link: string
  }) =>
    classNames(
      "absolute h-full bg-white bg-opacity-80 transition-all duration-500 w-1",
      {
        "opacity-100": menu.link === router.pathname && !sidebarToggleCollapse,
        "opacity-0": menu.link !== router.pathname || sidebarToggleCollapse,
      }
    )

  const impFunc = () => {
    setMyBoolean(true)
  }

  /////////////////
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  ////////////////
  ////////////////////
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  // Function to open the logout dialog
  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true)
  }

  // Function to close the logout dialog
  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false)
  }

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session, redirect, etc.)
    // After logout, close the dialog and perform necessary actions.

    // Close the logout dialog

    // setLogoutDialogOpen(false)
    context?.setLogoutModalActive(true)
  }

  const renderSidebarLogo = ({ id }: { id: number }) => {
    switch (id) {
      case 1: {
        return <Monitoring fill="inherit" height="25px" width="25px" />
      }
      case 2: {
        return <Settings fill="inherit" height="25px" width="25px" />
      }
      case 3: {
        return <Administration fill="inherit" height="25px" width="25px" />
      }
      case 4: {
        return <Metrics fill="inherit" height="25px" width="25px" />
      }
      case 5: {
        return <Developer fill="inherit" height="25px" width="25px" />
      }

      default: {
        return (
          <SiGoogleanalytics
            className="text-[24px] transition-all duration-500 min-w-[25px]"
            style={{ minWidth: "25px", width: "25px" }}
          />
        )
      }
    }
  }

  return (
    <AppContextProvider>
      <div
        className={wrapperClasses}
        id="sidebar"
        onMouseEnter={() => setCollapseIconActive(true)}
        onMouseLeave={() => setCollapseIconActive(false)}
      >
        <div className="flex flex-col gap-6">
          <div
            className="flex items-center justify-between relative px-4"
            id="sidebar-header"
          >
            <div
              className={classNames(
                "flex items-center pl-1 gap-1.5 rounded-md py-2 pr-1 transition-all duration-500 overflow-hidden",
                {
                  "w-[180px]": sidebarToggleCollapse,
                  "w-52": !sidebarToggleCollapse,
                }
              )}
            >
              <img
                src="images/eyevib.png"
                alt="iit logo"
                className="h-10 object-contain rounded-full shadow-logCard ml-3"
              />
              <span
                className={classNames(
                  "mt-2 ml-2 font-bold text-white pr-3 relative bottom-1.5 sm600:text-3xl text-2xl tracking-wide "
                )}
              >
                <span>Eye</span>
                <span className="text-lightBlue">Vib</span>
              </span>
            </div>

            <button
              className={collapseIconClasses}
              onClick={() => {
                setSidebarToggleCollapse(!sidebarToggleCollapse)
              }}
            >
              <KeyboardDoubleArrowLeftIcon className="text-white m-auto" />
            </button>
          </div>
          <Divider className="bg-white bg-opacity-50 w-[100%]" />
          <div className="flex flex-col items-start px-4">
            {menuItems.map((menu, index) => (
              <div
                key={index}
                className={clsx(
                  "flex items-center cursor-pointer overflow-hidden whitespace-nowrap transition-all duration-500 rounded my-0.5 relative",
                  activeMenu.id === menu.id
                    ? "bg-lightBlue bg-opacity-80 hover:bg-lightBlue hover:bg-opacity-80"
                    : "hover:bg-lightBlue hover:bg-opacity-25"
                )}
              >
                <div
                  className={clsx(
                    "absolute h-full bg-white bg-opacity-80 transition-all duration-500 w-1",
                    menu.link === router.pathname &&
                      !sidebarToggleCollapse &&
                      "opacity-100",
                    (menu.link !== router.pathname || sidebarToggleCollapse) &&
                      "opacity-0"
                  )}
                />

                <button onClick={() => router?.push(menu?.link)}>
                  <div
                    className={clsx(
                      "flex py-4 px-3 items-center h-full transition-all duration-500 text-white gap-3",
                      sidebarToggleCollapse ? "w-12" : "w-60",
                      menu.link !== router.pathname
                        ? "text-white fill-gray-500 text-opacity-40 hover:text-white hover:text-opacity-100"
                        : "fill-white"
                    )}
                  >
                    {renderSidebarLogo({ id: menu?.id })}

                    <span className="text-md font-medium transition-all duration-500 font_inter">
                      {menu?.label}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="gap-2 flex items-center relative pl-[18px] w-full h-[152px] overflow-hidden">
          <img
            src={IIT.src}
            alt=""
            loading="lazy"
            className="w-[44px] h-[44px]"
          />
          <span className="text-gray-500 absolute font-semibold left-[84px] w-[162px] flex flex-col">
            <span className="text-gray-400">Developed by : </span>
            <span>
              Centre of Excellence in Advanced Manufacturing Technology, IIT
              Kharagpur
            </span>
          </span>
        </div>
        <div className="gap-2 flex items-center relative pl-[18px] w-full h-[152px] overflow-hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/SAIL_Logo.svg/1200px-SAIL_Logo.svg.png"
            alt=""
            loading="lazy"
            width={44}
            height={44}
            className="w-[44px] h-[44px] filter brightness-0 invert"
          />
          <span className="text-gray-500 absolute font-semibold left-[84px] w-[162px] flex flex-col">
            <span className="text-gray-400">Developed for : </span>
            <span>
              Research and Development Centre for Iron and Steel (RDCIS) SAIL
            </span>
          </span>
        </div>
        <div>
          <div
            className={classNames(
              "bg-white bg-opacity-10 hover:bg-lightBlue hover:bg-opacity-20 px-4 cursor-pointer transition-all duration-500"
            )}
            id="sidebar-profile"
          >
            <div
              className={classNames(
                "flex items-center mt-3 rounded gap-3 h-20 overflow-hidden"
              )}
              onClick={handleLogout}
            >
              {me?.profileImage !== "" && (
                <div>
                  <NoSsr>
                    <img
                      src={
                        "https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png"
                      }
                      alt="Profile Image"
                      className="w-11 h-11 rounded-full object-cover inline-block"
                      style={{
                        width: "44px",
                        minWidth: "44px",
                        height: "44px",
                      }}
                    />
                  </NoSsr>
                </div>
              )}

              <div
                className={`h-12 overflow-hidden`}
                style={{ minWidth: "150px" }}
              >
                <NoSsr>
                  <p className="text-white font-semibold">{me?.name}</p>
                </NoSsr>
                <NoSsr>
                  <p className="text-white text-opacity-50">
                    {me?.email?.slice(0, 17)}...
                  </p>
                </NoSsr>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={logoutDialogOpen}
          onClose={handleCloseLogoutDialog}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="primary">
              <LogoutIcon /> Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AppContextProvider>
  )
}

export default Sidebar
