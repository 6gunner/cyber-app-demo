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
import { TokenBridge } from "@/abi/bridge";
import TokenBridgeABI from "@/abi/TokenBridge.json";
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
    routerContractAddress: string;
    poolAddress: string;
    lazyerZeroChainId: number;
  };
} & {
  tokenName: string;
  tokenAddress: Hex;
  decimal: number;
  poolId: number;
};

export const zkbridgeConfig: ZKbridgeConfig = {
  tokenName: "cyber",
  tokenAddress: "0x14778860e937f509e651192a90589de711fb88a9",
  decimal: 18,
  poolId: 1,
  [optimism.id]: {
    routerContractAddress: "0xbd0b158714871B2c55DA5B09FFE94661c88e64A1",
    poolAddress: "0x03F06D95153aa1Aee59d8Cf685042C390EC5bb69",
    lazyerZeroChainId: 111,
  },
  [bsc.id]: {
    routerContractAddress: "0xbA4C2B9fd6741f83d1FcCe9d7dc138Ce607528b5",
    poolAddress: "0x03F06D95153aa1Aee59d8Cf685042C390EC5bb69",
    lazyerZeroChainId: 102,
  },
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

function ZkBridgeCard(props: ZkBridgeCardProps) {
  const { targetNetwork, sourceNetwork, cyberAccount, cyberWallet } = props;

  const { register, handleSubmit } = useForm<any>();
  const checkAllownace = useCheckAllowance();
  const [checking, setChecking] = React.useState(false);
  const [sendingViaCyberWallet, setSendingViaCyberWallet] =
    React.useState(false);

  const [approved, setAppvoved] = React.useState<
    "not-approved" | "approved" | "failed"
  >("not-approved");

  // 授权
  const approveViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet || !cyberAccount) {
      return false;
    }
    const { amount } = data;
    const spender = zkbridgeConfig[sourceNetwork.id].routerContractAddress;
    const contractAddress = zkbridgeConfig.tokenAddress;
    const contractIterface = new ethers.utils.Interface(erc20ABI);
    // 授权此账户
    const approveEncoded = contractIterface.encodeFunctionData("approve", [
      spender,
      ethers.utils.parseUnits(amount, 18),
    ]) as Hex;
    await cyberWallet["optimism"]
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

  const transferViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet || !cyberAccount) {
      return false;
    }
    let { to, amount } = data;
    amount = ethers.utils.parseUnits(amount, zkbridgeConfig.decimal);
    const rpc = sourceNetwork.rpcUrls.default.http[0];
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const routerContractAddress =
      zkbridgeConfig[sourceNetwork.id].routerContractAddress;
    const contract = new ethers.Contract(
      routerContractAddress,
      TokenBridgeABI,
      provider
    );
    const dstAppId = zkbridgeConfig[targetNetwork.id].lazyerZeroChainId;
    const srcPoolId = zkbridgeConfig.poolId;
    const dstPoolId = zkbridgeConfig.poolId;
    const adapterParams = ethers.utils.solidityPack(
      ["uint16", "uint256"],
      [1, 200000]
    );
    const transferFee = await contract.estimateFee(
      dstAppId,
      srcPoolId,
      dstPoolId,
      amount,
      to,
      adapterParams
    );
    console.log(`transferFee = ${ethers.utils.formatEther(transferFee)}`);
    const contractAddress = zkbridgeConfig.tokenAddress;
    const contractIterface = new ethers.utils.Interface(TokenBridgeABI);
    // transferToken
    const approveEncoded = contractIterface.encodeFunctionData(
      "transferToken",
      [
        dstAppId, //dstChainId
        srcPoolId, //srcPoolId
        dstPoolId, //dstPoolId
        amount, //amount_
        to, //recipient_
        adapterParams,
      ]
    ) as Hex;
    await cyberWallet["optimism"]
      .sendTransaction({
        to: contractAddress,
        value: transferFee,
        data: approveEncoded,
      })
      .catch((err: EventError) => {
        if (err.name === ErrorType.SendTransactionError) {
          console.log(err.shortMessage); // Transaction failed
        }
      });
    setSendingViaCyberWallet(false);
  };

  // 检查是否已授权
  const checkApproveViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberWallet || !cyberAccount) {
      return false;
    }
    setChecking(true);
    const { amount } = data;
    const owner = cyberAccount.address;
    const spender = zkbridgeConfig[sourceNetwork.id].routerContractAddress;
    const contractAddress = zkbridgeConfig.tokenAddress;
    const allowance = await checkAllownace(
      contractAddress,
      owner,
      spender,
      sourceNetwork
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
              <p>{zkbridgeConfig.tokenName}</p>
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
            {approved != "approved" ? (
              <Button
                type="submit"
                onClick={handleSubmit(approveViaCyberWallet)}
              >
                Approve
              </Button>
            ) : (
              ""
            )}
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
