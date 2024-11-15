import Wrapper from "@/layout/DefaultWrapper";

import DonationFormComponent from "@/components/donation/Donation";
const Donation = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <DonationFormComponent />
                </main>
            </Wrapper>
        </>
    );
}

export default Donation