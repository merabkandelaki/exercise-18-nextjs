import Link from 'next/link';
import { usePathname } from "next/navigation";
import "./NavbarItem.css";

const NavBarItem = ({ title, href }) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link className={isActive ? "active" : ""} href={href} passHref>
      {title}
    </Link>
  );
};

export default NavBarItem;
