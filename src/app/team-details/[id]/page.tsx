import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import TeamDetailsMain from '@/components/team-details/TeamDetailsMain';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const TeamDetailsPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
    return (
        <>
            <Wrapper>
                <main>
                <Breadcrumb breadHome="Home" breadMenu="Team Details"/>
                    <TeamDetailsMain id={id}/>
                </main>
            </Wrapper>
        </>
    );
};

export default TeamDetailsPage;