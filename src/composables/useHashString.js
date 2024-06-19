const hasha = require('hasha');

/**
 * @deprecated unused
 * @returns 
 */
module.export = ()=>({
    hashStringAsync: async function hashStringAsync(str, algorithm = 'sha256') {
        return new Promise((resolve, reject) => {
          hasha(str, {
            algorithm: algorithm
          }, (err, hashedString) => {
            if (err) {
              reject(err);
            } else {
              resolve(hashedString);
            }
          });
        });
      }
})