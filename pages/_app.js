import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import UserState from "../context/user/userState";
import MyFooter from "../components/MyFooter";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Component {...pageProps} />
      <MyFooter />
    </UserState>
  );
}

export default MyApp;
