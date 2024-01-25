document.addEventListener("DOMContentLoaded", () => {
  displayBlogs();
});

const baseUrl =
  "https://crudcrud.com/api/e2e97f4c37184bb6a962e1cfe09d630e/blog/";

const blogRowRef = document
  .getElementById("blog-data");
 
const title = document.getElementById("title");
const description = document.getElementById("description");
const img_url = document.getElementById("img_url");
const id = document.getElementById("_id");

function addBlog(e) {
  e.preventDefault();

  const titleVal = title.value.trim();
  const descriptionVal = description.value.trim();
  const img_urlVal = img_url.value.trim();
  const idVal = id.value.trim();
console.log(idVal);
  if (titleVal === "" || descriptionVal === "") {
    alert("Please enter both title and description.");
    return;
  }

  const patientDetail = {
    title: titleVal,
    description: descriptionVal,
    img_url: img_urlVal,
  };

  console.log(idVal, "test");
  if (idVal === "") {
  // add to server
  axios
    .post(baseUrl, patientDetail)
    .then((res) => {
      displayBlog(res.data);
    })
    .catch((err) => console.log(err));
  
  }else{
    console.log(baseUrl+idVal);
    console.log(patientDetail);
    axios
    .put(baseUrl+idVal, patientDetail)
    .then((res) => {
      displayBlog({
        title: titleVal,
        description: descriptionVal,
        img_url: img_urlVal,
        _id:idVal
      });
    })
    .catch((err) => console.log(err));
  }
  
  title.value = "";
  description.value = "";
  img_url.value = "";
  idVal.value = "";
}

function displayBlogs() {
  axios
    .get(baseUrl)
    .then((blogs) => {
      // console.log(blogs);
      blogs.data.forEach((blog, index) => {
        displayBlogTable(blog);
      });
    })
    .catch((err) => console.log(err));
}

function displayBlog(blog) {
  displayBlogTable(blog);
}

function displayBlogTable(blog) {
  var div = document.createElement("div");
  const myHtmlContent = 
  `<div class="card" style="width: 18rem;">
        <img src="${blog.img_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${blog.title}</h5>
            <p class="card-text">${blog.description}</p>
            <button onclick="updateBlog('${blog._id}',event)" class="btn btn-primary">Edit</button>
            <button class="btn btn-danger removeConditionBtn" onclick="deleteBlog('${blog._id}',event)" >delete</button>
        </div>
    </div>
`;
div.classList.add("col-sm-4");
div.classList.add("mb-3");
div.classList.add("mb-sm-0");
div.innerHTML = myHtmlContent;
  // var newRow = blogRowRef.insertRow(blogRowRef.rows.length);
  blogRowRef.appendChild(div);
}
function deleteBlog(id, e) {
  const confirmRes = confirm("Are you sure want to delete ?");
  if (!confirmRes) {
    return;
  }
   
  
    
  axios
    .delete(baseUrl + id)
    .then((res) => {
      if (res.status === 200) {
       // event.target will be the input element.
    var td = e.target.parentNode;
    var tr = td.parentNode; // the row to be removed
    var tr1 = tr.parentNode; // the row to be removed
    tr1.parentNode.removeChild(tr1);
      }
    })
    .catch((err) => console.log(err));
}

function updateBlog(b_id, e) {
   // event.target will be the input element.
   var td = e.target.parentNode;
   var tr = td.parentNode; // the row to be removed
 
   
   // inserting the values in form input
   title.value = tr.childNodes[3].childNodes[1].innerText;
   description.value = tr.childNodes[3].childNodes[3].innerText;
   img_url.value = tr.childNodes[1].src;
   id.value = b_id;
    
   var tr1 = tr.parentNode; // the row to be removed
    tr1.parentNode.removeChild(tr1);
  // axios
  //   .delete(baseUrl + id)
  //   .then((res) => {
  //     if (res.status === 200) {
       
  //     }
  //   })
  //   .catch((err) => console.log(err));
}
