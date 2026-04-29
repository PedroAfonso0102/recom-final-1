import {
  PAGE_BLOCK_TYPES,
  PAGE_TYPES,
  getPageBlockContract,
  pageBlockContracts,
  type PageBlockContract,
  type PageBlockType,
  type PageType,
} from "./page-blocks";

const EXPECTED_BLOCK_TYPES = [
  "hero",
  "trust_proof",
  "supplier_preview",
  "supplier_grid",
  "supplier_detail_header",
  "process_preview",
  "process_grid",
  "process_detail_header",
  "promotion_preview",
  "promotion_grid",
  "editorial_text",
  "feature_list",
  "related_suppliers",
  "related_processes",
  "catalog_cta",
  "contact_cta",
  "contact_methods",
  "lead_form",
  "faq",
  "location_block",
  "not_found_recovery",
] as const satisfies readonly PageBlockType[];

const EXPECTED_PAGE_TYPES = [
  "home",
  "institutional",
  "suppliers_hub",
  "supplier_detail_template",
  "processes_hub",
  "process_detail_template",
  "promotions",
  "contact",
  "privacy",
  "not_found",
] as const satisfies readonly PageType[];

function assertContract(contract: PageBlockContract) {
  if (contract.requiredFields.length === 0) {
    throw new Error(`${contract.blockType} must declare required fields.`);
  }

  if (contract.allowedPageTypes.length === 0) {
    throw new Error(`${contract.blockType} must declare allowed page types.`);
  }
}

for (const blockType of EXPECTED_BLOCK_TYPES) {
  assertContract(pageBlockContracts[blockType]);
  assertContract(getPageBlockContract(blockType));
}

if (PAGE_BLOCK_TYPES.length !== EXPECTED_BLOCK_TYPES.length) {
  throw new Error("PAGE_BLOCK_TYPES is out of sync with the expected public showcase block types.");
}

if (PAGE_TYPES.length !== EXPECTED_PAGE_TYPES.length) {
  throw new Error("PAGE_TYPES is out of sync with the expected CMS page types.");
}
