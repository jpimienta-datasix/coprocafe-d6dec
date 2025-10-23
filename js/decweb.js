/* global $ */
/*

 DECweb (DataEntry Contratos) - Script
 http://www.datasix.es
 jpimienta@datasix.es
 20151113
 20170308

*/

/* Functions */

function ShowMnu(o, i) {
// Para mostar la opción de menú seleccionada
    d6.fmk.cLog('ShowMnu > ' + o + ' / ' + i);
    //Nos colocamos en TOP por si hay desplazamiento
    $('html, body').animate({
        scrollTop: 0
    }, tDelayEffect);    
    HideMnu('ALL');
    switch (o.toUpperCase()) {
        case 'H':
            //$('#jtable_cttos').jtable('load');
            $('#tsk_hst').fadeIn(tDelayEffect);
            $('#mnuHst').parent().attr("class", "mnuItmHover");
            $('#mnuHst').attr("class", "lnkMnuHover");
            $('#mnuCtto').parent().attr("class","mnuItmOut");            
            $('#mnuCtto').attr("class", "lnkMnuOut"); 
            $('#mmuCtto').removeAttr("href");
            $('#mnuCtto').removeAttr('style');           
            $('#mnuCtto').removeAttr("onclick");
            $('#mnuCtto').unbind("click");
            $('#lnks_ctto').fadeOut(tDelayEffect);
            //Reload jtable para refrescar datos y que no haya ninguno seleccionado
            $('#jtable_cttos').jtable('destroy')
            loadJTable ('jtable_cttos');
            $('#jtable_vc').jtable('destroy')
            loadJTable ('jtable_vc');
            if (g_Grid==='cttos') {
                switch ($('#slc_ctto').val()) {
                    case 'T':
                        $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos');
                        $('#btn_vvc').find('.ui-button-text').text('Ver Ventas/Compras (AS/400)');
                        $('#btn_cttos').find('.ui-button-text').text('Ver Contratos');
                        $($('#jtable_cttos th')[4]).find('span').text('Ent./Emb.');
                        $($('#jtable_cttos th')[8]).find('span').text('Cliente/Proveedor');
                        break;
                    case 'C':
                        $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos (Compras)');
                        $('#btn_cttos').find('.ui-button-text').text('Ver Contratos Compras');
                        $($('#jtable_cttos th')[4]).find('span').text('Embarque');
                        $($('#jtable_cttos th')[8]).find('span').text('Proveedor');
                        break;
                    case 'V':
                        $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos (Ventas)');
                        $('#btn_cttos').find('.ui-button-text').text('Ver Contratos Ventas');
                        $($('#jtable_cttos th')[4]).find('span').text('Entrega');
                        $($('#jtable_cttos th')[8]).find('span').text('Cliente');
                        break;
                    case 'O':
                        $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos (Ofertas)');
                        $('#btn_cttos').find('.ui-button-text').text('Ver Contratos Ofertas');
                        $($('#jtable_cttos th')[4]).find('span').text('Entrega');
                        $($('#jtable_cttos th')[8]).find('span').text('Cliente');
                }
                $('#jtable_cttos').jtable('load');
            } else {
                switch ($('#slc_ctto').val()){
                    case 'T':
                        $('label[for="slc_clpr"]').text('Cliente/Proveedor:');
                        $('#jtable_vc').find('.jtable-title-text').text('Listado Ventas/Compras'); 
                        $('#btn_vvc').find('.ui-button-text').text('Ver Ventas/Compras (AS/400)');
                        $('#btn_cttos').find('.ui-button-text').text('Ver Contratos');
                        $($('#jtable_vc th')[3]).find('span').text('Ent./Emb.');
                        $($('#jtable_vc th')[7]).find('span').text('Cliente/Proveedor');
                        break;
                    case 'C':
                        $('label[for="slc_clpr"]').text('Proveedor:');
                        $('#jtable_vc').find('.jtable-title-text').text('Listado de Compras'); 
                        $('#btn_vvc').find('.ui-button-text').text('Ver Compras (AS/400)');
                        $($('#jtable_vc th')[3]).find('span').text('Embarque');
                        $($('#jtable_vc th')[7]).find('span').text('Proveedor');
                        break;
                    default:
                        $('label[for="slc_clpr"]').text('Cliente:');
                        $('#jtable_vc').find('.jtable-title-text').text('Listado de Ventas'); 
                        $('#btn_vvc').find('.ui-button-text').text('Ver Ventas (AS/400)');
                        $($('#jtable_vc th')[3]).find('span').text('Entrega');
                        $($('#jtable_vc th')[7]).find('span').text('Cliente');
                        break;                    
                }
                $('#jtable_vc').jtable('load');
            }
            //Deshabilitamos SELECCIONAR
            try {
                $('#btn_csl').button('option','disabled',true);    
            } catch (err) {
                //La primera vez que se carga la página HISTORICO todavía no está el botón inicializado
            }
            //Modificación a NO
            d6.fmk.setCheckBox('#chk_Mod',false);
            break;
        case 'C':
            $('#tsk_ctto').fadeIn(tDelayEffect);
            $('#mnuHst').parent().attr("class","mnuItm");            
            $('#mnuHst').attr("class", "lnkMnu");            
            $('#mnuCtto').parent().attr("class","mnuItmHover");            
            $('#mnuCtto').attr("class", "lnkMnuHover");    
            $('#mnuCtto').attr('style','cursor:pointer');
            $('#lnks_ctto').fadeIn(tDelayEffect);
            break;
    }
}

function HideMnu(o) {
// Para ocultar la opción de menú seleccionada
    switch (o.toUpperCase()) {
        case 'ALL':
            //http://stackoverflow.com/questions/2298730/find-html-element-which-id-starts-with
            $('#app_w').find('div[id^="tsk_"]').fadeOut(tDelayEffect);
            $('ul#mnu>li').attr('class','mnuItm');
            $('ul#mnu>li>a').attr('class','lnkMnu');
            $('ul#mnux>li').attr('class','mnuItm');
            $('ul#mnux>li>a').attr('class','lnkMnu');
            break;
    }
}

/*
* DlgInfo: muestra diálogo modal con botón Aceptar o Aceptar/Cancelar
* @param {str} sTxt: texto a mostrar
* @param {str} sClass: clase a utilizar para el texto
* @param {str} sTit: título del diálogo
* @param {str} sURL: página a mostrar en un IFrame para descarga de ficheros
* @param {boolean} bAC: diferntes formatos de botones
* @param {str} sFnc: Código o funciones a ejecutar en formato texto: para tratar con eval() una vez se haya pulsado Aceptar
* @param {boolean} bNoBtn: Sin botones
*/
function DlgInfo(sTxt, sClass, sTit, sURL, bAC, sFnc, bNoBtn) {
    var oBtn;
    //http://stackoverflow.com/questions/13758928/jquery-deferred-and-dialog-box/18474005#18474005
    var defer = $.Deferred();
    //$('body').ScrollTo();
    if (sClass) $('div#dlg>span').attr('class', sClass);
    if (bAC) {
        oBtn = [
            {
                text: 'Aceptar',
                click: function() {
                    defer.resolve('true');
                    $(this).dialog('close').dialog('destroy');
                }
            },
            {
                text: 'Cancelar',
                click: function() {
                    defer.resolve('false');                        
                    $(this).dialog('close').dialog('destroy');
                }
            }
        ];
    } else if (sURL) { //Si tiene definida una URL es que debe abrir un fichero en IFrame y dar la posibilidad de descarga directa
        if (navigator.userAgent.match(/msie/i)) { //IE
            oBtn = [
                {
                    text: 'Aceptar',
                    click: function() {
                        defer.resolve('true');                        
                        $(this).dialog('close').dialog('destroy');
                    }
                },
                {
                    text: 'Ver fichero',
                    click: function() {
                        $(this).dialog('close').dialog('destroy');
                        DlgIfrm(sURL, sTit);
                    }
                },
                {
                    text: 'Descargar...',
                    click: function() {
                        downloadFile ('dwnld.asp?F='+sURL, '', 'h_ifrm');
                        $(this).dialog('close').dialog('destroy');
                    }
                }
            ];
        } else { //FireFox
            oBtn = [
                {
                    text: 'Aceptar',
                    click: function() {
                        defer.resolve('true');                        
                        $(this).dialog('close').dialog('destroy');
                    }
                },
                {
                    text: 'Descargar...',
                    click: function() {
                        downloadFile ('dwnld.asp?F='+sURL, '', 'h_ifrm');
                        $(this).dialog('close').dialog('destroy');
                    }
                }
            ];
        }
    } else if(bNoBtn) {
        oBtn=[];
    } else {
        oBtn = [
            {
                text: 'Aceptar',
                click: function() {
                    defer.resolve('true');
                    if (sFnc) { //Si se ha indicado que ejecute algún código javascript o función...
                        eval(sFnc);
                    }
                    $(this).dialog('close').dialog('destroy');
                }
            }
        ];
    }

    $('div#dlg>span').html(sTxt);
    $('div#dlg').dialog({
        dialogClass: 'no-close',
        closeOnEscape: true,
        modal: true,
        width: 500,
        title: sTit,
        resizable: false,
        buttons: oBtn                         
    });

    $('.ui-dialog').focus();
    return defer.promise();
}

function DlgIfrm(sURL, sTit) {
    $('div#dlg_ifrm>iframe').attr('src', URLnocache(sURL));
    //$('div#dlg_ifrm').dialog('open');
    $('div#dlg_ifrm').dialog({
        dialogClass: 'no-close',
        closeOnEscape: true,
        modal: true,
        width: 800,
        height: 725,
        resizable: false,
        title: sTit,
        buttons: [
            {
                text: 'Aceptar',
                click: function() {
                    $(this).dialog('close').dialog('destroy');
                }
            }
        ]                           
    });

}

function URLnocache(sURL) {
    var ts = parseInt(new Date().getTime().toString().substring(0,10));
    return (sURL + '?ts=' + ts);
}


function addTodayAAAAMM(t,n) {
    // Permite añadir o restar meses o años a la fecha actual
    // t: tipo [m|y]
    // n: cuántos +/- (ej. -1)
    var dDate = new Date();
    var nAAAA, nMM;

    switch (t) {
        case 'm': 
            dDate.setMonth( dDate.getMonth() + n );
            break;
        case 'y': 
            dDate.setYear( dDate.getYear() + n );
            break;
    }

    nAAAA = dDate.getFullYear();
    nMM = dDate.getMonth();

    return (nAAAA * 100 + nMM);
}

function getTodayAAMM(){
    var dDate = new Date();
    var nAA, nMM;
    nAA = dDate.getFullYear()-Math.floor((dDate.getFullYear())/100)*100;
    nMM = dDate.getMonth();

    return (nAA * 100 + nMM);
}

function addAAAAMM(t,n,am) {
    // Permite añadir o restar meses o años a una fecha en formato AAAAMM
    // t: tipo [m|y]
    // n: cuántos +/- (ej. -1)
    // am: Fecha en formato AAAAMM

    var nAAAA = Math.floor(am/100);
    var nMM = am - nAAAA*100;
    var dDate = new Date(nAAAA, nMM, 1, 0, 0, 0, 0);

    switch (t) {
        case 'm': 
            dDate.setMonth( dDate.getMonth() + n );
            break;
        case 'y': 
            dDate.setYear( dDate.getYear() + n );
            break;
    }

    nAAAA = dDate.getFullYear();
    nMM = dDate.getMonth();

    return (nAAAA * 100 + nMM);
}

function convertDate (dt) {
    function pad(s) { return ( s < 10) ? '0' + s : s;}
    var d = new Date(dt);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

/*
* gridGenPDF: llamada a generar el PDF del contrato seleccionado en el Grid de CONTRATOS
 @param {str} _pdf: nombre del fichero del contrato que se generará en PDF
*/
function gridGenPDF(_pdf) {
    genPDF(function(_sURL, _sPDF, _sPth){
        //$('a#openPDF').attr('href','http://'+location.hostname+_sURL).click();
        var _sLnk='http://'+location.hostname+_sURL;
        d6.fmk.cLog('[gridGenPDF] _sLnk: '+_sLnk);
        d6.fmk.cLog('[gridGenPDF] _sPth: '+_sPth);
        var _w=window.open(_sLnk,'_blank');
        if (_w!=undefined) {
            _w.focus();
        }
    },'',_pdf);
}

/*
* genPDF: para generar el CONTRATO en formato PDF a través de Click&DECiDE (versión actual 13.0.6)
* @param {function(URL,PDF)} handleLnk: función que devolverá la URL y el nombre del PDF a la llamada a esta función
* @param {str} _c: número de contrato
* @param {str} _pdf: nombre del fichero del contrato que se generará en PDF
*/
function genPDF(handleLnk,_c,_pdf) {
    var _NCPDF;
    var _VC;
    var _PT=$('#inp_h_prctpe').val();
    if (_pdf==undefined) {
        var _dd=d6.fmk.Left($('#ct_fecha').val(),2);
        _dd=d6.fmk.Right('0'+_dd,2);
        var _mm=($('#ct_fecha').val()).substr(3,2);
        _mm=d6.fmk.Right('0'+_mm,2);
        var _yy=d6.fmk.Right($('#ct_fecha').val(),2);
        _NCPDF=$('#inp_h_TDoc').val()+' '+_c+' '+$('[d6-field=MODIFICACION]').val()+' '+_dd+'.'+_mm+'.'+_yy+' '+$('#ct_moneda').val()+' 00'+$('#ct_clpr').val()+'.pdf';
        _VC=$('#ct_contratode').val();
    } else {
        _NCPDF=_pdf;
        _VC=$('#slc_ctto').val();
    }
    $('#ldr').show();
    $.ajax({
        async: false,
        url: 'engine.asp?A=GENPDF&VC='+_VC+'&PT='+_PT+'&N='+_NCPDF,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    d6.fmk.cLog('[genPDF]');
                    d6.fmk.cLog('Link: '+data.URL+' / URLPath: '+data.Path+' / Message: '+data.Message);
                    handleLnk(data.URL,_NCPDF,data.Path);
                    break;
                case 'ERROR':
                    DlgInfo('Contrato '+_c+': '+data.Message, 'txtDlgErr', '¡ERROR! [Generación Contrato PDF]');
                    return false;
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide();
        }
    });
}

function htmlEncode(t){
    return $('<div>').text(t).html();
}

/**
 * mnuScrollBlock: para ir mediante smooth scroll y hacer blink del bloque del formulario de destino
 * @param {str} _id   [id del elemento de menú. Ej. #lnk_apl]
 * @param {str} _dest [id de destino (bloque)]
 */
function mnuScrollBlock(_id, _dest) {
    $(_id).click(function(){
        if (_dest=='#app_w') {
            $(_dest).ScrollTo();
        } else {
            $(_dest).ScrollTo().effect("highlight", {color: 'lightskyblue'}, 2000);            
        }

    });
}

function loadEntidad(_t) {
    var _v='', _c='';
    d6.fmk.cLog('[loadEntidad] > ' + $(_t).val());
    if ($(_t).val()=='ZZ'){ //BRIC
        _v='BRIC';
        _c='ZZ';
    } else {
        _v='COPROCAFE';
        _c='CO';
    }
    $('#ct_codcia').val(_c);
    $('#ct_compania').val(_v); //$(this).find('option:selected').text()
}

/*
* reloadQLTC: para cargar Calidad-Cliente 
*/
function reloadQLTC() {
    var _vdF=($('#inp_h_fld_CALIDAD_CLIENTE')!=undefined)?$('#inp_h_fld_CALIDAD_CLIENTE').val():'';
    d6.fmk.loadCBox('#ct_qltc', 'engine.asp?a=rcbqc&qg=' + $('#ct_cod-qgr').val() + '&o=' + $('#ct_cod-ogn').val() + '&q=' + $('#ct_cod-qlt').val() + '&c=' + $('#ct_cod-clpr').val(), _vdF, 
        {
            options: {AcceptInvalidValue: false}, 
            select: function(_e, _i) {
                $('#inp_h_txt_qltc').val($('#ct_qltc :selected').text().trim()); 
                //Cambio de color
                stateModifiedSelect(this);     
                //if ($('#inp_h_fld_CALIDAD_CLIENTE')!=$('#inp_h_txt_qltc').val()) {
                //}
            }
        }, 
        false, 
        '', 
        '$(\'#inp_h_txt_qltc\').val($(\'#ct_qltc :selected\').text().trim()); $(\'#inp_h_qltc_nuevo\').val(\'N\');'
    );
}

/*
* checkNumEntregasMods: Controla el número de entregas que se han rellenado para así generar tantos contratos como sea necesario
* Toda la información queda igual cambiando sólo los datos correspondientes a CANTIDAD, EMBARQUE y FIJACIÓN.
* También el tipo de modificación (PRECIO, APLICACIÓN, OTROS o combinación de ellos) por si debe generar más de un contrato.
*/
function checkNumEntregasMods() {
    var _nc;
    var _nm, _sm;
    var _ModPAE; //Para saber cuántos contratos de Modificación debe generar y cuál es el último al hacer SaveCtto(): será en éste en el muestre el DlgInfo
    //Si es modificación...
    var _txt, _tit; //Dlginfo
    var aPrecio=['ct_mdo-valor','ct_rate-valor','ct_fijo-valor','ct_dif-valor','ct_acuerdos','ct_margen'];

    if ($('#chk_Mod').is(':checked')) {
        //Control del tipo de modificación
        //Si cualquIera de los valores del apartado PRECIO es diferente del que había antes en el contrato 
        //(Mercado, Rate, Fijo, Diferencial, Acuerdos o Margen)
        $(aPrecio).each(function () {
            if (($('#'+this).val()).replace(',','.')!=$('#'+this).attr('d6-defVal')) g_bModP=true;    
        });
        //Aplicaciones
        $('#tbl_apl input[name^="ct_apl-cant-"]').each(function(){ 
            if ($(this).attr('d6-defVal')!=undefined) {
                if ($(this).val()!=$(this).attr('d6-defVal')) g_bModA=true;    
            }
        });
        //Resto
        $('.ui-state-modified').each(function(){
            if ($(this).attr('id')!=undefined) {
                if ($.inArray($(this).attr('id'), aPrecio)==-1 && ($(this).attr('id')).indexOf('ct_apl-cant-')<0) g_bModE=true;    
            }
        });
        //Control del tipo de modificación: PRECIO, APLICACIÓN, OTROS o combinación de ellos
        d6.fmk.cLog('[checkNumEntregasMods] Modificación > PRECIO: ' + g_bModP + ' / APLICACIÓN:' + g_bModA + ' / OTROS Elementos:' + g_bModE );
        //Para controlar cuántos contratos de modificación se deben generar
        _ModPAE=(g_bModP)?'P':'0';
        _ModPAE+=(g_bModA)?'A':'0';
        _ModPAE+=(g_bModE)?'E':'0';

        //CARGA de ENTREGA/EMBARQUE y APLICACIONES en los campos OCULTOS utilizados para guardar en la BBDD
        //cambiamos los valores de los inp_h_fld correspondientes a CANTIDAD, EMBARQUE y FIJACION
        d6.fmk.cLog('CANTIDAD_1 (1): ' + $('#ct_entr-cant-1').val());
        d6.fmk.cLog('EMBARQUE_1 (1): ' + $('#ct_entr-emb-1').val());
        d6.fmk.cLog('FIJACION_1 (1): ' + $('#ct_entr-fijacion-1').val());
        $('[d6-field=ENTREGA_1_CANTIDAD]').val($('#ct_entr-cant-1').val());
        $('[d6-field=ENTREGA_1_EMBARQUE]').val($('#ct_entr-emb-1').val());
        $('[d6-field=ENTREGA_1_FIJACION]').val($('#ct_entr-fijacion-1').val());
        //Introducimos los valores de las APLICACIONES de cada entrega/embarque en el almacenamiento intermedio de APLICACIONES (inp_h_fld_apl-)
        for (var _na=1; _na<=4; _na++) {
            $('[d6-field=APLICACION_'+_na+'_CANTIDAD]').val($('#ct_apl-cant-1-'+_na).val());
            $('[d6-field=APLICACION_'+_na+'_CONTRATO]').val($('#ct_apl-ctto-1-'+_na).val());
            d6.fmk.cLog('CANTIDAD (1 / '+_na+'): ' + $('#ct_apl-cant-1-'+_na).val());
            d6.fmk.cLog('CONTRATO (1 / '+_na+'): ' + $('#ct_apl-ctto-1-'+_na).val());
        }

        //Según el tipo de modificación...
        if (g_bModP) { //Modificación PRECIO
            $('#inp_h_TDoc').val('LHMP');
            d6.fmk.cLog('Modificación (LHMP): ' + $('#ct_contrato').val() + '/' + $('#ct_nummod').val());
            saveCtto('','P',_ModPAE);        
        }
        if (g_bModA) { //Modificación APLICACIÓN
            $('#inp_h_TDoc').val('LHMA');
            d6.fmk.cLog('Modificación (LHMA): ' + $('#ct_contrato').val() + '/' + $('#ct_nummod').val());
            saveCtto('','A',_ModPAE);
        }
        if (g_bModE) { //Modificación de otro ELEMENTO
            $('#inp_h_TDoc').val('LHTM');
            d6.fmk.cLog('Modificación (LHTM): ' + $('#ct_contrato').val() + '/' + $('#ct_nummod').val());
            saveCtto('','E',_ModPAE);     
        }
        if (!g_bModP && !g_bModA && !g_bModE) {
            _txt='No se ha realizado ninguna modificación';
            _tit='MODIFICACIÓN';
            DlgInfo(_txt, 'txtDlg', _tit,'',false,'ShowMnu(\'H\',\'mnuHst\');');
        }
        return false;
    } else {
        //Refresca número de contrato por si el que tiene asignado ya ha sido utilizado por otro usuario
        setNUMCTTO();
    }

    //Verifica que haya un código de Condición de Entrega válido
    if ($('[d6-field=CondEnt]').val()=='0') {
        loadCondCode(true);
    }
    if ($('#ct_entr-cant-2').val()!='') {
        $('[d6-field=ENTREGA_UNICA]').val('false');
    } else {
        $('[d6-field=ENTREGA_UNICA]').val('true');
    }
    //Número de Entregas
    var _nEnt=0;
    $('select[id^=ct_entr-emb-]').each(function(){
        if($(this).val()!=undefined && $(this).val()!='') _nEnt++;
    });
    $('select[id^=ct_entr-emb-]').each(function(){
        //Número de Contrato (los dos últimos dígitos serán los correspondientes al ID del número de embarque)
        if ($(this).val()!="") {
            var _nbc;
            var _n=((d6.fmk.Right(this.id,2)).indexOf('-')===-1)?d6.fmk.Right(this.id,2):d6.fmk.Right(this.id,1);
            _nc=$('#ct_contrato').val();
            
            d6.fmk.cLog('[checkNumEntregasMods] Nº: ' + _n + ' / Ctto: ' + _nc);
            //cambiamos los valores de los inp_h_fld correspondientes a CANTIDAD, EMBARQUE y FIJACION
            d6.fmk.cLog('CANTIDAD_1 (' + _n + '): ' + $('#ct_entr-cant-'+ _n).val());
            d6.fmk.cLog('EMBARQUE_1 (' + _n + '): ' + $('#ct_entr-emb-'+ _n).val());
            d6.fmk.cLog('FIJACION_1 (' + _n + '): ' + $('#ct_entr-fijacion-'+ _n).val());
            $('[d6-field=ENTREGA_1_CANTIDAD]').val($('#ct_entr-cant-'+ _n).val());
            $('[d6-field=ENTREGA_1_EMBARQUE]').val($('#ct_entr-emb-'+ _n).val());
            $('[d6-field=ENTREGA_1_FIJACION]').val($('#ct_entr-fijacion-'+ _n).val());
            //Introducimos los valores de las APLICACIONES de cada entrega/embarque en el almacenamiento intermedio de APLICACIONES (inp_h_fld_apl-)
            for (var _na=1; _na<=4; _na++) {
                $('[d6-field=APLICACION_'+_na+'_CANTIDAD]').val($('#ct_apl-cant-'+_n+'-'+_na).val());
                $('[d6-field=APLICACION_'+_na+'_CONTRATO]').val($('#ct_apl-ctto-'+_n+'-'+_na).val());
                d6.fmk.cLog('CANTIDAD (' + _n + ' / '+_na+'): ' + $('#ct_apl-cant-'+_n+'-'+_na).val());
                d6.fmk.cLog('CONTRATO (' + _n + ' / '+_na+'): ' + $('#ct_apl-ctto-'+_n+'-'+_na).val());
            }            
            //Guardamos los Contratos
            saveCtto('','','',_nEnt);
            d6.fmk.cLog ('[checkNumEntregasMods] saveCtto: ' + _nc);
            //Cálculo del siguiente número de contrato
            if (d6.fmk.Left($('#ct_contrato').val(),2)=='00') { //Compra
                _nc='00'+(parseInt($('#ct_contrato').val())+1).toString();
            } else {
                _nbc=d6.fmk.Left($('#ct_contrato').val(), ($('#ct_contrato').val()).length-2) ;
                _nc=_nbc + d6.fmk.Right('0'+(parseInt(_n)+1).toString(),2);
            }
            $('[d6-field=Ctr]').val(_nc);
        } else {
            return false; //Break each
        }

    });
    //Restamos uno porque al salir del 'each' el conteo lleva uno de más... [tras las nuevas incorporaciones, no es necesario]
    if (d6.fmk.Left(_nc,2)=='00') {
        $('[d6-field=Ctr]').val('00'+_nc); //(parseInt(_nc)-1).toString()
    } else {
        $('[d6-field=Ctr]').val(_nc); //(parseInt(_nc)-1).toString()
    }
    
 }

/*
* saveCtto: Para guardar el contrato
* @param {str} _c: Num contrato para saveVentaBRIC2CORPOCAFE()
* @param {str} _mt: tipo de modificación del contrato que se va a grabar
* @param {str} _mds: combinación de tipos de modificación del contrato (para saber cuándo se debe mostrar el DlgInfo)
*/
function saveCtto(_c,_mt,_mds,_nEnt) {
    $('#ldr').show();
    $.ajax({
        async: false,
        url: 'engine.asp?A=SVCTTO', //&T='+_t,
        dataType: 'json',
        data: 'F=' + encodeURIComponent(d6.fmk.getD6Fields()) + '&V=' + encodeURIComponent(d6.fmk.getD6Values()),
        cache: false,
        method: 'POST',
        beforeSend: function(jqXHR) { //Para forzar charset a ISO-8859-1
          jqXHR.overrideMimeType("text/html;charset=iso-8859-1");
        },
        success: function(data, textStatus, jqXHR){
            d6.fmk.cLog('[saveCtto] Result: ' + data.Result);
            switch (data.Result) {
                case 'OK':
                    var _txt='<span style="text-align:center">';
                    var _cta=$('[d6-field=Ctr]').val();
                    var _tit='GENERAR CONTRATO';
                    var _tmod;
                    var bDlg=false;
                    var sURL='', sPDF='', sURLtxt='', sURLtxtE='', sURLPth='';
                    genPDF(function(sLnk, sF, sPth){
                        sURL=sLnk;
                        sPDF=sF;
                        sURLPth=sPth;
                        if (_nEnt!=undefined && _nEnt!=='') { //Si son varias entregas/embarques guardamos el nombre del PDF en cada una (asociada al input de la cantidad)
                            $('#ct_entr-cant-'+(Number(d6.fmk.Right(_cta,2))).toString()).attr('pdf',sF);
                        }
                    }
                    ,_cta);
                    //Comprobamos si es una COMPRA a BRIC, en cuyo caso hay que generar un contrato de VENTA de BRICS
                    //
                    // !! Es el mejor sitio??
                    //
                    if($('#ct_contratode :selected').attr('value')=='C') {
                        if($('#ct_cod-clpr').val()==='3700600') {
                            d6.fmk.cLog('[saveCtto] Compra a BRIC! <--------------------------');
                            saveVentaBRIC2COPROCAFE(_cta);
                            return false;
                        }
                    }
                    //Adecuar título 
                    if ($('#chk_Mod').is(':checked')) {
                        _tit='MODIFICACIÓN DE ';
                        if (_mds!=undefined) {
                            _tmod='<br/>Modificación nº <b>' + $('#ct_nummod').val() +'</b> de:';
                            if (_mds[0]=='P') _tmod+='<br/># PRECIO';
                            if (_mds[1]=='A') _tmod+='<br/># APLICACIONES';
                            if (_mds[2]=='E') _tmod+='<br/># RESTO';
                        } else {
                            _tmod='<br/><br/>Modificación nº <b>' + $('#ct_nummod').val() +'</b>.';    
                        }
                    } else {
                        _tit='CREACIÓN DE ';
                        _tmod='';
                    }
                    _tmod+='<br/>';
                    switch ($('[d6-field=TIPO_DOCUMENTO]').val()) {
                        case 'LHOF': _tit+='OFERTA'; break;
                        case 'LHC0': _tit+='CANCELACIÓN'; break;
                        default: _tit+='CONTRATO'; 
                    }

                    //Control de si es una ENTREGA única o no... 
                    if (_c!=undefined && _c!='') { //Viene de saveVentaBRIC2CORPOCAFE()...
                        var _ctb=_cta;
                        _cta=_c;
                    }
                    //Texto para el link
                    sURLtxt='<br/>URL: <a href="'+sURL+'" target="_blank">'+sPDF+'</a>';
                    if ($('[d6-field=ENTREGA_UNICA]').val()==='true') {
                        _txt='Se ha guardado el contrato <strong>'+_cta+'</strong>.<br/>' + _tmod + sURLtxt;
                    } else {
                        if ($('#chk_Mod').is(':checked')) {
                            _txt='Se ha guardado el contrato <strong>'+_cta+'</strong>.<br/>' + _tmod + sURLtxt;
                        } else {
                            if (_nEnt==Number(d6.fmk.Right(_cta,2))){
                                bDlg=true;
                                //Incorporamos los links a todos los PDFs generados de entregas/embarques
                                sURLtxtE='';
                                $('input[id^=ct_entr-cant-]').each(function(){
                                    if($(this).val()!=undefined && $(this).val()!='') {
                                        sURLtxtE+='<br/>URL: <a href="'+sURLPth+$(this).attr('pdf')+'" target="_blank">'+$(this).attr('pdf')+'</a>';                                        
                                    }
                                });
                                _txt='Se han guardado varios contratos por haber <strong>'+Number(d6.fmk.Right(_cta,2))+'</strong> entregas:<br/><br/># <strong>'+d6.fmk.Left(_cta,6)+'1</strong> al <strong>'+_cta+'</strong><br/>'+sURLtxtE;
                            } 
                        }
                    }
                    if (_c!=undefined && _c!='') { 
                        _txt+='<br/>Se ha guardado la VENTA de BRIC (<strong>'+_ctb+'</strong>)'+ sURLtxt;
                    }
                    _txt+='</span>';
                    //Control para si está grabando varias modificaciones/entregas y mostrar o no el Diálogo
                    if (_mt!=undefined && _mt!='') {
                        if (_mt=='P' && d6.fmk.Right(_mds,2)=='00') { bDlg=true; } //Si es modificación de PRECIO y no hay más
                        if (_mt=='A' && d6.fmk.Right(_mds,1)=='0') { bDlg=true; } //Si es modificación de APLICACIÓN y no hay más
                        if (_mt=='E') { bDlg=true; } //Si es modificación de OTROS Elementos
                    } else {
                        if (_nEnt==undefined || _nEnt=='' || _nEnt==1) { //Para cuando no es de entregas o modificaciones
                            bDlg=true;    
                        }
                    }
                    if (bDlg) { DlgInfo(_txt, 'txtDlg', _tit,'',false,'ShowMnu(\'H\',\'mnuHst\');'); }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', _tit + ' - ¡ERROR!');
                    break;
            } 
        },
        error: function(jqXHR, textStatus, errThrown){
            d6.fmk.cLog('[saveCtto] Error!! ' + textStatus + ': ' + errThrown);
            DlgInfo('(' + textStatus + ') '+ errThrown, 'txtDlgErr', 'GENERAR CONTRATO - ¡ERROR XHR!');
        },
        complete: function(){
                d6.fmk.cLog('[saveCtto] Complete!');
                $('#ldr').hide();
        }
    });
    d6.fmk.cLog('Fields: '+ d6.fmk.getD6Fields());
    d6.fmk.cLog('Values: '+ d6.fmk.getD6Values());    
}

