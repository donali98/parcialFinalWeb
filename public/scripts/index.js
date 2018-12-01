var urlUpdate = '';
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
        {"data":null,"defaultContent":"<button class='btn btn-primary' id='btnModificar'><i class='fas fa-pen-alt'></i></button> <button class='btn btn-danger' id='btnEliminar'><i class='fas fa-trash-alt'></i></button>"},
    ]
});

$("#btnSend").on('click',function(ev){
    

    ev.preventDefault();
    $.ajax({
        url:'/api/skin',
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

$("#table tbody").on('click','#btnEliminar',function(ev){
    ev.preventDefault();
    var data = tabla.row($(this).parent().parent()).data();

    $("#btnUpdate").attr('class','btn btn-primary d-none form-control');
    $("#btnCancel").attr('class','btn btn-danger d-none form-control');
    $("#btnSend").attr('class','btn btn-success d-line form-control');

    $.ajax({
        url:'/api/skin/'+data._id,
        method:'delete',
        success:function(res){
            tabla.ajax.reload();
        },
        error:function(err){
            console.log(err);
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

    urlUpdate = '/api/skin/'+data._id;
    $("#btnUpdate").attr('class','btn btn-primary d-line form-control');
    $("#btnCancel").attr('class','btn btn-danger d-line form-control');
    $("#btnSend").attr('class','btn btn-success d-none form-control');


});

$("#btnUpdate").on('click',function(ev){
    
    ev.preventDefault();
    $.ajax({
        url:urlUpdate,
        method:"put",
        data:{campeon:$("#campeon").val(),coleccion:$("#coleccion").val(),precio:$("#precio").val()},
        success:function(res){
            tabla.ajax.reload();
            $("#campeon").val('');
            $("#coleccion").val('');
            $("#precio").val('');

            $("#btnUpdate").attr('class','btn btn-primary d-none form-control');
            $("#btnCancel").attr('class','btn btn-danger d-none form-control');
            $("#btnSend").attr('class','btn btn-success d-line form-control');
        },
        error:function(err){

             if(err.responseJSON.error){
                alert(err.responseJSON.error.details[0].message);
            }
            else if(err.responseJSON.errmsg){
                alert(err.responseJSON.errmsg);
            }
            else if(err.responseText){
                alert('Hubo un error, verifique que el registro que se desea ingresar es valido o no esta repetido');
            }
        }
    })

});

$("#btnCancel").on('click',function(ev){
    ev.preventDefault();
    $("#campeon").val('');
    $("#coleccion").val('');
    $("#precio").val('');
    $("#btnUpdate").attr('class','btn btn-primary d-none form-control');
    $("#btnCancel").attr('class','btn btn-danger d-none form-control');
    $("#btnSend").attr('class','btn btn-success d-line form-control');
})