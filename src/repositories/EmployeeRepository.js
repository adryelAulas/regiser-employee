const Database = require('../config/Database')


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
 
module.exports = {
    findAll, insert
}