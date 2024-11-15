"use client";
import Link from "next/link";
import React,{useEffect,useState} from "react";
import Image from "next/image";
import axios from "axios";
import { TeamMember } from "@/interFace/api-interFace";
const TeamSection = () => {
  const [teamList, setTeamList] = useState<TeamMember[]>([])
 
  useEffect(() => { 
    axios
      .get(`${process.env.BASE_URL}team/team-member`)
      .then((res) => {
        setTeamList(res.data);
      })
      .catch((e) => {});
  }, [setTeamList]);
  return (
    <section className="bd-team__area pt-125 pb-95">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-section__title-wrapper text-center mb-60">
              <span className="bd-sub__title">Professional Team</span>
              <h2 className="bd-section__title mb-30">Meat the Farmers</h2>
            </div>
          </div>
        </div>
        {teamList?.length ? (
          <div className="row">
            {teamList.slice(0, 4).map((item, num) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={num}>
                <div className="bd-team__wrapper text-center mb-30">
                  <div className="bd-team__thumb w-img p-relative">
                    <Link href={`/team-details/${item._id}`}>
                      <Image
                        width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                        src={item?.img}
                        alt="team-thumb"
                      />
                    </Link>
                    <div className="bd-content__inner">
                      <div className="bd-team__share">
                        <Link href={`/team-details/${item._id}`}>
                          <i className="fa-light fa-share-nodes"></i>
                        </Link>
                        <div className="bd-team__action">
                          <Link href="#">
                            <i className="fa-brands fa-facebook-f"></i>
                          </Link>
                          <Link href="#">
                            <i className="fa-brands fa-twitter"></i>
                          </Link>
                          <Link href="#">
                            <i className="fa-brands fa-instagram"></i>
                          </Link>
                          <Link href="#">
                            <i className="fa-brands fa-linkedin"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bd-team__content">
                    <h4>
                      <Link href={`/team-details/${item._id}`}>
                        {item?.title}
                      </Link>
                    </h4>
                    <span>{item?.subTitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ):
         <>
         <p className="text-center">No Member Found</p>
         </>
        }
      </div>
    </section>
  );
};

export default TeamSection;
