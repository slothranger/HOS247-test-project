import { v4 as uuid } from 'uuid';
import { Storage } from '@ionic/storage-angular';
import { Item } from "./data.service";

export class RestApi {
  public mockData: Item[] = [];

  constructor(
    private store: Storage,
  ) {
    this.init();
  }

  private async init() {
    const data = await this.store.get('HOS247'); 
    this.mockData = data ? JSON.parse(data) : [];
  }

  private saveDataToStore() {
    this.store.set('HOS247', JSON.stringify(this.mockData));
  }

  public getItems(id?: string): Promise<Item[]> {
    if (id) {
      return new Promise<Item[]>((resolve, reject) => resolve(JSON.parse(JSON.stringify(this.getItemsByParentId(id))) || []));
    } else {
      return new Promise<Item[]>((resolve, reject) => resolve(JSON.parse(JSON.stringify(this.mockData)) || []));
    }
  };

  public addItem(parentId: string | undefined, item: Item) {
    if (!item.id) {
      item.id = uuid();
    }
    if (item.isContainer) {
      item.items = [];
    }
    this.addItemToParent(parentId, item);
    this.saveDataToStore();
    return new Promise<boolean>((resolve, reject) => resolve(true));
  };

  public updateItem(newItem: Item) {
    let itemIndex = this.mockData.findIndex((item) => item.id === newItem.id);
    if (itemIndex !== -1) {
      this.mockData[itemIndex] = {...newItem, items: this.mockData[itemIndex].items};
    } else {
      const parentItem = this.findItemParent(newItem.id, this.mockData);
      const itemIndex = parentItem?.items?.findIndex((item) => item.id === newItem.id);
      if (parentItem && parentItem.items && typeof itemIndex === 'number' && itemIndex !== -1) {
        parentItem.items.splice(itemIndex, 1, {...newItem, items: parentItem.items[itemIndex].items});
      }
    }
    this.saveDataToStore();
    return new Promise<boolean>((resolve, reject) => resolve(true));
  };

  public removeItem(id: string) {
    this.removeItemById(id);
    this.saveDataToStore();
    return new Promise<boolean>((resolve, reject) => resolve(true));
  };

  private findItem = (id: string, items: Item[]): Item | null=> {
    if (!items) {
      return null;
    }
    let data: Item | null = items.find(item => item.id === id) || null;
    if (!data) {
      const children:any = items.filter(item => !!item.items).map((item) => item.items).flat();
      data = this.findItem(id, children);
    }
  
    return data;
  }
  
  private findItemParent = (id: string, items: Item[]): Item | undefined=> {
    let data: Item[] = items.filter(item => item.items?.length);
    const parent = data.find(item => item.items?.some(child => child.id === id));
    if (parent) {
      return parent;
    } else {
      const children: any = items.filter(item => !!item.items).map((item) => item.items).flat();
      return this.findItemParent(id, children);
    }
  }
  
  private getItemsByParentId = (id: string): Item[] => {
    const item = this.findItem(id, this.mockData);
    return item?.items || [];
  };
  
  private addItemToParent = (parentId: string | undefined, item:Item) => {
    if (parentId) {
      const parentItem = this.findItem(parentId, this.mockData);
      if (parentItem && parentItem.items) {
        parentItem.items = [...parentItem.items, item];
      }
    } else {
      this.mockData = [...this.mockData, item];
    }
  }
  
  private removeItemById = (id: string) => {
    const item = this.mockData.find(item => item.id === id);
    if (item) {
      this.mockData = this.mockData.filter(item => item.id !== id);
    } else {
      const parentItem = this.findItemParent(id, this.mockData);
      if (parentItem) {
        parentItem.items = parentItem.items?.filter(item => item.id !== id);
      }
    }
  }; 

};