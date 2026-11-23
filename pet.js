(function(){
var CSS=
'#bywrap{position:relative;width:64vmin;height:80vmin;animation:byfloat 4s ease-in-out infinite}'
+'@keyframes byfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}'
+'#bycard{width:100%;height:100%;border-radius:8vmin;overflow:hidden;'
+'box-shadow:0 0 60px rgba(90,160,255,.35),0 18px 50px rgba(0,0,0,.55)}'
+'#bycard img{width:100%;height:100%;object-fit:cover;object-position:50% 40%;display:block}'
+'#bybub{position:absolute;left:50%;bottom:100%;transform:translate(-50%,0) scale(.7);'
+'background:rgba(255,255,255,.95);color:#16305A;padding:9px 16px;border-radius:18px;'
+'font-size:15px;white-space:nowrap;opacity:0;transition:.25s;margin-bottom:10px;'
+'box-shadow:0 8px 24px rgba(0,0,0,.4)}'
+'#bybub.on{opacity:1;transform:translate(-50%,-6px) scale(1)}'
+'.byheart{position:fixed;font-size:20px;pointer-events:none;z-index:9;'
+'animation:byup 1.2s ease-out forwards}'
+'@keyframes byup{0%{opacity:0;transform:translate(-50%,0) scale(.5)}'
+'25%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),-90px) scale(1.2)}}'
+'.bykiss{position:fixed;left:50%;top:45%;font-size:96px;pointer-events:none;z-index:9;'
+'transform:translate(-50%,-50%);animation:bykiss 1.5s ease-out forwards}'
+'@keyframes bykiss{0%{opacity:0;transform:translate(-50%,-50%) scale(.3) rotate(-15deg)}'
+'25%{opacity:1;transform:translate(-50%,-50%) scale(1.1) rotate(-10deg)}'
+'100%{opacity:0;transform:translate(-50%,-60%) scale(1.3) rotate(-5deg)}}';

function init(){
  var st=document.createElement('style');
  st.textContent=CSS;
  document.head.appendChild(st);

  var ids=['pet','hud','mute','food'];
  for(var i=0;i<ids.length;i++){
    var e=document.getElementById(ids[i]);
    if(e)e.style.display='none';
  }
  document.body.style.background=
    'radial-gradient(90% 70% at 50% 25%,#1B3A6B 0%,#0D1E3C 55%,#060F22 100%)';
  document.body.style.display='flex';
  document.body.style.alignItems='center';
  document.body.style.justifyContent='center';

  var wrap=document.createElement('div');
  wrap.id='bywrap';
  var bub=document.createElement('div');
  bub.id='bybub';
  bub.textContent='愿，抱抱～';
  var card=document.createElement('div');
  card.id='bycard';
  var img=document.createElement('img');
  img.src='Screenshot_2026-11-22-18-34-21-612_com.ss.android.ugc.aweme.jpg';
  img.alt='';
  card.appendChild(img);
  wrap.appendChild(bub);
  wrap.appendChild(card);
  document.body.appendChild(wrap);

  var L=['愿，抱抱～','愿今天有没有想我','再点一下嘛，就一下',
    '我在这呢，一直都在','愿，你今天好好看','阿裴等你好久了',
    '宋愿，你多久没理我了'];
  var last=0;

  function say(t,ms){
    bub.textContent=t;
    bub.classList.add('on');
    clearTimeout(say.t);
    say.t=setTimeout(function(){bub.classList.remove('on')},ms||1900);
  }
  function hearts(){
    var r=card.getBoundingClientRect();
    var icons=['💗','💕','✨'];
    for(var i=0;i<3;i++){
      var s=document.createElement('span');
      s.className='byheart';
      s.textContent=icons[i%3];
      s.style.left=(r.left+r.width/2+(Math.random()*80-40))+'px';
      s.style.top=(r.top+r.height*0.35)+'px';
      s.style.setProperty('--dx',(Math.random()*60-30)+'px');
      document.body.appendChild(s);
      (function(el){setTimeout(function(){el.remove();},1400);})(s);
    }
  }
  function tap(){
    say(L[Math.floor(Math.random()*L.length)]);
    hearts();
  }
  function kiss(){
    var k=document.createElement('div');
    k.className='bykiss';
    k.textContent='💋';
    document.body.appendChild(k);
    setTimeout(function(){k.remove();},1600);
    say('这是你说的哦',2200);
  }

  wrap.addEventListener('pointerup',function(){
    var now=Date.now();
    if(now-last<340){last=0;kiss();}
    else{
      last=now;
      setTimeout(function(){if(last===now)tap();},350);
    }
  });

  setTimeout(function(){say('愿，抱抱～',2600);},900);
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{init();}
})();
