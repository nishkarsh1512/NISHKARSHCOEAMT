import { Button, Divider, IconButton, Modal } from "@mui/material"
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useModalStore } from "../../store/modal"
import useUserStore from "../../store/user"
import { useState } from "react"
import { deleteUser } from "../../api/administration"
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query"
import { IUser } from "../../types"
import { ResponseError } from "../../api/client"

const DeleteAccountModal = ({
  refetchUsers,
}: {
  refetchUsers: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IUser[], ResponseError>>
}) => {
  const { delAccModalActive, setDelAccModalActive } = useModalStore()
  const { selectedUser, setSelectedUser } = useUserStore()

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    if (selectedUser?._id) {
      setIsDeleting(true)

      const res = await deleteUser({ userId: selectedUser?._id })

      setIsDeleting(false)

      if (res) {
        refetchUsers()
      }

      setDelAccModalActive(false)
      setSelectedUser(undefined)
    }
  }

  return (
    <Modal
      open={delAccModalActive}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="bg-white w-[500px] m-auto rounded">
        <div className="p-[1rem] flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ErrorOutlineOutlinedIcon
              className="text-infoCardDarkRed"
              fontSize="large"
            />
            <span className="font-semibold">Confirm Removal</span>
          </div>
          <IconButton
            aria-label="delete"
            size="medium"
            className="p-0"
            onClick={() => {
              setDelAccModalActive(false)
              setSelectedUser(undefined)
              setIsDeleting(false)
            }}
          >
            <CloseOutlinedIcon fontSize="inherit" />
          </IconButton>
        </div>
        <Divider />
        <div className="py-[1rem] px-[1.5rem] flex items-center w-full">
          Are you sure you want to delete the account ?
        </div>
        <Divider />
        <div className="py-[1rem] px-[1.5rem] flex items-center gap-2 justify-end w-full">
          <Button
            variant="contained"
            className="bg-infoCardDarkRed hover:bg-infoCardDarkRed px-7"
            onClick={handleDeleteAccount}
            style={{ backgroundColor: "#FF0022" }}
          >
            {isDeleting ? "Deleting..." : "Yes"}
          </Button>
          <Button
            variant="outlined"
            className="text-infoCardDarkRed border-gray-300 hover:border-gray-300 px-7"
            style={{ color: "#FF0022", borderColor: "#FF0022" }}
            onClick={() => {
              setDelAccModalActive(false)
              setSelectedUser(undefined)
              setIsDeleting(false)
            }}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteAccountModal
