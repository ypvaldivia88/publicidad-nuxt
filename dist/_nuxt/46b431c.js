(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{277:function(t,e,r){"use strict";r.r(e);r(14),r(11),r(10),r(9),r(13);var n=r(3),o=(r(45),r(21)),c=r(75),l=r(47),d=r(0);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var m={components:{BIcon:l.a,BIconTrash:d.Mv,BIconPencilSquare:d.fr},fetch:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.store,e.next=3,r.dispatch("publicities/get");case 3:case"end":return e.stop()}}),e)})))()},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.c)({list:function(t){return t.publicities.list}})),data:function(){return{id:0,fields:[{key:"nombre",label:"Nombre",sortable:!0},{key:"textoCorto",label:"Asunto",sortable:!0},{key:"textoLargo",label:"Descripción",sortable:!0},{key:"alcance",label:"Alcance",sortable:!0},{key:"categoriaId",label:"categoriaId",sortable:!0},{key:"clienteId",label:"clienteId",sortable:!0},{key:"actions",label:"Acciones"}]}},methods:{destroy:function(){var t=this;this.$store.dispatch("publicities/delete",{id:this.id}).then((function(){return t.$store.dispatch("publicities/get")})).catch((function(t){return console.log(t)}))}}},v=r(67),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-row",[r("b-col",[r("b-btn",{staticClass:"mb-3",attrs:{variant:"outline-success",to:"/publicities/new"}},[t._v("\n      Nueva Publicidad\n    ")]),t._v(" "),r("b-btn",{staticClass:"mb-3",attrs:{variant:"outline-success",to:"/publicities/random"}},[t._v("\n      Publicidad aleatoria\n    ")]),t._v(" "),r("b-table",{attrs:{striped:"",hover:"",items:t.list,fields:t.fields},scopedSlots:t._u([{key:"cell(nombre)",fn:function(data){return[r("NuxtLink",{attrs:{to:"/publicities/"+data.item.id}},[t._v(t._s(data.item.nombre))])]}},{key:"cell(actions)",fn:function(data){return[r("b-button-group",[r("b-button",{staticClass:"mb-2",attrs:{variant:"primary"},on:{click:function(e){return t.$router.push("/publicities/"+data.item.id+"/edit")}}},[r("b-icon",{attrs:{icon:"pencil-square","aria-label":"Edit"}})],1),t._v(" "),r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.confirmDestroy",modifiers:{confirmDestroy:!0}}],staticClass:"mb-2",attrs:{variant:"danger"},on:{click:function(e){t.id=data.item.id}}},[r("b-icon",{attrs:{icon:"trash","aria-label":"Delete"}})],1)],1)]}}])}),t._v(" "),r("b-modal",{attrs:{id:"confirmDestroy",title:"Confirme la eliminación"},on:{ok:t.destroy}},[t._v("\n      Está seguro que desea eliminar esto?\n    ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);