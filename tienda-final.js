const PRODUCTS = [
  ...(window.BASIC_PRODUCTS || []),

  {id:'promo-forxiga-3',name:'Promoción: 3 Forxiga',detail:'3 cajas por $1,000 pesos',price:1000,category:'Diabetes',icon:'💙',badge:'Súper oferta'},
  {id:'promo-trayenta-3',name:'Promoción: 3 Trayenta',detail:'3 cajas por $1,000 pesos',price:1000,category:'Diabetes',icon:'💙',badge:'Súper oferta'},

  {id:'guante-nitrilo-chico',name:'Guantes de nitrilo chico',detail:'Caja con 100 guantes',price:160,category:'Guantes',icon:'🧤'},
  {id:'guante-nitrilo-mediano',name:'Guantes de nitrilo mediano',detail:'Caja con 100 guantes',price:160,category:'Guantes',icon:'🧤'},
  {id:'guante-nitrilo-grande',name:'Guantes de nitrilo grande',detail:'Caja con 100 guantes',price:160,category:'Guantes',icon:'🧤'},
  {id:'guante-ambiderm-esteril-chico',name:'Guantes Ambiderm estéril chico',detail:'Caja con 100 guantes',price:160,category:'Guantes',icon:'🧤'},
  {id:'guante-ambiderm-esteril-mediano',name:'Guantes Ambiderm estéril mediano',detail:'Caja con 100 guantes',price:160,category:'Guantes',icon:'🧤'},
  {id:'guante-ambiderm-esteril-grande',name:'Guantes Ambiderm estéril grande',detail:'Caja con 100 guantes',price:160,category:'Guantes',icon:'🧤'},

  {id:'p-alprazolam025',name:'Alprazolam 0.25 mg',detail:'Caja con 30 tabletas · Requiere receta médica',price:130,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-alprazolam05',name:'Alprazolam 0.50 mg',detail:'Caja con 30 tabletas · Requiere receta médica',price:197,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-alprazolam1',name:'Alprazolam 1 mg',detail:'Caja con 30 tabletas · Requiere receta médica',price:189,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-alprazolam2',name:'Alprazolam 2 mg',detail:'Caja con 30 tabletas · Requiere receta médica',price:283,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-axcion',name:'Axcion Fentermina 30 mg',detail:'Caja con 30 tabletas · Requiere receta médica',price:310,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-axcion-ap',name:'Axcion AP Fentermina 30 mg',detail:'Caja con 30 tabletas AP · Requiere receta médica',price:498,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-bromazepam',name:'Bromazepam 3 mg',detail:'Caja con 30 tabletas · Requiere receta médica',price:180,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-clonazepam-gotas',name:'Clonazepam gotas',detail:'Requiere receta médica',price:90,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-clonazepam-tabs',name:'Clonazepam tabletas',detail:'Requiere receta médica',price:90,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-diazepam',name:'Diazepam',detail:'Requiere receta médica',price:90,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-diazepam-tempus',name:'Diazepam 10 mg Tempus',detail:'Requiere receta médica',price:100,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-diazepam-amp',name:'Diazepam, 50 ampolletas',detail:'Requiere receta médica',price:580,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-esbecalps',name:'Esbecalps',detail:'Caja con 60 tabletas · Requiere receta médica',price:837,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-farmapram05',name:'Farmapram 0.50 mg',detail:'Alprazolam, caja con 30 tabletas · Requiere receta médica',price:256,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-farmapram2',name:'Farmapram 2 mg',detail:'Alprazolam, caja con 30 tabletas · Requiere receta médica',price:413,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-imipramina',name:'Imipramina 25 mg',detail:'Caja con 20 tabletas · Requiere receta médica',price:125,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-itravil',name:'Itravil Clobenzorex 30 mg',detail:'Caja con 60 cápsulas · Requiere receta médica',price:835,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-lose1',name:'Lose 1 mg',detail:'Requiere receta médica',price:243,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-lose2',name:'Lose 2 mg',detail:'Requiere receta médica',price:290,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-metilfenidato',name:'Metilfenidato 10 mg',detail:'Caja con 60 tabletas · Requiere receta médica',price:330,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-obeclox',name:'Obeclox',detail:'Caja con 60 cápsulas · Requiere receta médica',price:864,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-terfarmex',name:'Terfarmex Fentermina 15 mg',detail:'Requiere receta médica',price:228,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-tradea',name:'Tradea LP 20 mg',detail:'Metilfenidato de liberación prolongada, caja con 30 tabletas · Requiere receta médica',price:973,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-tramadol-para',name:'Tramadol / Paracetamol Alpharma',detail:'Requiere receta médica',price:75,category:'Medicamento especial',icon:'🔒',special:true},
  {id:'p-tramadol-gotas',name:'Tramadol en gotas Alpharma',detail:'Requiere receta médica',price:75,category:'Medicamento especial',icon:'🔒',special:true},

  {id:'p-lampara-oidos',name:'Lámpara para oídos',detail:'Equipo médico',price:100,category:'Otros productos',icon:'🩺'},
  {id:'p-suplemento-17-vit',name:'Suplemento alimenticio con 17 vitaminas',detail:'Suplemento alimenticio',price:300,category:'Vitaminas y suplementos',icon:'🌿'},
  {id:'p-oximetro-nino',name:'Oxímetro para niño',detail:'Equipo de monitoreo pediátrico',price:180,category:'Otros productos',icon:'👶'},
  {id:'p-oximetro-a2',name:'Oxímetro A2',detail:'Medición de saturación de oxígeno',price:100,category:'Otros productos',icon:'🩺'},
  {id:'p-oximetro-economico',name:'Oxímetro económico',detail:'Equipo portátil',price:90,category:'Otros productos',icon:'🫁'},
  {id:'p-dengue',name:'Prueba Dengue Dúo Realy',detail:'Precio por pieza',price:90,category:'Otros productos',icon:'🦟',badge:'Oferta'},
  {id:'p-covid',name:'Prueba COVID e Influenza Dúo o VIH',detail:'Precio por pieza',price:90,category:'Otros productos',icon:'🦠',badge:'Oferta'},
  {id:'p-antidoping',name:'Prueba antidoping de 6 parámetros',detail:'Precio por pieza',price:100,category:'Otros productos',icon:'🧪',badge:'Oferta'},
  {id:'p-triple',name:'Prueba triple Influenza A y B, COVID-19 y Virus Sincitial',detail:'Precio por pieza',price:100,category:'Otros productos',icon:'🧬',badge:'Oferta'},
  {id:'p-cuadruple',name:'Prueba cuádruple Influenza A y B, COVID-19, Virus Sincitial y Adenovirus',detail:'Precio por pieza',price:120,category:'Otros productos',icon:'🧬',badge:'Oferta'}
];

const state={cart:JSON.parse(localStorage.getItem('elbambino-cart')||'{}'),category:'Todos',query:''};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=v=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(v||0));
const saveCart=()=>localStorage.setItem('elbambino-cart',JSON.stringify(state.cart));

