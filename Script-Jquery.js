//==================CHANGE SOURCE====================

$("#vanillaBtn").click(function () {

    $("#scriptMain").attr("src", "Script-Vanilla.js");

})
$("#jqueryBtn").click(function () {

    $("#scriptMain").attr("src", "Script-Jquery.js");
})

//================DISPLAY=================
$("#dispBtn").click(function () {
    $("#modeBtn").toggleClass("bi-moon-stars-fill bi-brightness-high");

    $("#dispBtn").toggleClass("btn-dark btn-light");

    $("#navBar").toggleClass("bg-black bg-primary");

    $("body").toggleClass("bg-dark");

    $("section").toggleClass("bg-light bg-black");

    $("input").toggleClass("bg-white bg-secondary");

    $(".card").toggleClass("bg-dark bg-white");

    $(".modalJQ").toggleClass("bg-dark bg-light");

    $("footer").toggleClass("bg-black bg-light");
    CardFc()
})
let CardMode;
let CardFc = function () {
    CardMode = $("body").hasClass("bg-dark") ? "bg-dark" : "bg-white";

}



//===================CRUD=======================
let Employees = [];
Employees = JSON.parse(localStorage.getItem("Employees")) || [];

Employees.length !== 0 ? $("#noEmployees").hide() : $("#noEmployees").show();

$("#formIn").submit(function (e) {
    e.preventDefault();

    let newEmployee = {
        id: Date.now(),
        name: $("#nameIn").val(),
        email: $("#emailIn").val(),
        salary: $("#salaryIn").val(),
        image: $("#imageIn").val()
    };

    Employees.push(newEmployee);

    localStorage.setItem("Employees", JSON.stringify(Employees));

    Employees.length !== 0 ? $("#noEmployees").hide() : $("#noEmployees").show();
    renderEmployees();
    this.reset();

});

function renderEmployees() {
    CardFc()
    let card = "";
    $.each(Employees, function (i, emp) {
        card +=
            `
        
                <div id="cardOut" class="card shadow border-0 ${CardMode} mx-2 mt-4 " style="width: clamp(22% , 260px , 60%);">
                    <div class="card-header bg-primary">
                        <h3 class="text-light my-0">Employee Card</h3>
                    </div>
                    <div class="card-body ">
                        <div class="justify-items-start">
                            <img id="imageOut" src="${emp.image}" alt="" class="w-100 rounded-2">
                        </div>
                        <div class=" mt-3 d-flex flex-column">
                            <div class="text-start">
                                <h6 class = "mb-2 text-black"><span class="text-primary"> Name : </span>${emp.name}</h6>
                                <h6 class="text-black"><span class="text-primary">Email : </span>${emp.email}</h6>
                                <h6 class="text-black"><span class="text-primary">salary : </span>${emp.salary}</h6>
                            </div>
                            <div class="align-self-end mb-0">
                                <button class="btn btn-warning rounded-4" onclick="editEmp(${i})"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-danger rounded-4" onclick="deleteEmp(${i})"><i class="bi bi-trash3"></i></button>

                                </div>


                        </div>

                    </div>

                </div>


        `
    })

    $("#areaOut").html(card);



}

renderEmployees()


//===================DELETE===========================

function deleteEmp(Clickedi) {

    if (!confirm("Do You Want To Delete This Card ?")) return;

    Employees.splice(Clickedi, 1);

    Employees.length !== 0 ? $("#noEmployees").hide() : $("#noEmployees").show();

    localStorage.setItem("Employees", JSON.stringify(Employees));

    renderEmployees()


}



//===================EDIT===========================
const editModal = new bootstrap.Modal(document.getElementById("editModal"));

let editIndex;

function editEmp(ClickedI) {

    editIndex = ClickedI;

    $("#editName").val(Employees[ClickedI].name);
    $("#editEmail").val(Employees[ClickedI].email);
    $("#editSalary").val(Employees[ClickedI].salary);
    $("#editImg").val(Employees[ClickedI].image);

    editModal.show();

}


//===================SAVE===========================
$("#saveBtn").click(function () {


    Employees[editIndex].name = $("#editName").val();
    Employees[editIndex].email = $("#editEmail").val();
    Employees[editIndex].salary = $("#editSalary").val();
    Employees[editIndex].image = $("#editImg").val();


    localStorage.setItem("Employees", JSON.stringify(Employees));

    editModal.hide();

    renderEmployees();

})