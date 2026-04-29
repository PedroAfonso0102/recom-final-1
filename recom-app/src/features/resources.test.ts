import { resources } from "./resources";

const expectedResources = ["pages", "leads", "suppliers", "promotions"];

for (const slug of expectedResources) {
  const resource = resources.find((item) => item.slug === slug);

  if (!resource) {
    throw new Error(`${slug} resource is missing.`);
  }

  if (resource.fields.length === 0) {
    throw new Error(`${slug} resource must declare fields.`);
  }

  if (!resource.audit?.events.update) {
    throw new Error(`${slug} resource must declare an update audit event.`);
  }
}
