import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useUserProfileQuery } from "../hooks/useUserProfileQuery";

const UserProfileQuery: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const {
    data: userProfile,
    isLoading,
    error,
    refetch,
    isError,
  } = useUserProfileQuery();

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-600">Please sign in to view your profile</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="flex space-x-2">
            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !userProfile) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load profile";

    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-red-800 font-medium">Error loading profile</h3>
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">User Profile</h2>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {userProfile.name}
            </p>
          </div>


<div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              unique Name
            </label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {userProfile.uniqueName}
            </p>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UPN
            </label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {userProfile.upn}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Given name
            </label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {userProfile.givenName}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Family Name
            </label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {userProfile.familyName}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {userProfile.email}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <p className="text-gray-500 font-mono text-xs bg-gray-50 px-3 py-2 rounded break-all">
            {userProfile.id}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client ID
          </label>
          <p className="text-gray-500 font-mono text-xs bg-gray-50 px-3 py-2 rounded break-all">
            {userProfile.clientId}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenant ID
          </label>
          <p className="text-gray-500 font-mono text-xs bg-gray-50 px-3 py-2 rounded break-all">
            {userProfile.tenantId}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Roles
          </label>
          <div className="flex flex-wrap gap-2">
            {userProfile.roles?.length > 0 ? (
              userProfile.roles?.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {role}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 italic">
                No roles assigned
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileQuery;