/*
* showCttos: Muestra el diálogo con todos los documentos del contrato indicado
* {str} _c: contrato
*/
function showCttos(_c){
    var bDlg=true;
    var _tit='Documentos del Contrato '+_c;
    var _txt='';
    var _aURL;
    $('#ldr').show();
    $.ajax({
        url: 'engine.asp?A=SHCTTOS&C='+_c, 
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    _aURL=data.Docs.split('|');
                    _txt='Documentos:<br/><ul>'
                    for (var _n=0; _n<_aURL.length; _n++) {
                        _txt=_txt+'<li style="margin-top:5px;margin-left:15px;">URL: <a href="doc/'+_aURL[_n]+'" target="_blank">'+_aURL[_n]+'</a></li>';    
                    }
                    _txt+='</ul>'
                    DlgInfo(_txt, 'txtDlg', _tit,'',false);    
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', _tit + ' - ¡ERROR!');
                    break;                    
            }
        },
        error: function(jqXHR, textStatus, errThrown){
            d6.fmk.cLog('[showCttos] Error!! ' + textStatus + ': ' + errThrown);
            DlgInfo('(' + textStatus + ') '+ errThrown, 'txtDlgErr', 'MOSTRAR CONTRATOS - ¡ERROR XHR!');
        },
        complete: function(){
            d6.fmk.cLog('[showCttos] Complete!');
            $('#ldr').hide();
        }
    });
}


/*
* setVentaBRIC: Cargamos los datos necesarios para poder crear automáticamente la VENTA de BRIC a COPROCAFE y guardamos el contrato de VENTA
*/
function saveVentaBRIC2COPROCAFE(_cta){
    //Cargamos los campos del formulario necesario para crear el contrato de BRICS
    $('[d6-field=CONTRATO_DE]').val('V'); //Venta
    $('#ct_contratode').val('V');
    $('[d6-field=TIPO_CONTRATO]').val('ZZ'); //BRIC
    $('[d6-field=Comp]').val('ZZ'); //BRIC (este campo viene heredado de las tablas de Ventas/Compras)
    $('[d6-field=AccNo]').val('1003400'); //COPROCAFÉ IBÉRICA, S.A.
    $('#ct_clpr').val('1003400'); //COPROCAFÉ IBÉRICA, S.A.
    $('[d6-field=CLIENTE_PROVEEDOR]').val('Coprocafe Iberica S.A.');
    //Debug
    d6.fmk.cLog('[saveVentaBRIC2COPROCAFE]------------------------------ Inicio');
    d6.fmk.cLog($('[d6-field=CONTRATO_DE]').val());
    d6.fmk.cLog($('[d6-field=TIPO_CONTRATO]').val());
    d6.fmk.cLog($('[d6-field=AccNo]').val());
    d6.fmk.cLog($('[d6-field=CLIENTE_PROVEEDOR]').val());
    d6.fmk.cLog('[saveVentaBRIC2COPROCAFE]------------------------------ Fin');
    //Creamos el número de contrato adecuado a la VENTA de BRIC
    setNUMCTTO();
    saveCtto(_cta);
}


/*
* saveQLTC: Para guardar nuevo dato de Calidad-Cliente
*/
function saveQLTC() { 
    $('#ldr').show();
    $.ajax({
        async: true,
        url: 'engine.asp?a=svcc&qg=' + $('#ct_cod-qgr').val() + '&o=' + $('#ct_cod-ogn').val() + '&q=' + $('#ct_cod-qlt').val() + '&c=' + $('#ct_cod-clpr').val(),
        dataType: 'json',
        data: 'CC=' + encodeURIComponent($('#inp_h_txt_qltc').val()),
        cache: false,
        method: 'POST',
        beforeSend: function(jqXHR) { //Para forzar charset a ISO-8859-1
          jqXHR.overrideMimeType("text/html;charset=iso-8859-1");
        },
        success: function(data, textStatus, jqXHR){
            d6.fmk.cLog('[saveQLTC] Result: ' + data.Result);
            switch (data.Result) {
                case 'OK':
                    d6.fmk.cLog('[OK!] Nueva CALIDAD-CLIENTE guardada > ' + $('#inp_h_txt_qltc').val());
                    //DlgInfo('Nueva CALIDAD-CLIENTE guardada', 'txtDlg', 'GENERAR CONTRATO | CALIDAD-CLIENTE');
                     break;
                case 'ERROR':
                    d6.fmk.cLog('[ERROR!] Nueva CALIDAD-CLIENTE NO guardada > ' + $('#inp_h_txt_qltc').val()) + ' (' + data.Message + ')';
                    //DlgInfo(data.Message, 'txtDlgErr', 'GENERAR CONTRATO | CALIDAD-CLIENTE - ¡ERROR!');
                    break;
            } 
        },
        error: function(jqXHR, textStatus, errThrown){
            d6.fmk.cLog('[saveQLTC] Error!! ' + textStatus + ': ' + errThrown);
            DlgInfo('(' + textStatus + ') '+ errThrown, 'txtDlgErr', 'GENERAR CONTRATO | CALIDAD-CLIENTE - ¡ERROR XHR!');
        },
        complete: function(){
                d6.fmk.cLog('[saveQLTC] Complete!');
                $('#ldr').hide();
        }
    });
}

/*
* loadFieldsCtto: para cargar los campos recogidos de la tabla en la selección del contrato en el grid del Histórico
*/
function loadFieldsCtto($selRows, _tbl){
    $selRows.each(function(){
        var rData=$(this).data('record');
        d6.fmk.cLog('Origin: (' + rData.OrigNo + ') ' + rData.Origin + '\nQuality: (' + rData.QualNo + ') ' + rData.Quality + '\nQual. Group: (' + rData.QualGrpNo + ') ' + rData.QualityGroup + '\nCurrName: ' + rData.CurrName);
        //Cargamos los datos seleccionados en los input "ocultos"
        $('#inp_h_qgrN').val(rData.QualGrpNo);
        $('#inp_h_qgr').val(rData.QualityGroup);
        $('#inp_h_ognN').val(rData.OrigNo);
        $('#inp_h_ogn').val(rData.Origin);
        $('#inp_h_qltN').val(rData.QualNo);
        $('#inp_h_qlt').val(rData.Quality);
        $('#inp_h_clpr').val(rData.AccNo);
        $('#inp_h_mnd').val(rData.CurrName);
        $('#inp_h_cia').val(rData.Comp);
        $('#inp_h_ctto').val(rData.Ctr);
        $('#inp_h_fecha').val(rData.CtrDate);
        $('#inp_h_precio').val(rData.OutRightPrice);
        $('#inp_h_dif').val(rData.NetDiff);
        $('#inp_h_kgs').val(rData.TotalKg);
        $('#inp_h_cod-interm').val(rData.AccNo3);
        $('#inp_h_interm').val(rData.Agent);
        $('#inp_h_condcde').val(rData.CondCode);
        d6.fmk.cLog('inp_h_condcde > ' + $('#inp_h_condcde').val() + ' / rData.CondCode > ' + rData.CondCode);
        $('#inp_h_cond').val(rData.Condition);
        d6.fmk.cLog('inp_h_stkexch = ' + rData.NetStockExch);
        $('#inp_h_stkexch').val(rData.NetStockExch);
        $('#inp_h_prctpe').val(rData.PriceType);
        $('#inp_h_ftm').val(rData.NetFuturesMonth);
        $('#inp_h_sdte').val(rData.ShipmDateAAAAMM);
        $('#inp_h_orgbags').val(rData.OrgBags);
        $('#inp_h_contratode').val(rData.CONTRATO_DE);
        //Limpieza si ya existen los campos extra de la tabla D6DEC_CONTRATOS...
        $('#spn_hide_fields input[id^=inp_h_fld_]').remove();
        if (_tbl=='jtable_cttos') {
            var aLstFldLd=g_lstFldLd.split(',');
            //Carga dinámica de valores de campos específicos del CTTO (spn_hide_fields)
            d6.fmk.cLog('Campos [rData Fields CTTO]');
            for (var _fld in rData) {
              if (rData.hasOwnProperty(_fld) && $.inArray(_fld,aLstFldLd)==-1) {
                d6.fmk.cLog(_fld + ' -> ' + rData[_fld] + ' / inArray: ' + $.inArray(_fld,aLstFldLd));
                var _itm='inp_h_fld_' + _fld;
                var _v;
                if (typeof(rData[_fld])=='string') {
                    _v=((rData[_fld].toUpperCase()=='NULL')?'':rData[_fld]);
                } else {
                    _v=rData[_fld];
                }
                $('#spn_hide_fields').append('<input type="hidden" name="'+_itm+'" id="'+_itm+'" value="'+_v+'" />');
              }
            }
        } 
    });
}

/*
* refreshCondition: para cargar el campo (d6-field) Condition que se corresponde con:
* - ct_condent
* - origen (Flete o Camión. Si están ambos, el de Flete)
* - ct_peso
*/
function refreshCondition(){
var _of=$('#ct_fltogn').val();
var _oc=$('#ct_camogn').val();
var _o=(_of!='')?_of:_oc;
    $('#inp_h_txt_condent').val( $('#ct_condent').val() + ' ' + _o + ' ' + d6.fmk.getRadio('#ct_peso') ); 
}


/*----------------------*/
/*-- Google Web Fonts --*/
/*----------------------*/
WebFontConfig = {
    google: {
        families: ['Kalam', 'Lobster', 'PT Sans']
    }
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

/**
 * jtableClear: Borrado de todas las filas de la tabla (jtable)
 * @param {[str]} jt [Id de la tabla jtable]
 */
function jtableClear(jt){
    var nCTbl=$(jt + ' table > thead > tr').children("th").length;
    d6.fmk.cLog('#Cols en ' + jt + ': ' + nCTbl);
    $(jt + ' table > tbody').html('<tr class="jtable-no-data-row"><td colspan="' + nCTbl + '">No hay datos disponibles!</td></tr>');            
}

/**
 * showFletesInfo: Mostrar los datos relevantes de Fletes en función de Origen y Destino, si es que los hay para esta combinación con tipo de container LCL-FCL
 * @param {[str]} o [Origen]
 * @param {[str]} d [Destino]
 */
function showFletesInfo(o, d) {
    //$('#spn_info_cam').hide();
    //$('#spn_info_cam_nodata').hide();    
    $('#ldr').show();
    $.ajax({
        async: true,
        url: 'engine.asp?a=rtfltc&o=' + o + '&d=' + d + '&c=LCL-FCL',
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    if (data.Records.length==0) {
                        $('#tbl_info_flt').hide();
                        //$('#spn_info_flt_nodata').show();
                        showFletesInfoFCL(o, d);
                    } else {
                        $('#spn_info_flt_nodata').hide();
                        $('#ct_flt_cnt').val(data.Records[0].Container1);
                        $('#ct_flt_desc').val(data.Records[0].Descr1);
                        $('#ct_flt_precio').val(data.Records[0].Precio);
                        $('#ct_flt_nav').val(data.Records[0].Nav);
                        $('#tbl_info_flt').show();
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [FLETES / LCL-FCL]');
                    break;
            } 
        },
        complete: function(){
            $('#tr_info_fltcam').show();
            $('#ldr').hide();
        }
    });    
}

/**
 * showFletesInfoFCL: Mostrar los datos relevantes de Fletes en función de Origen y Destino, si es que los hay para esta combinación, para Container FCL-FCL
 * @param {[str]} o [Origen]
 * @param {[str]} d [Destino]
 */
function showFletesInfoFCL(o, d) {
    //$('#spn_info_cam').hide();
    //$('#spn_info_cam_nodata').hide();    
    $('#ldr').show();
    $.ajax({
        async: true,
        url: 'engine.asp?a=rtfltc&o=' + o + '&d=' + d + '&c=FCL-FCL',
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    if (data.Records.length==0) {
                        $('#tbl_info_flt').hide();
                        $('#spn_info_flt_nodata').show();
                    } else {
                        $('#spn_info_flt_nodata').hide();
                        $('#ct_flt_cnt').val(data.Records[0].Container1);
                        $('#ct_flt_desc').val(data.Records[0].Descr1);
                        $('#ct_flt_precio').val(data.Records[0].Precio);
                        $('#ct_flt_nav').val(data.Records[0].Nav);
                        $('#tbl_info_flt').show();
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [FLETES / FCL-FCL]');
                    break;
            } 
        },
        complete: function(){
            $('#tr_info_fltcam').show();
            $('#ldr').hide();
        }
    });    
}

/**
 * showCamionesInfo: Mostrar si hay o no datos de Camiones para el Origen y Destino seleccionados
 * @param {[str]} o [Origen]
 * @param {[str]} d [Destino]
 */
function showCamionesInfo(o, d) {
    //$('#spn_info_flt_nodata').hide();
    //$('#tbl_info_flt').hide();

    //Inicializamos los valores para el cálculo del coste
    $('#inp_h_costecam').val('0');
    $('#inp_h_costecammda').val('0');    

    $('#ldr').show();
    $.ajax({
        async: true,
        url: 'engine.asp?a=rtcam&o=' + o + '&d=' + d,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    if (data.Records.length==0) {
                        $('#spn_info_cam').hide();
                        $('#spn_info_cam_nodata').show();
                    } else {
                        $('#spn_info_cam_nodata').hide();
                        $('#spn_info_cam').show()
                        //Cargamos los valores para el cálculo del coste
                        $('#inp_h_costecam').val(data.Records[0].COSTE1TM);
                        $('#inp_h_costecammda').val(data.Records[0].MONEDA);
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [FLETES]');
                    break;
            } 
        },
        complete: function(){
            $('#tr_info_fltcam').show();
            $('#ldr').hide();
        }
    });    
}

/**
 * sumCantidadesEntregas: Para sumar todas las cantidades de entregas
 */
function sumCantidadesEntregas() {
    var _vt=0;
    $('#tbl_entr input[name^="ct_entr-cant-"]').each(function(){
        if ($(this).attr('readonly')==undefined) { _vt+=Number($(this).val()); } //Sólo suma si no está deshabilitado                
    });
    $('#ct_entr-canttot').val( d6.fmk.number_format(_vt,0,',','.') );
    if (Number( ($('#ct_totkgs').val()).replace('.','').replace(',','.') ) == 0) {
        $('#spn_chk_cantkgs').text('No se ha informado la cantidad del pedido (click para ir)').addClass('ui-state-err').css('cursor','pointer').show().click(function(){
            $('#ctto_cant').ScrollTo().effect("highlight", {color: 'lightskyblue'}, 1000); 
        });    
    } else {
        ctrlTotalKgs();
    }
}

/**
 * sumCantidadesAplicacion: Para sumar todas las cantidades de Aplicación de cada Entrega
 */
function sumCantidadesAplicacion(_n) {
    var _vt=0;
    var _nBlnk=0; //Número de cantidades de aplicación en blanco del bloque (el total son 4)
    $('#tbl_apl input[name^="ct_apl-cant-'+_n+'-"]').each(function(){
        if ($(this).attr('readonly')==undefined) { 
            if ($(this).val()=='') {
                _nBlnk++;
            } else {
                _vt+=Number($(this).val());     
            }
        } //Sólo suma si no está deshabilitado                
    });
    //if (Number( ($('#ct_totkgs').val()).replace('.','').replace(',','.') ) == 0) {
    $('#spn_chk_apl_cantkgs-'+_n).removeClass('ui-state-err-txt').removeClass('ui-state-orange').removeClass('ui-state-ok').hide();
    $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20.png':'img/invisible-20.png') );  //parent().removeClass('ui-state-err').removeClass('ui-state-orange').removeClass('ui-state-ok');
    
    if (_nBlnk==4) { //Si no hay valores de APLICACIÓN
        $('#ct_apl-canttot-'+_n).val('');
        return false;
    }

    if (isNaN(_vt)) { 
        $('#ct_apl-canttot-'+_n).val('');
        $('#spn_chk_apl_cantkgs-'+_n).text('Hay algún valor erróneo.').addClass('ui-state-err-txt').show();
        $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20-red.png':'img/invisible-20-red.png') );
    } else {
        $('#ct_apl-canttot-'+_n).val( d6.fmk.number_format(_vt,0,',','.') );
    }
    if (Number( ($('#ct_entr-cant-'+_n).val()).replace('.','').replace(',','.') ) == 0 && _vt!=0) {
        $('#spn_chk_apl_cantkgs-'+_n).text('No se ha informado la cantidad de la entrega/embarque').addClass('ui-state-err-txt').show(); 
        //$('#ct_shapl-'+_n).parent().addClass('ui-state-err');
        $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20-red.png':'img/invisible-20-red.png') );
    } else {
        if (!isNaN(_vt) && (_vt+Number( ($('#ct_entr-cant-'+_n).val()).replace('.','').replace(',','.') )!=0) ) {
            ctrlTotalAplicacion(_n);            
        }
        if (_vt+Number( ($('#ct_entr-cant-'+_n).val()).replace('.','').replace(',','.') )==0) { //Si no hay valores que sumar...
            $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20.png':'img/invisible-20.png') );
        }
    }
}

/**
 * chkNumeric: Verifica si el valor introducido es numérico
 * @param {[str]} _i [ID del input]
 * @param {[boolean]} _ng [true/undefined se puede haber negativos; false si no se permiten]
 */
function chkNumeric(_i,_ng) {
    if (_ng==undefined) { _ng=true; }
    if ($(_i).val()!=undefined) {
        var _v = ($(_i).val()).toString().replace(',','.');
        d6.fmk.cLog('chkNumeric(' + _i + ').placeholder: ' + $(_i).prop('placeholder') + ' / val: ' + $(_i).val() + ' / _v: ' + _v);
        if (d6.fmk.isNumber( _v ) || _v=='') {
            if ($(_i).hasClass('ui-state-modified')) {
                $(_i).removeClass('ui-state-err');
            } else {
                $(_i).removeClass('ui-state-err').addClass('ui-state-default');
            }
            if (!_ng) {
                if (_v<0) {
                    $(_i).removeClass('ui-state-default').addClass('ui-state-err');        
                }
            }
            return true;
        } else {
            $(_i).removeClass('ui-state-default').addClass('ui-state-err');
            return false;
        }
    } else { return true; }
}

/**
 * ctrlTotalKgs: Verifica si la cantidad * kgs está ya introducida en el apartado de Cantidad y, si es así, muestra la diferencia respecto del Total Kg en el apartado Embalages
 */
function ctrlTotalKgs(){
    var _v=Number( ($('#ct_entr-canttot').val()).replace('.','').replace(',','.') );  //cantidad total kilos de entregas/embarques
    var _n=Number( ($('#ct_totkgs').val()).replace('.','').replace(',','.') ); //cantidad kilos del contrato
    $('#spn_chk_cantkgs').removeClass('ui-state-err').removeClass('ui-state-orange').removeClass('ui-state-ok').show();    
    if (_v - _n > 0) { //Si la cantidad de entrega es superior a la contratada...
        $('#spn_chk_cantkgs').text( 'Hay '+ Math.abs(_v - _n) + ' kgs. de exceso.' ).addClass('ui-state-err'); 
    }  else {
        if (_v - _n < 0) { //Si la cantidad de entrega es inferior a la contratada...
            $('#spn_chk_cantkgs').text( 'Todavía faltan '+ Math.abs(_v - _n) + ' kgs.' ).addClass('ui-state-orange'); 
        } else {
            $('#spn_chk_cantkgs').text( 'Colocados todos los kgs. contratados.' ).addClass('ui-state-ok'); 
        }
    }
}

/**
 * ctrlTotalAplicacion: Verifica si la cantidad * kgs está ya introducida en el apartado de Cantidad y, si es así, muestra la diferencia respecto del Total Kg en el apartado Embalages
 * @param {str} _n: número de ENTREGA/EMBARQUE para la APLICACIÓN
 */
function ctrlTotalAplicacion(_n){
    //Si ambos elementos a comprobar están en blanco, salimos de la función
    if ($('#ct_apl-canttot-'+_n).val()=='' && $('#ct_entr-cant-'+_n).val()=='') return false;

    var _v=Number( ($('#ct_apl-canttot-'+_n).val()).replace('.','').replace(',','.')  );  //cantidad total aplicación
    //var _n=Number( ($('#ct_totkgs').val()).replace('.','').replace(',','.') ); //cantidad kilos del contrato
    var _ke=Number( ($('#ct_entr-cant-'+_n).val()).replace('.','').replace(',','.') ); //cantidad kilos de la entrega/embarque
    //$('#ct_shapl-'+_n).parent().removeClass('ui-state-err').removeClass('ui-state-orange').removeClass('ui-state-ok');
    $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20.png':'img/invisible-20.png') );
    $('#spn_chk_apl_cantkgs-'+_n).removeClass('ui-state-err-txt').removeClass('ui-state-orange').removeClass('ui-state-ok').hide();    
    if (_v - _ke > 0) { //Si la cantidad de aplicación es superior a la contratada...
        $('#spn_chk_apl_cantkgs-'+_n).text( 'Hay '+ Math.abs(_v - _ke) + ' kgs. de exceso.' ).addClass('ui-state-err-txt').show(); 
        //$('#ct_shapl-'+_n).parent().addClass('ui-state-err');
        $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20-red.png':'img/invisible-20-red.png') );
    }  else {
        if (_v - _ke < 0) { //Si la cantidad de aplicación es inferior a la contratada...
            $('#spn_chk_apl_cantkgs-'+_n).text( 'Todavía faltan '+ Math.abs(_v - _ke) + ' kgs.' ).addClass('ui-state-orange').show(); 
            //$('#ct_shapl-'+_n).parent().addClass('ui-state-orange');
            $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20-orange.png':'img/invisible-20-orange.png') );
        } else {
            $('#spn_chk_apl_cantkgs-'+_n).text( 'Colocados todos los kgs. contratados.' ).addClass('ui-state-ok').show(); 
            //$('#ct_shapl-'+_n).parent().addClass('ui-state-ok');
            $('#ct_shapl-'+_n+' img').attr('src', (($('#ct_apl-tr-'+_n).css('display')=='none')?'img/visible-20-green.png':'img/invisible-20-green.png') );
        }
    }
}

/*
 * getAAAAMMlst: Genera una lista de fechas en formato AAAAMM a partir del mes anterior al actual y para la cantidad de años indicada 
 * @param {[int]} _n [Número de años] (2: sería lo que queda de este año y uno más)
 */
function getAAAAMMlst (_n) {
    var _h=new Date();
    var _lst='';
    for (var _a= 0; _a < _n; _a++) {
        for (var _m=1; _m<=12; _m++) {
            if ((_m>_h.getMonth()-1) || (_a>0)) {
                _lst += ((_h.getFullYear()+_a) * 100 + _m).toString() +  ';'    
            }
        }
    }
    return _lst.slice(0,-1);
}

/*
 * getAAAAMMOpts: Genera una lista de opciones de fechas en formato AAAAMM a partir del mes anterior al actual y para la cantidad de años indicada 
 * @param {[int]} _n [Número de años] (2: sería lo que queda de este año y uno más)
 * @param {[int]} _ami [AAAAMM inicial y seleccionado directamente] Si no se indica nada, es el mes anterior al actual
 */
function getAAAAMMOpts (_n,_ami) {
    var _h=new Date();
    var _lst='';
    var _aaaa=Number(d6.fmk.Left(_ami,4));
    var _f;
    var _sltd='';
    if (_ami==undefined) {
        _f=_h;
        _ami='';
    } else {
        _f=new Date(d6.fmk.Left(_ami,4)+'-'+d6.fmk.Right(_ami,2)+'-01');
        _n=_n+(_h.getFullYear()-_f.getFullYear());
    }
    for (var _a= 0; _a < _n; _a++) {
        for (var _m=1; _m<=12; _m++) {
            if ((_m>_f.getMonth()-1) || (_a>0)) {
                var _am = ((_f.getFullYear()+_a) * 100 + _m).toString();
                if (_ami!='') {
                    _sltd=(_ami==_am)?'selected="selected"':'';
                }
                _lst += '<option value="' + _am + '" ' + _sltd + '>' + _am + '</option>|';
            }
        }
    }
    return _lst.slice(0,-1);
}

/*
* getField: Obtención de campo para:
- Mostrar en diálogo (por defecto)
- Sólo los OBLIGATORIOS sin valor (_fnv=true)
_t: Elemento (this)
_c: Color del fondo para el diálogo
_sd: sin DISABLED (true / false: si oculta o no los DISABLED en el diálogo) >> _sd=false para cuando queremos tratar con los OBLIGATORIOS
_fnv: (true / false) Para que devuelva un listado con los CAMPOS que no tienen valor >> (_fnv=true) Se utiliza para cuando se quiere saber los campos sin valor de cara a OBLIGATORIOS
_ro: (true / false) Se está controlando un campo cuya OBLIGATORIEDAD es opcional al compartirla con otro(s)
*/
function getField(_t, _c, _sd, _fnv, _ro) {
        var _rtn='';
        var _v=$('#'+_t.id).val();
        var _d='', _i='';
        var _ct=''; //ColorTxt 
        var _fv=false; //Si tiene o no valor el campo
        var _cr='ui-state-required'; //Class para el campo requerido

        //Control de si está o no definido el número contrato
        if ((_t.id=='ct_contrato') && ((_v).toUpperCase()=='NODEFINIDO')) {
            _v='';
        }

        if (_ro==undefined) _ro=false;
        if ($('#'+_t.id).is(':checkbox')) { //Valor para un CheckBox (en la BBDD es tipo Bit: true/false)
            _v=($('#'+_t.id).is(':checked'))?true:false;
            _ct='midnightblue';
            _fv=true;
        } else {
            if (_v!='') { _ct='midnightblue'; _fv=true; } else { _ct=(_ro)?'orange':'red'; }  //'#DF7401'
        }
        if ((_t.id).indexOf('inp_h_txt')==0) {
            _i='#'+(_t.id).replace('inp_h_txt','ct');
        } else {
            _i='#'+_t.id;
        }
        if (_ro) { 
            _cr='ui-state-required-opt'; 
            $('label[for='+_i.substr(1)+']').removeClass(_cr); 
        } 
        if ($(_i).prop('tagName')=='SELECT') { //Comprobación de si está deshabilitado...
            if ($(_i).siblings().find("input").hasClass("ui-state-disabled")) _d='! DISABLED > ';
        } else {
            if ($(_i).hasClass('ui-state-disabled')) _d='! DISABLED > ';
        }

        if (_d.length>0) {
            if (_fnv) { _rtn=''; } //Si lo que se busca es un listado de los CAMPOS que no tienen valor para controlar los OBLIGATORIOS. Los DISABLED no se tienen en cuenta directamente...
            if (_sd) {
                    _rtn='<div style="margin-bottom:2px;background-color:'+_c+'">' + ((_d.length>0)?'<span style="color:indianred">DISABLED</span>':'') + ' <span style="color:'+_ct+'; cursor:pointer" onclick="$(\'label[for='+_i.substr(1)+']\').ScrollTo({offsetTop:10}).effect(\'highlight\', {color: \'lightskyblue\'}, 2000);$(\'div#dlg\').dialog(\'close\').dialog(\'destroy\');">\['+ $('#'+_t.id).attr('d6-field') +'\]</span> <span style="color:grey">=</span> <span style="color:black">' + _v + '</span></div>';
                    d6.fmk.cLog(_t.id + ': ' + $('#'+_t.id).attr('d6-field') + ' > ' + _v + ' ' + _d + ' / tagName(this): ' + $('#'+_t.id).prop('tagName') + ' / tagName(original: '+ _i +'): ' + $(_i).prop('tagName'));
            } else {
                _rtn='';
            }
        } else {
            if (_fnv) { //Si lo que se busca es un listado de los CAMPOS que no tienen valor para controlar los OBLIGATORIOS...
                if (!_fv) { 
                    _rtn='\['+ $('#'+_t.id).attr('d6-field') +'\]'; 
                    if (_i.indexOf('ct_entr-')>=0) { //Si se deben marcar como que falta valor y es uno de los elementos de la tabla de ENTREGAS...
                        switch (d6.fmk.Left(_i,12)) {
                            case '#ct_entr-can': $('#th_cantidad').removeClass(_cr).addClass(_cr); break;
                            case '#ct_entr-emb': $('#th_embarque').removeClass(_cr).addClass(_cr); break;
                            case '#ct_entr-fij': $('#th_fijacion').removeClass(_cr).addClass(_cr); break;
                        }
                    } else {
                        $('label[for='+_i.substr(1)+']').removeClass(_cr).addClass(_cr);                         
                    }

                    //}
                } else { 
                    _rtn='';
                    if (_i.indexOf('ct_entr-')>=0) { //Si se deben marcar como que falta valor y es uno de los elementos de la tabla de ENTREGAS...
                        switch (d6.fmk.Left(_i,12)) {
                            case '#ct_entr-can': $('#th_cantidad').removeClass(_cr); break;
                            case '#ct_entr-emb': $('#th_embarque').removeClass(_cr); break;
                            case '#ct_entr-fij': $('#th_fijacion').removeClass(_cr); break;
                        }
                    } else {                    
                        $('label[for='+_i.substr(1)+']').removeClass(_cr); 
                    }
                }
            } else {
                _rtn='<div style="margin-bottom:2px;background-color:'+_c+'">' + ((_d.length>0)?'<span style="color:indianred">DISABLED</span>':'') + ' <span style="color:'+_ct+'; cursor:pointer" onclick="$(\'label[for='+_i.substr(1)+']\').ScrollTo({offsetTop:10}).effect(\'highlight\', {color: \'lightskyblue\'}, 2000);$(\'div#dlg\').dialog(\'close\').dialog(\'destroy\');">\['+ $('#'+_t.id).attr('d6-field') +'\]</span> <span style="color:grey">=</span> <span style="color:black">' + _v + '</span></div>';
                d6.fmk.cLog(_t.id + ': ' + $('#'+_t.id).attr('d6-field') + ' > ' + _v + ' ' + _d + ' / tagName(this): ' + $('#'+_t.id).prop('tagName') + ' / tagName(original: '+ _i +'): ' + $(_i).prop('tagName'));
            }
        }
        return (_rtn);
}

function showFieldsRequired(_b){

    if (_b==undefined) _b=true; //Por defecto muestra el Diálogo 
    var dbgTxt='';
    var bColor=true; 
    var sColor='';
    var lFNV=''; //Listado de campos OBLIGATORIOS que no tienen valor
    var _fld='';
    var lRI=''; //Listado de elementos requeridos (OBLIGATORIOS) 
    var aRFO; //Array que recoge los valores devueltos por requiredFieldsOpt: [0] Lista de campos requeridos sin valor; [1] Lista de campos requeridos sin valor formato HTML; [2] Valor de bColor que corresponde
    d6.fmk.cLog('~~~~~~~~> DEBUG : ini : d6-field > OBLIGATORIOS');
    lRI='#ctto [d6-field], #ctto_clipro [d6-field], #ctto_prod [d6-field], #ctto_condentr [d6-field], #ctto_cant [d6-field],';
    //lRI+='#ctto_precio #tbl_precio [d6-field], #ctto_entr #tbl_entr tr:nth-child(2) [d6-field], #ctto_otrcond #inp_h_txt_arb[d6-field]';
    lRI+='#ctto_precio #tbl_precio #ct_mdo-valor[d6-field], #ctto_precio #tbl_precio #ct_rate-valor[d6-field], #ctto_entr #tbl_entr tr:nth-child(2) [d6-field],';
    lRI+=' #ctto_otrcond #inp_h_txt_arb[d6-field]';
    $(lRI).not('#ctto_condentr #tbl_fltcam [d6-field],[id^=ct_apl-]').each(function(){ //Todos los elementos de la lista menos los correspondientes a FLETES/CAMIÓN
        if (bColor) {
            sColor='white'; bColor=false;
        } else {
            sColor='whitesmoke'; bColor=true;
        }
        dbgTxt+=getField(this, sColor, false);
        //Campos OBLIGATORIOS: listado de campos sin valor de entre los OBLIGATORIOS. 
        _fld=getField(this, '', false, true);
        lFNV+=_fld+((_fld!='')?',':''); 
    });
    //Control de si Fijo o Diferencial tienen valor (sólo es necesario que lo tenga uno de los dos)
    aRFO=requiredFieldsOpt('#ct_fijo-valor, #ct_dif-valor',bColor);
    lFNV+=aRFO[0]; //Listado de campos opcionales sin valor
    dbgTxt+=aRFO[1]; //Listado de campos opcionales sin valor en formato HTML (para diálogo)
    bColor=aRFO[2];
    //Control de que, en el caso de estar disponible FLETES y CAMIÓN, con que esté FLETES es sufuciente.
    //Origen
    aRFO=requiredFieldsOpt('#ct_fltogn, #ct_camogn',bColor);
    lFNV+=aRFO[0]; //Listado de campos opcionales sin valor
    dbgTxt+=aRFO[1]; //Listado de campos opcionales sin valor en formato HTML (para diálogo)
    bColor=aRFO[2];    
    //Destino
    aRFO=requiredFieldsOpt('#ct_fltdst, #ct_camdst',bColor);
    lFNV+=aRFO[0]; //Listado de campos opcionales sin valor
    dbgTxt+=aRFO[1]; //Listado de campos opcionales sin valor en formato HTML (para diálogo)
    bColor=aRFO[2];    
    //Prueba requiredFieldsOpt con Array
    requiredFieldsOpt(['#ct_fltogn, #ct_fltdst','#ct_camogn, #ct_camdst']);
    //
    d6.fmk.cLog('~~~~~~~~> DEBUG : OBLIGATORIOS');
    d6.fmk.cLog('Campos OBLIGATORIOS sin rellenar: ' + d6.fmk.delEndChar(lFNV,1) );
    d6.fmk.cLog('~~~~~~~~> DEBUG : fin > OBLIGATORIOS');
    if (_b) {
        DlgInfo(dbgTxt.replace(/\n/g,'<br/>'), '', 'D6DEC_CONTRATOS: Campos OBLIGATORIOS');    
        $('body').ScrollTo();
    }
    return (lFNV.length>0)?true:false; //Si hay campos OBLIGATORIOS por rellenar, devuelve CIERTO, en caso contrario FALSO
}

