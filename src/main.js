import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import jQuery from 'jquery'
Vue.use(ElementUI)

Vue.config.productionTip = false

jQuery.ajaxSetup({
	timeout: 6000,
	xhrFields: {
		withCredentials: true
	},
	crossDomain: true
});

jQuery(document).ajaxError(function(ex) {
	console.log(ex);
	alert("服务器正忙....");
});

Vue.prototype.$jq = jQuery;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
