declare module 'gallary-view' {
    import { ReactNode } from 'react';
  
    interface PhotoConsumerProps {
      src: any;
      children: (props: { img: any }) => ReactNode;
    }
  
    export const PhotoConsumer: React.FC<PhotoConsumerProps>;
  
    interface PhotoProviderProps {
      children: ReactNode;
    }
  
    export const PhotoProvider: React.FC<PhotoProviderProps>;
  }
  