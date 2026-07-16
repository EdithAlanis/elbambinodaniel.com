(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n||0));

  const extras = [
    {id:'tramadol-adiol-100',name:'Tramadol cápsulas 100 mg ADIOL',detail:'Caja con 10 cápsulas · Requiere receta médica',price:75,category:'Medicamento especial',special:true},
    {id:'oximetro-nino',name:'Oxímetro para niño',detail:'Equipo de monitoreo pediátrico',price:180,category:'Otros productos'},
    {id:'oximetro-a2',name:'Oxímetro A2',detail:'Medición de saturación de oxígeno',price:100,category:'Otros productos'},
    {id:'oximetro-economico',name:'Oxímetro económico',detail:'Equipo portátil',price:90,category:'Otros productos'},
    {id:'dengue-duo',name:'Prueba Dengue Dúo',detail:'Prueba rápida',price:90,category:'Pruebas rápidas'},
    {id:'covid-influenza',name:'Prueba COVID e Influenza Dúo',detail:'Prueba rápida',price:90,category:'Pruebas rápidas'},
    {id:'antidoping-6',name:'Prueba antidoping 6 parámetros',detail:'Prueba rápida',price:100,category:'Pruebas rápidas'},
    {id:'triple',name:'Prueba triple Influenza A/B, COVID y VSR',detail:'Prueba rápida',price:100,category:'Pruebas rápidas'},
    {id:'cuadruple',name:'Prueba cuádruple Influenza A/B, COVID, VSR y Adenovirus',detail:'Prueba rápida',price:120,category:'Pruebas rápidas'}
  ];

  const source = Array.isArray(window.BASIC_PRODUCTS) ? window.BASIC_PRODUCTS : [];
  const normalize = (p,i) => ({
    id: String(p.id || `producto-${i}`),
    name: String(p.name || p.nombre || 'Producto'),
    detail: String(p.detail || p.descripcion || p.presentacion || ''),
    price: Number(p.price ?? p.precio ?? 0),
    category: String(p.category || p.categoria || 'Medicamento básico'),
    special: Boolean(p.special)
  });
  const seen = new Set();
  const PRODUCTS = [...source.map(normalize), ...extras.map(normalize)].filter(p => !seen.has(p.id) && seen.add(p.id));
  const state = {category:'Todos', query:'', cart:JSON.parse(localStorage.getItem('elbambino-cart')||'{}')};

  function saveCart(){ localStorage.setItem('elbambino-cart',JSON.stringify(state.cart)); }
  function entries(){ return Object.entries(state.cart).map(([id,qty])=>({product:PRODUCTS.find(p=>p.id===id),qty:Number(qty)})).filter(x=>x.product&&x.qty>0); }

  function populateCategories(){
    const select=$('#categoryFilter'); if(!select) return;
    select.innerHTML='<option value="Todos">Todas las categorías</option>';
    [...new Set(PRODUCTS.map(p=>p.category))].sort().forEach(c=>select.insertAdjacentHTML('beforeend',`<option value="${c.replace(/"/g,'&quot;')}">${c}</option>`));
  }

  function renderProducts(){
    const grid=$('#productGrid'), empty=$('#emptyState'); if(!grid) return;
    const q=state.query.trim().toLowerCase();
    const list=PRODUCTS.filter(p=>(state.category==='Todos'||p.category===state.category)&&(!q||`${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(q)));
    grid.innerHTML=list.map(p=>`<article class="product-card">
      <div class="product-icon">${p.special?'🔒':'💊'}</div>
      <div class="product-copy"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.detail}</p></div>
      <div class="product-buy"><strong>${p.price>0?money(p.price):'Precio por confirmar'}</strong><button type="button" class="btn btn-primary" data-add="${p.id}">${p.special?'Solicitar (cuento con receta)':'Agregar al carrito'}</button></div>
    </article>`).join('');
    if(empty) empty.hidden=list.length>0;
    $$('[data-add]').forEach(b=>b.onclick=()=>addToCart(b.dataset.add,1));
  }

  function addToCart(id,n){ state.cart[id]=(Number(state.cart[id])||0)+n; if(state.cart[id]<=0) delete state.cart[id]; saveCart(); renderCart(); }
  function renderCart(){
    const items=entries(), wrap=$('#cartItems'), subtotal=$('#cartSubtotal'), count=$('#cartCount');
    if(wrap) wrap.innerHTML=items.length?items.map(({product,qty})=>`<div class="cart-item"><div><strong>${product.name}</strong><span>${money(product.price)} c/u</span></div><div class="qty"><button type="button" data-minus="${product.id}">−</button><b>${qty}</b><button type="button" data-plus="${product.id}">+</button></div></div>`).join(''):'<p>Tu carrito está vacío.</p>';
    if(subtotal) subtotal.textContent=money(items.reduce((s,x)=>s+x.product.price*x.qty,0));
    if(count) count.textContent=items.reduce((s,x)=>s+x.qty,0);
    const checkout=$('#checkoutButton'); if(checkout) checkout.disabled=!items.length;
    $$('[data-minus]').forEach(b=>b.onclick=()=>addToCart(b.dataset.minus,-1));
    $$('[data-plus]').forEach(b=>b.onclick=()=>addToCart(b.dataset.plus,1));
  }

  function openPanel(id){ const el=document.getElementById(id),ov=$('#overlay'); if(!el)return; if(ov)ov.hidden=false; el.hidden=false; requestAnimationFrame(()=>el.classList.add('open')); el.setAttribute('aria-hidden','false'); }
  function closePanel(id){ const el=document.getElementById(id),ov=$('#overlay'); if(!el)return; el.classList.remove('open'); el.setAttribute('aria-hidden','true'); setTimeout(()=>{el.hidden=true;if(ov)ov.hidden=true},300); }

  function bind(){
    const select=$('#categoryFilter'); if(select) select.onchange=e=>{state.category=e.target.value;renderProducts()};
    const search=$('#searchInput'); if(search) search.oninput=e=>{state.query=e.target.value;renderProducts()};
    const sb=$('#searchButton'); if(sb) sb.onclick=()=>{state.query=search?.value||'';renderProducts();$('#productos')?.scrollIntoView({behavior:'smooth'})};
    $$('.category-card').forEach(card=>card.addEventListener('click',e=>{e.preventDefault();state.category=card.dataset.category||'Todos';if(select)select.value=state.category;renderProducts();$('#productos')?.scrollIntoView({behavior:'smooth'})}));
    const cb=$('#cartButton'); if(cb) cb.onclick=()=>openPanel('cartDrawer');
    const co=$('#checkoutButton'); if(co) co.onclick=()=>{if(entries().length){closePanel('cartDrawer');setTimeout(()=>openPanel('checkoutDrawer'),320)}};
    $$('[data-close]').forEach(b=>b.onclick=()=>{const id=b.dataset.close;document.getElementById(id)?.classList.contains('drawer')?closePanel(id):(document.getElementById(id).hidden=true,$('#overlay').hidden=true)});
    const ov=$('#overlay'); if(ov) ov.onclick=()=>{$$('.drawer.open').forEach(d=>closePanel(d.id));};

    const form=$('#checkoutForm');
    if(form) form.addEventListener('submit',e=>{
      e.preventDefault(); const data=Object.fromEntries(new FormData(form).entries()); const items=entries(); if(!items.length)return;
      const folio=`EBD-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
      const lines=items.map(x=>`• ${x.product.name} x ${x.qty}`).join('\n');
      const total=items.reduce((s,x)=>s+x.product.price*x.qty,0);
      const text=`NUEVO PEDIDO EN ELBAMBINODANIEL.COM\nFolio: ${folio}\nCliente: ${data.nombre||''}\nTeléfono: ${data.telefono||''}\nDomicilio: ${data.domicilio||''}, ${data.colonia||''}, ${data.ciudad||''}, ${data.estado||''}, C.P. ${data.cp||''}\nHorario: ${data.horario||''}\nCierra al mediodía: ${data.cierra||''}\nPago: ${data.pago||''}\n\nProductos:\n${lines}\n\nTotal estimado: ${money(total)}\nObservaciones: ${data.observaciones||'Sin observaciones'}`;
      localStorage.setItem('elbambino-orders',JSON.stringify([{folio,fecha:new Date().toISOString(),cliente:data,productos:items},...JSON.parse(localStorage.getItem('elbambino-orders')||'[]')]));
      state.cart={};saveCart();renderCart();form.reset();closePanel('checkoutDrawer');
      const phone=String(window.EL_BAMBINO_WHATSAPP||'523331191167').replace(/\D/g,'');
      window.location.href=`https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    });
  }

  function init(){ populateCategories(); renderProducts(); renderCart(); bind(); }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