/*
* requiredFieldsOpt: para obtener la lista de campos requeridos vacíos cuando con que uno de ellos tenga valor ya es suficiente
* {str} _f [listado de campos en formato de selector de JQuery]
* {bln} _bC [(true / false) para saber qué color toca a continuación en el Diálogo]
*/
function requiredFieldsOpt(_f, _bC){
    var lFNVO=''; //Lista de opcionales no rellenados
    var bReq=false; 
    var sColor;
    var dbgT='';
    var _n=0;
    if (Array.isArray(_f)) { // Si tiene un array es porque los IDs individuales del array deben estar con valores, pero con que un item del array tenga ambos elementos con valor, ya vale
        d6.fmk.cLog('[requiredFieldsOpt] isArray: ' + _f.length);
        $(_f).each(function(){
            d6.fmk.cLog('[requiredFieldsOpt] ('+_n+'): ' + this);
            $((this).toString()).each(function(){ 
                if (_bC) {
                    sColor='white'; _bC=false;
                } else {
                    sColor='whitesmoke'; _bC=true;
                }
                dbgT+=getField(this, sColor, false);
                //Campos OBLIGATORIOS: listado de campos sin valor de entre los OBLIGATORIOS. 
                _fld=getField(this, '', false, true);
                lFNVO+=_fld+((_fld!='')?',':''); 
            });
            if (lFNVO=='') { //Significa que se ha cumplido la condición de que es suficiente con que un item del array (los elementos que hay dentro definidos) tengan datos
                bReq=true;
                return false; //Salimos del each
            }      
            d6.fmk.cLog('[requiredFieldsOpt] ('+_n+') ¿obligatorios?: ' + lFNVO);
            _n++;
        });
    } else {
        $(_f).each(function(){
            //DEBUG
            if (_f=='#ct_fltogn, #ct_fltdst') {
                d6.fmk.cLog('[requiredFieldsOpt] each... ' + this.id);
            }
            if (_bC) {
                sColor='white'; _bC=false;
            } else {
                sColor='whitesmoke'; _bC=true;
            }
            dbgT+=getField(this, sColor, false, false, true);
            //Campo OBLIGATORIO
            _fld=getField(this, '', false, true, true);
            lFNVO+=_fld+((_fld!='')?',':''); 
            if (_fld=='') { 
                bReq=true; 
                return false; //Salimos del 'each'
            }
        })
    }

    if (!bReq) { //Si encuentra que los campos requeridos no están rellenados...
        return [lFNVO, dbgT, _bC];
    } else { //Quitamos el color de OBLIGATORIO OPCIONAL vacío de todos los implicados
        if (Array.isArray(_f)) {
            $(_f).each(function(){
                $((this).toString()).each(function(){ 
                    var _i;
                    var _t=this;
                    if ((_t.id).indexOf('inp_h_txt')==0) {
                        _i='#'+(_t.id).replace('inp_h_txt','ct');
                    } else {
                        _i='#'+_t.id;
                    }            
                    $('label[for='+_i.substr(1)+']').removeClass('ui-state-required-opt'); 
                });
            });
        } else {
            $(_f).each(function(){
                var _i;
                var _t=this;
                if ((_t.id).indexOf('inp_h_txt')==0) {
                    _i='#'+(_t.id).replace('inp_h_txt','ct');
                } else {
                    _i='#'+_t.id;
                }            
                $('label[for='+_i.substr(1)+']').removeClass('ui-state-required-opt'); 
            });
        }
        return ['','',_bC];
    }
    

}

function showFieldsInfo(){
    /*-- DEBUG --*/
    var dbgTxt='';
    var bColor=true; 
    var sColor='';
    d6.fmk.cLog('~~~~~~~~> DEBUG : ini : d6-field');
    $('[d6-field]').each(function(){
        if (bColor) {
            sColor='white'; bColor=false;
        } else {
            sColor='whitesmoke'; bColor=true;
        }
        dbgTxt+=getField(this, sColor, true);        
        /*
        var _v=$('#'+this.id).val();
        var _d='', _i='';

        if ($('#'+this.id).is(':checkbox')) { //Valor para un CheckBox (en la BBDD es tipo Bit: true/false)
            _v=($('#'+this.id).is(':checked'))?true:false;
        }
        if ((this.id).indexOf('inp_h_txt')==0) {
            _i='#'+(this.id).replace('inp_h_txt','ct');
        } else {
            _i='#'+this.id;
        }
        if ($(_i).prop('tagName')=='SELECT') { //Comprobación de si está deshabilitado...
            if ($(_i).siblings().find("input").hasClass("ui-state-disabled")) _d='! DISABLED > ';
        } else {
            if ($(_i).hasClass('ui-state-disabled')) _d='! DISABLED > ';
        }
        if (bColor) {
            sColor='white'; bColor=false;
        } else {
            sColor='whitesmoke'; bColor=true;
        }
        dbgTxt+= '<div style="margin-bottom:2px;background-color:'+sColor+'">' + ((_d.length>0)?'<span style="color:indianred">DISABLED</span>':'') + ' <span style="color:midnightblue">\['+ $('#'+this.id).attr('d6-field') +'\]</span> <span style="color:grey">=</span> <span style="color:black">' + _v + '</span></div>';
        d6.fmk.cLog(this.id + ': ' + $('#'+this.id).attr('d6-field') + ' > ' + _v + ' ' + _d + ' / tagName(this): ' + $('#'+this.id).prop('tagName') + ' / tagName(original: '+ _i +'): ' + $(_i).prop('tagName'));
        */
    });
    d6.fmk.cLog('~~~~~~~~> DEBUG : fin');
    DlgInfo(dbgTxt.replace(/\n/g,'<br/>'), '', 'D6DEC_CONTRATOS: Campos y Valores');
    $('body').ScrollTo();
}

/*
* stateModifiedSelect: para controlar si ha habido modificación del valor por defecto
*/

function stateModifiedSelect(_t,_bINP) {
    //cambio color por modificación
    if ($(_t).attr('d6-defVal')==''||$(_t).attr('d6-defVal')==undefined) return true;
    var _vdF=(_bINP)?$(_t).parent().find('input').val():$(_t).find('option:selected').val();
    if (_vdF!=$(_t).attr('d6-defVal')) {
        $(_t).parent().find('input').addClass('ui-state-modified');        
    } else {
        $(_t).parent().find('input').removeClass('ui-state-modified');        
    }
    d6.fmk.cLog('stateModifiedSelect - defaultValue (' + $(_t).attr('id') + '): ' + $(_t).attr('d6-defVal') + ' / val: ' + $(_t).find('option:selected').val());
}

/*
* loadCBoxUnidades: Para cargar los Combos de UNIDADES
* _t: tipo de combo (mercado, fijo, otras comisiones, intermediario)
* _m: mercado (K / N)
* _v: valor por defecto
*/
function loadCBoxUnidades (_t,_m,_v) {
    var _md=(_t=='mdo')?'T':'F';
    if (_m==undefined) _m='';
    if (_v==undefined) _v='';
    $('#ct_'+_t+'-udad').removeClass('d6-modified');
    d6.fmk.loadCBox('#ct_'+_t+'-udad', 'engine.asp?a=rcbu&m='+_m+'&md='+_md, _v, {
        select: function(_e, _i) {
            //Carga de d6-field
            //$('#inp_h_txt_'+_t+'-udad').val( $('#ct_'+_t+'-udad :selected').text());
            //Cambio de color
            stateModifiedSelect(this); 
            //Si se ha modificado las unidades del FIJO, se recalcula el precio
            if (_t=='fijo') {
                //calculatePrecioCE();
                if ($(this).siblings().find('input').val()!=$(this).val()) { //Si ha cambiado el valor...
                    chgBtnCalcular();
                }
            }
        }
    }, false, '', '$(\'#inp_h_txt_'+_t+'-udad\').val($(\'#ct_'+_t+'-udad :selected\').text());');
/*
    switch(_t) {
        case 'mdo':
            d6.fmk.loadCBox('#ct_mdo-udad', 'engine.asp?a=rcbu', '', {
                select: function(_e, _i) {
                    //Carga de d6-field
                    $('#inp_h_txt_mdo-udad').val( $('#ct_mdo-udad :selected').text());
                }
            }, false, '', '$(\'#inp_h_txt_mdo-udad\').val($(\'#ct_mdo-udad :selected\').text());');
            break;
        case 'fijo':
            d6.fmk.loadCBox('#ct_fijo-udad', 'engine.asp?a=rcbu', '', {
                select: function(_e, _i){
                    //Carga de d6-field
                 $('#inp_h_txt_fijo-udad').val( $('#ct_fijo-udad :selected').text());
                }
            }, false, '', '$(\'#inp_h_txt_fijo-udad\').val($(\'#ct_fijo-udad :selected\').text());');
            break;
        case 'comint':
            d6.fmk.loadCBox('#ct_comint-udad', 'engine.asp?a=rcbu', '', {
                select: function(_e, _i){
                    //Carga de d6-field
                    $('#inp_h_txt_comint-udad').val( $('#ct_comint-udad :selected').text());
                }
            }, false, '', '$(\'#inp_h_txt_comint-udad\').val($(\'#ct_comint-udad :selected\').text());');
            break;
        case 'otrcom':
            d6.fmk.loadCBox('#ct_otrcom-udad', 'engine.asp?a=rcbu', '', {
                select: function(_e, _i){
                    //Carga de d6-field
                    $('#inp_h_txt_otrcom-udad').val( $('#ct_otrcom-udad :selected').text());
                }
            }, false, '', '$(\'#inp_h_txt_otrcom-udad\').val($(\'#ct_otrcom-udad :selected\').text());');    
            break;
    }
*/
}

/*
* mgmPeso: para gestionar el bloque de PESO > qué elementos están disponibles y valor por defecto
* <param> _aE {str}: Array de elementos disponibles
* <param> _v {str}: valor por defecto
*/
function mgmPeso(_aE,_v){
    $('#ct_peso input[type=radio]').each(function(){
        d6.fmk.radioDisabled('#'+this.id,'#ct_peso',true);
    });
    $.each(_aE, function(_idx, _vl){
        d6.fmk.radioDisabled(_vl,'#ct_peso',false);
    });
    d6.fmk.setRadio ('ct_peso', _v);
}

/*
* wrkflwCondicionEntrega: para fijar que elementos se pueden elegir y cuáles no en función de la Condición de Entrega seleccionada
* <param> _c {str}: condición de entrega
*/
function wrkflwCondicionEntrega(_c,_bLd){
    d6.fmk.cLog('wrkflwCondicionEntrega > _c= "' + _c + '"');
    if (_bLd==undefined) _bLd=false;
    //Habilitamos todos los elementos
    d6.fmk.cmbBoxDisabled('#ct_camogn',false);
    d6.fmk.cmbBoxDisabled('#ct_camdst',false);
    d6.fmk.cmbBoxDisabled('#ct_fltogn',false);
    d6.fmk.cmbBoxDisabled('#ct_fltdst',false);
    d6.fmk.chkBoxDisabled('#ct_camrtc',false);
    d6.fmk.chkBoxDisabled('#ct_camflj',false);
    d6.fmk.chkBoxDisabled('#ct_fltsgr',false);
    d6.fmk.chkBoxDisabled('#ct_dsp',false);
    switch (_c.toUpperCase()) {
        case 'FOB':
            //No puede haber CAMIÓN
            d6.fmk.cmbBoxDisabled('#ct_camogn',true);
            d6.fmk.cmbBoxDisabled('#ct_camdst',true);
            d6.fmk.chkBoxDisabled('#ct_camrtc',true);
            d6.fmk.chkBoxDisabled('#ct_camflj',true);
            //FOB: el destino FLETE por defecto es siempre Barcelona
            //d6.fmk.setValue('#ct_fltdst', 'Barcelona');
            //Sólo se puede marcar como peso: NSW
            mgmPeso(['#ct_peso_NSW'],'NSW');
            //No puede haber SEGURO
            d6.fmk.chkBoxDisabled('#ct_fltsgr',false);
            //FLETES: Cargamos ORIGEN y DESTINO por defecto
            LoadFletesOrigenDestino($('#ct_ogn').val());
            break;
        case 'C&F':
            //No puede haber SEGURO
            d6.fmk.chkBoxDisabled('#ct_fltsgr',true);
            //Sólo se puede marcar como peso: NSW o NDW
            mgmPeso(['#ct_peso_NSW','#ct_peso_NDW'],'NSW');
            //Retractilado (Camión): Deshabilitado
            d6.fmk.chkBoxDisabled('#ct_camrtc',true);
            //FLETES: Cargamos ORIGEN y DESTINO por defecto
            LoadFletesOrigenDestino($('#ct_ogn').val());
            break;
        case 'CIF':
            //Sólo se puede marcar como peso: NSW o NDW
            mgmPeso(['#ct_peso_NSW','#ct_peso_NDW'],'NSW');
            //Retractilado (Camión): Deshabilitado
            d6.fmk.chkBoxDisabled('#ct_camrtc',true);
            //FLETES: Cargamos ORIGEN y DESTINO por defecto
            LoadFletesOrigenDestino($('#ct_ogn').val());
            break;
        case 'FOT':
        case 'INSTORE':
            //Sólo se puede marcar como peso: REW                    
            mgmPeso(['#ct_peso_REW'],'REW');
            break;
        case 'DDP':
            //Sólo se puede marcar como peso: REW                    
            mgmPeso(['#ct_peso_REW'],'REW');
            //Despachado: SÍ y Deshabilitado
            d6.fmk.chkBoxDisabled('#ct_dsp',true,true);
            break;
        case 'DDU':
            //Sólo se puede marcar como peso: REW                    
            mgmPeso(['#ct_peso_REW'],'REW');
            //Despachado: NO y Deshabilitado
            d6.fmk.chkBoxDisabled('#ct_dsp',true,false);
    }
    //Si es cualquiera menos FOB, hay CAMIÓN, por tanto carga valores por defecto en función del ORIGIN
    if (_c!='FOB') { 
        LoadCamionesOrigenDestino($('#ct_ogn').val());
    }
    //COND: Si la condición de entrega es FOB, CIF o C&F, puede haber Flete. En caso contrario, No            
    if ($.inArray(_c, ['FOB','CIF','C&F'])==-1) { //Si no encuentra ninguno de estos valores...
        d6.fmk.cmbBoxDisabled('#ct_fltogn',true);
        d6.fmk.cmbBoxDisabled('#ct_fltdst',true);
        d6.fmk.chkBoxDisabled('#ct_fltsgr',true);
        $('#ct_fltsgr').off("click");
    } else {
        $('#ct_fltsgr').click(function(){
            var $_i=$('label[for="' + this.id + '"]');
            if ($('#' + this.id).prop('checked')) { ($_i).html( (($_i).html()).replace('No','Sí') ); } else { ($_i).html( (($_i).html()).replace('Sí','No') ); }
        });
    }
    if (_bLd) { //Sólo se hace en la primera carga tras a selección
        //Verificación de si en el campo [Condition] de la BBDD (Compras/Ventas) viene informado el PESO para así seleccionarlo
        d6.fmk.cLog('BtnSeleccion > inp_h_cond: ' + $('#inp_h_cond').val());
        $( ($('#inp_h_cond').val()).split(' ') ).each(function(){ //Para cada "palabra" del campo [Condition]...
            d6.fmk.cLog('>> Valor: ' + this.toUpperCase() + ' inArray: ' + $.inArray(this.toUpperCase(),['NSW','NDW','REW','WW']));
            if($.inArray(this.toUpperCase(),['NSW','NDW','REW','WW'])!=-1) { //Si encuentra uno de los Pesos...
                d6.fmk.setRadio('ct_peso', this.toUpperCase());
            }
        });    
    }
    //Carga del d6-field para Peso
    $('#inp_h_txt_peso').val( d6.fmk.getRadio('#ct_peso') ); 
    //Carga del d6-field para Condition
    $('#inp_h_txt_condent').val( $('#ct_condent option:selected').text() + ' ' + d6.fmk.getRadio('#ct_peso') ); //Ya que la Condition es la suma de la condición de entrega más el peso
}

/*
* resetCondicionesEntrega: para limpiar todos los elementos del apartado de Condiciones Entrega, menos cmbBoxes Condición Entrega y Marco Legal.
*/
function resetCondicionesEntrega(){
    //Ocultamos avisos de FLETES / CAMIONES
    $('#tr_info_fltcam').hide();
    //Desplegables de FLETES / CAMIONES en blanco
    d6.fmk.setValue('#ct_fltogn',''); 
    d6.fmk.setValue('#ct_fltdst',''); 
    d6.fmk.setValue('#ct_camogn',''); 
    d6.fmk.setValue('#ct_camdst',''); 
    d6.fmk.cmbBoxDisabled('#ct_fltogn',false);
    d6.fmk.cmbBoxDisabled('#ct_fltdst',false);
    d6.fmk.cmbBoxDisabled('#ct_camogn',false);
    d6.fmk.cmbBoxDisabled('#ct_camdst',false);
    //CheckBoxes
    d6.fmk.chkBoxDisabled('#ct_fltsgr',false);
    d6.fmk.chkBoxDisabled('#ct_plt',false);
    d6.fmk.chkBoxDisabled('#ct_camrtc',false);
    d6.fmk.chkBoxDisabled('#ct_camflj',false);
    d6.fmk.chkBoxDisabled('#ct_dsp',false);
    //RadioButtons
    d6.fmk.setRadio ('ct_peso', 'NSW');
    d6.fmk.radioDisabled('#ct_peso_REW','#ct_peso',false);
    d6.fmk.radioDisabled('#ct_peso_NSW','#ct_peso',false);
    d6.fmk.radioDisabled('#ct_peso_NDW','#ct_peso',false);
    d6.fmk.radioDisabled('#ct_peso_WW','#ct_peso',false);
}

/*
* execCLPRLoaded: Lo que se debe ejecutar una vez se ha cargado #ct_clpr (SELECT de selección para CLientes/Proveedores)
*/
function execCLPRLoaded() {
    $('#inp_h_txt_clpr').val($('#ct_clpr :selected').text());
    //Para obtener el número máximo de contrato a partir de Listado_DOCUMENTOS / D6DEC_CONTRATOS
    //Se deja como 'title' en [Nº Contrato]
    if (!($('#chk_Mod').is(':checked'))) {
        setNUMCTTO();
    }
}

/*
* setNUMCTTO: para obtener el número de contrato base
*/
function setNUMCTTO() {
    var _cttoDe=$('#ct_contratode').val();
    //var _cttoTipo=($('#inp_h_cia').val()!='')?$('#inp_h_cia').val():$('#ct_tipo-contrato').val();
    var _cttoTipo=$('#ct_tipo-contrato').val();
    var _mnda=$('#ct_moneda').val();
    var _dpch=($('#ct_dsp').is(':checked'))?true:false;
    //var _a=($('#inp_h_clpr').val()!='')?$('#inp_h_clpr').val():$('#ct_clpr').val();
    var _a=$('#ct_clpr').val();
    var _cttoN='';
    var _nca;

    $('#ct_contrato').removeClass('ui-state-err').addClass('ui-state-default');
    
    d6.fmk.cLog('NÚM. CTTO------------');
    d6.fmk.cLog('CttoDe: ' + _cttoDe);
    d6.fmk.cLog('TipoCtto: ' + _cttoTipo);
    d6.fmk.cLog('Moneda: ' + _mnda);
    d6.fmk.cLog('Despachado: ' + _dpch);
    d6.fmk.cLog('Ciente/Proveedor: ' + _a);

    //Contratos COPROCAFE
    if (_cttoTipo=='CO') {
        //_cttoN='CO-';
        //Contratos DESCAFEINADOS Y WATER TREATED
        if (_a=='3925800') { //COPROCAFÉ Alemania
            if (_cttoDe=='V') { //Venta
                if ((_mnda=='USD') && (!_dpch)) {
                    _cttoN='10#####';    
                }
            } else {
                if ((_mnda=='USD') && (_dpch)) {                
                    _cttoN='005####';
                }
            }
        } else {
            if (_cttoDe=='C') { //Compra
                //_cttoN='00';
                if (_a=='3700600') { //BRIC
                    if ((_mnda=='USD') && (!_dpch)) { //USD + Sin Despachar
                        _cttoN='002####';
                    } 
                } else { //Terceros
                    if ((_mnda=='USD') ) {
                        _cttoN='003####';
                    } 
                    if ((_mnda=='EUR') && (_dpch)) {
                        _cttoN='004####';   
                    } 
                }
            } else { // Venta
                if ((_mnda=='EUR') && (_dpch)) { //EUR + Despachado
                    _cttoN='5######';
                    //_cttoN+='6######'; //Ya se acabaron los números para esta base
                } 
                if ((_mnda=='USD')) { //USD + NO Despachado
                    _cttoN='7######';
                }
            }
        }
    }
    //Contratos BRIC
    if (_cttoTipo=='ZZ') { 
        //_cttoN=_cttoTipo;
        if (_cttoDe=='C') { //Compra
            if ((_mnda=='USD') && (!_dpch)) { //USD + TERCEROS + NO Despachado
                _cttoN='008####';
            }
        } else {//Venta
            if (_mnda=='USD') { //USD
                if ((_a=='1003400') && (!_dpch)) { //USD + COPROCAFE + NO Despachado
                    _cttoN='17#####';
                } else { 
                    if (!_dpch) { //USD + CLIENTES + NO Despachado
                        _cttoN='15#####';
                    }
                }
            }
        }
    }
    //Contratos BROKERAGE
    if (_cttoTipo=='BM') { 
        //_cttoN=_cttoTipo;
        if (_cttoDe=='V' && _mnda=='USD') { //Venta
            _cttoN='8######';
        }
    }

    //Si es una OFERTA...
    if (_cttoDe=='O') {
        _cttoN=getTodayAAMM()+'###';
    }

    //Se muestra el contrato en el formulario
    if (_cttoN.length<7) {
        $('#ct_contrato').val('NoDefinido').removeClass('ui-state-default').addClass('ui-state-err');
    } else {
        d6.fmk.cLog('[setNUMCTTO] Nº Contrato base: '+ _cttoN);
        //getMAXCTTO(_cttoN);
        _nca=getNUMCTTO(_cttoN);
        $('#ct_contrato').val(_nca).removeClass('ui-state-err').addClass('ui-state-default');
    }
}

