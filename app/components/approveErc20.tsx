import { CyberWallet, EventError, ErrorType } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ethers } from "ethers";
import {
  linea,
  lineaTestnet,
  optimism,
  opBNB,
  bsc,
  opBNBTestnet,
  bscTestnet,
} from "viem/chains";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "../page";
// abis
import { ERC20 } from "@/abi/erc20";
import erc20ABI from "@/abi/ERC20.json";
// type
import type { Hex, Chain } from "viem";
import type { ContextType } from "../page";

type CyberAccount = CyberWallet["cyberAccount"];
type TransferCardProp = {
  cyberWallet?: CyberWallet;
  cyberAccount?: CyberAccount;
  network: Chain;
};

export type BaseChainIds = number;

interface ChainConfigDataItem {
  erc20Token: {
    contractAddress: Hex;
    name: string;
  };
}
type ChainConfig = {
  [k in BaseChainIds]: ChainConfigDataItem;
};

const chainConfigs: ChainConfig = {
  [lineaTestnet.id]: {
    erc20Token: {
      contractAddress: "0x479634564EF8c5C2412047EB8F1165e472c878C7",
      name: "aa-test",
    },
  },
  [linea.id]: {
    erc20Token: {
      contractAddress: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
      name: "usdt",
    },
  },
  [opBNB.id]: {
    erc20Token: {
      contractAddress: "0x55d398326f99059fF775485246999027B3197955",
      name: "usdt",
    },
  },
  [opBNBTestnet.id]: {
    erc20Token: {
      contractAddress: "0xCF712f20c85421d00EAa1B6F6545AaEEb4492B75",
      name: "usdt",
    },
  },
} as const satisfies ChainConfig;

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

function TransferCard() {
  const contextVal = React.useContext<ContextType>(GlobalContext);
  const { network, cyberAccount, app, provider } = contextVal;

  const { register, handleSubmit } = useForm<any>();
  const checkAllownace = useCheckAllowance();
  const [checking, setChecking] = React.useState(false);
  const [sendingViaCyberWallet, setSendingViaCyberWallet] =
    React.useState(false);

  const [approved, setAppvoved] = React.useState<
    "not-approved" | "approved" | "failed"
  >("not-approved");
  // 发生原生token

  if (!network) {
    return;
  }
  const chainConfig = chainConfigs[network.id];

  const setApproveViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!cyberAccount) {
      return false;
    }
    const { to, amount } = data;
    const spender = to;
    const contractIterface = new ethers.utils.Interface(erc20ABI);
    // 授权此账户
    const approveEncoded = contractIterface.encodeFunctionData("approve", [
      spender,
      ethers.utils.parseUnits(amount, 18),
    ]) as Hex;

    await app?.cyberWallet
      .sendTransaction({
        to: chainConfig.erc20Token.contractAddress,
        value: "0",
        data: approveEncoded,
        ctx: {
          chainId: network.id, // 当前网络的id，我尝试过BNB，opBNB，opBNBTest, BNBTest各个网络的id，都无法成功；
          owner: app.cyberWallet.cyberAccount?.ownerAddress as Hex,
          appId: app.appId,
        },
      })
      .catch((err: EventError) => {
        if (err.name === ErrorType.SendTransactionError) {
          console.log(err.shortMessage); // Transaction failed
        }
      });
    setSendingViaCyberWallet(false);
  };

  const checkApproveViaCyberWallet: SubmitHandler<any> = async (data) => {
    if (!app || !app.cyberWallet || !cyberAccount) {
      return false;
    }
    setChecking(true);
    const { to, amount } = data;
    const owner = cyberAccount.address;
    const spender = to;
    const allowance = await checkAllownace(
      chainConfig.erc20Token.contractAddress,
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
              <p>{chainConfig.erc20Token.name}</p>
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
