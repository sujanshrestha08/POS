  window.onload = function() {
            fetch('http://localhost:3000/getalluser')
                 .then(re => re.json())
                  .then(res => {
                        function userdetail(detl){
                              let empt='';
                              for (var i = 0; i < detl.length; i++) {
                                    empt+=`<tr><td>${detl[i].fullname}</td><td>${detl[i].address}</td><td>${detl[i].email}</td><td><button id= "${detl[i].id}" class="btn btn--radius-2 btn--blue" onclick="location.href='adminedit.html?page=${detl[i].email}'" data-edit="${detl[i].id}">Edit</button</td>
                        <td><button class="btn btn--radius-2 btn--blue" data-delete="${detl[i].id}">Delete</button></tr>`
                                                                  }
                   document.getElementById('tbodyone').innerHTML=empt;
                     let butt= document.querySelectorAll('#tbodyone button');

                        [...butt].forEach(function(data) {
                          data.addEventListener("click",function() {
                            let del=this.getAttribute("data-delete");
                         
                              console.log(del);
                            if(this.getAttribute("data-delete")){
                              fetch('http://localhost:3000/deluser', {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            id:del
                         
                          })
                      })
                           .then(data => {
                                    console.log(data);
                                  
                                  })
                         .catch(error => {

                                    console.log(error)
                                  })
                       }
                       })



                      
                            })


                       }
                        
                        userdetail(res.data);
                  })
            
      }
