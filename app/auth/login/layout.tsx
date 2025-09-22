import React from "react";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2 flex justify-center items-center">{children}</div>
        <div className="w-1/2 h-[97vh] m-2 rounded-xl bg-accent"></div>
      </div>
    </div>
  );
};

export default LoginLayout;
