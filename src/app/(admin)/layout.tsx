export const metadata = {
  title: 'Website Admin',
  description: 'Sanity.io admin with NextJS created by Hungry Ram Web Design',
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