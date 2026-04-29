import { slugify } from "./slugify";

const slug = slugify("Promocoes RECOM: Aco Inox 304");

if (slug !== "promocoes-recom-aco-inox-304") {
  throw new Error(`Expected normalized slug, received ${slug}`);
}
