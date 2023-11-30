"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { ethers } from "ethers";
import { lineaTestnet, optimism, opBNB } from "viem/chains";
import { CyberApp, CyberWallet } from "@cyberlab/cyber-app-sdk";
import { parseUnits, type Hex, custom, createWalletClient } from "viem";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import erc20ABI from "@/abi/ERC20.json";
import TokenBridgeABI from "@/abi/TokenBridge.json";
import {
  ApproveErc20Card,
  TransferCard,
  TransferErc20Card,
} from "./components";

type CyberAccount = CyberWallet["cyberAccount"];
export default function Home() {
  const currentNetwork = lineaTestnet;
  const [app, setApp] = React.useState<CyberApp>();
  const [cyberAccount, setCyberAccount] = React.useState<CyberAccount>();
  const [connected, setConnected] = React.useState(false);
  const { register, handleSubmit } = useForm<any>();
  const [walletClient, setWalletClient] = React.useState<any>();
  const [metamaskAccount, setMetamaskAccount] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      // 通过metamask连接
      const walletClient = createWalletClient({
        chain: currentNetwork,
        transport: custom((window as any).ethereum),
      });
      const [account] = await walletClient.requestAddresses();
      setWalletClient(walletClient);
      setMetamaskAccount(account);
    })();

    const app = new CyberApp({
      name: "testapp",
      icon: "https://plus.unsplash.com/premium_photo-1676068244015-6d08a8759079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    });

    (async () => {
      try {
        const cyberAccount = await app.start();
        if (cyberAccount) {
          setCyberAccount(cyberAccount);
          setConnected(true);
        }
      } catch (err) {
        alert(err);
      }
    })();

    setApp(app);
  }, []);

  return (
    <div className="w-full h-screen text-black border bg-white flex flex-col justify-center items-center gap-8">
      <p>
        Connection: {connected ? "connected" : "disconnected"} to CyberWallet{" "}
      </p>

      <div>
        {/* <TransferCard cyberWallet={app?.cyberWallet} network={currentNetwork} />
        <TransferErc20Card
          cyberWallet={app?.cyberWallet}
          network={currentNetwork}
        /> */}
        <ApproveErc20Card
          cyberWallet={app?.cyberWallet}
          cyberAccount={cyberAccount}
          network={currentNetwork}
        />
      </div>

      <Link
        href="https://github.com/cyberconnecthq/cyber-app-demo"
        target="_blank"
      >
        <Button variant="link">GitHub</Button>
      </Link>
    </div>
  );
}
