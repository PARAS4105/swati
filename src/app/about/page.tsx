'use client';

import Link from 'next/link'
 
export default function Page() {
  return (
    <Link
      href="/"
      onNavigate={(e) => {
        // Only executes during SPA navigation
        
        // e.preventDefault()
      }}
    >
      Dashboard
    </Link>
  )
}