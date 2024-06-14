// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import LandingPage from './Components/Landing-components/LandingPage/LandingPage';
// // import MergeFarmersLayouts from './Components/Farmers-components/FarmersLayout/MergeFarmersLayouts/MergeFarmersLayouts';
// // import MergerBuyersLayouts from './Components/Buyers-components/BuyersLayout/MergeBuyersLayouts/MergeBuyersLayouts';
// // import MergerExpertsLayouts from './Components/Experts-components/ExpertsLayout/MergeExpertsLayouts/MergeExpertsLayouts';
// import Login from './Components/AuthPages/Login/Login';
// import Signup from './Components/AuthPages/Signup/Signup';
// import FarmerOrderHistory from './Components/Farmers-components/FarmersPages/Reports/Reports';
// import BuyerOrderHistory from './Components/Buyers-components/BuyersPages/Reports/Reports';
// import ExtensionOfficerDashboard from './Components/Experts-components/ExpertsPages/Reports/Reports';

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

//   const handleSetToken = (token) => {
//     setToken(token);
//     localStorage.setItem('token', token);
//   };

//   const handleSetUserId = (userId) => {
//     setUserId(userId);
//     localStorage.setItem('userId', userId);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login setToken={handleSetToken} setUserId={handleSetUserId} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/farmers/*" element={<MergeFarmersLayouts setToken={handleSetToken}/>} />
//         <Route path="/buyers/*" element={<MergerBuyersLayouts setToken={handleSetToken}/>} />
//         <Route path="/experts/*" element={<MergerExpertsLayouts setToken={handleSetToken}/>} /> */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login setToken={handleSetToken} setUserId={handleSetUserId} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/farmers/*" element={<FarmerOrderHistory setToken={handleSetToken}/>} />
//         <Route path="/buyers/*" element={<BuyerOrderHistory setToken={handleSetToken}/>} />
//         <Route path="/experts/*" element={<ExtensionOfficerDashboard setToken={handleSetToken}/>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Components/Landing-components/LandingPage/LandingPage';
import Login from './Components/AuthPages/Login/Login';
import Signup from './Components/AuthPages/Signup/Signup';
import FarmerOrderHistory from './Components/Farmers-components/FarmersPages/Reports/Reports';
import BuyerOrderHistory from './Components/Buyers-components/BuyersPages/Reports/Reports';
import ExtensionOfficerDashboard from './Components/Experts-components/ExpertsPages/Reports/Reports';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleSetUserId = (userId) => {
    setUserId(userId);
    localStorage.setItem('userId', userId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setToken={handleSetToken} setUserId={handleSetUserId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmers/*" element={<FarmerOrderHistory token={token} />} />
        <Route path="/buyers/*" element={<BuyerOrderHistory token={token} />} />
        <Route path="/experts/*" element={<ExtensionOfficerDashboard token={token} userId={userId} />} />
      </Routes>
    </Router>
  );
};

export default App;
