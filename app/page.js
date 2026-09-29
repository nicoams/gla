import Image from "next/image";
import styles from "./page.module.css";
import Personagens from "@/components/perso/Personagens";

export default function Home() {
  return (
    <div className="app-container">
      <Personagens />
    </div>
  );
}
