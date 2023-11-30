import { CyberWallet, EventError, ErrorType } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ethers } from "ethers";
import type { Hex } from "viem";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { Chain } from "viem";

type TransferCardProp = {
  network: Chain;
  cyberWallet?: CyberWallet;
};
function TransferCard(props: TransferCardProp) {
  const { network, cyberWallet } = props;

  const { register, handleSubmit } = useForm<any>();
  const [sendingViaCyberWallet, setSendingViaCyberWallet] =
    React.useState(false);

  // 发生原生token
  const sendViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet) {
      return;
    }
    setSendingViaCyberWallet(true);
    const { to, amount } = data;
    const networkName = "lineaTestnet";
    const hash = await cyberWallet[networkName]
      .sendTransaction(
        {
          to: to as Hex,
          value: ethers.utils.parseUnits(amount, 18).toString(),
          data: "0x",
        },
        { description: "Transfering native token" }
      )
      .catch((err: EventError) => {
        if (err.name === ErrorType.SendTransactionError) {
          console.log(err.shortMessage); // Transaction failed
        }
      });

    if (hash) {
      alert("Transaction sent via CyberWallet: " + hash);
    }

    setSendingViaCyberWallet(false);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="my-4 flex flex-col gap-y-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Chain
              </label>
              <p>{network.name}</p>
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
            <Button type="submit" onClick={handleSubmit(sendViaCyberWallet)}>
              {sendingViaCyberWallet ? "Sending..." : "Send Via CyberWallet"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default TransferCard;
