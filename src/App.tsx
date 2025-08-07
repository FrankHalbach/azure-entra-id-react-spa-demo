import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import LoginButton from "./components/LoginButton";
import UserProfileQuery from "./components/UserProfile";
import { LogoutButton } from "./components/LogoutButton";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Azure AD App
          </h1>

          <UnauthenticatedTemplate>
            <div className="text-center">
              <p className="text-gray-600">
                Please log in to view your profile.
              </p>
            </div>
            <LoginButton />
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <LogoutButton />
            <UserProfileQuery />
          </AuthenticatedTemplate>
        </div>
      </div>
    </div>
  );
};

export default App;
