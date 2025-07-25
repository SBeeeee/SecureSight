import React from 'react'
import Navbar from '@/components/Navbar'
import DashboardView from '@/components/Dashboard'
import TimelineViewer from '@/components/TimeLineViewer'
export default function page() {
  return (
    <div className="overflow-x-hidden">
    <Navbar/>
    <DashboardView/>
    <TimelineViewer/>
    </div>
  )
}