function renderProducts(){
  const grid=$('#productGrid');
  if(!grid) return;
  const q=state.query.trim().toLowerCase();
  const list=PRODUCTS.filter(p=>(state.category==='Todos'||p.category===state.category)&&(!q||`${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(q)));
  grid.innerHTML=list.map(p=>`<article class="product-card ${p.special?'special-card':''}"><span class="product-badge">${p.special?'Medicamento especial':p.category}</span><div class="product-visual">${p.icon||'🛍️'}</div><div class="product-body"><h3>${p.name}</h3><p>${p.detail}</p><div class="product-price">${money(p.price)}</div><div class="product-actions"><button type="button" class="btn btn-primary add-product" data-product-id="${p.id}">Agregar al carrito</button><input class="qty-input" data-qty-for="${p.id}" type="number" value="1" min="1" max="99"></div></div></article>`).join('');
  const empty=$('#emptyState'); if(empty) empty.hidden=list.length>0;
  $$('.add-product').forEach(b=>b.onclick=()=>{const input=document.querySelector(`[data-qty-for="${b.dataset.productId}"]`);addToCart(b.dataset.productId,Number(input?.value)||1)});
}

function cartEntries(){return Object.entries(state.cart).map(([id,qty])=>({product:PRODUCTS.find(p=>p.id===id),qty})).filter(x=>x.product)}
function addToCart(id,qty=1){state.cart[id]=(state.cart[id]||0)+qty;saveCart();renderCart();openPanel('cartDrawer')}
function changeQty(id,d){state.cart[id]=(state.cart[id]||0)+d;if(state.cart[id]<=0)delete state.cart[id];saveCart();renderCart()}
function removeItem(id){delete state.cart[id];saveCart();renderCart()}
function renderCart(){
  const items=cartEntries(),count=items.reduce((s,x)=>s+x.qty,0),subtotal=items.reduce((s,x)=>s+x.product.price*x.qty,0);
  if($('#cartCount'))$('#cartCount').textContent=count;
  if($('#cartSubtotal'))$('#cartSubtotal').textContent=money(subtotal);
  if($('#cartItems'))$('#cartItems').innerHTML=items.length?items.map(({product:p,qty})=>`<div class="cart-row"><div><h4>${p.name}</h4><small>${money(p.price)} c/u</small><div class="cart-row-actions"><button data-minus="${p.id}">−</button><strong>${qty}</strong><button data-plus="${p.id}">+</button><button data-remove="${p.id}">Eliminar</button></div></div><strong>${money(p.price*qty)}</strong></div>`).join(''):'<div class="cart-empty"><h3>Tu carrito está vacío</h3></div>';
  $$('[data-minus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));$$('[data-plus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));$$('[data-remove]').forEach(b=>b.onclick=()=>removeItem(b.dataset.remove));
  if($('#checkoutButton'))$('#checkoutButton').disabled=!items.length;
}
function openPanel(id){const el=document.getElementById(id),ov=$('#overlay');if(!el)return;if(ov)ov.hidden=false;el.hidden=false;requestAnimationFrame(()=>el.classList.add('open'));el.setAttribute('aria-hidden','false')}
function closePanel(id){const el=document.getElementById(id);if(!el)return;el.classList.remove('open');setTimeout(()=>{el.hidden=true;const ov=$('#overlay');if(ov)ov.hidden=true},320)}

function categoryFromCard(card){
  const t=(card.dataset.category||card.textContent||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(t.includes('medicamento basico'))return'Medicamento básico';
  if(t.includes('medicamento especial'))return'Medicamento especial';
  if(t.includes('otros productos'))return'Otros productos';
  if(t.includes('guantes'))return'Guantes';
  if(t.includes('diabetes'))return'Diabetes';
  return'';
}

async function sendOrder(order){
  const api=(window.ORDER_API_URL||'').replace(/\/$/,'');
  const payload={customerName:order.cliente.nombre||'',phone:order.cliente.telefono||'',address:order.cliente.domicilio||'',neighborhood:order.cliente.colonia||'',city:order.cliente.ciudad||'',state:order.cliente.estado||'',businessHours:order.cliente.horario||'',paymentMethod:order.cliente.pago||'Pagar al recibir',items:order.productos.map(p=>({name:p.nombre,quantity:p.cantidad,price:p.precioEstimado})),total:order.subtotalEstimado,notes:order.cliente.observaciones||''};
  const r=await fetch(`${api}/api/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'No fue posible enviar el pedido');return d;
}

function init(){
  document.querySelectorAll('.category-card,[data-category]').forEach(card=>{if(/vitaminas|suplementos/i.test(card.textContent)){card.remove();return;}card.style.cursor='pointer';card.onclick=()=>{const c=categoryFromCard(card);if(!c)return;state.category=c;renderProducts();setTimeout(()=>($('#productos')||$('#productGrid'))?.scrollIntoView({behavior:'smooth'}),50)}});
  const search=$('#searchInput');if(search)search.oninput=()=>{state.query=search.value;renderProducts()};if($('#searchButton'))$('#searchButton').onclick=()=>renderProducts();
  if($('#cartButton'))$('#cartButton').onclick=()=>openPanel('cartDrawer');
  if($('#checkoutButton'))$('#checkoutButton').onclick=()=>{if(cartEntries().length){closePanel('cartDrawer');setTimeout(()=>openPanel('checkoutDrawer'),350)}};
  const form=$('#checkoutForm');if(form)form.onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries()),items=cartEntries(),order={cliente:data,productos:items.map(x=>({nombre:x.product.name,cantidad:x.qty,precioEstimado:x.product.price})),subtotalEstimado:items.reduce((s,x)=>s+x.product.price*x.qty,0)};try{const result=await sendOrder(order);alert(`Pedido enviado correctamente. Folio: ${result.orderNumber||''}`);state.cart={};saveCart();renderCart();closePanel('checkoutDrawer');form.reset()}catch(err){alert(`No fue posible enviar el pedido. ${err.message}`)}};
  $$('[data-close]').forEach(b=>b.onclick=()=>{const id=b.dataset.close;document.getElementById(id)?.classList.contains('drawer')?closePanel(id):null});
  renderCart();renderProducts();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

