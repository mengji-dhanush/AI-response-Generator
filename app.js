let btn=document.querySelector("button");
let inp=document.querySelector("input");
let p=document.querySelector("p");
btn.addEventListener("click",async ()=>{
    p.innerText='Generating response...';
    let prmpt=inp.value;
    const response=await fetch("http://localhost:3000/generate",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            prompt:prmpt
        }),
    })
    try{
        const data = await response.text();
        p.innerText=data;
    }catch(error)
    {
        p.innerText=error;
    }
});