"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import {
  linea,
  optimismGoerli,
  lineaTestnet,
  optimism,
  opBNB,
  bsc,
  opBNBTestnet,
  bscTestnet,
  mainnet,
} from "viem/chains";
import { CyberApp, CyberProvider, CyberWallet } from "@cyberlab/cyber-app-sdk";
import { parseUnits, type Hex, custom, createWalletClient } from "viem";
import type { Chain } from "viem";
import Link from "next/link";

import {
  CyberBridgeCard,
  NativeBridgeCard,
  ApproveErc20Card,
  TransferCard,
  TransferErc20Card,
} from "./components";

type CyberAccount = CyberWallet["cyberAccount"];

const chains = [linea, lineaTestnet, opBNBTestnet, opBNB];

export const GlobalContext = React.createContext<ContextType>({
  network: undefined,
  cyberAccount: undefined,
  app: undefined,
  provider: undefined,
});
export type ContextType = {
  network: Chain | undefined;
  cyberAccount: CyberAccount | undefined;
  app: CyberApp | undefined;
  provider: CyberProvider | undefined;
};

export default function Home() {
  const currentNetwork = lineaTestnet;
  const [app, setApp] = React.useState<CyberApp>();
  const [cyberAccount, setCyberAccount] = React.useState<CyberAccount>();
  const [chain, setChain] = React.useState<Chain>();
  const [provider, setProvider] = React.useState<CyberProvider>();
  const [connected, setConnected] = React.useState(false);

  const [, setWalletClient] = React.useState<any>();
  const [, setMetamaskAccount] = React.useState<string>();

  const handleSelect = (id: string) => {
    const filters = chains.filter((item) => item.id == Number(id));
    if (filters.length) {
      setChain(filters[0]);
    }
  };

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
      appId: "47f2b07a-c8f9-421c-8414-a5ab942e83af",
      name: "cyber-zkbrdige-frontend",
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

  useEffect(() => {
    if (!chain || !app) {
      return;
    }
    const provider = new CyberProvider({
      app,
      chainId: chain.id,
    });
    setProvider(provider);
  }, [app, chain]);

  return (
    <div className="w-full h-screen text-black border bg-white flex flex-col justify-center items-center gap-8">
      <h1 className="text-xl font-bold">CyberAccount Demo</h1>
      <div className="mt-8 w-[920px] flex justify-center">
        <div className="w-[200px] flex justify-center items-center">
          <Label className="font-bold  mr-2">Network</Label>
          <Select value={String(chain?.id)} onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Switch network" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={String(chain.id)}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <p>
        Connection: {connected ? "connected" : "disconnected"} to CyberWallet{" "}
      </p>
      <GlobalContext.Provider
        value={{
          app,
          network: chain,
          provider,
          cyberAccount,
        }}
      >
        <div>
          {/* <TransferCard cyberWallet={app?.cyberWallet} network={currentNetwork} />
        <TransferErc20Card
          cyberWallet={app?.cyberWallet}
          network={currentNetwork}
        /> */}
          {/* <ApproveErc20Card /> */}
          <CyberBridgeCard
            cyberWallet={app?.cyberWallet}
            cyberAccount={cyberAccount}
            sourceNetwork={optimism}
            targetNetwork={bsc}
          />
          {/* <NativeBridgeCard
          cyberWallet={app?.cyberWallet}
          cyberAccount={cyberAccount}
          sourceNetwork={opBNBTestnet}
          targetNetwork={bscTestnet}
          // sourceNetwork={optimism}
          // targetNetwork={bsc}
        ></NativeBridgeCard> */}
        </div>
      </GlobalContext.Provider>
      <Link
        href="https://github.com/cyberconnecthq/cyber-app-demo"
        target="_blank"
      >
        <Button variant="link">GitHub</Button>
      </Link>
    </div>
  );
}
