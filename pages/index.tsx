import Navbar from "../components/Navbar/Navbar"
import Header from "../containers/Header/Header"
import LoginModal from "../components/Core/Modal/LoginModal"
import Footer1 from "../containers/Footer1/Footer1"
import DrawerRight from "../components/Navbar/DrawerRight"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useAuthStore from "../store/auth"
import LoadingScreen from "../components/Core/LoadingScreen"
import { NoSsr } from "@mui/material"

const Home = () => {
  const router = useRouter()
  const { me } = useAuthStore()

  useEffect(() => {
    if (!!me) {
      router.push("/monitoring")
    }
  }, [me])

  return (
    <>
      <NoSsr>
        {!me ? (
          <>
            <DrawerRight />
            <LoginModal />
            <Navbar />
            <Header />
            <Footer1 />
          </>
        ) : (
          <LoadingScreen />
        )}
      </NoSsr>
    </>
  )
}

export default Home
