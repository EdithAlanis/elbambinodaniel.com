const PRODUCTS = [...(window.BASIC_PRODUCTS||[]),

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
  {id:'p-tramadol-gotas',name:'Tramadol en gotas Alpharma',detail:'Presentación sujeta a disponibilidad',price:75,category:'Medicamento especial',icon:'🔒',special:true},

  {id:'p-oximetro-nino',name:'Oxímetro para niño',detail:'Equipo de monitoreo pediátrico',price:180,category:'Otros productos',icon:'👶'},
  {id:'p-oximetro-a2',name:'Oxímetro A2',detail:'Medición de saturación de oxígeno',price:100,category:'Otros productos',icon:'🩺'},
  {id:'p-oximetro-economico',name:'Oxímetro económico',detail:'Equipo portátil',price:90,category:'Otros productos',icon:'🫁'},
  {id:'p-dengue',name:'Prueba Dengue Dúo Realy',detail:'Precio por pieza',price:90,category:'Otros productos',icon:'🦟',badge:'Oferta'},
  {id:'p-covid',name:'Prueba COVID e Influenza Dúo o VIH',detail:'Precio por pieza',price:90,category:'Otros productos',icon:'🦠',badge:'Oferta'},
  {id:'p-antidoping',name:'Prueba antidoping de 6 parámetros',detail:'Precio por pieza',price:100,category:'Otros productos',icon:'🧪',badge:'Oferta'},
  {id:'p-triple',name:'Prueba triple Influenza A y B, COVID-19 y Virus Sincitial',detail:'Precio por pieza',price:100,category:'Otros productos',icon:'🧬',badge:'Oferta'},
  {id:'p-cuadruple',name:'Prueba cuádruple Influenza A y B, COVID-19, Virus Sincitial y Adenovirus',detail:'Precio por pieza',price:120,category:'Otros productos',icon:'🧬',badge:'Oferta'},
  {id:'p-kn95-negro',name:'Cubrebocas KN95 negros',detail:'Precio por pieza',price:5,category:'Otros productos',icon:'😷'},
  {id:'p-ttp-infantil',name:'Cubrebocas TTP infantil rosa o blanco',detail:'Caja con 50 piezas',price:60,category:'Otros productos',icon:'😷'},
  {id:'p-ttp-negro',name:'Cubrebocas TTP negros',detail:'Caja con 50 piezas',price:60,category:'Otros productos',icon:'😷'},
  {id:'p-kn94',name:'Cubrebocas KN94',detail:'Precio por pieza',price:5,category:'Otros productos',icon:'😷'},
  {id:'p-tubo-rojo',name:'Tubo rojo',detail:'Caja con 100 piezas',price:220,category:'Otros productos',icon:'🧪'},
  {id:'p-tubo-lila',name:'Tubo lila',detail:'Caja con 100 piezas',price:280,category:'Otros productos',icon:'🧪'},
  {id:'p-cofias',name:'Paquete de cofias',detail:'Paquete con 100 piezas',price:160,category:'Otros productos',icon:'🥼'},
  {id:'p-guantes-nitrilo-chico',name:'Guantes de nitrilo chicos',detail:'Caja',price:160,category:'Otros productos',icon:'🧤'},
  {id:'p-guantes-nitrilo-mediano',name:'Guantes de nitrilo medianos',detail:'Caja',price:160,category:'Otros productos',icon:'🧤'},
  {id:'p-guantes-nitrilo-grande',name:'Guantes de nitrilo grandes',detail:'Caja',price:160,category:'Otros productos',icon:'🧤'},
  {id:'p-guantes-ambiderm-chico',name:'Guantes Ambiderm estériles chicos',detail:'Caja',price:160,category:'Otros productos',icon:'🧤'},
  {id:'p-guantes-ambiderm-mediano',name:'Guantes Ambiderm estériles medianos',detail:'Caja',price:160,category:'Otros productos',icon:'🧤'},
  {id:'p-guantes-ambiderm-grande',name:'Guantes Ambiderm estériles grandes',detail:'Caja',price:160,category:'Otros productos',icon:'🧤'},
  {id:'p-baumanometro-escritorio',name:'Baumanómetro de escritorio',detail:'Equipo médico',price:220,category:'Otros productos',icon:'🩺'},
  {id:'p-baumanometro-pulsera',name:'Baumanómetro de pulsera',detail:'Equipo médico',price:240,category:'Otros productos',icon:'⌚'},
  {id:'p-termometro-nino',name:'Termómetro para niño',detail:'Equipo médico',price:55,category:'Otros productos',icon:'🌡️'},
  {id:'p-termometro-mercurio',name:'Termómetro de mercurio',detail:'Equipo médico',price:20,category:'Otros productos',icon:'🌡️'},
  {id:'p-termometro-pistola',name:'Termómetro tipo pistola',detail:'Equipo médico',price:160,category:'Otros productos',icon:'🌡️'},
  {id:'p-termometro-digital',name:'Termómetro digital',detail:'Equipo médico',price:25,category:'Otros productos',icon:'🌡️'},
  {id:'p-nebulizador-azul',name:'Nebulizador azul',detail:'Equipo médico',price:225,category:'Otros productos',icon:'💨'},

  {id:'p-complejo-b',name:'Complejo B',detail:'Caja con 30 tabletas',price:37.81,category:'Vitaminas y suplementos',icon:'🌿'},
  {id:'p-suplemento17',name:'Suplemento con 17 vitaminas',detail:'Suplemento alimenticio',price:300,category:'Vitaminas y suplementos',icon:'🍊'},

  {id:'p-forxiga',name:'Forxiga',detail:'Promoción: 3 cajas por $1,000.00',price:1000,category:'Diabetes',icon:'💙',badge:'3 por $1,000'},
  {id:'p-trayenta',name:'Trayenta',detail:'Promoción: 3 cajas por $1,000.00',price:1000,category:'Diabetes',icon:'💙',badge:'3 por $1,000'}
];

