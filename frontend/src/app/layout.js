import "./globals.css";

export const metadata = {
  title: "InVesting MBTI",
  description: "나만의 금융 투자 성향을 알아보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
