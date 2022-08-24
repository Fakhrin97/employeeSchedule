let salaryForm = document.querySelector("#salary-form");
let workerTable = document.querySelector("#worker-table");
let filterForm = document.querySelector("#filter");
let list = document.querySelector("#list");
let sortAz = document.querySelector("#sortA-Z");
let sortZa = document.querySelector("#sortZ-A");

let workers = JSON.parse(localStorage.getItem("workers"));

if (workers == null) {
  localStorage.setItem("workers", JSON.stringify([]));
  workers = [];
}
showTable();
function showTable() {
  if (workers.length < 1) {
    list.classList.add("active");
  } else {
    list.classList.remove("active");
  }
}

function editEl(ev) {
  ev.parentElement.parentElement.querySelectorAll("input").forEach((inp) => {
    if (inp.hasAttribute("disabled")) {
      inp.removeAttribute("disabled");
    } else {
      inp.setAttribute("disabled", "");
    }
  });
}

function removeEl(ev, workerId) {
  //Tableden setri silmek ucun
  ev.parentElement.parentElement.parentElement.remove();
  //Id ile hemen elmenti tapir
  let worker = workers.findIndex((w) => w.id == workerId);

  //Arryden hemen elmenti silir
  workers.splice(worker, 1);
  localStorage.setItem("workers", JSON.stringify(workers));
  showTable();
}

function updateName(ev, workerId) {
  let currentName = ev.value;
  let worker = workers.find((w) => w.id == workerId);
  worker.name = currentName;
  localStorage.setItem("workers", JSON.stringify(workers));
}

function updateSurname(ev, workerId) {
  let currentSurname = ev.value;
  let worker = workers.find((w) => w.id == workerId);
  worker.surname = currentSurname;
  localStorage.setItem("workers", JSON.stringify(workers));
}

function updateSalary(ev, workerId) {
  let currentSurname = ev.value;
  let worker = workers.find((w) => w.id == workerId);
  worker.salary = currentSurname;
  localStorage.setItem("workers", JSON.stringify(workers));
}
//Sort A-Z
sortAz.addEventListener('click',function(){
    workers.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      workerTable.innerHTML=`
  
      <tr>
           <th>Id</th>
            <th>Name</th>
           <th>Suranme</th>
           <th>Salary</th>
       </tr>
   
   `
      workers.forEach((worker) => {
        let list = "";
        list = `
                <tr>
                     <td>
                        ${worker.id} 
                     </td>
                     <td>
                        <input
                           type="text"
                           value="${worker.name}"
                           disabled
                           onchange="updateName(event.target, ${worker.id})">
                      </td>
                      <td>
                         <input 
                           type="text"
                           value="${worker.surname}"
                           disabled
                           onchange="updateSurname(event.target, ${worker.id})"> 
                      </td>
                      <td>
                         <input
                           style="width: 60px;"
                           type="number"
                           value="${worker.salary}"
                           disabled 
                           onchange="updateSalary(event.target, ${worker.id})" >
                           AZN
                      </td>
                      
                      <td>
                         <button
                           onclick="editEl(event.target ,${worker.id})">
                           Edit
                         </button>
                      </td>
                      <td>
                         <button
                         onclick="removeEl(event.target ,${worker.id})">
                         <i class="fa-solid fa-trash-can"></i>
                         </button>
                      </td>
                </tr>
          `;
        workerTable.innerHTML += list;
      });
      
})
//Sort Z-A
sortZa.addEventListener('click',function(){
    workers.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      workerTable.innerHTML=`
  
      <tr>
           <th>Id</th>
            <th>Name</th>
           <th>Suranme</th>
           <th>Salary</th>
       </tr>
   
   `
      workers.reverse().forEach((worker) => {
        let list = "";
        list = `
                <tr>
                     <td>
                        ${worker.id} 
                     </td>
                     <td>
                        <input
                           type="text"
                           value="${worker.name}"
                           disabled
                           onchange="updateName(event.target, ${worker.id})">
                      </td>
                      <td>
                         <input 
                           type="text"
                           value="${worker.surname}"
                           disabled
                           onchange="updateSurname(event.target, ${worker.id})"> 
                      </td>
                      <td>
                         <input
                           style="width: 60px;"
                           type="number"
                           value="${worker.salary}"
                           disabled 
                           onchange="updateSalary(event.target, ${worker.id})" >
                           AZN
                      </td>
                      
                      <td>
                         <button
                           onclick="editEl(event.target ,${worker.id})">
                           Edit
                         </button>
                      </td>
                      <td>
                         <button
                         onclick="removeEl(event.target ,${worker.id})">
                         <i class="fa-solid fa-trash-can"></i>
                         </button>
                      </td>
                </tr>
          `;
        workerTable.innerHTML += list;
      });
      
})

filterForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let minSalary = document.querySelector("#min-salary").value;
  let maxSalary = document.querySelector("#max-salary").value;

  let sortedArry = workers.filter(w => {
    //Typesin Number Etmek Ucun
    +w.salary
    return (+w.salary >minSalary && +w.salary < maxSalary);
  });
  workerTable.innerHTML=`
  
     <tr>
          <th>Id</th>
           <th>Name</th>
          <th>Suranme</th>
          <th>Salary</th>
      </tr>
  
  `
  sortedArry.forEach((worker) => {
    let list = "";
    list = `
            <tr>
                 <td>
                    ${worker.id} 
                 </td>
                 <td>
                    <input
                       type="text"
                       value="${worker.name}"
                       disabled
                       onchange="updateName(event.target, ${worker.id})">
                  </td>
                  <td>
                     <input 
                       type="text"
                       value="${worker.surname}"
                       disabled
                       onchange="updateSurname(event.target, ${worker.id})"> 
                  </td>
                  <td>
                     <input
                       style="width: 60px;"
                       type="number"
                       value="${worker.salary}"
                       disabled 
                       onchange="updateSalary(event.target, ${worker.id})" >
                       AZN
                  </td>
                  
                  <td>
                     <button
                       onclick="editEl(event.target ,${worker.id})">
                       Edit
                     </button>
                  </td>
                  <td>
                     <button
                     onclick="removeEl(event.target ,${worker.id})">
                     <i class="fa-solid fa-trash-can"></i>
                     </button>
                  </td>
            </tr>
      `;
    workerTable.innerHTML += list;
  });
});


let workerId ;
if(workers.length===0){
  workerId=0;
}else{
  workerId= ++workers[workers.length-1].id
}
salaryForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let workerName = document.querySelector("#name").value;
  let workerSurname = document.querySelector("#surname").value;
  let workerSalary = document.querySelector("#salary").value;

  

  workers.push({
    
    id: ++workerId,
    name: workerName,
    surname: workerSurname,
    salary: workerSalary,
  });

  localStorage.setItem("workers", JSON.stringify(workers));
  let list = "";
  list = `
          <tr>
               <td>${workerId} </td>
               <td>
                  <input
                     type="text"
                     value="${workerName}"
                     disabled
                     onchange="updateName(event.target, ${workerId})">
                </td>
                <td>
                   <input 
                     type="text"
                     value="${workerSurname}"
                     disabled
                     onchange="updateSurname(event.target, ${workerId})"> 
                </td>
                <td>
                   <input
                     style="width: 60px;"
                     type="number"
                     value="${workerSalary}"
                     disabled 
                     onchange="updateSalary(event.target, ${workerId})" >
                     AZN
                </td>
                
                <td>
                   <button
                     onclick="editEl(event.target ,${workerId})">
                     Edit
                   </button>
                </td>
                <td>
                   <button
                   onclick="removeEl(event.target ,${workerId})">
                   <i class="fa-solid fa-trash-can"></i>
                   </button>
                </td>
          </tr>
    `;
  workerTable.innerHTML += list;
  //Formu sifirlamaq ucun
  salaryForm.reset();
  showTable();
});
//Seyf yenilendikde var ya tab acilib baglandiqdan sonran datalari getirmek ucun
workers.forEach((worker) => {
  let list = "";
  list = `
          <tr>
               <td>
                  ${worker.id} 
               </td>
               <td>
                  <input
                     type="text"
                     value="${worker.name}"
                     disabled
                     onchange="updateName(event.target, ${worker.id})">
                </td>
                <td>
                   <input 
                     type="text"
                     value="${worker.surname}"
                     disabled
                     onchange="updateSurname(event.target, ${worker.id})"> 
                </td>
                <td>
                   <input
                     style="width: 60px;"
                     type="number"
                     value="${worker.salary}"
                     disabled 
                     onchange="updateSalary(event.target, ${worker.id})" >
                     AZN
                </td>
                
                <td>
                   <button
                     onclick="editEl(event.target ,${worker.id})">
                     Edit
                   </button>
                </td>
                <td>
                   <button
                   onclick="removeEl(event.target ,${worker.id})">
                   <i class="fa-solid fa-trash-can"></i>
                   </button>
                </td>
          </tr>
    `;
  workerTable.innerHTML += list;
});

