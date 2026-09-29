"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./layout.scss";

const EventsLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="container">
      <div className="header">
        <Link href="/memory" className={pathname === "/memory" ? "active" : ""}>
          <Image
            src="/images/memory.png"
            alt="foxy memory banner"
            width={175}
            height={50}
          />
        </Link>
        <Link href="/quiz" className={pathname === "/quiz" ? "active" : ""}>
          <Image
            src="/images/quiz.png"
            alt="foxy quiz banner"
            width={175}
            height={50}
          />
        </Link>
      </div>
      <div className="event-container">{children}</div>
    </div>
  );
};

export default EventsLayout;
