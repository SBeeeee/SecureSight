"use client"
import React, { useState } from "react";

// Theme/colors and event type definitions
const colors = {
  access: "#e74c3c",
  face: "#2980b9",
  multi: "#8e44ad",
  gun: "#aa076a",
  traffic: "#1abc9c",
  rowBg: "#1a1d23",
  bar: "#252f38",
  currentLine: "#fafb47",
};

const eventDetails = {
  "Unauthorised Access": colors.access,
  "Face Recognised": colors.face,
  "Multiple Events": colors.multi,
  "Gun Threat": colors.gun,
  "Traffic congestion": colors.traffic,
};

const cameraData = [
  {
    name: "Camera – 01",
    events: [
      { label: "Unauthorised Access", start: 5, end: 18 },
      { label: "Face Recognised", start: 21, end: 34 },
      { label: "Multiple Events", start: 55, end: 68 },
      { label: "Unauthorised Access", start: 77, end: 90 },
      { label: "Gun Threat", start: 82, end: 93 }
    ],
  },
  {
    name: "Camera – 02",
    events: [
      { label: "Unauthorised Access", start: 7, end: 20 },
      { label: "Face Recognised", start: 34, end: 50 }
    ],
  },
  {
    name: "Camera – 03",
    events: [
      { label: "Traffic congestion", start: 37, end: 58 },
      { label: "Unauthorised Access", start: 73, end: 85 }
    ],
  },
];

const TIME_LABELS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00"
];
const CURRENT_TIME = { slot: 15.7, label: "03:13:23" };

// TimelineBar – shows hour ticks and yellow marker ON TOP ONLY
const TimelineBar = () => (
  <div style={{ position: "relative", height: 36, background: colors.bar, borderRadius: 6, overflow: "hidden", width: "100%" }}>
    {TIME_LABELS.map((lbl, i) => (
      <div key={i} style={{
        position: "absolute", left: `${(i / (TIME_LABELS.length-1)) * 100}%`,
        top: 0, bottom: 0, width: 1, background: "#3a4452"
      }}>
        <span style={{
          position: "absolute", left: -18, top: 15, color: "#adb5bd", fontSize: 12
        }}>{lbl}</span>
      </div>
    ))}
    {/* Yellow marker (top bar only) */}
    <div style={{
      position: "absolute",
      left: `calc(${CURRENT_TIME.slot}% - 2px)`,
      top: 0,
      height: "100%",
      width: 3,
      background: colors.currentLine,
      zIndex: 2,
      boxShadow: "0 0 9px 2px #fcf69ac1"
    }}>
      <span style={{
        position: "absolute", top: -24, left: -33, color: colors.currentLine,
        background: "#1a1d23", borderRadius: 4, padding: "2px 10px 1px 10px", fontWeight: 600, fontSize: 12,
        letterSpacing: 0.2, boxShadow: "0 1px 4px #26230a99"
      }}>{CURRENT_TIME.label}</span>
    </div>
  </div>
);

