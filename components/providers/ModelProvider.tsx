"use client"

import React from 'react'
import LoginModel from '../models/LoginModel'
import RegisterModel from '../models/RegisterModel'
import AddProjectModel from '../models/AddProjectModel'
import ProjectDetails from '../models/ProjectDetails'

export default function ModelProvider() {
  return (
    <>
    <LoginModel />
    <RegisterModel />
    <ProjectDetails />
    <AddProjectModel />
    </>
  )
}
