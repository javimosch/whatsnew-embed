
export function replaceTplVariables(el, item, mappings = null) {
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

export function virtualForEach(templateSelector, items, idCb) {
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
                const element = cloneNode(templateEl)
                console.log('virtualForEach update iterate', {
                    item, element
                })
                element.id = ""
                element.dataset.id = item._id
                delete element.dataset.template
                replaceTplVariables(element, item, mappings)
                rootEl.appendChild(element);
            });
            templateEl.style.display = 'none'
            console.log('vfe update success', {
                len: items.length,
                rootEl
            })
            return scope
        },
        ref: watchObject(items, () => {
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

export function watchObject(obj, callback) {
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

export function cloneNode(node) {
    if (!(node instanceof Node)) {
        throw new Error("Clone Node: Node is not an instance of Node");
    }

    const clone = node.cloneNode(false);

    for (let i = 0, len = node.childNodes.length; i < len; i++) {
        clone.appendChild(cloneNode(node.childNodes[i]));
    }

    return clone;
}

export function removeTplVarIfFound(str, stringsArr) {
    stringsArr.forEach(singleStr => {
        str = str.replace(new RegExp('\\${' + singleStr + '}', 'g'), '');
    })
    return str
}