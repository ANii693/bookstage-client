import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import TrackOrderMain from "@/components/track-order/TrackOrderMain";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TrackOrderPage = () => {
  return (
    <>
      <Wrapper>
        <main>
        <Breadcrumb breadHome="Home" breadMenu="Track  Order"/>
          <TrackOrderMain />
        </main>
      </Wrapper>
    </>
  );
};

export default TrackOrderPage;
