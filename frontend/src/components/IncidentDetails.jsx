"use client";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Plus,
  UserRoundSearchIcon,
  DoorOpen,
  Crosshair,
  ChevronRight,
} from "lucide-react";
import { fetchIncidents, resolveIncident, counts } from "./api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIncidents,
  setResolved,
  setUnresolved,
} from "@/store/incidents/slice";

export default function IncidentDetails() {
  const dispatch = useDispatch();
  const { incidents, resolved, unresolved } = useSelector(
    (state) => state.incident
  );
  const [showResolved, setShowResolved] = useState(false);

  const loadIncidents = async () => {
    const data = await fetchIncidents(showResolved);
    dispatch(setIncidents(data));
  };

  const handlecount = async () => {
    const data = await counts();
    dispatch(setResolved(data.counts.resolved));
    dispatch(setUnresolved(data.counts.unresolved));
  };

  useEffect(() => {
    loadIncidents();
    handlecount();
  }, [showResolved, resolved, unresolved]);

  const handleResolve = async (id) => {
    try {
      await resolveIncident(id);
      await loadIncidents();
      await handlecount();
    } catch (err) {
      console.error("Failed to update incident status:", err);
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case "Unauthorised Access":
        return <DoorOpen size={14} className="text-yellow-400" />;
      case "Face Recognised":
        return <UserRoundSearchIcon size={14} className="text-blue-400" />;
      case "Gun Threat":
        return <Crosshair size={14} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="pw-full md:w-[45%] h-full bg-[#1A1A1A] text-white p-4 rounded-md overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
        <div className="flex items-center gap-1">
          <AlertTriangle
            size={26}
            className="text-red-400 bg-red-900 rounded-full p-1"
          />
          <h2 className="text-white font-semibold text-md">
            {showResolved ? `${resolved} Resolved` : `${unresolved} Unresolved`}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Plus
            size={16}
            className="text-white hover:text-yellow-400 cursor-pointer"
          />
          <UserRoundSearchIcon
            size={16}
            className="text-white hover:text-yellow-400 cursor-pointer"
          />
          <DoorOpen
            size={16}
            className="text-white hover:text-yellow-400 cursor-pointer"
          />
          <span
            onClick={() => setShowResolved((prev) => !prev)}
            className="text-white text-sm bg-black border-[#404040] border rounded-2xl px-2 py-1 cursor-pointer"
          >
            {showResolved ? "Show Unresolved" : "Show Resolved"}
          </span>
        </div>
      </div>

      <div className="overflow-y-scroll h-[428px] pr-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="flex items-start gap-3 mb-4 border-b border-gray-700 pb-3"
          >
            <img
              src={incident.thumbnail}
              alt="Incident"
              className="w-20 h-16 object-cover rounded"
            />
            <div className="flex-1 text-xs">
              <div className="flex items-center gap-1 font-bold text-white">
                {getIconForType(incident.type)}
                {incident.type}
              </div>
              <br />
              <div className="text-gray-400">Camera ID: {incident.cameraId}</div>
              <div className="text-gray-500">
                {new Date(incident.timestamp).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                |{" "}
                {new Date(incident.timestamp).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <button
              className="flex items-center gap-1 text-yellow-400 text-xs hover:underline cursor-pointer"
              onClick={() => handleResolve(incident.id)}
            >
              {showResolved ? "Reopen" : "Resolve"}
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