/*
* getMAXCTTO: para obtener el número máximo de contrato e indicarlo como 'title' en [Nº Contrato]
*/
function getMAXCTTO(_cttoN){
    //Buscamos en el histórico de Documentos (aquí siempre estará el último que haya)
    _mctld=getMAXCTTOLD(_cttoN.replace(/#/g,''));
    //Buscamos en D6DEC_CONTRATOS
    _mct=getMAXCTTOC(_cttoN.replace(/#/g,''));
    if (_mct=='NoDefinido') _mct = _mctld; 
    d6.fmk.cLog('[getMAXCTTO] Número máximo del tipo "'+_cttoN +'":' + _mct);   
    $('label[for=ct_contrato]').attr('title','Nº Máximo actual: '+_mct).css('cursor','help'); 
    return _mct;
}

/*
* getMAXCTTOM: para obtener el número máximo de modificación para un contrato 
*/
function getMAXCTTOM(_cttoN){
    var _md;
    $('#ldr').show();
    $.ajax({
        async: false,
        url: 'engine.asp?A=MXCTTOM&C=' + _cttoN,
        dataType: 'json',
        cache: false,
        success: function (data, textStatus, jqXHR){
            switch (data.Result){
                case 'OK':
                     _md=data.Records[0].MODIFICACION;
                    d6.fmk.cLog('[getMAXCTTOM] Última modificacón para el contrato "'+_cttoN+'": '+_md);
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [MXCTTOM]');
                    break;                                    
            }
        },
        complete: function(){
            $('#ldr').hide();
        }
    });

    d6.fmk.cLog('[getMAXCTTOM] Número máximo de modificación para el contrato "'+_cttoN +'":' + _md);   
    _md=(Number(_md)+1).toString();
    if (_md.length===1) { _md='0'+_md; }
    //$('label[for=ct_contrato]').attr('title','Nº Modificación: '+_md).css('cursor','help'); 
    return _md;
}

/*
* getMAXCTTOLD: para obtener el número máximo que existe ahora mismo en función del número base. Consulta sobre Listado_DOCUMENTACIÓN (histórico)
* @param {str} _t [prefijo del tipo de contrato]
*/
function getMAXCTTOLD(_t){
var _mct='NoDefinido';            
var _p='';
    //Buscamos entonces en Listado_DOCUMENTACION
    /*
    if (_t.substring(0,3)=='CO-') {
        _t=_t.substr(3);
        _p='CO-';
    } else {
        _p=_t.substring(0,2);
        _t=_t.substr(2);
    }
    */
    $('#ldr').show();
    //Si _t empieza por 003, hay que tener en cuenta qué (tratado en engine.asp):
    //- Empezaron por el 0036, por lo que al llegar al 0039, pasaron al 0030 > Así, el valor que hay que buscar es el MAX siempre que el CTR<0036
    $.ajax({
        async: false,
        url: 'engine.asp?A=MXCTTOLD&T=' + _t + '&CV=' + $('#ct_contratode').val(),
        dataType: 'json',
        cache: false,
        success: function (data, textStatus, jqXHR){
            switch (data.Result){
                case 'OK':
                    if ((data.Records.length==0) || (data.Records[0].MAXCTTO=='')) {
                        d6.fmk.cLog('[getMAXCTTO] No hay contratos del tipo "'+_t+'" en INFOCOP.dbo.[Listado_DOCUMENTACION]');
                        _mct='NoDefinido';            
                    } else {
                        _mct=_p+data.Records[0].MAXCTTO;
                        d6.fmk.cLog('[getMAXCTTO(LD)] Último contrato encontrado para el tipo "'+_t+'": '+_mct);
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [MXCTTOLD]');
                    break;                                    
            }
        },
        complete: function(){
            $('#ldr').hide();
        }
    });
    return _mct;
}

/*
* getMAXCTTOC: para obtener el número máximo de Contrato en D6DEC_CONTRATOS
* @param {str} _t [prefijo del tipo de contrato]
*/
function getMAXCTTOC(_t){
    $('#ldr').show();
    var _mct='NoDefinido';
    var _p;
    $.ajax({
        async: false,
        url: 'engine.asp?A=MXCTTO&T=' + _t,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    if ((data.Records.length==0) || (data.Records[0].MAXCTTO=='')) {
                        //No hay ningún contrato de este tipo en D6DEC_CONTRATOS
                        d6.fmk.cLog('[getMAXCTTOC] No hay contratos del tipo "'+_t+'" en INFOCOP.dbo.D6DEC_CONTRATOS');
                    } else {
                        _mct=data.Records[0].MAXCTTO;
                        d6.fmk.cLog('[getMAXCTTOC] Último contrato encontrado para el tipo "'+_t+'": '+_mct);
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [MXCTTO]');
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide();
        }
    });    
    return _mct;
}


/*
* getNUMCTTO: Para obtener el Número de Contrato actual
*/
function getNUMCTTO(_cttoN) {
    //Será provisional hasta que se guarde en la BBDD el contrato
    var _mct=getMAXCTTO(_cttoN);
    var _p;
    var _nc;
    if (_mct=='NoDefinido') {
        _cttoN=_cttoN.replace(/#/g,'');
        if (d6.fmk.Left(_cttoN,2)=='00') {
            _nc=_cttoN+'0001';
        } else {
            switch(_cttoN.length) {
                case 4: _nc=_cttoN+'001'; break;
                case 2: _nc=_cttoN+'00101'; break;
                case 1: _nc=_cttoN+'000101'; break;
            }
        }
        return _nc;
    }
    /*
    if (_mct.substring(0,3)=='CO-') {
        _p='CO-';
        _nc=_mct.substr(3);
    } else {
        _p=_mct.substring(0,2);
        _nc=_mct.substr(2);
    }
    */
    if (d6.fmk.Left(_mct,2)=='00' || d6.fmk.Left(_mct,4)==getTodayAAMM()) { //Compras y Ofertas (de 1 en 1)
        _nnc=(parseInt(_mct)+1).toString();
    } else { //Ventas (de 100 en 100)
        _nnc=(Math.floor((parseInt(_mct)+100)/100)*100+1).toString();
    }
    return ((_nnc.length<7)?'00':'')+_nnc;
}

function changeMdoStckExch(_m){
    $('#ct_mdo-stckexch').val(_m);
    $('#ct_mdo-stckexch').attr('title', 'Mercado de ' + ((_m=='K')?'LONDRES':'NEW YORK'));
}

/*
* getAAAAMM: para conversión de fechas a formato AAAAMM
* _d: fecha a convertir
*/
function getAAAAMM(_d) {
    d6.fmk.cLog('[getAAAAMM] _d:' + _d + ' / return: ' + _d.substr(6)+_d.substring(3,5));
    return (_d.substr(6)+_d.substring(3,5));
}

/*
* resetForm: limpia el formulario para dejarlo en blanco con valores iniciales para los SELECT
*/
function resetForm(){
    //d6.fmk.setValue('div#tsk_ctto input',''); //inputs en blanco
    $('div#tsk_ctto input[type=text]').val('');
    //Color inputs background inicial
    $('input').removeClass('ui-state-modified').addClass('ui-state-default');
    $('div#tsk_ctto select').each(function(_i){
        d6.fmk.setValue('#'+this.id); //Valor por defecto    
    });
    $('#ct_qltc').children().remove(); //Borramos la CALIDAD-CLIENTE, ya que depdende de cada carga en los valores de Quality Group, Quality, Origin y Cliente 
    $('input[id^="ct_cod-"]').each(function(_k){
        $('#'+this.id).val( $('#'+(this.id).replace('cod-','')).val());
        d6.fmk.cLog('ct_cod-['+_k+']: ' + this.id + ' / Val de #' + (this.id).replace('cod-','') + ': ' +  $('#'+(this.id).replace('cod-','')).val()); //Rellenamos los códigos si es que están definidos  
    });
    $('#ct_fecha').val(convertDate(new Date()));
    $('#ct_codcia').val($('#ct_tipo-contrato').val());
    $('#ct_compania').val( $('#ct_tipo-contrato').find('option:selected').text() );
    //d6.fmk.setValue('#ct_qgr'); //Valor por defecto
    $('#tr_info_fltcam').hide();
    //ocultamos avisos
    $('#spn_chk_cantkgs').hide();
    $('#spn_chk_apl_cantkgs').hide();
    //reset TEXAREA
    $('#ct_cond-esp').val('');
    //checkboxes
    $('div#tsk_ctto input[type="checkbox"]').not('[id^="ct_pdcert_"]').each(function(){
        //Todos menos los componentes del ButtonSet (ct_pdcert)
        //if ($(this).attr('id')!='ct_fltsgr') {
            d6.fmk.setCheckBox('#'+this.id,false);
            $('#'+this.id).removeClass('ui-state-disabled');
            if (!($('#'+this.id).hasClass('ui-state-default'))) { $('#'+this.id).addClass('ui-state-default'); }
            $('#'+this.id).button('enable');
        //} else {
        //    d6.fmk.setCheckBox('#'+this.id,true);
        //}
    })
    //radio
    d6.fmk.setRadio ('ct_peso', 'NSW');
    $('#inp_h_txt_peso').val( d6.fmk.getRadio('#ct_peso') ); 
    //Refresh d6-field Condition
    refreshCondition();
    //Etiquetas con formato por defecto
    $('label').removeClass('ui-state-required').removeClass('ui-state-required-opt');
    //Borramos los HIDDEN de los campos cargados
    $('spn_hide_fields input[type=hidden]').each(function(){ $(this).val(''); });
    //Quitamos los ui-state-modified del textarea
    if ($('#ct_cond-esp').hasClass('ui-state-modified')) {
        $('#ct_cond-esp').removeClass('ui-state-modified').addClass('ui-state-default');  
    }
    //Quitamos los ui-state-modified de ButtonSet (Producto Certificado)
    $('#ct_pdcert input').each(function(){
        if ($('label[for='+this.id+']').hasClass('ui-state-modified-btn')) {
            $('label[for='+this.id+']').removeClass('ui-state-modified-btn').addClass('ui-state-default');
        }
    });
    //Ponermos a NO por defecto en el PRODUCTO CERTIFICADO
    d6.fmk.setCheckBox('#ct_pdcert_NO',true);
    $('#inp_h_txt_pdcert').val('NO');
    //Ocultamos tabla precios condiciones de entrega
    $('#tbl_precio_condentr').hide(); 
    $('#ct_fobdif').hide();
    g_TblPrecios=false; 
    //Calidad-cliente
    $('#inp_h_txt_qltc').val('');   
    //Se limpian los mensajes de Entregas/Embarques - Aplicación
    for (var _i = 1; _i <= 13; _i++) {
        $('#spn_chk_apl_cantkgs-'+_i).removeClass('ui-state-err-txt').removeClass('ui-state-orange').removeClass('ui-state-ok').hide();
        $('#ct_shapl-'+_i).parent().removeClass('ui-state-err').removeClass('ui-state-orange').removeClass('ui-state-ok');
    }
    //Botones de CALCULAR
    $('[id^=ct_btn_calcular-]').removeClass('ui-state-btn-click').addClass('ui-state-default');
}

/*
* loadCondCode: carga el CondCode en función de los valores de la condición de entrega y el peso
*/
function loadCondCode(_chk){
    if (_chk==undefined) _chk=false;
    var _CEnt=$('#ct_condent :selected').text().toUpperCase();
    var _Peso=d6.fmk.getRadio('#ct_peso');
    if ((_CEnt=='') || (_Peso=='')) {
        return false;
    }
    //Cargamos el código para CondCode (se obtiene en función de la condición de enrega <ct_condent> y el peso <ct_peso>)
    $('#ldr').show(); 
    $.ajax({
        async: true,
        url: 'engine.asp?A=RCDE&C=' + _CEnt + '&P=' + _Peso,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    if (data.Records.length>0) {
                        $('#inp_h_cdcondent').val(data.Records[0].CondCode);    
                    } else {
                        $('#inp_h_cdcondent').val(0);    
                        if (_chk) {
                            DlgInfo('No se ha encontrado valor para ' + _CEnt + ' y ' + _Peso,'txtDlgErr','[Código Condición Entrega]');
                            return false;
                        }
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Recuperación CondCode]');
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide(); 
        }
    });

}

/*
* loadFOBDif: para mostrar el valor del FOB + <diferencial>
*/
function loadFOBDif() {
    var _sgn=(($('#ct_dif-valor').val()).replace(',','.')<0)?'':'+';
    $('#ct_fobdif').val( 'FOB ' + _sgn + d6.fmk.number_format(($('#ct_dif-valor').val()).replace(',','.'),2,',','.')).show();  
}

/* -- Main -- */

function Main(){

    /*-- Boton flotante para TOP --*/
    $('body').prepend('<a href="#" class="back-to-top">Arriba</a>');
    var amountScrolled = 200;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn(tDelayEffect);
        } else {
            $('a.back-to-top').fadeOut(tDelayEffect);
        }
    });
    $('a.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, tDelayEffect);
        return false;
    });

    /*-- JQuery sortScroll --*/
    /*
    $("#wrapper").sortScroll({
        animationDuration: 1000,// duration of the animation in ms
        cssEasing: "ease-in-out",// easing type for the animation
        keepStill: true,// if false the page doesn't scroll to follow the element
        fixedElementsSelector: "navigation"// a jQuery selector so that the plugin knows your fixed elements (like the fixed nav on the left)
    });    
    */
    /*-- Accordion --*/
    $('#accordion').accordion({
        header: 'h3',
        collapsible: true
    });
    /*
    click(function(){
        if (g_Grid=='cttos') {
            if ($('#jtable_cttos').jtable('option','pageSize')==10) {
                $('#jtable_cttos').jtable('option','pageSize',20);
            } else {
                $('#jtable_cttos').jtable('option','pageSize',10);
            }
        }
        
    });
    */
    
    //Los INPUTs numéricos se alinean a la derecha (como una CALCULADORA)
    //$('input[d6-fieldType=N]').addClass('txtalign-right');

    //Incorporamos las APLICACIONES
    g_AplHtml = $('#apl_html').html();
    for (var i = 1; i <= 13; i++) {
        $(g_AplHtml.replace(new RegExp('#n#', 'g'), i)).appendTo('#ct_apl-tr-'+ i +' td');
    }

    /*-- input style --*/
    $('input:text, input:password')
    .addClass("custom-combobox-input ui-state-default ui-corner-all");

    /*-- Selects > combobox --*/
    $('select').combobox();
    
    /*-- Button --*/
    $('input:button').button();
    
    /*-- Para separar el siguiente elemento cuando hay un 'combobox()' --*/
    $('span.custom-combobox').addClass('marginRight35');
    
    /*-- Checkbox --*/
    $('input:checkbox')
        .button()
        .click(function(){
            var $_i=$('label[for="' + this.id + '"]');
            if ($('#' + this.id).prop('checked')) { ($_i).html( (($_i).html()).replace('No','Sí') ); } else { ($_i).html( (($_i).html()).replace('Sí','No') ); }
    });
    
    $('#mnu:first-child').attr("class", "mnuItmHover");

    /*
    *
    * HISTÓRICO
    *
    */
    
    //Prepare jtable plugin
    // Carga de estructura de jtable
    // CONTRATOS
    loadJTable ('jtable_cttos');
    // VENTAS/COMPRAS
    loadJTable ('jtable_vc');
    
    //Carga inicial de Estado de Trabajos
    ShowMnu('H','mnuHst');

    //Botones
    $('#btn_vvc')
        .button({icons: {primary: 'ui-icon-contact'} })
        .click(function(e){
            //alert ('Ventas/Compras');
            g_Grid='vc';
            //d6.fmk.cLog ('Valor QualityGroup: ' + $('#slc_qgr').value);
            //Deshabilitamos "Modificar", porque sólo se puede hacer al seleccionar un registro del GRID de CONTRATOS
            d6.fmk.chkBoxDisabled('#chk_Mod',true);
            $('#jtable_vc').jtable('load');
            $('#jtable_cttos').hide();
            $('#jtable_vc').show();
        });         

    $('#btn_cttos')
        .button({icons: {primary: 'ui-icon-contact'} })
        .click(function(e){
            //alert ('Contratos');
            g_Grid='cttos';
            //Deshabilitamos "Modificar", porque sólo se puede hacer al seleccionar un registro del GRID de CONTRATOS
            d6.fmk.chkBoxDisabled('#chk_Mod',true);            
            $('#jtable_cttos').jtable('load');
            $('#jtable_vc').hide();
            $('#jtable_cttos').show();
        });         


    /*   ######################  INICIO : BtnSelección ######################   */
    $('#btn_csl') // [Cargar Selección]
        .button({icons: {primary: 'ui-icon-check'}, disabled: true })
        .click(function(e){
            var _p_qgrN;
            var _p_ognN;
            g_bModP=false; //true: cuando se modifica el PRECIO del contrato (FIJO)
            g_bModA=false; //true: cuando se modifica alguna APLICACIÓN del contrato
            g_bModE=false; //true: cuando se modifica cualquier elemento que no sea ni PRECIO ni APLICACIÓN del contrato

            d6.fmk.cLog('[BtnSeleccion] > Click!');
            //Activamos el entorno de Contratos
            ShowMnu('C','mnuCtto');
            mnuScrollBlock('#mnuCtto', '#app_w');
            //Limpiamos el entorno de Contratos
            resetForm();
            //Si es modificación, muestra el Nª modificación
            if (($('#chk_Mod').is(':checked'))) {
                $('#ct_nummod').show();
            } else {
                $('#ct_nummod').hide();
            }            
            //Valores iniciales en CONTRATO
            if ($('#inp_h_contratode').val()=='C') {
                $('#ctto_clipro div').text('PROVEEDORES');
                $('#cond-esp-txt').text('Proveedor');
                $('#ctto_entr div.stit').text('EMBARQUES');
                //Cambio etiqueta para Referencia Cliente/Proveedor
                $('label[for=ct_refclipro]').text('Ref. Proveedor:')
            } else {
                $('#ctto_clipro div').text('CLIENTES');
                $('#cond-esp-txt').text('Cliente');
                $('#ctto_entr div.stit').text('ENTREGAS');
                //Cambio etiqueta para Referencia Cliente/Proveedor
                $('label[for=ct_refclipro]').text('Ref. Cliente:')
            }
            //Número contrato inicial, asignación de Nº de MODIFICACIÓN y fecha ctto, si es MODIFICACIÓN
            if ($('#chk_Mod').is(':checked')) {
                $('#ct_contrato').val( $('#inp_h_ctto').val() );
                $('#ct_nummod').val( getMAXCTTOM( $('#inp_h_ctto').val() ) );
                //Fecha
                $('#ct_fecha').val( $('#inp_h_fecha').val() );
            } 
            d6.fmk.setValue('#ct_contratode', $('#inp_h_contratode').val(), true);
            $('label[for="ct_clpr"]').text( $('#inp_h_contratode').val()=="C" ? "Proveedor: " : "Cliente: " );
            if ($('#ct_contratode').val()=='C') {
                //Deshabilita todas las ENTREGAS menos una por haber seleccionado COMPRA
                for (n=2; n<=13; n++) {
                    d6.fmk.inpBoxDisabled('#ct_entr-cant-'+n, true);
                    d6.fmk.cmbBoxDisabled('#ct_entr-emb-'+n, true);
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+n, true);
                    sumCantidadesEntregas();
                }                 
            } else {
                //Habilita todas las ENTREGAS por ser VENTA
                for (n=1; n<=13; n++) {
                    d6.fmk.inpBoxDisabled('#ct_entr-cant-'+n, false);
                    d6.fmk.cmbBoxDisabled('#ct_entr-emb-'+n, false);
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+n, false);
                    sumCantidadesEntregas();
                }                 
            }
            d6.fmk.setValue('#ct_tipo-contrato', $('#inp_h_cia').val(), true);
            loadEntidad('#inp_h_cia');
            d6.fmk.setValue('#ct_moneda', $('#inp_h_mnd').val(), true);
            d6.fmk.customWidthSELECT('#ct_moneda','85px'); 
            //Cambio en unidades de PRECIO
            var _mdo = ($('#inp_h_mnd').val()=='EUR')?'K':'N';     
            //Cargamos valor para Acurdos / Margen
            loadAcuerdosMargen(  $('#inp_h_qgrN').val(),  $('#inp_h_ognN').val(), $('#inp_h_mnd').val() );
            //Cambiamos moneda para Acuerdos/Margen
            $('#ct_acuerdos-udad').val( $('#ct_moneda').val() + '/MT');
            $('#ct_margen-udad').val( $('#ct_moneda').val() + '/MT');
            //Control de GRID
            if (g_Grid=='cttos') {
                loadCBoxUnidades('fijo', _mdo, $('#inp_h_fld_FIJO_UNIDAD').val());
                $('#ct_comint-udad').val( $('#inp_h_fld_COMINT_UNIDAD').val() );
                $('#ct_otrcom-udad').val( $('#inp_h_fld_COMOTRCOM_UNIDAD').val() );
                //loadCBoxUnidades('comint',_mdo, $('#inp_h_fld_COMINT_UNIDAD').val());
                //loadCBoxUnidades('otrcom',_mdo, $('#inp_h_fld_COMOTRCOM_UNIDAD').val()); 
            } else {
                loadCBoxUnidades('fijo', _mdo, (($('#ct_moneda').val()=='EUR')?'EUR/MT':'USD/MT'));
                $('#ct_comint-udad').val( $('#ct_moneda').val() + '/MT');
                $('#ct_otrcom-udad').val( $('#ct_moneda').val() + '/MT');
                //loadCBoxUnidades('comint',_mdo);
                //loadCBoxUnidades('otrcom',_mdo);                 
            }
                 
            //Precio (Fijo)
            $('#ct_fijo-valor').val(($('#inp_h_precio').val()).replace('.',','));
            $('#ct_fijo-valor').attr('d6-defVal', ($('#inp_h_precio').val()=='')?'0':$('#inp_h_precio').val() );
            //Diferencial (En Dif.)
            $('#ct_dif-valor').val(($('#inp_h_dif').val()).replace('.',','));
            loadFOBDif();
            $('#ct_dif-valor').attr('d6-defVal',$('#inp_h_dif').val());
            //Cantidad Kgs
            $('#ct_totkgs').val( d6.fmk.number_format($('#inp_h_kgs').val(),0,',','.') );
            if (g_Grid=='vc') {
                $('#ct_cant').val($('#inp_h_orgbags').val());
                $('#ct_kgs').val(Math.floor($('#inp_h_kgs').val() / $('#inp_h_orgbags').val()));    
                d6.fmk.setValue('#ct_tipopaq','OrgBags');
            }
            $('#ct_entr-cant-1').val($('#inp_h_kgs').val());
            sumCantidadesEntregas();
            //Clientes/Proveedores
            $('#ct_clpr').removeClass('d6-modified');
            d6.fmk.loadCBox('#ct_clpr', 'engine.asp?a=rcbcp&t=' + ( $('#inp_h_contratode').val()=="C" ? "K" : "D" ) , $('#inp_h_clpr').val(), {
                select: function(event, ui){
                    d6.fmk.setValue('#ct_cod-clpr', this.value);
                    $('#inp_h_txt_clpr').val($('#'+this.id+' :selected').text());
                    //Carga de CALIDAD CLIENTE
                    reloadQLTC();
                    //Cambio de color
                    stateModifiedSelect(this);
                    //Número de contrato
                    if (!($('#chk_Mod').is(':checked'))) {
                        setNUMCTTO();
                    }
                }
            }, false, '#ct_cod-clpr', 'execCLPRLoaded();',true);
            //Quality Group
            $('#ct_qgr').removeClass('d6-modified');
            d6.fmk.loadCBox('#ct_qgr', 'engine.asp?a=rcbqg', $('#inp_h_qgrN').val(), {
                select: function(event, ui){
                    d6.fmk.setValue('#ct_cod-qgr', this.value);
                    d6.fmk.loadCBox('#ct_ogn', 'engine.asp?a=rcbor&qg=' + this.value, '', {}, true, '#ct_cod-ogn','stateModifiedSelect(\'#ct_ogn\');',true);
                    d6.fmk.loadCBox('#ct_qlt', 'engine.asp?a=rcbql&qg=' + this.value, '', {}, true, '#ct_cod-qlt','stateModifiedSelect(\'#ct_qlt\');',true);
                    //Carga de CALIDAD CLIENTE
                    reloadQLTC();
                    //Carga valor descriptivo para d6-field
                    $('#inp_h_txt_qgr').val($('#'+this.id+' :selected').text());
                    //Cambio de color
                    stateModifiedSelect(this); 
                    //Actualizamos Acuerdos/Margen
                    loadAcuerdosMargen($(this).val(), $('#ct_ogn').val(), $('#ct_moneda').val());
                }
            }, false, '#ct_cod-qgr', '$(\'#inp_h_txt_qgr\').val($(\'#ct_qgr :selected\').text());',true); 
            //Origin  
            $('#ct_ogn').removeClass('d6-modified');
            //Recuperamos valor de QualityGroup para filtrar en los ORÍGENES
            _p_qgrN=($('#inp_h_qgrN').val()!='')?'&qg='+$('#inp_h_qgrN').val():'';
            d6.fmk.loadCBox('#ct_ogn', 'engine.asp?a=rcbor' + _p_qgrN, $('#inp_h_ognN').val(), {
                select: function(event, ui){
                    d6.fmk.setValue('#ct_cod-ogn', this.value);
                    d6.fmk.loadCBox('#ct_qlt', 'engine.asp?a=rcbql&o=' + this.value, '', {}, true, '#ct_cod-qlt','stateModifiedSelect(\'#ct_qlt\');',true);
                    //Carga de CALIDAD CLIENTE
                    reloadQLTC();
                    //Carga valor descriptivo para d6-field
                    $('#inp_h_txt_ogn').val($('#'+this.id+' :selected').text());
                    //Cambio de color
                    stateModifiedSelect(this);
                    //Actualizamos Acuerdos/Margen
                    loadAcuerdosMargen($('#ct_qgr').val(), $(this).val(), $('#ct_moneda').val());
                    //FLETES: Cargamos Origen y Destino si corresponde
                    if ($.inArray($('#ct_condent').val(), ['FOB','CIF','C&F'])!=-1) { //Si es cualquiera de estos valores hay Fletes
                        LoadFletesOrigenDestino($(this).val());
                    }
                    //CAMIONES: se carga Origen y Destino por defecto en función del ORIGIN (siempre que CondEntrega no sea FOB)
                    if ($('#ct_condent').val()!='FOB'){
                        LoadCamionesOrigenDestino($(this).val());
                    }
                }                                
            }, false, '#ct_cod-ogn', '$(\'#inp_h_txt_ogn\').val($(\'#ct_ogn :selected\').text());',true);
            //Quality
            d6.fmk.customWidthSELECT('#ct_qlt','300px'); 
            $('#ct_qlt').removeClass('d6-modified');
            _p_ognN=($('#inp_h_ognN').val()!='')?'&o='+$('#inp_h_ognN').val():'';
            d6.fmk.loadCBox('#ct_qlt', 'engine.asp?a=rcbql' + _p_qgrN + _p_ognN, $('#inp_h_qltN').val(), {
                select: function(event, ui){
                    d6.fmk.setValue('#ct_cod-qlt', this.value);
                    //Carga de CALIDAD CLIENTE
                    reloadQLTC();
                    //Carga valor descriptivo para d6-field
                    $('#inp_h_txt_qlt').val($('#'+this.id+' :selected').text()); 
                    //Cambio de color
                    stateModifiedSelect(this);
                }                                
            }, false, '#ct_cod-qlt', '$(\'#inp_h_txt_qlt\').val($(\'#ct_qlt :selected\').text());',true); 
            //para cargar d6-field (CANTIDAD_TIPO)
            $('#inp_h_txt_tipopaq').val( $('#ct_tipopaq :selected').text() ); 
            //Al estar Intermediario y Otros Comisionistas en blanco, se deshabilitan las comisiones correspondientes
            d6.fmk.inpBoxDisabled('#ct_otrcom-valor', true);
            d6.fmk.inpBoxDisabled('#ct_otrcom-udad', true);
            //d6.fmk.cmbBoxDisabled('#ct_otrcom-udad', true);
            d6.fmk.inpBoxDisabled('#ct_comint-valor', true);
            d6.fmk.inpBoxDisabled('#ct_comint-udad', true);
            //d6.fmk.cmbBoxDisabled('#ct_comint-udad', true);
            //Calidad-Cliente
            d6.fmk.customWidthSELECT('#ct_qltc','300px');
            //Sólo cuando Cliente-Proveedor / Quality Group / Origin / Quality tienen valores asignados, se carga la lista del CALIDAD CLIENTE
            /*
            var promiseInfoForQltClnt = new Promise (function(resolve, reject) {
                if ($('#ct_cod-qgr').val()!='' && $('#ct_cod-ogn').val()!='' && $('#ct_cod-qlt').val()!='' && $('#ct_cod-clpr').val()!='') {
                    resolve('OK');
                } else {
                    reject('ERROR');
                }
            });
            promiseInfoForQltClnt.then(function(_rslt){
                //Cuando se ha cumplido la condición del 'promise'...
                reloadQLTC();
                d6.fmk.cLog('[True!] promiseInfoForQltClnt');
            }, function(_err){
                //Si ha fallado...
                d6.fmk.cLog('[!Error] promiseInfoForQltClnt');
            });
            */
            // Producto Certificado
            $('#ct_pdcert').buttonset().click(function(){
                $('#inp_h_txt_pdcert').val( d6.fmk.getCheckboxSet('ct_pdcert') );
                d6.fmk.cLog('Valor #inp_h_txt_pdcert > ' + $('#inp_h_txt_pdcert').val());
                //Control de si se ha modificado el valor por defecto para darle la clase correspondiente
                //Ponemos todos a 'default'
                $('#'+this.id+ ' input').each(function(){
                    $('label[for='+this.id+']').removeClass('ui-state-modified-btn').addClass('ui-state-default');
                });
                //Los que están marcados, si no son el valor por defecto (inicial), se marcan como modificados
                $('input[id^=ct_pdcert]:checked').each(function(){
                    if ($(this).attr('d6-defVal')==undefined) { //Serán los Buttons que no son valor por defecto
                        d6.fmk.cLog('[ct_pdcert] id:' + this.id + '>>> checked!!');
                        $('label[for='+this.id+']').removeClass('ui-state-default').addClass('ui-state-modified-btn');
                    }
                });
                d6.fmk.setCheckBox('#ct_pdcert_NO',false);
            });
            //Ocultamos los AVISOS de Fletes y Camiones
            $('#spn_info_flt_nodata').hide();
            $('#spn_info_cam_nodata').hide();
            $('#tbl_info_flt').hide();
            $('#spn_info_cam').hide();
            //Carga de condición entrega... (inp_h_condent)
            //Obtenemos el Descriptivo de la condición de entrega a partir del CondCode
            $('#ldr').show();
            $('#inp_h_condent').val('FOB');
            $.ajax({
                async: false,
                url: 'engine.asp?A=rce&c=' + $('#inp_h_condcde').val(),
                dataType: 'json',
                cache: false,
                success: function(data, textStatus, jqXHR){
                    switch (data.Result) {
                        case 'OK':
                            if (data.Records.length==0) {
                                $('#inp_h_condent').val('FOB');
                            } else {
                                $('#inp_h_condent').val(data.Records[0].Condition);
                            }
                            break;
                        case 'ERROR':
                            DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Recuperación Condición Entrega]');
                            break;
                    } 
                },
                complete: function(){
                    $('#ldr').hide();
                }
            });
            $('#ct_condent').removeClass('d6-modified');
            d6.fmk.customWidthSELECT('#ct_condent','100px'); 
            d6.fmk.cLog('[BtnSeleccion] > #ct_condent: ' + $('#inp_h_condent').val());
            d6.fmk.loadCBox('#ct_condent', 'engine.asp?a=rcbce', $('#inp_h_condent').val(), {
                select: function(event, ui){
                    d6.fmk.cLog('ct_condent > ' + $('#ct_condent :selected').text() + ' / F?: ' + ($('#ct_condent :selected').text()).indexOf('F'));
                    var _v=$('#ct_condent :selected').text().toUpperCase();
                    //Cargamos el CondCode en función de la condición de entrega y el peso
                    loadCondCode();
                    //Activamos elementos del bloque
                    resetCondicionesEntrega();
                    //Gestión de elementos activos según la Condición de Entrega
                    wrkflwCondicionEntrega(_v);
                    //Cambio de color
                    stateModifiedSelect(this);
                    //Refresh d6-field Condition
                    refreshCondition();
                    //Recálculo precio condiciones entrega
                    //if (g_TblPrecios) {
                        //calculatePrecioCE();
                        if ($(this).siblings().find('input').val()!=$(this).val()) { //Si ha cambiado el valor...
                            chgBtnCalcular();
                        }
                    //}
                }
            }, false, '', '$(\'#inp_h_txt_condent\').val($(\'#ct_condent :selected\').text()); wrkflwCondicionEntrega($(\'#inp_h_txt_condent\').val(), true);');
            //Cargamos el CondCode en función de la condición de entrega y el peso
            loadCondCode();            
            //Stock Exchange (Mercado de...)
            changeMdoStckExch($('#inp_h_stkexch').val());
            $('#ct_mdo-udad').val($('#inp_h_fld_MERCADO_UNIDAD').val());
            //loadCBoxUnidades('mdo',$('#inp_h_stkexch').val(),$('#inp_h_fld_MERCADO_UNIDAD').val());
            // Intermediario
            d6.fmk.customWidthSELECT('#ct_interm','200px');
            $('#ct_interm').removeClass('d6-modified');
            d6.fmk.loadCBox('#ct_interm', 'engine.asp?a=rcbi', $('#inp_h_cod-interm').val(), {
                select: function(event, ui){
                    d6.fmk.setValue('#ct_cod-interm', this.value);
                    d6.fmk.inpBoxDisabled('#ct_comint-valor', false);
                    d6.fmk.inpBoxDisabled('#ct_comint-udad', false);
                    //d6.fmk.cmbBoxDisabled('#ct_comint-udad', false);
                    //Carga de d6-field
                    $('#inp_h_txt_interm').val( $('#'+this.id+' :selected').text() ); 
                    //Cambio de color
                    stateModifiedSelect(this);            
                }                                
            }, false, '#ct_cod-interm', '$(\'#inp_h_txt_interm\').val($(\'#ct_interm :selected\').text());'); 
            //Despachado activo y No aprovación deshabilitado
            d6.fmk.chkBoxDisabled('#ct_aprmta',false); 
            d6.fmk.chkBoxDisabled('#ct_noaprnv',true); 
            d6.fmk.inpBoxDisabled('#ct_dirent', true);
            //Incorporación de d6-field/d6-fieldType para los elementos de ENTREGA/EMBARQUE
            $('input[id^=ct_entr-cant-]').each(function(){
                var _n=(this.id).substr((this.id).length-2);
                _n=( _n.charAt(0)=='-' )?_n.substr(1): _n;
                $(this).attr('d6-field','ENTREGA_'+_n+'_CANTIDAD');
                $(this).attr('d6-fieldType','N');
                d6.fmk.cLog('Carga d6-field > ' + this.id + ': ' + $(this).attr('d6-field') + ' (N)');
            });
            $('select[id^=ct_entr-emb-],select[id^=ct_entr-fijacion-]').each(function(){
                var _n=(this.id).substr((this.id).length-2);
                _n=( _n.charAt(0)=='-' )?_n.substr(1): _n;
                if ((this.id).indexOf('-emb-')>0) {
                    $(this).attr('d6-field','ENTREGA_'+_n+'_EMBARQUE');
                } else {
                    $(this).attr('d6-field','ENTREGA_'+_n+'_FIJACION');  
                }
                $(this).attr('d6-fieldType','N');
                d6.fmk.cLog('Carga d6-field > ' + this.id + ': ' + $(this).attr('d6-field') + ' (N)');
            });
            //Incorporación de d6-field para los elementos de APLICACION (no se utilizan para grabar, sólo para controlar los valores introducidos)
            //Tambien d6-defVal para controlar si ha habido o no modificación
            for(var _ne=0; _ne<=13; _ne++) {
                $('input[id^=ct_apl-cant-'+_ne+'-],input[id^=ct_apl-ctto-'+_ne+'-]').each(function(){
                    var _n=(this.id).substr((this.id).length-2);
                    var _t='';
                    _n=( _n.charAt(0)=='-' )?_n.substr(1): _n;
                    if ((this.id).indexOf('-cant-')>0) {
                        $(this).attr('d6-field','APLICACION_'+_ne+'_'+_n+'_CANTIDAD');
                        //$(this).attr('d6-field','APLICACION_'+_n+'_CANTIDAD');
                        _t='N';
                    } else {
                        $(this).attr('d6-field','APLICACION_'+_ne+'_'+_n+'_CONTRATO');
                        //$(this).attr('d6-field','APLICACION_'+_n+'_CONTRATO');
                        _t='T';
                    }                
                    $(this).attr('d6-fieldType', _t);
                    $(this).attr('d6-defVal','');
                    d6.fmk.cLog('Carga d6-field > ' + this.id + ': ' + $(this).attr('d6-field') + ' (' + _t + ')');
                });
            }
            //Fijación Moneda a No por defecto si no hay información recuperada de un contrato
            var _fjmv=$('#inp_h_fld_FIJACION_MONEDA').val();
            d6.fmk.setCheckBox('#ct_fijmon', (( _fjmv && _fjmv!='' && _fjmv!='null' )?_fjmv:false));
            d6.fmk.cLog('[BtnSeleccion] ct_fijmon: ' + (( _fjmv && _fjmv!='' && _fjmv!='null' )?_fjmv:false) );
            //Fijación Mercado a No por defecto si no hay información recuperada de un contrato
            var _fjmdov=false;
            if (g_Grid=='cttos') {
                _fjmdov=$('#inp_h_fld_FIJACION_MERCADO').val();
            } else {
                _fjmdov=($('#inp_h_prctpe').val()=='2')?true:false;                
            }   
            d6.fmk.setCheckBox('#ct_fijmdo', (( _fjmdov && _fjmdov!='' && _fjmdov!='null' )?_fjmdov:false));
            if ($('#ct_fijmdo').is(':checked')) { $('#inp_h_prctpe').val(2); } else { $('#inp_h_prctpe').val(1); }
            d6.fmk.cLog('[BtnSeleccion] ct_fijmdo: ' + (( _fjmdov && _fjmdov!='' && _fjmdov!='null' )?_fjmdov:false) );
            //Fechas de FIJACIÓN del apartado Entrega/Embarques: Habilitadas o no en función de si la fijación moneda es false o true respectivamente
            d6.fmk.cLog('[BtnSeleccion] ct_fijmdo checked: ' + $('#ct_fijmdo').is(':checked') + ' > NOT: ' + !($('#ct_fijmdo').is(':checked')));
            /*
            if ($('#ct_contratode').val()=="C") {
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-1', !($('#ct_fijmdo').is(':checked')));
            } else {
                $('select[name^="ct_entr-fijacion-"]').each(function(){
                    d6.fmk.cmbBoxDisabled('#'+this.id, !($('#ct_fijmdo').is(':checked')));
                });                        
            }
            */
            //Carga dinámica de valores de campos (spn_hide_fields) > sólo aquellos no tratados hasta ahora (los que empiezan por inp_h_fld)
            d6.fmk.cLog('[spn_hide_fields > Ctto :: Loading...]');
            $('#spn_hide_fields input[id^=inp_h_fld_]').each(function(){
                var _aFld=['CtrDate','CONTRATO_DE','TIPO_CONTRATO','CLIENTE_PROVEEDOR','MODIFICACION']; //Campos que sólo se deben cargar en Modificación 
                var _fld=(this.id).substr(10);
                var _id=$('[d6-field='+ _fld +']').attr('id');
                var _v=$(this).val();
                var __bLg=(_id=='inp_h_txt_qltc')?true:false; //Debug: para poder controlar la carga de algún campo en concreto
                d6.fmk.cLog('id: ' + this.id + ' / fld:' + _fld + ' / id frm: ' + _id + ' / val: ' + _v);
                if (_id!=undefined && $.inArray(_fld, _aFld)==-1) {
                    if (_v!='null') {
                        if (!(d6.fmk.Left(_id,12)=='ct_entr-emb-' || d6.fmk.Left(_id,17)=='ct_entr-fijacion-' || d6.fmk.Left(_id,7)=='ct_apl-')) { //Se cargan a continuación (Embarques / Fijación / Aplicaciones) 
                            d6.fmk.cLog('Carga valores BBDD > ' + _id +'[' + $('#'+_id).attr('type') + ']: ' + _v);
                            switch (_fld) {
                                case 'PRODUCTO_CERTIFICADO': //ButtonSet
                                    d6.fmk.setCheckboxSet('ct_pdcert',_v,',');
                                    $('#inp_h_txt_pdcert').val( d6.fmk.getCheckboxSet('ct_pdcert') );
                                    if (_v=='' || _v=='NO') {
                                        d6.fmk.setCheckBox('#ct_pdcert_NO',true);
                                        $('#inp_h_txt_pdcert').val('NO');
                                    } else {
                                        d6.fmk.setCheckBox('#ct_pdcert_NO',false);
                                    }
                                    break;
                                case 'CALIDAD-CLIENTE': //aquí no se carga el valor... 
                                    d6.fmk.setValue('ct_qltc',_v);
                                    $('#inp_h_txt_qltc').val(_v);
                                    break;
                                default:
                                    if ($('#'+_id).attr('type')=='checkbox') {
                                        d6.fmk.cLog('Carga valores BBDD > #' + _id + ': ' + _v );
                                        d6.fmk.setValue('#'+_id,(_v==='true')?true:false);        
                                    } else {
                                        if ($('#'+_id).attr('d6-fieldType')==='N') {
                                            _v=_v.replace('.',',');
                                        }
                                        if (__bLg) {
                                            d6.fmk.cLog('[LoadFlds] _id:'+ _id +' / _v:'+ _v);
                                        }
                                        d6.fmk.setValue('#'+_id,_v,true);    
                                    }
                            }
                        }
                    } else {
                        d6.fmk.setValue('#'+_id,''); 
                    }
                }
            });
            d6.fmk.cLog('[spn_hide_fields > Ctto :: End!]');  
            //Si hay intermediario, se activan las comisiones
            if ($('#ct_interm').attr('d6-defval')!='') {
                    d6.fmk.inpBoxDisabled('#ct_comint-valor', false);
                    d6.fmk.inpBoxDisabled('#ct_comint-udad', false);
                    //d6.fmk.cmbBoxDisabled('#ct_comint-udad', false);
            }
            //Si hay datos para FLETES (origen/destino), se carga y muestra la tabla asociada
            if($('#ct_fltogn').val()!=='' && $('#ct_fltdst').val()!=='') {
                showFletesInfo($('#ct_fltogn').val(), $('#ct_fltdst').val());
            } else { //Venimos de Grid de VENTAS/COMPRAS
                //Cargamos el Origen/Destino por defecto en función del ORIGIN
                LoadFletesOrigenDestino($('#inp_h_ogn').val());
            }
            //Si la condición de entrega es diferente de FOB, se cargan el Origen y Destino por Defecto para CAMIÓN
            if($('#ct_condent').val()!='FOB') {
                LoadCamionesOrigenDestino($('#inp_h_ogn').val());
            }
            //Carga inicial APLICACIONES
            //$('input[name^="ct_apl-ctto-1"],input[name^="ct_apl-cant-1"]').each(function(){
                for (var _ne=1; _ne<=4; _ne++) {
                    var _vCtto=$('#inp_h_fld_APLICACION_'+_ne+'_CONTRATO').val();
                    var _vCant=$('#inp_h_fld_APLICACION_'+_ne+'_CANTIDAD').val();
                    $('[d6-field=APLICACION_1_'+_ne+'_CONTRATO]').val((_vCtto=='null')?'':_vCtto);
                    $('[d6-field=APLICACION_1_'+_ne+'_CONTRATO]').attr('d6-defVal',(_vCtto=='null')?'':_vCtto);
                    $('[d6-field=APLICACION_1_'+_ne+'_CANTIDAD]').val((_vCant=='null')?'':_vCant);
                    $('[d6-field=APLICACION_1_'+_ne+'_CANTIDAD]').attr('d6-defVal',(_vCant=='null')?'':_vCant);
                }
            //});
            //Carga AAAAMM para Entregas / Embarques (desde mes anterior al actual y todo el año siguiente)
            // Embarque
            //var lstOpts1=($('#inp_h_sdte').val()!='')?getAAAAMMOpts(2,$('#inp_h_sdte').val()):getAAAAMMOpts(2); //Si hay fecha de Embarque seleccionada, carga desde la fecha de Embarque hasta año actual + 1
            //var lstOpts=getAAAAMMOpts(2);
            var vOpts;
            d6.fmk.cLog('[BtnSeleccion] ct_entr-emb-');
            $('select[name^="ct_entr-emb-"]').each(function(){
                $('#'+this.id).removeClass('d6-modified');
                var _v;
                if (g_Grid=='cttos') {
                    _v=$('#inp_h_fld_' + $(this).attr('d6-field')).val();
                    _v=(_v=='null')?'':_v;
                } else {
                     if (d6.fmk.Right(this.id,2)=='-1') { //Sólo se tendrá en cuenta para el primer elemento, al venir de una Venta/Compra
                        _v=$('#inp_h_sdte').val();
                    } else {
                        _v='';
                    }
                }
                d6.fmk.cLog('[g_Grid: ' + g_Grid + ']' + $(this).id + ': ' + _v);
                $('#'+this.id).removeClass('d6-modified');                
                //Si hay un valor ya seleccionado...
                if (_v!='') {
                    vOpts=(getAAAAMMOpts(2,_v)).split('|');
                } else {
                    vOpts=(getAAAAMMOpts(2)).split('|');
                }
                /* //Valía mientras sólo estábamos en pruebas teniendo en cuenta el primer valor para embarque...
                if (($('#inp_h_sdte').val()!='')&&(d6.fmk.Right(this.id,2)=='-1')) { //Si hay un valor de Fecha de Embarque seleccionado...
                    d6.fmk.cLog('[BtnSeleccion] > '+this.id+' > valor fecha embarque: '+$('#inp_h_sdte').val());
                } 
                
                if (d6.fmk.Right(this.id,2)=='-1') {
                    vOpts=lstOpts1.split('|');
                } else {
                    vOpts=lstOpts.split('|');
                }
                */
                d6.fmk.loadCBoxArray('#'+this.id, vOpts, {
                    select: function(_event, _ui) { 
                        //Verificación de que la fecha de FIJACIÓN sea superior a la de EMBARQUE
                        chkEmbarqueFijacion(this,'e','select');
                        //Cambio de color
                        stateModifiedSelect(this);                
                    }
                }, _v, true); 
                //Control para cuando se escribe directamente en el 'input'
                $('#'+this.id).siblings().find('input').change(function(){
                    //Verificación de que la fecha de FIJACIÓN sea superior a la de EMBARQUE
                    chkEmbarqueFijacion($(this).parent().siblings()[0],'e','change');
                    //Cambio de color
                    stateModifiedSelect($(this).parent().siblings()[0],true);                
                });   
            });
            //Suma de Totales (ENTREGAS/EMBARQUES ~ APLICACIONES)
            sumCantidadesEntregas();
            for(var _i=1; _i<=13; _i++) {
                sumCantidadesAplicacion(_i);
            }

            //Tipo de precio > si es 2 (Diferencial) hay que marcar Fijación Mercado e informar este campo
            /*
            d6.fmk.cLog('[BtnSeleccion] > PriceType='+$('#inp_h_prctpe').val());
            if (g_Grid!='cttos' && $('#inp_h_prctpe').val()=='2') {
                d6.fmk.setCheckBox('#ct_fijmdo', true);
                for (n=1; n<=13; n++) {
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+n, false); 
                }    
            }  
            d6.fmk.cLog('[BtnSeleccion] #inp_h_fld_FIJACION_MERCADO: '+ $('#inp_h_fld_FIJACION_MERCADO').val());
            d6.fmk.cLog('[BtnSeleccion] ct_entr-fijacion-');
            */
            // Fijación
            $('select[name^="ct_entr-fijacion-"]').each(function(){
                var _urlF;
                var _vdF;
                var _v;
                var _bFM;

                if (g_Grid=='cttos'){
                    //Se habilita o deshabilita en función del valor de FIJACION MERCADO
                    _bFM=($('#inp_h_fld_FIJACION_MERCADO').val()==='true')?true:false;
                    _v=$('#inp_h_fld_' + $(this).attr('d6-field')).val();
                    //Si es COMPRA, sólo habilita la primera
                    if (!_bFM) { //Deshabilitamos todos
                        d6.fmk.cmbBoxDisabled('#'+this.id, true);     
                    } else {
                        if ($('#ct_contratode').val()=='C') { //Habilitamos sólo el primero
                            if (d6.fmk.Right(this.id,2)=='-1') {
                                d6.fmk.cmbBoxDisabled('#'+this.id, false);
                            } else {
                                d6.fmk.cmbBoxDisabled('#'+this.id, true);
                            }
                        } else {
                            d6.fmk.cmbBoxDisabled('#'+this.id, false);
                        }
                    }
                } else {
                    //Se habilita o deshabilita en función del valor de FIJACION MERCADO
                    _bFM=$('#ct_fijmdo').is(':checked');
                    if (d6.fmk.Right(this.id,2)=='-1') { //Sólo se tendrá en cuenta para el primer elemento, al venir de una Venta/Compra
                        d6.fmk.cmbBoxDisabled('#'+this.id, !_bFM);
                        _v=$('#inp_h_ftm').val();
                    } else {
                        if ($('#ct_contratode').val()=='C') { 
                            d6.fmk.cmbBoxDisabled('#'+this.id, true);
                        } else {
                            d6.fmk.cmbBoxDisabled('#'+this.id, !_bFM);
                        }
                        _v='';
                    }
                }
                d6.fmk.cLog($(this).id + ': ' + _v);
                $('#'+this.id).removeClass('d6-modified');
                if (($('#inp_h_prctpe').val()=='2')&&(_v!='')&&(_v!='null')) { //Si el Tipo de precio es 2 (Dif.) cargamos la fecha de fijación en el primer elemento
                    //Carga del desplegable de Fijación (ct_entr-fijacion-1)
                    d6.fmk.cLog('[BtnSeleccion] > PriceType=2 > Fecha CTR: '+ $('#inp_h_ftm').val() + ' / Fecha Fijación: '+ _v + ' / Mercado: ' + $('#inp_h_stkexch').val());
                    _urlF='engine.asp?a=rcbff&m='+ $('#inp_h_stkexch').val() + '&am=' + _v; //getAAAAMM($('#inp_h_fecha').val());
                    _vdF=Number(_v); //Number($('#inp_h_ftm').val());
                } else {
                    _urlF='engine.asp?a=rcbff&m='+ _mdo;
                    _vdF='';
                }
                d6.fmk.loadCBox('#'+this.id, _urlF, _vdF, {
                    select: function(_event, _ui) { 
                        //Verificación de que la fecha de FIJACIÓN sea superior a la de EMBARQUE
                        chkEmbarqueFijacion(this,'f','select');
                        //Cambio de color
                        stateModifiedSelect(this);                
                    }
                }, false, '', '', true);     
                //Control para cuando se escribe directamente en el 'input'
                $('#'+this.id).siblings().find('input').change(function(){
                    //Verificación de que la fecha de FIJACIÓN sea superior a la de EMBARQUE
                    chkEmbarqueFijacion($(this).parent().siblings()[0],'f','change');
                    //Cambio de color
                    stateModifiedSelect($(this).parent().siblings()[0],true);                
                });   
            });
            //Carga inicial ARBITRAJE
            $('#inp_h_txt_arb').val( $('#ct_arb').parent().find('input').val() );
            //Se deja en blanco el campo del total de KG de Entregas ...
            //$('#ct_entr-canttot').val('');    
            //Se borra si hay mensaje sobre el total de entregas
            $('#spn_chk_cantkgs').hide();
            //
            if ( $('#chk_Mod').is(':checked') ) {
                if ($('[d6-field=ENTREGA_UNICA]').val()==='false') { $('#spn_chk_cantkgs').text('Contrato con varias ENTREGAS').show(); } 
                $('#tsk_ctto div.tit').text('MODIFICACIÓN DE CONTRATO');
                //Botones
                $('#ct_btn_generar-ctto .ui-button-text').text('Modificar Contrato');
                //"Deshabilita" las ENTREGAS/EMBARQUE del 2 en adelante junto a sus APLICACIONES
                for (var _ne=2; _ne<=13; _ne++) {
                    d6.fmk.inpBoxDisabled('#ct_entr-cant-'+_ne, true);
                    d6.fmk.cmbBoxDisabled('#ct_entr-emb-'+_ne, true);
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+_ne, true);
                    $('#ct_shapl-'+_ne).hide();
                    for (var _na=1; _na<=4; _na++) {
                        d6.fmk.inpBoxDisabled('#ct_apl-ctto-'+_ne+'-'+_na, true);
                        d6.fmk.inpBoxDisabled('#ct_apl-cant-'+_ne+'-'+_na, true);
                    }
                }
            } else { 
                $('#tsk_ctto div.tit').text('NUEVO CONTRATO');
                //Número de CONTRATO al no ser modificación
                //setNUMCTTO();  //Deshabilitado porque cuando acaba de cargar los CLIENTES/PROVEEDORES ya lo lanza...
                $('#ct_nummod').val('00');
                //Fecha
                $('#ct_fecha').val(convertDate(new Date()));
                //Botones
                $('#ct_btn_generar-ctto .ui-button-text').text('Nuevo Contrato');
                //"Habilita" las ENTREGAS/EMBARQUE del 2 en adelante junto a sus APLICACIONES
                for (var _ne=2; _ne<=13; _ne++) {
                    d6.fmk.inpBoxDisabled('#ct_entr-cant-'+_ne, false);
                    d6.fmk.cmbBoxDisabled('#ct_entr-emb-'+_ne, false);
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+_ne, ($('#ct_fijmdo').val()=='True')?false:true);
                    $('#ct_shapl-'+_ne).show();
                    for (var _na=1; _na<=4; _na++) {
                        d6.fmk.inpBoxDisabled('#ct_apl-ctto-'+_ne+'-'+_na, false);
                        d6.fmk.inpBoxDisabled('#ct_apl-cant-'+_ne+'-'+_na, false);
                    }
                }                
            }
            //CALIDAD-CLIENTE: Incorporamos el valor cargado de la BBDD en el inputbox asociado
            $('#ct_qltc').parent().find('input').val($('#inp_h_txt_qltc').val());
            //Ponermos a NO por defecto en el PRODUCTO CERTIFICADO
            //if(d6.fmk.getCheckboxSet('ct_pdcert')=='') {
            //    d6.fmk.setCheckBox('#ct_pdcert_NO',true);
            //}            
            //Número de contrato
            if(!$('#chk_Mod').is(':checked')) setNUMCTTO();
        });
    /*   ######################  FIN: BtnSelección ######################   */

    /*-- Activamos los 'autocomplete' con desplegable --*/
    $('#slc_cia').combobox({
        select: function(event, ui){
            $('#inp_h_cia').val($(this).val());
        }
    });
    $('#slc_ctto').combobox({
        select: function(event, ui){
            //d6.fmk.cLog('text: ' + this[this.selectedIndex].text + '\nvalue: ' + this.value);
            switch ($('#slc_ctto :selected').attr('value')){
                case 'T':
                    $('label[for="slc_clpr"]').text('Cliente/Proveedor:');
                    $('#jtable_vc').find('.jtable-title-text').text('Listado de Ventas/Compras'); 
                    $('#btn_vvc').find('.ui-button-text').text('Ver Ventas/Compras (AS/400)');
                    $('#btn_vvc').button('option','disabled',false);
                    $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos');
                    $('#btn_cttos').find('.ui-button-text').text('Ver Contratos');    
                    $($('#jtable_vc th')[3]).find('span').text('Ent./Emb.');
                    $($('#jtable_vc th')[7]).find('span').text('Cliente/Proveedor');
                    $($('#jtable_cttos th')[4]).find('span').text('Ent./Emb.');
                    $($('#jtable_cttos th')[8]).find('span').text('Cliente/Proveedor');                    
                    // Borrar contenido jtable_vc / jtable_vvc
                    jtableClear('#jtable_vc');
                    jtableClear('#jtable_vvc');
                    jtableClear('#jtable_cttos');
                    break;
                case 'C':
                    $('label[for="slc_clpr"]').text('Proveedor:');
                    $('#jtable_vc').find('.jtable-title-text').text('Listado de Compras'); 
                    $('#btn_vvc').find('.ui-button-text').text('Ver Compras (AS/400)');
                    $('#btn_vvc').button('option','disabled',false);
                    $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos (Compras)');
                    $('#btn_cttos').find('.ui-button-text').text('Ver Contratos Compras');    
                    $($('#jtable_vc th')[3]).find('span').text('Embarque');
                    $($('#jtable_vc th')[7]).find('span').text('Proveedor');
                    $($('#jtable_cttos th')[4]).find('span').text('Embarque');
                    $($('#jtable_cttos th')[8]).find('span').text('Proveedor');                    
                    // Borrar contenido jtable_vc / jtable_vvc
                    jtableClear('#jtable_vc');
                    jtableClear('#jtable_vvc');
                    jtableClear('#jtable_cttos');
                    break;
                case 'V':
                    $('label[for="slc_clpr"]').text('Cliente:');
                    $('#jtable_vc').find('.jtable-title-text').text('Listado de Ventas'); 
                    $('#btn_vvc').find('.ui-button-text').text('Ver Ventas (AS/400)');
                    $('#btn_vvc').button('option','disabled',false);
                    $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos (Ventas)');
                    $('#btn_cttos').find('.ui-button-text').text('Ver Contratos Ventas');   
                    $($('#jtable_vc th')[3]).find('span').text('Entrega');
                    $($('#jtable_vc th')[7]).find('span').text('Cliente');
                    $($('#jtable_cttos th')[4]).find('span').text('Entrega');
                    $($('#jtable_cttos th')[8]).find('span').text('Cliente');                    
                    // Borrar contenido jtable_vc / jtable_vvc
                    jtableClear('#jtable_vc');
                    jtableClear('#jtable_vvc');
                    jtableClear('#jtable_cttos');
                    break;
                case 'O':
                    $('label[for="slc_clpr"]').text('Cliente:');
                    $('#jtable_vc').find('.jtable-title-text').text('Listado de Ventas'); 
                    $('#btn_vvc').find('.ui-button-text').text('----');
                    $('#btn_vvc').button('option','disabled',true);
                    $('#jtable_cttos').find('.jtable-title-text').text('Listado de Contratos (Ofertas)');
                    $('#btn_cttos').find('.ui-button-text').text('Ver Contratos Ofertas'); 
                    $($('#jtable_vc th')[3]).find('span').text('Entrega');
                    $($('#jtable_vc th')[7]).find('span').text('Cliente');
                    $($('#jtable_cttos th')[4]).find('span').text('Entrega');
                    $($('#jtable_cttos th')[8]).find('span').text('Cliente');                    
                    // Borrar contenido jtable_vc / jtable_vvc
                    jtableClear('#jtable_vc');
                    jtableClear('#jtable_vvc');
                    jtableClear('#jtable_cttos');
                    $('#jtable_vc').hide();
                    $('#jtable_cttos').show();                    
            }
            d6.fmk.loadCBox('#slc_clpr', 'engine.asp?a=rcbcp&t='+ ((this.value=='T')?'T':((this.value=='V'||this.value=='O')?'D':'K')) + '&c=Y', '', {});        
        }
    });
    
    d6.fmk.loadCBox('#slc_clpr', 'engine.asp?a=rcbcp&t=D&c=Y', '', {}); //Empezamos con contratos de Venta, por eso elegimos directamente Clientes (t=D)
    d6.fmk.loadCBox('#slc_qgr', 'engine.asp?a=rcbqg&c=Y', '', {
        select: function(event, ui){
            d6.fmk.loadCBox('#slc_ogn', 'engine.asp?a=rcbor&qg=' + this.value, '', {});
            d6.fmk.loadCBox('#slc_qlt', 'engine.asp?a=rcbql&qg=' + this.value, '', {});
    }});
    
    d6.fmk.loadCBox('#slc_ogn', 'engine.asp?a=rcbor&c=Y', '', {
        select: function(event, ui){
            d6.fmk.loadCBox('#slc_qlt', 'engine.asp?a=rcbql&o=' + this.value, '', {});        
    }});
    
    d6.fmk.loadCBox('#slc_qlt', 'engine.asp?a=rcbql&c=Y', '', {});
    $('#slc_nregs').buttonset().click(function () {
        d6.fmk.cLog('Valor: ' + $('#slc_nregs :radio:checked').attr('id') + ' / ' + $('#slc_nregs :radio:checked').attr('value') );
    });
    
    //Por defecto, deshabilitamos "Modificación", ya que sólo se puede haer cuando se haya seleccionado un registro del GRID de CONTRATO
    d6.fmk.chkBoxDisabled('#chk_Mod',true);

    /*
    *
    * CONTRATO
    *
    */
    var _mdo = ($('#ct_moneda').val()=='EUR')?'K':'N';
    
    /* Menu bloques */
    mnuScrollBlock('#lnk_clpr', '#ctto_clipro');
    mnuScrollBlock('#lnk_prd', '#ctto_prod');
    mnuScrollBlock('#lnk_cndent', '#ctto_condentr');
    mnuScrollBlock('#lnk_cnt', '#ctto_cant');
    mnuScrollBlock('#lnk_prc', '#ctto_precio');
    mnuScrollBlock('#lnk_ent', '#ctto_entr');
    mnuScrollBlock('#lnk_apl', '#ctto_apl');
    mnuScrollBlock('#lnk_otrcnd', '#ctto_otrcond');
    mnuScrollBlock('#lnk_doc', '#ctto_doc');
    mnuScrollBlock('#lnk_cndesp', '#ctto_condesp');
    mnuScrollBlock('#lnk_gnr', '#ctto_btns');

    //Número modificación
    d6.fmk.customWidthINPUT('#ct_nummod', '20px'); 

    /*-- CLIENTES / PROVEEDORES --*/
    d6.fmk.customWidthINPUT('#ct_contrato', '85px'); 
    d6.fmk.customWidthINPUT('#ct_fecha', '85px'); 
    //Contrato
    $('#ct_contratode').siblings().find('input').on('focus',function(){
        g_cd_prev=$('#ct_contratode').val();
    });
    $('#ct_contratode').combobox({
        select: function(_event, _ui){
            $('label[for="ct_clpr"]').text( $(this).val()=="C" ? "Proveedor: " : "Cliente: " );
            $('#cond-esp-txt').text( $(this).val()=="C" ? "Proveedor" : "Cliente" );
            //Si es DESCAFEINADO / WATER TREATED (27.06.2016)
            if ($('#ct_tipo-contrato').val()=='CODWT') {
                //Cargamos Clientes / Proveedores sólo para 3925800 y 1003400
                d6.fmk.loadCBox('#ct_clpr', 'engine.asp?a=rcbcp&t=' + ( $(this).val()=="C" ? "K" : "D" ) + '&DWT=Y' , '', {}, false, '#ct_cod-clpr', 'execCLPRLoaded();');
            } else {
                if (g_cd_prev!='O') { //Sólo se refrescan si venimos de VENTA o COMPRA                
                    //Cargamos Clientes o Proveedores según VENTA / COMPRA
                    d6.fmk.loadCBox('#ct_clpr', 'engine.asp?a=rcbcp&t=' + ( $(this).val()=="C" ? "K" : "D" ) , '', {}, false, '#ct_cod-clpr', 'execCLPRLoaded();');
                }
            }
            if($(this).val()=="C") {
                //Cambio de titulo del apartado
                $('#ctto_clipro div').text('PROVEEDORES');
                $('#ctto_entr div.stit').text('EMBARQUES');
                //Cambio etiqueta para Referencia Cliente/Proveedor
                $('label[for=ct_refclipro]').text('Ref. Proveedor:');
                //Deshabilita todas las ENTREGAS menos una por haber seleccionado COMPRA
                for (n=2; n<=13; n++) {
                    d6.fmk.inpBoxDisabled('#ct_entr-cant-'+n, true);
                    d6.fmk.cmbBoxDisabled('#ct_entr-emb-'+n, true);
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+n, true);
                    sumCantidadesEntregas();
                }
            } else {
                //Cambio de titulo del apartado
                $('#ctto_clipro div').text('CLIENTES');
                $('#ctto_entr div.stit').text('ENTREGAS');
                //Cambio etiqueta para Referencia Cliente/Proveedor
                $('label[for=ct_refclipro]').text('Ref. Cliente:')
                //Habilita todas las ENTREGAS 
                for (n=2; n<=13; n++) {
                    d6.fmk.inpBoxDisabled('#ct_entr-cant-'+n, false);
                    d6.fmk.cmbBoxDisabled('#ct_entr-emb-'+n, false);
                    if ($('#ct_fijmdo').prop('checked')) { //Se habilitan siempre y cuando la Fijación Moneda esté a Sí
                        d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-'+n, false); 
                    } 
                    sumCantidadesEntregas();
                }
            }
            //Cambio de color
            stateModifiedSelect(this);
            //Número Contrato
            if (!($('#chk_Mod').is(':checked'))) {            
                setNUMCTTO();
            }
        }
    }); 
    //Tipo de contrato
    d6.fmk.customWidthSELECT('#ct_tipo-contrato','250px'); //Cambiamos ancho de Tipo de Contrato
    $('#ct_tipo-contrato').removeClass('d6-modified').combobox({
        select: function(_event, _ui){
            loadEntidad(this);
            //Cambio de color
            stateModifiedSelect(this);
            //Número de contrato
            if (!($('#chk_Mod').is(':checked'))) {
                setNUMCTTO();
            }
            //Si es BRIC, siempre SIN DESPACHAR (23.06.2016)
            if ($(this).val()=='ZZ') {
                d6.fmk.chkBoxDisabled('#ct_dsp',true,false);
            } else {
                d6.fmk.chkBoxDisabled('#ct_dsp',false);
            }
            //Si es DESCAFEINADO / WATER TREATED (27.06.2016)
            if ($(this).val()=='CODWT') {
                //Cargamos Clientes / Proveedores sólo para 3925800 y 1003400
                d6.fmk.loadCBox('#ct_clpr', 'engine.asp?a=rcbcp&t=' + ( $('#ct_contratode').val()=="C" ? "K" : "D" ) + '&DWT=Y' , '', {}, false, '#ct_cod-clpr', 'execCLPRLoaded();');
            } else {
                //Cargamos Clientes o Proveedores según VENTA / COMPRA
                d6.fmk.loadCBox('#ct_clpr', 'engine.asp?a=rcbcp&t=' + ( $('#ct_contratode').val()=="C" ? "K" : "D" ) , '', {}, false, '#ct_cod-clpr', 'execCLPRLoaded();');
            }

        }
    }); 
    //Moneda
    $('#ct_moneda').removeClass('d6-modified').combobox({
        select: function(_event, _ui){
            //loader...
            $('#ldr').show();
            d6.fmk.cLog('[#ct_moneda] mdo: '+ $('#' + this.id + ' option:selected').val());
            var _mdo = ($(this).val()=='EUR')?'K':'N';
            /*
            $('select[name^="ct_entr-fijacion-"]').each(function(){
                $('#'+this.id).find('option').remove().end(); //Borramos las opciones actuales
                d6.fmk.loadCBox('#'+this.id, 'engine.asp?a=rcbff&m='+ _mdo, '', {}, false, '', '', true);     
            });
            */
            //Cambio de color
            stateModifiedSelect(this);
            //Cambio en unidades de PRECIO
            var _Udad=(($('#ct_moneda').val()=='EUR')?'EUR/MT':'USD/MT');
            loadCBoxUnidades('fijo', _mdo, _Udad);
            $('#ct_comint-udad').val( $(this).val() + '/MT');
            $('#ct_otrcom-udad').val( $(this).val() + '/MT');
            //loadCBoxUnidades('comint',_mdo);
            //loadCBoxUnidades('otrcom',_mdo);     
            //Número de contrato
            setNUMCTTO();  
            //Recálculo precio condiciones entrega
            //if (g_TblPrecios) {
                //calculatePrecioCE(_Udad);
                if ($(this).siblings().find('input').val()!=$(this).val()) { //Si ha cambiado el valor...
                    chgBtnCalcular();
                }
            //}
            //Cambiamos moneda para Acuerdos/Margen
            $('#ct_acuerdos-udad').val( $(this).val() + '/MT');
            $('#ct_margen-udad').val( $(this).val() + '/MT');
            //Recuperamos valores de Acuerdos/Margen
            loadAcuerdosMargen($('#ct_qgr').val(), $('#ct_ogn').val(), $(this).val());
        }
    }); 
    d6.fmk.customWidthSELECT('#ct_clpr','350px'); //Cambiamos ancho de Cliente/Proveedor

    /*-- PRODUCTO --*/
    
    $('#ct_pdcert_NO').click(function(){
        if ($(this).is(':checked')) {
            d6.fmk.setCheckboxSet('ct_pdcert','');
            $('[id^=ct_pdcert_]').removeClass('ui-state-default').addClass('ui-state-default');
            $('#inp_h_txt_pdcert').val('NO');
        }
    });
    

    /*-- CONDICIONES ENTREGA --*/
    //Despachado
    $('#ct_dsp').click(function(){ //Para gestionar el número de contrato porque tiene que ver con si está o no DESPACHADO
        if (!($('#chk_Mod').is(':checked'))) {
            setNUMCTTO();
        }
        chgBtnCalcular();
    });
    $('label[for="ct_dsp"]').click(function(){
        if ($(this).text()=='No') {
            d6.fmk.chkBoxDisabled('#ct_camrtc',false);
            d6.fmk.chkBoxDisabled('#ct_plt',false);
        } else {
            d6.fmk.chkBoxDisabled('#ct_camrtc',true);
            d6.fmk.chkBoxDisabled('#ct_plt',true);
        }
    });    
    //Marco Legal
    $('#ct_mrclegal').removeClass('d6-modified');
    d6.fmk.customWidthSELECT('#ct_mrclegal','100px'); 
    d6.fmk.loadCBox('#ct_mrclegal', 'engine.asp?a=rcbml', '', {
        select: function(event, ui){
            //Cambio de color
            stateModifiedSelect(this);        
        }
        }, false, '', '');
    
    //>> Fletes / Camión -- Inicio 
    //-- Flete origen (Borrar)
    $('#ico_tsh_fltogn').css('cursor','pointer').click(function(){ 
        d6.fmk.setValue('#ct_fltogn',''); //Pone el valor en blanco
        if($('#ct_fltogn').val()==='' || $('#ct_fltdst').val()==='') {
            $('#tbl_info_flt').hide();
            $('#spn_info_flt_nodata').hide();
        }
    });
    $('#ct_fltogn').removeClass('d6-modified');
    d6.fmk.loadCBox('#ct_fltogn', 'engine.asp?a=rcbfo', '', {
        select: function(event, ui){
                d6.fmk.loadCBox('#ct_fltdst', 'engine.asp?a=rcbfd&o='+$(this).val(), '', {
                    select: function(event, ui){
                        if($('#ct_fltogn').val()!=='') {
                            showFletesInfo($('#ct_fltogn').val(), $(this).val());
                        }
                        //Cambio de color
                        stateModifiedSelect(this);            
                    }
                }, false);             
            //$('#spn_info_cam_nodata, #spn_info_cam').hide();
            /*
            if($('#ct_fltdst').val()!=='') {
                showFletesInfo($(this).val(), $('#ct_fltdst').val());
            }
            */
            $('#tbl_info_flt').hide();
            //Cambio de color
            stateModifiedSelect(this);   
            //Refresh d6-field Condition
            refreshCondition();
        }
    }, false);  
    //-- Flete destino
    $('#ico_tsh_fltdst').css('cursor','pointer').click(function(){
        d6.fmk.setValue('#ct_fltdst',''); //Pone el valor en blanco
        if($('#ct_fltogn').val()==='' || $('#ct_fltdst').val()==='') {
            $('#tbl_info_flt').hide();
            $('#spn_info_flt_nodata').hide();
        }
    });
    $('#ct_fltdst').removeClass('d6-modified');
    d6.fmk.loadCBox('#ct_fltdst', 'engine.asp?a=rcbfd', '', {
        select: function(event, ui){
            //$('#spn_info_cam_nodata, #spn_info_cam').hide();
            if($('#ct_fltogn').val()!=='') {
                showFletesInfo($('#ct_fltogn').val(), $(this).val());
            }
            //Cambio de color
            stateModifiedSelect(this);            
        }
    }, false); 
    //-- Camión origen
    $('#ico_tsh_camogn').css('cursor','pointer').click(function(){
        d6.fmk.setValue('#ct_camogn',''); //Pone el valor en blanco
        if($('#ct_camogn').val()==='' || $('#ct_camdst').val()==='') {
            $('#spn_info_cam').hide();
            $('#spn_info_cam_nodata').hide();
        }
    });    
    $('#ct_camogn').removeClass('d6-modified');
    d6.fmk.loadCBox('#ct_camogn', 'engine.asp?a=rcbco', '', {
        select: function(event, ui){
            d6.fmk.loadCBox('#ct_camdst', 'engine.asp?a=rcbcd&o='+$(this).val(), '', {        
                select: function(event, ui){
                    //$('#spn_info_flt_nodata, #spn_info_flt').hide();
                    if($('#ct_camogn').val()!=='') {
                        showCamionesInfo($('#ct_camogn').val(), $(this).val());
                    }
                    //Cambio de color
                    stateModifiedSelect(this);            
                }  
            }, false);                         
            //$('#spn_info_flt_nodata, #spn_info_flt').hide();
            /*
            if($('#ct_camdst').val()!=='') {
                showCamionesInfo($(this).val(), $('#ct_camdst').val());
            }
            */
            //Cambio de color
            stateModifiedSelect(this);  
            //Refresh d6-field Condition
            refreshCondition();
        }        
    }, false); 
    //-- Camión destino
    $('#ico_tsh_camdst').css('cursor','pointer').click(function(){
        d6.fmk.setValue('#ct_camdst',''); //Pone el valor en blanco
        if($('#ct_camogn').val()==='' || $('#ct_camdst').val()==='')  {
            $('#spn_info_cam').hide();
            $('#spn_info_cam_nodata').hide();
        }
    });    
    $('#ct_camdst').removeClass('d6-modified');
    d6.fmk.loadCBox('#ct_camdst', 'engine.asp?a=rcbcd', '', {        
        select: function(event, ui){
            //$('#spn_info_flt_nodata, #spn_info_flt').hide();
            if($('#ct_camogn').val()!=='') {
                showCamionesInfo($('#ct_camogn').val(), $(this).val());
            }
            //Cambio de color
            stateModifiedSelect(this);            
        }  
    }, false); 

    d6.fmk.customWidthINPUT('#ct_dirent', '300px'); 
    //>> Fletes / Camiones -- Fin 
    
    //Paletizado
    $('#ct_plt').click(function(){
        if (!($(this).is(':checked')) && $('#ct_camrtc').is(':checked')) {
            d6.fmk.setCheckBox('#ct_camrtc',false);
        }
        chgBtnCalcular();
    });
    //Retractilado
    $('#ct_camrtc').click(function(){
        if (($(this).is(':checked'))) {
            d6.fmk.setCheckBox('#ct_plt',true);
        }
        chgBtnCalcular();
    });

    //En la carga inicial, como que condición entrega vale "FOB", se indica que hay SEGURO (ya que si la condición de entrega contiene una 'F', hay SEGURO)
    //20160527: Si la condición es FOB o C&F no debe dejar marcar la opción de seguro, por lo que se deshabilita que inicialmente se marque seguro para FOB.
    //d6.fmk.setCheckBox('#ct_fltsgr', true);
    //d6.fmk.chkBoxDisabled('#ct_fltsgr', true);

    //Aprovación muestra
    $('#ct_aprmtra').click(function(){ //Sólo si está a Sí la Aprovación de muestra se puede activar el botón de No Aprovación No Venta/Contrato
        if ($('#' + this.id).prop('checked')) { d6.fmk.chkBoxDisabled('#ct_noaprnv',false); d6.fmk.inpBoxDisabled('#ct_dirent', false); } else { d6.fmk.chkBoxDisabled('#ct_noaprnv',true); d6.fmk.inpBoxDisabled('#ct_dirent', true); }
    });
    //Peso
    $('#ct_peso').buttonset().click(function () {
        d6.fmk.cLog('Peso: ' + $('#ct_peso :radio:checked').attr('id') + ' / ' + $('#ct_peso :radio:checked').attr('value') );
        //Carga de d6-field
        $('#inp_h_txt_peso').val( d6.fmk.getRadio('#ct_peso') );  //$('#ct_peso :radio:checked').attr('value') 
        //Cargamos el CondCode en función de la condición de entrega y el peso
        loadCondCode();
        //Refresh d6-field Condition
        refreshCondition();
    });

    /*-- CANTIDAD --*/
    d6.fmk.customWidthINPUT('#ct_cant','75px');
    d6.fmk.customWidthINPUT('#ct_kgs','75px');
    d6.fmk.customWidthSELECT('#ct_tipopaq','85px');
    d6.fmk.customWidthINPUT('#ct_totkgs','75px');
    d6.fmk.customWidthINPUT('#ct_kgstipo','75px');
    d6.fmk.customWidthINPUT('#ct_tipopaq-udades','75px');
    $('#ct_cant').keyup(function(){
        if (chkNumeric('#ct_cant')) { //Verifica si el valor es numérico para tener la multiplicación de ambos y así poder validar en las Entregas
            if ($('#ct_kgs').val()!=='') {
                $('#ct_totkgs').val( d6.fmk.number_format($('#ct_cant').val() * $('#ct_kgs').val(),0,',','.') );
                if (chkNumeric('#ct_kgstipo')) {
                    if (($('#ct_totkgs').val()).replace('.','').replace(',','.')!=='' && $('#ct_kgstipo').val()!=='0') {
                        $('#ct_tipopaq-udades').val( d6.fmk.number_format( ($('#ct_totkgs').val()).replace('.','').replace(',','.') / $('#ct_kgstipo').val(),2,',','.') );
                    }
                }
                sumCantidadesEntregas();
                //ctrlTotalKgs();
                for (var _i = 1; _i <= 13; _i++) {
                    ctrlTotalAplicacion(_i);
                }
            }
        }
    });
    //Tipo paquete
    $('#ct_tipopaq').removeClass('d6-modified');
    $('#ct_tipopaq').combobox({
        select: function(){
            $('#inp_h_txt_tipopaq').val( $('#'+this.id+' :selected').text() ); 
            d6.fmk.cLog('ct_tipopaq selected!');
            if ( $('#'+this.id+' :selected').val()=='Bags') { //Si se selecciona Big Bags, tiene que ser PALETIZADO.
                d6.fmk.setCheckBox('#ct_plt',true);
            } else {
                d6.fmk.setCheckBox('#ct_plt',false);
            }
            //Cambio de color
            stateModifiedSelect(this);            
        }
    });
    $('#ct_kgs').keyup(function(){
        if (chkNumeric('#ct_kgs')) {
            if ($('#ct_cant').val()!=='') {
                $('#ct_totkgs').val( d6.fmk.number_format($('#ct_cant').val() * $('#ct_kgs').val(),0,',','.') );
                if (chkNumeric('#ct_kgstipo')) {
                    if (($('#ct_totkgs').val()).replace('.','').replace(',','.')!=='' && $('#ct_kgstipo').val()!=='0') {
                        $('#ct_tipopaq-udades').val( d6.fmk.number_format( ($('#ct_totkgs').val()).replace('.','').replace(',','.') / $('#ct_kgstipo').val(),2,',','.') );
                    }
                }
                sumCantidadesEntregas();
                //ctrlTotalKgs();   
                for (var _i = 1; _i <= 13; _i++) {
                    ctrlTotalAplicacion(_i);
                }
            }
        }
    });
    $('#ct_kgstipo').keyup(function(){
        if (chkNumeric('#ct_kgstipo')) {
            if (($('#ct_totkgs').val()).replace('.','').replace(',','.')!=='' && $('#ct_kgstipo').val()!=='0') {
                $('#ct_tipopaq-udades').val( d6.fmk.number_format( ($('#ct_totkgs').val()).replace('.','').replace(',','.') / $('#ct_kgstipo').val(),2,',','.') );
            }
        }
    });
    /*-- PRECIO --*/
    var pVal_mdo_valor;
    d6.fmk.customWidthINPUT('#ct_mdo-valor', '75px'); 
    $('#ct_mdo-valor').keyup(function(){ chkNumeric('#' + this.id) });
    $('#ct_mdo-valor').focus(function(){
        pVal_mdo_valor=$(this).val();
    }).change(function(){ //d6-field para NetStockExch
        var _m='';
        var _v=($(this).val()).replace(',','.');
        if (_v>500) { _m='K'; } //d6.fmk.setValue('#ct_moneda','USD'); }
        if (_v<=500) { _m='N'; } //d6.fmk.setValue('#ct_moneda','EUR'); }
        if ($(this).val()==undefined || $(this).val()=='') { _m=''; } //d6.fmk.setValue('#ct_moneda','EUR'); }
        changeMdoStckExch(_m);
        $('#ct_mdo-udad').val( ((_m=='N')?'US cts/lb':'USD/MT') );
        //loadCBoxUnidades('mdo',_m);
        //Recálculo de precio condiciones entrega
        //if (g_TblPrecios) {
            //calculatePrecioCE();
            if (pVal_mdo_valor!=$(this).val()) { //Si ha cambiado el valor...
                chgBtnCalcular();
            }
        //}
    });
    d6.fmk.customWidthINPUT('#ct_mdo-stckexch', '25px'); 
    d6.fmk.customWidthINPUT('#ct_mdo-udad', '75px'); 
    d6.fmk.customWidthINPUT('#ct_rate-valor', '75px'); 
    var pVal_rate_valor;
    $('#ct_rate-valor').keyup(function(){ chkNumeric('#' + this.id); });
    $('#ct_rate-valor').focus(function(){
        pVal_rate_valor=$(this).val();
    }).change(function(){
        var _Rate;
        var _Acuerdos;
        var _Margen;
        var _mda;
        //Comprobación de si es 0...
        if ($(this).val()==0) {
            $(this).removeClass('ui-state-default').addClass('ui-state-err').attr('title','No puede valer 0');
        } else {
            $(this).removeClass('ui-state-err').addClass('ui-state-default').attr('title','');
        }
        //Recálculo de precio condiciones entrega
        //if (g_TblPrecios) {
            //calculatePrecioCE();
            if (pVal_rate_valor!=$(this).val()) { //Si ha cambiado el valor...
                chgBtnCalcular();
            }
            //Recálculo de ACUERDOS y MARGEN
            /*
            _mda=$('#ct_moneda').val();
            _Rate=Number(($(this).val()).replace(',','.'));
            _Acuerdos=$('#ct_acuerdos').val();
            _Acuerdos=(_Acuerdos=='NaN')?0:Number(_Acuerdos.replace(',','.'));
            _Acuerdos=(_mda=='EUR')?_Acuerdos/_Rate:_Acuerdos;
            _Margen=Number(($('#ct_margen').val()).replace(',','.'));
            _Margen=(_mda=='EUR')?_Margen:_Margen/_Rate;
            $('#ct_acuerdos').val( _Acuerdos );
            $('#ct_margen').val( _Margen );
            */
        //}
    });
    d6.fmk.customWidthINPUT('#ct_acuerdos', '75px');
    d6.fmk.customWidthINPUT('#ct_acuerdos-udad', '75px');
    var pVal_acuerdos;
    $('#ct_acuerdos').keyup(function(){ chkNumeric('#' + this.id) });
    $('#ct_acuerdos').focus(function(){
        pVal_acuerdos=$(this).val();
    }).change(function(){
        //Recálculo de precio condiciones entrega
        //if (g_TblPrecios) {
            //calculatePrecioCE();
            if (pVal_acuerdos!=$(this).val()) { //Si ha cambiado el valor...
                chgBtnCalcular();
            }
        //}
    });
    d6.fmk.customWidthINPUT('#ct_margen', '75px');
    d6.fmk.customWidthINPUT('#ct_margen-udad', '75px');
    var pVal_margen;
    $('#ct_margen').keyup(function(){ chkNumeric('#' + this.id) });
    $('#ct_margen').focus(function(){
        pVal_margen=$(this).val();
    }).change(function(){
        //Recálculo de precio condiciones entrega
        //if (g_TblPrecios) {
            //calculatePrecioCE();
            if (pVal_margen!=$(this).val()) { //Si ha cambiado el valor...
                chgBtnCalcular();   
            }            
        //}
    });
    /*
    $('#ico_tsh_fijo-valor').css('cursor','pointer').click(function(){
        $('#ct_fijo-valor').val(''); //Pone el valor fijo en blanco para así no tenerlo en cuenta como origen del cálculo
    });
    */
    d6.fmk.customWidthINPUT('#ct_fijo-valor', '75px'); 
    $('#ct_fijo-valor').keyup(function(){ 
        chkNumeric('#' + this.id); 
        /*
        d6.fmk.inpBoxDisabled('#ct_dif-valor',true); 
        if ($(this).val()=='') {
            d6.fmk.inpBoxDisabled('#ct_dif-valor',false);
        } 
        */
    });
    var pVal_fijo_valor;
    $('#ct_fijo-valor').focus(function(){
        pVal_fijo_valor=$(this).val();
    }).change(function(){
        //Recálculo de precio condiciones entrega
        //if (g_TblPrecios) {
            //calculatePrecioCE();
            if (pVal_fijo_valor!=$(this).val()) { //Si ha cambiado el valor...
                chgBtnCalcular();
            }            
        //}
    });
    d6.fmk.customWidthSELECT('#ct_fijo-udad', '75px');
    d6.fmk.customWidthINPUT('#ct_dif-valor', '75px'); 
    $('#ct_dif-valor').keyup(function(){ 
        chkNumeric('#' + this.id); 
        /*
        d6.fmk.inpBoxDisabled('#ct_fijo-valor',true); 
        if ($(this).val()=='') {
            d6.fmk.inpBoxDisabled('#ct_fijo-valor',false);
        } 
        */
    });
    var pVal_dif_valor;
    $('#ct_dif-valor').focus(function(){
        pVal_dif_valor=$(this).val();
    }).change(function(){
        //Recálculo de precio condiciones entrega
        //if (g_TblPrecios) {
            //calculatePrecioCE();
            if (pVal_dif_valor!=$(this).val()) { //Si ha cambiado el valor...
                chgBtnCalcular();
            }
            loadFOBDif();
        //}
    });
    d6.fmk.customWidthINPUT('#ct_fobdif','100px');
    d6.fmk.customWidthINPUT('#ct_comint-valor', '75px'); 
    $('#ct_comint-valor').keyup(function(){ chkNumeric('#' + this.id); });
    d6.fmk.customWidthINPUT('#ct_otrcom-valor', '75px'); 
    $('#ct_otrcom-valor').keyup(function(){ chkNumeric('#' + this.id); });
    $('#ct_fijmdo').click(function(){
        if ($(this).prop('checked')) { //Si no está pulsado, es decir, si vale NO, se deshabilitan todas las fechas de Fijación del apartado Entrega/Emgarques
            if ($('#ct_contratode').val()=='V' && !($('#chk_Mod').is(':checked'))) {
                $('select[name^="ct_entr-fijacion-"]').each(function(){
                    d6.fmk.cmbBoxDisabled('#'+this.id, false);
                });
            } else {
                    d6.fmk.cmbBoxDisabled('#ct_entr-fijacion-1', false);
            }
            $('#inp_h_prctpe').val(2);
        } else {
            $('select[name^="ct_entr-fijacion-"]').each(function(){
                d6.fmk.cmbBoxDisabled('#'+this.id, true);
            });
            $('#inp_h_prctpe').val(1);
        }
    });
    $('#ico_tsh_interm').css('cursor','pointer').click(function(){
        d6.fmk.setValue('#ct_interm',''); //Pone el valor en blanco
        d6.fmk.setValue('#ct_cod-interm',''); //Pone el valor en blanco
        d6.fmk.inpBoxDisabled('#ct_comint-valor', true);
        d6.fmk.inpBoxDisabled('#ct_comint-udad', true);
        //d6.fmk.cmbBoxDisabled('#ct_comint-udad', true);
    });
    $('#ico_tsh_otrcom').css('cursor','pointer').click(function(){
        d6.fmk.setValue('#ct_otrcom',''); //Pone el valor en blanco
        d6.fmk.setValue('#ct_cod-otrcom',''); //Pone el valor en blanco
        d6.fmk.inpBoxDisabled('#ct_otrcom-valor', true);
        d6.fmk.inpBoxDisabled('#ct_otrcom-udad', true);
        //d6.fmk.cmbBoxDisabled('#ct_otrcom-udad', true);
    });
    d6.fmk.customWidthSELECT('#ct_otrcom','200px');
    $('#ct_otrcom').removeClass('d6-modified');
    d6.fmk.loadCBox('#ct_otrcom', 'engine.asp?a=rcboc', '', {
        select: function(event, ui){
            d6.fmk.setValue('#ct_cod-otrcom', this.value);
            d6.fmk.inpBoxDisabled('#ct_otrcom-valor', false);
            d6.fmk.cmbBoxDisabled('#ct_otrcom-udad', false);
            //Carga de d6-field
            $('#inp_h_txt_otrcom').val( $('#'+this.id+' :selected').text() );   
            //Cambio de color
            stateModifiedSelect(this);                      
        }                                        
    }, false, '', '$(\'#inp_h_txt_otrcom\').val($(\'#ct_otrcom :selected\').text());');
    d6.fmk.customWidthINPUT('#ct_comint-udad', '75px');
    d6.fmk.customWidthINPUT('#ct_otrcom-udad', '75px');
    /*
    loadCBoxUnidades('mdo');
    loadCBoxUnidades('fijo', _mdo);
    loadCBoxUnidades('comint', _mdo);
    loadCBoxUnidades('otrcom', _mdo);
    */
    $('#ct_btn_calcular-fijo').button({icons: {primary: 'ui-icon-gear'} });
    $('#ct_btn_calcular-fijo').click(function(){
        $('[id^=ct_btn_calcular-]').removeClass('ui-state-btn-click').addClass('ui-state-default');
        $('#ct_fijo-valor').val('');
        //Comprobamos valores necesarios
        if ($('#ct_mdo-valor').val()=='') $('#ct_mdo-valor').val('0');
        if ($('#ct_dif-valor').val()=='') $('#ct_dif-valor').val('0');
        if ($('#ct_acuerdos').val()=='') $('#ct_acuerdos').val('0');
        if ($('#ct_margen').val()=='') $('#ct_margen').val('0');
        calculatePrecioCE($('#ct_fijo-udad').val());
    });    
    $('#ct_btn_calcular-dif').button({icons: {primary: 'ui-icon-gear'} });
    $('#ct_btn_calcular-dif').click(function(){
        $('[id^=ct_btn_calcular-]').removeClass('ui-state-btn-click').addClass('ui-state-default');
        $('#ct_dif-valor').val('');
        //Comprobamos valores necesarios
        if ($('#ct_mdo-valor').val()=='') $('#ct_mdo-valor').val('0');
        if ($('#ct_fijo-valor').val()=='') $('#ct_fijo-valor').val('0');
        if ($('#ct_acuerdos').val()=='') $('#ct_acuerdos').val('0');
        if ($('#ct_margen').val()=='') $('#ct_margen').val('0');
        calculatePrecioCE($('#ct_fijo-udad').val());
    });
    d6.fmk.customWidthSELECT('#ct_pago','75px');
    
    /*-- CONDICIONES ESPECIALES --*/
    //Condiciones especiales (Desplegable)
    $('#ico_tsh_cond-esp-cb').css('cursor','pointer').click(function(){
        d6.fmk.setValue('#ct_cond-esp-cb',''); //Pone el valor en blanco
    });
    d6.fmk.customWidthSELECT ('#ct_cond-esp-cb', '200px'); //Ampliamos el ancho del SELECT
    d6.fmk.loadCBox('#ct_cond-esp-cb', 'engine.asp?a=rcbces', '', {}, false, '', {}, true); 
    //Condiciones especiales (Notas)
    $('#ct_cond-esp').change(function(){
        if($(this).val()!='') {
            if ($(this).attr('d6-defVal')!=$(this).val()) {
                $(this).removeClass('ui-state-default').addClass('ui-state-modified');    
            } else {
                $(this).removeClass('ui-state-modified').addClass('ui-state-default');    
            }
        };
    })

    /*-- ENTREGAS --*/


    $('#tbl_entr input').not('[id^=ct_apl-ctto]').each(function(){ //Control para verificar que sean valores numéricos y el fijar tamaño
        $(this).keyup(function(){ chkNumeric('#'+this.id,false); });
        d6.fmk.customWidthINPUT('#'+this.id,'100px');
    });

    //Tamaño de los CONTRATOS de las APLICACIONES
    $('#tbl_entr input[id^=ct_apl-ctto]').each(function(){
       d6.fmk.customWidthINPUT('#'+this.id,'120px'); 
    });
    //Tamaño de los SELECT de ENTREGAS/EMBARQUES
    $('#tbl_entr select').siblings().find('input').each(function(){
        d6.fmk.customWidthINPUT(this,'90px'); 
    });


    //Cálculo de la SUMA de CANTIDADES (Entregas)
    $('#tbl_entr input[name^="ct_entr-cant-"]').each(function(){ 
        $(this).on('change', function(){ 
            sumCantidadesEntregas();
            var _n=d6.fmk.Right($(this).attr('id'),2); //recuperamos el número de entrega/embarque
            sumCantidadesAplicacion( ((_n.indexOf('-')>=0)?d6.fmk.Right($(this).attr('id'),1):_n) );
        });
    });

    /*-- APLICACIÓN --*/
    for (var _n = 0; _n <= 13; _n++) {
        $('#tbl_apl input[name^="ct_apl-cant-'+_n+'-"]').each(function(){ 
            $(this).keyup(function(){ chkNumeric('#'+this.id); }); //Control para verificar que sean valores numéricos
            $(this).on('change', function(){  //Suma de las cantidades de APLICACIÓN
                sumCantidadesAplicacion($(this).attr('d6-apl'));
            });
        });
    }
    
    /*-- OTRAS CONDICIONES --*/
    //Arbitraje
    $('#ct_arb').removeClass('d6-modified');
    $('#ct_arb').combobox({
        select: function(){
            //$('#inp_h_txt_arb').val( $('#'+this.id+' :selected').text());
            //Cambio de color
            stateModifiedSelect(this);            
        }
    });
    $('#ct_email').keyup(function(){
        if( !d6.fmk.chkEMail('#'+this.id) ) {
            $(this).removeClass('ui-state-default').removeClass('ui-state-err').addClass('ui-state-err');
        } else {
            $(this).removeClass('ui-state-err').removeClass('ui-state-default').addClass('ui-state-default');
        }
    });

    /*-- Botones <Generar> --*/
    $('#ct_btn_reset').button({icons: {primary: 'ui-icon-trash'} }).click(function(){
        resetForm();
    });

    $('#ct_btn_generar-ctto').button({icons: {primary: 'ui-icon-gear'} }).click(function(){
        //Si hay un valor nuevo para CALIDAD-CLIENTE (inp_h_qltc_nuevo)
        d6.fmk.cLog('[GenerarCtto] Calidad-Cliente Nueva? ' + $('#inp_h_qltc_nuevo').val());
        if ($('#inp_h_qltc_nuevo').val()=='S') {
            saveQLTC();
        }
        //Tipo Documento
        //Por defecto, contrato nuevo
        $('#inp_h_TDoc').val('LHT0');
        //showFieldsInfo(); 
        if (!showFieldsRequired(false)) { //Si no hay campos OBLIGATORIOS en blanco
            checkNumEntregasMods();    
        } else {
            DlgInfo('Hay campos OBLIGATORIOS por rellenar (en rojo)', 'txtDlgErr', 'CONTRATO: Campos OBLIGATORIOS');    
        }
    });
    $('#ct_btn_generar-oferta').button({icons: {primary: 'ui-icon-gear'} }).click(function(){
        //Si hay un valor nuevo para CALIDAD-CLIENTE (inp_h_qltc_nuevo)
        if ($('#inp_h_qltc_nuevo').val()=='S') {
            saveQLTC();
        }
        //Tipo Documento: Oferta
        $('#inp_h_TDoc').val('LHOF'); 
        d6.fmk.setValue('#ct_contratode','O');
        $('#ct_contratode').val('O');
        //$('[d6-field=Comp]').val('OF');
        //showFieldsInfo(); 
        if (!showFieldsRequired(false)) { //Si no hay campos OBLIGATORIOS en blanco
            checkNumEntregasMods();    
        } else {
            DlgInfo('Hay campos OBLIGATORIOS por rellenar (en rojo)', 'txtDlgErr', 'CONTRATO: Campos OBLIGATORIOS');    
        }
    });
    $('#ct_btn_cancelar').button({icons: {primary: 'ui-icon-closethick'} }).click(function(){
        //Si hay un valor nuevo para CALIDAD-CLIENTE (inp_h_qltc_nuevo)
        if ($('#inp_h_qltc_nuevo').val()=='S') {
            saveQLTC();
        }
        //Tipo Documento: Oferta
        $('#inp_h_TDoc').val('LHC0'); 
        //showFieldsInfo(); 
        if (!showFieldsRequired(false)) { //Si no hay campos OBLIGATORIOS en blanco
            checkNumEntregasMods();    
        } else {
            DlgInfo('Hay campos OBLIGATORIOS por rellenar (en rojo)', 'txtDlgErr', 'CONTRATO: Campos OBLIGATORIOS');    
        }
    });

    /* >>> Por si se sigue revisando la posibilidad de ajustar el "alto" de los desplegables de ui-autocomplete
    var nN=0;
    $('.ui-autocomplete').each(function(){
        d6.fmk.cLog('ui-autocomplete['+nN+']: ');
        d6.fmk.cLog($(this));
        nN++;
    });
    */
    /*--.--*/
}


