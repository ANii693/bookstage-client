//@refresh
"use client";
import React, { useEffect } from "react";
import { animationCreate } from "@/utils/utils";
// import Footer from './footer/Footer';
import HeaderOne from "../layout/headers/header";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import { usePathname } from "next/navigation";
import HeaderTwo from "./headers/header-two";
import HeaderThree from "./headers/header-three";
import FooterOne from "./footers/footer";
import FooterThree from "./footers/footer-three";
import { childrenType } from "@/interFace/interFace";
import BacktoTop from "@/components/common/backToTop/BacktoTop";
import OrderTrackModal from "@/components/profile/studentProfile/OrderTrackModal";
import WhatsAppWidget from  "@/components/common/whatsapp/WhatsAppWidget";


// import HeaderTwo from './header/HeaderTwo';

const Wrapper = ({ children }: childrenType) => {
  const pathName = usePathname();
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);

  return (
    <>
      <BacktoTop />
      < WhatsAppWidget/>
      {(() => {
        switch (pathName) {
          case "/":
            return <HeaderTwo />;//<HeaderOne />
          case "/home-two":
            return <HeaderTwo />;
          case "/home-three":
            return <HeaderThree />;
          default:
            return <HeaderThree />;
        }
      })()}
      {children}
      <OrderTrackModal />
      {(() => {
        switch (pathName) {
          case "/":
            return <FooterOne />;
          default:
            return <FooterThree />;
        }
      })()}
    </>
  );
};

export default Wrapper;
