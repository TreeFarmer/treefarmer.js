import { Snowflake } from 'discord-api-types';
import req, { HTTPMethod } from 'petitio';
import { GetCutter, GetFarm, GetPlot, GetTree, GetFarmStorage, GetVehicle, GetUser } from '../typings/index.js';

export class Client {
  public constructor(private _token: string) { }

  public async getCutter(search?: string | number) {
    const res: GetCutter = await this.request('GET', '/cutters', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return res;
  }

  public async getPlot(search?: string | number) {
    const res: GetPlot = await this.request('GET', '/plots', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return res;
  }

  public async getTree(search?: string | number) {
    const res: GetTree = await this.request('GET', '/trees', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return res;
  }

  public async getStorage(search?: string | number) {
    const res: GetFarmStorage = await this.request('GET', '/storages', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return res;
  }

  public async getVehicle(search?: string | number) {
    const res: GetVehicle = await this.request('GET', '/vehicles', null, { search: search ?? null });

    if (res.error) throw new Error(res.message);
    else return res;
  }

  public async getFarm(id: Snowflake) {
    const res: GetFarm = await this.request('GET', `/users/${id}/farm`);

    if (res.error) throw new Error(res.message);
    else return res;
  }

  public async getUser(id: Snowflake) {
    const res: GetUser = await this.request('GET', `/users/${id}`);

    if (res.error) throw new Error(res.message);
    else return res;

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