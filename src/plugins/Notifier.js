import Toasted from 'vue-toasted';

var toastedOptions = {
    position: "top-center",
    theme: "primary",
    duration: 5000,
    action: [{
        text: 'CLOSE',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    }]
};

var options = {
    bindedMsgOptions: {
        show: {
            icon: {
                name: 'description'
            }
        },
        success: {
            icon: {
                name: 'done'
            }
        },
        info: {
            icon: {
                name: 'info_outline'
            }
        },
        error: {
            icon: {
                name: 'error_outline'
            }
        },
        undo: {
            baseType: 'show',
            duration: 8000,
            icon: {
                name: 'undo'
            }
        },
        default: {}
    }
};

function mergeToastedOptions(opt1, opt2, ...opts) {
    if (opt2) {
        return mergeToastedOptions(Object.assign({}, opt1, opt2), ...opts);
    }
    if (opt1.action && opt1.action.push) {
        opt1.action.push(toastedOptions.action[0]);
    }
    return Object.assign({}, toastedOptions, opt1);
}

export default {
    install(Vue, customOptions) {
        Vue.use(Toasted, toastedOptions);

        var messagesId = {};

        var toastedMethods = {
            show: Vue.toasted.show,
            success: Vue.toasted.success,
            info: Vue.toasted.info,
            error: Vue.toasted.error,
            clear: Vue.toasted.clear
        };

        Vue.prototype.$notifier = {
            push(message, type = 'show', action) {
                let toastedMethod = toastedMethods[type] || toastedMethods[options.bindedMsgOptions[type].baseType] || null;
                let msgOptions = options.bindedMsgOptions[type] || options.bindedMsgOptions.default;

                if (typeof toastedMethod === "function") {
                    action = (action) ? {action} : action;
                    return toastedMethod(message, mergeToastedOptions(msgOptions, action));
                }
                else {
                    console.warn("Invalid message type: \"" + type + "\"");
                    return null;
                }
            },
            put(id, message, type = 'show', action) {
                if (messagesId[id] && !messagesId[id].disposed()) {
                    messagesId[id].goAway(0);
                }
                if (!(messagesId[id] = this.push(message, type, action))) {
                    delete messagesId[id];
                }
            },

            createAction(text, func, payload) {
                return {
                    text,
                    onClick(e, toastObject) {
                        func(payload);
                        toastObject.goAway(0);
                    }
                }
            },
        }
    }
};
