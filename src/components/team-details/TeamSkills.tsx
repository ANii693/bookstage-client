import React from "react";
import thumb from "../../../public/assets/img/team/details/team-details-02.jpg";
import Image from "next/image";
import { TeamMember } from "@/interFace/api-interFace";
interface itemType {
  item: TeamMember;
}
const TeamSkills = ({ item }: itemType) => {
  return (
    <section>
      <div className="bd-skill__area pt-70">
        <div className="container small-container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="bd-skill__progress-box mb-60">
                <div className="bd-skill__title mb-40">
                  <h3>Personal Skills</h3>
                </div>

                <div className="bd-skill__style-inner">
                  {item?.skills.length ? (
                    <>
                      {item?.skills?.map((itm) => (
                        <div
                          key={itm._id}
                          className="bd-skill__progress p-relative mb-40 fix"
                        >
                          <div className="bd-skill__title-wrapper">
                            <h3 className="bd-skill__title"> {itm?.skillName} </h3>
                          </div>
                          <span className="progress-count">{itm?.precent}%</span>
                          <div className="progress">
                            <div
                              className="progress-bar wow slideInLeft"
                              style={{ width: `${itm?.precent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="bd-skill__img-inner w-img mb-60">
                <Image
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                  src={item?.imgTwo}
                  alt="skill-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSkills;
