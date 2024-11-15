import UserProfileMain from '@/components/profile/studentProfile/UserProfileMain';
import Wrapper from '@/layout/DefaultWrapper';
import PrivetRoute from '@/privetRoute/PrivetRoute';
import React from 'react';

const ProfilePage = () => {
    return (
        <>
            <PrivetRoute>
            <Wrapper>
                <main>
                    <UserProfileMain/>
                </main>
            </Wrapper>
            </PrivetRoute>
        </>
    );
};

export default ProfilePage;