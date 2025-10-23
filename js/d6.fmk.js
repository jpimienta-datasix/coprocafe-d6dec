/* ~~~~~~~~~~~~~~~~~~~~~~~~~
* D6Framework for Javascript 
* v1.0
* Release 20151218-20161121
* jpimienta@datasix.es
* http://www.datasix.es
* ~~~~~~~~~~~~~~~~~~~~~~~~~ */

var d6 = (d6 || {});

d6.fmk = (function(fmk)
{
    /*
    * loadCBoxArray: Para cargar un SELECT a partir de los datos individuales, cargados dentro de un Array
    * _i: ID del SELECT
    * _a: Array que contiene los valores individuales
    * _fnc: evento y función que se ejecutará cuándo ocurra (p.ej. select: function(_e, _i))
    * _v: valor por defecto [por desarrollar]
    * _blk: true/false > para que añada un primer elemento en blanco
    */

    fmk.loadCBoxArray = function (_i, _a, _fnc, _v, _blk) {
        //FALTA DESARROLLAR (si fuera necesario): _v
        //Guardamos el valor por defecto
        $(_i).attr('d6-defVal', (_v==undefined)?'':_v);
        //        
        var _o=[];
        if (_blk===true) {
            _o.push( "<option value='' " + ((_v==='' || _v===undefined) ? "selected='selected'" : "")  + "></option>" );                    
        } 
        for (var _n=0; _n<_a.length; _n++) {
            _o.push(_a[_n]);
        }
        $(_i).html(_o.join('')).combobox(_fnc);
        //Si tiene activo un valor por defecto, se muestra en el INPUT asociado
        $(_i).siblings('.custom-combobox').find('input').val( $(_i + ' :selected').text() );
    }


    /* ~~~~~~~~~~~~~~~~~~~~~~~~~
    * jQuery UI :: Autocompletar con AJAX
    * 20151218
    * Dependencias: 
    * - jQuery JavaScript Library v1.10.2
    * - jQuery UI 1.11.4
    * - jQuery UI :: Autocompletar de D6FrameworkJS $(item).combobox();
    * Información: 
    * Uso:
    * LoadCBox(item, URL > json, valor, función, elemento 'Todos', ID código, función al finalizar carga valores, Blank); 
    * > Dónde: 
    * >> _i: 'item' es un objeto SELECT de HTML.
    * >> _u: 'URL/json' es una URL que devuelve un json con esta estructura: {Result: "OK|ERROR", Records: [{Option: "valor1", Option: "valor2", ...}]}
    * >> _v: 'valor' que debe seleccionar por defecto.
    * >> _fnc: 'función' es una función  que permite controlar qué debe hacer una vez se haya seleccionado un elemento.
    * >>> Por Ejemplo: 
                {
                    select: function(event, ui){
                        loadCBox('#slc_qlt', 'engine.asp?a=rcbql&o=' + this.value);        
                }}
    * >> _a: true/false para indicar si debe tener en cuenta o no la creación del elemento 'Todos'
    * >> _cd: id del input que mostrará el valor (si no se define, no lo tiene en cuenta)
    * >> _eld: mandato que se ejecuta en cuanto se acaba de cargar la lista
    * >>> Por ejemplo: ######¿... No acaba de funcionar? ###### < -----------------------------------------------------------------------
                function() {
                    if ($('#ct_condent :selected').text()=='FOB') {
                        d6.fmk.setValue('#ct_fltdst', 'Barcelona');
                    }
                }
    * >> _blk: para que cree un elemento "blanco"
    * ~~~~~~~~~~~~~~~~~~~~~~~~~ */
    fmk.loadCBox = function(_i, _u, _v, _fnc, _a, _cd, _eld, _blk){
        // i: item
        // u: url que devuelve un json
        // v: valor seleccionado por defecto
        // fnc: función para indicar qué debe hacer según el evento que interese (por ejemplo un 'select')
        // a: true/false para indicar si debe tener en cuenta o no la creación del elemento 'Todos'
        // cd: id del input que mostrará el valor (si no se define, no lo tiene en cuenta)
        // eld: función a ejecutar una vez se haya cargado la lista de elementos (por ejemplo: '$(\'#inp_h_txt_clpr\').val($(\'#ct_clpr :selected\').text());')
        // blk: true/false por si queremos que añada el elemento "en blanco" a la lista

        // ###~~~DEBUG
        var __bLg;
        var _iDBg ='#ct_qlt';
        if (_i==_iDBg) { __bLg=true; } else { __bLg=false; }


        //Colocamos el valor por defecto siempre que no exista ya
        if (!($(_i).attr('d6-defVal'))) {
            $(_i).attr('d6-defVal', (_v==undefined)?'':_v);    
        }
        
        //
        ($(_i).siblings()).each(function(_x){
            if( ($(this).attr('class')).indexOf('custom-combobox')!==-1 ){ //$(_i).siblings()[1]!==undefined
                try{
                    (($(_i).siblings()[1]).children[0]).value='Cargando...'; //Para informar de la carga cuando por cambio de otro elemento se fuerza la recarga    
                } catch(e){
                    d6.fmk.cLog('!ERROR _i: ' + _i + ' / _x: ' + _x + ' [e=' + e + ']');
                }
            }
        });
        $.getJSON( _u, function( data ) {
            var items = [];
            if (data.Result=="ERROR") {
                $(_i).html("<option value='.'>ERROR al cargar los elementos</option>") 
            } else{ 
                //Si el JSON no trae nada...
                if (data.Records.length==0) {
                    try {
                        //cuando hay definido un label+select para autocomplete 
                        (($(_i).siblings()[1]).children[0]).value='No hay datos'; 
                        if (_cd) d6.fmk.setValue(_cd, ''); // Si hay input para el código, lo rellenamos
                    } catch (e) {
                        //cuando hay definido sólo un select para autocomplete 
                        (($(_i).siblings()[0]).children[0]).value='No hay datos'; 
                        if (_cd) d6.fmk.setValue(_cd, ''); // Si hay input para el código, lo rellenamos
                    }                    
                }

                // Elementos obtenidos por AJAX
                $.each( data.Records, function( key, val ) {
                    var sSlc="";
                    if (key==0) {
                        // Elementos 'Todos' si _a es cierto o no se ha definido
                        if (_a===undefined || _a==="" || _a===true) {
                            items.push( "<option value='ALL' " + ((_v==='' || _v===undefined) ? "selected='selected'" : "")  + ">Todos</option>" );                    
                        } 

                        if (_blk===true) {
                            items.push( "<option value='' " + ((_v==='' || _v===undefined) ? "selected='selected'" : "")  + "></option>" );                    
                        } 

                        if (!((_a===undefined || _a==="" || _a===true) || (_blk===true))) {
                            sSlc=(_v===undefined || _v==="" ? "selected='selected'" : "");    
                        } 

                        if (val.Value===_v) sSlc="selected='selected'";
                        if (__bLg) { 
                            d6.fmk.cLog('[loadCBox] ' + _iDBg + ' option > value:' + val.Value + '['+ typeof (val.Value) +']' + ' (' + _v + '[' + typeof _v +'])'); 
                            if (val.Value===_v) {
                                d6.fmk.cLog('[loadCBox] ' + _iDBg + ' selected > value:' + val.Value);     
                            } 
                        }
                    }  else {
                        sSlc=(val.Value===_v ? "selected='selected'" : "");
                        if (__bLg) { 
                            d6.fmk.cLog('[loadCBox] ' + _iDBg + ' option > value:' + val.Value + '['+ typeof val.Value +']' + ' (' + _v + '[' + typeof _v +'])'); 
                            if (val.Value===_v) {
                                d6.fmk.cLog('[loadCBox] ' + _iDBg + ' selected > value:' + val.Value);     
                            } 
                        }
                    }
                    // DEBUG
                    items.push( "<option value='" + (val.Value ? val.Value : val.Option) + "' " + sSlc + ">" + val.Option + "</option>" );
                });

                $(_i).html(items.join( "" )).combobox(_fnc);
                $(_i).on('autocompletechange', function(){
                    fmk.cLog('loadCBox [autocompletechange]= ' + $(this).val());
                });
                

                //Muestra en el 'input' el valor seleccionado por defecto
                $(_i + ' option').each(function(){ 
                    try {
                        //cuando hay definido un label+select para autocomplete 
                        if ($(this).attr('selected')) {
                            if (__bLg) { 
                                d6.fmk.cLog('[loadCBox] ' + _iDBg + ' input > value:' + (($(_i).siblings()[1]).children[0]).value);
                                d6.fmk.cLog('[loadCBox] ' + _iDBg + ' > val:' + $(this).val() + ' > text:' + $(this).text() + ' > value:' + $(this).value ); 
                            }
                            (($(_i).siblings()[1]).children[0]).value=$(this).text(); 
                            if (_cd) d6.fmk.setValue(_cd, $(this).val()); // Si hay input para el código, lo rellenamos
                        }
                    } catch (e) {
                        //cuando hay definido sólo un select para autocomplete 
                        if ($(this).attr('selected')) {
                            if  ($($(_i).siblings()[0]).hasClass('ui-icon')) { // Para cuando tenemos el botón del 'trash'
                                ($($(_i).siblings()[1]).find('input')[0]).value=$(this).text();     
                            } else {
                                (($(_i).siblings()[0]).children[0]).value=$(this).text();     
                            }
                            
                            if (_cd) d6.fmk.setValue(_cd, $(this).val()); // Si hay input para el código, lo rellenamos
                        } 
                    }
                    
                });

            }
        }).done(function(){ //Si se ha acabado la petición JSON correctamente...
            if (_eld!=undefined && _eld!='') {
                //Ejecuta este mandato una vez se han cargado ya los datos de la lista
                eval(_eld);
            }            
        });
    }
    
    /**
     * setValue: Para dar un valor a un objeto del formulario
     * @param {str} _id  [id del objeto]
     * @param {str} _val [valor que queremos darle] Si no se informa este parámetro es porque se quiere ponder el valor por defecto: option[0] o ""
     * @param {bool} _dv [true/false] Si es true, quiere decir que se crea el atributo d6-defVal con el valor     
     */
    fmk.setValue = function(_id, _val, _dv){
        var __bLg=(_id=='#ct_entr-emb-1')?true:false; 
        fmk.cLog('[setValue] tagName: ' + $(_id)[0].tagName + ' [' + (($(_id)[0].tagName=='INPUT')?$(_id).attr('type'):'') + ']');
        switch($(_id)[0].tagName){
            case 'INPUT':
                if (_val==undefined) {
                     if ($(_id).attr('type')=='text') { $(_id).val(''); } //Sólo los input de tipo "text"
                } else {
                    if ($(_id).attr('readonly')) {
                        $(_id).removeAttr('readonly').val(_val).attr('readonly','true');
                    } else {
                        if ($(_id).attr('type')=='checkbox') {
                            fmk.setCheckBox(_id, _val);
                        } else {
                            $(_id).val(_val);
                        }
                    }
                    if (_dv) $(_id).attr('d6-defVal', _val);
                }
                break;
            case 'SELECT':
                if (_val==undefined) { //Valor por defecto
                    //Quitamos selección actual
                    $(_id).children().each(function(){
                        $(this).removeAttr('selected');
                    });
                    //Selecionamos el primer elemento (será ALL|Todos o el primer valor si no se había indicado esta posibilidad)
                    $($(_id).children()[0]).attr('selected','selected');
                    //Rellenamos el "input" asociado con el Texto de la opción del primer valor
                    ($(_id).siblings()).each(function(_x){
                        if( ($(this).attr('class')).indexOf('custom-combobox')!==-1 ){
                            $(this).children()[0].value=$($(_id).children()[0]).text();
                        }
                    });
                } else {
                    $(_id).val(_val);
                    $(_id + ' option').each(function(){
                        var _opt=this;
                        //$(_opt).removeAttr('selected');
                        if (_opt.value==_val) {
                            //$(_opt).attr('selected','selected');
                            ($(_id).siblings()).each(function(_x){
                                if( ($(this).attr('class')).indexOf('custom-combobox')!==-1 ){
                                    $(this).children()[0].value=$(_opt).text();
                                }
                            });
                        }
                    });
                    if (__bLg) {
                        d6.fmk.cLog('[setValue] _dv:'+ _dv +' / _id:'+ _id +' / _val:'+ _val);
                    }
                    if (_dv) $(_id).attr('d6-defVal', _val);
                }
                break;
            case 'TEXTAREA':
                if (_val==undefined) { 
                    $(_id).val('');
                } else {
                    $(_id).val(_val);
                }
                if (_dv) $(_id).attr('d6-defVal', _val);
                break;
        }
    }    
    
    /**
     * cLog: Para escribir en la consola
     * @param {str} _txt [Texto a escribir]
     */
    fmk.cLog = function(_txt){
        console.log(_txt);
    }
    

    /**
     * setCheckBox: Para dar valor cierto (Sí) o falso (No)
     * @param {str} _i [ID del input checkbox]
     * @param {str} _b [Valor que se le da: true / false]
     */
     fmk.setCheckBox = function(_i, _b){
        $(_i).prop('checked', _b);
        $(_i).val( (_b)?'True':'False' );
        var $_lbl=$('label[for="' + _i.substr(1) + '"]');
        if ($(_i).prop('checked')) { 
            ($_lbl).html( (($_lbl).html()).replace('No','Sí') ).addClass('ui-state-active'); 
        } else { 
            ($_lbl).html( (($_lbl).html()).replace('Sí','No') ).removeClass('ui-state-active').addClass('ui-state-default'); 
        }
     }

    /**
     * setRadio: Para dar el valor a un grupo de radio buttons
     * @param {str} _n [Name del conjunto de radio buttons]
     * @param {str} _v [Valor que se le da]
     */
    fmk.setRadio = function (_n, _v) {
        $('input:radio[name="' + _n + '"]').each(function(){
            var _t=($('#'+this.id+' + label').text()==='')?$('#'+this.id).val():$('#'+this.id+' + label').text();
            if( _t==_v) {
                $(this).click();
                $(this).parent().buttonset("refresh");
            } 
        });
    }

    /**
     * getRadio: Para obtener el valor de un grupo de radio buttons
     * @param {str} _i [ID del padre del conjunto de radio buttons] $(id).buttonset()
     */    
    fmk.getRadio = function (_i) {
        var _r;
        _r=$(_i+' :radio:checked').attr('value');
        _r=(_r==undefined || _r==='')?$(_i+' :radio:checked + label').text():_r;
        return _r;
    }

    /**
     * getCheckboxSet: Para obtener los valores de un conjunto de Checkboxes (todos deben tener el mismo "name")
     * @param {str} _n [Name utilizado en todos los input[checkbox] $(id).buttonset()
     * @param {str} _s [Carácter para el separador de los valores devueltos. Si no se dice nada, será coma (,)
     */ 
    fmk.getCheckboxSet = function (_n,_s) {
        var _lv='';
        var _sp=(_s==undefined)?',':_s;
        $('input[name='+_n+']:checked').each(function(){ 
            //console.log($(this).val()) 
            _lv+=$(this).val()+_sp
        });
        return fmk.delEndChar(_lv);
    }

    /**
     * setCheckboxSet: Para dar los valores a un conjunto de Checkboxes (todos deben tener el mismo "name")
     * @param {str} _n [Name utilizado en todos los input[checkbox. El name y el ID del "padre" deben coincidir] $(id).buttonset()
     * @param {str} _v [valores separados por el separador indicado en el siguiente parámetro]
     * @param {str} _s [Carácter para el separador de los valores devueltos. Si no se dice nada, será coma (,)]
     */ 
    fmk.setCheckboxSet = function (_n,_v,_s) {
        var _vc='';
        var _sp=(_s==undefined)?',':_s;
        var aVl=_v.split(_s);
        $('input[name='+_n+']').each(function(){ 
            $(this).prop('checked',false);
            $('label[for='+this.id+']').removeClass('ui-state-default').addClass('ui-state-default');
            _vc=$(this).val();
            for(_x in aVl){
                if (_vc===aVl[_x]) {
                    $(this).prop('checked',true);
                    if (!($('input[name='+_n+']').attr('d6-defVal'))) {
                        $(this).attr('d6-defVal',_vc);
                    }
                }
            };
        });
        $('#'+_n).buttonset('refresh');
    }

    /**
     * cmbBoxDisabled: Para forzar un objeto combobox del formulario a Enable / Disable
     * @param {str} _i [ID del combobox]
     * @param {bln} _b [Disable / Enable: true / false]
     */
     fmk.cmbBoxDisabled = function(_i,_b){
        if (_b) {
            $(_i).siblings().find("input,a").removeClass("ui-state-default").addClass("ui-state-disabled");
            $(_i).siblings().find("input" ).prop("readonly", "readonly");                  
        } else {
            $(_i).siblings().find("input,a").removeClass("ui-state-disabled").addClass("ui-state-default");
            $(_i).siblings().find("input" ).removeProp("readonly", "readonly");                  
        }
     }

    /**
     * chkBoxDisabled: Para forzar un objeto checkbox del formulario a Enable / Disable
     * @param {str} _i [ID del input.checkbox]
     * @param {bln} _b [Disable / Enable: true / false]
     * @param {bln} _v [Valor asignado: true / false] > Para poder dejarlo deshabilitado pero con el valor que interese. Por defecto: false
     */
     fmk.chkBoxDisabled = function(_i,_b,_v){
        var _vi=(_v==undefined)?false:_v;
        if (_b) {
            fmk.setCheckBox(_i,_vi);
            $(_i).removeClass("ui-state-default").addClass("ui-state-disabled");
            $(_i).button('disable');

            //$(_i).prop("readonly", "readonly");                  
        } else {
            $(_i).removeClass("ui-state-disabled").addClass("ui-state-default");
            $(_i).button('enable');
            //$(_i).removeAttr('disabled');
            //$(_i).removeProp("readonly", "readonly");                  
        }
     }

    /**
     * radioDisabled: Para forzar un objeto radio button del formulario a Enable / Disable
     * @param {str} _i [ID del input.radio]
     * @param {str} _s [ID del elemento sobre el que se crea el buttonset]
     * @param {bln} _b [Disable / Enable: true / false]
     */
     fmk.radioDisabled = function(_i,_s,_b){
        if (_b) {
            fmk.setRadio(_i.substr(1),false);
            //$('label[for='+_i.substr(1)+']').removeClass("ui-state-default").addClass("ui-state-disabled");
            //$(_i).prop("readonly", "readonly");                  
            $(_i).attr('disabled', 'disabled');
            $(_s).buttonset('refresh');
        } else {
            //$('label[for='+_i.substr(1)+']').removeClass("ui-state-disabled").addClass("ui-state-default");
            //$(_i).removeProp("readonly", "readonly");                  
            $(_i).removeAttr('disabled');
            $(_s).buttonset('refresh');
        }
     }


    /**
     * inpBoxDisabled: Para forzar un objeto input del formulario a Enable / Disable
     * @param {str} _i [ID del input]
     * @param {bln} _b [Disable / Enable: true / false]
     */
     fmk.inpBoxDisabled = function(_i,_b){
        if (_b) {
            $(_i).removeClass("ui-state-default").addClass("ui-state-disabled");
            $(_i).prop("readonly", "readonly");                  
        } else {
            $(_i).removeClass("ui-state-disabled").addClass("ui-state-default");
            $(_i).removeProp("readonly", "readonly");                  
        }
     }

    /**
     * chkEMail: Para comprobar si una dirección de EMail es válida
     * @param {str} _e [Dirección de EMail]
     */
     fmk.chkEMail = function(_e) {
        if ($(_e).val()==='') return true;
        //var re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
        var re =  /\S+@\S+\.\S+/;
        if (!re.test($(_e).val()))
        {
            return false;
        } else {
            return true;
        }
     }

    /**
     * getD6Fields: Para obtener un listado de los CAMPOS (atributo d6-field="campo")
     * @param {str} _s [Separador entre los nombres delos campos (ej. ',') >> Por defecto es una coma (',')
     */
     fmk.getD6Fields = function(_save,_s) {
        var _l='';
        if (_save==undefined) _save=true;
        if (_s==='' || _s==undefined) _s=',';
        $('[d6-field]').each(function(){
            var _d=false, _i;
            var _prc=true; //Procesar este campo...
            //Si se obtienen los campos para Guardar el Ctto (_save=true) no se recogen los valores de los ENTREGAS superiores a 1
            if (_save) {
                for (var _x=2; _x<14; _x++){
                    if ( ($(this).attr('d6-field')==='ENTREGA_'+_x+'_CANTIDAD') || ($(this).attr('d6-field')==='ENTREGA_'+_x+'_EMBARQUE') || ($(this).attr('d6-field')==='ENTREGA_'+_x+'_FIJACION') ) {
                        _prc=false;
                    }
                }
                //Para quitar las APLICACIONES con estructura de "_#Entrega_#Aplicación_", ya que se han creado unos campos HIDDEN específicos
                for (var _x=1; _x<=13; _x++) {
                    if ( ($(this).attr('d6-field')).indexOf('APLICACION_'+_x+'_')==0 ) _prc=false;
                }
                //Dejamos sólo los HIDDEN (APLICACION_#_CONTRATO, APLICACION_#_CANTIDAD)
                for (var _x=1; _x<=4; _x++) {
                    if ( ($(this).attr('d6-field')).indexOf('APLICACION_'+_x+'_CONTRATO')==0 ) _prc=true;
                    if ( ($(this).attr('d6-field')).indexOf('APLICACION_'+_x+'_CANTIDAD')==0 ) _prc=true;
                }
            }

            if (_prc) {
               //Control para si está o no deshabilitado
                if ((this.id).indexOf('inp_h_txt')==0) {
                    _i='#'+(this.id).replace('inp_h_txt','ct');
                } else {
                    _i='#'+this.id;
                }
                if ($(_i).prop('tagName')=='SELECT') { //Comprobación de si está deshabilitado...
                    if ($(_i).siblings().find("input").hasClass("ui-state-disabled")) _d=true;
                } else {
                    if ($(_i).hasClass('ui-state-disabled')) _d=true;
                }

                if (!_d) {            
                    _l+='['+$('#'+this.id).attr('d6-field')+']'+_s;
                }
            }
        });
        return fmk.delEndChar(_l,1);
     }

    /**
     * getD6Values: Para obtener un listado con los valores de los CAMPOS (atributo d6-field="campo"): valor del elemento asociado
     * @param {str} _s [Separador entre los nombres delos campos (ej. ',') >> Por defecto es una coma (',')
     */
     fmk.getD6Values = function(_save,_s) {
        var _l='';

        if (_save==undefined) _save=true;
        if (_s==='' || _s==undefined) _s=',';
        $('[d6-field]').each(function(){
            var _v=$('#'+this.id).val();
            var _d=false, _i=''; 
            var _t=$('#'+this.id).attr('d6-fieldType');
            var _vl='';
            var _prc=true; //Procesar este campo...
            //Si se obtienen los valores para Guardar el Ctto (_save=true) no se recogen los correspondientes a las ENTREGAS superiores a 1
            if (_save) {
                for (var _x=2; _x<14; _x++){
                    if ( ($(this).attr('d6-field')==='ENTREGA_'+_x+'_CANTIDAD') || ($(this).attr('d6-field')==='ENTREGA_'+_x+'_EMBARQUE') || ($(this).attr('d6-field')==='ENTREGA_'+_x+'_FIJACION') ) {
                        _prc=false;
                    }
                }
                //Para quitar las APLICACIONES con estructura de "_#Entrega_#Aplicación_", ya que se han creado unos campos HIDDEN específicos
                for (var _x=1; _x<=13; _x++) {
                    if ( ($(this).attr('d6-field')).indexOf('APLICACION_'+_x+'_')==0 ) _prc=false;
                }
                //Dejamos sólo los HIDDEN (APLICACION_#_CONTRATO, APLICACION_#_CANTIDAD)
                for (var _x=1; _x<=4; _x++) {
                    if ( ($(this).attr('d6-field')).indexOf('APLICACION_'+_x+'_CONTRATO')==0 ) _prc=true;
                    if ( ($(this).attr('d6-field')).indexOf('APLICACION_'+_x+'_CANTIDAD')==0 ) _prc=true;
                }    
            }

            if (_prc) {
                if ($('#'+this.id).is(':checkbox')) { //Valor para un CheckBox (en la BBDD es tipo Bit: true/false)
                    _v=($('#'+this.id).is(':checked'))?true:false;
                    d6.fmk.cLog('[getD6Values] CheckBox > ' + '#'+this.id + ': ' + _v);
                }

                if (_t)

                //Control para si está o no deshabilitado
                if ((this.id).indexOf('inp_h_txt')==0) {
                    _i='#'+(this.id).replace('inp_h_txt','ct');
                } else {
                    _i='#'+this.id;
                }
                if ($(_i).prop('tagName')=='SELECT') { //Comprobación de si está deshabilitado...
                    if ($(_i).siblings().find("input").hasClass("ui-state-disabled")) _d=true;
                } else {
                    if ($(_i).hasClass('ui-state-disabled')) _d=true;
                }            

                d6.fmk.cLog('[getD6Values] '+$(this).attr('d6-field')+' > '+this.id+': '+_v);
                if (!_d) {
                    if (_v==='' || _v===undefined) {
                        _vl='NULL'
                    } else {
                        switch(_t){
                            case 'T':
                                _vl='\''+_v.replace('\'','\'\'')+'\'';
                                break;
                            case 'N': 
                                _vl=_v.replace('.','').replace(',','.');
                                break;
                            case 'B': 
                                if (typeof(_v)=='string') { //Caso de ENTREGA_UNICA
                                    _vl=((_v).toUpperCase()==='TRUE')?1:0; 
                                } else {
                                    _vl=(_v)?1:0;    
                                }
                                break;
                            case 'D': 
                                //_vl='\''+d6.fmk.Right(_v,4)+'-'+_v.substring(3,5)+'-'+d6.fmk.Left(_v,2)+'\'';
                                _vl='\''+d6.fmk.Right(_v,4)+_v.substring(3,5)+d6.fmk.Left(_v,2)+'\'';
                        }                    
                    }
                    _l+=_vl+_s;
                    d6.fmk.cLog($(this).attr('d6-field')+': '+_v+' / '+_vl);
                } 
            }

        });
        return fmk.delEndChar(_l,1);
     }

    /**
     * delEndChar: Para eliminar una cantidad de caracteres por el final de un texto
     * @param {str} _t [Texto al que se desea eliminar caracteres por el final]
     * @param {num} _n [Cantidad de caracteres a eliminar por el final. Sin no se informa, borrará 1]
     */
     fmk.delEndChar = function(_t,_n) {
        var _nc=(_n==undefined)?1:_n;
        return (_t).slice(0, _nc*(-1));
     }

    /*
    * customWidthSELECT: para ampliar el ancho de un SELECT
    * @param {str} _i [Id del elemento SELECT a ampliar]
    * @param {str} _w [Ancho en píxels que se desea para este elemento]
    */
    fmk.customWidthSELECT = function(_i,_w) {
        $(_i).siblings('span.custom-combobox').find('input').css('width',_w); //Fijamos el ancho del SELECT
        $(_i).siblings('span.custom-combobox').find('a').css('right','-30px'); //colocamos el botón para desplegable en su nueva ubicación
    }

    /*
    * customWidthINPUT: para ampliar el ancho de un INPUT
    * @param {str} _i [Id del elemento INPUT a ampliar]
    * @param {str} _w [Ancho en píxels que se desea para este elemento]
    */
    fmk.customWidthINPUT = function(_i,_w) {
        $(_i).css('width',_w );
    }

    /*
    * Left: para coger una parte de una cadena por la izquierda
    * @param {str} _t [texto]    
    * @param {num} _n [número de caracteres]    
    */
    fmk.Left=function(_t, _n){
        if (_n <= 0)
            return "";
        else if (_n > String(_t).length)
            return _t;
        else
            return String(_t).substring(0,_n);
    }
     
    /*
    * Right: para coger una parte de una cadena por la derecha
    * @param {str} _t [texto]    
    * @param {num} _n [número de caracteres]    
    */     
    fmk.Right=function(_t, _n){
        if (_n <= 0)
           return "";
        else if (_n > String(_t).length)
           return _t;
        else {
           var iLen = String(_t).length;
           return String(_t).substring(iLen, iLen - _n);
        }
    }

    /*
    * Rdn2: Para redondear a 2 decimales
    */
    fmk.Rdn2=function(_n) {
        var _o=parseFloat(_n);
        var _r=Math.round(_o*100)/100;
        return _r;
    }

    /*
    * RdnX: Para redondear a X decimales
    */
    fmk.RdnX=function(_n,_x) {
        var _o=parseFloat(_n);
        var _r=Math.round(_o*Math.pow(10,_x))/Math.pow(10,_x);
        return _r;
    }

    /*
    * isNumber: Para verificar que un valor sea estrictamente un número
    */
    fmk.isNumber=function(_n) {
        'use strict';
        _n = _n.replace(/\./g, '').replace(',', '.');
        return !isNaN(parseFloat(_n)) && isFinite(_n);
    }

    /*
    */
    fmk.number_format=function(number, decimals, decPoint, thousandsSep) { // eslint-disable-line camelcase
      //  discuss at: http://locutus.io/php/number_format/
      // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
      // improved by: Kevin van Zonneveld (http://kvz.io)
      // improved by: davook
      // improved by: Brett Zamir (http://brett-zamir.me)
      // improved by: Brett Zamir (http://brett-zamir.me)
      // improved by: Theriault (https://github.com/Theriault)
      // improved by: Kevin van Zonneveld (http://kvz.io)
      // bugfixed by: Michael White (http://getsprink.com)
      // bugfixed by: Benjamin Lupton
      // bugfixed by: Allan Jensen (http://www.winternet.no)
      // bugfixed by: Howard Yeend
      // bugfixed by: Diogo Resende
      // bugfixed by: Rival
      // bugfixed by: Brett Zamir (http://brett-zamir.me)
      //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
      //  revised by: Luke Smith (http://lucassmith.name)
      //    input by: Kheang Hok Chin (http://www.distantia.ca/)
      //    input by: Jay Klehr
      //    input by: Amir Habibi (http://www.residence-mixte.com/)
      //    input by: Amirouche
      //   example 1: number_format(1234.56)
      //   returns 1: '1,235'
      //   example 2: number_format(1234.56, 2, ',', ' ')
      //   returns 2: '1 234,56'
      //   example 3: number_format(1234.5678, 2, '.', '')
      //   returns 3: '1234.57'
      //   example 4: number_format(67, 2, ',', '.')
      //   returns 4: '67,00'
      //   example 5: number_format(1000)
      //   returns 5: '1,000'
      //   example 6: number_format(67.311, 2)
      //   returns 6: '67.31'
      //   example 7: number_format(1000.55, 1)
      //   returns 7: '1,000.6'
      //   example 8: number_format(67000, 5, ',', '.')
      //   returns 8: '67.000,00000'
      //   example 9: number_format(0.9, 0)
      //   returns 9: '1'
      //  example 10: number_format('1.20', 2)
      //  returns 10: '1.20'
      //  example 11: number_format('1.20', 4)
      //  returns 11: '1.2000'
      //  example 12: number_format('1.2000', 3)
      //  returns 12: '1.200'
      //  example 13: number_format('1 000,50', 2, '.', ' ')
      //  returns 13: '100 050.00'
      //  example 14: number_format(1e-8, 8, '.', '')
      //  returns 14: '0.00000001'

      number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
      var n = !isFinite(+number) ? 0 : +number
      var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
      var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
      var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
      var s = ''

      var toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec)
        return '' + (Math.round(n * k) / k)
          .toFixed(prec)
      }

      // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
      }

      return s.join(dec)
    }

    return fmk;
})(d6.fmk || {});


