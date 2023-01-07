import React, { useEffect, useState } from "react"
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core"
// import WalletConnectProvider from "@walletconnect/web3-provider"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
// import { coinbase, walletconnect, metamask } from "../assets"
import styles from "../styles"

const WalletButton = () => {
  const [rendered, setRendered] = useState("")

  const { ens } = useLookupAddress()
  const { account, activateBrowserWallet, deactivate } = useEthers()

  useEffect(() => {
    if (ens) {
      setRendered(ens)
    } else if (account) {
      setRendered(shortenAddress(account))
    } else {
      setRendered("")
    }
  }, [account, ens, setRendered])

  return (
    <button
      onClick={() => {
        if (!account) {
          activateBrowserWallet()
        } else {
          deactivate()
        }
      }}
      className={styles.walletButton}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </button>
  )
}

export default WalletButton
