'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Odpri meni');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Zapri meni':'Odpri meni');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const header=document.querySelector('header');
function headerState(){header?.classList.toggle('scrolled',window.scrollY>20);}
window.addEventListener('scroll',headerState,{passive:true});headerState();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('js-motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:0.08});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;document.querySelectorAll('[data-category]').forEach(card=>{const show=button.dataset.filter==='all'||card.dataset.category===button.dataset.filter;card.hidden=!show;if(show){count++;card.classList.add('visible');}});
 document.querySelector('#filter-status').textContent='Prikazanih izdelkov: '+count;
}));
const seasons={pomlad:['MAREC · APRIL · MAJ','Prvi sveži <em>okusi.</em>','Pomlad je čas špargljev. Proti koncu pomladi se običajno začne tudi sezona jagod. Začetek obiranja je odvisen od vremena.'],poletje:['JUNIJ · JULIJ · AVGUST','Poletje prinese <em>barve.</em>','Zgodnje poletje zaznamujejo jagode, poleti pa poteka tudi spravilo česna in čebule. Različne vrtnine zorijo ob različnih časih – točen izbor preverite pri posestvu.'],jesen:['SEPTEMBER · OKTOBER · NOVEMBER','Okusi za <em>shrambo.</em>','Jesen povezuje pozne pridelke in shranjevanje. Čebula in česen sta lahko na voljo iz skladišča, predelane dobrote pa glede na zalogo.'],zima:['DECEMBER · JANUAR · FEBRUAR','Vrt si <em>odpočije.</em>','Na prostem je svežih pridelkov manj. V ospredje stopijo skladiščeni pridelki in dobrote v kozarčku. Njihovo razpoložljivost preverite neposredno.']};
function setSeason(key){if(!Object.hasOwn(seasons,key)||!document.querySelector('#season-info'))return;const [months,title,desc]=seasons[key];document.querySelector('#season-info').innerHTML='<span class="eyebrow">'+months+'</span><h2>'+title+'</h2><p>'+desc+'</p>';document.querySelectorAll('[data-season]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.season===key)));}
document.querySelectorAll('[data-season]').forEach(b=>b.addEventListener('click',()=>setSeason(b.dataset.season)));
const params=new URLSearchParams(location.search);setSeason(params.get('sezona'));
const product=document.querySelector('#izdelek');const requested=params.get('izdelek');if(product&&[...product.options].some(o=>o.value===requested))product.value=requested;
// This demo never reads, transmits or persists form field values.
document.querySelector('#demo-submit')?.addEventListener('click',()=>{document.querySelector('#form-status').textContent='To je samo predstavitveni obrazec. Nič ni bilo poslano ali shranjeno.';});
