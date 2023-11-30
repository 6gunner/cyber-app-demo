/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface L2BridgeInterface extends utils.Interface {
  functions: {
    "activeChainIds(uint16)": FunctionFragment;
    "chainId()": FunctionFragment;
    "claimFees(address)": FunctionFragment;
    "fees(uint16)": FunctionFragment;
    "initialize(address,uint16)": FunctionFragment;
    "l2BridgeHandle()": FunctionFragment;
    "nonceContract()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setActiveChainId(uint16,bool)": FunctionFragment;
    "setBridgeHandle(address)": FunctionFragment;
    "setFee(uint16,uint256)": FunctionFragment;
    "setNonceContract(address)": FunctionFragment;
    "transferERC20(uint16,address,uint256,address)": FunctionFragment;
    "transferETH(uint16,uint256,address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "activeChainIds"
      | "chainId"
      | "claimFees"
      | "fees"
      | "initialize"
      | "l2BridgeHandle"
      | "nonceContract"
      | "owner"
      | "renounceOwnership"
      | "setActiveChainId"
      | "setBridgeHandle"
      | "setFee"
      | "setNonceContract"
      | "transferERC20"
      | "transferETH"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "activeChainIds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimFees",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "fees",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "l2BridgeHandle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nonceContract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setActiveChainId",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setBridgeHandle",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setNonceContract",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferERC20",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferETH",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "activeChainIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimFees", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fees", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "l2BridgeHandle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nonceContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setActiveChainId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBridgeHandle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setNonceContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "ClaimedFees(address,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "NewBridgeHandle(address)": EventFragment;
    "NewFees(uint16,uint256)": EventFragment;
    "NewNonceContract(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimedFees"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewBridgeHandle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewFees"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewNonceContract"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface ClaimedFeesEventObject {
  to: string;
  amount: BigNumber;
}
export type ClaimedFeesEvent = TypedEvent<
  [string, BigNumber],
  ClaimedFeesEventObject
>;

export type ClaimedFeesEventFilter = TypedEventFilter<ClaimedFeesEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface NewBridgeHandleEventObject {
  BridgeHandle: string;
}
export type NewBridgeHandleEvent = TypedEvent<
  [string],
  NewBridgeHandleEventObject
>;

export type NewBridgeHandleEventFilter = TypedEventFilter<NewBridgeHandleEvent>;

export interface NewFeesEventObject {
  chainId: number;
  fees: BigNumber;
}
export type NewFeesEvent = TypedEvent<[number, BigNumber], NewFeesEventObject>;

export type NewFeesEventFilter = TypedEventFilter<NewFeesEvent>;

export interface NewNonceContractEventObject {
  nonceContract: string;
}
export type NewNonceContractEvent = TypedEvent<
  [string],
  NewNonceContractEventObject
>;

export type NewNonceContractEventFilter =
  TypedEventFilter<NewNonceContractEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface L2Bridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: L2BridgeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    activeChainIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    chainId(overrides?: CallOverrides): Promise<[number]>;

    claimFees(
      to_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      nonceContract_: PromiseOrValue<string>,
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    l2BridgeHandle(overrides?: CallOverrides): Promise<[string]>;

    nonceContract(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setActiveChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      isActived: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setBridgeHandle(
      l2BridgeHandle_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFee(
      chainId_: PromiseOrValue<BigNumberish>,
      fee_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setNonceContract(
      nonceContract_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferERC20(
      dstChainId_: PromiseOrValue<BigNumberish>,
      l2token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferETH(
      dstChainId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  activeChainIds(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  chainId(overrides?: CallOverrides): Promise<number>;

  claimFees(
    to_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fees(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    nonceContract_: PromiseOrValue<string>,
    chainId_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  l2BridgeHandle(overrides?: CallOverrides): Promise<string>;

  nonceContract(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setActiveChainId(
    chainId_: PromiseOrValue<BigNumberish>,
    isActived: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setBridgeHandle(
    l2BridgeHandle_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFee(
    chainId_: PromiseOrValue<BigNumberish>,
    fee_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setNonceContract(
    nonceContract_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferERC20(
    dstChainId_: PromiseOrValue<BigNumberish>,
    l2token_: PromiseOrValue<string>,
    amount_: PromiseOrValue<BigNumberish>,
    recipient_: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferETH(
    dstChainId_: PromiseOrValue<BigNumberish>,
    amount_: PromiseOrValue<BigNumberish>,
    recipient_: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    activeChainIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    chainId(overrides?: CallOverrides): Promise<number>;

    claimFees(
      to_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    fees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      nonceContract_: PromiseOrValue<string>,
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    l2BridgeHandle(overrides?: CallOverrides): Promise<string>;

    nonceContract(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setActiveChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      isActived: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setBridgeHandle(
      l2BridgeHandle_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFee(
      chainId_: PromiseOrValue<BigNumberish>,
      fee_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setNonceContract(
      nonceContract_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferERC20(
      dstChainId_: PromiseOrValue<BigNumberish>,
      l2token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferETH(
      dstChainId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ClaimedFees(address,uint256)"(
      to?: null,
      amount?: null
    ): ClaimedFeesEventFilter;
    ClaimedFees(to?: null, amount?: null): ClaimedFeesEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "NewBridgeHandle(address)"(BridgeHandle?: null): NewBridgeHandleEventFilter;
    NewBridgeHandle(BridgeHandle?: null): NewBridgeHandleEventFilter;

    "NewFees(uint16,uint256)"(chainId?: null, fees?: null): NewFeesEventFilter;
    NewFees(chainId?: null, fees?: null): NewFeesEventFilter;

    "NewNonceContract(address)"(
      nonceContract?: null
    ): NewNonceContractEventFilter;
    NewNonceContract(nonceContract?: null): NewNonceContractEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    activeChainIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    chainId(overrides?: CallOverrides): Promise<BigNumber>;

    claimFees(
      to_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      nonceContract_: PromiseOrValue<string>,
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    l2BridgeHandle(overrides?: CallOverrides): Promise<BigNumber>;

    nonceContract(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setActiveChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      isActived: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setBridgeHandle(
      l2BridgeHandle_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFee(
      chainId_: PromiseOrValue<BigNumberish>,
      fee_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setNonceContract(
      nonceContract_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferERC20(
      dstChainId_: PromiseOrValue<BigNumberish>,
      l2token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferETH(
      dstChainId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    activeChainIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimFees(
      to_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      nonceContract_: PromiseOrValue<string>,
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    l2BridgeHandle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonceContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setActiveChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      isActived: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setBridgeHandle(
      l2BridgeHandle_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      chainId_: PromiseOrValue<BigNumberish>,
      fee_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setNonceContract(
      nonceContract_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferERC20(
      dstChainId_: PromiseOrValue<BigNumberish>,
      l2token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferETH(
      dstChainId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      recipient_: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
