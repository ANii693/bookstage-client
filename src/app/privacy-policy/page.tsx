import PrivacyPolicyMain from '@/components/PrivacyPolicy/PrivacyPolicyMain';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <PrivacyPolicyMain/>
                </main>
            </Wrapper>
        </>
    );
};

export default PrivacyPolicyPage;