// Manual "lane assignment" to prevent event overlap for a row of events
function assignLanes(events) {
  const lanes = [];
  const sorted = events.slice().sort((a, b) => a.start - b.start);
  sorted.forEach(ev => {
    let placed = false;
    for (let lane of lanes) {
      if (lane[lane.length - 1].end <= ev.start) {
        lane.push(ev);
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([ev]);
  });
  // Map to [{ ...event, lane:index }]
  let withLane = [];
  lanes.forEach((lane, idx) => lane.forEach(ev => withLane.push({...ev, lane: idx})));
  return {laneCount: lanes.length, withLane};
}

// A single camera row, no overlap, height is fit to number of event lanes
const CameraRow = ({ name, events, selected, onClick }) => {
  const { laneCount, withLane } = assignLanes(events);
  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", background: selected ? "#212337" : colors.rowBg,
        borderRadius: 5, marginBottom: 6, minHeight: 38 + (laneCount-1)*29,
        transition: "background 0.09s", cursor: "pointer", boxSizing: "border-box",
        border: selected ? "2.2px solid #51c8f8" : "2px solid #202124", position: "relative",
        boxShadow: selected ? "0 2px 16px #2c56d699" : undefined,
        maxWidth: "100%", overflow: "hidden"
      }}
      tabIndex={0}
      onClick={onClick}
      aria-pressed={selected ? "true" : "false"}
    >
      <span style={{
        width: 133, flexShrink: 0, textAlign: "right", fontSize: 15, color: selected ? "#69deff" : "#f2f4fa",
        fontWeight: 520, padding: 10, letterSpacing: 0.07, fontFamily: "Poppins, Arial, sans-serif"
      }}>
        📷 {name}
      </span>
      <div style={{
        flex: 1, position: "relative", minHeight: 34, margin: 4, height: 28 * laneCount,
        maxWidth: "100%"
      }}>
        {withLane.map((ev, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${ev.start}%`,
              width: `calc(${ev.end - ev.start}% - 10px)`,
              top: ev.lane * 29,
              height: 24,
              background: eventDetails[ev.label] || "#7c879b",
              color: "#fff",
              borderRadius: 5,
              padding: "2px 12px",
              fontSize: 13,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 5px #1113",
              border: "1.7px solid #2323",
              letterSpacing: 0.12,
              zIndex: 3,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              userSelect: "none",
              cursor: "pointer",
              maxWidth: "100%"
            }}
            title={ev.label}
          >{ev.label}</div>
        ))}
      </div>
    </div>
  );
};

const TimelineViewer = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const camerasToShow = selectedIdx === null ? cameraData : [cameraData[selectedIdx]];

  return (
    <div style={{
      background: "#181c24", color: "#fff", fontFamily: "Poppins, Arial, sans-serif",
      minHeight: "100vh", width: "100vw", position: "relative",
      boxSizing: "border-box", margin: 0, padding: 0, overflowX: "hidden"
    }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", padding: "22px 32px 6px 18px",
      }}>
        <button style={{
          width: 28, height: 28, background: "#252f38", color: "#fff",
          border: "none", borderRadius: "50%", fontSize: 18, marginRight: 8
        }}>{'|'}</button>
        <button style={{
          width: 28, height: 28, background: "#252f38", color: "#fff",
          border: "none", borderRadius: "50%", fontSize: 16, marginRight: 10
        }}>{'▶'}</button>
        <span style={{ marginLeft: 14, color: "#bcc6d4", fontWeight: 600, fontSize: 15 }}>
          03:13:23 (15-Jun-2025)
        </span>
        {selectedIdx !== null &&
          <button onClick={() => setSelectedIdx(null)} style={{
            marginLeft: 20, background: "#222b", color: "#80c6ff",
            borderRadius: 6, border: "none", fontSize: 13, padding: "2px 15px", fontWeight: 600,
            cursor: "pointer"
          }}>
            ← Show All Cameras
          </button>
        }
      </div>
      {/* TimelineBar */}
      <div style={{
        width: "100%", maxWidth: "100vw", background: "#181c24", padding: "0 0 0 148px"
      }}>
        <TimelineBar />
      </div>
      {/* Camera List */}
      <div style={{
        width: "100%", background: "#181c24", padding: "9px 0 0 0",
        borderRadius: 0, maxWidth: "100vw", overflowX: "hidden"
      }}>
        <div style={{
          fontWeight: 700, color: "#a9b7d0", fontSize: 15, margin: "7px 0 7px 150px",
          letterSpacing: 0.23
        }}>Camera List</div>
        {camerasToShow.map((cam, idx) =>
          <CameraRow
            key={idx}
            name={cam.name}
            events={cam.events}
            selected={selectedIdx === null ? false : true}
            onClick={() => setSelectedIdx(selectedIdx === null ? idx : null)}
          />
        )}
        {/* If all are shown, clicking row filters; if filtered, only row shown and button resets */}
        {camerasToShow.length === 0 &&
          <div style={{ color: "#aaa", marginLeft: 170, marginTop: 32, fontSize: 17 }}>No incidents for selection</div>}
      </div>
    </div>
  );
};

export default TimelineViewer;
