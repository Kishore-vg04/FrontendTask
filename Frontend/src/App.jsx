import React from "react"
import Login from "./LoginComponent/Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './HomeComponent/Home'
import ProtectedRoute from "./ProtectedRoute"
import Showprofile from "./PopupComponent/Showprofile"
import Addprofile from "./PopupComponent/Addprofile"
import Updateprofile from "./PopupComponent/Updateprofile"
import Changepassword from "./PopupComponent/Changepassword"
import Viewallprofiles from "./PopupComponent/Viewallprofiles"
import Requesthelp from "./PopupComponent/Requesthelp"
import Providehelp from "./PopupComponent/Providehelp"
import Chat from "./ChatComponent/Chat"
import ChatList from "./ChatComponent/ChatList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/home" element={
          <ProtectedRoute><Home/></ProtectedRoute>
        } />
        <Route path="/showprofile" element={
          <ProtectedRoute><Showprofile/></ProtectedRoute>
        }/>
        <Route path="/addprofile" element={
          <ProtectedRoute><Addprofile/></ProtectedRoute>
        }/>
        <Route path="/updateprofile" element={
          <ProtectedRoute><Updateprofile/></ProtectedRoute>
        }/>
        <Route path="/changepassword" element={
          <ProtectedRoute><Changepassword/></ProtectedRoute>
        }/>
        <Route path="/viewallprofile" element={
          <ProtectedRoute><Viewallprofiles/></ProtectedRoute>
        }/>
        <Route path="/requesthelp" element={
          <ProtectedRoute><Requesthelp/></ProtectedRoute>
        }/>
        <Route path="/providehelp" element={
          <ProtectedRoute><Providehelp/></ProtectedRoute>
        }/>
        <Route path="/chat" element={
          <ProtectedRoute><Chat/></ProtectedRoute>
        }/>
        <Route path="/chats" element={
          <ProtectedRoute><ChatList/></ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
