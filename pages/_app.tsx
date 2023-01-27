import type { AppProps } from 'next/app'
import React, { useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
  LedgerWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  GlowWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import '@/styles/globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new GlowWalletAdapter(),
    ],
    [network]
  )

  if (!process.env.NEXT_PUBLIC_RPC_URL) {
    throw new Error('RPC URL not found')
  }

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
