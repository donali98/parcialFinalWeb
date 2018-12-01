var urlBase = '/api/skin';

var tabla = $("#table").DataTable({
    "ajax":{
        "url":"/api/skin",
        "dataSrc":""
    },
    columns:[
        {"data":"_id"},
        {"data":"campeon"},
        {"data":"coleccion"},
        {"data":"precio"},
        {"data":null,"defaultContent":"<button class='btn btn-primary' id='btnModificar'>Modificar</button> <button class='btn btn-danger' id='btnEliminar'>Eliminar</button>"},
    ]
});

$("#btnSend").on('click',function(ev){
    
    urlBase = '/api/skin';

    ev.preventDefault();
    $.ajax({
        url:urlBase,
        method:"post",
        data:{campeon:$("#campeon").val(),coleccion:$("#coleccion").val(),precio:$("#precio").val()},
        success:function(res){
            tabla.ajax.reload();
        },
        error:function(err){
            if(err.responseJSON.error){
                alert(err.responseJSON.error.details[0].message);
            }
            if(err.responseJSON.errmsg){
                alert(err.responseJSON.errmsg);
            }
        }
    });
});

$("#table tbody").on('click','#btnEliminar',function(){

    var data = tabla.row($(this).parent().parent()).data();


    urlBase = urlBase+'/'+data._id;

    $("#btnUpdate").attr('class','btn btn-primary d-none');
    $("#btnCancel").attr('class','btn btn-danger d-none');
    $("#btnSend").attr('class','btn btn-success d-line');

    $.ajax({
        url:urlBase,
        method:'delete',
        success:function(res){
            tabla.ajax.reload();
        },
        error:function(err){
            if(err.responseJSON.error){
                alert(err.responseJSON.error.details[0].message);
            }
            if(err.responseJSON.errmsg){
                alert(err.responseJSON.errmsg);
            }
        }
    })

});
$("#table tbody").on('click','#btnModificar',function(){

    var data = tabla.row($(this).parent().parent()).data();

    $("#campeon").val(data.campeon);
    $("#coleccion").val(data.coleccion);
    $("#precio").val(data.precio);


    $("#btnUpdate").attr('class','btn btn-primary d-line');
    $("#btnCancel").attr('class','btn btn-danger d-line');
    $("#btnSend").attr('class','btn btn-success d-none');

    urlBase = urlBase+'/'+data._id;

});

$("#btnUpdate").on('click',function(ev){
    
    ev.preventDefault();
    $.ajax({
        url:urlBase,
        method:"put",
        data:{campeon:$("#campeon").val(),coleccion:$("#coleccion").val(),precio:$("#precio").val()},
        success:function(res){
            tabla.ajax.reload();
            $("#campeon").val('');
            $("#coleccion").val('');
            $("#precio").val('');

            $("#btnUpdate").attr('class','btn btn-primary d-none');
            $("#btnCancel").attr('class','btn btn-danger d-none');
            $("#btnSend").attr('class','btn btn-success d-line');
        },
        error:function(err){
            if(err.responseJSON.error){
                alert(err.responseJSON.error.details[0].message);
            }
            else if(err.responseJSON.errmsg){
                alert(err.responseJSON.errmsg);
            }
            else alert('Hubo un error, verifique que el registro que se desea ingresar es valido o no esta repetido');
        }
    })

});

$("#btnCancel").on('click',function(ev){
    ev.preventDefault();
    $("#campeon").val('');
    $("#coleccion").val('');
    $("#precio").val('');
    $("#btnUpdate").attr('class','btn btn-primary d-none');
    $("#btnCancel").attr('class','btn btn-danger d-none');
    $("#btnSend").attr('class','btn btn-success d-line');
})