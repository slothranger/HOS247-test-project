import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApi } from './rest.functions';

export interface Item {
  id: string;
  name: string;
  volume: number;
  isContainer?: boolean;
  items?: Item[]; 
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private restApi: any;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    this.restApi = new RestApi(this.storage);
  }

  public getItems(id?: string): Promise<Item[]> {
    // make fake rest call
    return this.restApi.getItems(id);
  }
  public addItem(parentId: string | undefined, item: Item): Promise<boolean> {
    // make fake rest call
    return this.restApi.addItem(parentId, item);
  }
  public updateItem(item: Item): Promise<boolean> {
    // make fake rest call
    return this.restApi.updateItem(item);
  }
  public removeItem(id: string): Promise<boolean> {
    // make fake rest call
    return this.restApi.removeItem(id);
  }
}
