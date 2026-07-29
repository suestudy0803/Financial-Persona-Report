import "./globals.css";

export const metadata = {
  title: "금융 MBTI",
  description: "나만의 금융 투자 성향을 알아보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
