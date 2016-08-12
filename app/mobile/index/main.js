var Vue = require('vue');
var MyComponent = Vue.extend({
    template:"<p>hello nihao</p>"
})

Vue.component('my-component',MyComponent);

new Vue({
    el:"body"
})