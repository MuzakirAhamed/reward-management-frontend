import { Button } from "@/components/ui/button";
import { useNavigate, useRouteError } from "react-router-dom";
import type { FallbackProps } from "react-error-boundary";
import { HomeIcon } from "lucide-react";

type Props = Partial<FallbackProps>; 

const ErrorBoundaryPage = ({ error, resetErrorBoundary }: Props) => {
    const navigate = useNavigate()
  const routeError = useRouteError();

  const err = error ?? routeError; 

  return (
    <div className="flex flex-col space-y-4 items-center my-40">
      <p className="text-2xl font-bold tracking-wider">Something Went Wrong </p>
      <p>{String(err)}</p>
       <Button onClick={() => navigate('/')}>Go to Home <HomeIcon/></Button>
      {resetErrorBoundary && (
        <Button onClick={resetErrorBoundary}>Go to Home <HomeIcon /></Button>
      )}
    </div>
  );
};

export default ErrorBoundaryPage;
