import "../globals2.css";
import Provider from "../components/Provider";
import Wrapper from "../components/Wrapper";

export const metadata = {
  title: "Web Forum",
  description: "Web Forum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider>
            <div className="flex justify-center items-center h-screen">
          <Wrapper>
              {children}
          </Wrapper>
          </div>
        </Provider>
      </body>
    </html>
  );
}
