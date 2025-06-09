"use client";

import Link from "next/link"
import { useEffect , useState } from "react";
import { usePathname } from "next/navigation";
// import { pagesDetails , completedPropertyDetails , propertyDetails , socialMediaDetails} from "../services/api"
import styles from './Footer.module.css'

export default function Footer({ adminDetail, propertylist, completedPropertylist, pageList, socialList }) {

  const  pathname = usePathname();

// const [adminDetail, setAdminDetail] = useState(null);
// const [propertylist, setPropertylist] = useState(null);
// const [completedPropertylist, setCompletedPropertylist] = useState(null);
// const [pageList, setPageList] = useState(null);
// const [socialList, setSocialList] = useState(null);
const [activeIndex, setActiveIndex] = useState('')


const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? '' : index);
  };


//    async function loadPages(){
//     let data = await pagesDetails();
//     console.log(data)
//     if(data.success == 1){
//        setPageList(data.data);
//     }
//   }
//    async function loadProperties(){
//     let data = await propertyDetails();
//     console.log(data)
//     if(data.success == 1){
//        setPropertylist(data.data);
//     }
//   }
//    async function loadSocialList(){
//     let data = await socialMediaDetails();
//     console.log(data)
//     if(data.success == 1){
//        setSocialList(data.data);
//     }
//   }

