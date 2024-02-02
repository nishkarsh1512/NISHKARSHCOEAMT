import type { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import { AppContextProvider } from "../context/contextProvider"
import { NotificationsProvider } from "@mantine/notifications"
import "../styles/globals.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient()

  return (
    // @ts-ignore
    <AppContextProvider>
      {/* @ts-ignore */}
      <NotificationsProvider>
        {/* @ts-ignore */}
        <QueryClientProvider client={client}>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </QueryClientProvider>
      </NotificationsProvider>
    </AppContextProvider>
  )
}

export default MyApp
