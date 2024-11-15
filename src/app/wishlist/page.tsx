import WistListMain from '@/components/wistlist/WistListMain';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const WistListPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <WistListMain/>
                </main>
            </Wrapper>
        </>
    );
};

export default WistListPage;