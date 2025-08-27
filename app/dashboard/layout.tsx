import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { ReactNode } from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const [user, setUser] = useState<any>();
  const icons: ReactNode[] = [<IoNotificationsOutline />, <FaRegUser />];

  return (
    <div className="flex overflow-hidden">
      <Sidebar />

      <div className="w-5/6">
        <div className="flex justify-between w-full h-18 border-b-1 border-gray/20 px-5 py-2">
          <Searchbar />
          <div className="flex gap-2 items-center">
            {icons.map((icon) => (
              <div className="rounded-full bg-white-2 w-12 h-12 text-sm grid place-items-center cursor-pointer text-accent hover:bg-white-2/70 duration-300">
                {icon}
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 pt-5 bg-white-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
