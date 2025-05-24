import logoImg from "@/assets/logo.png";
import styles from "./MainHeader.module.css";
import Image from "next/image";
import MainHeaderBg from "./MainHeaderBg";
import NavLink from "../NavLink";
import Link from "next/link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBg />
      <header className={styles.header}>
        <Link href={"/"} className={styles.logo}>
          <Image width={1024} src={logoImg} alt="Site Logo" priority />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
