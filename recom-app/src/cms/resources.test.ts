import { getCmsFieldsForResource } from "./resources";
import { pagesResource } from "@/features/pages/pages.resource";

const fields = getCmsFieldsForResource(pagesResource);
const fieldNames = fields.map((field) => field.name);

for (const expected of ["title", "slug", "status", "seoTitle", "seoDescription"]) {
  if (!fieldNames.includes(expected)) {
    throw new Error(`Expected ${expected} to be exposed as a CMS field.`);
  }
}

const statusField = fields.find((field) => field.name === "status");

if (statusField?.type !== "select" || statusField.options?.length !== 3) {
  throw new Error("Resource select fields must map to CMS select fields with options.");
}
