const neo4j = require('neo4j-driver')

const URI = 'neo4j://neo4j:7687' //or :7474
const USER = 'neo4j'
const PASSWORD = 'pipoman13'
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD), {});
const session = driver.session();

async function executeCypherQuery(statement, params = {}) {
  try {
    const result = session.run(statement, params);
    //session.close();
    return result;
  } catch (error) {
    throw error; // we are logging this error at the time of calling this method
  }
}
module.exports = { executeCypherQuery };