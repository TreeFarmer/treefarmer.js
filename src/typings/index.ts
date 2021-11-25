import { Snowflake } from 'discord-api-types';

type BaseGet = {
  readonly error: boolean,
  readonly message: string,
  readonly data: Record<string, unknown>
}

export interface GetCutter extends BaseGet {
  readonly data: {
    readonly cooldown: number,
    readonly cost: number,
    readonly efficiency: number[],
    readonly level: number,
    readonly name: string
  }
}

export interface GetFarm extends BaseGet {
  readonly data: {
    readonly name: string,
    readonly saplings: number,
    readonly tree: Tree,
    readonly cutters: number,
    readonly plots: number,
    readonly storages: number,
    readonly vehicles: number
  }
}

export interface GetPlot extends BaseGet {
  readonly data: {
    readonly cost: number,
    readonly level: number,
    readonly growthSpeed: number
  }
}

export interface GetTree extends BaseGet {
  readonly data: Tree
}

export interface GetFarmStorage extends BaseGet {
  readonly data: {
    readonly capacity: number
    readonly cost: number
    readonly level: number
    readonly name: string
  }
}

export interface GetVehicle extends BaseGet {
  readonly data: {
    readonly capacity: number
    readonly cooldown: number
    readonly cost: number
    readonly level: number
    readonly name: string
  }
}

export interface GetUser extends BaseGet {
  readonly data: {
    readonly id: Snowflake
    readonly createdAt: number
    readonly banned: boolean
    readonly goldenTrees: number
    readonly language: string
    readonly money: number
  }
}

export type Tree = {
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