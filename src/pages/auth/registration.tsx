import React from "react";
import RegistrationComponent from "src/components/RegistrationComponent";
import RootComponent from "src/components/RootComponent";
// import { wrapper } from "src/redux/store";

// import { useRouter } from "next/router";

const pageName = "вход";

const RegistrationPage = () => {
    // const router = useRouter();
    // const IsLogin = useSelector(getIsLoggedIn, shallowEqual);

    // if (IsLogin) {
    //     void router.push("/");
    // } else {
    return <RootComponent pageName={pageName} elem={<RegistrationComponent />} />;
    // }
};

// RegistrationPage.getInitialProps = wrapper.getInitialPageProps(() => () => {
//     return {};
// });

export default RegistrationPage;
