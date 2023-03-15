const EmployeeController = require('../repositories/EmployeeRepository')

const EmployeeRepository = require('../repositories/EmployeeRepository')


const existsId = async (id) =>{
    const value = await EmployeeRepository.findId(id)
    return value ? true : false
}

const index = async() =>{
    return await EmployeeRepository.findAll()
}

const store = ({name, position} ) =>{
// console.log('EmployeeService: ', name, position)

EmployeeRepository.insert({name, position})
}

const destroy = async (id)=>{
    return await EmployeeRepository.remove(id)
}
const show = async (id)=>{
    return await EmployeeRepository.findEmployeeById(id)
}

const update= async({id, name, position, created_at}) =>{
    return await EmployeeRepository.update({id, name, position, created_at})
}
module.exports = {
    index, store, existsId, destroy, show, update
}