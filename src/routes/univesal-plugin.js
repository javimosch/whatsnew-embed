/**
 * Serves the universal integration script
 * @param {*} app 
 */
module.exports = app => {
    const path = require('path')
    const fs = require('fs')
    const { minifyJS } = (require('../composables/useMinifyJS'))()
    const { tryCatch } = require('../helpers')
    
    app.get('/dist/wn-client.universal.min.js', async (req, res) => {
        const initFunction = req.query.initFunction;
        const filePath = path.join(process.cwd(), 'public','dist', 'wn-client.universal.min.js');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let modifiedContent = initFunction ? `\nwindow.wnClientInitFunction = ${initFunction};` + fileContent : fileContent
        modifiedContent = `window.wnClientOptions = {
          backendURL: '${req.protocol||''}://${req.get('host')}'
        };`+ modifiedContent
        await tryCatch('Try to minify wn-client', async () => {
            if (global.NODE_ENV === 'production') {
                const { code } = await minifyJS(modifiedContent)
                modifiedContent = code
                modifiedContent = modifiedContent.replace(/\n|\r/g, '')
            }
        })
        res.set('Content-Type', 'application/javascript');
        res.send(modifiedContent);
    });
}