// app/layout.js
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

export const metadata = {
  title: "AGBklar – AGBs in plain German",
  description: "Upload AGB PDFs and get plain-German summaries and risk flags.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
