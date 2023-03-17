const EmployeeService = require('../services/EmployeeService')

const { Router } = require('express')

const EmployeeController = Router()

EmployeeController.get('', async (req, res) => {
   const { name, position } = req.body
   const {value} =req.query
   try {
      if(value){
res.status(200).json(await EmployeeService.getEmployeeByName(value))
      }else{
      
         res.status(200).json(await EmployeeService.index())
      }
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'EmployeeService.index() or EmployeeService.getEmployeeByName(value) is not working' })
   }
})

EmployeeController.get('/:id', async (req, res) => {
   const { id } = req.params

   try {
      const existsEmployee = await EmployeeService.existsId(id)
      if (existsEmployee) {
         try {
            res.status(200).json(await EmployeeService.show(id))
         } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'EmployeeService.show(id) is not working' })
         }
      } else {
         res.status(404).json({ error: `Id: ${id} ot found` })
      }

   } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' })
   }
})

EmployeeController.post('', (req, res) => {
   const { name, position } = req.body
   try {
      EmployeeService.store({ name, position })
      res.status(201).json()
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'EmployeeService.store({name, position}) is not working' })
   }
})

EmployeeController.delete('/:id', async (req, res) => {
   const { id } = req.params

   try {
      const existsEmployee = await EmployeeService.existsId(id)
      if (existsEmployee) {
         try {
            const idDeleted = await EmployeeService.destroy(id)
            if (idDeleted) {
               res.json({ reponse: `Id ${idDeleted} has been deleted` })

            } else {
               res.json({ reponse: `Id ${idDeleted} has not been deleted` })
            }
         } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' })
         }
      } else {
         res.status(404).json({ error: `Id: ${id} ot found` })
      }

   } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' })
   }
})

EmployeeController.put('/:id', async (req, res) => {
   const { id } = req.params
   const { name, position, created_at } = req.body

   try {
      const existsEmployee = await EmployeeService.existsId(id)
      if (existsEmployee) {
         try {
            res.status(200).json(await EmployeeService.update({ id, name, position, created_at }))
         } catch (error) {

         }
      } else {
         res.status(404).json({ error: ` EmployeeService.update({name, position, created_at}) is not found` })
      }
   } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' })
   }
})

EmployeeController.patch('/:id', async (req, res) => {
   const { id } = req.params
   const { position } = req.body
   try {
      const existsEmployee = await EmployeeService.existsId(id)
      if (existsEmployee) {
         try {
            res.status(200).json(await EmployeeService.patchPosition({ id, position }))
         } catch (error) {
            console.error(error)
            res.status(500).json({error:'EmployeeService.patchPosition({id, position}) is not working'})
         }
      } else {
         res.status(404).json({ error: `Id ${id} not found` })
      }
   } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' })
   }
})

module.exports = EmployeeController