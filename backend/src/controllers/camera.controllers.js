import { getCameras } from "../Services/camera.services.js";

export async function fetchCameras(req, res) {
    try {
      const cameras = await getCameras();
      res.status(200).json({
        success: true,
        message: "Cameras with incidents fetched successfully",
        cameras,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch cameras",
        error: err.message,
      });
    }
  }
  