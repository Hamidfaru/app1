
let title=document.getElementById(`title`);
let price=document.getElementById(`price`);
let taxes =document.getElementById(`taxes`);
let ads=document.getElementById(`ads`);
let discount=document.getElementById(`discount`);
let total=document.getElementById(`total`);
let count= document.getElementById(`count`);
let category=document.getElementById(`category`);
let submit=document.getElementById(`submit`);
let mood= `create`;
let tmp;




// 1-get total______________________________________________________________________
function getTotal(){
    if(price.value !==`` && title.value !==`` ){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
          total.style.background=` green`;
    }
    
    else
    {
        total.innerHTML=` `;
        total.style.background= "rgb(125, 14, 14)";
      
}
}
//2-create product________________________________________________________________
let dataArray;
if(localStorage.product != null){
    dataArray=JSON.parse(localStorage.product);

}else{
dataArray=[];
}
submit.onclick= function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
  //7-count__________________________________________________________________________
  if(title.value !== `` &&  price.value !==`` && category.value !==`` && count.value<= 100){
  if(mood===`create`){
  if(newPro.count >1){
    for(let i=0; i< newPro.count;i++){
         dataArray.push(newPro);
    
    }
  }else{
    dataArray.push(newPro);
  }}else{
    dataArray[tmp]=newPro;
    mood=`create`;
    submit.innerHTML=`create`;
    count.style.display=`block`;
  }
     clearData();
}
   //3-save localStorage__________________________________________________

    localStorage.setItem(`product`, JSON.stringify(dataArray));
   
    getTotal();
    showData();
   
}

//4-clear inputs_________________________________________________________________________

function clearData(){
    title.value= ``;
    price.value=``;
    taxes.value=``;
    ads.value=``;
   discount.value=``;
    total.innerHTML=``;
    count.value=``;
    category.value=``;

}

//5-read______________________________________________________________________________________________________
function showData(){
    let table=``;

for(let i =0; i<dataArray.length; i++){

    table +=
    `
    
    <tr>
                      <td>${i+1}</td>
            <td>${dataArray[i].title}</td>
            <td>${dataArray[i].price}</td>
            <td>${dataArray[i].taxes}</td>
            <td>${dataArray[i].ads}</td>    
            <td>${dataArray[i].discount}</td> 
            <td>${dataArray[i].total}</td>
            <td>${dataArray[i].category}</td>


            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"id=" deleteData">delete</button></td> 
              </tr>
    
    
    `;
    
}
    document.getElementById(`tbody`).innerHTML= table;

    let btnDelete = document.getElementById(`deleteAll`);
    if(dataArray.length >0){
        btnDelete.innerHTML=`
         <button onclick="deleteAll() ">delete All (${dataArray.length})</button>
        
        `


    }else{
        btnDelete.innerHTML = ``;
    }

} 
showData();




//6-delete_____________________________________________________________________________________________________
function deleteData(i){
    dataArray.splice(i,1);
    localStorage.product= JSON.stringify(dataArray);
    showData();
}


//deleteAll_____________________________________________________________________
function deleteAll(){
    localStorage.clear();
    dataArray.splice(0);
    showData();
}






//8-update______________________________________________________________________
function update(i){
    title.value= dataArray[i].title;
    price.value= dataArray[i].price;
    taxes.value= dataArray[i].taxes;
    ads.value= dataArray[i].ads;
    discount.value= dataArray[i].discount;
    getTotal();
    count.style.display= `none`;
    category.value= dataArray[i].category;
    submit.innerHTML=`update`;
    mood=`update`;
    tmp=i;
    scroll({
        top: 0,
        behavior: `smooth`,
    })

}
//9-search____________________________________________________________________________________
let searchM= `title`;
function getSearch(id){
       let search= document.getElementById(`search`);
    if(id ==`searchTitle`){
        searchM=`title`;
      
    }
else{
    searchM=`category`;
 
}
search.placeholder= `Search By `+searchM;

search.focus();
search.value=``;
showData();
}

//9_1 search __________________________________________________________________
function searchData(value){

  let table=``;
  for(let i=0; i<dataArray.length; i++){
    if(searchM == `title`){
        
            if(dataArray[i].title.includes(value.toLowerCase())){
                table +=
    `
    
    <tr>
                      <td>${i+1}</td>
            <td>${dataArray[i].title}</td>
            <td>${dataArray[i].price}</td>
            <td>${dataArray[i].taxes}</td>
            <td>${dataArray[i].ads}</td>    
            <td>${dataArray[i].discount}</td> 
            <td>${dataArray[i].total}</td>
            <td>${dataArray[i].category}</td>


            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"id=" deleteData">delete</button></td> 
              </tr>
    
    
    `;
    
}
}else{

   
        if(dataArray[i].category.includes(value.toLowerCase())){
            table +=
`

<tr>
                  <td>${i+1}</td>
        <td>${dataArray[i].title}</td>
        <td>${dataArray[i].price}</td>
        <td>${dataArray[i].taxes}</td>
        <td>${dataArray[i].ads}</td>    
        <td>${dataArray[i].discount}</td> 
        <td>${dataArray[i].total}</td>
        <td>${dataArray[i].category}</td>


        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})"id=" deleteData">delete</button></td> 
          </tr>


`;

}




}
    
}



   
   document.getElementById(`tbody`).innerHTML= table;
}











//10 clean Data
