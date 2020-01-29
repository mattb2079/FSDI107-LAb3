//var serverURL = "http://restclass.azurewebsites.net/API/";
var serverURL = "http://localhost:8080/api/";

function Item(code, desc, price, image, category, stock, deliveryDays){
    this.code = code;
    this.description = desc;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.deliveryDays = deliveryDays;
    this.user = "Matt";
}

function clearForm(){
    $("#txtCode").val("");
    $("#txtCode").focus();
    $("#txtDescription").val("");
    $("#txtPrice").val("");
    $("#txtImage").val("");
    $("#txtCategory").val("");
    $("#txtStock").val("");
    $("#txtDeliveryDays").val("");
}

function saveItem(){
    // get the values

    var code = $("#txtCode").val();
    var desc = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var category = $("#txtCategory").val();
    var stock = $("#txtStock").val();
    var deliveryDays = $("#txtDeliveryDays").val();

    // create an object
    var theItem = new Item(code, desc, price, image, category, stock, deliveryDays)
    console.log(theItem);

    var jsonString = JSON.stringify(theItem);
    console.log(jsonString);


    // send the object to the server
    $.ajax({
        url: serverURL + "items",
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        success: function(response){
            console.log("Yeah, it works!", response);
            clearForm();

            // show notification
            $('#alertSuccess').removeClass("hidden");

            // setTimeout(fn, milliseconds);
            setTimeout( function(){
                $("#alertSuccess").addClass("hidden");
            }, 3000);
        },
        error: function(errorDetails){
            console.log("Error: ", errorDetails);
        }
    });
}

function testAjax(){

    // Asynchronous JavaScript And XML communication

    $.ajax({
        url: serverURL + "test",
        type: 'GET',
        success: function(res){
            console.log("Server says", res);
        },
        error: function(err){
            console.log("Error ocurred", err);
        }
    });

}

function init(){
    console.log("This is Admin page!!");

    // retrieve initial data

    // hook events
    $("#btnSave").click(saveItem);
}


window.onload = init;