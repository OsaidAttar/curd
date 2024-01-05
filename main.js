var courseName =document.getElementById("courseName");
var courseCategory =document.getElementById("courseCategory");
var coursePrice =document.getElementById("coursePrice");
var courseDescription =document.getElementById("courseDescription");
var courseCapacity =document.getElementById("courseCapacity");
var addbtn =document.getElementById("click");
var data=document.getElementById("data");
var deleteBtn =document.getElementById("deleteBtn");
var search=document.getElementById("search");
var currentindex=0;
var Courses

if(JSON.parse(localStorage.getItem('courses'))==null){
    courses=[];
}
else{
var courses =JSON.parse(localStorage.getItem('courses'));
displayData();
}
addbtn.onclick=function(e){
    e.preventDefault();
   if(addbtn.value=='Add Course'){
    addcourse()
   }
   else{
    updateCourse();
   }
   displayData();
    clearInputs();
    courseName.classList.remove('is-valid')
    courseCategory.classList.remove('is-valid')
    coursePrice.classList.remove('is-valid')
    courseDescription.classList.remove('is-valid')
    courseCapacity.classList.remove('is-valid')
    
}
function addcourse(){
    var course ={
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value
    
    }
    courses.push(course)
    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Courses added successfully',
        showConfirmButton: false,
        timer: 700
      })
    
    
  
}

function clearInputs(){
    courseName.value='';
    courseCategory.value='';
    coursePrice.value='';
    courseDescription.value='';
    courseCapacity.value='';
}
function displayData(){
    var result='';
    for(var i=0;i<courses.length;i++){
        result +=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info " onclick="getCourse(${i})">update</button></td>

        <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
       </tr> 
        
        
        
        
        `
    }
    data.innerHTML=result;
   
    }
    function deleteCourse(index){
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                courses.splice(index,1);
                localStorage.setItem('courses',JSON.stringify(courses))
        displayData();
             Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    deleteBtn.onclick= function(){
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses))
    data.innerHTML='';
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}
search.onkeyup=function(){
    
    var result='';
    for(var i=0;i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
        result +=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info">update</button></td>

        <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
       </tr> 
        
        
        
        
        `
    }
}
    data.innerHTML=result;
}

