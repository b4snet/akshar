import { Link } from 'react-router'
import { ErrorState } from '../../components/states'

export function NotFoundPage() {
  return (
    <ErrorState
      code="NOT_FOUND"
      title="Page not found"
      description="The page you are looking for does not exist."
    >
      <Link to="/">Return home</Link>
    </ErrorState>
  )
}
