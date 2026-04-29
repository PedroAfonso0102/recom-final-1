import { adminComponentContracts, publicComponentContracts } from "./component-contracts";

export const componentRegistry = {
  public: publicComponentContracts,
  admin: adminComponentContracts,
} as const;

export function findComponentContract(name: string) {
  return [...publicComponentContracts, ...adminComponentContracts].find((contract) => contract.name === name) ?? null;
}
