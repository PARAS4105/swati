import {  useContext  } from "react";
import { PropertyListContext } from '../../contexts/PropertyListContext';

type Project = any;
type PropertyListContextType = {
propertylist: Project[];
completedPropertylist: Project[];
};

const { propertylist, completedPropertylist } = useContext(PropertyListContext) as PropertyListContextType;


export async function generateStaticParams() {
    
    return  propertylist.map((element) =>{
        return element.slug;
    })

//   const slugs = ['about-us', 'contact', 'services'];

  
}
