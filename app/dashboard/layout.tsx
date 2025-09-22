"use client";
import { createSupabaseClient } from "../lib/supabase/client";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "../components/dashboardComponents/Sidebar";
import Searchbar from "../components/dashboardComponents/Searchbar";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { ReactNode, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import { User } from "@supabase/supabase-js";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const icons: ReactNode[] = [
    <IoNotificationsOutline key="notifications" />,
    <FaRegUser key="user" />,
  ];
  const supabase = createSupabaseClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        router.replace("/dashboard");
      }
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/auth/signup/organisation");
      } else if (error) {
        console.log("Error in Dashboard auth: ", error);
      }
      setLoggedUser(user);

      const storedData = localStorage.getItem("schoolData");
      const schoolData = storedData ? JSON.parse(storedData) : null;

      const { data: profile } = await supabase
        .from("profile")
        .select("id, school_id")
        .eq("user_id", loggedUser?.id)
        .maybeSingle();

      if (!profile && loggedUser) {
        console.log("School data:", schoolData);
        console.log("User ID:", loggedUser.id);

        const { data, error } = await supabase
          .from("school")
          .insert({
            name: schoolData?.schoolName,
            website: schoolData?.website,
            country: schoolData?.country,
            contact: schoolData?.contact,
          })
          .select();

        if (error) {
          console.error("School insert error:", error);
          localStorage.removeItem("schoolData");
          return;
        }

        const schoolId = data?.[0]?.id;

        const { error: profileError } = await supabase.from("profile").insert({
          user_id: loggedUser.id,
          school_id: schoolId,
          role: "admin",
        });

        if (profileError) {
          console.error("Profile insert error:", profileError);
        } else {
          console.log("Profile created successfully");
        }
      }
    };
    handleAuth();
  }, [searchParams, supabase]);

  return (
    <authContext.Provider value={loggedUser}>
      <div className="flex overflow-hidden bg-white-1">
        <Sidebar />
        <div className="w-5/6">
          <div className="flex justify-between w-full h-18 border-b-1 border-gray/20 px-5 py-2 bg-white-0">
            <Searchbar />
            <div className="flex gap-2 items-center">
              <div className="text-black">
                Welcome, {loggedUser?.user_metadata.display_name}
              </div>
              {icons.map((icon, index) => (
                <div
                  className="rounded-full bg-white-2 w-12 h-12 text-sm grid place-items-center cursor-pointer text-accent hover:bg-white-2/70 duration-300"
                  key={index}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 pt-5">{children}</div>
        </div>
      </div>
    </authContext.Provider>
  );
};

export default DashboardLayout;
