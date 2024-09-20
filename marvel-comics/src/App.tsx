import { Suspense, lazy } from "react";
import './styles/main.scss';

const RouteComponent = lazy(() => 
  new Promise((resolve) => setTimeout(resolve, 2000))
.then(() => import('./components/routes/Routes')));

function App() {

  return (
    <Suspense>
      <div className="w-screen">
        <RouteComponent /> 
      </div>
  </Suspense>
  );
}

export default App
