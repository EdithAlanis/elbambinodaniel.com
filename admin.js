
const API_BASE=(window.ORDER_API_URL||'').replace(/\/$/,'');
const ADMIN_PIN=String(window.EL_BAMBINO_ADMIN_PIN||'2222');
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n||0));
let currentStatus='pending';

function pin(){return sessionStorage.getItem('elbambino-admin-pin')||''}
function localOrders(){
  try{return JSON.parse(localStorage.getItem('elbambino-orders')||'[]')}
  catch(_){return []}
}
function saveLocalOrders(orders){localStorage.setItem('elbambino-orders',JSON.stringify(orders))}
function api(path,options={}){
  return fetch(`${API_BASE}${path}`,{
    ...options,
    headers:{'Content-Type':'application/json','X-Admin-Pin':pin(),...(options.headers||{})}
  }).then(async r=>{
    const data=await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(data.error||'No fue posible realizar la operación.');
    return data;
  });
}
async function login(testPin){
  if(API_BASE){
    sessionStorage.setItem('elbambino-admin-pin',testPin);
    await api('/api/admin/session');
  }else{
    if(String(testPin)!==ADMIN_PIN) throw new Error('Clave incorrecta');
    sessionStorage.setItem('elbambino-admin-pin',testPin);
  }
  $('#loginPanel').hidden=true;$('#ordersPanel').hidden=false;
  await loadCounts();await loadOrders(currentStatus);
}
async function loadCounts(){
  if(API_BASE){
    const data=await api('/api/admin/counts');
    $('#pendingCount').textContent=data.pending||0;
    $('#historyCount').textContent=data.attended||0;
  }else{
    const orders=localOrders();
    $('#pendingCount').textContent=orders.filter(o=>(o.status||'pending')==='pending').length;
    $('#historyCount').textContent=orders.filter(o=>o.status==='attended').length;
  }
}
async function getOrders(status){
  if(API_BASE) return (await api(`/api/admin/orders?status=${encodeURIComponent(status)}`)).orders;
  return localOrders().filter(o=>(o.status||'pending')===status);
}
async function getOrder(folio){
  if(API_BASE) return api(`/api/admin/orders/${encodeURIComponent(folio)}`);
  const found=localOrders().find(o=>o.folio===folio);
  if(!found) throw new Error('Pedido no encontrado');
  return found;
}
async function loadOrders(status){
  currentStatus=status;
  $$('.orders-tab').forEach(b=>b.classList.toggle('active',b.dataset.status===status));
  const box=$('#ordersList');box.innerHTML='<div class="admin-info">Cargando pedidos...</div>';
  const orders=await getOrders(status);
  if(!orders.length){box.innerHTML='<div class="admin-info">No hay pedidos en esta sección.</div>';return}
  box.innerHTML=orders.map(o=>`<article class="order-card">
    <div><h3>${o.folio}</h3><p>${o.cliente?.nombre||''}</p></div>
    <div><small>Fecha</small><p>${new Date(o.fecha).toLocaleString('es-MX')}</p></div>
    <div><small>Total estimado</small><p><strong>${money(o.subtotalEstimado)}</strong></p></div>
    <div><span class="status-pill ${o.status==='attended'?'status-attended':'status-pending'}">${o.status==='attended'?'Atendido':'Pendiente'}</span></div>
    <div class="order-actions"><button class="btn btn-primary" data-view="${o.folio}">Ver pedido</button></div>
  </article>`).join('');
  $$('[data-view]').forEach(b=>b.onclick=()=>viewOrder(b.dataset.view));
}
async function viewOrder(folio){
  const o=await getOrder(folio);
  const products=(o.productos||[]).map(p=>`<tr><td>${p.nombre}</td><td>${p.cantidad}</td><td>${money(p.precioEstimado)}</td><td>${money(Number(p.precioEstimado)*Number(p.cantidad))}</td></tr>`).join('');
  $('#orderDetail').innerHTML=`<span class="eyebrow">Pedido ${o.status==='attended'?'histórico':'pendiente'}</span>
    <h2>${o.folio}</h2>
    <div class="detail-grid">
      <div class="detail-box"><strong>Cliente</strong>${o.cliente?.nombre||''}</div>
      <div class="detail-box"><strong>Teléfono</strong>${o.cliente?.telefono||''}</div>
      <div class="detail-box"><strong>Domicilio</strong>${o.cliente?.domicilio||''}</div>
      <div class="detail-box"><strong>Colonia</strong>${o.cliente?.colonia||''}</div>
      <div class="detail-box"><strong>Ciudad y estado</strong>${o.cliente?.ciudad||''}, ${o.cliente?.estado||''}, C.P. ${o.cliente?.cp||''}</div>
      <div class="detail-box"><strong>Horario</strong>${o.cliente?.horario||''} · Cierra al mediodía: ${o.cliente?.cierra||''}</div>
      <div class="detail-box"><strong>Pago</strong>${o.cliente?.pago||''}</div>
      <div class="detail-box"><strong>Observaciones</strong>${o.cliente?.observaciones||'Sin observaciones'}</div>
    </div>
    <table class="detail-products"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Importe</th></tr></thead><tbody>${products}</tbody></table>
    <h3>Total estimado: ${money(o.subtotalEstimado)}</h3>
    <div class="detail-actions">
      <button class="btn btn-light" id="printOrder">Imprimir pedido</button>
      ${o.status!=='attended'?`<button class="btn btn-success" id="markAttended">Marcar como atendido</button>`:''}
    </div>`;
  $('#orderModal').hidden=false;
  $('#printOrder').onclick=()=>window.print();
  const attended=$('#markAttended');
  if(attended) attended.onclick=async()=>{
    if(!confirm('¿Marcar este pedido como atendido y enviarlo al histórico?')) return;
    if(API_BASE){
      await api(`/api/admin/orders/${encodeURIComponent(folio)}/attended`,{method:'POST'});
    }else{
      const orders=localOrders();
      const item=orders.find(o=>o.folio===folio);
      if(item)item.status='attended';
      saveLocalOrders(orders);
    }
    $('#orderModal').hidden=true;await loadCounts();await loadOrders(currentStatus);
  };
}
$('#loginForm').addEventListener('submit',async e=>{
  e.preventDefault();$('#loginError').hidden=true;
  try{await login($('#adminPin').value)}
  catch(_){sessionStorage.removeItem('elbambino-admin-pin');$('#loginError').hidden=false}
});
$('#logoutButton').onclick=()=>{sessionStorage.removeItem('elbambino-admin-pin');location.reload()};
$$('.orders-tab').forEach(b=>b.onclick=()=>loadOrders(b.dataset.status));
$('#closeOrderModal').onclick=()=>$('#orderModal').hidden=true;
$('#orderModal').onclick=e=>{if(e.target.id==='orderModal')$('#orderModal').hidden=true};
if(pin()) login(pin()).catch(()=>sessionStorage.removeItem('elbambino-admin-pin'));


// Respaldo visible para navegadores con caché o errores previos.
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('loginForm');
  const input=document.getElementById('adminPin');
  const error=document.getElementById('loginError');
  if(form && !form.dataset.ready){
    form.dataset.ready='1';
  }
  if(input) input.focus();
  if(error) error.textContent='Clave incorrecta. La clave de acceso es 2222.';
});
