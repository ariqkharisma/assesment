import { Provider } from "@/provider/Provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
