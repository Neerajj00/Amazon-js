const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    const response = xhr.response;
    console.log(response);
});

xhr.open('GET','https://supersimplebackend.dev/not-supported');
xhr.send();
