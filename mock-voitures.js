const voitures = [
   { 
     id: 1,
     name: "Peugeot",
     model: 3008,
     fuelType: "essence",
     price: 14000 ,
     kilometre: 86000 ,
     category: "SUV",
     year: 2016,
     picture: "../images/peugeot/3008.jpg",
     available: true,
    
     created: new Date()
    },

    {           
    id: 2,
    name: " Audi",
    model:  "Q7",
    fuelType: "Deisel", 
    price: 23000,
    kilometre: 57000,
    category: "Break",
    year: 2014,
    picture: "../images/audi/q7.jpg",
    available:  true,
       
    created: new Date()
    },

    {    
    id: 3,
    name: "Renault",
    model:  "Arkana",
    fuelType:  "Diesel",
    price: 12000,
    kilometre: 85000,
    category: "Coupe",
    year: 2020,
    picture: "../images/renault/arkana.jpg",
    available:  true,
        
    created: new Date()
    },

    {    
    id: 4,
    name: "Mercedes",
    model:  "classe S",
    fuelType:  "Diesel",
    price: 65000,
    kilometre: 123000,
    category: "berline",
    year: 2019,
    picture: "../images/mercedes/classe-s.jpg",
    available:  true,
        
    created: new Date()
    },

    {    
    id: 5,
    name: "Citroen",
    model:  "Berlingo",
    fuelType: "Diesel" ,
    price: 7000,
    kilometre: 165000,
    category: "utilitaire",
    year: 2014,
    picture: "../images/citroen/berlingo.jpg",
    available:  true,
        
    created: new Date()
    },
    

   ];
     
   module.exports = voitures