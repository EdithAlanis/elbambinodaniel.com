
const API_BASE=(window.ORDER_API_URL||'').replace(/\/$/,'');
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n||0));
let enteredPin='';
let currentStatus='pending';

function pin(){return sessionStorage.getItem('elbambino-admin-pin')||''}
function api(path,options={}){
  if(!API_BASE || API_BASE.includes('TU-SERVIDOR')) throw new Error('Servidor no configurado');
  return fetch(`${API_BASE}${path}`,{
    ...options,
    headers:{'Content-Type':'application/json','X-Admin-Pin':pin(),...(options.headers||{})}
  }).then(async r=>{
    const data=await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(data.error||'No fue posible realizar la operación.');
    return data;
  });
}
function updateDisplay(){
  $('#pinDisplay').textContent='●'.repeat(enteredPin.length)+'○'.repeat(Math.max(0,4-enteredPin.length));
}
async function login(){
  sessionStorage.setItem('elbambino-admin-pin',enteredPin);
  try{
    await api('/api/admin/session');
    $('#loginPanel').hidden=true;
    $('#ordersPanel').hidden=false;
    await loadCounts();
    await loadOrders(currentStatus);
  }catch(e){
    sessionStorage.removeItem('elbambino-admin-pin');
    enteredPin='';
    updateDisplay();
    $('#loginError').hidden=false;
  }
}
async function loadCounts(){
  const data=await api('/api/admin/counts');
  $('#pendingCount').textContent=data.pending||0;
  $('#historyCount').textContent=data.attended||0;
}
async function loadOrders(status){
  currentStatus=status;
  $$('.orders-tab').forEach(b=>b.classList.toggle('active',b.dataset.status===status));
  const box=$('#ordersList');
  box.innerHTML='<div class="admin-info">Cargando pedidos…</div>';
  const data=await api(`/api/admin/orders?status=${encodeURIComponent(status)}`);
  if(!data.orders.length){
    box.innerHTML='<div class="admin-info">No hay pedidos en esta sección.</div>';
    return;
  }
  box.innerHTML=data.orders.map(o=>`<article class="order-card">
    <div><h3>${o.folio}</h3><p>${o.cliente?.nombre||''}</p></div>
    <div><small>Fecha</small><p>${new Date(o.fecha).toLocaleString('es-MX')}</p></div>
    <div><small>Total estimado</small><p><strong>${money(o.subtotalEstimado)}</strong></p></div>
    <div><span class="status-pill ${o.status==='attended'?'status-attended':'status-pending'}">${o.status==='attended'?'Atendido':'Pendiente'}</span></div>
    <div><button class="btn btn-primary" data-view="${o.folio}">Ver pedido</button></div>
  </article>`).join('');
  $$('[data-view]').forEach(b=>b.onclick=()=>viewOrder(b.dataset.view));
}
async function viewOrder(folio){
  const o=await api(`/api/admin/orders/${encodeURIComponent(folio)}`);
  const products=(o.productos||[]).map(p=>`<tr><td>${p.nombre}</td><td>${p.cantidad}</td><td>${money(p.precioEstimado||0)}</td><td>${money((p.precioEstimado||0)*(p.cantidad||0))}</td></tr>`).join('');
  $('#orderDetail').innerHTML=`<span class="eyebrow">Pedido</span><h2>${o.folio}</h2>
  <div class="detail-grid">
    <div class="detail-box"><strong>Cliente</strong>${o.cliente?.nombre||''}</div>
    <div class="detail-box"><strong>Teléfono</strong>${o.cliente?.telefono||''}</div>
    <div class="detail-box"><strong>Domicilio</strong>${o.cliente?.domicilio||''}</div>
    <div class="detail-box"><strong>Colonia</strong>${o.cliente?.colonia||''}</div>
    <div class="detail-box"><strong>Ciudad y estado</strong>${o.cliente?.ciudad||''}, ${o.cliente?.estado||''}</div>
    <div class="detail-box"><strong>Pago</strong>${o.cliente?.pago||''}</div>
  </div>
  <table class="detail-products"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Importe</th></tr></thead><tbody>${products}</tbody></table>
  <h3>Total estimado: ${money(o.subtotalEstimado)}</h3>
  <div class="detail-actions">
    <button class="btn btn-light" id="printOrder">Imprimir pedido</button>
    ${o.status!=='attended'?'<button class="btn btn-success" id="markAttended">Marcar como atendido</button>':''}
  </div>`;
  $('#orderModal').hidden=false;
  $('#printOrder').onclick=()=>window.print();
  const btn=$('#markAttended');
  if(btn)btn.onclick=async()=>{
    await api(`/api/admin/orders/${encodeURIComponent(folio)}/attended`,{method:'POST'});
    $('#orderModal').hidden=true;
    await loadCounts();
    await loadOrders(currentStatus);
  };
}
document.addEventListener('DOMContentLoaded',()=>{
  updateDisplay();
  $$('.pin-key[data-digit]').forEach(b=>b.onclick=()=>{if(enteredPin.length<4){enteredPin+=b.dataset.digit;updateDisplay();$('#loginError').hidden=true;}});
  $('[data-action="clear"]').onclick=()=>{enteredPin='';updateDisplay()};
  $('[data-action="back"]').onclick=()=>{enteredPin=enteredPin.slice(0,-1);updateDisplay()};
  $('#loginButton').onclick=login;
  $('#logoutButton').onclick=()=>{sessionStorage.removeItem('elbambino-admin-pin');location.reload()};
  $$('.orders-tab').forEach(b=>b.onclick=()=>loadOrders(b.dataset.status));
  $('#closeOrderModal').onclick=()=>$('#orderModal').hidden=true;
  $('#orderModal').onclick=e=>{if(e.target.id==='orderModal')$('#orderModal').hidden=true};
});
