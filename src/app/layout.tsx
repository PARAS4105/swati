
import type { Metadata } from "next";
// import 'animate.css';
import "aos/dist/aos.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Appinitializer from "../components/Appintializer";
import {adminDetails,propertyDetails,completedPropertyDetails,pagesDetails,socialMediaDetails } from '../services/api';
import  PropertyListProvider  from '../contexts/PropertyListProvider';




export const metadata: Metadata = {
  title: "Swati Procon - Luxury Residential & Commercial Projects in Ahmedabad",
  description: "Swati Procon - Luxury Residential & Commercial Projects in Ahmedabad  ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{

    const [adminDetailResponse, propertyListResponse, completedPropertyListResponse, pageListResponse, socialListResponse] = await Promise.all([
    adminDetails(),
    propertyDetails("373"),
    completedPropertyDetails("373"),
    pagesDetails("373"),
    socialMediaDetails("373"),
  ]);

  const adminDetail = adminDetailResponse?.data || {};
  const pageList = pageListResponse?.data || [];
  const propertylist = propertyListResponse?.data || [];
  const completedPropertylist = completedPropertyListResponse?.data || [];
const socialList = socialListResponse?.data || [];

  return (
    <html lang="en">
      <head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <PropertyListProvider propertylist={propertylist} completedPropertylist={completedPropertylist} >
        <Appinitializer>

         <Header
            adminDetail={adminDetail}
            propertylist={propertylist}
            completedPropertylist={completedPropertylist}
            pageList={pageList}
            socialList={socialList}
          />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer adminDetail={adminDetail} propertylist={propertylist} completedPropertylist={completedPropertylist} pageList={pageList}
            socialList={socialList} />
        </Appinitializer>
        </PropertyListProvider>
      </body>
    </html>
  );
}
