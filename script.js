const PRODUCTS = [
  {id:'p-antidoping',name:'Prueba antidoping de 6 parámetros',detail:'Precio por pieza',price:100,category:'Pruebas rápidas',icon:'🧪',badge:'Oferta'},
  {id:'p-antidoping-caja',name:'Caja de pruebas antidoping',detail:'Caja con 25 piezas',price:2350,category:'Pruebas rápidas',icon:'📦',badge:'Oferta'},
  {id:'p-dengue',name:'Prueba Dengue Dúo',detail:'IgG/IgM + NS1, por pieza',price:90,category:'Pruebas rápidas',icon:'🦟',badge:'Oferta'},
  {id:'p-dengue-caja',name:'Caja Dengue Dúo',detail:'Caja con 25 pruebas',price:2100,category:'Pruebas rápidas',icon:'📦',badge:'Oferta'},
  {id:'p-covid',name:'Prueba COVID e Influenza Dúo',detail:'COVID-19 + Influenza A/B, por pieza',price:90,category:'Pruebas rápidas',icon:'🦠',badge:'Oferta'},
  {id:'p-covid-caja',name:'Caja COVID e Influenza Dúo',detail:'Caja con 25 pruebas',price:2050,category:'Pruebas rápidas',icon:'📦',badge:'Oferta'},
  {id:'p-cuadruple',name:'Prueba cuádruple rápida 4 en 1',detail:'COVID-19 + Influenza A/B + VRS + Adenovirus',price:120,category:'Pruebas rápidas',icon:'🧬',badge:'Oferta'},
  {id:'p-cuadruple-caja',name:'Caja de prueba cuádruple 4 en 1',detail:'Caja con 25 pruebas',price:2850,category:'Pruebas rápidas',icon:'📦',badge:'Oferta'},
  {id:'p-oximetro-nino',name:'Oxímetro para niño',detail:'Equipo de monitoreo pediátrico',price:180,category:'Equipo médico',icon:'👶'},
  {id:'p-oximetro-a2',name:'Oxímetro A2',detail:'Medición de saturación de oxígeno',price:100,category:'Equipo médico',icon:'🩺'},
  {id:'p-oximetro-economico',name:'Oxímetro económico',detail:'Equipo portátil',price:90,category:'Equipo médico',icon:'🫁'},
  {id:'p-lampara-oidos',name:'Lámpara para oídos',detail:'Equipo de exploración básica',price:100,category:'Equipo médico',icon:'🔦'},
  {id:'p-aciclovir',name:'Aciclovir 400 mg',detail:'Caja con 35 tabletas',price:87.82,category:'Medicamento básico',icon:'💊'},
  {id:'p-ibuprofeno',name:'Ibuprofeno 400 mg',detail:'Caja con 10 tabletas',price:21.62,category:'Medicamento básico',icon:'💊'},
  {id:'p-paracetamol',name:'Paracetamol',detail:'Presentación sujeta a disponibilidad',price:18,category:'Medicamento básico',icon:'💊'},
  {id:'p-amoxicilina',name:'Amoxicilina 500 mg',detail:'Caja con 12 cápsulas',price:22.48,category:'Medicamento básico',icon:'💊'},
  {id:'p-alcohol',name:'Alcohol desnaturalizado 250 ml',detail:'Uso externo',price:22.41,category:'Material de curación',icon:'🧴'},
  {id:'p-algodon',name:'Algodón plisado 100 g',detail:'Material de curación',price:27.45,category:'Material de curación',icon:'☁️'},
  {id:'p-gasa',name:'Gasa esterilizada 10 x 10 cm',detail:'Paquete con 10 sobres',price:19.38,category:'Material de curación',icon:'🩹'},
  {id:'p-complejo-b',name:'Complejo B',detail:'Caja con 30 tabletas',price:37.81,category:'Vitaminas',icon:'🌿'},
  {id:'p-suplemento17',name:'Suplemento con 17 vitaminas',detail:'Suplemento alimenticio',price:300,category:'Vitaminas',icon:'🍊'},
  {id:'p-forxiga',name:'Forxiga',detail:'Presentación sujeta a disponibilidad',price:333,category:'Diabetes',icon:'💙'},
  {id:'p-trayenta',name:'Trayenta',detail:'Presentación sujeta a disponibilidad',price:333,category:'Diabetes',icon:'💙'},
  {id:'p-alprazolam025',name:'Alprazolam 0.25 mg',detail:'Caja con 30 tabletas',price:145,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-alprazolam05',name:'Alprazolam 0.50 mg',detail:'Caja con 30 tabletas',price:202,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-alprazolam1',name:'Alprazolam 1 mg',detail:'Caja con 30 tabletas',price:174,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-alprazolam2',name:'Alprazolam 2 mg',detail:'Caja con 30 tabletas',price:283,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-farmapram05',name:'Farmapram 0.50 mg',detail:'Alprazolam, caja con 30 tabletas',price:256,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-farmapram2',name:'Farmapram 2 mg',detail:'Alprazolam, caja con 30 tabletas',price:413,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-bromazepam',name:'Bromazepam 3 mg',detail:'Caja con 30 tabletas',price:180,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-clonazepam-gotas',name:'Clonazepam gotas',detail:'Presentación sujeta a disponibilidad',price:90,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-clonazepam-tabs',name:'Clonazepam tabletas',detail:'Presentación sujeta a disponibilidad',price:90,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-diazepam',name:'Diazepam',detail:'Presentación sujeta a disponibilidad',price:90,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-metilfenidato',name:'Metilfenidato 10 mg',detail:'Caja con 60 tabletas',price:300,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-tradea',name:'Tradea LP 20 mg',detail:'Liberación prolongada, caja con 30 tabletas',price:973,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-axcion',name:'Axcion Fentermina 30 mg',detail:'Caja con 30 tabletas',price:310,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-axcion-ap',name:'Axcion AP Fentermina 30 mg',detail:'Caja con 30 tabletas',price:498,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-itravil',name:'Itravil Clobenzorex 30 mg',detail:'Caja con 60 cápsulas',price:835,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-terfarmex',name:'Terfarmex Fentermina 15 mg',detail:'Presentación sujeta a disponibilidad',price:228,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-tramadol-para',name:'Tramadol / Paracetamol Alpharma',detail:'Presentación sujeta a disponibilidad',price:75,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-tramadol-gotas',name:'Tramadol en gotas Alpharma',detail:'Presentación sujeta a disponibilidad',price:75,category:'Medicamento especial',icon:'🔒',special:true}
];

const state={cart:JSON.parse(localStorage.getItem('elbambino-cart')||'{}'),category:'Todos',query:'',offer:0};
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const money=value=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
const saveCart=()=>localStorage.setItem('elbambino-cart',JSON.stringify(state.cart));

function populateCategories(){
  const select=$('#categoryFilter');
  [...new Set(PRODUCTS.map(p=>p.category))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;select.appendChild(o)});
}

