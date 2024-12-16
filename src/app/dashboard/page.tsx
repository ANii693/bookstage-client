
import DashboardItems from "@/components/dashboard/DashboardItems";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Wrapper>
        <main>
          Dashboard
          <DashboardItems/>
        </main>
      </Wrapper>
    </>
  );
};

export default Dashboard;
