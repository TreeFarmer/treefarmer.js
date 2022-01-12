import { Snowflake } from 'discord-api-types';

export interface ClientOptions {
  /**
   * Whether or not to include the full HTTP response from the API
   */
  readonly fullResponse: boolean
}

type BaseResponse = {
  /**
   * Whether or not the request was a success
   */
  readonly error: boolean,

  /**
   * An understandable response message
   */
  readonly message: string,

  /**
   * The data being fetched
   */
  readonly data: CutterData | FarmData | PlotData | TreeData | FarmStorageData | UserData | VehicleData
}

export interface CutterResponse extends BaseResponse {
  readonly data: CutterData
}

export interface FarmResponse extends BaseResponse {
  readonly data: FarmData
}

export interface PlotResponse extends BaseResponse {
  readonly data: PlotData
}

export interface TreeResponse extends BaseResponse {
  readonly data: TreeData
}

export interface StorageResponse extends BaseResponse {
  readonly data: FarmStorageData
}

export interface VehicleResponse extends BaseResponse {
  readonly data: VehicleData
}

export interface UserResponse extends BaseResponse {
  readonly data: UserData
}

export type CutterData = {
  readonly cooldown: number,
  readonly cost: number,
  readonly efficiency: number[],
  readonly level: number,
  readonly name: string
}

export type FarmData = {
  readonly name: string
  readonly saplings: number
  readonly tree: TreeData
  readonly cutters: number
  readonly plots: number
  readonly storages: number
  readonly vehicles: number
}

export type PlotData = {
  readonly cost: number,
  readonly level: number,
  readonly growthSpeed: number
}

export type FarmStorageData = {
  readonly capacity: number
  readonly cost: number
  readonly level: number
  readonly name: string
}

export type UserData = {
  readonly id: Snowflake
  readonly createdAt: number
  readonly banned: boolean
  readonly goldenTrees: number
  readonly language: string
  readonly money: number
}

export type VehicleData = {
  readonly capacity: number
  readonly cooldown: number
  readonly cost: number
  readonly level: number
  readonly name: string
}

export type TreeData = {
  readonly level: number;
  readonly cost: number;
  readonly name: string;
  readonly funFact: string;
  readonly plantingRegion: string;
  readonly growthTime: number;
  readonly logCount: number;
  readonly logValue: number;
  readonly saplingCost: number;
}