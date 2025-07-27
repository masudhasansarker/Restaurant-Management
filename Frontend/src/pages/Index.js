import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home'
import Blogs from './Blogs'
import About from './About'
import Contact from './Contact'
import Navbar from './Navbar/Navbar'
import ErrorPage from './ErrorPage'
import Login from './Login'
import AddTpCart from '../AddToCart/AddTpCart'
import DrinkManuItem from './DrinkManuItem'
import DishManuItem from './DishManuItem'
import RegistrationPage from './RegistrationPage'
import IndexAdmin from '../Admin/IndexAdmin'
import UserFeedBack from '../Admin/UserFeedBack'
import AddFoodItem from '../Admin/AddFoodItem'
import Reservation from '../Admin/Reservation'
import FeedbackCustomer from '../Admin/FeedbackCustomer'
import ManageCustomer from '../Admin/ManageCustomer'
import UpdateCustomerInfo from '../Admin/UpdateCustomerInfo'
import AdminLog from '../Admin/AdminLog'
import ViewOrder from '../Admin/ViewOrder'
import CartShow from '../AddToCart/CartShow'
import Payment from '../AddToCart/Payment'
import CustomerOrder from '../Admin/CustomerOrder'
import UserLayout from './userLayout/UserLayout'
import AdminLayout from '../Admin/AdminLayout/AdminLayout'
//<Route path='/admin/feedback' element={<UserFeedBack />} />

const Index = () => {
  return (
    <div>
      <BrowserRouter basename='/'>
      {/* <Navbar /> */}
        <Routes>
            <Route element={<UserLayout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/dish' element={<DishManuItem />} />
            <Route path='/drink' element={<DrinkManuItem />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<AddTpCart />} />
            <Route path='/cartShow' element={<CartShow />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/registration' element={<RegistrationPage />} />
            </Route>
            
            <Route element={<AdminLayout />}>
            <Route path='/admin' element={<AdminLog />} />
            <Route path='/admin/home' element={<IndexAdmin />} />
            <Route path='/admin/addfood'element={<AddFoodItem />} />
            <Route path='/admin/reservation' element={<Reservation />} />
            <Route path='/admin/feedback' element={<FeedbackCustomer />} />
            <Route path='/admin/customer' element={<ManageCustomer />} />
            <Route path='/admin/updateCustomerInfo' element={<UpdateCustomerInfo />} />
            <Route path='/admin/viewOrder' element={<ViewOrder />} />
            <Route path='/admin/orders' element={<CustomerOrder />} />
            <Route path='/*' element={<ErrorPage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Index
