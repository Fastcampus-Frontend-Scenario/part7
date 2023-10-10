import '@/styles/globals.css'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider, Persister } from '@tanstack/react-query-persist-client'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'


export default function App({ Component, pageProps }: AppProps) {
  // default 
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  }))

  // 
  // For PersistCache
  if (typeof window === 'undefined') {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    )
  }
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: createSyncStoragePersister({
          storage: window.localStorage,
        })
      }}
    >
      <Component {...pageProps} />
    </PersistQueryClientProvider>
  )
}