/*
* chkEmbarqueFijacion: para verificar que la fecha de Embarque sea siempre inferior o igual a la de fijación
* _t: this (objeto sobre el que actuar)
* _ef: 'e'/'f' (un valor u otro dependiendo de si es 'e'mbarque o 'f'ijación)
* _a: acción (selected/change)
*/
function chkEmbarqueFijacion(_t,_ef,_a) {
    var _id=$(_t).prop('id');
    var _n=_id.substr(_id.length-2);
    var _spn=(_ef=='e')?'spn_entr-emb-':'spn_entr-fijacion-';
    var _txt=(_ef=='e')?'Embarque > Fijación':'Fijación < Embarque';
    var _ve;
    var _vf;
    _n=( _n.charAt(0)=='-' )?_n.substr(1): _n;
    //Verificamos los valores del 'input' asociado, así vale tanto para el caso de que se cambie éste como para que se seleccione del 'select'
    _ve=(_a=='select')?$('#ct_entr-emb-' + _n).val():$('#ct_entr-emb-' + _n).siblings().find('input').val();
    _vf=(_a=='select')?$('#ct_entr-fijacion-' + _n).val():$('#ct_entr-fijacion-' + _n).siblings().find('input').val();
    if ($('#ct_entr-emb-' + _n).val()=='' || $('#ct_entr-fijacion-' + _n).val()=='' || $('#ct_entr-emb-' + _n).val()==undefined || $('#ct_entr-fijacion-' + _n).val()==undefined) return true;
    if (_ve>_vf) {
        $(_t).parent().find('span#' +_spn + _n).remove();
        $(_t).parent().append('<span id="' + _spn + _n + '" class="ui-state-err">' + _txt + '</span>');
        $(_t).siblings().find('input').removeClass('ui-state-default').addClass('ui-state-err');
        d6.fmk.cLog('[chkEmbarqueFijacion] Embarque > Fijación!! ('+_ve+'>'+_vf+') - ERROR');
    } else {
        $('#spn_entr-emb-'+_n).remove();
        $('#spn_entr-fijacion-'+_n).remove();
        $('#ct_entr-emb-' + _n).siblings().find('input').removeClass('ui-state-err').addClass('ui-state-default');
        $('#ct_entr-fijacion-' + _n).siblings().find('input').removeClass('ui-state-err').addClass('ui-state-default');
        d6.fmk.cLog('[chkEmbarqueFijacion] Embarque <= Fijación!! ('+_ve+'<='+_vf+') - CORRECTO');
    }
}


