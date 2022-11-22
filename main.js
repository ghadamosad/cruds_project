let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('submit');

let mood='create';
let key;

//total price
function totalPrice(){
    if(price.value != '' && taxes.value != '' && ads.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background='green'
    }
    else{
        total.innerHTML='';
        total.style.background= 'rgb(194, 6, 6)';
    }
}

//create element and store them in localstorage
let arr;
    if(localStorage.products != null){
    arr =  JSON.parse( localStorage.products);
    }
    else{
    arr=[]
    }
create.onclick = function(){
     let ob= {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
     }

     if(title.value !='' 
     && price.value !=''
      && category.value !='' &&
      count.value <= 100){
        if(mood === 'create'){
            if(ob.count >1){
                for(let i=0;i<ob.count;i++){
                    arr.push(ob);
                }
            }
            else{
                arr.push(ob);
            }
        }else{
            arr[ key  ]= ob;
            mood='create';
            submit.innerHTML="Create";
            count.style.display="block";

        }
        clearfun();
     }
     
     
     
    localStorage.products=JSON.stringify(arr);

    
    readData()
}

//clear data from inputs
function clearfun(){
    title.value ='';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value= '';
    total.innerHTML='';
    count.value = '';
    category.value= ''
}

//read data in table
function readData(){
    let table = '';
    for(let i=0 ; i<arr.length ; i++){
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td>
            <button onclick="updateData(${i})" id="update">update</button>
        </td>
        <td>
            <button onclick="deleteData(${i})" id="delete">delete</button>
        </td>
        <tr>
        `
        
    }
    document.getElementById('tbody').innerHTML = table;

        let btnDel=document.getElementById("deleteAl");
        if(arr.length > 0){
            btnDel.innerHTML=`
            <button onclick="deleteAll()"> Delete All ( ${arr.length})</button>
            `
        }
        else{
            btnDel.innerHTML = ''
        }
    totalPrice()
}
readData();

//delete data
function deleteData(index){
    arr.splice(index,1);
    localStorage.products = JSON.stringify(arr);
    readData();
}

//delete all
function deleteAll(){
    localStorage.clear();
    arr.splice(0);
    readData()
}

//update
function updateData(i){
    title.value = arr[i].title;
    price.value = arr[i].price;
    taxes.value = arr[i].taxes;
    ads.value = arr[i].ads;
    discount.value = arr[i].discount;
    totalPrice();
    category.value = arr[i].category;

    count.style.display="none";
    submit.innerHTML="Update";
    mood='update';
    key=i;

    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search
let searchMood='title';

function getsearchMood(id){

    let searchBtn = document.getElementById('search')
    if(id === 'searchbytitle'){
        searchMood='title';
    }
    else{
        searchMood='category'
    }
    searchBtn.placeholder='Search By ' + searchMood;
    searchBtn.focus();
    searchBtn.value='';
    readData()
    
}

function searchData(value){
    let table=''
    for(let i=0; i<arr.length;i++){
        if(searchMood==='title'){
            if(arr[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                    <td>${[i]}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].taxes}</td>
                    <td>${arr[i].ads}</td>
                    <td>${arr[i].discount}</td>
                    <td>${arr[i].total}</td>
                    <td>${arr[i].category}</td>
                    <td>
                        <button onclick="updateData(${i})" id="update">update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
                    <tr>
                    ` 
            }
        }
        else{
            if(arr[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                    <td>${[i]}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].taxes}</td>
                    <td>${arr[i].ads}</td>
                    <td>${arr[i].discount}</td>
                    <td>${arr[i].total}</td>
                    <td>${arr[i].category}</td>
                    <td>
                        <button onclick="updateData(${i})" id="update">update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
                    <tr>
                    ` 
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}


