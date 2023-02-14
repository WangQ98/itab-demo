import { generateUid } from ".";
import type { INavConfig } from "#/config";

export function createNav(name: string, icon: string): INavConfig {
  return {
    id: generateUid(),
    name,
    icon,
    children: [],
  };
}
