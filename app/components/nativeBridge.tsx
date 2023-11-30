import { CyberWallet, EventError, ErrorType } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ethers } from "ethers";
import { optimism, bsc, opBNBTestnet, bscTestnet } from "viem/chains";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// abis
import { ERC20 } from "@/abi/erc20";
import { L1Bridge } from "@/abi/L1Bridge";
import { L2Bridge } from "@/abi/L2Bridge";
import L1BridgeABI from "@/abi/L1Bridge.json";
import L2BridgeABI from "@/abi/L2Bridge.json";
import erc20ABI from "@/abi/ERC20.json";

import type { Chain, Hex } from "viem";

type CyberAccount = CyberWallet["cyberAccount"];
type ZkBridgeCardProps = {
  cyberWallet?: CyberWallet;
  cyberAccount?: CyberAccount;
  sourceNetwork: Chain;
  targetNetwork: Chain;
};
export type BaseChainIds = 10 | 56 | number;

type ZKbridgeConfig = {
  [k in BaseChainIds]: {
    routerContractAddress: Hex;
    appId: number;
    usdt: {
      tokenName: string;
      tokenAddress: Hex;
      decimal: number;
    };
    nativeToken: {
      tokenName: string;
      decimal: number;
    };
  };
} & {};

export const zkbridgeConfig: ZKbridgeConfig = {
  [opBNBTestnet.id]: {
    routerContractAddress: "0x3292ac03B6904A55b0Ed8b1bEE86A6eCCd5F18e0",
    appId: 116,
    nativeToken: {
      tokenName: "tbnb",
      decimal: 18,
    },
    usdt: {
      tokenName: "usdt",
      tokenAddress: "0xCF712f20c85421d00EAa1B6F6545AaEEb4492B75",
      decimal: 18,
    },
  },
  [bscTestnet.id]: {
    routerContractAddress: "0x802D1000f7e4fcF5ab556210CE6628B826f5D8C1",
    appId: 103,
    usdt: {
      tokenAddress: "0xCF712f20c85421d00EAa1B6F6545AaEEb4492B75",
      tokenName: "usdt",
      decimal: 18,
    },
    nativeToken: {
      tokenName: "tbnb",
      decimal: 18,
    },
  },
};

function ZkBridgeCard(props: ZkBridgeCardProps) {
  const { targetNetwork, sourceNetwork, cyberAccount, cyberWallet } = props;

  const { register, handleSubmit } = useForm<any>();

  const [checking, setChecking] = React.useState(false);
  const [sendingViaCyberWallet, setSendingViaCyberWallet] =
    React.useState(false);

  const [approved, setAppvoved] = React.useState<
    "not-approved" | "approved" | "failed"
  >("not-approved");

  const erc20token = "usdt";
  const token = "nativeToken";

  const transferViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet || !cyberAccount) {
      return false;
    }
    let { amount } = data;
    amount = ethers.utils.parseUnits(
      amount,
      zkbridgeConfig[sourceNetwork.id][token].decimal
    );
    // const rpc = sourceNetwork.rpcUrls.default.http[0];
    const rpc =
      "https://opbnb-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3";
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const routerContractAddress =
      zkbridgeConfig[sourceNetwork.id].routerContractAddress;
    const contract = new ethers.Contract(
      routerContractAddress,
      L2BridgeABI,
      provider
    );
    const dstAppId = zkbridgeConfig[targetNetwork.id].appId;
    const transferFee = await contract.fees(targetNetwork.id);
    console.log(`transferFee = ${ethers.utils.formatEther(transferFee)}`);
    const contractAddress =
      zkbridgeConfig[sourceNetwork.id].routerContractAddress;
    const contractIterface = new ethers.utils.Interface(L2BridgeABI);
    // transferToken
    debugger;
    const calldata = contractIterface.encodeFunctionData("transferETH", [
      dstAppId, //dstAppId
      amount, //amount_
      cyberAccount.address, //recipient_
    ]) as Hex;
    // await cyberWallet
    //   .sendTransaction({
    //     to: contractAddress,
    //     value: transferFee.add(amount),
    //     data: calldata,
    //     ctx: {
    //       chainId: sourceNetwork.id,
    //       owner: cyberAccount.ownerAddress,
    //     },
    //   })
    await cyberWallet["opBnbTestnet"]
      .sendTransaction({
        to: contractAddress,
        value: transferFee.add(amount),
        data: calldata,
      })
      .catch((err: EventError) => {
        if (err.name === ErrorType.SendTransactionError) {
          console.log(err.shortMessage); // Transaction failed
        }
      });
    setSendingViaCyberWallet(false);
  };

  return (
    <Card className="h-fit" style={{ width: 600 }}>
      <CardHeader>
        <CardTitle>ZK Bridge State</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="my-4 flex flex-col gap-y-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Source Chain
              </label>
              <p>{sourceNetwork.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Target Chain
              </label>
              <p>{targetNetwork.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Token
              </label>
              <p>{"tBNB"}</p>
            </div>
          </div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <Input {...register("amount")} />
          <label className="block text-gray-700 text-sm font-bold my-2">
            Address
          </label>
          <Input value={cyberAccount?.address} readOnly />
          <div className="flex gap-x-4 mt-8">
            <Button
              type="submit"
              onClick={handleSubmit(transferViaCyberWallet)}
            >
              {sendingViaCyberWallet ? "Sending..." : "Send Via CyberWallet"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ZkBridgeCard;
