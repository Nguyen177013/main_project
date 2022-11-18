let delete_btn = document.querySelectorAll('.option_btn');
let user_post = document.querySelectorAll('.list_posts .user_post');
delete_btn.forEach((ele,index)=>{
    ele.addEventListener('click',async function(e){
        let target = e.target;
        let postId = user_post[index].dataset.id;
        let req = await fetch('/figure-wiki/remove',{
            method:'POST',
            body: JSON.stringify({postId}),
            headers:{'Content-Type': 'application/json'}
        })
        let res = await req.json();
        if(res.success){
               //  ????? wtf i am doing :D ?
        target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode.parentNode.parentNode.parentNode);
        }
    })
})