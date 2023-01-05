import React, { useEffect, useState } from "react"
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
import { DialogContent, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import styles from "../styles"
import { coinbase, walletconnect, metamask } from "../assets"
import { styled } from "@mui/material/styles"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))
const WalletButton = () => {
  const [rendered, setRendered] = useState("")
  const [open, setOpen] = useState(false)

  const { ens } = useLookupAddress()
  const { account, activateBrowserWallet, activate, deactivate } = useEthers()
  const isConnected = account !== undefined
  const handleOpenClick = () => {
    if (!account) {
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: "a22b6958cc5449a6a5bc6dc4e2c26a7a",
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }
  async function onCoinbaseConnect() {
    try {
      const provider = new WalletLinkConnector({
        url: `https://mainnet.infura.io/v3/a22b6958cc5449a6a5bc6dc4e2c26a7a`,
        appName: "DevApes Demo",

        supportedChainIds: [1, 3, 4, 5, 42],
      })
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (ens) {
      setRendered(ens)
    } else if (account) {
      setRendered(shortenAddress(account))
      setOpen(false)
    } else {
      setRendered("")
    }
  }, [account, ens, setRendered])

  return (
    <>
      <button
        onClick={isConnected ? deactivate : handleOpenClick}
        className={styles.walletButton}
      >
        {rendered === "" && "Connect Wallet"}
        {rendered !== "" && rendered}
      </button>
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        sx={{ zIndex: 10000 }}
      >
        <DialogContent dividers>
          <h1>Connect your wallet</h1>
          <IconButton
            aria-label='close'
            onClick={() => handleClose()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
        <DialogContent dividers>
          <div>
            <button
              onClick={activateBrowserWallet}
              style={{
                border: "none",
                width: "100%",
                display: "flex",
                flexDirection: "flex-start",
                alignItems: "center",
                background: "none",
              }}
            >
              <img
                src={metamask}
                alt='metamask'
                style={{
                  height: "50px",
                  width: "50px",
                  marginRight: "5%",
                }}
              />
              METAMASK
            </button>
          </div>
        </DialogContent>
        <DialogContent dividers>
          <div>
            <button
              onClick={onCoinbaseConnect}
              style={{
                border: "none",
                width: "100%",
                display: "flex",
                flexDirection: "flex-start",
                alignItems: "center",
                background: "none",
              }}
            >
              <img
                src={coinbase}
                alt='walletconnect'
                style={{
                  height: "50px",
                  width: "50px",
                  marginRight: "5%",
                }}
              />
              COINBASE WALLET
            </button>
          </div>
        </DialogContent>
        <DialogContent dividers>
          <div>
            <button
              onClick={onConnect}
              style={{
                border: "none",
                width: "100%",
                display: "flex",
                flexDirection: "flex-start",
                alignItems: "center",
                background: "none",
              }}
            >
              <img
                src={walletconnect}
                alt='walletconnect'
                style={{
                  height: "50px",
                  width: "50px",
                  marginRight: "5%",
                }}
              />
              WALLET CONNECT
            </button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export default WalletButton
