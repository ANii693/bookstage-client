import React from "react";
import thumbOne from "../../../public/assets/img/team/details/team-details-03.jpg";
import thumbTwo from "../../../public/assets/img/team/archivement/1.jpg";
import thumbThree from "../../../public/assets/img/team/archivement/2.jpg";
import thumbFour from "../../../public/assets/img/team/archivement/3.jpg";
import Image from "next/image";
import { TeamMember } from "@/interFace/api-interFace";

interface itemType {
  item: TeamMember;
}

const TeamAbout = ({item}:itemType) => {
  return (
    <section className="bd-about__video__area pt-70 pb-70">
      <div className="container small-container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="bd-archivement-wrapper mb-60">
              <div className="bd-archivement__image w-img">
                <Image
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                  src={item?.imgThree}
                  alt="archivement-img"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="bd-archivement-box mb-60">
              <div className="bd-acivement__title">
                <h3>Great Archivements</h3>
                <p>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehen derit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div className="bd-archivement__img-item">
                <div className="bd-acivement__single-img">
                  <Image
                    width={500}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                    src={thumbTwo}
                    alt="archivement.png"
                  />
                </div>
                <div className="bd-archivement__single-img">
                  <Image
                    width={500}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                    src={thumbThree}
                    alt="archivement.png"
                  />
                </div>
                <div className="bd-archivement__single-img">
                  <Image
                    width={500}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                    src={thumbFour}
                    alt="archivement.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamAbout;
