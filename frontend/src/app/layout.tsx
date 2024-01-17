import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Todoアプリ</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
