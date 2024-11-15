import Wrapper from "@/layout/DefaultWrapper";
// import Repair from "@/components/repair/Repair.tsx";
import RepairFormComponent from "@/components/repair/Repair";
const Repair = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <RepairFormComponent />
                </main>
            </Wrapper>
        </>
    );
}

export default Repair