import { Button, Menu, MenuItem } from "@mui/material"
import { memo, useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import clsx from "clsx"

interface Props {
  menuItems: {
    image?: string
    label: string
    onClick: () => void
  }[]
  position: string
}

const Index = ({ menuItems, position }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={clsx("absolute z-10", position)}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon className="text-black" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map(({ label, onClick, image }) => (
          <MenuItem
            onClick={() => {
              handleClose()
              onClick()
            }}
            className="normal-case"
            key={label}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default memo(Index)
