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

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    suburb:"",
    postcode:"",
    clothing:"",
    electricals: "",
    furniture: "",
    garden:"",
    kids:"",
    kitchenware: "",
    sports:"",
    otherItems: "",
    dateUpdated: "",
    timeUpdated: ""
  })


  return (
    <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/share' element={<Share 
            formData={formData} setFormData={setFormData}
            />} 
          />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/listings' element={<Listings />}>
            <Route index element={<ListingIndex/>}/>
            <Route path=":id" element={<ListingPage
              formData={formData} setFormData={setFormData}
              />}
            />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
