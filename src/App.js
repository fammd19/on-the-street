import React, {useState} from 'react';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from './components/pages/Home'
import Share from './components/pages/Share'
import Listings from './components/pages/Listings';
import ListingPage from './components/pages/ListingPage'
import ListingIndex from './components/pages/ListingIndex'
import PageNotFound from './components/pages/PageNotFound';


function App() {

  const [listingId, setListingId] = useState('');
  const [listingDetails, setListingDetails] = useState({
    id: "",
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
          <Route path='/share' element={<Share />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/listings' element={<Listings />}>
            <Route index element={<ListingIndex/>}/>
            <Route path=":id" element={<ListingPage/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
