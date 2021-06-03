(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{259:function(e,t,r){"use strict";r(14),r(11),r(10),r(9),r(13);var n=r(3),o=r(75);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={name:"ClientForm",data:function(){return{options:[{text:"Natural",value:!1},{text:"Jurídica",value:!0}]}},computed:c({},Object(o.c)("clients",["client"])),methods:c(c({},Object(o.b)({mergeClient:"clients/mergeClients"})),{},{isUpdate:function(){return this.client.hasOwnProperty("id")},submit:function(){var e=this,t=this,r="clients/"+(this.isUpdate()?"update":"create");this.$validator.validateAll().then((function(n){console.log(n),n?e.$store.dispatch(r,e.client).then((function(r){var n=r.data.nombre+" "+e.isUpdate()?"Actualizado":"creado";t.$notify({text:n,type:"success",group:"alerts"}),t.$router.push("/clients")})).catch((function(e){t.$notify({text:"Ha ocurrido un error en el servidor",type:"warning",group:"alerts"})})):t.$notify({text:"Por favor solucione los errores en el formulario.",type:"warning",group:"alerts"})}))},validateState:function(e){return this.veeFields[e]&&this.veeFields[e].dirty?!this.errors.has(e):null}})},v=r(67),component=Object(v.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("b-row",{attrs:{"align-h":"end"}},[r("b-col",{staticClass:"text-right"},[r("b-link",{attrs:{to:"/clients"}},[e._v("\n        Regresar\n      ")])],1)],1),e._v(" "),r("b-form-group",{attrs:{label:"Nombre"}},[r("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],ref:"nombre",attrs:{id:"clientNombreInput",name:"client[nombre]",state:e.validateState("client[nombre]"),type:"text","data-vv-delay":"500",placeholder:"Nombre",value:e.client.nombre},on:{input:function(t){return e.mergeClient({nombre:t})}}}),e._v(" "),r("b-form-invalid-feedback",[e._v("Este campo es requerido")])],1),e._v(" "),r("b-form-group",{attrs:{label:"Teléfono"}},[r("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],ref:"telefono",attrs:{id:"clientTelefonoInput",name:"client[telefono]",state:e.validateState("client[telefono]"),type:"number","data-vv-delay":"500",placeholder:"Teléfono",value:e.client.telefono},on:{input:function(t){return e.mergeClient({telefono:t})}}}),e._v(" "),r("b-form-invalid-feedback",[e._v("Este campo es requerido")])],1),e._v(" "),r("b-form-group",{attrs:{label:"Correo"}},[r("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],ref:"correo",attrs:{id:"clientCorreoInput",name:"client[correo]",state:e.validateState("client[correo]"),type:"email","data-vv-delay":"500",placeholder:"Correo",value:e.client.correo},on:{input:function(t){return e.mergeClient({correo:t})}}}),e._v(" "),r("b-form-invalid-feedback",[e._v("Este campo es requerido")])],1),e._v(" "),r("b-form-group",{attrs:{label:"Contrato"}},[r("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],ref:"contrato",attrs:{id:"clientContratoInput",name:"client[contrato]",state:e.validateState("client[contrato]"),type:"text","data-vv-delay":"500",placeholder:"Contrato",value:e.client.contrato},on:{input:function(t){return e.mergeClient({contrato:t})}}}),e._v(" "),r("b-form-invalid-feedback",[e._v("Este campo es requerido")])],1),e._v(" "),r("b-form-group",{attrs:{label:"Dirección"}},[r("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],ref:"direccion",attrs:{id:"clientDireccionInput",name:"client[direccion]",state:e.validateState("client[direccion]"),type:"text","data-vv-delay":"500",placeholder:"Dirección",value:e.client.direccion},on:{input:function(t){return e.mergeClient({direccion:t})}}}),e._v(" "),r("b-form-invalid-feedback",[e._v("Este campo es requerido")])],1),e._v(" "),r("b-form-group",{attrs:{label:"Tipo de Persona"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.tipoPersona;return[r("b-form-radio-group",{attrs:{id:"btn-radios-2",value:e.client.persona,options:e.options,"aria-describedby":n,"button-variant":"outline-primary",name:"radio-btn-outline",buttons:""}})]}}])}),e._v(" "),r("b-btn",{staticClass:"my-3",attrs:{type:"submit"}},[e._v(e._s(e.isUpdate()?"Actualizar":"Salvar"))])],1)}),[],!1,null,null,null);t.a=component.exports},286:function(e,t,r){"use strict";r.r(t);r(45);var n=r(21),o={name:"editClient",components:{ClientForm:r(259).a},fetch:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.store,n=e.params,t.next=3,r.dispatch("clients/show",{client_id:n.client_id});case 3:case"end":return t.stop()}}),t)})))()}},l=r(67),component=Object(l.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("client-form")}),[],!1,null,null,null);t.default=component.exports}}]);