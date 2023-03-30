import React from "react";
import SignInComponent from "src/components/SignInComponent";
import RootComponent from "src/components/RootComponent";
// import { wrapper } from "src/redux/store";
// import { useRouter } from "next/router";

const pageName = "вход";

const SignInPage = () => {
    // const router = useRouter();
    // const IsLogin = useSelector(getIsLoggedIn, shallowEqual);

    // if (IsLogin) {
    //     void router.push("/");
    // } else {
    return <RootComponent pageName={pageName} elem={<SignInComponent />} />;
    // }
};

// SignInPage.getInitialProps = wrapper.getInitialPageProps(() => () => {
//     return {};
// });

export default SignInPage;
