import { useNavigate } from 'react-router-dom';
import { ContentTemplate } from 'hugo-ui';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ContentTemplate
      type="error"
      pageTitle="Page not found"
      errorMessage="The requested User Management route does not exist."
      onBack={() => navigate('/')}
    />
  );
}
