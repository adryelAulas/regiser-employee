const EmployeeService = require('../services/EmployeeService');
const { Router } = require('express');

const EmployeeController = Router();

EmployeeController.get('/', async (req, res) => {
  const { value } = req.query;
  try {
    if (value) {
      const employees = await EmployeeService.getEmployeeByName(value);
      res.status(200).json(employees);
    } else {
      const employees = await EmployeeService.index();
      res.status(200).json(employees);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'EmployeeService.index() or EmployeeService.getEmployeeByName(value) is not working' });
  }
});

EmployeeController.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existsEmployee = await EmployeeService.existsId(id);
    if (existsEmployee) {
      const employee = await EmployeeService.show(id);
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: `Id: ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' });
  }
});

EmployeeController.post('/', async (req, res) => {
  const { name, position } = req.body;
  try {
    await EmployeeService.store({ name, position });
    res.status(201).json({ message: 'Employee created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'EmployeeService.store({name, position}) is not working' });
  }
});

EmployeeController.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existsEmployee = await EmployeeService.existsId(id);
    if (existsEmployee) {
      const idDeleted = await EmployeeService.destroy(id);
      if (idDeleted) {
        res.json({ response: `Id ${idDeleted} has been deleted.` });
      } else {
        res.json({ response: `Id ${idDeleted} has not been deleted.` });
      }
    } else {
      res.status(404).json({ error: `Id: ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'EmployeeService.existsId(id) is not working' });
  }
});

EmployeeController.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { name, position, created_at } = req.body;
 
   try {
     const existsEmployee = await EmployeeService.existsId(id);
     if (existsEmployee) {
       const updatedEmployee = await EmployeeService.update({ id, name, position, created_at });
       res.status(200).json(updatedEmployee);
     } else {
       res.status(404).json({ error: `Employee with id ${id} not found` });
     }
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'An error occurred while updating the employee' });
   }
 });
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