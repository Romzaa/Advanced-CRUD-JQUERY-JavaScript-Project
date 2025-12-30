//==================CHANGE SOURCE====================

$("#vanillaBtn").click(function () {

    $("#scriptMain").attr("src", "Script-Vanilla.js");

})
$("#jqueryBtn").click(function () {

    $("#scriptMain").attr("src", "Script-Jquery.js");
});



//==========Display===============

let modeBtn = document.getElementById("modeBtn");
let dispBtn = document.getElementById("dispBtn");
let nav = document.getElementById("navBar");
let body = document.getElementById("body");
let inputBg = document.getElementById("inputBg");
let footer = document.getElementById("footer")
let inputs = document.getElementsByTagName("input");
let cardOut = document.getElementsByClassName("cardOut");
let mainOut = document.getElementById("mainOut");
let Modal = document.getElementById("modalBody");
let ModalF = document.getElementById("modalF");

dispBtn.addEventListener('click', function () {
    if (modeBtn.classList.contains("bi-moon-stars-fill")) {
        modeBtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high");
    } else {
        modeBtn.classList.replace("bi-brightness-high", "bi-moon-stars-fill");

    }
    if (dispBtn.classList.contains("btn-dark")) {
        dispBtn.classList.replace("btn-dark", "btn-light");
    } else {
        dispBtn.classList.replace("btn-light", "btn-dark");

    }
    if (nav.classList.contains("bg-primary")) {
        nav.classList.replace("bg-primary", "bg-black");
    } else {
        nav.classList.replace("bg-black", "bg-primary");

    }


    body.classList.toggle("bg-dark");

    if (inputBg.classList.contains("bg-light")) {
        inputBg.classList.replace("bg-light", "bg-black");
    } else {
        inputBg.classList.replace("bg-black", "bg-light");

    }

    if (formIn.classList.contains("bg-white")) {
        formIn.classList.replace("bg-white", "bg-dark");
    } else {
        formIn.classList.replace("bg-dark", "bg-white");

    }

    if (mainOut.classList.contains("bg-light")) {
        mainOut.classList.replace("bg-light", "bg-black");
    } else {
        mainOut.classList.replace("bg-black", "bg-light");

    }
    if (Modal.classList.contains("bg-light")) {
        Modal.classList.replace("bg-light", "bg-dark");
    } else {
        Modal.classList.replace("bg-dark", "bg-light");

    }
    if (ModalF.classList.contains("bg-light")) {
        ModalF.classList.replace("bg-light", "bg-dark");
    } else {
        ModalF.classList.replace("bg-dark", "bg-light");

    }
    if (footer.classList.contains("bg-light")) {
        footer.classList.replace("bg-light", "bg-black");
    } else {
        footer.classList.replace("bg-black", "bg-light");

    }


    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains("bg-white")) {
            inputs[i].classList.replace("bg-white", "bg-secondary");
        } else {
            inputs[i].classList.replace("bg-secondary", "bg-white");

        }

    }



    for (let f = 0; f < cardOut.length; f++) {
        if (cardOut[f].classList.contains("bg-white")) {
            cardOut[f].classList.replace("bg-white", "bg-dark");
        } else {
            cardOut[f].classList.replace("bg-dark", "bg-white");
        }
    }
    CardFc();


})

let CardMode;
let CardFc = function () {
    CardMode = body.classList.contains("bg-dark") ? "bg-dark" : "bg-white";
}

//==========CRUD==================

let formIn = document.getElementById("formIn");
let nameIn = document.getElementById("nameIn");
let emailIn = document.getElementById("emailIn");
let salaryIn = document.getElementById("salaryIn");
let imageIn = document.getElementById("imageIn");

let noEmployees = document.getElementById("noEmployees")

let areaOut = document.getElementById("areaOut");

let editModal = new bootstrap.Modal(document.getElementById("editModal"));


let newEmployees = [];
newEmployees = JSON.parse(localStorage.getItem("newEmployees")) || [];




formIn.addEventListener('submit', function (e) {
    e.preventDefault();

    let newEmployee = {
        id: Date.now(),
        name: nameIn.value,
        email: emailIn.value,
        salary: salaryIn.value,
        image: imageIn.value
    }




    newEmployees.push(newEmployee);
    insertEmp(newEmployee);

    localStorage.setItem("newEmployees", JSON.stringify(newEmployees));


    formIn.reset();




})







function insertEmp(emp, index) {
    CardFc();

    areaOut.innerHTML = ""

    newEmployees.forEach((emp, index) => {


        areaOut.innerHTML +=
            `


                <div class="card cardOut shadow border-0 ${CardMode} mx-2 mt-4 " style="width: clamp(22% , 260px , 60%);">
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
                                <button class="btn btn-warning rounded-4" onclick="editEmp(${emp.id})"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-danger rounded-4" onclick="deleteEmp(${index})"><i class="bi bi-trash3"></i></button>

                                </div>


                        </div>

                    </div>

                </div>


    `;
    });

    if (newEmployees.length !== 0) {
        noEmployees.style.display = "none";
    } else {
        noEmployees.style.display = "block";
    }


}

insertEmp();


function deleteEmp(index) {

    if (!confirm("Do You Want To Delete This Card ?")) return;

    newEmployees.splice(index, 1);
    localStorage.setItem("newEmployees", JSON.stringify(newEmployees));

    insertEmp();
    if (newEmployees.length !== 0) {
        noEmployees.style.display = "none";
    }

}




function editEmp(clickedId) {
    let selectedEmp = newEmployees.find(obj => obj.id === clickedId)
    if (!selectedEmp) return;

    document.getElementById("editName").value = selectedEmp.name
    document.getElementById("editEmail").value = selectedEmp.email
    document.getElementById("editSalary").value = selectedEmp.salary
    document.getElementById("editImg").value = selectedEmp.image

    document.getElementById("editModal").dataset.id = clickedId;


    editModal.show();

}


let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener('click', function () {
    let clickedId = Number(document.getElementById("editModal").dataset.id);
    let selectedEmp = newEmployees.find(obj => obj.id === clickedId);

    selectedEmp.name = document.getElementById("editName").value;
    selectedEmp.email = document.getElementById("editEmail").value;
    selectedEmp.salary = document.getElementById("editSalary").value;
    selectedEmp.image = document.getElementById("editImg").value;

    localStorage.setItem("newEmployees", JSON.stringify(newEmployees));
    editModal.hide();
    insertEmp();
})