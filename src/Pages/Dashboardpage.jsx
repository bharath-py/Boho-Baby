import React from 'react'
import Header from '../components/Layout/Header'
import Sidebar from '../components/Layout/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'

function DashboardPage() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
