import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';

import router from './router';

/* add icons to the library */
library.add(faLeftLong, faRightLong);

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
