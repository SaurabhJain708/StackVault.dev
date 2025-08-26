import RootLayout from "@/app/layout";

export default function PremiumUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout showFooter={false}>{children}</RootLayout>;
}
