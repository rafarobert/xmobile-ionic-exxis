import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Platform} from '@ionic/angular';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    {
        path: 'login',
        loadChildren: './public/login/login.module#LoginPageModule'
    },
    {
        path: 'register',
        loadChildren: './public/register/register.module#RegisterPageModule'
    },
    {
        path: 'listaproducto',
        loadChildren: './listaproducto/listaproducto.module#ListaproductoPageModule'
    },
    {path: 'sincronizar', loadChildren: './sincronizar/sincronizar.module#SincronizarPageModule'},
    {path: 'clientes', loadChildren: './clientes/clientes.module#ClientesPageModule'},
    {path: 'producto/:id', loadChildren: './producto/producto.module#ProductoPageModule'},
    {path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosPageModule'},
    {path: 'creardocumento', loadChildren: './creardocumento/creardocumento.module#CreardocumentoPageModule'},
    {path: 'detallepedido/:id', loadChildren: './detallepedido/detallepedido.module#DetallepedidoPageModule'},
    {path: 'modalcliente', loadChildren: './modalcliente/modalcliente.module#ModalclientePageModule'},
    {path: 'modalproductos', loadChildren: './modalproductos/modalproductos.module#ModalproductosPageModule'},
    {path: 'cliente/:id', loadChildren: './cliente/cliente.module#ClientePageModule'},
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'detalleventa', loadChildren: './detalleventa/detalleventa.module#DetalleventaPageModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

    constructor(private platform: Platform) {
        this.platform.ready().then(() => {

        })
    }
}
