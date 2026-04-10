import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  {
    name: "Все котики",
    href: "/",
  },
  {
    name: "Любимые котики",
    href: "/favorite-cats",
  },
];

export default function Header() {

  return (
    <header className="header-shadow min-h-16 bg-blue-vk-500">
      <nav className="mx-auto max-w-360 px-15.5 max-md:px-12 max-sm:px-4">
        <ul className="flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="h-16">
              <NavLink
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) => ( `${isActive ? "bg-blue-vk-600 text-white" : "text-white/70"} tracking-[0.25px] leading-5.25 font-normal flex h-full items-center justify-center px-5.75 max-sm:px-5 text-sm transition-colors` )}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