const LIST_CATEGORIES = new Set(['Medicamento básico','Medicamento especial']);
const state={cart:JSON.parse(localStorage.getItem('elbambino-cart')||'{}'),category:'Todos',query:'',offer:0,page:1,pageSize:75};
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const money=value=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
const saveCart=()=>localStorage.setItem('elbambino-cart',JSON.stringify(state.cart));

function populateCategories(){
  const select=$('#categoryFilter');
  [...new Set(PRODUCTS.map(p=>p.category))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;select.appendChild(o)});
}

function productMatches(p,q){
  return !q || `${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(q);
}

function renderProducts(){
  const grid=$('#productGrid');
  const q=state.query.trim().toLowerCase();
  const allMatches=PRODUCTS.filter(p=>(state.category==='Todos'||p.category===state.category)&&productMatches(p,q));
  const usePaging=state.category==='Medicamento básico';
  const totalPages=Math.max(1,Math.ceil(allMatches.length/state.pageSize));
  if(state.page>totalPages) state.page=totalPages;
  const list=usePaging?allMatches.slice((state.page-1)*state.pageSize,state.page*state.pageSize):allMatches;
  const useList = LIST_CATEGORIES.has(state.category);
  grid.classList.toggle('catalog-list-mode', useList);

  if(useList){
    const warning = state.category==='Medicamento especial'
      ? '<div class="special-list-notice">🔒 Disponibilidad sujeta a validación. Solicitud únicamente para clientes que cuentan con receta.</div>'
      : '';
    grid.innerHTML = warning + `<div class="catalog-table-wrap"><table class="catalog-table">
      <thead><tr><th>Producto</th><th>Presentación</th><th>Precio estimado</th><th>Cantidad</th><th>Acción</th></tr></thead>
      <tbody>${list.map(p=>`<tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.detail}</td>
        <td><strong>${money(p.price)}</strong></td>
        <td><input class="qty-input" data-qty-for="${p.id}" type="number" value="1" min="1" max="99" aria-label="Cantidad"></td>
        <td><button class="btn ${p.special?'btn-special':'btn-primary'} add-product" data-product-id="${p.id}">${p.special?'Solicitar (cuento con receta)':'Agregar al carrito'}</button></td>
      </tr>`).join('')}</tbody></table></div>` +
      (usePaging?`<div class="catalog-pagination"><button id="prevCatalogPage" type="button" ${state.page<=1?'disabled':''}>← Anterior</button><span>Página ${state.page} de ${totalPages} · ${allMatches.length} productos</span><button id="nextCatalogPage" type="button" ${state.page>=totalPages?'disabled':''}>Siguiente →</button></div>`:'');
  }else{
    grid.innerHTML=list.map(p=>`<article class="product-card ${p.special?'special-card':''}">
      <span class="product-badge ${p.special?'special-badge':''}">${p.special?'Medicamento especial':(p.badge||p.category)}</span>
      <div class="product-visual">${p.icon}</div>
      <div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p class="product-detail">${p.detail}</p><div class="product-price">${money(p.price)}</div><div class="estimated">Precio estimado; puede variar al llegar desde almacén.</div>
      <div class="product-actions"><button class="btn ${p.special?'btn-special':'btn-primary'} add-product" data-product-id="${p.id}">${p.special?'Solicitar (cuento con receta)':'Agregar al carrito'}</button><input class="qty-input" data-qty-for="${p.id}" type="number" value="1" min="1" max="99" aria-label="Cantidad"></div></div>
    </article>`).join('');
  }

  $('#emptyState').hidden=list.length>0;
  $$('.add-product').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.productId,Number(document.querySelector(`[data-qty-for="${b.dataset.productId}"]`).value)||1)));
  const prev=$('#prevCatalogPage');const next=$('#nextCatalogPage');
  if(prev)prev.onclick=()=>{state.page--;renderProducts();document.querySelector('#productos').scrollIntoView()};
  if(next)next.onclick=()=>{state.page++;renderProducts();document.querySelector('#productos').scrollIntoView()};
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
  const update=()=>{state.query=input.value;state.page=1;renderProducts();const q=input.value.trim().toLowerCase();if(!q){suggestions.hidden=true;return}const hits=PRODUCTS.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(q)).slice(0,7);suggestions.innerHTML=hits.map(p=>`<button type="button" data-suggest="${p.id}"><span>${p.name}</span><strong>${money(p.price)}</strong></button>`).join('');suggestions.hidden=!hits.length;$$('[data-suggest]').forEach(b=>b.onclick=()=>{const p=PRODUCTS.find(x=>x.id===b.dataset.suggest);input.value=p.name;state.query=p.name;state.category='Todos';$('#categoryFilter').value='Todos';renderProducts();suggestions.hidden=true;document.querySelector('#productos').scrollIntoView()})};
  input.addEventListener('input',update);$('#searchButton').onclick=()=>{update();document.querySelector('#productos').scrollIntoView()};document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))suggestions.hidden=true});
}


function buildOrderPdf(order){
  if(!window.jspdf || !window.jspdf.jsPDF) return null;
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:'mm',format:'a4'});
  const left=15; let y=16;
  const addLine=(label,value)=>{
    doc.setFont('helvetica','bold'); doc.text(`${label}:`,left,y);
    doc.setFont('helvetica','normal');
    const lines=doc.splitTextToSize(String(value||''),145);
    doc.text(lines,left+38,y);
    y+=Math.max(7,lines.length*6);
  };
  doc.setFont('helvetica','bold'); doc.setFontSize(18);
  doc.text('EL BAMBINO DANIEL',left,y); y+=8;
  doc.setFontSize(12); doc.setFont('helvetica','normal');
  doc.text('Pedido generado desde elbambinodaniel.com',left,y); y+=10;
  addLine('Folio',order.folio);
  addLine('Fecha',new Date(order.fecha).toLocaleString('es-MX'));
  addLine('Cliente',order.cliente.nombre);
  addLine('Teléfono',order.cliente.telefono);
  addLine('Domicilio',order.cliente.domicilio);
  addLine('Colonia',order.cliente.colonia);
  addLine('Ciudad',`${order.cliente.ciudad}, ${order.cliente.estado}, C.P. ${order.cliente.cp}`);
  addLine('Horario',order.cliente.horario);
  addLine('Cierra al mediodía',order.cliente.cierra);
  addLine('Forma de pago',order.cliente.pago);
  addLine('Observaciones',order.cliente.observaciones||'Sin observaciones');
  y+=3;
  doc.setFont('helvetica','bold'); doc.text('Productos',left,y); y+=7;
  doc.setFont('helvetica','normal');
  order.productos.forEach((p,i)=>{
    const line=`${i+1}. ${p.nombre} | Cantidad: ${p.cantidad} | Precio estimado: ${money(p.precioEstimado)} | Importe: ${money(p.precioEstimado*p.cantidad)}`;
    const lines=doc.splitTextToSize(line,180);
    if(y+lines.length*6>280){doc.addPage();y=16}
    doc.text(lines,left,y); y+=lines.length*6+2;
  });
  y+=3;
  doc.setFont('helvetica','bold');
  doc.text(`Total estimado: ${money(order.subtotalEstimado)}`,left,y); y+=8;
  doc.setFont('helvetica','normal'); doc.setFontSize(10);
  doc.text(doc.splitTextToSize(order.avisoPrecio,180),left,y);
  return doc;
}

async function sendOrderAutomatically(order){
  const apiUrl=(window.ORDER_API_URL||'').trim().replace(/\/$/,'');
  if(!apiUrl){
    const pdf=buildOrderPdf(order);
    if(pdf) pdf.save(`${order.folio}.pdf`);
    const phone=(window.EL_BAMBINO_WHATSAPP||'').replace(/\D/g,'');
    const products=(order.productos||[]).map(p=>`• ${p.nombre} x ${p.cantidad}`).join('\n');
    const text=[
      'NUEVO PEDIDO EN ELBAMBINODANIEL.COM',
      `Folio: ${order.folio}`,
      `Cliente: ${order.cliente.nombre}`,
      `Teléfono: ${order.cliente.telefono}`,
      `Domicilio: ${order.cliente.domicilio}, ${order.cliente.colonia}, ${order.cliente.ciudad}, ${order.cliente.estado}, C.P. ${order.cliente.cp}`,
      `Horario: ${order.cliente.horario}`,
      `Cierra al mediodía: ${order.cliente.cierra}`,
      `Pago: ${order.cliente.pago}`,
      '',
      'Productos:',
      products,
      '',
      `Total estimado: ${money(order.subtotalEstimado)}`,
      `Observaciones: ${order.cliente.observaciones||'Sin observaciones'}`
    ].join('\n');
    if(phone){
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,'_blank','noopener');
    }
    return {sent:true,local:true};
  }
  const response=await fetch(`${apiUrl}/api/orders`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(order)
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||'No fue posible enviar el pedido.');
  return data;
}

function setupCheckout(){
  $('#checkoutButton').onclick=()=>{if(!cartEntries().length)return;closePanel('cartDrawer');setTimeout(()=>openPanel('checkoutDrawer'),340)};
  $('#checkoutForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const submitButton=e.currentTarget.querySelector('button[type="submit"]');
    submitButton.disabled=true; submitButton.textContent='ENVIANDO PEDIDO...';
    try{
      const data=Object.fromEntries(new FormData(e.currentTarget).entries());
      const items=cartEntries();
      const subtotal=items.reduce((s,x)=>s+x.product.price*x.qty,0);
      const folio=`EBD-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
      const order={folio,fecha:new Date().toISOString(),status:'pending',cliente:data,productos:items.map(x=>({id:x.product.id,nombre:x.product.name,cantidad:x.qty,precioEstimado:x.product.price})),subtotalEstimado:subtotal,estado:'Pedido recibido',avisoPrecio:'El precio final se confirma cuando el producto llega desde almacén.'};
      const result=await sendOrderAutomatically(order);
      const orders=JSON.parse(localStorage.getItem('elbambino-orders')||'[]');orders.unshift(order);localStorage.setItem('elbambino-orders',JSON.stringify(orders));
      closePanel('checkoutDrawer');state.cart={};saveCart();renderCart();e.currentTarget.reset();
      setTimeout(()=>{
        $('#overlay').hidden=false;$('#successModal').hidden=false;$('#orderNumber').textContent=folio;
        const msg=$('#successModal p');
        if(result.sent===false){
          msg.textContent='El pedido quedó registrado. Se abrió WhatsApp con la información; presione Enviar para confirmar el aviso.';
        }else{
          msg.textContent='El pedido fue enviado automáticamente y quedó registrado con su folio.';
        }
      },340);
    }catch(error){
      alert(`No fue posible enviar el pedido automáticamente. ${error.message}`);
    }finally{
      submitButton.disabled=false; submitButton.textContent='CONFIRMAR PEDIDO';
    }
  });
}