/* ~~~~~~~~~~~~~~~~~~~~~~~~~
* jQuery UI :: Autocompletar 
* 20151217
* Dependencias: 
* - jQuery JavaScript Library v1.10.2
* - jQuery UI 1.11.4
* Información: 
* Uso:
* $(item).combobox(); 
* > Dónde 'item' es un objeto SELECT de HTML
* ~~~~~~~~~~~~~~~~~~~~~~~~~ */
(function( $ ) {
    $.widget( "custom.combobox", {
        options: {
            AcceptInvalidValue: true
        },
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete(this.options.AcceptInvalidValue);
            this._createShowAllButton();
            //Valor por defecto
            this._defaultValue();
        },

        _createAutocomplete: function(_rii) {
            d6.fmk.cLog ('[' + $(this.element).attr("id") + '] _createAutocomplete > _rii: ' + _rii);
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

                //d6 >> Mirar de recuperar la función que se lanza al seleccionar una opción en el SELECT para asociarla al evento Change del INPUT
                /*
                $(this).change(function(_e,_i){
                    d6.fmk.cLog('autocompletechange(input): ' + $(_t).attr('id'));
                });            
                */
            //DEBUG
            if ($(this.element).attr("id")=='ct_qltc') {
                d6.fmk.cLog('[_createAutocomplete] ID: ct_qltc > _rii: ' + _rii);
            }
            // ------------------
            if ($(this.element).attr("id")=='ct_qltc') { // ¡ATENCIÓN! Se le han puesto los subrayados finales para deshabilitarlo (EnSTANDBY)
                this._on( this.input, {
                    autocompleteselect: function( event, ui ) {
                        ui.item.option.selected = true;
                        this._trigger( "select", event, {
                            item: ui.item.option
                        });
                        //this.input.attr("title", ui.item.option.text); //D6
                    }
                });             
            } else {
                if (_rii) { //En el caso en que no se quiera que se quite el elemento introducido por no encontrarlo en el listado de elegibles
                    this._on( this.input, {
                        autocompleteselect: function( event, ui ) {
                            ui.item.option.selected = true;
                            this._trigger( "select", event, {
                                item: ui.item.option
                            });
                            //this.input.attr("title", ui.item.option.text); //D6
                        },
                        autocompletechange: "_removeIfInvalid"
                    });
                } else {
                    this._on( this.input, {
                        autocompleteselect: function( event, ui ) {
                            ui.item.option.selected = true;
                            this._trigger( "select", event, {
                                item: ui.item.option
                            });
                            //this.input.attr("title", ui.item.option.text); //D6
                        }
                    });                
                }

            }

        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Mostrar todo" )
                .tooltip()
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
                .attr( "title", "No hay ningún elemento que contenga '" + value + "'." )
                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        },
        
        _defaultValue: function() {
            this.element.children( "option" ).each(function() {
                if ( $( this ).attr('selected') ) {
                    this.selected = valid = true;
                    return false;
                }
            });            
        },
        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
              this._super(key, value);
        }        
    });
})( jQuery );         

