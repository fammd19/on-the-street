import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from './components/pages/Home'
import Find from './components/pages/Find'
import Share from './components/pages/Share'
import Listing from './components/pages/Listing'

function App() {

  const [listingId, setListingId] = useState('');
  const [listingDetails, setListingDetails] = useState({
    date: "",
    time: "",
    address: "",
    suburb: "",
    postcode: "",
    items: [],
    otherItems: "",
    dateUpdated: "",
    timeUpdated: ""
})

  return (
    <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' exact element={<Home setListingId={setListingId}/>} />
          <Route path='/find' element={<Find setListingId={setListingId}/>}/>
          <Route path='/share' element={<Share />} />
          <Route path='/listing' element={<Listing listingId={listingId} listingDetails={listingDetails} setListingDetails={setListingDetails}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
