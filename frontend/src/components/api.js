import axiosInstance from "@/utils/axiosInstance";

export async function fetchIncidents(resolved = false) {
  try {
    const query = new URLSearchParams();
    query.append("resolved", resolved.toString());

    const res = await axiosInstance.get(`/incidents?${query.toString()}`);
    return res.data.incidents;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
}

export async function resolveIncident(id) {
    try {
      const res = await axiosInstance.patch(`/incidents/${id}/resolve`);
      return res.data;
    } catch (error) {
      console.error("Error resolving incident:", error);
      throw error;
    }
}

export async function counts(){
  try{
      const res=await axiosInstance.get(`/incidents/getcount`);
      return res.data;
  }
  catch(error){
    console.error("Error resolving incident:", error);
      throw error;
  }
}