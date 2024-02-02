import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IUser } from "../types"

interface UsersState {
  users: IUser[]
  setUsers: (users: IUser[]) => void
  selectedUser?: IUser
  setSelectedUser: (selectedUser?: IUser) => void
  insertUser: (user: IUser) => void
  reset: () => void
}

const useUserStore = create<UsersState>()(
  devtools(
    (set) => ({
      users: [],
      setUsers: (users: IUser[]) => set(() => ({ users })),
      selectedUser: undefined,
      setSelectedUser: (selectedUser?: IUser) => set(() => ({ selectedUser })),
      insertUser: (user: IUser) =>
        set((state) => {
          const users = state.users
          const newUsers = [...users, user]

          return { users: newUsers }
        }),
      reset: () => set(() => ({ users: [], selectedUser: undefined })),
    }),
    {
      name: "user-storage",
    }
  )
)

export default useUserStore
