import { assertSectionAllowedForPage, getAllowedComponentsForPage } from "./section-governance";

const technicalPage = {
  template_key: "technical_content",
  slug: "seguranca",
};

const homePage = {
  template_key: "home",
  slug: "/",
};

if (!getAllowedComponentsForPage(homePage).includes("TrustLogos")) {
  throw new Error("Home experience must allow supplier trust logos.");
}

const allowed = assertSectionAllowedForPage({
  page: technicalPage,
  componentType: "TextSection",
});

if (!allowed.success) {
  throw new Error("Technical pages must allow text sections.");
}

const denied = assertSectionAllowedForPage({
  page: technicalPage,
  componentType: "TrustLogos",
});

if (denied.success) {
  throw new Error("Technical pages must not allow supplier logo sections by default.");
}

if (!denied.message.includes("Conteudo tecnico")) {
  throw new Error("Denied governance messages must name the page experience.");
}