function getCourse(index){
    var course =courses[index];
    courseName.value=course.courseName;
    courseCategory.value=course.courseCategory;
    coursePrice.value=course.coursePrice;
    courseDescription.value=course.courseDescription;
    courseCapacity.value=course.courseCapacity;
    addbtn.value='Update Course';
    currentindex=index
}
function updateCourse(){
    var course ={
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value
    
    }
    var name=courses[currentindex].courseName
    courses[currentindex].courseName=course.courseName;
    courses[currentindex].courseCategory=course.courseCategory;
    courses[currentindex].coursePrice=course.coursePrice;
    courses[currentindex].courseDescription=course.courseDescription;
    courses[currentindex].courseCapacity=course.courseCapacity;
    addbtn.value="Add Course";
    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${name} update successfully`,
        showConfirmButton: false,
        timer: 700
      })
    
    
}
//regularx
//no number
//name lenght =3-10
///^(A-Z)(a-z)(2,10)$
courseName.onkeyup =function(){
var pattern =/^[A-Z][a-z]{2,10}$/;
if(pattern.test(courseName.value)){
    if(courseName.classList.contains('is-invalid') && document.getElementById('nameAlert').classList.contains('d-block')){
        courseName.classList.replace('is-invalid', 'is-valid')
        document.getElementById('nameAlert').classList.replace('d-block','d-none');
    }else
    courseName.classList.add('is-valid');
    addbtn.removeAttribute('disabled');
    
    
}
else{
    if(courseName.classList.contains('is-valid')&& document.getElementById('nameAlert').classList.contains('d-none')){
        courseName.classList.replace('is-valid', 'is-invalid')
        document.getElementById('nameAlert').classList.replace('d-none','d-block');
    }
    else
    courseName.classList.add('is-invalid');
    document.getElementById('nameAlert').classList.replace('d-none','d-block');
    addbtn.setAttribute('disabled','disabled');
    
}
}

courseCategory.onkeyup =function(){
    var pattern =/^[A-Z][a-z]{2,20}$/;
    if(pattern.test(courseCategory.value)){
        if(courseCategory.classList.contains('is-invalid') && document.getElementById('catgAlert').classList.contains('d-block')){
            courseCategory.classList.replace('is-invalid', 'is-valid')
            document.getElementById('catgAlert').classList.replace('d-block','d-none');
        }else
        courseCategory.classList.add('is-valid');
        addbtn.removeAttribute('disabled');
        
        
    }
    else{
        if(courseCategory.classList.contains('is-valid')&& document.getElementById('catgAlert').classList.contains('d-none')){
            courseCategory.classList.replace('is-valid', 'is-invalid')
            document.getElementById('catgAlert').classList.replace('d-none','d-block');
        }
        else
        courseCategory.classList.add('is-invalid');
        document.getElementById('catgAlert').classList.replace('d-none','d-block');
        addbtn.setAttribute('disabled','disabled');
        
    }
    }

    coursePrice.onkeyup =function(){
        var pattern =/^[0-9]{3,4}$/;
        if(pattern.test(coursePrice.value)){
            if(coursePrice.classList.contains('is-invalid') && document.getElementById('priAlert').classList.contains('d-block')){
                coursePrice.classList.replace('is-invalid', 'is-valid')
                document.getElementById('priAlert').classList.replace('d-block','d-none');
            }else
            coursePrice.classList.add('is-valid');
            addbtn.removeAttribute('disabled');
            
            
        }
        else{
            if(coursePrice.classList.contains('is-valid')&& document.getElementById('priAlert').classList.contains('d-none')){
                coursePrice.classList.replace('is-valid', 'is-invalid')
                document.getElementById('priAlert').classList.replace('d-none','d-block');
            }
            else
            coursePrice.classList.add('is-invalid');
            document.getElementById('priAlert').classList.replace('d-none','d-block');
            addbtn.setAttribute('disabled','disabled');
            
        }
        }

        courseDescription.onkeyup =function(){
            var pattern =/^[A-Z][A-Za-z0-9\s]{3,120}$/; //\s space
            if(pattern.test(courseDescription.value)){
                if(courseDescription.classList.contains('is-invalid') && document.getElementById('desAlert').classList.contains('d-block')){
                    courseDescription.classList.replace('is-invalid', 'is-valid')
                    document.getElementById('desAlert').classList.replace('d-block','d-none');
                }else
                courseDescription.classList.add('is-valid');
                addbtn.removeAttribute('disabled');
                
                
            }
            else{
                if(courseDescription.classList.contains('is-valid')&& document.getElementById('desAlert').classList.contains('d-none')){
                    courseDescription.classList.replace('is-valid', 'is-invalid')
                    document.getElementById('desAlert').classList.replace('d-none','d-block');
                }
                else
                courseDescription.classList.add('is-invalid');
                document.getElementById('desAlert').classList.replace('d-none','d-block');
                addbtn.setAttribute('disabled','disabled');
                
            }
            }


            courseCapacity.onkeyup =function(){
                var pattern =/^[0-9]{2,3}$/;
                if(pattern.test(courseCapacity.value)){
                    if(courseCapacity.classList.contains('is-invalid') && document.getElementById('cpaAlert').classList.contains('d-block')){
                        courseCapacity.classList.replace('is-invalid', 'is-valid')
                        document.getElementById('cpaAlert').classList.replace('d-block','d-none');
                    }else
                    courseCapacity.classList.add('is-valid');
                    addbtn.removeAttribute('disabled');
                    
                    
                }
                else{
                    if(courseCapacity.classList.contains('is-valid')&& document.getElementById('cpaAlert').classList.contains('d-none')){
                        courseCapacity.classList.replace('is-valid', 'is-invalid')
                        document.getElementById('cpaAlert').classList.replace('d-none','d-block');
                    }
                    else
                    courseCapacity.classList.add('is-invalid');
                    document.getElementById('cpaAlert').classList.replace('d-none','d-block');
                    addbtn.setAttribute('disabled','disabled');
                    
                }
                }
   

       

           