
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import axios from 'axios';

dotenv.config();
const app=express();
const PORT=process.env.PORT||3000;
const DATA_DIR=process.env.DATA_DIR||path.join(process.cwd(),'data');
const ORDERS_FILE=path.join(DATA_DIR,'orders.json');
const VISITS_FILE=path.join(DATA_DIR,'visits.json');
const ADMIN_PIN=process.env.ADMIN_PIN||'2222';
const ALLOWED_ORIGIN=process.env.ALLOWED_ORIGIN||'https://elbambinodaniel.com';

app.use(cors({origin:[ALLOWED_ORIGIN,'https://www.elbambinodaniel.com'],methods:['GET','POST','OPTIONS'],allowedHeaders:['Content-Type','X-Admin-Pin']}));
app.use(express.json({limit:'1mb'}));

async function ensureFiles(){
  await fs.mkdir(DATA_DIR,{recursive:true});
  try{await fs.access(ORDERS_FILE)}catch{await fs.writeFile(ORDERS_FILE,'[]')}
  try{await fs.access(VISITS_FILE)}catch{await fs.writeFile(VISITS_FILE,'{"total":0}')}
}
async function readJson(file,fallback){
  try{return JSON.parse(await fs.readFile(file,'utf8'))}catch{return fallback}
}
async function writeJson(file,data){
  const tmp=file+'.tmp';
  await fs.writeFile(tmp,JSON.stringify(data,null,2));
  await fs.rename(tmp,file);
}
function auth(req,res,next){
  if(String(req.header('X-Admin-Pin')||'')!==String(ADMIN_PIN)) return res.status(401).json({error:'Clave incorrecta'});
  next();
}
async function notify(order){
  const tasks=[];
  if(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFY_EMAIL){
    const transporter=nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:Number(process.env.SMTP_PORT||587),
      secure:String(process.env.SMTP_SECURE||'false')==='true',
      auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}
    });
    const products=(order.productos||[]).map(p=>`${p.nombre} x ${p.cantidad}`).join('\n');
    tasks.push(transporter.sendMail({
      from:process.env.SMTP_FROM||process.env.SMTP_USER,
      to:process.env.NOTIFY_EMAIL,
      subject:`Nuevo pedido ${order.folio}`,
      text:`Nuevo pedido en elbambinodaniel.com\n\nFolio: ${order.folio}\nCliente: ${order.cliente?.nombre||''}\nTeléfono: ${order.cliente?.telefono||''}\n\nProductos:\n${products}\n\nTotal estimado: ${order.subtotalEstimado||0}\n\nRevise: https://elbambinodaniel.com/revisarpedidos`
    }));
  }
  if(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.ORDER_RECIPIENT_PHONE){
    tasks.push(axios.post(
      `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product:'whatsapp',
        to:process.env.ORDER_RECIPIENT_PHONE,
        type:'text',
        text:{body:`🔔 Nuevo pedido ${order.folio} de ${order.cliente?.nombre||'cliente'}.\nRevise: https://elbambinodaniel.com/revisarpedidos`}
      },
      {headers:{Authorization:`Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,'Content-Type':'application/json'}}
    ));
  }
  await Promise.allSettled(tasks);
}

app.get('/health',(req,res)=>res.json({ok:true}));
app.post('/api/orders',async(req,res)=>{
  const order=req.body;
  if(!order?.folio || !order?.cliente?.nombre || !Array.isArray(order?.productos)) return res.status(400).json({error:'Pedido incompleto'});
  const orders=await readJson(ORDERS_FILE,[]);
  if(!orders.some(o=>o.folio===order.folio)){
    order.status='pending';
    order.receivedAt=new Date().toISOString();
    orders.unshift(order);
    await writeJson(ORDERS_FILE,orders);
    await notify(order);
  }
  res.status(201).json({ok:true,folio:order.folio});
});
app.post('/api/visits',async(req,res)=>{
  const data=await readJson(VISITS_FILE,{total:0});
  data.total=Number(data.total||0)+1;
  await writeJson(VISITS_FILE,data);
  res.json(data);
});
app.get('/api/visits',(req,res)=>readJson(VISITS_FILE,{total:0}).then(data=>res.json(data)));
app.get('/api/admin/session',auth,(req,res)=>res.json({ok:true}));
app.get('/api/admin/counts',auth,async(req,res)=>{
  const orders=await readJson(ORDERS_FILE,[]);
  res.json({
    pending:orders.filter(o=>(o.status||'pending')==='pending').length,
    attended:orders.filter(o=>o.status==='attended').length
  });
});
app.get('/api/admin/orders',auth,async(req,res)=>{
  const status=req.query.status||'pending';
  const orders=await readJson(ORDERS_FILE,[]);
  res.json({orders:orders.filter(o=>(o.status||'pending')===status)});
});
app.get('/api/admin/orders/:folio',auth,async(req,res)=>{
  const orders=await readJson(ORDERS_FILE,[]);
  const order=orders.find(o=>o.folio===req.params.folio);
  if(!order) return res.status(404).json({error:'Pedido no encontrado'});
  res.json(order);
});
app.post('/api/admin/orders/:folio/attended',auth,async(req,res)=>{
  const orders=await readJson(ORDERS_FILE,[]);
  const order=orders.find(o=>o.folio===req.params.folio);
  if(!order) return res.status(404).json({error:'Pedido no encontrado'});
  order.status='attended';
  order.attendedAt=new Date().toISOString();
  await writeJson(ORDERS_FILE,orders);
  res.json({ok:true});
});

await ensureFiles();
app.listen(PORT,()=>console.log(`Servidor iniciado en puerto ${PORT}`));
