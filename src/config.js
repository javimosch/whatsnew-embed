
/**
 * Config
 */

global.DB_CONNECTION_FAIL_EXIT_TIMEOUT_SECONDS = 10
global.MONGO_URI = ''
global.DB_NAME = ''
global.NODE_ENV = 'development'
global.PORT = 3000


//---------------------------------------------------------

let variables = ['DB_CONNECTION_FAIL_EXIT_TIMEOUT_SECONDS','MONGO_URI','DB_NAME','NODE_ENV','PORT']
let sensitive = ['MONGO_URI']
/**
 * - Replace config with values from env if availble
 * - Print to terminal if not sensitive
 */
for (let key of variables) {
    if (process.env[key]) {
        global[key] = process.env[key]
    }
    console.log(`Set ${key} = ${!sensitive.includes(key) ? global[key]||'(empty)' : '(hidden)'}`)
}