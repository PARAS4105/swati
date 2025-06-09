const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL_ADMIN = process.env.NEXT_PUBLIC_API_URL_ADMIN;
const Authorization = "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093";
const masterUserId =  "373"
  


// export async function fetchLinks() {
//   try {
//     const response = await fetch(`${API_URL}/links`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch links');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching links:', error);
//     return [];
//   }
// }


export async function adminDetails() {
  try {
    const response = await fetch(`${API_URL_ADMIN}/admin/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        user_name: "swatiprocon",
      }),
    });

    const data = await response.json();
    return data;

    // if (!response.ok) {
    //   throw new Error(`Failed to fetch admin details: ${response.statusText}`);
    // }

  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; // return null to clearly indicate failure
  }
}
export async function propertyDetails(masterUserId) {
  try {
    const response = await fetch(`${API_URL}/properties/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        all_detail : "1",
        master_user_id: masterUserId,
				logged_in_master_user_id: masterUserId,
      }),
    });

    const data = await response.json();

    
    return data;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; // return null to clearly indicate failure
  }
}
export async function completedPropertyDetails(masterUserId) {
  try {
    
    

    const response = await fetch(`${API_URL}/properties/completed_properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        all_detail : "1",
        master_user_id: masterUserId,
				logged_in_master_user_id: masterUserId,
      }),
    });

    const data = await response.json();

    
    return data;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; // return null to clearly indicate failure
  }
}

export async function pagesDetails(masterUserId) {
  try {
    

    const response = await fetch(`${API_URL_ADMIN}/pages/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        group_id : "634",
        master_user_id: masterUserId,
				logged_in_master_user_id: masterUserId,
      }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; 
  }
}
export async function socialMediaDetails(masterUserId) {
  try {
    

    const response = await fetch(`${API_URL_ADMIN}/social_page/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        master_user_id: masterUserId,
				logged_in_master_user_id: masterUserId,
      }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; 
  }
}
export async function homeDetails(masterUserId) {
  try {
    

    const response = await fetch(`${API_URL_ADMIN}/home/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        master_user_id: masterUserId,
				logged_in_master_user_id: masterUserId,
      }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; 
  }
}

export async function projectDetails({masterUserId , slug}){
try {
    const response = await fetch(`${API_URL}/properties/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Authorization}`,
      },
      body: JSON.stringify({
        all_detail : "1",
        master_user_id: masterUserId,
				logged_in_master_user_id: masterUserId,
        slug : slug
      }),
    });

    const data = await response.json();

    
    return data;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return null; // return null to clearly indicate failure
  }
}