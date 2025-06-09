"use client";

import Link from "next/link";
// import { propertyDetails , completedPropertyDetails , pagesDetails  , socialMediaDetails} from "../services/api"
import { useEffect , useState } from "react";
import { usePathname } from "next/navigation";
import styles from './Header.module.css';




export default  function Header({ adminDetail, propertylist, completedPropertylist, pageList, socialList }) {
  
  const pathName = usePathname();
  
//   const [adminDetail, setAdminDetail] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
//   const [propertylist, setpPropertylist] = useState(null);
//   const [pageList, setPageList] = useState(null);
//   const [socialList, setSocialList] = useState(null);
  const [megaMenuCategory, setMegaMenuCategory] = useState('');
//   const [completedPropertylist, setCompletedPropertylist] = useState(null);
    const [megaMenuActive, setMegaMenuToggle] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
     const [activeIndex, setActiveIndex] = useState(null);
  
       const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

//     async function loadPages(){
//     let data = await pagesDetails();
//     console.log(data)
//     if(data.success == 1){
//        setPageList(data.data);
//     }
//   }
  
 async function getCategory() {
   try {
    // const data = await propertyDetails();
    const categorySet = new Set();
    const categoryArray = [];
    // setpPropertylist(data.data);
    propertylist.forEach((value) => {
      if (!categorySet.has(value.category)) {
        categoryArray.push({ category: value.category });
        categorySet.add(value.category);
      }
    });
    setCategoryList(categoryArray);

    
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  }
// async function loadCompletedProperties(){
//     let data = await completedPropertyDetails();
//     console.log(data)
//     if(data.success == 1){
//        setCompletedPropertylist(data.data);
//     }
//   }
//     async function loadSocialList(){
//       let data = await socialMediaDetails();
//       console.log(data)
//       if(data.success == 1){
//          setSocialList(data.data);
//       }
//     }

  useEffect(() => {
    
    getCategory();
    // loadCompletedProperties();
    // loadPages();
    // loadSocialList();
    // const storedData = localStorage.getItem("userData");
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    // //   setAdminDetail(parsedData);
    // }
    setIsMounted(true);
  }, []);

    const megaMenuClick = (category) => {
      if(megaMenuCategory == category){
        setMegaMenuCategory('');
        setMegaMenuToggle(false);
      }else{
        setMegaMenuCategory(category);
        setMegaMenuToggle(true);
      }
  };
    const megaMenuClickClose = () => {
        setMegaMenuCategory('');
        setMegaMenuToggle(false);
  };

  if (!categoryList || categoryList.length === 0) return null;
  
  
  return (


    <div className="header-wrapper">
      <div className="header-flex">
        <div className="header-logo">
          <Link href="/">
             {isMounted && adminDetail?.logo && (
              <img src={adminDetail.logo} alt={adminDetail.name || "Logo"} />
            )}
          </Link>
        </div>

        <div className="header-links-ul">
           <ul className="link-font-size">
              {categoryList.map((categoryData, index) => (
                 <li key={index} className="hide-tab-mobile" onClick={(e) => {
                    setMenuToggle(false);
                    megaMenuClick(categoryData.category);
                    e.stopPropagation();
                  }}>
                  <a href="#" className={megaMenuCategory === categoryData.category ? 'active' : ''}>
                    <p className={`capitalize ${megaMenuCategory === categoryData.category ? 'secondary-color' : ''}`}>
                      {categoryData.category === 'Commercial'? 'Offices & Retail': categoryData.category}
                    </p>
                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                  </a>
                </li>
              ))}
               <li className="visible-tab-mobile">
                    <div onClick={(e) => { setMenuToggle(false);}}>
                        <img src="/images/icon/call.svg" alt="Call icon" />
                    </div>
                </li>
                <li >
                    <div className={`menubar ${menuToggle ? 'active' : '' }`} onClick={() => {setMenuToggle(!menuToggle); megaMenuClickClose(); }}>
                        <div className="bar bar-top"></div>
                        <div className="bar bar-middle"></div>
                        <div className="bar bar-bottom"></div>
                    </div>
                </li> 
            </ul>
         </div>
      </div>

      {megaMenuActive && propertylist.length > 0 && <div className="megamenu-wrapper" id="megamenu-wrapper" >
            <div className="megamenugrid">
               <div className="megamenuContent">
               {propertylist.map((data, index) => (
                  data.category === megaMenuCategory && (<div key={index} className={`megamenuItem relative inner-flex 
                ${pathName === data.slug ? "active" : "" }`} >
                <Link key={data.project_title} href={data.slug} className="inner-flex " onClick={()=> {megaMenuClickClose()}}
                >
                    <div className="relative">
                        {data.banner_data.image_web_type == 'image' && <div className="project-img-list overflow relative">
                            <img 
                                src={`${data.banner_data.image_web_full}&h=1500&w=1920&q=100`}
                                alt={data.project_title}  style={{aspectRatio: "32/25"}} />
                        </div>}

                        { data.banner_data.image_web_type == 'video' && <div className="project-img-list relative" >
                            <video autoplay muted loop playsinline>
                                <source src={data.banner_data.image_web_full} type="video/mp4" />
                            </video>
                        </div>}
                    </div>

                    <div className="project-info-list">
                        <div className="inner-flex">
                            <div className="section-paragraph flex-row j-c-sb alc">
                                <h2 className="text-uppercase charter_regular">
                                    {data.project_title}
                                </h2>
                                <div className="project-arrow-icon common-icon">
                                    <img src="/images/icon/right_arrow_line.svg" alt={data.project_title} />
                                </div>
                            </div>
                            <div className="flex-row flex-wrapgap1 alc inner-flex-smallest">
                                {data.size_price && <div className={`project-information-div flex-row alc inner-flex-smallest ${window.innerWidth < 767 ? "w100" : "" } `}>
                                    <div className="building-icon common-icon">
                                        <img src="/images/icon/building.svg" alt="Building Icon" />
                                    </div>
                                    <div className="section-textpara banner-detail-row-grid-text">
                                        <p className="capitalize ellipsis-1">
                                            {data.size_price}
                                        </p>
                                    </div>
                                </div>}

                                {data.location && <div className={`project-information-div flex-row alc inner-flex-smallest ${window.innerWidth < 767 ? "w100" : "" } `}>
                                    <div className="building-icon common-icon">
                                        <img src="/images/icon/location.svg" alt="Location Icon" />
                                    </div>
                                    <div className="section-textpara">
                                        <p className="capitalize ellipsis-1">
                                            {data.location}
                                        </p>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>)
            
               ))}

                </div>
            </div>
        </div>
        }



      {/* {megaMenuActive && <div className={`click-overlay active`}
    onClick={()=>megaMenuClickClose()}></div>} */}

    <div className={`click-overlay ${megaMenuActive || menuToggle ? "active" : "" } `} onClick={()=>{megaMenuClickClose() ; setMenuToggle()}}></div>

    <div className={`mobile_menu_wrapper inner-flex inner-flex-medium j-c-sb  ${menuToggle ? "mobileMenuActive" : "" } `}>
      <div className="header-navigation-links" >
        <ul className="">
            
            { categoryList.map(( category_data , index ) =>  (
                <li key={index} className=" accordion-block" 
                id="accordion">
                <div onClick={()=>toggleAccordion(index)} className={`flex-row j-c-sb header_accordion accordion_click  ${activeIndex === index ? "active" : ""} `}>
                    <div className="section-paragraph">

                        <p className="capitalize semibold-fonts">{category_data.category == 'Commercial' ?  "Offices & Retail" : category_data.category}</p>

                    </div>
                    <div>
                        <img src="/images/icon/down-arrow.svg" alt="" className="manu-accordian-downarrow" />
                        <img src="/images/icon/up-arrow.svg" alt="" className="manu-accordian-uparrow" />
                    </div>
                </div>
                <div className={`${styles.content_accordian} ${activeIndex === index ? styles.active : ''}`}  >
                    <div>
                        <div className="inner-flex projectList_li inner-flex-zero">
                            {propertylist != null &&  propertylist.length > 0 && propertylist.map((data , index2) => {
                              if(data.category == category_data.category){

                                return (

                                <div key={index2}>
                                  <Link href={data.slug} className="header-hover" onClick={()=> {setMenuToggle(false)} } >
                                      <div className="inner-flex inner-flex-smallest">

                                          <div className="w100 relative">
                                              <img 
                                                  src={`${data.banner_data.image_web_full}&h=752&w=964&q=100`}
                                                  alt="reecosys" />

                                          </div>
                                          <div className=" w100 inner-flex inner-flex-smallest">
                                              <div className="section-paragraph">
                                                  <p className=" header-title capitalize ">
                                                      {data.project_title}
                                                  </p>
                                              </div>
                                              <div className="flex-row flex-wrapgap1 flex-row-mobile inner-flex-smallest">
                                                  <div className="flex-row alc">
                                                      <div className="iconimg">
                                                          <img src="/images/icon/location.svg"  alt="" />
                                                      </div>
                                                      <div className=" section-content">
                                                          <span className="ellipsis-1">{data.location}</span>

                                                      </div>
                                                  </div>
                                                  <div className="flex-row alc">
                                                      <div className="iconimg">
                                                          <img src="/images/icon/building.svg"  alt="" />
                                                      </div>
                                                      <div className=" section-content">
                                                          <span className="ellipsis-1">{data.size_price}</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                                )
                            }})}
                            {completedPropertylist != null && completedPropertylist.length > 0 && completedPropertylist.map((data , index3) => 
                            {
                              if(data.category == category_data.category && data.project_id == '764'){
                                return (<div key={index3}>
                                <Link href={data.slug} className="header-hover" onClick={()=> {setMenuToggle(false)} } >
                                    <div className="inner-flex inner-flex-smallest">
                                        <div className="w100 relative">
                                            <img 
                                                src={`${data.banner_data.image_web_full}&h=752&w=964&q=100`}
                                                alt="reecosys" />
                                        </div>
                                        <div className=" w100 inner-flex inner-flex-smallest">

                                            <div className="section-paragraph">
                                                <p className=" header-title capitalize ">
                                                    {data.project_title}
                                                </p>
                                            </div>
                                            <div className="flex-row flex-wrapgap1 flex-row-mobile inner-flex-smallest">
                                                <div className="flex-row alc">
                                                    <div className="iconimg">
                                                        <img src="/images/icon/location.svg"  alt="" />
                                                    </div>
                                                    <div className=" section-content">
                                                        <span className="ellipsis-1">{data.location}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-row alc">
                                                    <div className="iconimg">
                                                        <img src="/images/icon/building.svg"  alt="" />
                                                    </div>
                                                    <div className=" section-content">
                                                        <span className="ellipsis-1">{data.size_price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>)}})}
                        </div>
                    </div>
                </div>

            </li>))}

            <li>
                <div>
                    <Link href="/completed-projects" className={`capitalize section-paragraph ${pathName == "/completed-projects" ? "active_page" : "" } `} 
                    onClick={() => {setMenuToggle(false)}}
                         title="Completed Projects">
                        <p>
                            Completed Projects
                        </p>
                    </Link>
                </div>
            </li>
            { pageList != null && pageList.length > 0 && pageList.map((data , index) =>  {
              if(data.page_type == '' && data.is_profile_page == 0){
                return ( <li key={index} >
                <div>
                    <Link href={data.slug} className={`capitalize section-paragraph ${pathName == data.slug ? "active_page" : "" } `}  onClick={() => {setMenuToggle(false)}}
                         title={data.page_name} target={data.slug_target}>
                        <p>
                            {data.page_name}
                        </p>
                    </Link>
                </div>
            </li>)
              }})}
            {socialList != null && socialList.length > 0 && 
            (<li className="flex-row alc no-border" >
                 {socialList.map((social , index) => (<div className="navigation-mobile-icon" key={index}  >
                    { social.name == 'facebook' && ( <a href={social.slug}  target="_blank" rel="noopener noreferrer">
                        <img src="/images/icon/social-icons/facebook.svg" alt="facebook" />
                    </a>)}
                    { social.name == 'instagram' && ( <a href={social.slug}  target="_blank" rel="noopener noreferrer">
                        <img src="/images/icon/social-icons/instagram.svg" alt="instagram" />
                    </a>)}
                    { social.name == 'twitter' && ( <a href={social.slug}  target="_blank" rel="noopener noreferrer">
                        <img src="/images/icon/social-icons/twitter.svg" alt="twitter" />
                    </a>)}
                    { social.name == 'linkedin' && ( <a href={social.slug}  target="_blank" rel="noopener noreferrer">
                        <img src="/images/icon/social-icons/linkedin.svg" alt="linkedin" />
                    </a>)}
                    { social.name == 'youtube' && ( <a href={social.slug}  target="_blank" rel="noopener noreferrer">
                        <img src="/images/icon/social-icons/youtube.svg" alt="youtube" />
                    </a>)}
                </div>))}
                

            </li>)}
            

        </ul>
        </div>
      <div className="w100 ">
          <button className="reecosys-template-button button-style-secondary w100 "
              ng-click="inquire_popup_click();  inquiry_from_click(); " data-wow-duration="0.6s" data-wow-delay="0.6s">
              <span className="material-symbols-outlined">
                  chat
              </span>
              <p className="capitalize">
                  Inquire Now
              </p>
          </button>
        </div>
    </div>



    </div>
  );
}