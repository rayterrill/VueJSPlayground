// define a mixin object
var myMixin = {
    data: function () {
        return {
            output: null
        }
    },
    created: function () {
        this.hello()
    },
    methods: {
        hello: function () {
            //outputting something coming from our component
            console.log('api: ' + this.api)
            //outputting something coming from our root instance
            console.log('authContext from inside mixin: ' + this.$root.authContext)
            //setting a local prop for this mixin - this will be available inside 
            this.output = 'output from mixin'
        }
    }
}

//a sample component
Vue.component('test-component', {
    data: function() {
        return {
            output: null,
            api: 'https://graph.microsoft.com'
        }
    },
    mixins: [myMixin],
    props: ['token'], //token is an input to our component
    template: '<div>{{ output }}</div>', //use output in our template
    mounted() {
        this.testComponentMethod()
    },
    methods: {
        testComponentMethod() {
            console.log('called testComponentMethod')
        }
    }
});

//another sample component
Vue.component('another-component', {
    data: function() {
        return {
            api: 'https://somethingelse.microsoft.com',
            diffOutput: null
        }
    },
    mixins: [myMixin], //use our mixin to 
    props: ['token'], //token is an input to our component
    template: '<div>{{ diffOutput }}</div>', //use output in our template
    mounted() {
        this.anotherComponentMethod()
    },
    methods: {
        anotherComponentMethod() {
            console.log('output is: ' + this.output) //available via the mixin even though we haven't defined this locally
            console.log('called anotherComponentMethod')
            //setting a local value for output - not set via mixin
            this.diffOutput = 'anotherComponentMethod output'
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      token: null
    },
    created () {
        this.getToken()
    },
    methods: {
        getToken() {
            this.authContext = 'boomshakalaka';
            this.token = 'boomshakalaka';
        }
    }
  })
