
import { updateSiteSettings } from "./src/cms/actions";

async function test() {
  try {
    const result = await updateSiteSettings({
      company: {
        name: "RECOM Carbide Audit OK",
        shortName: "RECOM",
        description: "Test description",
      },
      contact: {
        email: "contato@recom.com.br",
        phone: "(11) 1234-5678",
        address: "Test Address",
      },
      social: {
        instagram: "",
        linkedin: "",
        youtube: "",
      },
      seo: {
        title: "RECOM",
        description: "Test SEO",
        keywords: "test",
      }
    });
    console.log("Result:", result);
  } catch (error) {
    console.error("Caught error:", error);
  }
}

test();
