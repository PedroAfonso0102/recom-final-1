import { HeaderInstitucional } from "./HeaderInstitucional";
import { MainNavigation } from "./MainNavigation";
import { getSiteSettings } from "@/cms/queries";
import { siteConfig } from "@/lib/config";

export async function Header() {
  const settings = await getSiteSettings();
  const config = settings || siteConfig;

  return (
    <header data-hook="public.global.header" className="w-full flex flex-col">
      <HeaderInstitucional />
      <MainNavigation settings={config} />
    </header>
  );
}
