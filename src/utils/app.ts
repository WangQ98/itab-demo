import { generateUUID } from ".";
import type { INavConfig } from "#/config";

export function createNav(name: string, icon: string): INavConfig {
  return {
    id: generateUUID(),
    name,
    icon,
    children: [],
  };
}
