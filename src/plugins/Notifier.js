import Toasted from 'vue-toasted';

var toastedOptions = {
    position: "top-center",
    theme: "primary",
    duration: 5000,
    action : {
        text : 'CLOSE',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    }
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
        default: {}
    }
};

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
            push: function(message, type = 'show') {
                if (typeof toastedMethods[type] === "function") {
                    var msgOptions = (options.bindedMsgOptions[type]) ? options.bindedMsgOptions[type] : options.bindedMsgOptions.default;
                    toastedMethods[type](message, msgOptions);
                }
                else {
                    console.warn("Invalid message type: \"" + type + "\"");
                }
            },
            put: function(id, message, type = 'show') {
                if (messagesId[id] && !messagesId[id].disposed()) {
                    messagesId[id].goAway(0);
                }
                if (typeof toastedMethods[type] === "function") {
                    var msgOptions = (options.bindedMsgOptions[type]) ? options.bindedMsgOptions[type] : options.bindedMsgOptions.default;
                    messagesId[id] = toastedMethods[type](message, msgOptions);
                }
                else {
                    console.warn("Invalid message type: \"" + type + "\"");
                }
            }
        }
    }
};
