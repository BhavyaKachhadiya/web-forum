import "../globals2.css";
import Provider from "../components/Provider";
import Wrapper from "../components/Wrapper";


export const metadata = {
  title: "Category | Web Forum",
  description: "Category",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider>
          <Wrapper>
          {children}
          </Wrapper>
        </Provider>
      </body>
    </html>
  );
}
