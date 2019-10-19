window.onload=function(){
	let asd= document.getElementById('search');
	let tod=[];
      let zpt=[];
      let fir=document.getElementById('fir');
      
	
	
		
		 fetch('http://localhost:3000/getallhistory')
      .then(re => re.json())
      .then(res => {
      	console.log(res.data)
      	let dat=res.data;
      	console.log(dat)
      	let tbodyone=document.getElementById('tbodyone')
      	let html="";
            let adquantity=0;
            let adtotta=0;
            let adprofit=0;
            let cust=0;
            let addsicount=0;
            var today = new Date();
            var m= (today.getMonth()+1);
                  var d= today.getDate();
      var date = today.getFullYear()+'-'+(m<=9 ? '0' + m : m)+'-'+(d <= 9 ? '0' + d : d);
      	  		    
                            console.log(dat)
      	for (var i = 0; i < dat.length; i++) {
      		let dt=dat[i].date;
      		let sp=dt.split("T",2);
      		let newsp=sp[0];
      		let newtim=sp[1];
      		let ssp=newtim.split(".",2);
      		let newtime=ssp[0];

      		console.log(newsp)
      		if (newsp===date) {
      		
      				
      			
      			html+=`<tr><td>${[i+1]}</td><td><a href="exchange.html?page=${dat[i].billno}">${dat[i].billno}</a></td><td>${newsp}</td><td>${newtime}</td></tr>`
      			
      		adquantity+=dat[i].quantity;
                  let typ=parseInt(dat[i].total)
                  adtotta+=typ;
                  adprofit+=dat[i].profit;
                  cust+=1;
                  addsicount+=dat[i].discount;

      		}

      		
      		
      	}
tod.push({"date":date,"total":adtotta,"profit":adprofit,"cust":cust,"discount":addsicount, quantity:adquantity})
console.log(tod)
// tbodyone.innerHTML=html;
      })
	
	
	

 
             let graphdata=[];
            let tot=[];
       
      for (var i = 1; i <=7; i++) {
            var fg= new Date();
            let qnt=0;
var weekday = new Array(7);
weekday[0] =  "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
            fg.setDate(fg.getDate() - i);
            
             var mo= (fg.getMonth()+1);
                  var di= fg.getDate();
                  var day=weekday[fg.getDay()];
      var olddate = fg.getFullYear()+'-'+(mo<=9 ? '0' + mo : mo)+'-'+(di <= 9 ? '0' + di : di);

       tot.push({"date":olddate,"day":day});
      
          

      }
console.log(tot)
  fetch('http://localhost:3000/getallhistory')
      .then(re => re.json())
      .then(res => {
              let dat=res.data;
            for (var j = 0; j <=6; j++) {
               let adquantity=0;
                  let qnt=0;
                   let prf=0;
                   let cust=0;
                     let addsicount=0;
                  let output={};
                  output.date=tot[j].date;
                  output.day=tot[j].day;
                 
                         
      for (var i = 0; i < dat.length; i++) {
            dat[i]
            let dt=dat[i].date;
                  let sp=dt.split("T",2);
                  let newsp=sp[0];
                  let newtim=sp[1];
                  let ssp=newtim.split(".",2);
                  let newtime=ssp[0];
                  
                 
                  // let trh=tot[j].toDateString();
                  // console.log(trh)
      
                  if (newsp===tot[j].date) {
                        let pit=parseInt(dat[i].total)
                        cust+=1;
                        qnt+=pit;
                        prf+=dat[i].profit
                        addsicount+=dat[i].discount
                        adquantity+=dat[i].quantity;
                  }
                       
      }
      output.total=qnt;
      output.profit=prf;
      output.discount=addsicount;
      output.quantity=adquantity;
      output.cust=cust;
        graphdata.push({"date":tot[j].date,"total":qnt,"day":tot[j].day,"profit":prf,"cust":cust,"discount":addsicount,"quantity":adquantity})   
          zpt.push(output)     
}

      })
      setTimeout(function() {
            console.log(zpt)
            console.log(graphdata)
 }, 5000);

     // asd.addEventListener("click",function(e){
     //    for (var i = 0; i < 8; i++) {
     //       console.log(zpt[4]);
     //  }
     // })
     console.log(tod)
      setTimeout(function() {
        fir.innerHTML=tod[0].total;
        var chr=new CanvasJS.Chart("chartContaine", {
      animationEnabled: true,
      theme: "light2",
      title:{
            text: "Weekly Revenue Graph"
      },
      axisY:{
            includeZero: false
      },
         toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries
  },
      data: [{        
            type: "line",
            name: "Total Revenue",
    color: "#369EAD",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].total, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].total, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].total, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].total, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].total, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].total, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].total, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].total, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]

      },
       ]
});
        var chrone=new CanvasJS.Chart("chartContain", {
      animationEnabled: true,
      theme: "light2",
      title:{
            text: "Simple Line Chart"
      },
      axisY:{
            includeZero: false
      },
         toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries
  },
      data: [{        
            type: "line",
            name: "Discount",
    color: "#369EAD",
    showInLegend: true,       
            dataPoints: [
                                   { y: zpt[6].discount, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].discount, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].discount, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].discount, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].discount, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].discount, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].discount, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].discount, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
            ]

      },
       ]
});
document.getElementById('sec').innerHTML=tod[0].discount;
document.getElementById('thir').innerHTML=tod[0].quantity;
document.getElementById('fou').innerHTML=tod[0].profit;
document.getElementById('fiv').innerHTML=tod[0].cust;
        var chrtwo=new CanvasJS.Chart("chartContai", {
           
      animationEnabled: true,
      theme: "light2",
      title:{
            text: "Simple Line Chart"
      },
      axisY:{
            includeZero: false
      },
         toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries
  },
      data: [{        
            type: "line",
            name: "Total Revenue",
    color: "#369EAD",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].quantity, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].quantity, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].quantity, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].quantity, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].quantity, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].quantity, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].quantity, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].quantity, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]

      },
       ]
});
        var chrthree=new CanvasJS.Chart("chartConta", {
      animationEnabled: true,
      theme: "light2",
      title:{
            text: "Simple Line Chart"
      },
      axisY:{
            includeZero: false
      },
         toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries
  },
      data: [{        
            type: "line",
            name: "Total Revenue",
    color: "#369EAD",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].profit, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].profit, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].profit, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].profit, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].profit, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].profit, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].profit, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].profit, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]

      },
       ]
});
var chrtfour=new CanvasJS.Chart("chartCont", {
      animationEnabled: true,
      theme: "light2",
      title:{
            text: "Simple Line Chart"
      },
      axisY:{
            includeZero: false
      },
         toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries
  },
      data: [{        
            type: "line",
            name: "Total Customer",
    color: "#369EAD",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].cust, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].cust, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].cust, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].cust, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].cust, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].cust, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].cust, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].cust, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]

      },
       ]
});
       
        chr.render();
        chrone.render();
        chrtwo.render();
        chrthree.render();
        chrtfour.render();
    
      var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title:{
            text: "Simple Line Chart"
      },
      axisY:{
            includeZero: false
      },
         toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer",
    itemclick: toggleDataSeries
  },
      data: [{        
            type: "line",
            name: "Total Revenue",
    color: "#369EAD",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].total, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].total, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].total, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].total, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].total, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].total, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].total, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].total, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]

      },
{        
            type: "line",
            name: "Discount",
    color: "#8B0000",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].discount, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].discount, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].discount, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].discount, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].discount, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].discount, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].discount, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].discount, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]
            
      },
      {        
            type: "line",
            name: "Quantity",
    color: "#030303",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].quantity, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].quantity, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].quantity, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].quantity, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].quantity, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].quantity, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].quantity, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].quantity, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]
            
      },
      {        
            type: "line",
            name: "Profit",
    color: "#008000",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].profit, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].profit, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].profit, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].profit, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].profit, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].profit, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].profit, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].profit, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]
            
      },
      {        
            type: "line",
            name: "Total Customer",
    color: "#FFBF00",
    showInLegend: true,       
            dataPoints: [
                  { y: zpt[6].cust, indexLabel:  zpt[6].date,label: zpt[6].day },
                  { y: zpt[5].cust, indexLabel:  zpt[5].date,label:  zpt[5].day},
                  { y:zpt[4].cust, indexLabel:  zpt[4].date,label:  zpt[4].day},
                  { y: zpt[3].cust, indexLabel:  zpt[3].date,label:  zpt[3].day },
                  { y: zpt[2].cust, indexLabel:  zpt[2].date,label: zpt[2].day},
                  { y:zpt[1].cust, indexLabel:  zpt[1].date,label: zpt[1].day },
                  { y: zpt[0].cust, indexLabel:  zpt[0].date,label:  zpt[0].day },
                  { y: tod[0].cust, indexLabel:  tod[0].date,label:  zpt[6].day },
                  
                  
            ]

      },
      ]
});
// var chart = new CanvasJS.Chart("chartContainer", {
//   title:{
//     text: "Weekly Revenue Analysis for First Quarter"
//   },
//   axisY:[{
//     title: "Order",
//     lineColor: "#C24642",
//     tickColor: "#C24642",
//     labelFontColor: "#C24642",
//     titleFontColor: "#C24642",
//     suffix: "k"
//   },
//   {
//     title: "Footfall",
//     lineColor: "#369EAD",
//     tickColor: "#369EAD",
//     labelFontColor: "#369EAD",
//     titleFontColor: "#369EAD",
//     suffix: "k"
//   }],
//   axisY2: {
//     title: "Revenue",
//     lineColor: "#7F6084",
//     tickColor: "#7F6084",
//     labelFontColor: "#7F6084",
//     titleFontColor: "#7F6084",
//     prefix: "$",
//     suffix: "k"
//   },
//   toolTip: {
//     shared: true
//   },
//   legend: {
//     cursor: "pointer",
//     itemclick: toggleDataSeries
//   },
//   data: [{
//     type: "line",
//     name: "Footfall",
//     color: "#369EAD",
//     showInLegend: true,
//     axisYIndex: 1,
//     dataPoints: [
//     //  { y: zpt[6].total, indexLabel:  zpt[6].date,label: zpt[6].day },
//     //               { y: zpt[5].total, indexLabel:  zpt[5].date,label:  zpt[5].day},
//     //               { y:zpt[4].total, indexLabel:  zpt[4].date,label:  zpt[4].day},
//     //               { y: zpt[3].total, indexLabel:  zpt[3].date,label:  zpt[3].day },
//     //               { y: zpt[2].total, indexLabel:  zpt[2].date,label: zpt[2].day},
//     //               { y:zpt[1].total, indexLabel:  zpt[1].date,label: zpt[1].day },
//     //               { y: zpt[0].total, indexLabel:  zpt[0].date,label:  zpt[0].day },
//     //               { y: tod[0].total, indexLabel:  tod[0].date,label:  zpt[6].day },
//     ]
//   },
//   {
//     type: "line",
//     name: "Order",
//     color: "#C24642",
//     axisYIndex: 0,
//     showInLegend: true,
//     dataPoints: [
//       { x: new Date(2017, 00, 7), y: 32.3 }, 
//       { x: new Date(2017, 00, 14), y: 33.9 },
//       { x: new Date(2017, 00, 21), y: 26.0 },
//       { x: new Date(2017, 00, 28), y: 15.8 },
//       { x: new Date(2017, 01, 4), y: 18.6 },
//       { x: new Date(2017, 01, 11), y: 34.6 },
//       { x: new Date(2017, 01, 18), y: 37.7 },
//       { x: new Date(2017, 01, 25), y: 24.7 },
//       { x: new Date(2017, 02, 4), y: 35.9 },
//       { x: new Date(2017, 02, 11), y: 12.8 },
//       { x: new Date(2017, 02, 18), y: 38.1 },
//       { x: new Date(2017, 02, 25), y: 42.4 }
//     ]
//   },
//   {
//     type: "line",
//     name: "Revenue",
//     color: "#7F6084",
//     axisYType: "secondary",
//     showInLegend: true,
//     dataPoints: [
//       { x: new Date(2017, 00, 7), y: 42.5 }, 
//       { x: new Date(2017, 00, 14), y: 44.3 },
//       { x: new Date(2017, 00, 21), y: 28.7 },
//       { x: new Date(2017, 00, 28), y: 22.5 },
//       { x: new Date(2017, 01, 4), y: 25.6 },
//       { x: new Date(2017, 01, 11), y: 45.7 },
//       { x: new Date(2017, 01, 18), y: 54.6 },
//       { x: new Date(2017, 01, 25), y: 32.0 },
//       { x: new Date(2017, 02, 4), y: 43.9 },
//       { x: new Date(2017, 02, 11), y: 26.4 },
//       { x: new Date(2017, 02, 18), y: 40.3 },
//       { x: new Date(2017, 02, 25), y: 54.2 }
//     ]
//   }]
// });
// chart.render();

// function toggleDataSeries(e) {
//   if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//     e.dataSeries.visible = false;
//   } else {
//     e.dataSeries.visible = true;
//   }
//   e.chart.render();
// }

chart.render();
function toggleDataSeries(e) {
  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
}

}, 2000);

   }