/*
* loadJTable: carga de la estructura de las JTables (Cttos - Venta/Compra)
*/
function loadJTable(_jt) {
    if (_jt==='jtable_cttos') {
        $('#jtable_cttos').jtable({
            title: 'Listado de Contratos (Ventas)',
            paging: true, //Enables paging
            pageSize: 10, 
            pageSizeChangeArea: false, //Para que no es muestre el comboBox de cambio de PageSize
            sorting: true, //Enables sorting
            pageList: 'minimal', 
            defaultSorting: 'CtrDate DESC', //Optional. Default sorting on first load.
            selecting: true,
            jqueryuiTheme: true,
            actions: {
               listAction: function (postData, jtParams) {
                    d6.fmk.cLog('jtable_cttos > custom listAction...');
                    return $.Deferred (function ($dfd) {
                        //d6.fmk.cLog('listAction jtable_vc: ' + jtParams.jtSorting);
                        //Control ORDENACIÓN (parcheado porque jtables "cuela" esta ordenación en la primera ejecución, aunque no consta que deba hacerlo)
                        if ((jtParams.jtSorting).indexOf(',')>=0) {
                            jtParams.jtSorting='CtrDate DESC';
                            //Quitamos el icono de ordenación de 'Ctr' (es la tercera columna)
                            $($('#jtable_cttos table thead tr th')[2]).removeClass('jtable-column-header-sorted-desc');
                        }
                        /* Loader */
                        $('#ldr').show();
                        $.ajax({
                                url: 'engine.asp?A=RTCT&NR=' + $('#slc_nregs :radio:checked').attr('value') 
                                        + '&C=' + $('#slc_cia :selected').attr('value')                           
                                        + '&CP=' + $('#slc_clpr :selected').attr('value')                         
                                        + '&QG=' + $('#slc_qgr :selected').attr('value') 
                                        + '&O=' + $('#slc_ogn :selected').attr('value') 
                                        + '&Q=' + $('#slc_qlt :selected').attr('value')
                                        + '&T=' + $('#slc_ctto').val()                                        
                                        + '&jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                                type: 'GET',
                                dataType: 'json',
                                data: postData,
                                success: function (data){
                                    $dfd.resolve(data);
                                },
                                error: function(){
                                    $dfd.reject();
                                },
                                complete: function(){
                                    $('#ldr').hide();
                                }
                            });                    
                    });
                }
                 
            },
            fields: {
                'Comp': {
                    title: 'Comp.',
                    width: '5%'
                },
                'TIPO_DOCUMENTO': {
                    title: 'Doc.',
                    width: '5%',
                    display: function (data) {
                        var _dr=data.record;
                        var sURL,sF;
                        //return _dr.TIPO_DOCUMENTO+' <a href="javascript:gridGenPDF(\''+_dr.PDF+'\')"  target="_blank" title="Ver Contrato"><img src="img/icon-popup.png"/></a> ';
                        return _dr.TIPO_DOCUMENTO+'<br/><a href="doc\\'+_dr.PDF+'"  target="_blank" title="Ver Contrato"><img src="img/icon-popup.png"/></a> ';
                    }
                },
                'Ctr': {
                    title: 'Contrato',
                    width: '10%',
                    display: function (data) {
                        var _dr=data.record;
                        return _dr.Ctr+'<br/><a href="javascript:showCttos(\''+_dr.Ctr+'\')"  target="_blank" title="Ver Documentos"><img src="img/icon-popup.png"/></a> ';
                    }
                },
                'CtrDate': {
                    title: 'Fecha CTR',
                    width: '7%'
                },
                'ENTREGA_1_EMBARQUE': {
                    title: 'Entrega',
                    width: '7%'
                },
                'OutRightPrice': {
                    title: 'Precio',
                    width: '6%',
                    display: function (data) { return d6.fmk.number_format(data.record.OutRightPrice, 2, ',', '.'); }
                },
                'NetDiff': {
                    title: 'Diferencial',
                    width: '5%',
                    display: function (data) { return d6.fmk.number_format(data.record.NetDiff, 2, ',', '.'); }
                },
                'TotalKg': {
                    title: 'Kgs.',
                    width: '7%',
                    display: function (data) { return d6.fmk.number_format(data.record.TotalKg, 0, ',', '.'); }
                },       
                'CLIENTE_PROVEEDOR': {
                    title: 'Cliente',
                    width: '15%'
                },
                'REF_CLIPRO': {
                    title: 'Referencia',
                    width: '10%'
                },
                'Origin': {
                    title: 'Origin',
                    width: '10%'
                },
                'OrigNo': {
                    type: 'hidden',
                    width: '0%'
                },
                'Quality': {
                    title: 'Quality',
                    width: '15%'
                },
                'QualNo': {
                    type: 'hidden',
                    width: '0%'
                },
                'AccNo': {
                    type: 'hidden',
                    width: '0%'
                },            
                'CurrName': {
                    title: 'Mon.',
                    width: '5%'
                }            
            },
            selectionChanged: function(){
                var $selRows=$('#jtable_cttos').jtable('selectedRows');
                if ($selRows.length>0) {
                    //Cargamos los datos seleccionados en los input "ocultos"
                    loadFieldsCtto($selRows,'jtable_cttos');
                    //Habilitamos "Modificar", porque sólo se puede hacer al seleccionar un registro del GRID de CONTRATOS
                    d6.fmk.chkBoxDisabled('#chk_Mod',false);
                    //Habilitamos SELECCIONAR
                    $('#btn_csl').button('option','disabled',false);
                }              
            }
        });
    } else { //Ventas/Compras
        $('#jtable_vc').jtable({
            title: 'Listado de Ventas',
            paging: true, //Enables paging
            pageSize: 10, 
            pageSizeChangeArea: false, //Para que no es muestre el comboBox de cambio de PageSize
            sorting: true, //Enables sorting
            pageList: 'minimal', 
            defaultSorting: 'CTRDATE DESC', //Optional. Default sorting on first load.
            selecting: true,
            jqueryuiTheme: true,        
            actions: {
                listAction: function (postData, jtParams) {
                    d6.fmk.cLog('jtable_vc > custom listAction...');
                    return $.Deferred (function ($dfd) {
                        //d6.fmk.cLog('listAction jtable_vc: ' + jtParams.jtSorting);
                        /* Loader */
                        $('#ldr').show();
                        $.ajax({
                                url: 'engine.asp?A=RTVC&NR=' + $('#slc_nregs :radio:checked').attr('value') 
                                        + '&C=' + $('#slc_cia :selected').attr('value')                                                 
                                        + '&CP=' + $('#slc_clpr :selected').attr('value')                         
                                        + '&QG=' + $('#slc_qgr :selected').attr('value') 
                                        + '&O=' + $('#slc_ogn :selected').attr('value') 
                                        + '&Q=' + $('#slc_qlt :selected').attr('value')
                                        + '&T=' + $('#slc_ctto').val()                                    
                                        + '&jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                                type: 'GET',
                                dataType: 'json',
                                data: postData,
                                success: function (data){
                                    $dfd.resolve(data);
                                },
                                error: function(){
                                    $dfd.reject();
                                },
                                complete: function(){
                                    $('#ldr').hide();
                                    //Hover para las filas
                                    $("#jtable_vc tr").not(':first').hover(
                                      function () {
                                        $(this).css("background","lavender");
                                      }, 
                                      function () {
                                        $(this).css("background","");
                                      }
                                    );                                   
                                }
                            });                    
                    });
                }
            },
            fields: {
                'Comp': {
                    title: 'Comp.',
                    width: '5%'
                },
                'Ctr': {
                    title: 'Contrato',
                    width: '10%',
                    display: function (data) {
                        var _dr=data.record;
                        return _dr.Ctr+'<br/><a href="javascript:showCttos(\''+_dr.Ctr+'\')"  target="_blank" title="Ver Documentos"><img src="img/icon-popup.png"/></a> ';
                    }                    
                },
                'CTRDATE': {
                    title: 'Fecha CTR',
                    width: '7%'
                },
                'ShipmDateAAAAMM': {
                    title: 'Ent./Emb.',
                    width: '7%'
                },                
                'OutRightPrice': {
                    title: 'Precio',
                    width: '4%',
                    display: function (data) { return d6.fmk.number_format(data.record.OutRightPrice, 2, ',', '.'); }
                },
                'NetDiff': {
                    title: 'Diferencial',
                    width: '5%',
                    display: function (data) { return d6.fmk.number_format(data.record.NetDiff, 2, ',', '.'); } //https://github.com/hikalkan/jtable/issues/15
                },
                'TotalKg': {
                    title: 'Kgs.',
                    width: '7%',
                    display: function (data) { return d6.fmk.number_format(data.record.TotalKg, 0, ',', '.'); }
                },
                'Contractor': {
                    title: 'Cliente/Proveedor',
                    width: '20%'
                },
                'QualityGroup': {
                    type: 'hidden',
                    width: '0%'
                },
                'QualGrpNo': {
                    type: 'hidden',
                    width: '0%'
                },
                'Origin': {
                    title: 'Origin',
                    width: '15%'
                },
                'OrigNo': {
                    type: 'hidden',
                    width: '0%'
                },
                'Quality': {
                    title: 'Quality',
                    width: '25%'
                },
                'QualNo': {
                    type: 'hidden',
                    width: '0%'
                },
                'AccNo': {
                    type: 'hidden',
                    width: '0%'
                },            
                'CurrName': {
                    title: 'Mon.',
                    width: '4%'
                },
                'AccNo3': {
                    type: 'hidden',
                    width: '0%'
                },
                'Agent': {
                    type: 'hidden',
                    width: '0%'
                },
                'CondCode': {
                    type: 'hidden',
                    width: '0%'
                },
                'Condition': {
                    type: 'hidden',
                    width: '0%'
                },
                'NetStockExch': {
                    type: 'hidden',
                    width: '0%'
                },
                'PriceType': {
                    type: 'hidden',
                    width: '0%'
                },
                'NetFuturesMonth': {
                    type: 'hidden',
                    width: '0%'
                },
                'OrgBags': {
                    type: 'hidden',
                    width: '0%'
                }
            },
            selectionChanged: function(){
                var $selRows=$('#jtable_vc').jtable('selectedRows');
                if ($selRows.length>0) {
                    //Cargamos los datos seleccionados en los input "ocultos"
                    loadFieldsCtto($selRows,'jtable_vc');
                    //Deshabilitamos "Modificar", ya que sólo se puede hacer al seleccionar un registro del GRID de CONTRATOS
                    d6.fmk.chkBoxDisabled('#chk_Mod',true);
                    //Habilitamos SELECCIONAR
                    $('#btn_csl').button('option','disabled',false);                    
                }  
            }
        });
    }
}

