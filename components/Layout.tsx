import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
