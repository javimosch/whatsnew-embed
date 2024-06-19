const uglifyJs = require('uglify-js');
const tmp = require('tmp');
const fs = require('fs').promises;
const {resolveWithError} = require('../helpers')
const uglifyOptions = {
    compress: true,
    mangle: false
};

/**
 * Minifies integration script in production mode
 * @returns 
 */
module.exports = function useMinifyJS() {
    return {
        minifyJS(jsCode, options = {}) {
            let fsCache = options.fsCache === true
            return new Promise(async (resolve, reject) => {

                let minifiedCode

                //If fs cache enabled and exists, return cache
                if(fsCache){
                    if (!options.cacheKey) {
                        return resolveWithError('While creating temporal file', {
                            err:new Error('options.cacheKey is required for fsCache')
                        }, minifiedCode,resolve)
                    }
                    var fileName = options.cacheKey
                    if(global.minifyJSTmpFolderPath && await fileExists(global.minifyJSTmpFolderPath, fileName)){
                        minifiedCode = await readFileUtf8(global.minifyJSTmpFolderPath, fileName)
                        if(minifiedCode){
                            return resolve(minifiedCode)
                        }
                    }
                }
                
                minifiedCode = uglifyJs.minify(jsCode, uglifyOptions)
                if(minifiedCode.error){
                    return reject(minifiedCode.error)
                }

                if (!fsCache) {
                    return resolve(minifiedCode)
                }


                tmp.dir(async function _tempDirCreated(err, tmpFolderPath, cleanupCallback) {
                    if (err) {
                        return resolveWithError('While creating temporal directory', {
                            err
                        }, minifiedCode,resolve)
                    }
                
                    //save file async, fileName with content: minifiedCode
                    await fs.writeFile(fileName, minifiedCode)
                    global.minifyJSTmpFolderPath = tmpFolderPath
                });
            })
        }
    }
}



async function fileExists(basePath, fileName) {
    const filePath = `${basePath}/${fileName}`;
    try {
      await fs.stat(filePath);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw err;
      }
    }
  }

  async function readFileUtf8(basePath, fileName) {
    const filePath = `${basePath}/${fileName}`;
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
  }