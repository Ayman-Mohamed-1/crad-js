let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let mood = "create"
let tmp ;



// getTotal
function getTotal()
{
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }else{
        total.innerHTML = '';
        total.style.background ="#a00d02"
    } 
}
// getTotal end




// --creat prodact
let datepro;
    if(localStorage.product != null){
        datepro = JSON.parse(localStorage.product);
    }else{
         datepro = [];
    }


    submit.onclick = function (){
// -- object //
        let newPro = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        }

        if(title.value != "" 
        && price.value != "" 
        && category.value != ""
        && newPro.count < 100){
            if(mood === "create"){
   
               if (newPro.count > 1){
                   for(let i = 0; i < newPro.count; i++){
                       datepro.push(newPro);
                   }
               }else{
                   datepro.push(newPro);
               }
           }else{
               datepro[tmp] = newPro;
               mood = "create";
               submit.innerHTML = "create";
               count.style.display = "block" 
           }
           clearDate()
        }

             //--localStorage
             localStorage.setItem("product",JSON.stringify(datepro) )
             console.log(newPro)
             showDate()
}





// clear inputs
function clearDate(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

//read
function showDate(){
    
    let table = "";
        for (let i = 0; i < datepro.length; i++) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datepro[i].title}</td>
                <td>${datepro[i].price}</td>
                <td>${datepro[i].taxes}</td>
                <td>${datepro[i].ads}</td>
                <td>${datepro[i].discount}</td>
                <td>${datepro[i].total}</td>
                <td>${datepro[i].category}</td>
                <td><button onclick = "updateDate(${i})" id = "updateDate">Update</button></td>
                <td><button onclick = "deleteData(${i})" id = "delete" >Delete</button></td>
                </tr>
                `
            }
            document.getElementById("tbody").innerHTML = table;
            //showDate END

            //--deleteAll
            let btnDlelete = document.getElementById("deleteAll");
            if(datepro.length > 0){
                btnDlelete.innerHTML = 
                `
                <button onclick = "deleteALL()">Delete All (${datepro.length})</button>
                `
            }else{
                
                btnDlelete.innerHTML = ""
            }
            getTotal()
        }
        
        showDate()
        
        
// delete
function deleteData(i){
    datepro.splice(i,1)
    localStorage.product = JSON.stringify(datepro)
    showDate()
}


// delete all

function deleteALL(){
    localStorage.clear()
    datepro.splice(0)
    showDate()
}


// updateDate
function updateDate(i)
{
    title.value = datepro[i].title;
    price.value = datepro[i].price;
    taxes.value = datepro[i].taxes;
    ads.value = datepro[i].ads;
    discount.value = datepro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = datepro[i].category;
    submit.innerHTML = "Update";
    mood = "Update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// search
let searchMood = "title"
function getSearchMood(id){
let search = document.getElementById("search");
    if(id == "searchTitle"){
        searchMood = "title";
        
        
    }else{
        searchMood = "category";
        
    }
    search.placeholder = "Search By " + searchMood;
  search.focus()
  search.value = "";
  showDate()

}
function searchData(value){
    let table = "";
    for(let i = 0; i < datepro.length; i++){
        if (searchMood == "title"){
            if(datepro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datepro[i].title}</td>
                    <td>${datepro[i].price}</td>
                    <td>${datepro[i].taxes}</td>
                    <td>${datepro[i].ads}</td>
                    <td>${datepro[i].discount}</td>
                    <td>${datepro[i].total}</td>
                    <td>${datepro[i].category}</td>
                    <td><button onclick = "updateDate(${i})" id = "updateDate">Update</button></td>
                    <td><button onclick = "deleteData(${i})" id = "delete" >Delete</button></td>
                    </tr>
                    `;
                }
        }else{
                if(datepro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datepro[i].title}</td>
                        <td>${datepro[i].price}</td>
                        <td>${datepro[i].taxes}</td>
                        <td>${datepro[i].ads}</td>
                        <td>${datepro[i].discount}</td>
                        <td>${datepro[i].total}</td>
                        <td>${datepro[i].category}</td>
                        <td><button onclick = "updateDate(${i})" id = "updateDate">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id = "delete" >Delete</button></td>
                        </tr>
                        `;
                }
            }
        }        
            document.getElementById("tbody").innerHTML = table;
    
}


