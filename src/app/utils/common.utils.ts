import { Item } from "../services/data.service";

export const calcVolume = (items: Item[]): number => {
  let vol = 0;
  items.forEach((item) => {
    vol = vol + (item.isContainer ? calcVolume(item.items!) : item.volume);
  });
  return vol;
}

export const getFreeVolume = (parentVolume: number, items: Item[]): number => {
  let volume = calcVolume(items);

  return parentVolume - volume;
}