/* Corrección robusta del proceso de pedido */
(function(){
  function normalizeText(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
  }

  function findCheckoutDrawer(){
    return document.getElementById('checkoutDrawer')
      || document.getElementById('pedidoDrawer')
      || document.getElementById('checkout')
      || document.getElementById('pedido')
      || document.querySelector('.checkout-drawer')
      || document.querySelector('[data-checkout-drawer]');
  }

  function findCheckoutForm(){
    return document.getElementById('checkoutForm')
      || document.getElementById('pedidoForm')
      || document.querySelector('form[data-checkout]')
      || document.querySelector('.checkout-drawer form')
      || document.querySelector('[data-checkout-drawer] form');
  }

  function openCheckout(){
    if(!cartEntries().length){
      alert('Agregue al menos un producto al carrito.');
      return;
    }
    const cartDrawer=document.getElementById('cartDrawer') || document.querySelector('.cart-drawer');
    if(cartDrawer?.id) closePanel(cartDrawer.id);
    const drawer=findCheckoutDrawer();
    if(!drawer){
      alert('No se encontró el formulario del pedido.');
      return;
    }
    setTimeout(()=>{
      if(drawer.id) openPanel(drawer.id);
      else{
        const overlay=document.getElementById('overlay');
        if(overlay) overlay.hidden=false;
        drawer.hidden=false;
        requestAnimationFrame(()=>drawer.classList.add('open'));
      }
    },250);
  }

  async function submitCheckout(form){
    const items=cartEntries();
    if(!items.length) throw new Error('El carrito está vacío.');

    const data=Object.fromEntries(new FormData(form).entries());
    const get=(...keys)=>{
      for(const key of keys){
        if(data[key]!==undefined && String(data[key]).trim()!=='') return String(data[key]).trim();
      }
      return '';
    };

    const cliente={
      nombre:get('nombre','customerName','cliente','nombreCliente'),
      telefono:get('telefono','phone','teléfono'),
      domicilio:get('domicilio','address','direccion','dirección','ubicacion'),
      colonia:get('colonia','neighborhood'),
      ciudad:get('ciudad','city'),
      estado:get('estado','state'),
      cp:get('cp','codigoPostal','postalCode'),
      horario:get('horario','businessHours','horarioEstablecimiento'),
      cierra:get('cierra','cierraMediodia','closesMidday'),
      pago:get('pago','paymentMethod','formaPago') || 'Pagar al recibir',
      observaciones:get('observaciones','notes','notas')
    };

    if(!cliente.nombre || !cliente.domicilio){
      throw new Error('Complete nombre y domicilio.');
    }

    const order={
      cliente,
      productos:items.map(item=>({
        id:item.product.id,
        nombre:item.product.name,
        cantidad:item.qty,
        precioEstimado:item.product.price
      })),
      subtotalEstimado:items.reduce((sum,item)=>sum+item.product.price*item.qty,0)
    };

    return sendOrder(order);
  }

  function bindCheckout(){
    const directButtons=[
      document.getElementById('checkoutButton'),
      document.getElementById('finalizarPedido'),
      document.getElementById('btnPedido'),
      ...document.querySelectorAll('[data-checkout-open],.checkout-button,.finalize-order')
    ].filter(Boolean);

    document.querySelectorAll('button,a').forEach(el=>{
      const txt=normalizeText(el.textContent);
      if((txt.includes('hacer pedido') || txt.includes('finalizar pedido') || txt.includes('continuar pedido')) && !directButtons.includes(el)){
        directButtons.push(el);
      }
    });

    directButtons.forEach(button=>{
      if(button.dataset.checkoutBound==='1') return;
      button.dataset.checkoutBound='1';
      button.addEventListener('click',event=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        openCheckout();
      },true);
    });

    const form=findCheckoutForm();
    if(form && form.dataset.submitBound!=='1'){
      form.dataset.submitBound='1';
      form.addEventListener('submit',async event=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        const button=form.querySelector('button[type="submit"],input[type="submit"]');
        const oldText=button?.textContent;
        if(button){button.disabled=true;if(button.tagName==='BUTTON')button.textContent='ENVIANDO PEDIDO...';}
        try{
          const result=await submitCheckout(form);
          alert(`Pedido enviado correctamente. Folio: ${result.orderNumber||result.numeroPedido||''}`);
          state.cart={};saveCart();renderCart();form.reset();
          const drawer=findCheckoutDrawer();
          if(drawer?.id) closePanel(drawer.id);
        }catch(error){
          alert(`No fue posible enviar el pedido. ${error.message}`);
        }finally{
          if(button){button.disabled=false;if(button.tagName==='BUTTON' && oldText)button.textContent=oldText;}
        }
      },true);
    }

    document.querySelectorAll('button').forEach(button=>{
      const txt=normalizeText(button.textContent);
      if(!(txt.includes('confirmar pedido') || txt.includes('enviar pedido'))) return;
      if(button.dataset.confirmBound==='1') return;
      button.dataset.confirmBound='1';
      button.addEventListener('click',event=>{
        const form=button.closest('form') || findCheckoutForm();
        if(!form) return;
        if(button.type!=='submit'){
          event.preventDefault();
          form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
        }
      });
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindCheckout);
  else bindCheckout();
  setTimeout(bindCheckout,500);
  setTimeout(bindCheckout,1500);
})();


/* Aviso autorizado de entrega y pedido mínimo */
(function updateDeliveryNotice(){
  const applyNotice = () => {
    const box = document.querySelector('.final-price-notice');
    if (!box) return;

    box.innerHTML = `
      <strong>Precio estimado</strong>
      <span>El importe final se confirma cuando el pedido es preparado en el almacén.</span>
      <span><strong>Disfruta de entrega a domicilio sin costo en pedidos desde $1,000.00 (Zona Metropolitana) y desde $1,200.00 (envíos foráneos).</strong></span>
      <span>En pedidos de menor importe se aplicará un cargo de entrega de <strong>$250.00</strong>.</span>
    `;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNotice);
  } else {
    applyNotice();
  }
  setTimeout(applyNotice, 500);
})();
