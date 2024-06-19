function resolveWithError(description, err, resolveResponse, resolve) {
    resolve(resolveResponse)
    console.error(description, {
        err
    })
}

async function tryCatch(ctxString, handler) {
    let res =null
    try {
        res = handler()
        if (res instanceof Promise) {
            res = await res
        }
    } catch (err) {
        console.error(ctxString, {
            err
        })
    }
    return res
}

module.exports = {
    resolveWithError,
    tryCatch
}