import { childrenType } from '@/interFace/interFace';
import AdminRoute from '@/privetRoute/PrivetRoute';
import React from 'react';

const AdminWrapper = ({ children }:childrenType) => {
    return (
        <>
            <AdminRoute>
                
                {children}
                
            </AdminRoute>
        </>
    );
};

export default AdminWrapper;