/*
* calculatePrecioCE: calcula el precio en función de la condición de entrega
* @param {str} _u: texto de las unidades para el fijo. Si no se informa, se recupera del ComboBox (ct_fijo-udad)
*/
function calculatePrecioCE(_u){
    //Cálculo de los PRECIOS para CONDICIONES DE ENTREGA
    $('#tbl_precio_condentr').hide();
    if ($('#ct_fijo-valor').val()=='NaN') $('#ct_fijo-valor').val('');
    var _Rs;
    var _qgrN=$('#ct_cod-qgr').val();
    var _ognN=$('#ct_cod-ogn').val();
    var _MdoV=($('#ct_mdo-valor').val()).replace(',','.');
    if (_MdoV==undefined || _MdoV=='') {
        _MdoV=0;
        $('#ct_mdo-valor').val('0');
    } else {
        _MdoV=Number(_MdoV);    
    }
    var _Cnv_USD_MT=($('#ct_mdo-udad').val()=='USD/MT')?1:22.046; //Conversión a USD/MT para cuando es US cts/lb
    var _Rate=Number( ($('#ct_rate-valor').val()).replace(',','.') );
    var _Dif=Number( ($('#ct_dif-valor').val()).replace(',','.') );
    var _Acuerdos=Number( ($('#ct_acuerdos').val()).replace(',','.') );
    var _Margen=Number( ($('#ct_margen').val()).replace(',','.') );
    var _Mda=$('#ct_moneda').val();
    var _CEnt=$('#ct_condent').val();
    //Se reconvierte siempre a unidades en MT para unificar el cálculo
    var _Fijo=convUdad2MT(Number(($('#ct_fijo-valor').val()).replace(',','.') ), _u);
    //Se reconvierten a unidades MT las comisiones
    var _Com1Udad=$('#ct_comint-udad').val();
    var _Com1=convUdad2MT(Number(($('#ct_comint-valor').val()).replace(',','.') ), _u);
    var _Com2Udad=$('#ct_otrcom-udad').val();
    var _Com2=convUdad2MT(Number(($('#ct_otrcom-valor').val()).replace(',','.') ), _u);
    var _txt;
    //Cálculos 
    var _FOB_USD;
    var _FOB_EUR;
    var _Flete;
    var _Seguro;
    var _P_FinTrav;
    var _FinTrav;
    var _EUR_MT_CIF;
    var _USD_MT_CIF;
    var _EUR_MT_C_F;
    var _USD_MT_C_F;
    var _GTOS_CIF_INSTORE;
    var _EUR_MT_INSTORE;
    var _USD_MT_INSTORE;
    var _Seg_Almacen;
    var _P_FinStock;
    var _FinStock;
    var _P_FinCobro;
    var _FinClientes;
    var _Gtos_BancFuturos;
    var _Hermes;
    var _CosteDescaf;
    var _CosteCamion;
    var _EUR_MT_INSTORE_RW;
    var _USD_MT_INSTORE_RW;
    var _Gtos_INSTORE_FOT;
    var _EUR_MT_FOT;
    var _USD_MT_FOT;
    var _EUR_MT_FOT_RETRC_PALET;
    var _USD_MT_FOT_RETRC_PALET;
    var _EUR_MT_DDP; 
    var _USD_MT_DDP; 
    var _EUR_MT_DDU;
    var _USD_MT_DDU;
    var _EUR_MT_FCA;
    var _USD_MT_FCA;
    var _EUR_MT_EXSTORE;
    var _USD_MT_EXSTORE;
    var FOB;
    var C_F;
    var CIF;
    var FOT;
    var INSTORE;
    var DDP;
    var DDU;
    var FCA;
    var EXSTORE;
    var _incoterm;

    //Recuperamos Unidades de Fijo para recalcular si corresponde
    if (_u==undefined) _u=$('#ct_fijo-udad').val();
    //    
    $('#ldr').show();
    $.ajax({
        async: false,
        url: 'engine.asp?A=CALCE&QG=' + _qgrN + '&O=' + _ognN,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    if (data.Records.length==0) {
                        d6.fmk.cLog('[CALCULAR] No hay datos para QualityGroup '+ _qgrN + ' y Origin ' + _ognN )
                    } else {
                        _Rs=data.Records[0];
                        if (_Fijo!='') { //HAY FIJO
                            //FOB_USD=FIJO 
                            if ( _CEnt=='FOB') {
                                if (_Mda=='EUR') {
                                    _FOB_USD=_Fijo*_Rate;    
                                } else {
                                    _FOB_USD=_Fijo;
                                }
                            } 
                        } 
                        /* ===> Comentado el 20.02.2017
                        //else {//NO HAY FIJO > Calculamos FOB_USD con la información que ya tenemos de base
                          //  _FOB_USD=( (_MdoV + _Dif) * _Rs.CONVERSION_USD_MT  + (($('#ct_acuerdos-udad').val()=='USD/MT')?_Acuerdos:_Acuerdos * _Rate) + (($('#ct_margen-udad-udad').val()=='USD/MT')?_Margen:_Margen * _Rate));
                        //}
                        */
                        //Cálculos de los que tenemos siempre los valores (GastosFijos)
                        //_Fijo=convUdad2MT(_Fijo,_u);
                        _P_FinTrav=_Rs.TIPO_INT / 360 * _Rs.DIAS_TRAVESIA;
                        _P_FinStock=_Rs.TIPO_INT / 360 * _Rs.ROTACION_STOCK;
                        _P_FinCobro=_Rs.TIPO_INT / 360 * _Rs.PERIODO_COBRO;   
                        _Gtos_INSTORE_FOT=_Rs.S_ALM + _Rs.P_SALIDA + _Rs.ESTIBA_CAM; 
                        _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + (($('#ct_dsp').is(':checked'))?_Rs.DESPACHO:0) + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;                               
                        _CosteCamion=Number($('#inp_h_costecam').val()); //los gastos de trasporte de camión (tabla D6DEC_CAMIONES) en EUR
                        _p_Gtos = _Rs.PORCENTAJE_MERMA_DECAF + _Rs.PORCENTAJE_SEGURO_ALMACEN + _P_FinStock + _P_FinCobro + (_Rs.PORCENTAJE_GTOS_BANCARIOS + _Rs.PORCENTAJE_GTOS_BR) + _Rs.PORCENTAJE_SEGURO_RIESGO;
                        if (_Mda=='EUR') {
                            //Cálculos EUR
                            _FOB_EUR=(_Fijo!='' && _CEnt=='FOB')?_Fijo:( (((_MdoV + _Dif) * _Cnv_USD_MT) ) / _Rate + (($('#ct_acuerdos-udad').val()=='USD/MT')?_Acuerdos / _Rate:_Acuerdos) + (($('#ct_margen-udad-udad').val()=='USD/MT')?_Margen / _Rate:_Margen));
                            if (_Fijo=='') { //Queremos calcular el FIJO
                                _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen);
                                _FOB=_Precios.FOB;
                                _C_F=_Precios.C_F;
                                _CIF=_Precios.CIF;
                                _FOT=_Precios.FOT;
                                _INSTORE=_Precios.INSTORE;
                                _DDP=_Precios.DDP;
                                _DDU=_Precios.DDU;
                                _FCA=_Precios.FCA;
                                _EXSTORE=_Precios.EXSTORE;
                            } else { //Tenemos un valor FIJO para la CondEnt seleccionada: (cálculo de DIFERENCIAL)
                                d6.fmk.cLog('[calculatePrecioCE] EUR > CondEnt: ' + _CEnt);
                                _Flete=(_Rs.MT_CONTENEDOR!=0)?((_Rs.FLETE_USD_ES / _Rate) / _Rs.MT_CONTENEDOR):0;    
                                switch (_CEnt) {
                                    case 'FOB':
                                        _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen,'FOB',_Fijo);
                                        break;
                                    case 'CIF': //Si el valor FIJO es para CIF
                                        _EUR_MT_CIF=_Fijo;
                                        //FOB=(CIF-FLETE*P_SEGURO*(1+P_FTRAV)-FLETE*(1+P_FTRAV))/((1+P_FTRAV)+P_SEGURO*(1+P_FTRAV))
                                        _FOB_EUR=(_EUR_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                        _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen,'CIF',_Fijo);                                        
                                        break;
                                    case 'C&F':
                                        _EUR_MT_C_F=_Fijo;
                                        //FOB=(C_F-(1+P_FTRAV)*FLETE)/(1+P_FTRAV)
                                        _FOB_EUR=(_EUR_MT_C_F - _Flete * (1 + _P_FinTrav) ) / (1 + _P_FinTrav) 
                                        _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen,'C_F',_Fijo);                                        
                                        break;
                                    case 'INSTORE':
                                        _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + (($('#ct_dsp').is(':checked'))?_Rs.DESPACHO:0) + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;
                                        if ($('#ct_contratode').val()=='C') {
                                            _EUR_MT_INSTORE=_Fijo;
                                            _EUR_MT_CIF=_EUR_MT_INSTORE - _GTOS_CIF_INSTORE;
                                            _FOB_EUR=(_EUR_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                            _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen,'INSTORE',_Fijo);                                        
                                        } else {
                                            _EUR_MT_INSTORE_RW=_Fijo;
                                            _EUR_MT_INSTORE=( _EUR_MT_INSTORE_RW - ((_Rs.TOLLING_DCM_USD / _Rate) + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF) + _Rs.GTOS_M_FUTUROS_EUR + _CosteCamion )) / (_p_Gtos + 1)
                                            _EUR_MT_CIF=_EUR_MT_INSTORE - _GTOS_CIF_INSTORE;
                                            _FOB_EUR=(_EUR_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                            _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen,'INSTORE_RW',_Fijo);                                        
                                        }
                                        break;
                                    case 'FOT':
                                    case 'FCA':
                                    case 'DDP':
                                    case 'DDU':
                                    case 'EXSTORE':
                                        //Si está PALETIZADO Y/O RETRACTILADO... (EUR)
                                        var _Retr=$('#ct_camrtc').is(':checked');
                                        var _Palet=$('#ct_plt').is(':checked');
                                        if (_Palet) {
                                            if (_Retr) { 
                                                switch (_CEnt) {
                                                    case 'EXSTORE':
                                                        _EUR_MT_EXSTORE=_Fijo;
                                                        _EUR_MT_FOT=_EUR_MT_EXSTORE + _Rs.ESTIBA_CAM - _Rs.PALETIZADO_RETRACTILADO_EUR_MT;
                                                        break;
                                                    default:
                                                        _EUR_MT_FOT= _Fijo - _Rs.PALETIZADO_RETRACTILADO_EUR_MT;
                                                        break;
                                                }
                                            } else {
                                               switch (_CEnt) {
                                                    case 'EXSTORE':
                                                        _EUR_MT_EXSTORE=_Fijo;
                                                        _EUR_MT_FOT=_EUR_MT_EXSTORE + _Rs.ESTIBA_CAM - _Rs.PALET_EUR_MT;
                                                        break;
                                                    default:
                                                        _EUR_MT_FOT=_Fijo - _Rs.PALET_EUR_MT;
                                                        break;
                                                }
                                            }
                                        } else {
                                            switch (_CEnt) {
                                                case 'EXSTORE':
                                                    _EUR_MT_EXSTORE=_Fijo;
                                                    _EUR_MT_FOT=_EUR_MT_EXSTORE + _Rs.ESTIBA_CAM;
                                                    break;                                                
                                                default:
                                                    _EUR_MT_FOT=_Fijo;    
                                            }
                                        }
                                        _EUR_MT_INSTORE_RW=_EUR_MT_FOT - _Gtos_INSTORE_FOT;
                                        if (_CEnt=='DDP') {
                                            _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + _Rs.DESPACHO + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;
                                        }
                                        if (_CEnt=='DDU') {
                                            _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;
                                        }
                                        _EUR_MT_INSTORE=( _EUR_MT_INSTORE_RW - ((_Rs.TOLLING_DCM_USD / _Rate) + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF) + _Rs.GTOS_M_FUTUROS_EUR + _CosteCamion )) / (_p_Gtos + 1)
                                        _EUR_MT_CIF=_EUR_MT_INSTORE - _GTOS_CIF_INSTORE; 
                                        _FOB_EUR=(_EUR_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                        _Precios=CalculateFromFOB(_FOB_EUR, 'EUR', _Rs, _Rate, _Margen,_CEnt,_Fijo);                                        
                                        break;
                                }

                                //Al tener un valor FIJO, debemos calcular el DIFERENCIAL
                                _Dif= ( (_FOB_EUR - _Acuerdos - _Margen) * _Rate / _Cnv_USD_MT ) - _MdoV;

                                //Condiciones Entrega (Precios)
                                _FOB=_Precios.FOB;
                                _C_F=_Precios.C_F;
                                _CIF=_Precios.CIF;
                                _FOT=_Precios.FOT;
                                _INSTORE=_Precios.INSTORE;
                                _DDP=_Precios.DDP;
                                _DDU=_Precios.DDU;
                                _FCA=_Precios.FCA;
                                _EXSTORE=_Precios.EXSTORE;                                   
                            }
                        } else { //Para USD
                            _FOB_USD=(_Fijo!='' && _CEnt=='FOB')?_Fijo:( ((_MdoV + _Dif) * _Cnv_USD_MT)  + (($('#ct_acuerdos-udad').val()=='USD/MT')?_Acuerdos:_Acuerdos * _Rate) + (($('#ct_margen-udad-udad').val()=='USD/MT')?_Margen:_Margen*_Rate)); 
                            if (_Fijo=='') { //Queremos calcular el FIJO (USD)
                                _Precios=CalculateFromFOB(_FOB_USD, 'USD', _Rs, _Rate, _Margen);
                                _FOB=_Precios.FOB;
                                _C_F=_Precios.C_F;
                                _CIF=_Precios.CIF;
                                _FOT=_Precios.FOT;
                                _INSTORE=_Precios.INSTORE;
                                _DDP=_Precios.DDP;
                                _DDU=_Precios.DDU;
                                _FCA=_Precios.FCA;
                                _EXSTORE=_Precios.EXSTORE;
                            } else { //Cálculo del DIFERENCIAL (USD)
                                d6.fmk.cLog('[calculatePrecioCE] USD > CondEnt: ' + _CEnt);
                                _Flete=(_Rs.MT_CONTENEDOR!=0)?(_Rs.FLETE_USD_ES  / _Rs.MT_CONTENEDOR):0;    
                                switch (_CEnt) {
                                    case 'FOB':
                                        _Precios=CalculateFromFOB(_FOB_USD, _Mda, _Rs, _Rate, _Margen,'FOB',_Fijo);
                                        break;
                                    case 'CIF': //Si el valor FIJO es para CIF
                                        _USD_MT_CIF=_Fijo;
                                        _FOB_USD=(_USD_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                        _Precios=CalculateFromFOB(_FOB_USD, _Mda, _Rs, _Rate, _Margen,'CIF',_Fijo);                                        
                                        break;
                                    case 'C&F':
                                        _USD_MT_C_F=_Fijo;
                                        _FOB_USD=(_USD_MT_C_F - _Flete * (1 + _P_FinTrav) ) / (1 + _P_FinTrav) 
                                        _Precios=CalculateFromFOB(_FOB_USD, _Mda, _Rs, _Rate, _Margen,'C_F',_Fijo);                                        
                                        break;
                                    case 'INSTORE':
                                        _GTOS_CIF_INSTORE=(_Rs.OP_PUERTO + (($('#ct_dsp').is(':checked'))?_Rs.DESPACHO:0) + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM) * _Rate;
                                        if ($('#ct_contratode').val()=='C') {
                                            _USD_MT_INSTORE=_Fijo;
                                            _USD_MT_CIF=_USD_MT_INSTORE - _GTOS_CIF_INSTORE;
                                            _FOB_USD=(_USD_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                            _Precios=CalculateFromFOB(_FOB_USD, _Mda, _Rs, _Rate, _Margen,'INSTORE',_Fijo);                                        
                                        } else {
                                            _USD_MT_INSTORE_RW=_Fijo;
                                            _USD_MT_INSTORE=( _USD_MT_INSTORE_RW - (_Rs.TOLLING_DCM_USD  + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF) + (_Rs.GTOS_M_FUTUROS_EUR * _Rate) + _CosteCamion * _Rate)) / (_p_Gtos + 1)
                                            _USD_MT_CIF=_USD_MT_INSTORE - _GTOS_CIF_INSTORE;
                                            _FOB_USD=(_USD_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                            _Precios=CalculateFromFOB(_FOB_USD, _Mda, _Rs, _Rate, _Margen,'INSTORE_RW',_Fijo);                                        
                                        }
                                        break;
                                    case 'FOT':
                                    case 'FCA':
                                    case 'DDP':
                                    case 'DDU':
                                    case 'EXSTORE':
                                        //Si está PALETIZADO Y/O RETRACTILADO... (USD)
                                        var _Retr=$('#ct_camrtc').is(':checked');
                                        var _Palet=$('#ct_plt').is(':checked');
                                        if (_Palet) {
                                            if (_Retr) { 
                                                switch (_CEnt) {
                                                    case 'EXSTORE':
                                                        _USD_MT_EXSTORE=_Fijo;
                                                        _USD_MT_FOT=_USD_MT_EXSTORE + (_Rs.ESTIBA_CAM - _Rs.PALETIZADO_RETRACTILADO_EUR_MT) * _Rate;
                                                        break;
                                                    default:
                                                        _USD_MT_FOT= _Fijo - (_Rs.PALETIZADO_RETRACTILADO_EUR_MT * _Rate);
                                                        break;
                                                }
                                            } else {
                                               switch (_CEnt) {
                                                    case 'EXSTORE':
                                                        _USD_MT_EXSTORE=_Fijo;
                                                        _USD_MT_FOT=_USD_MT_EXSTORE + (_Rs.ESTIBA_CAM - _Rs.PALET_EUR_MT) * _Rate;
                                                        break;
                                                    default:
                                                        _USD_MT_FOT=_Fijo - _Rs.PALET_EUR_MT * _Rate;
                                                        break;
                                                }
                                            }
                                        } else {
                                            switch (_CEnt) {
                                                case 'EXSTORE':
                                                    _USD_MT_EXSTORE=_Fijo;
                                                    _USD_MT_FOT=_USD_MT_EXSTORE + _Rs.ESTIBA_CAM * _Rate;
                                                    break;                                                
                                                default:
                                                    _USD_MT_FOT=_Fijo;    
                                            }
                                        }
                                        _USD_MT_INSTORE_RW=_USD_MT_FOT - _Gtos_INSTORE_FOT * _Rate;
                                        if (_CEnt=='DDP') {
                                            _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + _Rs.DESPACHO + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;
                                        }
                                        if (_CEnt=='DDU') {
                                            _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;
                                        }
                                        _USD_MT_INSTORE=( _USD_MT_INSTORE_RW - (_Rs.TOLLING_DCM_USD + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF) + _Rs.GTOS_M_FUTUROS_EUR * _Rate + _CosteCamion * _Rate )) / (_p_Gtos + 1)
                                        _USD_MT_CIF=_USD_MT_INSTORE - _GTOS_CIF_INSTORE * _Rate; 
                                        _FOB_USD=(_USD_MT_CIF - _Flete * _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) - _Flete * (1 + _P_FinTrav) ) / ( (1 + _P_FinTrav) + _Rs.PORCENTAJE_SEGURO * (1 + _P_FinTrav) )
                                        _Precios=CalculateFromFOB(_FOB_USD, _Mda, _Rs, _Rate, _Margen,_CEnt,_Fijo);                                        
                                        break;
                                }

                                //Al tener un valor FIJO, debemos calcular el DIFERENCIAL
                                _Dif= ( (_FOB_USD  - _Acuerdos - _Margen) / _Cnv_USD_MT ) - _MdoV;

                                //Condiciones Entrega (Precios)
                                _FOB=_Precios.FOB;
                                _C_F=_Precios.C_F;
                                _CIF=_Precios.CIF;
                                _FOT=_Precios.FOT;
                                _INSTORE=_Precios.INSTORE;
                                _DDP=_Precios.DDP;
                                _DDU=_Precios.DDU;
                                _FCA=_Precios.FCA;
                                _EXSTORE=_Precios.EXSTORE; 
                            }
                        }
                        
                        _txt='<b>DIFERENCIAL: '+d6.fmk.Rdn2(_Dif) + '</b><br/>';
                        _txt+='<b>FOB (USD): ' + d6.fmk.Rdn2(_FOB_USD) + '</b><br/>';
                        _txt+='<b>FOB (EUR): ' + d6.fmk.Rdn2(_FOB_EUR) + '</b><br/>Flete: ' + d6.fmk.Rdn2(_Flete) + '<br/>Seguro: ' + d6.fmk.Rdn2(_Seguro) + '<br/>'; 
                        _txt+='% Fin.Trav.: ' + d6.fmk.RdnX(_P_FinTrav,5) + '<br/>Fin.Trav.: ' + d6.fmk.Rdn2(_FinTrav) + '<br/>';
                        _txt+='<b>C&F: ' + d6.fmk.Rdn2(_C_F) + '</b><br/><b>CIF: ' + d6.fmk.Rdn2(_CIF) + '</b><br/>';
                        _txt+='Gtos. CIF-INSTORE: ' + d6.fmk.Rdn2(_GTOS_CIF_INSTORE) + '<br/><b>INSTORE (Compras): ' + d6.fmk.Rdn2(_INSTORE) + '</b><br/>';
                        _txt+='Seguro Almacén: ' + d6.fmk.Rdn2(_Seg_Almacen) + '<br/>% Fin.Stock: ' + d6.fmk.RdnX(_P_FinStock,4) + '<br/>';
                        _txt+='Fin.Stock: ' + d6.fmk.Rdn2(_FinStock) + '<br/>% Fin.Cobro: ' + d6.fmk.RdnX(_P_FinCobro,4) + '<br/>';
                        _txt+='Fin.Clientes: ' + d6.fmk.Rdn2(_FinClientes) + '<br/>Gtos. Banc/Futuros: ' + d6.fmk.Rdn2(_Gtos_BancFuturos) + '<br/>';
                        _txt+='Hermes: ' + d6.fmk.Rdn2(_Hermes) + '<br/>Coste Descaf.: ' + d6.fmk.Rdn2(_CosteDescaf) + '<br/>';
                        _txt+='Coste Camión: ' + d6.fmk.Rdn2(_CosteCamion) + '<br/>';
                        _txt+='Gtos. INSTORE-FOT: ' + d6.fmk.Rdn2(_Gtos_INSTORE_FOT) + '<br/>Gtos. Banc/Futuros: ' + d6.fmk.Rdn2(_Gtos_BancFuturos) + '<br/>';
                        _txt+='<b>FOT: ' + d6.fmk.Rdn2(_FOT) + '</b><br/><b>EUR/MT FOT RETRC/PALET: ' + d6.fmk.Rdn2(_EUR_MT_FOT_RETRC_PALET) + '</b><br/>';
                        _txt+='<b>DDP: ' + d6.fmk.Rdn2(_DDP) + '</b><br/><b>DDU: ' + d6.fmk.Rdn2(_DDU) + '</b><br/>';
                        _txt+='<b>FCA: ' + d6.fmk.Rdn2(_FCA) + '</b><br/><b>EXSTORE: ' + d6.fmk.Rdn2(_EXSTORE) + '</b><br/>';
                        
                        d6.fmk.cLog('[calculatePrecioCE]\n' + _txt.replace(new RegExp('<br/>','g'),'\n'));
                        //DlgInfo( _txt, 'txtDlg', '[Obtención ESCANDALLOS <CALCE>]')
                        
                        //Recálculo en función de la unidad del FIJO
                        switch((_u).toUpperCase()) {
                            case 'EUR/MT':
                            case 'USD/MT':
                                break;
                            case 'EUR/50KGS':
                            case 'USD/50KGS':
                                //_Dif=_Dif*50/1000;
                                _FOB=_FOB*50/1000;
                                _C_F=_C_F*50/1000;
                                _CIF=_CIF*50/1000;
                                _INSTORE=_INSTORE*50/1000;
                                _EXSTORE=_EXSTORE*50/1000;
                                _FOT=_FOT*50/1000;
                                _DDU=_DDU*50/1000;
                                _DDP=_DDP*50/1000;
                                //_FCA=_FCA*50/1000;
                                break;
                            case 'USD/KG':
                                //_Dif=_Dif/1000;
                                _FOB=_FOB/1000;
                                _C_F=_C_F/1000;
                                _CIF=_CIF/1000;
                                _INSTORE=_INSTORE/1000;
                                _EXSTORE=_EXSTORE/1000;
                                _FOT=_FOT/1000;
                                _DDU=_DDU/1000;
                                _DDP=_DDP/1000;
                                //_FCA=_FCA/1000;
                                break;
                            case 'USD/46KGS':
                                //_Dif=_Dif*46/1000;
                                _FOB=_FOB*46/1000;
                                _C_F=_C_F*46/1000;
                                _CIF=_CIF*46/1000;
                                _INSTORE=_INSTORE*46/1000;
                                _EXSTORE=_EXSTORE*46/1000;
                                _FOT=_FOT*46/1000;
                                _DDU=_DDU*46/1000;
                                _DDP=_DDP*46/1000;
                                //_FCA=_FCA*46/1000;
                                break;                                
                            case 'US CTS/LB':
                                //_Dif=_Dif/0.0453592;
                                _FOB=_FOB/0.0453592;
                                _C_F=_C_F/0.0453592;
                                _CIF=_CIF/0.0453592;
                                _INSTORE=_INSTORE/0.0453592;
                                _EXSTORE=_EXSTORE/0.0453592;
                                _FOT=_FOT/0.0453592;
                                _DDU=_DDU/0.0453592;
                                _DDP=_DDP/0.0453592;
                                //_FCA=_FCA/0.0453592;
                                break;                                
                        }
                        //Carga en la TABLA (tbl_precio_condentr)
                        $('#td_MON').text(_u);
                        $('#td_FOB').text((d6.fmk.number_format(d6.fmk.Rdn2(_FOB),2,',','.')).toString());
                        $('#td_C_F').text((d6.fmk.number_format(d6.fmk.Rdn2(_C_F),2,',','.')).toString());
                        $('#td_CIF').text((d6.fmk.number_format(d6.fmk.Rdn2(_CIF),2,',','.')).toString());
                        $('#td_INSTORE').text((d6.fmk.number_format(d6.fmk.Rdn2(_INSTORE),2,',','.')).toString());
                        $('#td_EXSTORE').text((d6.fmk.number_format(d6.fmk.Rdn2(_EXSTORE),2,',','.')).toString());
                        $('#td_FOT').text((d6.fmk.number_format(d6.fmk.Rdn2(_FOT),2,',','.')).toString());
                        $('#td_DDU').text((d6.fmk.number_format(d6.fmk.Rdn2(_DDU),2,',','.')).toString());
                        $('#td_DDP').text((d6.fmk.number_format(d6.fmk.Rdn2(_DDP),2,',','.')).toString());

                        //Marcamos el PRECIO según la condición de entrega seleccionada
                        $('#tbl_precio_condentr th').each(function() {
                            $(this).removeClass('ui-state-default').removeClass('ui-corner-all');
                        })
                        _incoterm=($('#ct_condent').val()=='FCA')?'FOT':$('#ct_condent').val();
                        $('#th_' + ((_incoterm=='C&F')?'C_F':_incoterm)).addClass('ui-state-default').addClass('ui-corner-all');
                        //Si hay valor FIJO, cargamos el recáclulo del DIFERENCIAL
                        if (_Fijo!='') $('#ct_dif-valor').val((d6.fmk.Rdn2(_Dif)).toString().replace('.',','));
                        //Cargamos el valor del precio para la condición de entrega en el FIJO si no se había introducido de antemano
                        if (_Fijo=='') $('#ct_fijo-valor').val( ($('#td_' + ((_incoterm=='C&F')?'C_F':_incoterm)).text()).replace('.','') );
                        //Cambio de color
                        stateModifiedInput('ct_fijo-valor');  
                        //FOB + Diferencial
                        loadFOBDif();
                        //Mostramos el cuadro de INCOTERMS
                        $('#tbl_precio_condentr').show();
                        g_TblPrecios=true;
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Obtención ESCANDALLOS <CALCE>]');
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide();
        }
    });        
}


