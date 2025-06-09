"use client";

import { useEffect } from "react";
import { adminDetails } from "../services/api";
import AOS from "aos";


export default function AppInitializer({ children }) {
  useEffect(() => {
    async function load() {
      const data = await adminDetails();

      let adminData = data.data;

      localStorage.setItem("userData" , JSON.stringify(adminData));
      localStorage.setItem("master_user_id" , adminData.master_user_id);
      localStorage.setItem("permissions" , adminData.admin_group_data.permissions);
      // console.log("Admin data:", data);

      AOS.init({
        duration: 1000,
        once: true,
      });


    }
    load();
  }, []);

  return <>{children}</>;
}