/*
* https://www.sitepoint.com/listing-javascript-events-jquery/
* Para listados de eventos asociados a un elemento o todos

* Uso:
//List all events
console.log($.eventReport());

// just events on inputs
console.log($.eventReport('input'));

// just events assigned to this element
console.log($.eventReport('#myelement'));

// events assigned to inputs in this element
console.log($.eventReport('input', '#myelement'));
console.log($('#myelement').eventReport('input')); // same result

// just events assigned to this element's children
console.log($('#myelement').eventReport());
console.log($.eventReport('*', '#myelement'); // same result
*
*/
(function($) {
    $.eventReport = function(selector, root) {
        var s = [];
        $(selector || '*', root).andSelf().each(function() {
            var e = $.data(this, 'events');
            if(!e) return;
            s.push(this.tagName);
            if(this.id) s.push('#', this.id);
            if(this.className) s.push('.', this.className);
            for(var p in e) s.push('n', p);
            s.push('nn');
        });
        return s.join('');
    }
    $.fn.eventReport = function(selector) {
        return $.eventReport(selector, this);
    }
})(jQuery);

/*
*
* listHandlers (listado de eventos asociados a elementos)

* Uso:
// List all onclick handlers of all anchor elements:
$('a').listHandlers('onclick', console.info);
 
// List all handlers for all events of all elements:
$('*').listHandlers('*', console.info);
 
// Write a custom output function:
$('#whatever').listHandlers('click',function(element,data){
    $('body').prepend('<br />' + element.nodeName + ': <br /><pre>' + data + ' ‘);
});
*
*/
// UPDATED -> NOW WORKS WITH jQuery 1.3.1
$.fn.listHandlers = function(events, outputFunction) {
    return this.each(function(i){
        var elem = this,
            dEvents = $(this).data('events');
        if (!dEvents) {return;}
        $.each(dEvents, function(name, handler){
            if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
               $.each(handler, function(i,handler){
                   outputFunction(elem, 'n' + i + ': [' + name + '] : ' + handler );
               });
           }
        });
    });
};