/*
* CalculateFromFOB: Calcula el PRECIO para todos los INCOTERMS a partir del FOB
* @param {num} _FOB: Valor de FOB
* @param {str} _Mda: Moneda del contrato
* @param {Obj} _Rs: RecordSet de los datos de ESCANDALLOS
* @param {num} _Rate: Valor del Rate para la conversión
* @param {num} _Margen: Valor del Margen
* @param {str} _Incoterm: Incoterm que estamos tratando si estamos calculando el Diferencial > así le asigna el _Fijo directamente. Undefined si estamos calculando el Fijo
* @param {num} _Fijo: Valor del Fijo para asignarlo al _Incoterm si corresponde
*/
function CalculateFromFOB(_FOB,_Mda,_Rs,_Rate, _Margen,_Incoterm,_Fijo) {
    //Gtos fijos
    _P_FinTrav=_Rs.TIPO_INT / 360 * _Rs.DIAS_TRAVESIA;
    _P_FinStock=_Rs.TIPO_INT / 360 * _Rs.ROTACION_STOCK;
    _P_FinCobro=_Rs.TIPO_INT / 360 * _Rs.PERIODO_COBRO;   
    _Gtos_INSTORE_FOT=_Rs.S_ALM + _Rs.P_SALIDA + _Rs.ESTIBA_CAM; 
    _GTOS_CIF_INSTORE=_Rs.OP_PUERTO + (($('#ct_dsp').is(':checked'))?_Rs.DESPACHO:0) + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM;
    _CosteCamion=Number($('#inp_h_costecam').val()); //los gastos de trasporte de camión (tabla D6DEC_CAMIONES)
    var _Retr=$('#ct_camrtc').is(':checked');
    var _Palet=$('#ct_plt').is(':checked');
    //Cálculo
    if (_Mda=='EUR') {
        _Flete=(_Rs.MT_CONTENEDOR!=0)?((_Rs.FLETE_USD_ES / _Rate) / _Rs.MT_CONTENEDOR):0;        
        _Seguro=(_Flete + _FOB) * _Rs.PORCENTAJE_SEGURO;
        _FinTrav=(_Seguro + _Flete + _FOB) * _P_FinTrav;
        _EUR_MT_CIF=(_Incoterm=='CIF')?_Fijo:_FinTrav + _Seguro + _Flete + _FOB;
        //_EUR_MT_C_F=(_Incoterm=='C_F')?_Fijo:_EUR_MT_CIF - _Seguro;
        _EUR_MT_C_F=(_Incoterm=='C_F')?_Fijo:(_Flete + _FOB) * _P_FinTrav + _Flete + _FOB;
        _EUR_MT_INSTORE=(_Incoterm=='INSTORE')?_Fijo:_GTOS_CIF_INSTORE + _EUR_MT_CIF;
        _Seg_Almacen=_EUR_MT_INSTORE * _Rs.PORCENTAJE_SEGURO_ALMACEN;
        _FinStock=_P_FinStock * _EUR_MT_INSTORE;
        _FinClientes=_P_FinCobro * _EUR_MT_INSTORE;
        _Gtos_BancFuturos=(_Rs.PORCENTAJE_GTOS_BANCARIOS + _Rs.PORCENTAJE_GTOS_BR) * _EUR_MT_INSTORE + _Rs.GTOS_M_FUTUROS_EUR;
        _Hermes=_Rs.PORCENTAJE_SEGURO_RIESGO * _EUR_MT_INSTORE;
        _CosteDescaf=(_Rs.PORCENTAJE_MERMA_DECAF * _EUR_MT_INSTORE) + (_Rs.TOLLING_DCM_USD / _Rate) + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF);
        _EUR_MT_INSTORE_RW=(_Incoterm=='INSTORE_RW')?_Fijo:_CosteDescaf + _EUR_MT_INSTORE + _Seg_Almacen + _FinStock + _FinClientes + _Gtos_BancFuturos + _Hermes + _CosteCamion;
        _EUR_MT_FOT=(_Incoterm=='FOT' && !_Palet)?_Fijo:_Gtos_INSTORE_FOT + _EUR_MT_INSTORE_RW;
        _EUR_MT_FOT_RETRC_PALET=(_Incoterm=='FOT' && _Palet)?_Fijo:_EUR_MT_FOT + ((_Retr && _Palet)?_Rs.PALETIZADO_RETRACTILADO_EUR_MT:((_Palet)?_Rs.PALET_EUR_MT:0)) ;
        _EUR_MT_FCA=(_Incoterm=='FCA')?_Fijo:_EUR_MT_FOT_RETRC_PALET;
        _EUR_MT_EXSTORE=(_Incoterm=='EXSTORE')?_Fijo:_EUR_MT_FOT_RETRC_PALET - _Rs.ESTIBA_CAM;
        //Condiciones Entrega (Precios)
        _C_F=_EUR_MT_C_F;
        _CIF=_EUR_MT_CIF;
        _FOT=(_Palet)?_EUR_MT_FOT_RETRC_PALET:_EUR_MT_FOT;
        _INSTORE=($('#ct_contratode').val()=='C')?_EUR_MT_INSTORE:_EUR_MT_INSTORE_RW;
        //DDP y DDU directamente en el "return"
        _FCA=_EUR_MT_FCA;
        _EXSTORE=_EUR_MT_EXSTORE;           
    } else { 
        _Flete=(_Rs.MT_CONTENEDOR!=0)?(_Rs.FLETE_USD_ES / _Rs.MT_CONTENEDOR):0;
        _Seguro=(_Flete + _FOB) * _Rs.PORCENTAJE_SEGURO;
        _FinTrav=(_Seguro + _Flete + _FOB) * _P_FinTrav;
        _USD_MT_CIF=(_Incoterm=='CIF')?_Fijo:_FinTrav + _Seguro + _Flete + _FOB;
        //_USD_MT_C_F=(_Incoterm=='C_F')?_Fijo:_USD_MT_CIF - _Seguro;
        _USD_MT_C_F=(_Incoterm=='C_F')?_Fijo:(_Flete + _FOB) * _P_FinTrav + _Flete + _FOB;
        _USD_MT_INSTORE=(_Incoterm=='INSTORE')?_Fijo:_GTOS_CIF_INSTORE * _Rate + _USD_MT_CIF;
        _Seg_Almacen=_USD_MT_INSTORE * _Rs.PORCENTAJE_SEGURO_ALMACEN;
        _FinStock=_P_FinStock * _USD_MT_INSTORE;
        _FinClientes=_P_FinCobro * _USD_MT_INSTORE;
        _Gtos_BancFuturos=(_Rs.PORCENTAJE_GTOS_BANCARIOS + _Rs.PORCENTAJE_GTOS_BR) * _USD_MT_INSTORE + _Rs.GTOS_M_FUTUROS_USD;
        _Hermes=_Rs.PORCENTAJE_SEGURO_RIESGO * _USD_MT_INSTORE;
        _CosteDescaf=(_Rs.PORCENTAJE_MERMA_DECAF * _USD_MT_INSTORE) + _Rs.TOLLING_DCM_USD + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF);
        _USD_MT_INSTORE_RW=(_Incoterm=='INSTORE_RW')?_Fijo:_CosteDescaf + _USD_MT_INSTORE + _Seg_Almacen + _FinStock + _FinClientes + _Gtos_BancFuturos + _Hermes + _CosteCamion;
        _USD_MT_FOT=(_Incoterm=='FOT' && !_Palet)?_Fijo:_Gtos_INSTORE_FOT * _Rate + _USD_MT_INSTORE_RW;
        _USD_MT_FOT_RETRC_PALET=(_Incoterm=='FOT' && _Palet)?_Fijo:_USD_MT_FOT + ((_Retr && _Palet)?_Rs.PALETIZADO_RETRACTILADO_EUR_MT:((_Palet)?_Rs.PALET_EUR_MT:0)) * _Rate;
        _USD_MT_FCA=(_Incoterm=='FCA')?_Fijo:_USD_MT_FOT_RETRC_PALET;
        _USD_MT_EXSTORE=(_Incoterm=='EXSTORE')?_Fijo:_USD_MT_FOT_RETRC_PALET - (_Rs.ESTIBA_CAM * _Rate);
        //Condiciones Entrega (Precios)
        _C_F=_USD_MT_C_F;
        _CIF=_USD_MT_CIF;
        _FOT=(_Palet)?_USD_MT_FOT_RETRC_PALET:_USD_MT_FOT;
        _INSTORE=($('#ct_contratode').val()=='C')?_USD_MT_INSTORE:_USD_MT_INSTORE_RW;
        //DDP y DDU directamente en el "return"        
        _FCA=_USD_MT_FCA;
        _EXSTORE=_USD_MT_EXSTORE;          
    }

    // DDP siempre tiene que ser con DESPACHO y DDU siempre SIN DESPACHO 
    _Precios={
        FOB: _FOB,
        C_F: _C_F,
        CIF: _CIF,
        FOT: _FOT,
        INSTORE: _INSTORE,
        DDP: (_Incoterm=='DDP')?_Fijo:calculateDDPDDU(_Rs, _Mda, 'DDP', {FS: _P_FinStock, FC: _P_FinCobro}, _Margen, _CIF, _Rate),
        DDU: (_Incoterm=='DDU')?_Fijo:calculateDDPDDU(_Rs, _Mda, 'DDU', {FS: _P_FinStock, FC: _P_FinCobro}, _Margen, _CIF, _Rate),
        FCA: _FCA,
        EXSTORE: _EXSTORE
    }

    return _Precios;
}

/*
* calculateDDPDDU: para calcular el valor para los incoterms DDP y DDU
* @param {Obj} _Rs: RecordSet de los datos de ESCANDALLOS
* @param {str} _Mda: Moneda del contrato
* @param {str} _Incoterm: DDP / DDU (según el que estemos calculando)
* @param {Obj} _oPrcnt: Objeto que contiene los diferentes porcentajes de costes
* @param {num} _Margen: Valor del Margen
* @param {num} _CIF: Valor del CIF correspondiente (ya viene directamente como EUR o USD)
* @param {num} _Rate: Valor del Rate de conversión
*/
function calculateDDPDDU (_Rs, _Mda, _Incoterm, _oPrcnt, _Margen, _CIF, _Rate) {
    var __GTOS_CIF_INSTORE=_Rs.OP_PUERTO + _Rs.DESPACHO + _Rs.RECEPCION + _Rs.P_ENT + _Rs._15_ALM; //Siempre DESPACHADO (para DDP)
    var _P_FinStock= _oPrcnt.FS;
    var _P_FinCobro= _oPrcnt.FC;
    var _Gtos_INSTORE_FOT=_Rs.S_ALM + _Rs.P_SALIDA + _Rs.ESTIBA_CAM; 
    var _CosteCamion=Number($('#inp_h_costecam').val()); //los gastos de trasporte de camión (tabla D6DEC_CAMIONES)
    var _Retr=$('#ct_camrtc').is(':checked');
    var _Palet=$('#ct_plt').is(':checked');
    if (_Mda=='EUR') {
        var __EUR_MT_INSTORE=__GTOS_CIF_INSTORE + _CIF - ((_Incoterm=='DDP')?0:_Rs.DESPACHO); /* DDP SIEMPRE tiene que ser DESPACHADO; en cambio DDU, NUNCA*/
        var __Seg_Almacen=__EUR_MT_INSTORE * _Rs.PORCENTAJE_SEGURO_ALMACEN;
        var __FinStock=_P_FinStock * __EUR_MT_INSTORE;
        var __FinClientes=_P_FinCobro * __EUR_MT_INSTORE;
        var __Gtos_BancFuturos=(_Rs.PORCENTAJE_GTOS_BANCARIOS + _Rs.PORCENTAJE_GTOS_BR) * __EUR_MT_INSTORE + _Rs.GTOS_M_FUTUROS_EUR;
        var __Hermes=_Rs.PORCENTAJE_SEGURO_RIESGO * __EUR_MT_INSTORE;
        var __CosteDescaf=(_Rs.PORCENTAJE_MERMA_DECAF * __EUR_MT_INSTORE) + (_Rs.TOLLING_DCM_USD / _Rate) + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF);
        var __EUR_MT_INSTORE_RW=__CosteDescaf + __EUR_MT_INSTORE + __Seg_Almacen + __FinStock + __FinClientes + __Gtos_BancFuturos + __Hermes  + _CosteCamion;
        var __EUR_MT_FOT=_Gtos_INSTORE_FOT + __EUR_MT_INSTORE_RW;
        return (__EUR_MT_FOT + ((_Retr && _Palet)?_Rs.PALETIZADO_RETRACTILADO_EUR_MT:((_Palet)?_Rs.PALET_EUR_MT:0)));  
    } else {
        var __USD_MT_INSTORE=__GTOS_CIF_INSTORE * _Rate + _CIF - ((_Incoterm=='DDP')?0:_Rs.DESPACHO * _Rate); 
        var __Seg_Almacen=__USD_MT_INSTORE * _Rs.PORCENTAJE_SEGURO_ALMACEN;
        var __FinStock=_P_FinStock * __USD_MT_INSTORE;
        var __FinClientes=_P_FinCobro * __USD_MT_INSTORE;
        var __Gtos_BancFuturos=(_Rs.PORCENTAJE_GTOS_BANCARIOS + _Rs.PORCENTAJE_GTOS_BR) * __USD_MT_INSTORE + _Rs.GTOS_M_FUTUROS_USD;
        var __Hermes=_Rs.PORCENTAJE_SEGURO_RIESGO * __USD_MT_INSTORE;
        var __CosteDescaf=(_Rs.PORCENTAJE_MERMA_DECAF * __USD_MT_INSTORE) + (_Rs.TOLLING_DCM_USD / _Rate) + (_Rs.DIAS_PROCESO_DECAF * _Rs.TIPO_INT / 360 * _Rs.DIAS_PROCESO_DECAF);
        var __USD_MT_INSTORE_RW=__CosteDescaf + __USD_MT_INSTORE + __Seg_Almacen + __FinStock + __FinClientes + __Gtos_BancFuturos + __Hermes + _CosteCamion * _Rate;
        var __USD_MT_FOT=_Gtos_INSTORE_FOT * _Rate + __USD_MT_INSTORE_RW;
        return __USD_MT_FOT + ((_Retr && _Palet)?_Rs.PALETIZADO_RETRACTILADO_EUR_MT:((_Palet)?_Rs.PALET_EUR_MT:0)) * _Rate; 
        // 
    }
}


/*
* stateModifiedInput: para cambiar de color si el valor introducido es diferente del obtenido de la BBDD
*/
function stateModifiedInput(_i) {
    var _v=$('#'+_i).val();
    if(_v!='') {
        if (d6.fmk.isNumber(_v)) _v=_v.toString().replace(',','.');
        if ($('#'+_i).attr('d6-defVal')!=_v) {
            $('#'+_i).removeClass('ui-state-default').addClass('ui-state-modified');    
        } else {
            $('#'+_i).removeClass('ui-state-modified').addClass('ui-state-default');    
        }
    };
}

/*
* comvUdad2MT: para convertir el valor fijo de una unidad concreta diferente de MT a MT (así se pueden unificar los cálculos)
* {num} _Fijo: importe fijo
* {str} _u: unidades
*/
function convUdad2MT(_Fijo,_u){
    var _FijoMT=_Fijo;
    switch((_u).toUpperCase()) {
        case 'EUR/50KGS':
        case 'USD/50KGS':
            _FijoMT=(_Fijo*1000)/50;
            break;
        case 'USD/KG':
            _FijoMT=_Fijo*1000;
            break;
        case 'USD/46KGS':
            _FijoMT=(_Fijo*1000)/46;
            break;                                
        case 'US CTS/LB':
            _FijoMT=_Fijo*0.0453592;        
            break;     
        default:
            break;                           
    }
    return _FijoMT;
}

/*
* SHMnu: para ocultar mostrar menú principal
* {str} _a: acción a realizar (H: ocultar; S: mostrar) 
*/
function SHMnu(_a) {
    switch (_a){
        case 'H':  //Ocultar menu
            $('#mnu_ppal').hide('slow');
            $('#mnu_ppal').css('width','55px');
            $('#menu_w').css('width','55px');
            $('#mnu_icon').show();
            $('#app_w').css('float','none').css('margin-left','60px');            
            break;
        case 'S':  //Ocultar menu
            $('#mnu_icon').hide('slow');
            $('#menu_w').css('width','245px');
            $('#mnu_ppal').css('width','245px');
            $('#app_w').css('float','right').css('margin-left','0px');
            $('#mnu_ppal').show();
    }
}

/*
* chgBtnCalcular: Clases a aplicar cuando el botón CALCULAR debe estar informando de que se debe ReCalcular debido a algún cambio
*/
function chgBtnCalcular(){
    $('[id^=ct_btn_calcular-').removeClass('ui-state-default').removeClass('ui-state-btn-click').addClass('ui-state-btn-click'); 
//    $('#ct_btn_calcular').hover(function(){
//        $(this).toggleClass('ui-state-btn-click'); 
//    });
}


/*
* loadAcuerdosMargen: Para recuperar el valor de los Acuerdos y Margen
*/
function loadAcuerdosMargen(_qg,_o,_mda) {
    $('#ldr').show();
    $.ajax({ 
        async: false,
        url: 'engine.asp?a=rdam&qg=' + _qg + '&o=' + _o,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            var _Acuerdos, _Margen, _Rate;

            switch (data.Result) {
                case 'OK':
                    d6.fmk.cLog('ACUERDOS y MARGEN (QG: ' + _qg + ' / O: ' + _o);
                    if (data.Records.length==0) {
                        _Acuerdos=0; 
                        _Margen=0; 
                    } else {
                        _Rate=data.Records[0].RATE;
                        _Acuerdos=data.Records[0].ACUERDOS_USD;
                        _Acuerdos=(_mda=='EUR')?_Acuerdos/_Rate:_Acuerdos;
                        _Margen=data.Records[0].MARGEN_EUR_MT;
                        _Margen=(_mda=='EUR')?_Margen:_Margen/_Rate;
                    }
                    d6.fmk.cLog('Acuerdos: ' + _Acuerdos);
                    d6.fmk.cLog('Margen: ' + _Margen);
                    $('#ct_acuerdos').val(d6.fmk.number_format(_Acuerdos,2,',',".")); 
                    $('#ct_margen').val(d6.fmk.number_format(_Margen,2,',',".")); 
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Recuperación ACUERDOS y MARGEN]');
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide();
        }
    });
}

/*
* LoadFletesOrigenDestino: Para cargar el Origen y Destino por defecto [FLETES]
* @param {str} _o: origin (código)
*/
function LoadFletesOrigenDestino(_o){
    var _Origen, _Destino;
    if (_o==undefined) {_o=''; }
    $('#ldr').show();
    $.ajax({ 
        async: false,
        url: 'engine.asp?a=rdfod&o=' + _o,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    d6.fmk.cLog('[LoadFletesOrigenDestino] OriginNo: ' + _o);
                    if (data.Records.length==0) {
                        _Origen=''; 
                        _Destino='Barcelona'; 
                    } else {
                        _Origen=data.Records[0].PortOfLoading;
                        _Destino=data.Records[0].Destination;
                    }
                    d6.fmk.cLog('Origen: ' + _Origen);
                    d6.fmk.cLog('Destino: ' + _Destino);
                    d6.fmk.setValue('#ct_fltogn',_Origen); 
                    d6.fmk.loadCBox('#ct_fltdst', 'engine.asp?a=rcbfd&o='+_Origen, _Destino, {
                        select: function(event, ui){
                            if($('#ct_fltogn').val()!=='') {
                                showFletesInfo($('#ct_fltogn').val(), $(this).val());
                            }
                            //Cambio de color
                            stateModifiedSelect(this);            
                        }
                    }, false);                         
                    //d6.fmk.setValue('#ct_fltdst',_Destino); 
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Recuperación ORIGEN y DESTINO]');
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide();
        }
    });
}

/*
* LoadFletesOrigenDestino: Para cargar el Origen y Destino por defecto [FLETES]
* @param {str} _o: origin (código)
*/
function LoadCamionesOrigenDestino(_o){
    var _Origen, _Destino;
    if (_o==undefined) {_o=''; }
    $('#ldr').show();
    $.ajax({ 
        async: false,
        url: 'engine.asp?a=rdcod&o=' + _o,
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    d6.fmk.cLog('[LoadCamionesOrigenDestino] OriginNo: ' + _o);
                    if (data.Records.length==0) {
                        _Origen='Barcelona'; 
                        _Destino='Barcelona'; 
                    } else {
                        _Origen=data.Records[0].ORIGEN;
                        _Destino=data.Records[0].DESTINO;
                    }
                    d6.fmk.cLog('Origen: ' + _Origen);
                    d6.fmk.cLog('Destino: ' + _Destino);
                    d6.fmk.setValue('#ct_camogn',_Origen); 
                    d6.fmk.loadCBox('#ct_camdst', 'engine.asp?a=rcbcd&o='+_Origen, _Destino, {        
                        select: function(event, ui){
                            //$('#spn_info_flt_nodata, #spn_info_flt').hide();
                            if($('#ct_camogn').val()!=='') {
                                showCamionesInfo($('#ct_camogn').val(), $(this).val());
                            }
                            //Cambio de color
                            stateModifiedSelect(this);            
                        }  
                    }, false); 
                    //d6.fmk.setValue('#ct_camdst',_Destino); 
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Recuperación ORIGEN y DESTINO]');
                    break;
            } 
        },
        complete: function(){
            $('#ldr').hide();
        }
    });
}

/*
* ChkUSR: Para controlar si el usuario puede o no acceder a la aplicación
*/
function ChkUSR(){
    var bAllow=false;
    $('#ldr').show();
    $.ajax({ 
        async: true,
        url: 'engine.asp?a=chkusr',
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            switch (data.Result) {
                case 'OK':
                    d6.fmk.cLog('[ChkUSR] Usuario: ' + data.Records[0].USR);
                    bAllow=true;
                    if (data.Records[0].USRFOUND==0) {
                        bAllow=false; 
                        DlgInfo('<br/><br/>Tu usuario (' + data.Records[0].USR + ') no tiene permiso para acceder.<br/><br/>Si deberías poder tener acceso, contacta con el administrador.','txtDlgErr', '[Control de ACCESO]'
                            ,undefined,undefined,undefined,true);
                        //Ocultamos el botón de cerrar
                        $('div.ui-dialog-titlebar button').hide();
                        //Deshabilitamos el link del botón HISTÓRICO
                        $("li.mnuItm").attr('class','mnuItmOut');
                        $("a#mnuHst").attr('onclick','').attr('class','lnkMnuOut');
                        //Ocultamos el área de trabajo
                        $('#app_w').hide();
                    } else {
                        $('#app_w').show();
                    }
                    break;
                case 'ERROR':
                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Control de ACCESO]');
                    break;
            } 
            return bAllow;
        },
        complete: function(){
            $('#ldr').hide();
            return bAllow;
        }
    });
}

/*
* ShowHideAplicacion: para mostrar u ocultar las APLICACIONES
* @param  {str} _n: número de aplicación
* @param  {str} _id: id del SPAN que contiene el [+] / [-] para poder cambiarlo según esté o no oculto
*/
function ShowHideAplicacion(_n, _id) {
    var _img;
    if (_n=='+' || _n=='-') {
        for (var i = 1; i <= 13; i++) {
            if (_n=='+') {
                $('#ct_apl-tr-'+ i).show();
                _img=($('#ct_shapl-'+ i +' img').attr('src')).replace('/vi','/invi');
                $('#ct_shapl-'+ i +' img').attr('src', _img);
            } else {
                $('#ct_apl-tr-'+ i).hide();
                _img=($('#ct_shapl-'+ i +' img').attr('src')).replace('/invi','/vi');
                $('#ct_shapl-'+ i +' img').attr('src', _img);
            }
        }
    } else {
        $('#ct_apl-tr-'+_n).toggle();
        if ($('#ct_apl-tr-'+_n).css('display')=='none') {
            _img=($('#ct_shapl-'+ _n +' img').attr('src')).replace('/invi','/vi');
            $('#'+_id+' img').attr('src', _img);
            $('#'+_id).attr('title','Mostrar APLICACIÓN '+_n);
        } else {
            _img=($('#ct_shapl-'+ _n +' img').attr('src')).replace('/vi','/invi');
            $('#'+_id+' img').attr('src', _img);
            $('#'+_id).attr('title','Ocultar APLICACIÓN '+_n);
        }
    }
}

/* -- Variables -- */

var dHoy = new Date();
var tDelayEffect = 200; //Para indicar en milisegundos el tiempo que dura un efecto (Show/Hide)
var g_lstFldLd; // loadFieldsCtto(): Variable global que contiene los campos que ya tienen tratamiento para ser cargados en el Ctto y no se hará en base a los input[type=hidden] con ID inp_h_fld. 
g_lstFldLd='QualGrpNo,QualityGroup,OrigNo,Origin,QualNo,Quality,AccNo,CurrName,Comp,Ctr,CTRDATE,OutRightPrice,NetDiff,TotalKg,AccNo3,Agent,CondCode,Condition,';
g_lstFldLd+='NetStockExch,PriceType,NetFuturesMonth,ShipmDateAAAAMM';
var g_Grid; //Grid elegido para la selección del contrato
var g_TblPrecios; //Informa de si está o no visible la tabla de precios para así saber si se debe recalcular o no al modificar cualquier elemento del formulario que le afecte 
var g_cd_pre; //Valor previo a la selección del CONTRATODE en [CTTO]
var g_bModP; //true: cuando se modifica el PRECIO del contrato (FIJO)
var g_nModP; //Nº de modificación para el PRECIO
var g_bModA; //true: cuando se modifica alguna APLICACIÓN del contrato
var g_nModA; //Nº de modificación para APLICACIÓN
var g_bModE; //true: cuando se modifica cualquier elemento que no sea ni PRECIO ni APLICACIÓN del contrato
var g_nModE; //Nº de modificación para el RESTO
var g_AplHtml; //Código HTML de la base para APLICACIONES

/*---------------*/
/*-- Principal --*/
/*---------------*/
$('#app_w').hide();
$(document).ready(function () {
    //Working...
    $('#ldr').show();
    //Cuando se modifique un select, cambiará el color del borde
    //Por defecto, incorporamos este comportamiento a todos los tags SELECT para cuano se haga la selección de un elemento (Evento select:)
    $('div#wrp_ctto select').addClass('d6-modified');
    $('div#wrp_ctto select.d6-modified').combobox({select: function(){
        d6.fmk.cLog('autocompletechange: ' + $(this).attr('id'));
        //cambio color por modificación
        stateModifiedSelect(this);
    }});
    //Para controlar el cambio del autocomplete en el caso de que no haya selección de elementos, sino que se escriba todo manualmente.
    $('div#wrp_ctto select').each(function(){
        var _t=this;
        $(this).parent().find('input').each(function(){
            $(this).change(function(_e,_i){
                d6.fmk.cLog('autocompletechange(input): ' + $(_t).attr('id'));
                if ($(_t).attr('id')=='ct_qltc') { //Si se ha modificado la CALIDAD-CLIENTE a mano...
                    $('#inp_h_txt_qltc').val($('#ct_qltc').siblings().find('input').val().trim()); //Recogemos el valor del INPUT asociado (dónde está el texto escrito) para incluirlo en el d6-field
                    //Cambio de color si hay modificación
                    var _v=$('#inp_h_txt_qltc').val();
                    if(_v!='') {
                        if (d6.fmk.isNumber(_v)) _v=_v.toString().replace(',','.');
                        if ($('#inp_h_txt_qltc').attr('d6-defVal')!=_v) {
                            $('#ct_qltc').parent().find('input').removeClass('ui-state-default').addClass('ui-state-modified'); 
                        } else {
                            $('#ct_qltc').parent().find('input').removeClass('ui-state-modified').addClass('ui-state-default');    
                        }
                    };                    
                    //$('#inp_h_fld_CALIDAD_CLIENTE').val($('#ct_qltc').siblings().find('input').val().trim()); //Cargamos el d6-field
                    $('#ldr').show();
                    $.ajax({ //Verificamos si el nuevo valor ya existe o no en la tabla de CALIDAD-CLIENTE
                        async: false,
                        url: 'engine.asp?a=rcbqc&qg=' + $('#ct_cod-qgr').val() + '&o=' + $('#ct_cod-ogn').val() + '&q=' + $('#ct_cod-qlt').val() + '&c=' + $('#ct_cod-clpr').val(),
                        dataType: 'json',
                        cache: false,
                        success: function(data, textStatus, jqXHR){
                            switch (data.Result) {
                                case 'OK':
                                    d6.fmk.cLog('autocompletechange [Chk CALIDAD-CLIENTE]> Value:' + ((data.Records.length>0)?data.Records[0].Value:'undefined') + ' / #inp_h_txt_qltc: ' + $('#inp_h_txt_qltc').val());
                                    if (data.Records.length==0) {
                                        $('#inp_h_qltc_nuevo').val('S'); //Nuevo valor porque hasta ahora no había ninguno
                                    } else {
                                        if ((data.Records[0].Value).trim()==$('#inp_h_txt_qltc').val()) {
                                            $('#inp_h_qltc_nuevo').val('N'); //Se indica que NO hay un nuevo valor
                                        } else {
                                            $('#inp_h_qltc_nuevo').val('S'); //Se indica que hay un nuevo valor
                                        }
                                    }
                                    d6.fmk.cLog('autocompletechange [Chk CALIDAD-CLIENTE]> inp_h_qltc_nuevo:' + $('#inp_h_qltc_nuevo').val());
                                    break;
                                case 'ERROR':
                                    DlgInfo(data.Message, 'txtDlgErr', '¡ERROR! [Comprobación NUEVA Calidad Cliente]');
                                    break;
                            } 
                        },
                        complete: function(){
                            $('#ldr').hide();
                        }
                    });                    
                } 
            });            
        });
    });


    //Para evitar que el navegador recuerde valores de una carga o introducción de datos anterior.
    $('input').attr('autocomplete','off');

    Main();

    //Cuando se modifique un input, cambiará el color del borde
    $('input').change(function(){
        //$(this).css('color','green');
        stateModifiedInput(this.id);
    });
    $('#ldr').hide();
    $('#app_w').show();
    //Para mostrar Diálogo con los valores que se van a guardar en la BBDD del CONTRATO: CTRL + ALT + C
    //http://www.cambiaresearch.com/articles/15/javascript-key-codes
    $(document).keydown(function(e) {
        if (e.keyCode == 67 && e.ctrlKey && e.altKey) {
            showFieldsInfo();
            d6.fmk.cLog('Pulsado Ctrl+Alt+C > Diálogo valores del Contrato.');            
        }
    });  
    //Para mostrar diálogo con campos obligatorios: CTRL + ALT + O
    $(document).keydown(function(e) {
        if (e.keyCode == 79 && e.ctrlKey && e.altKey) {
            showFieldsRequired();
            d6.fmk.cLog('Pulsado Ctrl+Alt+O > Diálogo campos obligatorios del Contrato.');            
        }
    });  
    //Al cerrar el diálogo, nos colocamos en el principio
    $('div#dlg').on('dialogclose', function(event) {
        $('body').ScrollTo();
    });
    //Listado eventos SELECT / INPUT
    //$('select,input').listHandlers('*', console.info);  
    //d6.fmk.cLog($.eventReport('input'));        

    //CONTROL DE USUARIO
    ChkUSR();

}); // document.ready
    
