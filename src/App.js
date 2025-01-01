// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import BusinessCardsList from "./screens/BusinessCardsList";
import BusinessCard from "./screens/BusinessCard";
import CreateBusinessCard from "./screens/CreateBusinessCard";
import Login from "./screens/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import EditBusinessCard from "./screens/EditBusinessCard";
import ViewBusinessCard from "./screens/ViewBusinessCard";
import QRBusinessCard from "./screens/QRBusinessCard";
import RedirectSLink from "./screens/RedirectSLink";
import LandingPage from "./screens/LandingPage";
import MenuCard from "./Rest/MenuCard";
import BlogPost from "./Blog/BlogPost";
import BlogList from "./Blog/BlogList";
import { initializeAnalytics, trackPageView } from "./googleAnalytics";
import MenuWithSavedItems from "./Rest/MenuWithSavedItems";
import RestaurantForm from "./Rest/RestaurantForm";
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);
  return (
    <Router>
      <AnalyticsTracker />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <BusinessCardsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBusinessCard />
            </ProtectedRoute>
          }
        />
        <Route path="/view/:id" element={<ViewBusinessCard />} />
        <Route
          path="/qr/:id"
          element={
            <ProtectedRoute>
              <QRBusinessCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBusinessCard />
            </ProtectedRoute>
          }
        />
        <Route path="/s/:sid" element={<RedirectSLink />} />
        <Route path="/menu" element={<MenuCard />} />
        <Route path="/short/:sid" element={<RedirectSLink />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/form" element={<RestaurantForm />} />
        <Route path="/menu/:restaurantId" element={<MenuCard />} />
        <Route path="/l" element={<Comp />} />
      </Routes>
    </Router>
  );
}

function Comp() {
  return (
    <div>
      <a href="https://account.samsung.com/accounts/v1/keyp/417fce77861bcb763d0e24d778f7a707559bec99fb768bbe3c825cc697dc20184ab826f265a7f6444cad46b3aee983b7af7dbfd5962209881ca8325001337f138214876d6774571805837a9a4116039f257e38348a81aa3a55325acb3409140b317202f88fa8859cbb84a803f4445f823179aeb1259b3870af6dc58c2f2309a12977108b9d30b9012ea16c16e3e6d6939b2087df824a859a3831dcdae8768ac6c6c8be27ccf3bfc0489ba82e86849af0cd9d2b4e4ab2b8528bd4f36a7e06ec0e4385f88dbd0671e8191a8d019bf3faa9833e5b483b93d96ab85e69b30342f06cb34c3e977c88f87f3df85af861bfa4125a9da279d77e54af1cd893ba73ecad211420fa3c02bcd6967942cd2cec13d9b271bc5c7b50108ae1b843be18ea9a8c3bbc489d1c303a4f62294ea6467b1651919bbaeaf067bc1df58655811d3ec6140fad3ddd6405?nextURL=continueWithGoogleByMagicLink"></a>
    </div>
  );
}

export default App;
