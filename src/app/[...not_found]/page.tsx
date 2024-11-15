import ErrorMain from '@/components/error-page/ErrorMain';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const ErrorPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                <ErrorMain/>
                </main>
            </Wrapper>
        </>
    );
};

export default ErrorPage;