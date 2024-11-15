"use client"
import Image from "next/image";
import Link from "next/link";
import React,{useEffect} from "react";
import TeamSkills from "./TeamSkills";
import TeamAbout from "./TeamAbout";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import { TeamMember, dynamicIdType } from "@/interFace/api-interFace";
const TeamDetailsMain = ({ id }: dynamicIdType) => {
  const {teamList, setTeamList} = useGlobalContext()
    useEffect(() => {
         if(id){
            axios
          .get(`${process.env.BASE_URL}team/single-member/${id}`)
          .then((res) => {
         
            setTeamList(res.data.data);
          })
          .catch((e) => console.log(e));
         }
      }, [id,setTeamList]);

      const item:TeamMember = teamList[0]

  return (
    <>
      <section className="bd-trem__memder pt-115">
        <div className="container small-container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="member-details-thumb w-img mb-60">
                <Image
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                  src={item?.img}
                  alt="team-thumb"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bd-team__member-info mb-60">
                <span>{item?.subTitle}</span>
                <h3>{item?.title}</h3>
                <p className="mb-40">
                 {item?.aboutMe}
                </p>
                <div className="bd-team__member-details mb-40">
                  <div className="info-meta-single">
                    <div className="info-meta-icon">
                      <i className="fa-solid fa-phone-flip"></i>
                    </div>
                    <div className="info-meta-text">
                      <span className="meta-heading">Phone Number</span>
                      <span className="meta-link">
                        <Link href="tel:+(908)786789786"> {item?.phone} </Link>
                      </span>
                    </div>
                  </div>
                  <div className="info-meta-single">
                    <div className="info-meta-icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="info-meta-text">
                      <span className="meta-heading">Email Address</span>
                      <span className="meta-link">
                        <Link href={`mailto:${item?.email}`}>
                          {item?.email}
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="info-meta-single">
                    <div className="info-meta-icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="info-meta-text">
                      <span className="meta-heading">Office Location</span>
                      <span className="meta-link">
                        <Link href="#"> {item?.location} </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="member-details-info-btn">
                  <Link className="bd-fill__btn" href="/contact">
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container small-container">
        <div className="hr-1"></div>
      </div>

      <TeamSkills item={item} />

      <div className="container small-container">
        <div className="hr-1"></div>
      </div>

      <TeamAbout item={item}/>
    </>
  );
};

export default TeamDetailsMain;