//    async function loadCompletedProperties(){
//     let data = await completedPropertyDetails();
//     console.log(data)
//     if(data.success == 1){
//        setCompletedPropertylist(data.data);
//     }
//   }

  const year = new Date().getFullYear();

  useEffect(() => {

    // loadPages()
    // loadCompletedProperties();
    // loadProperties();
    // loadSocialList();
    
    //    const storedData = localStorage.getItem("userData");
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    //   setAdminDetail(parsedData);
    // }
  }, []);

  
    if (!pageList || pageList.length === 0) return null;

  return (
    
    <>

        
      <div className="footer-wrapper">
        <div className="main-container-fluid">
          <div className="inner-flex hide-tab-mobile">
            <div className="flex-row inner-flex-big section-padding-small flex-col-mob">
              <div className="inner-flex inner-flex-small">
                 <div className="footer-logo footer-logo-withline">
                  {adminDetail?.logo && (
                    <Link href="/" title="">
                      <img src={adminDetail.logo} alt={adminDetail.name || "Logo"} />
                    </Link>
                  )}
                </div>
              </div>
              <ul className="inner-flex inner-flex-small marginl-auto">
                    <div className="section-footer-title">
                        <p className="">Quick links</p>
                    </div>
                    <div className="inner-flex inner-flex-smallest footer-navigation-link">
                        <li className="wfc footer-hover">
                            <Link href="projects" className={pathname == '/projects' ? active_page : ""  }>
                                <p className="capitalize footer-text"> Projects </p>
                            </Link>
                        </li>
                         { pageList.map((data , index) => (
                          data.page_type === '' && data.is_profile_page === "0" && (
                              <li key={index} className="wfc footer-hover">
                                  <a href={data.slug} className={`${pathname === data.slug ? "active_page" : ""}`} target={data.slug_target}>
                                      <p className="capitalize footer-text">{data.page_name}</p>
                                  </a>
                              </li>
                          )
                        ))}
                       
                    </div>
                </ul>
              <ul className="inner-flex inner-flex-small ">
                    <div className="section-footer-title">
                        <p className="">Ongoing</p>
                    </div>
                    <div className="inner-flex inner-flex-smallest footer-navigation-link">
                        { propertylist != null && propertylist.length > 0 && propertylist.map((data , index) => (
                          data.status != 'upcoming'  && (
                              <li key={index} className="wfc footer-hover">
                                  <a href={data.slug} className={`${pathname === data.slug ? "active_page" : ""}`}>
                                      <p className="capitalize footer-text">{data.project_title}</p>
                                  </a>
                              </li>
                          )
                        ))}
                    </div>
                </ul>
              <ul className="inner-flex inner-flex-small ">
                    <div className="section-footer-title">
                        <p className="">Completed</p>
                    </div>
                    <div className="inner-flex inner-flex-smallest footer-navigation-link">
                        { completedPropertylist != null && completedPropertylist.length > 0 && completedPropertylist.map((data , index) => (
                          (
                              <li key={index} className="wfc footer-hover">
                                  <a href={data.slug} className={`${pathname === data.slug ? "active_page" : ""}`}>
                                      <p className="capitalize footer-text">{data.project_title}</p>
                                  </a>
                              </li>
                          )
                        ))}
                    </div>
                </ul>

                <ul className="inner-flex inner-flex-small ">
                    <div className="section-footer-title">
                        <p className="">Contact</p>
                    </div>
                    <div className="inner-flex  footer-navigation-link footer-navigation-link-contact">
                        <li className="wfc footer-hover">
                            <a href="tel:+918000585555" className="footer-row">
                                <div className="footer-row-icon">
                                    <img src="/images/icon/PhoneCall.svg" alt=""/>
                                </div>
                                <p className="capitalize footer-text"> +91 8000 58 5555 </p>
                            </a>
                        </li>
                        <li className="wfc footer-hover">
                            <a href="mailto:info@swatiprocon.com" className="footer-row"  rel="nofollow">
                                <div className="footer-row-icon">
                                    <img src="/images/icon/EnvelopeOpen.svg" alt=""/>
                                </div>
                                <p className="footer-text"> info@swatiprocon.com </p>
                            </a>
                        </li>
                        <li className="wfc footer-hover">
                            <a href="https://maps.app.goo.gl/y4xerH5FEnmuKh7N8" target="_blank" className="footer-row"  rel="noopener noreferrer">
                                <div className="footer-row-icon">
                                    <img src="/images/icon/MapPinArea.svg" alt=""/>
                                </div>
                                <p className="capitalize footer-text"> 11 Floor, Signature 1, Near Divya<br/> Bhaskar House,
                                    S.G Highway, <br/>Ahmedabad - 380051 </p>
                          </a>
                      </li>
                    </div>
                    
                   { socialList != null && socialList.length > 0 && (
                    <div className="flex-row inner-flex-medium">
                        <ul className="flex-row alc">
                            { socialList.map((social, index) => (
                                <li key={index}>
                                    {social.name === 'facebook' && (
                                        <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                            <img src="/images/icon/social-icons/facebook.svg" alt="Facebook"
                                                className="social-media-icon-footer common-icon" />
                                        </a>
                                    )}
                                    {social.name === 'instagram' && (
                                        <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                            <img src="/images/icon/social-icons/instagram.svg" alt="Instagram"
                                                className="social-media-icon-footer common-icon" />
                                        </a>
                                    )}
                                    {social.name === 'twitter' && (
                                        <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                            <img src="/images/icon/social-icons/twitter.svg" alt="Twitter"
                                                className="social-media-icon-footer common-icon" />
                                        </a>
                                    )}
                                    {social.name === 'linkedin' && (
                                        <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                            <img src="/images/icon/social-icons/linkedin.svg" alt="LinkedIn"
                                                className="social-media-icon-footer common-icon" />
                                        </a>
                                    )}
                                    {social.name === 'youtube' && (
                                        <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                            <img src="/images/icon/social-icons/youtube.svg" alt="YouTube"
                                                className="social-media-icon-footer common-icon" />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}

                </ul>

            </div>
            <div className="reecosys_footer_copyright section-padding-small flex-row j-c-sb alc ">
                <div className="">
                    <p className="p0 footer-gray">&copy; {adminDetail.name} {year}</p>
                </div>
                <div className="flex-row inner-flex-medium alc">
                    <div className="">
                        <ul className="flex-row inner-flex-small footer-navigation-link">
                          {pageList != null &&
                            pageList.length > 0 &&
                            pageList.map((data, index) => {
                              if (data.page_type === 'legal') {
                                return (
                                  <li key={index} className="wfc footer-hover">
                                    <a
                                      href={data.slug}
                                      className={pathname === data.slug ? 'active_page' : ''}
                                    >
                                      <p className="capitalize footer-gray">{data.page_name}</p>
                                    </a>
                                  </li>
                                );
                              } else {
                                return null;
                              }
                            })}
                        </ul>
                    </div>
                </div>

                <div className=" flex-row alc">
                    <div className="section-content">
                        <p className="footer-gray">
                            Powered By :
                        </p>
                    </div>
                    <div className="section-content wfc footer-hover">
                        <a href="https://www.reecosys.com/" target="_blank"  rel="noopener noreferrer">
                            <p className="footer-gray">
                                REECOSYS
                            </p>
                        </a>
                    </div>

                </div>

            </div>
          </div>

          <div className="visible-tab-mobile">
            <div className="reecosys-footer-link-sections reecosys-mainfooter-section-links">
                <div className="flex-row alc j-c-sb section-padding-small pt0 ">
                    <div className="footer-logo ">
                        <Link href="" title={adminDetail.name}>
                            { adminDetail.logo != "" && (<div>
                                <img src={adminDetail.logo} alt={adminDetail.name}  />
                            </div>)}
                            { adminDetail.logo == "" && (<div className="footer_logo_text" >
                                <p className="capitalize">
                                    {adminDetail.name}
                                </p>
                            </div>)}
                        </Link>
                        <br/>
                    </div>
                    { socialList != null && socialList.length > 0 && (<div className="socail-footer-flex flex-row inner-flex-medium" >
                      <ul className="flex-row alc">
                          {socialList.map((social, index) => (
                              <li key={index}>
                                  {social.name == 'facebook' && (
                                          <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                              <img src="/images/icon/social-icons/facebook.svg" alt={`Facebook ${adminDetail.name}`} className="social-media-icon-footer common-icon" />
                                          </a>
                                  )}
                                  {social.name == 'instagram' && (
                                          <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                              <img src="/images/icon/social-icons/instagram.svg" alt={`Instagram ${adminDetail.name}`} className="social-media-icon-footer common-icon" />
                                          </a>
                                  )}
                                  {social.name == 'twitter' && (
                                          <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                              <img src="/images/icon/social-icons/twitter.svg" alt={`X ${adminDetail.name}`} className="social-media-icon-footer common-icon" />
                                          </a>
                                  )}
                                  {social.name == 'linkedin' && (
                                          <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                              <img src="/images/icon/social-icons/linkedin.svg" alt={`LinkedIn ${adminDetail.name}`} className="social-media-icon-footer common-icon" />
                                          </a>
                                  )}
                                  {social.name == 'youtube' && (
                                          <a href={social.slug} target="_blank" rel="noopener noreferrer">
                                              <img src="/images/icon/social-icons/youtube.svg" alt={`Youtube ${adminDetail.name}`} className="social-media-icon-footer common-icon" />
                                          </a>
                                  )}
                              </li>
                          ))}
                      </ul>

                    </div>)}
                </div>

                <div className="mob-link">
                    <ul className="quicklinks-footer quicklinks-footer-mobile inner-flex section-content pt0 section-padding-small footer-navigation-link ">

                        

                        <li className="project-footer-accordion">
                            <div onClick={()=>{toggleAccordion('Ongoing')}}
                                className={activeIndex == 'Ongoing' ? "active" : ""}>
                                <div className="accordionClick"> 
                                    <p className="capitalize">Ongoing</p>
                                    <div className="down_arrow_footer">
                                        <img src="/images/icon/down-arrow.svg" alt=""
                                            className="manu-accordian-downarrow" />
                                        <img src="/images/icon/up-arrow.svg" alt=""
                                            className="manu-accordian-uparrow" />
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.footer_content_accordian} ${activeIndex == 'Ongoing' ? styles.active_list: ""} `}>
                                <ul className="inner-flex ">
                                    { propertylist != null && propertylist.length > 0 && 
                                    propertylist.map((data , index)=> {

                                      if(data.status == 'under construction'){
                                        return ( 
                                          <li key={index}>
                                        <Link href={data.slug} className="header-hover">
                                            <div className="inner-flex inner-flex-small">
                                                <div className="w100 relative">
                                                    <img src={`${data.banner_data.image_web_full}&h=752&w=964&q=100`}
                                                        alt="reecosys" />
                                                </div>
                                                <div className=" w100 inner-flex ">
                                                    <div className="section-paragraph">
                                                        <p className=" header-title capitalize ">
                                                            {data.project_title}
                                                        </p>
                                                    </div>
                                                    <div className="inner-flex inner-flex-smallest">
                                                        <div className="flex-row alc">
                                                            <div className="iconimg">
                                                                <img src="/images/icon/location.svg" 
                                                                    alt="" />
                                                            </div>
                                                            <div className=" section-content">
                                                                <span className="ellipsis-1">{data.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-row alc">
                                                            <div className="iconimg">
                                                                <img src="/images/icon/building.svg"
                                                                    alt=""/>
                                                            </div>
                                                            <div className=" section-content">
                                                                <span className="ellipsis-1">{data.size_price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>)}})}

                                </ul>
                            </div>
                        </li>
                        <li className="project-footer-accordion">
                            <div onClick={()=>{toggleAccordion('Completed')}}
                                className={activeIndex == 'Completed' ? "active" : ""}>
                                <div className="accordionClick" >
                                    <p className="capitalize">Completed</p>
                                    <div className="down_arrow_footer">
                                        <img src="/images/icon/down-arrow.svg" alt=""
                                            className="manu-accordian-downarrow" />
                                        <img src="/images/icon/up-arrow.svg" alt=""
                                            className="manu-accordian-uparrow" />
                                    </div>

                                </div>
                            </div>
                            <div className={`${styles.footer_content_accordian} ${activeIndex == 'Completed' ? styles.active_list: ""} `}>
                                <ul className="inner-flex ">
                                    { completedPropertylist != null && completedPropertylist.length > 0 && 
                                      completedPropertylist.map((data , index) =>( 
                                        <li key={index}>
                                        <a href={data.slug} className="header-hover">
                                            <div className="inner-flex inner-flex-small">

                                                <div className="w100 relative">
                                                    <img 
                                                        src={`${data.banner_data.image_web_full}&h=752&w=964&q=100`}
                                                        alt="reecosys"/>
                                                </div>
                                                <div className=" w100 inner-flex ">
                                                    <div className="section-paragraph">
                                                        <p className=" header-title capitalize ">
                                                            {data.project_title}
                                                        </p>
                                                    </div>
                                                    <div className="inner-flex inner-flex-smallest">
                                                        <div className="flex-row alc">
                                                            <div className="iconimg">
                                                                <img src="/images/icon/location.svg" 
                                                                    alt="" />
                                                            </div>
                                                            <div className=" section-content">
                                                                <span className="ellipsis-1">{data.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-row alc">
                                                            <div className="iconimg">
                                                                <img src="/images/icon/building.svg" 
                                                                    alt="" />
                                                            </div>
                                                            <div className=" section-content">
                                                                <span className="ellipsis-1">{data.size_price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>))}
                                </ul>
                            </div>
                        </li>

                        <li className="project-footer-accordion">
                            <div onClick={()=>{toggleAccordion('quick-links')}}
                                className={activeIndex == 'quick-links' ? "active" : ""}>
                                <div className="accordionClick" >
                                    <p className="capitalize">Quick Links</p>

                                    <div className="down_arrow_footer">
                                        <img src="/images/icon/down-arrow.svg" alt=""
                                            className="manu-accordian-downarrow"/>
                                        <img src="/images/icon/up-arrow.svg" alt=""
                                            className="manu-accordian-uparrow"/>
                                    </div>

                                </div>
                            </div>
                            
                            <div className={`${styles.footer_content_accordian} ${activeIndex == 'quick-links' ? styles.active_list: ""} `}>
                                <ul className="inner-flex  pb0">
                                    { pageList != null && pageList.length > 0 &&
                                    pageList.map((data , index) =>{
                                      if(data.page_type == '' && data.is_profile_page == 0){
                                        return (
                                     <li key={index} style={{paddingBottom: "0"}}>
                                        <a href={data.slug}
                                            className={` ${pathname == data.slug ?  "active_page" : ""}`}
                                            target={data.slug_target}>
                                            <p className="capitalize">{data.page_name}</p>
                                        </a>
                                    </li>)}})}
                                </ul>
                            </div>
                        </li>
                        <li className="project-footer-accordion">
                            <div onClick={()=>{toggleAccordion('legal')}}
                                className={activeIndex == 'legal' ? "active" : ""}>
                                <div className="accordionClick" >
                                    <p className="capitalize">Legal</p>
                                    <div className="down_arrow_footer">
                                        <img src="/images/icon/down-arrow.svg" alt=""
                                            className="manu-accordian-downarrow"/>
                                        <img src="/images/icon/up-arrow.svg" alt=""
                                            className="manu-accordian-uparrow"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.footer_content_accordian} ${activeIndex == 'legal' ? styles.active_list: ""} `}>
                                <ul className="inner-flex  pb0">
                                    { pageList != null && pageList.length > 0 && pageList.map((data , index)=>{
                                      if(data.page_type == 'legal'){
                                        return (<li key={index} className="pb0">
                                        <Link href={data.slug}
                                            className={`${pathname == data.slug ? 'active_page' : '' }`}>
                                            <p className="capitalize">{data.page_name}</p>
                                        </Link>
                                    </li>)}})}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <ul>
                                <div className="section-footer-title">
                                    <p className="">Contact</p>
                                </div>
                                <div className="inner-flex  footer-navigation-link footer-navigation-link-contact">
                                    <li className="wfc footer-hover">
                                        
                                        <a href="tel:+918000585555" className="footer-row" rel="nofollow">
                                            <div className="footer-row-icon">
                                                <img src="/images/icon/PhoneCall.svg" alt="" />
                                            </div>
                                            <p className="capitalize footer-text"> +91 8000 58 5555 </p>
                                        </a>
                                    </li>
                                    <li className="wfc footer-hover">
                                        <a href="mailto:info@swatiprocon.com" className="footer-row" rel="nofollow">
                                            <div className="footer-row-icon">
                                                <img src="/images/icon/EnvelopeOpen.svg" alt="" />
                                            </div>
                                            <p className="footer-text"> info@swatiprocon.com </p>
                                        </a>
                                    </li>
                                    <li className="wfc footer-hover">
                                        <a href="https://maps.app.goo.gl/y4xerH5FEnmuKh7N8" target="_blank"
                                            className="footer-row" rel="noopener noreferrer">
                                            <div className="footer-row-icon">
                                                <img src="/images/icon/MapPinArea.svg" alt="" />
                                            </div>
                                            <p className="capitalize footer-text"> 11 Floor, Signature 1, Near Divya<br/>
                                                Bhaskar House, S.G Highway, <br/>Ahmedabad - 380051 </p>
                                        </a>
                                    </li>
                                </div>

                            </ul>
                        </li>
                    </ul>
                </div>

                <ul className="quicklinks-footer-copyright">
                    <li>
                        <div className="web_copyright section-content">
                            <p className="p0 footer-gray">&copy; {adminDetail.name} {year}</p>
                        </div>
                    </li>
                    <li className="">
                        <div className="flex-row alc">
                            <div className="section-content">
                                <p className="footer-gray">
                                    Powered By :
                                </p>
                            </div>
                            <div className="section-content">
                                <a href="https://www.reecosys.com/" target="_blank" rel="noopener noreferrer" >
                                    <p className="footer-gray">
                                        REECOSYS
                                    </p>
                                </a>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </div>
      </div>
      
    </>
  );

  
}