
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const ADMIN_PIN='2222';
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n||0));
let currentStatus='pending';
let enteredPin='';

function getOrders(){
  try{return JSON.parse(localStorage.getItem('elbambino-orders')||'[]')}
  catch(e){return []}
}
function saveOrders(orders){localStorage.setItem('elbambino-orders',JSON.stringify(orders))}
function updatePinDisplay(){
  const el=$('#pinDisplay');
  if(el) el.textContent='●'.repeat(enteredPin.length)+'○'.repeat(4-enteredPin.length);
}
function addDigit(d){
  if(enteredPin.length<4){enteredPin+=d;updatePinDisplay();$('#loginError').hidden=true;}
}
function clearPin(){enteredPin='';updatePinDisplay();$('#loginError').hidden=true}
function backPin(){enteredPin=enteredPin.slice(0,-1);updatePinDisplay();$('#loginError').hidden=true}
function enterPanel(){
  if(enteredPin!==ADMIN_PIN){
    $('#loginError').hidden=false;clearPin();return;
  }
  sessionStorage.setItem('elbambino-admin-ok','1');
  $('#loginPanel').hidden=true;$('#ordersPanel').hidden=false;
  loadCounts();loadOrders(currentStatus);
}
function loadCounts(){
  const orders=getOrders();
  $('#pendingCount').textContent=orders.filter(o=>(o.status||'pending')==='pending').length;
  $('#historyCount').textContent=orders.filter(o=>o.status==='attended').length;
}
function loadOrders(status){
  currentStatus=status;
  $$('.orders-tab').forEach(b=>b.classList.toggle('active',b.dataset.status===status));
  const orders=getOrders().filter(o=>(o.status||'pending')===status);
  const box=$('#ordersList');
  if(!orders.length){
    box.innerHTML='<div class="admin-info">No hay pedidos guardados en este navegador.</div>';
    return;
  }
  box.innerHTML=orders.map(o=>`<article class="order-card">
    <div><h3>${o.folio||'Sin folio'}</h3><p>${o.cliente?.nombre||''}</p></div>
    <div><small>Fecha</small><p>${o.fecha?new Date(o.fecha).toLocaleString('es-MX'):''}</p></div>
    <div><small>Total estimado</small><p><strong>${money(o.subtotalEstimado)}</strong></p></div>
    <div><span class="status-pill ${o.status==='attended'?'status-attended':'status-pending'}">${o.status==='attended'?'Atendido':'Pendiente'}</span></div>
    <div><button class="btn btn-primary" data-view="${o.folio}">Ver pedido</button></div>
  </article>`).join('');
  $$('[data-view]').forEach(b=>b.onclick=()=>viewOrder(b.dataset.view));
}
function viewOrder(folio){
  const o=getOrders().find(x=>x.folio===folio);
  if(!o)return;
  const products=(o.productos||[]).map(p=>`<tr>
    <td>${p.nombre||''}</td><td>${p.cantidad||0}</td>
    <td>${money(p.precioEstimado||p.price||0)}</td>
    <td>${money(Number(p.precioEstimado||p.price||0)*Number(p.cantidad||0))}</td>
  </tr>`).join('');
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
  if(btn)btn.onclick=()=>{
    const orders=getOrders();
    const item=orders.find(x=>x.folio===folio);
    if(item)item.status='attended';
    saveOrders(orders);
    $('#orderModal').hidden=true;loadCounts();loadOrders(currentStatus);
  };
}
document.addEventListener('DOMContentLoaded',()=>{
  updatePinDisplay();
  $$('.pin-key[data-digit]').forEach(b=>b.onclick=()=>addDigit(b.dataset.digit));
  $('[data-action="clear"]')?.addEventListener('click',clearPin);
  $('[data-action="back"]')?.addEventListener('click',backPin);
  $('#directLoginButton')?.addEventListener('click',enterPanel);
  $('#logoutButton').onclick=()=>{sessionStorage.removeItem('elbambino-admin-ok');location.reload()};
  $$('.orders-tab').forEach(b=>b.onclick=()=>loadOrders(b.dataset.status));
  $('#closeOrderModal').onclick=()=>$('#orderModal').hidden=true;
  $('#orderModal').onclick=e=>{if(e.target.id==='orderModal')$('#orderModal').hidden=true};
  if(sessionStorage.getItem('elbambino-admin-ok')==='1'){
    $('#loginPanel').hidden=true;$('#ordersPanel').hidden=false;loadCounts();loadOrders(currentStatus);
  }
});
