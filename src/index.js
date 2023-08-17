import EyTableSheet from './packages/eyTableSheet/index.js';

const components = [
    EyTableSheet
]

const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    EyTableSheet
}
