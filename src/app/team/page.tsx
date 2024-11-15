
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import TeamMain from "@/components/team/TeamMain";
import Wrapper from "@/layout/DefaultWrapper";

const Team = () => {
  return (
    <>
      <Wrapper>
        <main>
        <Breadcrumb breadHome="Home" breadMenu="Team"/>
          <TeamMain/>
        </main>
      </Wrapper>
    </>
  );
}

export default Team