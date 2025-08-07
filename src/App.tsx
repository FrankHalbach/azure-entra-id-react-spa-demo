import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import UserProfileQuery from "./components/UserProfile";
import { LogoutButton } from "./components/LogoutButton";
import { useUserProfileQuery } from "./hooks/useUserProfileQuery";
import { useProfilePhoto } from "./hooks/useProfilePhoto";

const getInitials = (name?: string) => {
  if (!name) return "NA";
  const parts = name.split(" ");
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
};

const Navbar: React.FC = () => {
  const photoUrl = useProfilePhoto();
  const { data: userProfile } = useUserProfileQuery();

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: App Title */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-blue-700">
            Azure AD App
          </Link>
        </div>
        {/* Center: Profile Link */}
        <div className="flex-1 flex justify-center">
          <AuthenticatedTemplate>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              Profile
            </Link>
          </AuthenticatedTemplate>
        </div>
        {/* Right: Avatar + Logout/Login Button */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          <AuthenticatedTemplate>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-9 h-9 rounded-full border object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg">
                {getInitials(userProfile?.name)}
              </div>
            )}
            <LogoutButton />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <LoginButton />
          </UnauthenticatedTemplate>
        </div>
      </div>
    </nav>
  );
};

const Home: React.FC = () => {
  const {
    data: userProfile,        
  } = useUserProfileQuery();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Azure AD App</h1>
      <UnauthenticatedTemplate>
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <p className="text-gray-700">
          Welcome {userProfile?.name}!
          
          
        </p>

        <p className="text-gray-700">          
          <Link to="/profile" className="text-blue-700 underline">
            See your profile
          </Link>
          .
        </p>
      </AuthenticatedTemplate>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-4">
        <Navbar />
        <div className="max-w-2xl mx-auto space-y-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <AuthenticatedTemplate>
                  <UserProfileQuery />
                </AuthenticatedTemplate>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
