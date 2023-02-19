import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import UserState from "../context/user/userState";

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <Component {...pageProps} />
    </UserState>
  );
}

export default MyApp;
