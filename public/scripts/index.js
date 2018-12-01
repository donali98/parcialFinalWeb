var tabla = $("#table").DataTable({
    "ajax":{
        "url":"/api/lolers",
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
    ev.preventDefault();
    $.ajax({
        url:"/api/lolers",
        method:"post",
        data:{campeon:$("#campeon").val(),coleccion:$("#coleccion").val(),precio:$("#precio").val()},
        success:function(res){
            tabla.ajax.reload();
        }
    })
})