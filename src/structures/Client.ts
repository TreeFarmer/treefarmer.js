import { Snowflake } from 'discord-api-types';
import req, { HTTPMethod } from 'petitio';
import { ClientOptions, CutterData, CutterResponse, FarmResponse, PlotResponse, TreeResponse, StorageResponse, VehicleResponse, UserResponse, FarmData, PlotData, StorageData, TreeData, UserData, VehicleData } from '../typings/index.js';

export class Client {
  private readonly _fullResponse: boolean;

  /**
   * Create a new API client
   * @param {string} _token Your API Token
   * @param {ClientOptions} options Options for the client
   */
  public constructor(private _token: string, options?: ClientOptions) {
    this._fullResponse = options?.fullResponse ?? false;
  }

  /**
   * Get a cutter or all cutters
   * @param {string | number | undefined} search 
   * @returns {Promise<CutterResponse | CutterData | Error>}
   */
  public async getCutter(search?: string | number): Promise<CutterResponse | CutterData | Error> {
    const res: CutterResponse = await this.request('GET', '/cutters', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;
  }

  /**
   * Get a plot or all plots
   * @param {string | number | undefined} search
   * @returns {Promise<PlotResponse | PlotData | Error>}
   */
  public async getPlot(search?: string | number): Promise<PlotResponse | PlotData | Error> {
    const res: PlotResponse = await this.request('GET', '/plots', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;
  }

  /**
   * Get a tree or all trees
   * @param {string | number | undefined} search
   * @returns {Promise<TreeResponse | TreeData | Error>}
   */
  public async getTree(search?: string | number): Promise<TreeResponse | TreeData | Error> {
    const res: TreeResponse = await this.request('GET', '/trees', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;
  }

  /**
   * Get a storage or all storages
   * @param {string | number | undefined} search
   * @returns {Promise<StorageResponse | StorageData | Error>}
   */
  public async getStorage(search?: string | number): Promise<StorageResponse | StorageData | Error> {
    const res: StorageResponse = await this.request('GET', '/storages', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;
  }

  /**
   * Get a vehicle or all vehicles
   * @param {string | number | undefined} search
   * @returns {Promise<VehicleResponse | VehicleData | Error>}
   */
  public async getVehicle(search?: string | number): Promise<VehicleResponse | VehicleData | Error> {
    const res: VehicleResponse = await this.request('GET', '/vehicles', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;
  }

  /**
   * Get a user's farm
   * @param {Snowflake} id
   * @returns {Promise<FarmResponse | FarmData | Error>}
   */
  public async getFarm(id: Snowflake): Promise<FarmResponse | FarmData | Error> {
    const res: FarmResponse = await this.request('GET', `/users/${id}/farm`);

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;
  }

  /**
   * Get a user's data
   * @param {Snowflake} id
   * @returns {Promise<UserResponse | UserData | Error>}
   */
  public async getUser(id: Snowflake): Promise<UserResponse | UserData | Error> {
    const res: UserResponse = await this.request('GET', `/users/${id}`);

    if (res.error) throw new Error(res.message);
    else return this._fullResponse ? res : res.data;

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async request(method: HTTPMethod, path: string, params: any = {}, query: any = {}): Promise<any> {
    const init = req('https://api.treefarmer.xyz', method).path(path).header('Authorization', this._token).body(params);
    for (const [k, v] of Object.entries(query)) init.query(k, v);
    const res = await init.send().catch(e => {
      throw new Error(e);
    });

    return res.json();
  }
}