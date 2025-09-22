import { ABTestProvider } from './components/ABTestProvider';
import { LandingPage } from './components/LandingPage';

export default function App() {
  return (
    <ABTestProvider>
      <LandingPage />
    </ABTestProvider>
  );
}