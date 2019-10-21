 window.onload= function(){
       const userNameNode = document.getElementById('username');
    const emailnode = document.getElementById('email');
    const numbernode = document.getElementById('number');
    const idnode=document.getElementById('userid');
    const usertypenode = document.getElementById('usertype')
    const packnode=document.getElementById('package')

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
                    if (res.status === 'sucess') {
                          userNameNode.value=rep.fullname;
                          emailnode.value=rep.email;
                           numbernode.value=rep.phone;
                            usertypenode.value=rep.usertype;
                            packnode.value=rep.address;
                            idnode.value=rep.id;
                      


        }
                        
                  })
                    document.querySelector("button").addEventListener("click",function(e){
                      e.preventDefault();
                      // const id=`${lowe}`;
                      // console.log(id);
                      const id= idnode.value;
                      const fullname = userNameNode.value;
       const email = emailnode.value;
    const phone= numbernode.value;
    const address=packnode.value;
    const usertype = usertypenode.value;
  fetch(`http://localhost:3000/updateuser`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      
      },
      body: JSON.stringify({
        id,
      
       fullname,
        email:email,
       phone,
        address,
        usertype
      })
    })
    .then(data => {
      console.log(data);
    
    })
    .catch(error => {
      button.innerText = 'could not register'
      console.log(error)
    })

                    })
          
    }