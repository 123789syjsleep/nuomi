(function(){
function init(){
  var pet=document.getElementById('pet'),bub=document.getElementById('bub'),
  food=document.getElementById('food'),look=document.getElementById('look'),
  bar=document.querySelector('#bar i'),muteBtn=document.getElementById('mute');
  if(!pet)return;
  var FULL=['好吃！','喵呜～','还要还要','嘿嘿','太香了'],
  NEED=['饿了…','想吃小鱼干','肚子空空的','喵…'],
  L=['喵～','你好呀','摸摸头','我在这','要一起玩吗','嘿嘿','别走嘛'];
  var full=70,muted=false,x=0,y=0,sx=0,sy=0,down=false,moved=false;
  function put(a,b){var w=pet.offsetWidth,h=pet.offsetHeight;
  x=Math.max(0,Math.min(a,innerWidth-w));y=Math.max(0,Math.min(b,innerHeight-h));
  pet.style.transform='translate3d('+x+'px,'+y+'px,0)';}
  function say(t){bub.textContent=t;bub.classList.add('on');
  clearTimeout(say.t);say.t=setTimeout(function(){bub.classList.remove('on')},1700);}
  function speak(t){if(muted)return;try{var u=new SpeechSynthesisUtterance(t);
  u.lang='zh-CN';u.pitch=1.6;u.rate=1.05;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
  function happy(){pet.classList.add('happy');
  setTimeout(function(){pet.classList.remove('happy')},900);}
  function setBar(){bar.style.width=full+'%';}
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  function feed(el){if(full>=100){say('吃不下了…');return;}
  food.textContent=el.textContent;
  food.classList.remove('eat');void food.offsetWidth;food.classList.add('eat');
  setTimeout(function(){full=Math.min(100,full+18);setBar();happy();
  say(pick(FULL));speak('喵呜');},600);}
  var bs=document.querySelectorAll('.btns button');
  for(var i=0;i<bs.length;i++){(function(b){
    b.addEventListener('click',function(){feed(b);});})(bs[i]);}
  function tap(){happy();say(pick(L));speak('喵');}
  pet.addEventListener('pointerdown',function(e){e.preventDefault();
  down=true;moved=false;sx=e.clientX-x;sy=e.clientY-y;});
  pet.addEventListener('pointermove',function(e){if(!down)return;
  var nx=e.clientX-sx,ny=e.clientY-sy;
  if(Math.abs(nx-x)>5||Math.abs(ny-y)>5)moved=true;put(nx,ny);});
  pet.addEventListener('pointerup',function(){down=false;if(!moved)tap();});
  document.addEventListener('pointermove',function(e){
  var r=pet.getBoundingClientRect(),ox=r.left+r.width/2,oy=r.top+r.height*.62;
  look.style.transform='translate('+Math.max(-5,Math.min(5,(e.clientX-ox)/50))+'px,'+
  Math.max(-4,Math.min(4,(e.clientY-oy)/70))+'px)';});
  muteBtn.addEventListener('click',function(){muted=!muted;
  muteBtn.textContent=muted?'🔇':'🔊';
  if(muted&&window.speechSynthesis)speechSynthesis.cancel();});
  setInterval(function(){if(full>0){full=Math.max(0,full-1);setBar();}
  if(full<30&&Math.random()<.3)say(pick(NEED));},7000);
  setBar();put((innerWidth-pet.offsetWidth)/2,innerHeight*0.34);
  setTimeout(function(){say('喵～');speak('喵');},700);
  window.onresize=function(){put(x,y);};
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{init();}
})();
