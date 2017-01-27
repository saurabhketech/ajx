  
   var current=1;
            function change_slide(page)
              {
                current=page;
                user(page);
                
                return false;
              };
           $(document).ready(function()
              {        
                user(1);
             });

           

           // table content

            function user(page){
            var data1 = ""
            var total_rows=""  
            $("#l"+current).addClass("active");       
            $.ajax({ 
                type: "POST",
                data:{ "page": page},
                url: "connect.php",             
                dataType: "text",
                success: function(rows) {  
                rows = JSON.parse(rows)
                total_rows=rows.data;
                table(total_rows);
                total_buttons=rows.count/5;
                if(!(total_buttons%5==0)){
                total_buttons=total_buttons+1;
              }
                button(total_buttons);
                   },

            complete: function()   {
            setTimeout(function()  {
            user(current);
                },10000);
                  }
               }) 
             }

            function table(total_rows) {
            var data1 = ""                
             data1+= "<table  class='table'>"; 
               data1+=  "<tr>" +
                        "<th>ID</th>" +
                        "<th>Name</th>" +
                        "<th>email</th>" +
                        "<th>message</th>" +
                        "<th>date</th>" +
                        "</tr>"
            for (var i in total_rows)  {

              var row = total_rows[i];
              var id=row[0];
            
              data1+=   "<tr data= '"+ id + "'>" +
                        "<td  id='userid'>" + row[0] + "</td>" +
                        "<td contenteditable class='name' id='usname'>" + row[1] + "</td>" +
                        "<td contenteditable class='email' id='usemail'>" + row[2] + "</td>" +
                        "<td contenteditable class='message' id='usmessage'>" + row[3] + "</td>" +
                        "<td class='date'>" + row[4] + "</td>" +
                        "</tr>"; 
                        

                  }
        
              data1+= "</table>";
                $(".container").html(data1); 
                 }
   

// pagination



            function button(total_pages){
            
            var buttons = "<ul class='pagination' align='center' >"
            for (var i = 1; i<total_pages; i ++)  {
              buttons +=  "<li id=l"+i+"><a  onclick= 'change_slide(" +i+ ")' href= '#'>"+i+"</a></li>"
                     }
              buttons += "</ul>";
              $(".pagination").html(buttons);
                  }
                        



                        //inline editing



  $(document).ready(function(){  
  $(document).on('focusout', 'td', function() {
        var data_id = $(this).parent('tr').attr('data'); 
           var userid = $(this).parent('tr').find('#userid').text();
           var name = $(this).parent('tr').find('#usname').text();
           var email = $(this).parent('tr').find('#usemail').text();
           var message = $(this).parent('tr').find('#usmessage').text();
           var date = $(this).parent('tr').find('#usdate').text();
          // console.log(userid,name,email,message,date); 

           $.ajax({
            type:"POST",
            data:{
              "id":userid,
              "name":name,
              "email":email,
              "message":message,
              "date":date
            },
            url:'update.php',
            datatype:"HTML",
            sucess:function(){
              alert("updated");
            },
           });
           
         });
});


 