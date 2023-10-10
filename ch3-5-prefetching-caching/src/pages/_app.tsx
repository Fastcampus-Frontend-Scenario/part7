import '@/styles/globals.css'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { AppProps } from 'next/app'
import { useState } from 'react'

// Default App
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

// persist Caching
// export default function App({ Component, pageProps }: AppProps) {
//   const [queryClient] = useState(() => new QueryClient({
//     defaultOptions: {
//       queries: {
//         cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//         staleTime: 1000 * 60 * 60 * 24, // 24 hours
//       }
//     }
//   }))

//   if (typeof window === 'undefined') {
//     return (
//       <QueryClientProvider client={queryClient}>
//         <Component {...pageProps} />
//       </QueryClientProvider>
//     )
//   }

//   return (
//     <PersistQueryClientProvider
//       client={queryClient}
//       persistOptions={{
//         persister: createSyncStoragePersister({
//           storage: window.localStorage // window.sessionStorage
//         })
//       }}
//     >
//       <Hydrate state={pageProps.dehydratedState}>
//         <Component {...pageProps} />
//       </Hydrate>
//     </PersistQueryClientProvider>
//   )
// }