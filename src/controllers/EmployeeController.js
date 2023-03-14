const EmployeeService = require('../services/EmployeeService')

const {Router} = require('express')

const EmployeeController = Router()

EmployeeController.get('', async (req, res)=>{
 const {name, position} = req.body
 try {
    res.status(200).json(await EmployeeService.index())
 } catch (error) {
    console.error(error)
    res.status(500).json({error: 'EmployeeService.index() is not working'})
 }
})


EmployeeController.post('', (req, res)=>{
   const {name, position} = req.body
   try {
      EmployeeService.store({name, position})
      res.status(201).json()
   } catch (error) {
      console.error(error)
      res.status(500).json({error: 'EmployeeService.store({name, position}) is not working' })
   }
  })

module.exports = EmployeeController