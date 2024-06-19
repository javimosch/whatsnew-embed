

/**
 * Plugin scope
 */
(function () {

    const htmlTemplate = `
<div class="wnHtml">   

    <!-- Big mode -->
    <div class="wnFixed wnFlexCol wnBgBlue500 wnPlugin wnBig wnPl10 wnPr10 wnPb20 wnPt20 wnRoundedLg wnFlex" data-hidden="1">
        <div id="wnMsgTemplatewnBigParent">
            <div id="wnMsgTemplatewnBig" data-template>
                <div class="wnText4xl wnTextWhite">#{title}</div>
                <div class="wnMt4">
                    #{html}
                </div>
            </div>
        </div>
        <button class="wnMsgBigCloseBtn wnMt4 wnBgWhite wnDarkBgZinc800 wnHoverDarkBgZinc700 wnHoverBgZinc100 wnTextBlue600 wnDarkTextBlue400 wnFontBold wnPy2 wnPx4 wnRounded">
            Mark as read
        </button>
    </div>

    <!-- Small mode -->
    <div class="wnFixed wnFlexCol wnBgBlue500 wnPlugin wnSmall wnPl10 wnPr10 wnPb20 wnPt5 wnRoundedLg wnFlex wnJustifyCenter animate__animated animate__fadeInRight" data-hidden="1">
        <div class="wnWFull wnFlex wnJustifyEnd">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24">
                    <path fill="white"
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
                </svg>
            </div>
        </div>
        <div>
            <div id="wnMsgTemplatewnSmall" data-template>
                <span class="wnMsgTitle wnFontBold">#{computedTitle}</span>
                <p class="wnMsgShortDescription wnMt6">#{shortDescription}</p>

                <button class="wnMsgLearnMoreBtn wnMt4 wnBgWhite wnDarkBgZinc800 wnHoverDarkBgZinc700 wnHoverBgZinc100 wnTextBlue600 wnDarkTextBlue400 wnFontBold wnPy2 wnPx4 wnRounded">
                    Learn More
                </button>
            </div>
        </div>
    </div>
</div>
<style scoped>
    .wnHtml .wnFixed {
        position: fixed;
    }

    .wnHtml .wnJustifyEnd {
        justify-content: flex-end;
    }

    .wnHtml .wnWFull {
        width: 100%;
    }

    .wnHtml .wnFlexCol {
        display: flex;
        flex-direction: column;
    }

    .wnHtml .wnBgBlue500 {
        background-color: #3498db;
    }

    .wnHtml .wnPlugin {
        padding: 20px 10px;
        border-radius: 0.5rem;
    }

    .wnHtml .wnBig {
        width: 60vw;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);      
        top: 10%;
    }

    .wnHtml .wnSmall {
        right: 10px;
        bottom: 10px;
        max-width: 350px;
    }

    .wnHtml .wnRoundedLg {
        border-radius: 0.5rem;
    }

    .wnHtml .wnFlex {
        display: flex;
    }

    .wnHtml .wnJustifyCenter {
        justify-content: center;
    }

    .wnHtml .wnMt4 {
        margin-top: 1rem;
    }

    .wnHtml .wnPl10 {
        padding-left: 2.5rem;
    }

    .wnHtml .wnPr10 {
        padding-right: 2.5rem;
    }

    .wnHtml .wnPb20 {
        padding-bottom: 5rem;
    }

    .wnHtml .wnPt20 {
        padding-top: 5rem;
    }

    .wnHtml .wnPt5 {
        padding-top: 1.25rem;
    }

    .wnHtml .wnText4xl {
        font-size: 2.25rem;
    }

    .wnHtml .wnTextWhite {
        color: #ffffff;
    }

    .wnHtml .wnMsgBigCloseBtn {
        background-color: #ffffff;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: #3498db;
        font-weight: bold;
    }

    .wnHtml .wnMsgTitle {
        font-weight: bold;
    }

    .wnHtml .wnMsgShortDescription {
        margin-top: 1.5rem;
    }

    .wnHtml .wnMsgLearnMoreBtn {
        background-color: #ffffff;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: #3498db;
        font-weight: bold;
    }

    .wnHtml [data-hidden='1'] {
        display: none;
    }

    .wnHtml .wnHtml a, 
    .wnHtml .wnHtml h1, 
    .wnHtml .wnHtml h2, 
    .wnHtml .wnHtml p, 
    .wnHtml .wnHtml span, 
    .wnHtml .wnHtml li {
        color: #ffffff;
    }

    .wnHtml .wnHtml h1 {
        color: #000000;
        font-size: 30px;
        padding-bottom: 12px;
    }

    .wnHtml .wnHtml h2 {
        font-size: 25px;
        padding-bottom: 8px;
    }

    .wnHtml .wnHtml iframe {
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .wnHtml *{
        font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }
    .wnHtml [role=button],.wnHtml button {
        cursor: pointer;
    }
    .wnHtml button,.wnHtml input,.wnHtml optgroup,.wnHtml select,.wnHtml textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
    .wnHtml *,.wnHtml ::after,.wnHtml ::before {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
    }
</style>`

    let scope = {
        name: 'wnClient-1.0',
        backendURL:'',//
        createInstance(options) {
            console.info({
                options
            })
            return createInstanceInternal({
                backendURL:scope.backendURL,
                ...options
            })
        }
    }

    /* console.log('wn-client', {
        hasInitFn: !!window.wnClientInitFunction,
        hasOpts: !!window.wnClientOptions
    }) */

    /**
     * NodeJS fills backendURL automatically
     */
    if (window.wnClientOptions) {
        Object.assign(scope, window.wnClientOptions)
        delete window.wnClientOptions
    }

    if (window.wnClientInitFunction) {
        window.wnClientInitFunction(scope)
        delete window.wnClientInitFunction
    }

    /**
     * Creates plugin instance (Max: 1)
     * @param {*} options 
     * @returns 
     */
    function createInstanceInternal(options = {}) {
        const id = `ID-${Date.now()}`
        const instanceName = `wnClient-${id}`
        console.log(instanceName,'createInstance',{
            options
        })

        if (!options.target) {
            console.error(instanceName, 'options.target required')
            return
        }

        let targetRootSelector = options.target
        let targetRootEl = document.querySelector(targetRootSelector)
        if (!targetRootEl) {
            console.error(instanceName, 'options.target is not present in the DOM')
            return
        }
        if (targetRootEl.innerHTML.includes('wnHtml')) {
            console.error(instanceName, 'already initialized')
            return
        }

        targetRootEl.innerHTML = htmlTemplate



        const selectors = {
            modeSelectorBig: '.wnBig',
            modeSelectorSmall: '.wnSmall',
            msgBigCloseBtn: '.wnMsgBigCloseBtn',
            plugin: '.wnPlugin',
            msgLearnMoreBtn: '.wnMsgLearnMoreBtn',
            msgTemplate: () => `#wnMsgTemplate${instanceScope.modeSelector}`
        };

        /**
         * The localStorage cache key used to store the already read news ids
         */
        const cacheKey = 'wnReadMsgs'

        // and the updated code:

        function markActiveMessageAsRead() {
            let am = instanceScope.activeMessage
            let id = am._id
            let arr = JSON.parse(localStorage.getItem(cacheKey) || '[]')
            if (!arr.includes(id)) {
                arr.push(id)
            }
            localStorage.setItem(cacheKey, JSON.stringify(arr))
        }

        let instanceScope = {
            backendURL:options.backendURL,
            modeSelector: selectors.modeSelectorSmall,
            activeMessage: null,
            isEnabled: false,
            mounted() {
                console.log(instanceName, 'mounted')
                instanceScope.enable()

                document.querySelector(selectors.msgBigCloseBtn).addEventListener('click', () => {
                    markActiveMessageAsRead()
                    instanceScope.hideAllPanels()
                    instanceScope.activeMessage = null
                    instanceScope.checkInterval()
                    instanceScope.modeSelector = selectors.modeSelectorSmall
                })
            },
            async enable() {
                instanceScope.disable()
                console.log(instanceName, 'enable')
                instanceScope.isEnabled = true
                instanceScope.checkInterval()
            },
            /**
             * Disable plugin
             */
            disable() {
                console.info(instanceName, 'disable')
                //Hide panels (big/small)
                instanceScope.hideAllPanels()
                //Disable checkinterval
                instanceScope.isEnabled = false
                clearTimeout(instanceScope.checkIntervalTimetout)
            },
            hideAllPanels() {
                console.info(instanceName, 'hideAllPanels')
                document.querySelectorAll(`.wnPlugin`).forEach(el => el.dataset.hidden = '1')
            },
            isCurrentPanelVisible() {
                return document.querySelector(`.wnPlugin${instanceScope.modeSelector}`).dataset.hidden === '0'
            },
            /**
             * Check DB each 30s and open 
             */
            async checkInterval(id = Date.now()) {
                console.info(instanceName, 'checkInterval')
                await instanceScope.syncActiveMessage()
                if (instanceScope.activeMessage && !instanceScope.isCurrentPanelVisible()) {
                    window.clearInterval(instanceScope.checkIntervalTimetout)
                    console.info(instanceName, 'checkInterval found-something')
                    document.querySelector(`.wnPlugin${instanceScope.modeSelector}`).dataset.hidden = '0'
                    instanceScope.updateDom()
                } else {
                    console.info(instanceName, 'checkInterval waiting',id)
                    instanceScope.checkIntervalTimetout = setTimeout(() => instanceScope.checkInterval(Date.now()), 1000 * (options.checkIntervalSeconds||15))
                }
            },
            /**
             * @unused
             */
            toggleMode() {
                console.info(instanceName, 'toggleMode')
                instanceScope.modeSelector = instanceScope.modeSelector === selectors.modeSelectorBig ? selectors.modeSelectorSmall : selectors.modeSelectorBig
                instanceScope.hideAllPanels()
                instanceScope.enable()
            },
            clearCache() {
                window.localStorage[cacheKey] = ''
            },
            hideAllPanels() {
                document.querySelectorAll(selectors.plugin).forEach(el => {
                    el.dataset.hidden = '1'
                })
            },
            syncActiveMessage() {
                return fetch(`${options.backendURL}/messages?active=1`)
                    .then(response => response.json())
                    .then(data => {
                        let message = data.length > 0 ? data[0] : null
                        let arr 
                        try{
                            arr= JSON.parse(localStorage.getItem(cacheKey) || '[]')
                        }catch(err){
                            console.error(`While parsing ${cacheKey}`,{
                                err
                            })
                            localStorage[cacheKey] = '[]'
                        }
                        
                        if (arr.includes(message._id.toString())) {
                            console.log(instanceName, 'syncActiveMessage', 'skip-already-read')
                            return
                        }else{
                            console.log(instanceName, 'syncActiveMessage', 'check-success',{
                                message,
                                arr
                            })
                        }
                        instanceScope.activeMessage = message
                        console.log(instanceName, 'syncActiveMessage', {
                            messages: instanceScope.activeMessage
                        })
                        return
                    });
            },
            updateDom() {
                let selector = selectors.msgTemplate().split('.').join('')
                console.info(instanceName, 'updateDom', instanceScope.modeSelector, document.querySelector(selector))
                let mappings = {
                    computedTitle: item => item.shortTitle || item.title
                }

                virtualForEachInt(selector, instanceScope.activeMessage ? [instanceScope.activeMessage] : [], item => item._id).update(mappings)

                console.log(instanceName, 'bind', document.querySelectorAll(selectors.msgLearnMoreBtn))
                document.querySelectorAll(selectors.msgLearnMoreBtn).forEach(el => {
                    el.addEventListener('click', () => {
                        instanceScope.toggleMode()
                    })
                })


            },
            openHistoryView(){
                alert('openHistoryView')
            }
        }
        if (options.autoInit !== false) {
            instanceScope.mounted()
        }
        return instanceScope
    }


    //Helpers------------------



    function replaceTplVariablesInt(el, item, mappings = null) {
        for (let key in item) {
            el.innerHTML = el.innerHTML.replace(new RegExp('\\#{' + key + '}', 'g'), mappings[key] ? mappings[key](item[key]) : (item[key] || ''));
        }
        for (let key in mappings) {
            if (!Object.keys(item).includes(key)) {
                el.innerHTML = el.innerHTML.replace(new RegExp('\\#{' + key + '}', 'g'), mappings[key](item));
            }
        }

        el.innerHTML = removeTplVarIfFound(el.innerHTML, ['isActive'])
    }
    function virtualForEachInt(templateSelector, items, idCb) {
        let templateEl = document.querySelector(templateSelector)
        let rootEl = templateEl ? templateEl.parentNode : null
        console.log('virtualForEach', {
            templateEl, rootEl, items, idCb
        })

        let scope = {
            update(mappings = scope.lastMappings || {}) {

                templateEl = templateEl || document.querySelector(templateSelector)
                rootEl = rootEl || (templateEl ? templateEl.parentNode : null)

                if (!templateEl || !rootEl) {
                    console.log('vfe update fail', {
                        templateEl, rootEl
                    })
                    return
                }

                scope.lastMappings = mappings
                templateEl.style.display = ''
                rootEl.querySelectorAll('[data-id]').forEach(el => {
                    el.parentNode.removeChild(el)
                })
                items.forEach(item => {
                    const element = cloneNodeInt(templateEl)
                    console.log('virtualForEachInt update iterate', {
                        item, element
                    })
                    element.id = ""
                    element.dataset.id = item._id
                    delete element.dataset.template
                    replaceTplVariablesInt(element, item, mappings)
                    rootEl.appendChild(element);
                });
                templateEl.style.display = 'none'
                console.log('vfe update success', {
                    len: items.length,
                    rootEl
                })
                return scope
            },
            ref: watchObjectInt(items, () => {
                scope.update()
            }),
            selectable(handler, findHandler = (id, items) => items.find(i => i.id === id)) {
                rootEl.querySelectorAll('[data-id]').forEach(el => {
                    if (!el.dataset.selectable) {
                        el.dataset.selectable = true
                        el.addEventListener('click', () => {
                            handler(findHandler(el.dataset.id, items), items)
                        })
                    }
                })
            }
        }
        return scope
    }

    function watchObjectInt(obj, callback) {
        let handler = {
            get: function (target, property) {
                if (typeof target[property] === 'object' && target[property] !== null) {
                    return new Proxy(target[property], handler);
                }
                return target[property];
            },
            set: function (target, property, value) {
                if (typeof value === 'object' && value !== null) {
                    target[property] = new Proxy(value, handler);
                } else {
                    target[property] = value;
                }
                callback(property, value);
                return true;
            },
            deleteProperty: function (target, property) {
                delete target[property];
                callback(property, null);
                return true;
            }
        };

        return new Proxy(obj, handler);
    }

    function cloneNodeInt(node) {
        if (!(node instanceof Node)) {
            throw new Error("Clone Node: Node is not an instance of Node");
        }

        const clone = node.cloneNode(false);

        for (let i = 0, len = node.childNodes.length; i < len; i++) {
            clone.appendChild(cloneNodeInt(node.childNodes[i]));
        }

        return clone;
    }

    function removeTplVarIfFound(str, stringsArr) {
        stringsArr.forEach(singleStr => {
            str = str.replace(new RegExp('\\${' + singleStr + '}', 'g'), '');
        })
        return str
    }

})()