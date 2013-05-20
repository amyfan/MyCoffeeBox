Suscription = function(obj){
    this.quantity = undefined;
    this.period = undefined;
    this.product = undefined;
    this.address = undefined;
    this.customFields = Array();
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        this[i] = obj[i];
    }

    this.setProduct = function(p){this.product=p;};
    this.setAddress = function(p){this.address=p;};
    this.setQuantity = function(p){this.quantity=p}
    this.setPeriod = function(p){this.period=p}
    this.setCustomField = function(k,v){this.customFields.push({key:k,value:v});};
    this.printProduct = function(){console.log(this.product);}
    this.checkout = function(){console.log("LETS REDIRECT TO CONECTA WITH SUSCRIPTION:"); console.log(this)}
    return this;
};

conekta = function(){};
conekta.setToken = function(){};
conekta.createSuscription = function(){ return new Suscription(); };
conekta.getCatalog = function(){
return [ 
  { image:"/images/triunfo.jpg", 
    name:"El Triunfo", 
    brand:"El Triunfo", 
    description:"Molido or en grano.", 
    price:149, 
    quantity:500
  },
  { image:"/images/vinic.jpg", 
    name:"Maya Vinic", 
    brand:"Maya Vinic", 
    description:"Molido or en grano.", 
    price:149, 
    quantity:500
  },
  { image:"/images/metik.jpg", 
    name:"Café Metík", 
    brand:"Café Metík", 
    description:"Molido or en grano.", 
    price:149, 
    quantity:500
  },
]
};
