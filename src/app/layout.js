
import "./globals.css";
import Provider from "./components/Provider";

export const metadata = {
  title: "Web Forum",
  description: "Web Forum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
