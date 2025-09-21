import React from 'react';

export const metadata = {
  title: 'AGBKlar.de - KI-gestützte AGB-Zusammenfassungen',
  description: 'Verstehe endlich, was in deinen Verträgen steht. KI-gestützte AGB-Zusammenfassungen – klar und verständlich.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
