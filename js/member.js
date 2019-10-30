window.onload=function(){
    
    var path= window.location.href;
    var spl = path.split("=",-1)
    let ssp= `${spl[1]}`;
    let lowe=ssp.toLowerCase();
    console.log(lowe)
  
    
          fetch(`http://localhost:3000/getmember?page=${lowe}`)
                   .then(re => re.json())
                .then(res => {
                  let rep= res.data[0];
                  console.log(rep);
                  document.getElementById('customerid').innerHTML='Welcome'+" "+rep.fullname;
                  document.getElementById('pointscollection').innerHTML='Your points :'+" "+rep.membership;
    //               if (res.status === 'sucess') {
    //                     userNameNode.value=rep.fullname;
    //                     emailnode.value=rep.email;
    //                      numbernode.value=rep.phone;
    //                       usertypenode.value=rep.usertype;
    //                       packnode.value=rep.address;
    //                       idnode.value=rep.id;
                    


    //   }
                      
                })
                fetch(`http://localhost:3000/getmemberhistory?page=${lowe}`)
                .then(re => re.json())
                .then(res => {
                    console.log(res);
                    let dat=res.data;
                    let html="";
                    for (var i = 0; i < dat.length; i++) {
                        let dt=dat[i].date;
                        let sp=dt.split("T",2);
                        let newsp=sp[0];
                        let newtim=sp[1];
                        let ssp=newtim.split(".",2);
                        let newtime=ssp[0];
          
                        
                        console.log(newtime);
                        
                                
                            
                            html+=`<tr><td>${[i+1]}</td><td>${dat[i].billno}</td><td>${dat[i].quantity}</td><td>${dat[i].total}</td></tr>`
                            
                        
                        
                        
                        
                    }
          
                    document.getElementById('history').innerHTML=html;
                })

}