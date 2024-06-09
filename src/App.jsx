import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Components/Landing-components/LandingPage/LandingPage';
// import MergeFarmersLayouts from './Components/Farmers-components/FarmersLayout/MergeFarmersLayouts/MergeFarmersLayouts'
// import MergerBuyersLayouts from './Components/Buyers-components/BuyersLayout/MergeBuyersLayouts/MergeBuyersLayouts'
// import MergerExpertsLayouts from './Components/Experts-components/ExpertsLayout/MergeExpertsLayouts/MergeExpertsLayouts'
// import AdminPage from './Components/Admin-components/AdminPage/AdminPage';
// import Login from './Components/AuthPages/Login/Login';
// import Signup from './Components/AuthPages/Signup/Signup';




// import UsersPage from './Components/UsersPage';

const App = () => {
  return (
     <div>

      <LandingPage />
      {/* <MergeFarmersLayouts /> */}
      {/* <MergerBuyersLayouts /> */}
      {/* <MergerExpertsLayouts /> */}
      {/* <AdminPage/> */}
      {/* <Login /> */}
      {/* <Signup /> */}


        {/* <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/CropInfo' element={<CropInfoPage />}/>
          <Route path='/Orders' element={<OrdersPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>  */}

    </div>
  );
}

export default App