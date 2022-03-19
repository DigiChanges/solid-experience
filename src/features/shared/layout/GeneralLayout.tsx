
import { Component } from 'solid-js';
// import GeneralLoader from '../../atoms/GeneralLoader';
// import { useSelector } from 'react-redux';
// import GeneralToast from '../../atoms/GeneralToast';
// import { showErrorNotification, showNotification, showNotify } from '../../helpers/showNotification';
// import ToastNotification from '../../molecules/ToastNotification';


// const GeneralLayout: React.FC<PropsWithChildren<any>> = ( props: any ): any =>
const GeneralLayout: Component = ( props: any ): any =>

{
    // const { isLoading, notification } = useSelector( ( state : any ) => state.General );

    return (
        <>
            {/* {isLoading && (
                <GeneralLoader
                    cssScreenContainer='fixed w-full h-screen bg-black bg-opacity-75 top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-center'
                    cssSpinnerContainer='pt-10 pb-10 pl-12 pr-12'
                    cssSpinner='text-center pt-4 text-white text-xl' />
            )} */}
            {/* {notification && (
        <GeneralToast
          type={notification.type}
          msg={notification.message} />
      )} */}

            {props.children}
        </>
    );
};

export default GeneralLayout;
