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
    template: '<div v-if="token">{{ token }}</div><div v-else>Loading...</div>', //use output in our template
    updated() {
        this.anotherComponentMethod()
    },
    methods: {
        anotherComponentMethod() {
            console.log('token is: ' + this.token);
            console.log('output is: ' + this.output) //available via the mixin even though we haven't defined this locally
            console.log('called anotherComponentMethod')
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
        delayedFunction() {
            console.log('setting authContext and token after delay...')
            this.authContext = 'boomshakalaka';
            this.token = 'boomshakalaka';
        },
        getToken() {
            setTimeout(() => {
                this.delayedFunction();
            }, 3000);
        }
    }
  })