function renderProducts(){
  const grid=$('#productGrid');
  const q=state.query.trim().toLowerCase();
  const list=PRODUCTS.filter(p=>(state.category==='Todos'||p.category===state.category)&&(!q||`${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(q)));
  grid.innerHTML=list.map(p=>`<article class="product-card ${p.special?'special-card':''}">
    <span class="product-badge ${p.special?'special-badge':''}">${p.special?'Medicamento especial':(p.badge||p.category)}</span>
    <div class="product-visual">${p.icon}</div>
    <div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p class="product-detail">${p.detail}</p><div class="product-price">${money(p.price)}</div><div class="estimated">Precio estimado; puede variar al llegar desde almacén.</div>
    <div class="product-actions"><button class="btn ${p.special?'btn-special':'btn-primary'} add-product" data-product-id="${p.id}">${p.special?'Solicitar (cuento con receta)':'Agregar al carrito'}</button><input class="qty-input" data-qty-for="${p.id}" type="number" value="1" min="1" max="99" aria-label="Cantidad"></div></div>
  </article>`).join('');
  $('#emptyState').hidden=list.length>0;
  $$('.add-product').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.productId,Number(document.querySelector(`[data-qty-for="${b.dataset.productId}"]`).value)||1)));
}

function addToCart(id,qty=1){state.cart[id]=(state.cart[id]||0)+qty;saveCart();renderCart();openPanel('cartDrawer')}
function changeQty(id,delta){state.cart[id]=(state.cart[id]||0)+delta;if(state.cart[id]<=0)delete state.cart[id];saveCart();renderCart()}
function removeItem(id){delete state.cart[id];saveCart();renderCart()}
function cartEntries(){return Object.entries(state.cart).map(([id,qty])=>({product:PRODUCTS.find(p=>p.id===id),qty})).filter(x=>x.product)}
function renderCart(){
  const items=cartEntries();const count=items.reduce((s,x)=>s+x.qty,0);const subtotal=items.reduce((s,x)=>s+x.product.price*x.qty,0);
  $('#cartCount').textContent=count;$('#cartSubtotal').textContent=money(subtotal);
  $('#cartItems').innerHTML=items.length?items.map(({product:p,qty})=>`<div class="cart-row"><div><h4>${p.name}</h4><small>${money(p.price)} c/u</small><div class="cart-row-actions"><button data-minus="${p.id}">−</button><strong>${qty}</strong><button data-plus="${p.id}">+</button><button class="remove-item" data-remove="${p.id}">Eliminar</button></div></div><strong>${money(p.price*qty)}</strong></div>`).join(''):'<div class="cart-empty"><div style="font-size:54px">🛒</div><h3>Tu carrito está vacío</h3><p>Agrega productos para comenzar.</p></div>';
  $$('[data-minus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));$$('[data-plus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));$$('[data-remove]').forEach(b=>b.onclick=()=>removeItem(b.dataset.remove));
  $('#checkoutButton').disabled=!items.length;
}

function openPanel(id){$('#overlay').hidden=false;const el=document.getElementById(id);el.hidden=false;requestAnimationFrame(()=>el.classList.add('open'));el.setAttribute('aria-hidden','false')}
function closePanel(id){const el=document.getElementById(id);el.classList.remove('open');el.setAttribute('aria-hidden','true');setTimeout(()=>{el.hidden=true;if(!document.querySelector('.drawer.open')&&!document.querySelector('.modal:not([hidden])'))$('#overlay').hidden=true},320)}
function closeModal(id){document.getElementById(id).hidden=true;$('#overlay').hidden=true}

function setupOffers(){
  const slides=$$('.offer-slide');const dots=$('#offerDots');
  slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Mostrar oferta ${i+1}`);b.onclick=()=>showOffer(i);dots.appendChild(b)});
  function show(i){state.offer=(i+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('active',j===state.offer));[...dots.children].forEach((d,j)=>d.classList.toggle('active',j===state.offer))}
  window.showOffer=show;show(0);$('#prevOffer').onclick=()=>show(state.offer-1);$('#nextOffer').onclick=()=>show(state.offer+1);setInterval(()=>show(state.offer+1),6500);
}

