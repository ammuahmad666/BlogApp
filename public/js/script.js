document.addEventListener('DOMContentLoaded',function(){
    const srchBtn=document.querySelector('.searchBtn');
    const srchBar=document.querySelector('.searchBar');
    const closeBtn=document.getElementById('searchClose');
    const input=document.getElementById('searchInput');
    srchBtn.addEventListener('click',()=>{
        srchBar.style.visibility='visible';
        srchBar.classList.add('open');
        this.setAttribute('aria-expanded','true');
        input.focus();
    })
    closeBtn.addEventListener('click',(e)=>{
        console.log(e);
        srchBar.style.visibilty='hidden';
        srchBar.classList.remove('open');
        this.setAttribute('aria-expanded','false');

        
    })
})