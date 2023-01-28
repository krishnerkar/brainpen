import localFont from "@next/font/local";
import cx from "classnames";
import "./globals.css";

const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff",
  display: "swap",
  variable: "--font-calsans",
});

const gambetta = localFont({
  src: "../fonts/Gambetta-Regular.woff",
  display: "swap",
  variable: "--font-gambetta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`${cx(
          calSans.variable,
          gambetta.variable
        )} flex justify-center bg-black`}
      >
        <div className="w-full max-w-screen-2xl py-24 px-20">{children}</div>
      </body>
    </html>
  );
}
