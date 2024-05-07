
import ContextLayout from "@/context/ContextLayout";
import { Inter } from "next/font/google";
import 'normalize.css'; // Note this

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AM NPS Viewer",
  description: "Prueba técnica",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextLayout>
          {children}
        </ContextLayout>
      </body>
    </html>
  );
};