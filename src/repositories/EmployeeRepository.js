const Database = require('../config/Database')


const findEmployeeById = async (id) =>{
  const response = await Database.query(`
    select * from employees where id=$1
  `,[
    id
  ])
  return response.rows[0]
}
const findAll = async () =>{
  const response = await Database.query(`
    select * from employees order by id
  `)
  return response.rows
}

const insert = ({name, position}) => {
  Database.query(`
  insert into employees (
    name, position, created_at, updated_at
  ) 
  values (
    $1, $2, current_timestamp, current_timestamp
  )
  `,[
    name, position
  ])
}
 
const findId = async (id) =>{
  const response = await Database.query(`
  select id from employees where id = $1
  `, [
    id
  ])

    return response.rows[0]
  }
  
  const remove = async(id) =>{
    const response = await Database.query(`
    delete from employees where id = $1 returning id
    
    `, [id])
    return response.rows[0].id
}

const update = async({id, name, position, created_at}) =>{
const response = await Database.query(`
  update employees
  set name = $1, position=$2, created_at=$3, updated_at=current_timestamp
  where id=$4 returning *  
`,[
  name, position, created_at, id
])
return response.rows[0]
}
module.exports = {
    findAll, insert, findId, remove, findEmployeeById, update 
}