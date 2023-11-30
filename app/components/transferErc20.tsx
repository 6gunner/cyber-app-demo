import { CyberWallet, EventError, ErrorType } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ethers } from "ethers";
import type { Hex } from "viem";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import erc20ABI from "@/abi/ERC20.json";

import type { Chain } from "viem";

type TransferCardProp = {
  cyberWallet?: CyberWallet;
  network: Chain;
};
function TransferErc20Card(props: TransferCardProp) {
  const { network, cyberWallet } = props;

  const { register, handleSubmit } = useForm<any>();
  const [sendingViaCyberWallet, setSendingViaCyberWallet] =
    React.useState(false);
  const [sendingViaMetaMask, setSendingViaMetaMask] = React.useState(false);
  const [tokenBalance, setTokenBalance] = React.useState("");

  // 发生erc20 token
  const transferErc20ViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet) {
      return;
    }
    setSendingViaCyberWallet(true);
    const { to, amount } = data;
    const networkName = "lineaTestnet";
    const contractIterface = new ethers.utils.Interface(erc20ABI);

    const transferEncoded = contractIterface.encodeFunctionData("transfer", [
      to,
      ethers.utils.parseUnits(amount, 18),
    ]) as Hex;
    const contractAddress = "0x479634564EF8c5C2412047EB8F1165e472c878C7";
    const hash = await cyberWallet["lineaTestnet"]
      .sendTransaction({
        to: contractAddress,
        value: "0",
        data: transferEncoded,
      })
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

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!connected) {
        return;
      }
      const account = app?.cyberWallet.cyberAccount?.address || "";
      const networkName = "lineaTestnet";
      const provider = new ethers.providers.JsonRpcProvider(
        currentNetwork.rpcUrls.default.http[0]
      );
      const contractAddress = "0x479634564EF8c5C2412047EB8F1165e472c878C7";
      const erc20Contract = new ethers.Contract(
        contractAddress,
        erc20ABI,
        provider
      ) as ERC20;
      erc20Contract.balanceOf(account).then((ret) => {
        setTokenBalance(ethers.utils.formatUnits(ret, 18));
      });
    }, 5000);
    return () => clearInterval(id);
  }, [connected]);

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
              <p>AA-Test</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Account
              </label>
              <p>{cyberWallet?.cyberAccount?.address}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Balance
              </label>
              <p>{tokenBalance}</p>
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
              onClick={handleSubmit(transferErc20ViaCyberWallet)}
            >
              {sendingViaCyberWallet ? "Sending..." : "Send Via CyberWallet"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default TransferErc20Card;
