
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import PDFDocument from "pdfkit";

dotenv.config();
const app=express();
const PORT=Number(process.env.PORT||3000);
const ORIGIN=process.env.FRONTEND_ORIGIN||"https://elbambinodaniel.com";
const ADMIN_PIN=process.env.ADMIN_PIN||"2222";
const DATA_FILE=path.resolve("orders.json");

app.use(cors({origin:ORIGIN}));
app.use(express.json({limit:"1mb"}));

async function readOrders(){
  try{return JSON.parse(await fs.readFile(DATA_FILE,"utf8"))}
  catch(e){if(e.code==="ENOENT") return [];throw e}
}
async function writeOrders(orders){
  await fs.writeFile(DATA_FILE,JSON.stringify(orders,null,2),"utf8");
}
function adminOnly(req,res,next){
  if(req.get("X-Admin-Pin")!==ADMIN_PIN) return res.status(401).json({error:"Acceso no autorizado."});
  next();
}
function validateOrder(o){
  if(!o?.folio||!o?.cliente?.nombre||!Array.isArray(o?.productos)||!o.productos.length) throw new Error("Pedido incompleto.");
}
async function sendWhatsAppText(order){
  const token=process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId=process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version=process.env.WHATSAPP_API_VERSION||"v22.0";
  const to=process.env.ORDER_RECIPIENT_PHONE;
  if(!token||!phoneId||!to) return {sent:false};
  const message=`Tienes el pedido número ${order.folio} en elbambinodaniel.com. Entra a Revisar pedidos.`;
  const r=await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`,{
    method:"POST",
    headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
    body:JSON.stringify({messaging_product:"whatsapp",to,type:"text",text:{body:message}})
  });
  const data=await r.json();
  if(!r.ok) throw new Error(data?.error?.message||"No se pudo enviar el aviso de WhatsApp.");
  return {sent:true,id:data?.messages?.[0]?.id||null};
}
function createPdf(order,res){
  const doc=new PDFDocument({size:"A4",margin:45});
  res.setHeader("Content-Type","application/pdf");
  res.setHeader("Content-Disposition",`inline; filename="${order.folio}.pdf"`);
  doc.pipe(res);
  doc.fontSize(20).text("EL BAMBINO DANIEL",{align:"center"});
  doc.fontSize(11).text(`Pedido ${order.folio}`,{align:"center"});
  doc.moveDown();
  const line=(a,b)=>{doc.font("Helvetica-Bold").text(`${a}: `,{continued:true});doc.font("Helvetica").text(String(b??""))};
  line("Fecha",new Date(order.fecha).toLocaleString("es-MX"));
  line("Cliente",order.cliente.nombre);line("Teléfono",order.cliente.telefono);
  line("Domicilio",order.cliente.domicilio);line("Colonia",order.cliente.colonia);
  line("Ciudad",`${order.cliente.ciudad}, ${order.cliente.estado}, C.P. ${order.cliente.cp}`);
  line("Horario",order.cliente.horario);line("Cierra al mediodía",order.cliente.cierra);
  line("Pago",order.cliente.pago);line("Observaciones",order.cliente.observaciones||"Sin observaciones");
  doc.moveDown().font("Helvetica-Bold").text("Productos");
  order.productos.forEach((p,i)=>doc.font("Helvetica").text(`${i+1}. ${p.nombre} | Cantidad: ${p.cantidad} | $${Number(p.precioEstimado).toFixed(2)}`));
  doc.moveDown().font("Helvetica-Bold").text(`Total estimado: $${Number(order.subtotalEstimado).toFixed(2)}`);
  doc.end();
}

app.get("/health",(_req,res)=>res.json({ok:true}));
app.post("/api/orders",async(req,res)=>{
  try{
    const order=req.body;validateOrder(order);
    const orders=await readOrders();
    if(orders.some(x=>x.folio===order.folio)) return res.status(409).json({error:"El folio ya existe."});
    const saved={...order,status:"pending",createdAt:new Date().toISOString(),attendedAt:null};
    orders.unshift(saved);await writeOrders(orders);
    let whatsapp={sent:false};try{whatsapp=await sendWhatsAppText(saved)}catch(e){console.error(e)}
    res.json({saved:true,whatsapp,folio:saved.folio});
  }catch(e){res.status(400).json({error:e.message})}
});

app.get("/api/admin/session",adminOnly,(_req,res)=>res.json({ok:true}));
app.get("/api/admin/counts",adminOnly,async(_req,res)=>{
  const orders=await readOrders();
  res.json({pending:orders.filter(x=>x.status==="pending").length,attended:orders.filter(x=>x.status==="attended").length});
});
app.get("/api/admin/orders",adminOnly,async(req,res)=>{
  const status=req.query.status==="attended"?"attended":"pending";
  const orders=(await readOrders()).filter(x=>x.status===status);
  res.json({orders});
});
app.get("/api/admin/orders/:folio",adminOnly,async(req,res)=>{
  const order=(await readOrders()).find(x=>x.folio===req.params.folio);
  if(!order) return res.status(404).json({error:"Pedido no encontrado."});
  res.json(order);
});
app.get("/api/admin/orders/:folio/pdf",adminOnly,async(req,res)=>{
  const order=(await readOrders()).find(x=>x.folio===req.params.folio);
  if(!order) return res.status(404).json({error:"Pedido no encontrado."});
  createPdf(order,res);
});
app.post("/api/admin/orders/:folio/attended",adminOnly,async(req,res)=>{
  const orders=await readOrders();const i=orders.findIndex(x=>x.folio===req.params.folio);
  if(i<0) return res.status(404).json({error:"Pedido no encontrado."});
  orders[i].status="attended";orders[i].attendedAt=new Date().toISOString();
  await writeOrders(orders);res.json({ok:true,order:orders[i]});
});

app.listen(PORT,()=>console.log(`Servidor activo en puerto ${PORT}`));
