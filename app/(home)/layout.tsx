import { HomeFooter } from "./_components/home-footer";
import HomeHeader from "./_components/home-header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <HomeHeader />
        {children}
        {/* Footer */}
        <HomeFooter />
      </div>
    </>
  );
}
