(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n||0));
  const slug = v => String(v||'producto').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  const specials = [
    ['Tramadol cápsulas 100 mg ADIOL','Caja con 10 cápsulas',75],
    ['Alprazolam 1 mg con 30 tabletas','',174],['Alprazolam 0.25 mg','',145],['Alprazolam 0.50 mg con 30 tabletas','',202],['Alprazolam 2 mg con 30 tabletas','',283],
    ['Axcion fentermina 30 mg con 30 tabletas','',310],['Axcion fentermina AP 30 mg con 30 tabletas','',498],['Bromazepam 3 mg con 30 tabletas','',180],
    ['Clonazepam gotas','',90],['Clonazepam tabletas','',90],['Diazepam','',90],['Diazepam 10 mg Tempus','',100],['Diazepam 50 ampolletas','',580],
    ['Esbecalps 60 tabletas','',837],['Farmapram Alprazolam 0.50 mg con 30 tabletas','',256],['Farmapram Alprazolam 2 mg con 30 tabletas','',413],
    ['Forxiga','',333],['Imipramina 25 mg con 20 tabletas','',125],['Itravil clobenzorex 30 mg con 60 cápsulas','',835],['Lámpara para oídos','',100],
    ['Lose 1 mg','',230],['Lose 2 mg','',277],['Metilfenidato 10 mg con 60 tabletas','',300],['Obeclox con 60','',864],
    ['Suplemento alimenticio con 17 vitaminas','',300],['Terfarmex fentermina 15 mg','',228],['Tradea LP Metilfenidato 20 mg liberación prolongada con 30 tabletas','',973],
    ['Tramadol/paracetamol Alpharma','',75],['Tramadol en gotas Alpharma','',75]
  ].map(([name,detail,price])=>({id:`esp-${slug(name)}`,name,detail,price,category:'Medicamento especial',special:true,icon:'🔒'}));

  const promos = [
    {id:'promo-forxiga-3',name:'Promoción Forxiga: 3 cajas',detail:'3 cajas por $1,000',price:1000,category:'Diabetes',icon:'💙'},
    {id:'promo-trayenta-3',name:'Promoción Trayenta: 3 cajas',detail:'3 cajas por $1,000',price:1000,category:'Diabetes',icon:'💙'}
  ];
  const quick = [
    {id:'p-antidoping',name:'Prueba antidoping 6 parámetros',detail:'Prueba rápida',price:100,category:'Otros productos',icon:'🧪'},
    {id:'p-dengue',name:'Prueba Dengue Dúo',detail:'Prueba rápida',price:90,category:'Otros productos',icon:'🧪'},
    {id:'p-covid',name:'Prueba COVID e Influenza Dúo',detail:'Prueba rápida',price:90,category:'Otros productos',icon:'🧪'},
    {id:'p-cuadruple',name:'Prueba cuádruple Influenza A/B, COVID, VSR y Adenovirus',detail:'Prueba rápida',price:120,category:'Otros productos',icon:'🧪'}
  ];

  const normalize = (p,i) => ({
    id:String(p.id||`producto-${i}`), name:String(p.name||p.nombre||'Producto'), detail:String(p.detail||p.descripcion||p.presentacion||''),
    price:Number(p.price??p.precio??p.precioPublico??0), category:String(p.category||p.categoria||'Medicamento básico'), special:Boolean(p.special), icon:p.icon||'💊'
  });
  const seen=new Set();
  const PRODUCTS=[...(window.BASIC_PRODUCTS||[]).map(normalize),...specials,...promos,...quick].map(normalize).filter(p=>!seen.has(p.id)&&seen.add(p.id));
  const state={category:'Todos',query:'',cart:JSON.parse(localStorage.getItem('elbambino-cart')||'{}')};
  const saveCart=()=>localStorage.setItem('elbambino-cart',JSON.stringify(state.cart));
  const cartEntries=()=>Object.entries(state.cart).map(([id,qty])=>({product:PRODUCTS.find(p=>p.id===id),qty:Number(qty)})).filter(x=>x.product&&x.qty>0);

  function injectStyles(){
    if($('#lista-final-css')) return;
    const style=document.createElement('style'); style.id='lista-final-css'; style.textContent=`
      #productGrid.product-grid{display:block!important}.basic-list-header,.basic-row{display:grid;grid-template-columns:minmax(0,1fr) 150px 150px;gap:12px;align-items:center}.basic-list-header{padding:12px 15px;background:#102f65;color:#fff;border-radius:12px 12px 0 0;font-weight:800}.basic-row{padding:10px 15px;background:#fff;border:1px solid #dfe7f1;border-top:0}.basic-row:last-child{border-radius:0 0 12px 12px}.basic-row strong{color:#102f65}.basic-row button{padding:9px 10px}.special-notice{padding:16px 18px;margin:0 0 14px;background:#fff4f5;border:1px solid #e7a9b0;border-radius:14px;color:#7a1721;font-weight:700}.special-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.special-mini{background:#fff;border:1px solid #e7a9b0;border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:9px}.special-mini h3{margin:0;font-size:17px}.special-mini button{margin-top:auto}.promo-row{background:#edf6ff;border-color:#8ebbe9}.category-card[data-category="Guantes"]{display:none!important}@media(max-width:700px){.basic-list-header{display:none}.basic-row{grid-template-columns:1fr auto;padding:12px}.basic-row .basic-price{grid-column:1}.basic-row button{grid-column:2;grid-row:1/3}.special-grid{grid-template-columns:1fr}}
    `; document.head.appendChild(style);
  }
  function populateCategories(){
    const s=$('#categoryFilter'); if(!s)return; const cats=['Todos',...new Set(PRODUCTS.map(p=>p.category).filter(c=>c!=='Guantes'))];
    s.innerHTML=cats.map(c=>`<option value="${c}">${c==='Todos'?'Todas las categorías':c}</option>`).join('');
  }
  function filtered(){const q=state.query.trim().toLowerCase();return PRODUCTS.filter(p=>(state.category==='Todos'||p.category===state.category)&&(!q||`${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(q)));}
  function renderProducts(){
    const grid=$('#productGrid'),empty=$('#emptyState'); if(!grid)return; const list=filtered();
    if(state.category==='Medicamento especial'){
      grid.innerHTML=`<div class="special-notice">🔒 Todos los medicamentos de esta sección requieren receta médica vigente para su venta.</div><div class="special-grid">${list.map(p=>`<article class="special-mini"><h3>${p.name}</h3>${p.detail?`<small>${p.detail}</small>`:''}<strong>${money(p.price)}</strong><button class="btn btn-primary" type="button" data-add="${p.id}">Solicitar (cuento con receta)</button></article>`).join('')}</div>`;
    }else{
      grid.innerHTML=`<div class="basic-list-header"><span>Medicamento o producto</span><span>Precio mayorista</span><span></span></div>${list.map(p=>`<div class="basic-row ${p.id.startsWith('promo-')?'promo-row':''}"><span>${p.name}${p.detail?` <small>— ${p.detail}</small>`:''}</span><strong class="basic-price">${p.price?money(p.price):'Por confirmar'}</strong><button class="btn btn-primary" type="button" data-add="${p.id}">Agregar</button></div>`).join('')}`;
    }
    if(empty)empty.hidden=list.length>0; $$('[data-add]').forEach(b=>b.onclick=()=>addToCart(b.dataset.add,1));
  }
  function addToCart(id,n){state.cart[id]=(Number(state.cart[id])||0)+n;if(state.cart[id]<=0)delete state.cart[id];saveCart();renderCart();}
  function renderCart(){
    const items=cartEntries(),wrap=$('#cartItems'); if(wrap)wrap.innerHTML=items.length?items.map(({product,qty})=>`<div class="cart-item"><div><strong>${product.name}</strong><span>${money(product.price)} c/u</span></div><div class="qty"><button type="button" data-minus="${product.id}">−</button><b>${qty}</b><button type="button" data-plus="${product.id}">+</button></div></div>`).join(''):'<p>Tu carrito está vacío.</p>';
    if($('#cartSubtotal'))$('#cartSubtotal').textContent=money(items.reduce((s,x)=>s+x.product.price*x.qty,0)); if($('#cartCount'))$('#cartCount').textContent=items.reduce((s,x)=>s+x.qty,0); if($('#checkoutButton'))$('#checkoutButton').disabled=!items.length;
    $$('[data-minus]').forEach(b=>b.onclick=()=>addToCart(b.dataset.minus,-1)); $$('[data-plus]').forEach(b=>b.onclick=()=>addToCart(b.dataset.plus,1));
  }
  function openPanel(id){const el=document.getElementById(id);if(!el)return;const ov=$('#overlay');if(ov)ov.hidden=false;el.hidden=false;requestAnimationFrame(()=>el.classList.add('open'));}
  function closePanel(id){const el=document.getElementById(id);if(!el)return;el.classList.remove('open');setTimeout(()=>{el.hidden=true;const ov=$('#overlay');if(ov)ov.hidden=true},300);}
  function buildMessage(order){return ['NUEVO PEDIDO EN ELBAMBINODANIEL.COM',`Folio: ${order.folio}`,`Cliente: ${order.cliente.nombre||''}`,`Teléfono: ${order.cliente.telefono||''}`,`Domicilio: ${order.cliente.domicilio||''}, ${order.cliente.colonia||''}, ${order.cliente.ciudad||''}, ${order.cliente.estado||''}, C.P. ${order.cliente.cp||''}`,`Horario: ${order.cliente.horario||''}`,`Cierra al mediodía: ${order.cliente.cierra||''}`,`Pago: ${order.cliente.pago||''}`,'','Productos:',...order.productos.map(p=>`• ${p.nombre} x ${p.cantidad}`),'',`Total estimado: ${money(order.subtotalEstimado)}`,`Observaciones: ${order.cliente.observaciones||'Sin observaciones'}`].join('\n');}
  async function sendOrder(order){
    const api=(window.ORDER_API_URL||'').trim().replace(/\/$/,'');
    if(api&&!api.includes('TU-SERVIDOR')){try{const r=await fetch(`${api}/api/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(order)});if(!r.ok)throw new Error();}catch(_){/* respaldo por WhatsApp */}}
    const orders=JSON.parse(localStorage.getItem('elbambino-orders')||'[]');orders.unshift(order);localStorage.setItem('elbambino-orders',JSON.stringify(orders));
    const phone=String(window.EL_BAMBINO_WHATSAPP||'523331191167').replace(/\D/g,''); window.location.href=`https://wa.me/${phone}?text=${encodeURIComponent(buildMessage(order))}`;
  }
  function bind(){
    const sel=$('#categoryFilter');if(sel)sel.onchange=e=>{state.category=e.target.value;renderProducts()}; const search=$('#searchInput');if(search)search.oninput=e=>{state.query=e.target.value;renderProducts()}; if($('#searchButton'))$('#searchButton').onclick=()=>{state.query=search?.value||'';renderProducts();$('#productos')?.scrollIntoView({behavior:'smooth'})};
    $$('.category-card').forEach(c=>c.onclick=e=>{e.preventDefault();if(c.dataset.category==='Guantes')return;state.category=c.dataset.category||'Todos';if(sel)sel.value=state.category;renderProducts();$('#productos')?.scrollIntoView({behavior:'smooth'})});
    $$('.quick-add').forEach(b=>b.onclick=()=>addToCart(b.dataset.productId,1)); if($('#cartButton'))$('#cartButton').onclick=()=>openPanel('cartDrawer'); if($('#checkoutButton'))$('#checkoutButton').onclick=()=>{if(cartEntries().length){closePanel('cartDrawer');setTimeout(()=>openPanel('checkoutDrawer'),320)}};
    $$('[data-close]').forEach(b=>b.onclick=()=>{const id=b.dataset.close;document.getElementById(id)?.classList.contains('drawer')?closePanel(id):(document.getElementById(id).hidden=true,$('#overlay').hidden=true)}); if($('#overlay'))$('#overlay').onclick=()=>$$('.drawer.open').forEach(d=>closePanel(d.id));
    const form=$('#checkoutForm');if(form)form.onsubmit=async e=>{e.preventDefault();const items=cartEntries();if(!items.length){alert('Agrega al menos un producto.');return;}const btn=form.querySelector('[type="submit"]');if(btn){btn.disabled=true;btn.textContent='ENVIANDO PEDIDO...';}try{const cliente=Object.fromEntries(new FormData(form).entries());const order={folio:`EBD-${Date.now().toString().slice(-8)}`,fecha:new Date().toISOString(),cliente,productos:items.map(x=>({id:x.product.id,nombre:x.product.name,cantidad:x.qty,precioEstimado:x.product.price})),subtotalEstimado:items.reduce((s,x)=>s+x.product.price*x.qty,0)};await sendOrder(order);state.cart={};saveCart();renderCart();}catch(err){alert('No fue posible completar el pedido. Intenta nuevamente.');}finally{if(btn){btn.disabled=false;btn.textContent='CONFIRMAR PEDIDO';}}};
  }
  function init(){injectStyles();populateCategories();renderProducts();renderCart();bind();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
