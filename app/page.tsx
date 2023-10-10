"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CyberApp, EventError, ErrorType } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { parseUnits, type Hex, custom, createWalletClient } from "viem";
import { useForm, SubmitHandler } from "react-hook-form";
import { optimismGoerli } from "viem/chains";
import Link from "next/link";

export default function Home() {
  const [app, setApp] = React.useState<CyberApp>();
  const [res, setRes] = React.useState<string>();
  const [connected, setConnected] = React.useState(false);
  const { register, handleSubmit } = useForm<any>();
  const [walletClient, setWalletClient] = React.useState<any>();
  const [account, setAccount] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      const walletClient = createWalletClient({
        chain: optimismGoerli,
        transport: custom((window as any).ethereum),
      });

      const [account] = await walletClient.getAddresses();

      setWalletClient(walletClient);
      setAccount(account);
    })();

    const app = new CyberApp({
      name: "testapp",
      icon: "https://plus.unsplash.com/premium_photo-1676068244015-6d08a8759079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    });

    (async () => {
      try {
        const cyberAccount = await app.start();
        console.log({ cyberAccount });
        if (cyberAccount) {
          setConnected(true);
        }
      } catch (err) {
        alert(err);
      }
    })();

    setApp(app);
  }, []);

  const sendViaCyberWallet: SubmitHandler<any> = async (data) => {
    const { to, amount } = data;

    const hash = await app?.cyberWallet?.optimismGoerli
      .sendTransaction(
        {
          to: to as Hex,
          value: parseUnits(amount, 18).toString(),
          data: "0x",
        },
        { description: "Transfering native token" },
      )
      .catch((err: EventError) => {
        if (err.name === ErrorType.SendTransactionError) {
          console.log(err.shortMessage); // Transaction failed
        }
      });

    if (hash) {
      alert("Transaction sent via CyberWallet: " + hash);
    }
  };

  const sendViaMetaMask: SubmitHandler<any> = async (data) => {
    const { to, amount } = data;

    const hash = await walletClient.sendTransaction({
      account,
      to,
      value: parseUnits(amount, 18),
    });

    if (hash) {
      alert("Transaction sent via MetaMask: " + hash);
    }
  };

  return (
    <div className="w-full h-screen text-black border bg-white flex flex-col justify-center items-center gap-8">
      <p>
        Connection: {connected ? "connected" : "disconnected"} to CyberWallet{" "}
      </p>

      <form>
        <div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="my-4 flex flex-col gap-y-2">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Chain
                  </label>
                  <p>Optimism Goerli</p>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Token
                  </label>
                  <p>ETH</p>
                </div>
              </div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>
              <Input {...register("amount")} />
              <label className="block text-gray-700 text-sm font-bold my-2">
                Address
              </label>
              <Input {...register("to")} />
              <div className="flex gap-x-4 mt-8">
                <Button
                  type="submit"
                  onClick={handleSubmit(sendViaCyberWallet)}
                >
                  Send Via CyberWallet
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit(sendViaMetaMask)}
                  className="bg-orange-600"
                >
                  Send Via MetaMask
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
      <Link
        href="https://github.com/cyberconnecthq/cyber-app-demo"
        target="_blank"
      >
        <Button variant="link">GitHub</Button>
      </Link>
    </div>
  );
}
