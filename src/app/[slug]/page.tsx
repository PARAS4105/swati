"use client";

import {projectDetails} from "../../services/api"
import {  useContext ,use , useEffect, useState  } from "react";
import { redirect } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import ReadMore from "../../components/ReadMore"
import WalkthroughVideo from "../../components/Walkthrough"
import styles from "./page.module.css"
import { Fancybox } from "@fancyapps/ui";
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';


type Props = {
   params: Promise<{ slug: string }>;
};



export default function ProjectDetailPage({ params }: Props){
    const { slug } = use(params);

  const [projectDetail, setProjectDetail] = useState<any>(null);
  const [countryFlag, setCountryFlag] = useState<any>(false);
  const [isMobilescreen , setMobileScreen] = useState<any>(false);
  const [selectedTab , setSelectedTab] = useState<any>("3bhk");
  const [activeImage , setActiveImage] = useState<any>("");
const [showNextImages, setShowNextImages] = useState(false);

const fancyboxGroupName = "project-gallery-fancy";

useEffect(() => {
  if (window.innerWidth < 767) {
    setMobileScreen(true);
  }

//   const elements = document.querySelectorAll(`[data-fancybox="${fancyboxGroupName}"]`);

//  Fancybox.defaults.plugins = [Thumbs];

   Fancybox.bind(`[data-fancybox=${fancyboxGroupName}]`, {
    Carousel: {
      infinite: true
    }
  });

  return () => {
    Fancybox.unbind(`[data-fancybox=${fancyboxGroupName}]`);
    Fancybox.close();
  };
}, [slug]);

  useEffect(() => {
     if(window.innerWidth < 767){
        setMobileScreen(true)
    }

    async function fetchData() {
      const data = await projectDetails({
        masterUserId: "373",
        slug: slug,
      });


      if(data.success == 1){


        let activeImage = "";

        if (data.data[0].gallery_data[0].image[0].title && data.data[0].gallery_data[0].image[0].title != '') {
            activeImage = data.data[0].gallery_data[0].image[0].title
        } else {
            activeImage = '';
        }
        console.log(activeImage)
        setActiveImage(activeImage);

          setProjectDetail(data.data[0]);
        console.log(data.data[0])
      }else {
        redirect("/")
      }
    }

    fetchData();
  }, [slug]);

  if(projectDetail == null){
    return false;
  }
  else {
    return(
        <>
         <div className="reecosys-main-wrapper reecosys-detail-wrapper" id="reecosys-main-wrapper"
             onClick={() => {setCountryFlag(false)}}>
                <div id="reecosys-list-wrapper" className="relative">
                    <section className={`reecosys-section reecosys-banner-section relative ${projectDetail.project_id == 722 ? "four-bhk-banner" : "" } `} id="reecosys-project-detail-section-1">
            { projectDetail.project_id == 801 && (<div className="project-signia-banner-text" >
                <div className="banner-title banner-title-border-div ">
                    <h2 className="white-color">
                        {projectDetail.project_title}
                    </h2>
                </div>
                <div className="flex-row flex-wrapgap1 alc inner-flex-smallest" style={{filter: "invert(1)"}}>
                    <div className={`project-information-div flex-row alc inner-flex-smallest ${isMobilescreen ? "w100" : ""} `}>
                        <div className="building-icon common-icon">
                            <img src="/images/icon/building.svg" alt="reecosys"/>
                        </div>
                        <div className="section-textpara banner-detail-row-grid-text">
                            <p className="capitalize">
                                4 BHK Apartment
                            </p>
                        </div>
                    </div>

                    <div className={`project-information-div flex-row alc inner-flex-smallest ${isMobilescreen ? "w100" : ""} `}>
                        <div className="building-icon common-icon">
                            <img src="/images/icon/location.svg" alt="reecosys"/>
                        </div>
                        <div className="section-textpara">
                            <p className="capitalize">
                                Corporate Road, Prahladnagar
                            </p>
                        </div>
                    </div>
                </div>
            </div>)}

            {projectDetail.banners_data.images.length > 0 &&
                (<div >
                    <Swiper  spaceBetween={30} slidesPerView={1}  loop >

                    { projectDetail.banners_data.images.map((banner_data:any , index:any)=>(
                        <SwiperSlide key={index}>
                        { banner_data.image_web_type == 'image' && banner_data.image_web_full && projectDetail.project_id != '772' && (<div className="project_banner_image relative overflow ">
                            <img src={`${banner_data.image_web_full}&w=1903&q=100`}
                                alt={projectDetail.project_title} className="hide-tab-mobile"/>
                            <img src={`${banner_data.image_web_full}&h=1300&q=100`}
                                alt={projectDetail.project_title} className="visible-tab-mobile"/>
                        </div>)}
                        { banner_data.image_web_type == 'image' && banner_data.image_web_full && projectDetail.project_id == '772' && (<div className={`project_banner_image ${styles.project_banner_image_upcoming} relative overflow`} 
                            >
                            <img src="/images/upcoming-banner.jpg"
                                alt={projectDetail.project_title} className="hide-tab-mobile"/>
                            <img src="{{banner_data.image_web_full}}&h=784&w=590&q=100"
                                alt={projectDetail.project_title} className="visible-tab-mobile"/>
                        </div>)}
                    </SwiperSlide>
                    )) }
                    </Swiper>

                </div>)}

            </section>
        
            { (projectDetail.highlights.length > 0 || projectDetail.rera_number || projectDetail.document_data.length > 0 || projectDetail.big_text_pain) && (<section className="reecosys-section relative section-padding" id="reecosys-project-detail-section-3">
            <div className="main-container">
                <div className=" inner-flex inner-flex-small2">
                    <div className="inner-flex inner-flex-smallest">
                        { projectDetail.project_title && (<div className="banner-title banner-title-border-div"
                            >
                            <h2 className=" uppercase" data-aos="fade-in"  data-aos-duration="1000" data-aos-delay="400"
                                dangerouslySetInnerHTML={{ __html: projectDetail.project_title }}
>
                            </h2>
                        </div>)}
                    </div>

                    <div className="new-detail-banner-abs-flex"data-aos="fade-in"  data-aos-duration="1000" data-aos-delay="700">
                        <div className="inner-flex inner-flex-smallest">
                            <div className="new-detail-highlight-grid">
                                { projectDetail.highlights.map((data:any , index:any)=>( 
                                    <div key={index} >
                                    <div className="section-paragraph">
                                        <p className="capitalize  semibold-fonts">
                                            {data.tag_line}
                                        </p>
                                    </div>
                                    <div className="section-paragraph">
                                        <p className="capitalize gray-color regular-fonts">
                                            {data.name}
                                        </p>
                                    </div>
                                </div>))}
                                {projectDetail.rera_number && (<div 
                                    style={{flexBasis: "100%" , opacity: "0.4"}}>
                                    <div className="section-paragraph">
                                        <p>
                                            <span className="primary-color bold-fonts">
                                                RERA :
                                            </span>
                                            {projectDetail.rera_number}
                                        </p>
                                    </div>
                                </div>)}
                            </div>
                            {projectDetail.big_text_pain && (<div className=" section-paragraph readmoreText detailReadMore"
                                data-aos="fade-in" data-aos-duration="1000" data-aos-delay="400"
                                >
                                <p>
                                    <ReadMore text={projectDetail.big_text_pain} maxLength={0} />
                                </p>
                            </div>)}
                        </div>
                    </div>

                    <div className="" data-aos="fade-in"  data-aos-duration="1000" data-aos-delay="1100">
                        <ul className="flex-row  downloadDataFlex">
                            <li  className={`${isMobilescreen ? "w100" : ""}`}>
                                <button className={`reecosys-template-button button-style-secondary ${isMobilescreen ? "w100" : ""} `}
                                // ng-click=" inquire_popup_click(); inquiry_from_click(); "
                                >
                                <span className="material-symbols-outlined">
                                    chat
                                </span>
                                <p className="capitalize">
                                    Inquire Now
                                </p>
                                </button>
                            </li>
                            { projectDetail.document_other_data != undefined && projectDetail.document_other_data.length > 0 && projectDetail.document_other_data.filter((download_data:any) => download_data.type == 'Brochure').map((download_data:any , index:any) => (  
                                <li key={index}
                                className={`${isMobilescreen ? "w100" : "" }`}>
                                {/* ng-click="inquire_popup_click(); inquiry_from_click(download_data.type); "> */}
                                <button className={`reecosys-template-button button-style-primary ${isMobilescreen ? "w100" : "" } `}>
                                    <span className="material-symbols-outlined">
                                        download
                                    </span>
                                    <p className="capitalize">
                                        {isMobilescreen ? "" : "Download "}{download_data.type}
                                    </p>
                                </button>
                            </li>))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>)}

        { projectDetail.project_id != '759' && projectDetail.virtual_data.length > 0 && projectDetail.virtual_data.filter((video:any) => (video.type === 'walk-through' && video.image != "")).map((video:any , index:any) =>(<section key={index} 
        className="reecosys-section relative" data-aos="fade-in" data-aos-delay="400" data-aos-duration="1000"
            id="reecosys-project-detail-section-4" >
            <div className="main-container">
                <div className="inner-flex inner-flex-medium inner-flex-center">
                    <div className="section-title">
                        {projectDetail.project_id != '763' && projectDetail.project_id != '764'&& (
                            <h2 className="uppercase text-center" data-aos="fade-in"  data-aos-duration="1000" data-aos-delay="300" >
                            Sample House
                        </h2>)}
                        {(projectDetail.project_id == '763' || projectDetail.project_id == '764') && (
                            <h2 className="uppercase text-center" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
                            Walk-Through
                        </h2>)}
                    </div>
                    <div className="walkthrough-project-thumb  relative">
                        <div className="walk-thumbnail-image relative" data-aos="fade-in" data-aos-duration="1000"
                            data-aos-delay="600">
                                <WalkthroughVideo virtualDataArray={video.url} />
                        </div>
                    </div>
                </div>
            </div>
        </section>))}

        {  projectDetail.project_id == '760' && (<div  className="section-padding pb0">
             <section  className="reecosys-section relative " data-aos="fade-in"  data-aos-delay="400" data-aos-duration="1000"
                 id="reecosys-project-detail-section-4" >
                 <div className="main-container">
                    <div className="inner-flex inner-flex-medium inner-flex-center">
                        <div className="section-title">
                            <h2 className="uppercase text-center "data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
                                Walk-Through
                            </h2>
                        </div>
                        <div className="walkthrough-project-thumb  relative">
                            <div className="walk-thumbnail-image relative " data-aos="fade-in" data-aos-duration="1000"
                                data-aos-delay="600">
                                    <WalkthroughVideo virtualDataArray="https://www.youtube.com/embed/zdCbBrTOW5k?si=cTK_Q-8rXpbGfrKe?mute=0&loop=1&enablejsapi=1&controls=1&cc_load_policy=0" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>)}

 
         { projectDetail.project_id == '767' && (<div  className="section-padding pb0">
            <section className="reecosys-section relative" data-aos="fade-in"  data-aos-delay="400" data-aos-duration="1000">
                <div className="main-container">
                    <div className="inner-flex inner-flex-medium inner-flex-center">
                        <div className="section-title">
                            <h2 className="uppercase text-center" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
                                Sample House
                            </h2>
                        </div>

                        <div className={` ${styles.tab_buttons}`}>
                            <button onClick={()=>{setSelectedTab("3bhk")}} className={`${ selectedTab === '3bhk' ? styles.active_tab : "" }`}>
                                3 BHK
                            </button>
                            <button onClick={()=>{setSelectedTab("4bhk")}} className={`${ selectedTab === '4bhk' ? styles.active_tab : "" }`}>
                                4 BHK
                            </button>
                        </div>

                        <div className="tab-content w100">
                            { selectedTab === '3bhk' && (<div>
                                <div className="walkthrough-project-thumb relative">
                                    <div className="walk-thumbnail-image relative " data-aos="fade-in"  data-aos-duration="1000"
                                        data-aos-delay="600">
                                            <WalkthroughVideo virtualDataArray="https://www.youtube.com/embed/q9lEBF_N3B8?mute=0&loop=1&enablejsapi=1&controls=1&cc_load_policy=0"></WalkthroughVideo>
                                        
                                    </div>
                                </div>
                            </div>)}

                            { selectedTab === '4bhk' && (<div >
                                <div className="walkthrough-project-thumb relative">
                                    <div className="walk-thumbnail-image relative " data-aos="fade-in"  data-aos-duration="1000"
                                        data-aos-delay="600">
                                            <WalkthroughVideo virtualDataArray="https://www.youtube.com/embed/7-UBgFTc_NI?mute=0&loop=1&enablejsapi=1&controls=1&cc_load_policy=0" ></WalkthroughVideo>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </section>
        </div>)}

        { projectDetail.project_id == '759' && (<div className="section-padding pb0">
            <section className="reecosys-section relative " data-aos="fade-in"  data-aos-delay="400" data-aos-duration="1000">
                <div className="main-container">
                    <div className="inner-flex inner-flex-medium inner-flex-center">
                        <div className="section-title">
                            <h2 className="uppercase text-center" data-aos="fade-in"  data-aos-duration="1000" data-aos-delay="300">
                                Sample House
                            </h2>
                        </div>
                        <div className={` ${styles.tab_buttons}`}>
                            <button onClick={()=>{setSelectedTab("3bhk")}} className={`${ selectedTab === '3bhk' ? styles.active_tab : "" }`}>
                                3 BHK
                            </button>
                            <button onClick={()=>{setSelectedTab("4bhk")}} className={`${ selectedTab === '4bhk' ? styles.active_tab : "" }`}>
                                4 BHK
                            </button>
                        </div>

                        <div className="tab-content w100">
                            {selectedTab === '3bhk' && <div >
                                <div className="walkthrough-project-thumb relative">
                                    <div className="walk-thumbnail-image relative " data-aos="fade-in"  data-aos-duration="1000"
                                        data-aos-delay="600">
                                        <WalkthroughVideo virtualDataArray="https://www.youtube.com/embed/7o-o3ND2TV8?si=1hma7wQDpy50TZaw?mute=0&loop=1&enablejsapi=1&controls=1" ></WalkthroughVideo>
                                    </div>
                                </div>
                            </div>}

                            { selectedTab === '4bhk' && <div>
                                <div className="walkthrough-project-thumb relative">
                                    <div className="walk-thumbnail-image relative " data-aos="fade-in" data-aos-duration="1000"
                                        data-aos-delay="600">
                                            <WalkthroughVideo virtualDataArray="https://www.youtube.com/embed/_gPcnLJa_CY?si=IGuQJRyAK9Bf2RM6?mute=0&loop=1&enablejsapi=1&controls=1" ></WalkthroughVideo>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </section>
        </div>)}

        {projectDetail.project_id == '767' && (<div  className="section-padding pb0">
            <section className="reecosys-section relative" data-aos="fade-in" data-aos-delay="400" data-aos-duration="1000"
                id="reecosys-project-detail-section-4">
                <div className="main-container">
                    <div className="inner-flex inner-flex-medium inner-flex-center">
                        <div className="section-title">
                            <h2 className="uppercase text-center" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
                                Walk-Through
                            </h2>
                        </div>
                        <div className="walkthrough-project-thumb  relative">
                            <div className="walk-thumbnail-image relative aos fadeIn" data-aos="fade-in" data-aos-duration="1000"
                                data-aos-delay="600">
                                <WalkthroughVideo virtualDataArray="https://www.youtube.com/embed/9kWq2NVTK-w?si=R5mc4SXgRdL3m0h8?mute=0&loop=1&enablejsapi=1&controls=1" ></WalkthroughVideo>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>)}

        { projectDetail.gallery_data[0].image.length > 0 && (<section id="reecosys-project-detail-section-5" style={{minHeight: "75vh"}}
            className="section-padding reecosys-section">
             {projectDetail.gallery_data.map((gallery:any , index:any) => (<div key={index} id="reecosys-detail-section-gallery" >
                <div className="inner-flex inner-flex-small">
                    <div className="main-container">
                        <div className="flex-row w100mob alc j-c-c relative " data-aos="fade-top" data-aos-duration="1000"
                            data-aos-delay="400">
                            { (gallery.title || gallery.tag_line) && (
                                <div className="w100mob relative" >
                                <div className="inner-flex inner-flex-smallest inner-flex-center w100mob">
                                    <div className="section-title uppercase relative">
                                        <h2 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
                                            Images
                                        </h2>
                                    </div>
                                    { projectDetail.project_id == 761 && (
                                        <div className="flex-row gallery-tab-images alc j-c-c inner-flex-smallest actualClickPara">
                                        <p onClick={()=>{setActiveImage('Actual') ; setShowNextImages(false);}}
                                            className={` ${activeImage == 'Actual' ? 'active' : ""} `}>
                                            Actual Image
                                        </p>
                                        <p onClick={()=>{setActiveImage('3D');  setShowNextImages(false);}}
                                            className={` ${activeImage == '3D' ? 'active' : ""} `}>
                                            3D Image
                                        </p>
                                    </div>)}
                                </div>
                            </div>)}


                        </div>
                    </div>

                    <div className="main-container">
                        <div className="hide-tab-mobile">
                          <div className="gallery-image-grid">
                            {gallery.image.map((gallaryImgData:any, index:any) => {
                               const shouldShow = (() => {
                                    if (activeImage === "") {
                                        return index < 6;
                                    } else if (activeImage === "Actual") {
                                        return index < 6;
                                    } else if (activeImage === "3D") {
                                        return index >= 6 && index <= 11;
                                    } else {
                                        return false;
                                    }
                                })();

                                if (!shouldShow) return null;

                                let sizeParam = "";
                                switch (index) {
                                    case 0:
                                    case 5:
                                    case 11:
                                        sizeParam = "&w=888&q=100";
                                        break;
                                    case 1:
                                        sizeParam = "&w=520&q=100";
                                        break;
                                    case 2:
                                    case 3:
                                    case 8:
                                    case 9:
                                        sizeParam = "&h=432&q=100";
                                        break;
                                    case 4:
                                    case 10:
                                        sizeParam = "&h=794&q=100";
                                        break;
                                    case 6:
                                    case 7:
                                        sizeParam = "&w=888&q=100";
                                        break;
                                    default:
                                        sizeParam = "&w=888&q=100";
                                }

                                return (
                                    <div className="image-item relative" key={index}>
                                        <a
                                            data-fancybox={fancyboxGroupName}
                                            href={gallaryImgData.image_full}
                                            className="project-gallery-fancy relative"
                                            target="_self"
                                        >
                                            <img
                                                src={`${gallaryImgData.image}${sizeParam}`}
                                                alt={projectDetail.size_price}
                                                className="image-cover lazyload"
                                                data-aos="fade-in"
                                                data-aos-duration="1000"
                                                data-aos-delay={`0.${index * 3}s`}
                                            />
                                            <div className="project-glaery-overlay"></div>
                                            <div className="project-enlarge-icons-galeery">
                                                <span className="material-symbols-outlined">pan_zoom</span>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                    </div>

                     {/* <div className="main-container">
                        <div className="btns-midflex-detail ">
                            <a ng-repeat="gallaryImgData in gallery.image" href="{{gallaryImgData.image_full}}"
                                data-fancybox="project-gallery-fancy4" target="_self" ng-show="$index == 0">
                                <button className="reecosys-template-button button-style-primary-outline aos fade_top"
                                    data-aos-duration="1000" data-aos-delay="0.4s" ng-className="{'w100' : isMobilescreen }">
                                    <span className="material-symbols-outlined">
                                        photo_library
                                    </span>
                                    <p>
                                        View All Images
                                    </p>
                                </button>
                            </a>
                           
                            <div className="" ng-if="projectDetail.amenities_data.length > 6 ">
                                <button className="reecosys-template-button button-style-primary-outline aos fade_top"
                                    data-aos-duration="1000" data-aos-delay="0.8s" ng-click="amenityClick()"
                                    ng-className="{'w100' : isMobilescreen }">
                                    <span className="material-symbols-outlined">
                                        category
                                    </span>
                                    <p className="capitalize">
                                        Amenities
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>  */}
                </div>
            </div>))}
        </section>)}

            </div>
            </div>
        </>
    )
  }

}

