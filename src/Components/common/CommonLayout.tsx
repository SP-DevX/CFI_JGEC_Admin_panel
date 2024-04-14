
type props = {
  children: React.ReactNode,
  header: string
}

const Layout = ({ children, header }: props) => {
  return (
    <div className="w-full h-full pt-24  px-6">
      <h1 className="font-semibold text-lg capitalize mb-4">
        {header}
      </h1>
      {children}
    </div>
  );
};

export default Layout;
