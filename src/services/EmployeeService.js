const EmployeeController = require('../repositories/EmployeeRepository')

const EmployeeRepository = require('../repositories/EmployeeRepository')

const index = async() =>{
    return await EmployeeRepository.findAll()
}

const store = ({name, position} ) =>{
// console.log('EmployeeService: ', name, position)

EmployeeRepository.insert({name, position})
}


module.exports = {
    index, store
}