function setupVisitorCounter(){
  const key='elbambino-visitor-count';
  const sessionKey='elbambino-visitor-session';
  let count=Number(localStorage.getItem(key)||0);
  if(!sessionStorage.getItem(sessionKey)){
    count+=1;
    localStorage.setItem(key,String(count));
    sessionStorage.setItem(sessionKey,'1');
  }
  const el=document.getElementById('visitorCount');
  if(el) el.textContent=new Intl.NumberFormat('es-MX').format(count);
}

function init(){
  populateCategories();renderProducts();renderCart();setupOffers();setupSearch();setupCheckout();setupVisitorCounter();
  $('#categoryFilter').onchange=e=>{state.category=e.target.value;state.page=1;renderProducts()};
  $$('.category-card').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;state.page=1;$('#categoryFilter').value=state.category;renderProducts();document.querySelector('#productos').scrollIntoView()});
  $$('.quick-add').forEach(b=>b.onclick=()=>addToCart(b.dataset.productId,1));
  $('#cartButton').onclick=()=>openPanel('cartDrawer');
  $$('[data-close]').forEach(b=>b.onclick=()=>{const id=b.dataset.close;document.getElementById(id).classList.contains('drawer')?closePanel(id):closeModal(id)});
  $('#overlay').onclick=()=>{$$('.drawer.open').forEach(d=>closePanel(d.id));if(!$('#successModal').hidden)closeModal('successModal')};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$$('.drawer.open').forEach(d=>closePanel(d.id));if(!$('#successModal').hidden)closeModal('successModal')}});
}

document.addEventListener('DOMContentLoaded',init);
