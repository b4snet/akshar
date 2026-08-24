import { createBrowserRouter } from 'react-router'
import { AppShell } from './AppShell'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export function createAppRouter() {
  return createBrowserRouter([
    {
      element: <AppShell />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])
}
