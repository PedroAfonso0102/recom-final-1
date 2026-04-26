import { HeaderInstitucional } from "./HeaderInstitucional";
import { MainNavigation } from "./MainNavigation";

export function Header() {
  return (
    <header className="w-full flex flex-col">
      <HeaderInstitucional />
      <MainNavigation />
    </header>
  );
}

