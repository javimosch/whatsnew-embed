/**
 * Source file for wn-client.universal.min.js
 * target iife (Used with <script>)
 */

import htmlTemplate from "./template"
import {virtualForEach} from './helpers'

/**
 * Plugin scope
 */
(function () {


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
                instanceScope.hideAllPanels()
                instanceScope.modeSelector='.wnSmall'
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
                document.querySelectorAll(`.wnPlugin [data-hidden]`).forEach(el => el.dataset.hidden = '1')
            },
            isCurrentPanelVisible() {
                return document.querySelector(instanceScope.modeSelector).dataset.hidden === '0'
            },
            toggleCurrentPanel(value){
                document.querySelector(instanceScope.modeSelector).dataset.hidden = value
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
                    instanceScope.toggleCurrentPanel('0')
                    instanceScope.updateDom()
                } else {
                    console.info(instanceName, 'checkInterval waiting (no active message found)',id)
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
                        
                        if (message && arr.includes(message._id.toString())) {
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
            openList(){
                console.info(instanceName,'openList')
                instanceScope.hideAllPanels()
                instanceScope.modeSelector='.wnList'
                instanceScope.toggleCurrentPanel('0')
            },
            updateDom() {
                let selector = selectors.msgTemplate().split('.').join('')
                console.info(instanceName, 'updateDom', instanceScope.modeSelector, document.querySelector(selector))
                let mappings = {
                    computedTitle: item => item.shortTitle || item.title
                }

                virtualForEach(selector, instanceScope.activeMessage ? [instanceScope.activeMessage] : [], item => item._id).update(mappings)

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


})()