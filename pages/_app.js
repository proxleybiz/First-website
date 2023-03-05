import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import UserState from "../context/user/userState";
import MyFooter from "../components/MyFooter";

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <Component {...pageProps} />
      <MyFooter />
    </UserState>
  );
}

export default MyApp;
