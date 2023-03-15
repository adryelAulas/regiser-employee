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

EmployeeController.get('/:id', async(req, res)=>{
   const {id} = req.params
   
   try {
      const existsEmployee = await EmployeeService.existsId(id)
      if(existsEmployee){
         try {
         res.status(200).json(await EmployeeService.show(id))
         } catch (error) {
            console.log(error)
            res.status(500).json({error: 'EmployeeService.show(id) is not working' })
         }
      }else {
         res.status(404).json({error: `Id: ${id} ot found`})
      }
  
   } catch (error) {
      console.log(error)
       res.status(500).json({error: 'EmployeeService.existsId(id) is not working' })
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

  EmployeeController.delete('/:id', async(req, res)=>{
   const {id} = req.params
   
   try {
      const existsEmployee = await EmployeeService.existsId(id)
      if(existsEmployee){
         try {
             const idDeleted = await EmployeeService.destroy(id)
             if(idDeleted){
                res.json({reponse: `Id ${idDeleted} has been deleted`})

             } else {
               res.json({reponse: `Id ${idDeleted} has not been deleted`})
             }
         } catch (error) {
            console.log(error)
            res.status(500).json({error: 'EmployeeService.existsId(id) is not working' })
         }
      }else {
         res.status(404).json({error: `Id: ${id} ot found`})
      }
  
   } catch (error) {
      console.log(error)
       res.status(500).json({error: 'EmployeeService.existsId(id) is not working' })
   }
  })


module.exports = EmployeeController