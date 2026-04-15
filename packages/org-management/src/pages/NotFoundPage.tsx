import { useNavigate } from 'react-router-dom';
import { Button, ContentTemplate } from 'hugo-ui';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ContentTemplate
      type="error"
      pageTitle="Page not found"
      errorMessage="The route you opened is not part of the organization management dashboard."
      actionItems={
        <Button level="secondary" colorTheme="grey" size="medium" onClick={() => navigate('/')}>
          Back to organizations
        </Button>
      }
      onBack={() => navigate(-1)}
    />
  );
}
