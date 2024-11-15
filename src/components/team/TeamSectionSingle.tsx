"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import useGlobalContext from "@/hooks/use-context";
import TeamPreloader from "@/preloaders/TeamPreloader";
const TeamSectionSingle = () => {
  const { teamList, setTeamList } = useGlobalContext();
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.BASE_URL}team/team-member`)
      .then((res) => {
        setTeamList(res.data);
        setLoading(false)
      })
      .catch((e) => {});
  }, [setTeamList]);

  return (
    <section className="bd-team__area pt-115 pb-95">
      <div className="container small-container">
     
        
          <div className="row">
            { teamList?.length ?
            teamList.map((item, num) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={num}>
                <div className="bd-team__wrapper text-center mb-30">
                  <div className="bd-team__thumb w-img p-relative">
                    <Link href={`/team-details/${item?._id}`}>
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
                        <Link href="">
                          <i className="fa-light fa-share-nodes"></i>
                        </Link>
                        <div className="bd-team__action">
                       
                            
                              <Link href={item.facebook} target="_blank">
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            
                              <Link href={item.twitter} title="Twitter">
                                <i className="fab fa-twitter"></i>
                              </Link>
                            
                              <Link href={item.linkedin} title="Linkedin" target="_blank">
                                <i className="fab fa-linkedin"></i>
                              </Link>
                           
                              <Link href={item.instagram} target="_blank" title="Instagram">
                                <i className="fab fa-instagram"></i>
                              </Link>
                            
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bd-team__content">
                    <h4>
                      <Link href={`/team-details/${item._id}`}>
                        {item.title}
                      </Link>
                    </h4>
                    <span>{item.subTitle}</span>
                  </div>
                </div>
              </div>
            )):
            <>
            {loading ? (
              <>
                <TeamPreloader />
              </>
            ) : (
              <>
                <p className="text-center mt-5"> No Member Found </p>
              </>
            )}
          </>
            
            }
          </div>
    

      </div>
    </section>
  );
};

export default TeamSectionSingle;
