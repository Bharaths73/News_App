import './style.css';

const API_KEY='df40d8b123524e858870300f256a6d87';


function hamburgerHandler(e){
    const hamburgerContainer=document.querySelector('#nav_links_div');
    console.log(hamburgerContainer.style.display);
    if(window.getComputedStyle(hamburgerContainer).display === 'none'){
      hamburgerContainer.style.display='block';
    }
    else{
      hamburgerContainer.style.display='none';
    }
}


function createTemplate(data){
  const app=document.querySelector('#app');
  const card_wrapper=app.querySelector('#card_wrapper');
  const card=document.querySelector('#template');
  const clone = card.content.cloneNode(true);
  // console.log(clone);
  let newsImg=clone.querySelector('#news_image');
  let content_heading=clone.querySelector('#content_heading');
  let content_desc=clone.querySelector('#content_desc');

  if(!data.urlToImage){
    return;
  }

  newsImg.src=data.urlToImage;
  // console.log("title is ",data.title);
  content_heading.innerHTML=data.title;
  content_desc.innerHTML=data.description;

  const cardElement = clone.querySelector('#card');
  cardElement.addEventListener('click', () => {
    window.open(data.url, '_blank');
  });

  card_wrapper.appendChild(clone);
}


let curSelected=null;
async function fetchData(query){
  query.preventDefault();
  let CATEGORY;
  if(query && query.target.id==='search_container'){
    curSelected?.classList.remove('active')
    CATEGORY=document.querySelector('#search_box').value;
    document.querySelector('#search_box').value='';
  }
  else if(query && query.target.name){
    CATEGORY=query.target.name;
    console.log("curSelected before ",curSelected);
    curSelected?.classList.remove('active')
    curSelected=query.target;
    console.log("curSelected is ",curSelected);
    curSelected.classList.add('active')
  }
  else{
    CATEGORY='business'
  }
 
  const res=await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${CATEGORY}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  const card_wrapper = document.querySelector('#card_wrapper');
  card_wrapper.innerHTML = ''; 
  if(data?.articles?.length>0){
    data?.articles.map((card)=>{
      createTemplate(card);
    })
  }
  else{
    card_wrapper.innerHTML='<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center"><p style="color:White;font-size:2em;">No Data Found</p></div>'
  }
}


window.addEventListener('DOMContentLoaded',fetchData);
document.querySelector('#hamburger').addEventListener('click',hamburgerHandler);
const nav_links=document.querySelectorAll('.nav_link');
document.querySelector('#search_container').addEventListener('submit',fetchData)




nav_links.forEach((link)=>link.addEventListener('click',fetchData));




