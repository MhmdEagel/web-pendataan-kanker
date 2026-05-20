import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout'
import React from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  )
}
