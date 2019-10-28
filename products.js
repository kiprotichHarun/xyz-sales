this.order=[];
const products=[
    {"id":1,"name":"Cheeze","price":1},
    {"id":2,"name":"Hamburger","price":3},
    {"id":3,"name":"Cola","price":5},
]
//price arithmentcs functions
function totalCost(){
    var totalCost=0;
    for(var i=0;i<this.order.length;i++){
        price=getItemPrice(this.order[i]["id"])
        totalCost+=this.order[i]["quantity"]*price
    }
    return totalCost;
}
function discounts(quantity){
    if(quantity>9 && quantity<=25){
        return 0.10
    }else if(quantity>25 && quantity<=50){
        return 0.25
    }else if(quantity>50){
        return 0.5
    }else{
        return 0
    }
}
function overallCost(){
    var discountedCost=0
    for(var i=0;i<this.order.length;i++){
        var dis=discounts(this.order[i]["quantity"])
        console.log(dis)
        this.order[i]={"id":this.order[i]["id"],"quantity":this.order[i]["quantity"],"discount":dis}
        var price=getItemPrice(this.order[i]["id"])
        discountedCost+=(price-dis)*this.order[i]["quantity"];
         
    }
    console.log(this.order)
    var totalcost=totalCost().toString()
    var disCost=discountedCost.toString()
    document.getElementById("total").innerHTML=totalcost;
    document.getElementById("discounts").innerHTML=disCost
}
//utility functions
function getItemById(id,list){
    for(var i=0;i<list.length;i++){
        if(id==list[i]["id"]){
            return list[i]
        }
    }
}
function getItemPrice(id){
    for(var i=0;i<products.length;i++){
        if(id===products[i]["id"]){
            return products[i]["price"]
            break
        }
    }
}

//user interface functions
function addToOrder(id){
    if(this.order.length==0){
        this.order.push({"id":id,"quantity":1})
        addtoOrdered(id,1)
    }
    else{
        for(var i=0;i<this.order.length;i++){
            if(id==this.order[i]["id"]){
                this.order[i]["quantity"]=this.order[i]["quantity"]+1;
                updateOrder(id);
                break;
            }else{
                if(i+1==this.order.length){
                    this.order.push({"id":id,"quantity":1})
                    addtoOrdered(id,1)
                    break;
                }
            }
        }
    }
    overallCost()
}
function addtoOrdered(id,q){
    var myOrder=document.getElementById('myorder');
    var newItem=document.createElement("tr");
    newItem.id=id;
    var itemName=document.createElement("td");
    var itemPrice=document.createElement("td");
    var quantity=document.createElement("td");
    for (var i=0;i<products.length;i++){
        if(id==products[i]["id"]){
            itemName.innerHTML=products[i]["name"]
            itemPrice.innerHTML=products[i]["price"]
            quantity.innerHTML=q
            newItem.appendChild(itemName)
            newItem.appendChild(itemPrice)
            newItem.appendChild(quantity)
            myOrder.appendChild(newItem)
        }
    }
}
function updateOrder(id){
    var update=document.getElementById(id)
    update.innerHTML=""
    var prod=[getItemById(id,products)]
    var quan=[getItemById(id,this.order)]
    var uItemName=document.createElement("td")
    var uPrice=document.createElement("td")
    var uQuant=document.createElement("td")
    uItemName.innerHTML=prod[0]["name"]
    uPrice.innerHTML=prod[0]["price"]
    uQuant.innerHTML="x"+quan[0]["quantity"]
    update.appendChild(uItemName)
    update.appendChild(uPrice)
    update.appendChild(uQuant)
}