function setupSearch(){
  const input=$('#searchInput');const suggestions=$('#searchSuggestions');
  const update=()=>{state.query=input.value;renderProducts();const q=input.value.trim().toLowerCase();if(!q){suggestions.hidden=true;return}const hits=PRODUCTS.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(q)).slice(0,7);suggestions.innerHTML=hits.map(p=>`<button type="button" data-suggest="${p.id}"><span>${p.name}</span><strong>${money(p.price)}</strong></button>`).join('');suggestions.hidden=!hits.length;$$('[data-suggest]').forEach(b=>b.onclick=()=>{const p=PRODUCTS.find(x=>x.id===b.dataset.suggest);input.value=p.name;state.query=p.name;state.category='Todos';$('#categoryFilter').value='Todos';renderProducts();suggestions.hidden=true;document.querySelector('#productos').scrollIntoView()})};
  input.addEventListener('input',update);$('#searchButton').onclick=()=>{update();document.querySelector('#productos').scrollIntoView()};document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))suggestions.hidden=true});
}

function setupCheckout(){
  $('#checkoutButton').onclick=()=>{if(!cartEntries().length)return;closePanel('cartDrawer');setTimeout(()=>openPanel('checkoutDrawer'),340)};
  $('#checkoutForm').addEventListener('submit',e=>{
    e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());const items=cartEntries();const subtotal=items.reduce((s,x)=>s+x.product.price*x.qty,0);const folio=`EBD-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
    const order={folio,fecha:new Date().toISOString(),cliente:data,productos:items.map(x=>({id:x.product.id,nombre:x.product.name,cantidad:x.qty,precioEstimado:x.product.price})),subtotalEstimado:subtotal,estado:'Pedido recibido',avisoPrecio:'El precio final se confirma cuando el producto llega desde almacén.'};
    const orders=JSON.parse(localStorage.getItem('elbambino-orders')||'[]');orders.unshift(order);localStorage.setItem('elbambino-orders',JSON.stringify(orders));
    closePanel('checkoutDrawer');state.cart={};saveCart();renderCart();e.currentTarget.reset();setTimeout(()=>{$('#overlay').hidden=false;$('#successModal').hidden=false;$('#orderNumber').textContent=folio},340);
  });
}

function init(){
  populateCategories();renderProducts();renderCart();setupOffers();setupSearch();setupCheckout();
  $('#categoryFilter').onchange=e=>{state.category=e.target.value;renderProducts()};
  $$('.category-card').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;$('#categoryFilter').value=state.category;renderProducts();document.querySelector('#productos').scrollIntoView()});
  $$('.quick-add').forEach(b=>b.onclick=()=>addToCart(b.dataset.productId,1));
  $('#cartButton').onclick=()=>openPanel('cartDrawer');
  $$('[data-close]').forEach(b=>b.onclick=()=>{const id=b.dataset.close;document.getElementById(id).classList.contains('drawer')?closePanel(id):closeModal(id)});
  $('#overlay').onclick=()=>{$$('.drawer.open').forEach(d=>closePanel(d.id));if(!$('#successModal').hidden)closeModal('successModal')};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$$('.drawer.open').forEach(d=>closePanel(d.id));if(!$('#successModal').hidden)closeModal('successModal')}});
}

document.addEventListener('DOMContentLoaded',init);
