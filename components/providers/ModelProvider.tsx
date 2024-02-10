"use client"

import React from 'react'
import LoginModel from '../models/LoginModel'
import RegisterModel from '../models/RegisterModel'
import AddProjectModel from '../models/AddProjectModel'
import ProjectDetails from '../models/ProjectDetails'
import EditProfile from '../models/EditProfile'
import AddExperince from '../models/AddExperince'
import AddLan from '../models/addLan'

export default function ModelProvider() {
  return (
    <>
    <LoginModel />
    <RegisterModel />
    <ProjectDetails />
    <AddProjectModel />
    <EditProfile />
    <AddExperince />
    <AddLan />
    </>
  )
}
