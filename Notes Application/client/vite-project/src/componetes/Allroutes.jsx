import React from 'react'
import { Routes, Route } from "react-router";
import Home from '../pages/Home';
import Addnote from '../pages/Addnote';
import Note from '../pages/Note';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Update from '../pages/Update';



export const Allroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addnote" element={<Addnote />} />
            <Route path="/note" element={<Note />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update/:id" element={<Update />} />
            
        </Routes>

    )
}
