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
        {"data":null,"defaultContent":"<button class='btn btn-primary' id='btnModificar'>Modificar</button>"},
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
        }
    });
});

$("#table tbody").on('click','#btnModificar',function(){
    $("#btnUpdate").attr('class','btn btn-primary d-line');
    $("#btnCancel").attr('class','btn btn-danger d-line');
    $("#btnSend").attr('class','btn btn-success d-none');

    var data = tabla.row($(this).parent().parent()).data();
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
        }
    })

})