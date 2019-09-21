const Foo = { template: '<div>Hola Mundo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [

    { path: '/', component: Home },
    { path: '/Productos/Vodka', component: Vodka },
    { path: '/Productos/Vodka', component: Vodka },
    { path: '/Productos/Cerveza', component: Cerveza },
    { path: '/Productos/Whiskys', component: Whiskys },
    { path: '/Productos/Aperitivos', component: Aperitivos },
    { path: '/Productos/Champagne', component: Champagne },
    { path: '/Productos/Licor', component: Licor },
    { path: '/Productos/Tequila', component: Tequila },
    { path: '/Productos', component: Productos },
]
const router = new VueRouter({
    routes // short for `routes: routes`
})

var vm = new Vue({
    el: '#app',
    router: router,
})