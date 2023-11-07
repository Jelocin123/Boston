
import "./styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Favicon from "/public/favicon.ico";
import { UserProvider } from "./providers/userProvider"; // Import UserProvider
import Navbar from "./components/navbar/navbar";
import Script from 'next/script';



export const metadata = {
  title: "BostonGaming",
  description: "",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider> 
          <Navbar /> 
          {children}
        </UserProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" ></Script>
      </body>
    </html>
  );
}
