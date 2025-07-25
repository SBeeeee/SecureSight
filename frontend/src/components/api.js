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
