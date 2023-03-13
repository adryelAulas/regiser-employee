const EmployeeRepository = require('../repositories/EmployeeRepository')


const store = ({name, position} ) =>{
// console.log('EmployeeService: ', name, position)

EmployeeRepository.insert({name, position})
}



module.exports = {
    store
}