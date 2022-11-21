const pagination = document.querySelector('.pagination');
const size = length/5;
for(let i =0;i<size;i++){
    let button = document.createElement('div');
    button.classList.add('page_btn');
    if(i==0){
        button.innerHTML = `<a href="/figure/latest/1" class="page">${i+1}</a>`
    }
    else
    button.innerHTML = `<a href="/figure/latest/${i+1}" class="page">${i+1}</a>`
    if(i== page)
    button.innerHTML = `<a href="/figure/latest/${i}" class="page selected">${i+1}</a>`
    pagination.appendChild(button);
}

