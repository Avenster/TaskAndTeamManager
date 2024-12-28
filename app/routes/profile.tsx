import React from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ProfileSettings from '~/components/ProfileSettings'; // Your existing ProfileSettings component

const ProfileSettingsPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-black items-center">
      <Header />
      <div className="w-full max-w-7xl flex flex-row flex-1">
        <main className="flex-1 overflow-hidden">
          <ProfileSettings />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettingsPage;