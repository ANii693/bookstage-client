"use client"
import React from 'react';
import store, { persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from '@/components/common/Preloader';
import { childrenType } from '@/interFace/interFace';

const ReduxProvider = ({ children }:childrenType) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
