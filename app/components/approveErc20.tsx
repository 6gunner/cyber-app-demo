import { CyberWallet, EventError, ErrorType } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ethers } from "ethers";
import type { Hex } from "viem";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// abis
import { ERC20 } from "@/abi/erc20";
import erc20ABI from "@/abi/ERC20.json";

import type { Chain } from "viem";

type CyberAccount = CyberWallet["cyberAccount"];
type TransferCardProp = {
  cyberWallet?: CyberWallet;
  cyberAccount?: CyberAccount;
  network: Chain;
};

export const useCheckAllowance = () => {
  return React.useCallback(
    async (
      contractAddress: string,
      owner: string,
      spender: string,
      network: Chain
    ) => {
      const rpc = network.rpcUrls.default.http[0];
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const erc20Contract = new ethers.Contract(
        contractAddress,
        erc20ABI,
        provider
      ) as ERC20;
      return erc20Contract.allowance(owner, spender);
    },
    []
  );
};

function TransferCard(props: TransferCardProp) {
  const { network, cyberAccount, cyberWallet } = props;

  const { register, handleSubmit } = useForm<any>();
  const checkAllownace = useCheckAllowance();
  const [checking, setChecking] = React.useState(false);
  const [sendingViaCyberWallet, setSendingViaCyberWallet] =
    React.useState(false);

  const [approved, setAppvoved] = React.useState<
    "not-approved" | "approved" | "failed"
  >("not-approved");
  // 发生原生token

  const setApproveViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet || !cyberAccount) {
      return false;
    }
    const { to, amount } = data;
    const spender = to;
    const contractAddress = "0x479634564EF8c5C2412047EB8F1165e472c878C7";
    const contractIterface = new ethers.utils.Interface(erc20ABI);
    // 授权此账户
    const approveEncoded = contractIterface.encodeFunctionData("approve", [
      spender,
      ethers.utils.parseUnits(amount, 18),
    ]) as Hex;
    await cyberWallet["lineaTestnet"]
      .sendTransaction({
        to: contractAddress,
        value: "0",
        data: approveEncoded,
      })
      .catch((err: EventError) => {
        if (err.name === ErrorType.SendTransactionError) {
          console.log(err.shortMessage); // Transaction failed
        }
      });
    setSendingViaCyberWallet(false);
  };

  const checkApproveViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet || !cyberAccount) {
      return false;
    }
    setChecking(true);
    const { to, amount } = data;
    const owner = cyberAccount.address;
    const spender = to;
    const contractAddress = "0x479634564EF8c5C2412047EB8F1165e472c878C7";
    const allowance = await checkAllownace(
      contractAddress,
      owner,
      spender,
      network
    );
    console.log(
      "allowance",
      allowance,
      ethers.utils.formatUnits(allowance, 18)
    );
    const amountInWei = ethers.utils.parseUnits(amount, 18);
    if (allowance.gte(amountInWei)) {
      console.log("approved already");
      setAppvoved("approved");
    } else {
      setAppvoved("not-approved");
    }
    setChecking(false);
  };

  return (
    <Card className="h-fit" style={{ width: 500 }}>
      <CardHeader>
        <CardTitle>Approve & Fetch State</CardTitle>
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
                Approved
              </label>
              <p>{approved}</p>
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
              onClick={handleSubmit(checkApproveViaCyberWallet)}
            >
              {checking ? "Checking..." : "Check Approve Status"}
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(setApproveViaCyberWallet)}
            >
              {sendingViaCyberWallet ? "Sending..." : "Send Via CyberWallet"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default TransferCard;
