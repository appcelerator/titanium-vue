import Vue from 'core/index';
import { mountComponent } from 'core/instance/lifecycle.js';
import { EmulatedRootElement, ElementNode } from 'titanium-vdom';

import platformComponents from './components/index';
import { patch } from './patch';
import { TitaniumViewAccessor, TemplateGlobalProvider } from '../plugins/index';
import TitaniumRouter from '../router/titanium-router';
import { initializeTitaniumElements } from '../util/registry';

initializeTitaniumElements();

Vue.prototype.$document = new EmulatedRootElement();

Vue.options.components = platformComponents;

Vue.prototype.__patch__ = patch;

Vue.use(TitaniumRouter);
Vue.use(TitaniumViewAccessor);
Vue.use(TemplateGlobalProvider);

Vue.prototype.$start = function () {
	this.__is_root__ = true;

	const placeholder = new ElementNode('placeholder');
	this.$document.appendChild(placeholder);

	this.$mount(placeholder);
};

Vue.prototype.$mount = function (el, hydrating) {
	return mountComponent(this, el, hydrating);
};

export default Vue;
