import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <SignedOut>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100vh' 
          }}>
            <SignIn />
          </div>
        </SignedOut>
        <SignedIn>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <UserButton />
          </div>
          <RouterProvider router={router} />
        </SignedIn>
      </ScrollTop>
    </ThemeCustomization>
  );
}