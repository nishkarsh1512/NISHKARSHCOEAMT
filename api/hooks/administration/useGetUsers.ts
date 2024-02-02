import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ResponseError } from "../../client"
import { getUsers } from "../../administration"
import { IUser } from "../../../types"
import useUserStore from "../../../store/user"

const useGetUsers = (): UseQueryResult<Array<IUser>, ResponseError> => {
  const { setUsers } = useUserStore()

  const users = useQuery<Array<IUser>, ResponseError>(
    ["getUsers"],
    () => getUsers({ setUsers }),
    {
      refetchInterval: 15000,
      staleTime: 300000,
    }
  )

  return users
}

export default useGetUsers
