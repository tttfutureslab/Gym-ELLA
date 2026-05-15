import { useState, useEffect, useRef } from "react";

const CARDIO_F = {
  elliptical: { min: 2.0, tip: "Nivel 5-7, cadencia 140-160ppm. Sala cardio Aqua — quema grasa óptima al final." },
  treadmill:  { min: 1.6, tip: "Trote 9.5km/h o inclinación 10% a 6km/h. Zona quema grasa ~130-145ppm." },
};

const VIDEOS = {
  // LUNES
  "TG Chest Press F":       "3a9SC2DFb4o",
  "HS Incline Press F":     "IP1pNJPORww",
  "TG Pec Deck F":          "x9kPD0hJ0bQ",
  "HS Shoulder Press F":    "qEwKCR5JCog",
  "TG Lateral Raise F":     "3VcKaXpzqRo",
  "TG Tricep Cable F":      "2-LAMcpzODU",
  "TG Tricep Machine F":    "2-LAMcpzODU",
  // MARTES
  "TG Lat Pulldown F":      "CAwf7n6Tuhs",
  "TG Seated Row F":        "GZbfZ033f74",
  "HS One Arm Row F":       "pYcpY20QaE8",
  "TG Face Pull F":         "0Po47vvj9g4",
  "TG Pullover F":          "1rdYNDpCVKo",
  "TG Preacher Curl F":     "fIWP-FRFNU0",
  "TG Cable Curl F":        "av7-8CzC9_Y",
  // MIÉRCOLES
  "TG Leg Press F":         "IZxyjW7WGPM",
  "TG Glute Press F":       "SEdqd1n0cvg",
  "TG Hip Abduction F":     "kDqklk1YFUQ",
  "TG Lying Curl F":        "1Tq3QdYUuHs",
  "TG Leg Extension F":     "YyvSfVjQeL0",
  "HS Hack Squat F":        "EdtpSCFDrBA",
  "TG Calf F":              "gwLzBJYoWlA",
  // JUEVES
  "HS Shoulder Uni F":      "qEwKCR5JCog",
  "TG Cable Lateral F":     "3VcKaXpzqRo",
  "TG Reverse Fly F":       "1dSfBSGBpWQ",
  "TG Ab Crunch F":         "Xyd_fa5zoEU",
  "TG Leg Raise F":         "JB2oyawG9KI",
  "TG Torso Rotation F":    "TBEMJwXwBHg",
  "TG Overhead Tricep F":   "KCCL2o6thkI",
  // VIERNES
  "TG Leg Press Hi F":      "IZxyjW7WGPM",
  "TG Seated Curl F":       "1Tq3QdYUuHs",
  "HS Pulldown F":          "CAwf7n6Tuhs",
  "HS Single Row F":        "pYcpY20QaE8",
  "TG Abduction2 F":        "kDqklk1YFUQ",
  "TG Cable Curl2 F":       "av7-8CzC9_Y",
  "TG Crunch2 F":           "Xyd_fa5zoEU",
};

const ROUTINE = {
  Lunes: {
    type:"PUSH", muscle:"Pecho · Hombros · Tríceps", emoji:"💪", color:"#ec4899",
    tip:"Pesos moderados con técnica perfecta. Las máquinas Technogym guían el recorrido — aprovéchalo para conectar con el músculo.",
    exercises:[
      {id:1,name:"TG Chest Press F",      display:"TG Press de Pecho Máquina",        sets:"4 × 10-12", muscle:"Pecho",           video:"TG Chest Press F",     note:"Sala LIFT — asiento a altura de pecho"},
      {id:2,name:"HS Incline Press F",    display:"HS Press Inclinado",               sets:"4 × 12",    muscle:"Pecho alto",      video:"HS Incline Press F",   note:"Sala HS — foco en pecho clavicular"},
      {id:3,name:"TG Pec Deck F",         display:"TG Pec Deck (Aperturas)",          sets:"3 × 15",    muscle:"Pecho",           video:"TG Pec Deck F",        note:"Sala LIFT — stretch completo en cada rep"},
      {id:4,name:"HS Shoulder Press F",   display:"HS Press de Hombros",              sets:"4 × 12",    muscle:"Hombros",         video:"HS Shoulder Press F",  note:"Sala HS — espalda pegada al respaldo"},
      {id:5,name:"TG Lateral Raise F",    display:"TG Elevaciones Laterales",         sets:"4 × 15-20", muscle:"Hombros",         video:"TG Lateral Raise F",   note:"Sala LIFT — codos a 90°, peso ligero"},
      {id:6,name:"TG Tricep Cable F",     display:"TG Extensiones Tríceps Cable",     sets:"3 × 15",    muscle:"Tríceps",         video:"TG Tricep Cable F",    note:"Cable Station LIFT — codos fijos al cuerpo"},
      {id:7,name:"TG Tricep Machine F",   display:"TG Press Tríceps Máquina",         sets:"3 × 15",    muscle:"Tríceps",         video:"TG Tricep Machine F",  note:"Sala LIFT — rango completo"},
    ],
  },
  Martes: {
    type:"PULL", muscle:"Espalda · Bíceps · Postura", emoji:"🏋️", color:"#8b5cf6",
    tip:"La espalda fuerte define la postura y el porte. En el jalón lleva los codos abajo y atrás, no tires con los brazos.",
    exercises:[
      {id:1,name:"TG Lat Pulldown F",     display:"TG Jalón al Pecho Máquina",        sets:"4 × 12",    muscle:"Dorsal",          video:"TG Lat Pulldown F",    note:"Sala LIFT — agarre ancho, codos abajo y atrás"},
      {id:2,name:"TG Seated Row F",       display:"TG Remo Sentado Cable",            sets:"4 × 12",    muscle:"Espalda media",   video:"TG Seated Row F",      note:"Cable Station LIFT — pausa 1s contrayendo"},
      {id:3,name:"HS One Arm Row F",      display:"HS Remo Unilateral",               sets:"3 × 12 c/l",muscle:"Dorsal",          video:"HS One Arm Row F",     note:"Sala HS — rango máximo, codo al techo"},
      {id:4,name:"TG Face Pull F",        display:"TG Face Pulls Polea",              sets:"4 × 20",    muscle:"Deltoides post.", video:"TG Face Pull F",       note:"Cable Station — salud del manguito rotador"},
      {id:5,name:"TG Pullover F",         display:"TG Pull-over Máquina",             sets:"3 × 15",    muscle:"Dorsal/Serrato",  video:"TG Pullover F",        note:"Sala LIFT — brazos extendidos"},
      {id:6,name:"TG Preacher Curl F",    display:"TG Curl Bíceps Máquina",           sets:"3 × 12",    muscle:"Bíceps",          video:"TG Preacher Curl F",   note:"Sala LIFT — aislamiento total"},
      {id:7,name:"TG Cable Curl F",       display:"TG Curl en Cable",                 sets:"3 × 12",    muscle:"Bíceps/Braquial", video:"TG Cable Curl F",      note:"Cable Station — tensión en posición estirada"},
    ],
  },
  Miércoles: {
    type:"LEGS", muscle:"Glúteos · Cuádriceps · Isquios", emoji:"🍑", color:"#10b981",
    tip:"Día de glúteos — el más importante para tu objetivo. TG Glute Press y abducción son los dos ejercicios estrella de hoy.",
    exercises:[
      {id:1,name:"TG Leg Press F",        display:"TG Prensa de Piernas 45°",         sets:"4 × 12",    muscle:"Cuád/Glúteos",    video:"TG Leg Press F",       note:"Sala LIFT — pies altos y anchos = más glúteo"},
      {id:2,name:"TG Glute Press F",      display:"TG Glute Press / Hip Thrust",      sets:"5 × 12-15", muscle:"Glúteos",         video:"TG Glute Press F",     note:"⭐ Sala LIFT — pausa 1s arriba, el mejor para glúteo",},
      {id:3,name:"TG Hip Abduction F",    display:"TG Abducción de Cadera",           sets:"4 × 20",    muscle:"Glúteo medio",    video:"TG Hip Abduction F",   note:"Sala LIFT — glúteo medio, imprescindible"},
      {id:4,name:"TG Lying Curl F",       display:"TG Curl Femoral Tumbado",          sets:"4 × 12",    muscle:"Isquios",         video:"TG Lying Curl F",      note:"Sala LIFT — rango completo"},
      {id:5,name:"TG Leg Extension F",    display:"TG Extensiones Cuádriceps",        sets:"3 × 15",    muscle:"Cuádriceps",      video:"TG Leg Extension F",   note:"Sala LIFT — pausa 1s arriba"},
      {id:6,name:"HS Hack Squat F",       display:"HS Hack Squat Máquina",            sets:"3 × 12",    muscle:"Cuád/Glúteos",    video:"HS Hack Squat F",      note:"Sala HS — rodillas hacia fuera"},
      {id:7,name:"TG Calf F",             display:"TG Gemelos en Máquina",            sets:"4 × 20",    muscle:"Gemelos",         video:"TG Calf F",            note:"Sala LIFT — paso completo, stretch abajo"},
    ],
  },
  Jueves: {
    type:"PUSH", muscle:"Hombros · Core · Tríceps", emoji:"⚡", color:"#ec4899",
    tip:"Segundo push con foco en hombros redondeados y core. Los hombros y el core juntos definen la silueta femenina.",
    exercises:[
      {id:1,name:"HS Shoulder Uni F",     display:"HS Press Hombros Unilateral",      sets:"4 × 12 c/l",muscle:"Hombros",         video:"HS Shoulder Uni F",    note:"Sala HS — un lado cada vez, corrige asimetrías"},
      {id:2,name:"TG Cable Lateral F",    display:"TG Elevaciones Laterales Cable",   sets:"4 × 15-20", muscle:"Hombros",         video:"TG Cable Lateral F",   note:"Cable Station — tensión constante todo el rango"},
      {id:3,name:"TG Reverse Fly F",      display:"TG Pájaro / Deltoides Posterior",  sets:"3 × 15",    muscle:"Deltoides post.", video:"TG Reverse Fly F",     note:"Sala LIFT — codos ligeramente flexionados"},
      {id:4,name:"TG Ab Crunch F",        display:"TG Crunch Abdominal Máquina",      sets:"4 × 20",    muscle:"Core",            video:"TG Ab Crunch F",       note:"Sala LIFT — control total, sin tirar del cuello"},
      {id:5,name:"TG Leg Raise F",        display:"TG Elevaciones de Piernas",        sets:"3 × 15",    muscle:"Core/Abdomen",    video:"TG Leg Raise F",       note:"Sala LIFT — abdomen bajo"},
      {id:6,name:"TG Torso Rotation F",   display:"TG Rotaciones de Torso",           sets:"3 × 15 c/l",muscle:"Oblicuos",        video:"TG Torso Rotation F",  note:"Sala LIFT — oblicuos y talle"},
      {id:7,name:"TG Overhead Tricep F",  display:"TG Extensión Tríceps Sobre Cabeza",sets:"3 × 15",    muscle:"Tríceps",         video:"TG Overhead Tricep F", note:"Cable Station — cuerda, cabeza larga del tríceps"},
    ],
  },
  Viernes: {
    type:"FULL", muscle:"Glúteos · Espalda · Core", emoji:"🔥", color:"#f59e0b",
    tip:"Día completo — cierra la semana fuerte. Combina glúteos, espalda y core. El mejor día para notar el progreso.",
    exercises:[
      {id:1,name:"TG Leg Press Hi F",     display:"TG Prensa Piernas Pies Altos",     sets:"4 × 10",    muscle:"Glúteos/Isquios", video:"TG Leg Press Hi F",    note:"Sala LIFT — foco en glúteo, pies muy altos"},
      {id:2,name:"TG Seated Curl F",      display:"TG Curl Femoral Sentado",          sets:"3 × 12",    muscle:"Isquios/Glúteos", video:"TG Seated Curl F",     note:"Sala LIFT — complementa al tumbado"},
      {id:3,name:"HS Pulldown F",         display:"HS Pulldown Agarre Ancho",         sets:"4 × 12",    muscle:"Dorsal",          video:"HS Pulldown F",        note:"Sala HS — espalda en V"},
      {id:4,name:"HS Single Row F",       display:"HS Remo a Una Mano",               sets:"3 × 12 c/l",muscle:"Espalda",         video:"HS Single Row F",      note:"Sala HS — rango máximo"},
      {id:5,name:"TG Abduction2 F",       display:"TG Abducción Cadera (2º día)",     sets:"3 × 20",    muscle:"Glúteo medio",    video:"TG Abduction2 F",      note:"Sala LIFT — glúteo medio, doble estímulo"},
      {id:6,name:"TG Cable Curl2 F",      display:"TG Curl Bíceps Cable",             sets:"3 × 15",    muscle:"Bíceps",          video:"TG Cable Curl2 F",     note:"Cable Station — tensión en posición estirada"},
      {id:7,name:"TG Crunch2 F",          display:"TG Crunch + Rotación",             sets:"3 × 15+15", muscle:"Core",            video:"TG Crunch2 F",         note:"Sala LIFT — cierra la semana fuerte"},
    ],
  },
};

const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes"];
const todayKey = () => ({1:"Lunes",2:"Martes",3:"Miércoles",4:"Jueves",5:"Viernes"})[new Date().getDay()]||null;
const weekNum  = () => { const n=new Date(),s=new Date(n.getFullYear(),0,1); return Math.ceil(((n-s)/86400000+s.getDay()+1)/7); };
const sessionKey = (day) => "f5-"+day+"-"+new Date().getFullYear()+"-W"+weekNum();
const prevKey    = (day) => { const p=new Date(Date.now()-7*864e5); const s=new Date(p.getFullYear(),0,1); return "f5-"+day+"-"+p.getFullYear()+"-W"+Math.ceil(((p-s)/86400000+s.getDay()+1)/7); };
const parseNumSets = (s) => { const m=s.match(/^(\d+)/); return m?parseInt(m[1]):3; };

const ExerciseVideo = ({ videoKey, name, color }) => {
  const [open, setOpen] = useState(false);
  const videoId = VIDEOS[videoKey];
  if (!open) return (
    <button onClick={()=>setOpen(true)} style={{width:"100%",padding:"10px",borderRadius:10,border:"1px dashed "+color+"55",background:color+"08",color:color,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
      <span style={{fontSize:16}}>▶</span> Ver video del ejercicio
    </button>
  );
  return (
    <div style={{marginBottom:10,borderRadius:10,overflow:"hidden",position:"relative",background:"#000"}}>
      <div style={{position:"relative",paddingBottom:"56.25%",height:0}}>
        <iframe
          src={"https://www.youtube-nocookie.com/embed/"+videoId+"?autoplay=1&rel=0&modestbranding=1&playsinline=1"}
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={name}
        />
      </div>
      <button onClick={()=>setOpen(false)} style={{position:"absolute",top:6,right:6,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,0.7)",color:"#fff",border:"none",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    </div>
  );
};

export default function App() {
  const [selDay,    setSelDay]    = useState(todayKey()||"Lunes");
  const [sessions,  setSessions]  = useState({});
  const [history,   setHistory]   = useState([]);
  const [storageOk, setStorageOk] = useState(false);
  const [chat,      setChat]      = useState([{role:"assistant",text:"¡Hola! 👋 Tu rutina PPL está diseñada para el Aqua de Vilanova — Technogym LIFT + Hammer Strength. Toca cada ejercicio para ver el video y registrar el peso por serie. ¡Vamos a por ello!"}]);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [view,      setView]      = useState("routine");
  const [expanded,  setExpanded]  = useState(null);
  const [showProf,  setShowProf]  = useState(false);
  const [finishing, setFinishing] = useState(false);
  const chatEnd = useRef(null);

  useEffect(()=>{
    try{
      const s=localStorage.getItem("f5-sessions"); if(s) setSessions(JSON.parse(s));
      const h=localStorage.getItem("f5-history");  if(h) setHistory(JSON.parse(h));
    }catch(e){}
    setStorageOk(true);
  },[]);
  useEffect(()=>{ if(!storageOk) return; try{localStorage.setItem("f5-sessions",JSON.stringify(sessions));}catch(e){} },[sessions,storageOk]);
  useEffect(()=>{ if(!storageOk) return; try{localStorage.setItem("f5-history",JSON.stringify(history));}catch(e){} },[history,storageOk]);
  useEffect(()=>{ chatEnd.current?.scrollIntoView({behavior:"smooth"}) },[chat,loading]);

  const sk   = sessionKey(selDay);
  const pk   = prevKey(selDay);
  const cur  = sessions[sk]  || {};
  const prev = sessions[pk]  || {};

  const setEx = (exId,field,val) => setSessions(s=>({...s,[sk]:{...(s[sk]||{}),[exId]:{...(s[sk]?.[exId]||{}),[field]:val}}}));
  const setCardio = (field,val) => setSessions(s=>({...s,[sk]:{...(s[sk]||{}),cardio:{...(s[sk]?.cardio||{}),[field]:val}}}));
  const setSeriesW = (exId,i,val) => {
    const ex=ROUTINE[selDay].exercises.find(e=>e.id===exId);
    const n=ex?parseNumSets(ex.sets):3;
    const ps=cur[exId]?.sets||Array.from({length:n},()=>({}));
    setEx(exId,"sets",ps.map((s,idx)=>idx===i?{...s,weight:val}:s));
  };

  const dayComp = (day) => {
    const k=sessionKey(day); const exs=ROUTINE[day].exercises;
    const done=exs.filter(e=>sessions[k]?.[e.id]?.done).length;
    return{done,total:exs.length,pct:Math.round(done/exs.length*100)};
  };
  const wPct = () => {
    const all=DAYS.flatMap(d=>ROUTINE[d].exercises).length;
    const done=DAYS.flatMap(d=>ROUTINE[d].exercises.filter(e=>sessions[sessionKey(d)]?.[e.id]?.done)).length;
    return Math.round(done/all*100);
  };

  const finishWorkout = () => {
    setFinishing(true);
    const day=ROUTINE[selDay]; const{done,total}=dayComp(selDay);
    const now=new Date();
    const entry={
      date:now.toLocaleDateString("es-ES",{weekday:"short",day:"numeric",month:"short"}),
      time:now.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),
      day:selDay,type:day.type,done,total,
      cardioKm:cur.cardio?.km||null,cardioType:cur.cardio?.type||"elliptical",
      exercises:day.exercises.map(e=>{
        const s=cur[e.id]||{};
        return{name:e.display,done:s.done||false,sets:(s.sets||[]).filter(st=>st.weight).map(st=>st.weight+"kg"),rpe:s.rpe||null};
      })
    };
    setSessions(s=>({...s,[sk]:{...(s[sk]||{}),finished:true,finishedAt:now.toISOString()}}));
    setHistory(h=>[entry,...h.slice(0,49)]);
    setFinishing(false);
    setView("done");
  };

  const sendMsg = async () => {
    if(!input.trim()||loading) return;
    const msg=input.trim(); setInput(""); setLoading(true);
    setChat(p=>[...p,{role:"user",text:msg}]);
    const day=ROUTINE[selDay]; const{done,total}=dayComp(selDay);
    const exSum=day.exercises.map(e=>{
      const s=cur[e.id]||{}; const pv=prev[e.id];
      const wStr=(s.sets||[]).filter(st=>st.weight).map((st,i)=>"S"+(i+1)+":"+st.weight+"kg").join("/");
      const pwStr=pv?.sets?.[0]?.weight?"ant:"+pv.sets[0].weight+"kg":"";
      return e.display+":"+(s.done?"✓":"pendiente")+(wStr?" "+wStr:"")+(s.rpe?" RPE"+s.rpe:"")+(pwStr?" ("+pwStr+")":"");
    }).join(", ");
    const cd=cur.cardio||{};
    const sys="Entrenadora personal experta, española natural y cercana. PERFIL: mujer 34 años 60kg, objetivo completo (músculo+definición+forma), PPL 5 días. Gym: Aqua Sport Clubs Vilanova — sala LIFT Technogym + sala Hammer Strength. HOY "+selDay+" ("+day.type+"): "+done+"/"+total+" ejs. "+exSum+". Cardio: "+(cd.km?cd.km+"km":"pendiente")+". Responde 2-4 frases motivadoras, sin markdown.";
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_API_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[...chat.slice(1).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text})),{role:"user",content:msg}]})});
      const data=await res.json();
      setChat(p=>[...p,{role:"assistant",text:data.content?.find(b=>b.type==="text")?.text||"No pude responder."}]);
    }catch{setChat(p=>[...p,{role:"assistant",text:"Error de conexión."}]);}
    setLoading(false);
  };

  const today=todayKey(); const wp=wPct(); const dc=ROUTINE[selDay].color;
  const isFinished=!!cur.finished;

  const renderEx = (ex) => {
    const s=cur[ex.id]||{}; const pv=prev[ex.id]||{};
    const isExp=expanded===ex.id; const n=parseNumSets(ex.sets);
    const sets=s.sets||Array.from({length:n},()=>({}));
    const pvSets=pv.sets||[];
    const wBadge=sets.filter(st=>st.weight).map(st=>st.weight+"kg").join(" / ");
    const isTG=ex.name.startsWith("TG"); const isHS=ex.name.startsWith("HS");
    return(
      <div key={ex.id} style={{borderRadius:12,border:s.done?"1px solid rgba(74,222,128,0.2)":"1px solid #141414",background:s.done?"rgba(74,222,128,0.04)":"#0f0f0f",overflow:"hidden",transition:"all 0.2s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",cursor:"pointer"}} onClick={()=>setExpanded(isExp?null:ex.id)}>
          <div style={{fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:4,background:isTG?"#3b82f620":isHS?"#ec489920":"#333",color:isTG?"#3b82f6":isHS?"#ec4899":"#666",flexShrink:0,letterSpacing:0.5}}>{isTG?"TG":"HS"}</div>
          <button onClick={e=>{e.stopPropagation();setEx(ex.id,"done",!s.done)}} style={{width:20,height:20,borderRadius:5,flexShrink:0,border:s.done?"none":"2px solid #222",background:s.done?"#4ade80":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            {s.done&&<span style={{fontSize:11,color:"#000",fontWeight:900}}>✓</span>}
          </button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:600,color:s.done?"#4ade80":"#e0e0e0",textDecoration:s.done?"line-through":"none",lineHeight:1.3}}>{ex.display}</div>
            <div style={{display:"flex",gap:5,marginTop:2,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:10,color:dc,fontWeight:600}}>{ex.sets}</span>
              <span style={{fontSize:10,color:"#2a2a2a"}}>·</span>
              <span style={{fontSize:10,color:"#444"}}>{ex.muscle}</span>
              {wBadge&&<span style={{fontSize:10,color:"#ccc",background:"#1a1a1a",borderRadius:4,padding:"1px 5px"}}>{wBadge}</span>}
              {pvSets[0]?.weight&&<span style={{fontSize:10,color:"#555",background:"#111",borderRadius:4,padding:"1px 5px"}}>{"ant: "+pvSets[0].weight+"kg"}</span>}
            </div>
            {ex.note&&<div style={{fontSize:10,color:dc+"88",marginTop:2}}>{ex.note}</div>}
          </div>
          <div style={{fontSize:12,color:"#333",transition:"transform 0.2s",transform:isExp?"rotate(180deg)":"none"}}>▾</div>
        </div>
        {isExp&&(
          <div style={{padding:"0 13px 13px",borderTop:"1px solid #141414"}}>
            <div style={{paddingTop:10,display:"flex",flexDirection:"column",gap:10}}>
              <ExerciseVideo videoKey={ex.video} name={ex.display} color={dc}/>
              <div>
                <div style={{fontSize:10,color:"#555",letterSpacing:1,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>Peso por serie</div>
                {Array.from({length:n},(_,i)=>{
                  const sw=sets[i]?.weight||""; const pw=pvSets[i]?.weight||"";
                  const diff=(sw&&pw)?(parseFloat(sw)-parseFloat(pw)).toFixed(1):null;
                  return(
                    <div key={i} style={{marginBottom:9}}>
                      <div style={{fontSize:10,marginBottom:4,fontWeight:600,color:dc+"99"}}>
                        {"Serie "+(i+1)}{pw&&<span style={{color:"#444",fontWeight:400}}>{" · anterior: "+pw+"kg"}</span>}
                      </div>
                      <div style={{display:"flex",gap:5,alignItems:"center"}}>
                        <button onClick={()=>setSeriesW(ex.id,i,String(Math.max(0,(parseFloat(sw)||0)-1)))} style={{width:30,height:30,borderRadius:7,border:"1px solid #222",background:"#141414",color:"#888",fontSize:15,cursor:"pointer"}}>−</button>
                        <input type="number" value={sw} placeholder={pw||"0"} onChange={e=>setSeriesW(ex.id,i,e.target.value)} style={{flex:1,padding:"6px 8px",borderRadius:7,border:"1px solid "+(sw?dc+"66":"#1e1e1e"),background:"#111",color:"#fff",fontSize:15,fontWeight:700,textAlign:"center",outline:"none",fontFamily:"inherit"}}/>
                        <button onClick={()=>setSeriesW(ex.id,i,String((parseFloat(sw)||0)+1))} style={{width:30,height:30,borderRadius:7,border:"1px solid #222",background:"#141414",color:"#888",fontSize:15,cursor:"pointer"}}>+</button>
                        <span style={{fontSize:11,color:"#444",minWidth:16}}>kg</span>
                        {diff!==null&&<span style={{fontSize:10,fontWeight:700,minWidth:36,color:parseFloat(diff)>0?"#4ade80":parseFloat(diff)<0?"#f87171":"#888"}}>{parseFloat(diff)>0?"▲+"+diff:"▼"+diff}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div style={{fontSize:10,color:"#555",letterSpacing:1,textTransform:"uppercase",marginBottom:5,fontWeight:600}}>RPE (esfuerzo)</div>
                <div style={{display:"flex",gap:4}}>
                  {[6,7,8,9,10].map(r=>(
                    <button key={r} onClick={()=>setEx(ex.id,"rpe",String(r))} style={{flex:1,padding:"7px 4px",borderRadius:8,border:s.rpe===String(r)?"1px solid "+dc:"1px solid #1e1e1e",background:s.rpe===String(r)?dc+"22":"#141414",color:s.rpe===String(r)?dc:"#555",fontSize:13,fontWeight:700,cursor:"pointer"}}>{r}</button>
                  ))}
                </div>
              </div>
              <button onClick={()=>{setEx(ex.id,"done",!s.done);setExpanded(null)}} style={{padding:"9px",borderRadius:10,border:s.done?"1px solid rgba(74,222,128,0.3)":"none",background:s.done?"rgba(74,222,128,0.15)":"linear-gradient(135deg,"+dc+",#f97316)",color:s.done?"#4ade80":"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                {s.done?"✓ Completado — toca para desmarcar":"Marcar como completado"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:"#080808",fontFamily:"'DM Sans',sans-serif",color:"#f0f0f0",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet"/>

      <div style={{padding:"18px 20px 12px",borderBottom:"1px solid #141414",background:"#0a0a0a"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,letterSpacing:2,color:"#fff",lineHeight:1}}>PPL PLAN — ELLA</div>
            <div style={{fontSize:10,color:"#444",marginTop:3,letterSpacing:1.5,textTransform:"uppercase"}}>Aqua Vilanova · TG + HS · 34a · 60kg</div>
          </div>
          <button onClick={()=>setShowProf(!showProf)} style={{padding:"6px 10px",borderRadius:20,border:"1px solid #222",background:"transparent",color:"#555",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>👤</button>
        </div>
        {showProf&&(
          <div style={{marginTop:10,padding:"12px 14px",borderRadius:10,background:"#111",border:"1px solid #1e1e1e",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["Edad","34 años"],["Peso","60 kg"],["Objetivo","Músculo + definición"],["Gym","Aqua — LIFT + HS"]].map(([k,v])=>(
              <div key={k}><div style={{fontSize:9,color:"#444",letterSpacing:1,textTransform:"uppercase"}}>{k}</div><div style={{fontSize:12,fontWeight:600,color:"#e0e0e0",marginTop:1}}>{v}</div></div>
            ))}
          </div>
        )}
        <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1,height:3,background:"#141414",borderRadius:2}}>
            <div style={{height:"100%",width:wp+"%",background:"linear-gradient(90deg,"+dc+",#f97316)",borderRadius:2,transition:"width 0.4s"}}/>
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:800,color:wp===100?"#4ade80":dc}}>{wp}%</div>
        </div>
      </div>

      <div style={{padding:"10px 20px 0",display:"flex",gap:5,overflowX:"auto",scrollbarWidth:"none",background:"#0a0a0a"}}>
        {DAYS.map(day=>{
          const{pct,done,total}=dayComp(day); const sel=selDay===day; const r=ROUTINE[day];
          const fin=!!sessions[sessionKey(day)]?.finished;
          return(
            <button key={day} onClick={()=>{setSelDay(day);setView("routine")}} style={{flex:"0 0 auto",padding:"7px 10px",borderRadius:10,border:sel?"1px solid "+r.color:"1px solid #161616",background:sel?r.color+"18":"#0f0f0f",cursor:"pointer",minWidth:64,transition:"all 0.2s"}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:1,color:sel?r.color:"#333",textTransform:"uppercase"}}>{day.substring(0,3)}{today===day&&<span style={{color:"#4ade80",marginLeft:2}}>•</span>}</div>
              <div style={{fontSize:8,fontWeight:700,marginTop:1,color:sel?r.color+"99":"#2a2a2a"}}>{r.type}</div>
              <div style={{fontSize:9,marginTop:2,color:fin?"#4ade80":sel?r.color:"#2a2a2a"}}>{fin?"✓ FIN":done+"/"+total}</div>
            </button>
          );
        })}
      </div>

      <div style={{display:"flex",padding:"10px 20px 0",gap:4,background:"#0a0a0a"}}>
        {[["routine","📋 Rutina"],["chat","💬 Chat"],["history","📈 Historial"]].map(([v,label])=>(
          <button key={v} onClick={()=>setView(v)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",background:view===v?dc:"#131313",color:view===v?"#fff":"#444",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{label}</button>
        ))}
      </div>

      <div style={{flex:1,padding:"14px 20px 24px",overflow:"auto"}}>

        {view==="done"&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,gap:16,textAlign:"center"}}>
            <div style={{fontSize:64}}>🏆</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:900,color:"#4ade80"}}>¡ENTRENO FINALIZADO!</div>
            <div style={{fontSize:14,color:"#666"}}>{selDay} guardado en el historial</div>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button onClick={()=>setView("routine")} style={{padding:"10px 20px",borderRadius:12,border:"1px solid #222",background:"#111",color:"#888",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Ver rutina</button>
              <button onClick={()=>setView("history")} style={{padding:"10px 20px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+dc+",#f97316)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Ver historial</button>
            </div>
          </div>
        )}

        {view==="routine"&&(()=>{
          const day=ROUTINE[selDay]; const{done,total,pct}=dayComp(selDay);
          const cd=cur.cardio||{}; const ct=cd.type||"elliptical"; const ci=CARDIO_F[ct];
          return(
            <div>
              <div style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,fontWeight:800,letterSpacing:3,padding:"2px 9px",borderRadius:20,background:day.color+"22",color:day.color,border:"1px solid "+day.color+"44"}}>{day.type}</span>
                  {isFinished&&<span style={{fontSize:10,color:"#4ade80",fontWeight:700}}>✅ FINALIZADO</span>}
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:"#fff",marginTop:5,lineHeight:1.1}}>{day.emoji+" "+selDay.toUpperCase()}</div>
                <div style={{fontSize:12,color:"#555",marginTop:1}}>{day.muscle}</div>
                <div style={{marginTop:8,padding:"8px 11px",borderRadius:8,background:"#0f0f0f",border:"1px solid "+day.color+"22",fontSize:11,color:"#666"}}>{"💡 "+day.tip}</div>
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <span style={{fontSize:10,color:"#3b82f6",background:"#3b82f620",padding:"2px 8px",borderRadius:4,fontWeight:700}}>TG = Sala LIFT Technogym</span>
                  <span style={{fontSize:10,color:"#ec4899",background:"#ec489920",padding:"2px 8px",borderRadius:4,fontWeight:700}}>HS = Sala Hammer Strength</span>
                </div>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {day.exercises.map(ex=>renderEx(ex))}

                <div style={{borderRadius:12,border:"1px solid #1e1e1e",background:"#0c0c0c",padding:"12px 13px",marginTop:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <div onClick={()=>setCardio("done",!cd.done)} style={{width:20,height:20,borderRadius:5,background:cd.done?"#4ade80":"transparent",border:cd.done?"none":"2px solid #222",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                      {cd.done&&<span style={{fontSize:11,color:"#000",fontWeight:900}}>✓</span>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700,color:cd.done?"#4ade80":"#e0e0e0"}}>🏃 Cardio final — 10 min</div>
                      <div style={{fontSize:10,color:"#555",marginTop:1}}>{"Mínimo: "}<span style={{color:dc,fontWeight:600}}>{ci.min+"km"}</span></div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,marginBottom:8}}>
                    {[["elliptical","Elíptica 🔄"],["treadmill","Cinta 🏃"]].map(([t,l])=>(
                      <button key={t} onClick={()=>setCardio("type",t)} style={{flex:1,padding:"6px",borderRadius:8,border:ct===t?"1px solid "+dc:"1px solid #1e1e1e",background:ct===t?dc+"18":"#141414",color:ct===t?dc:"#555",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
                    ))}
                  </div>
                  <div style={{fontSize:10,color:"#555",marginBottom:8,fontStyle:"italic",lineHeight:1.4}}>{ci.tip}</div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <button onClick={()=>setCardio("km",String(Math.max(0,((parseFloat(cd.km)||0)-0.1).toFixed(1))))} style={{width:30,height:30,borderRadius:7,border:"1px solid #222",background:"#141414",color:"#888",fontSize:15,cursor:"pointer"}}>−</button>
                    <input type="number" step="0.1" value={cd.km||""} placeholder={String(ci.min)} onChange={e=>setCardio("km",e.target.value)} style={{flex:1,padding:"6px 8px",borderRadius:7,border:"1px solid "+dc+"44",background:"#111",color:"#fff",fontSize:15,fontWeight:700,textAlign:"center",outline:"none",fontFamily:"inherit"}}/>
                    <button onClick={()=>setCardio("km",String(((parseFloat(cd.km)||0)+0.1).toFixed(1)))} style={{width:30,height:30,borderRadius:7,border:"1px solid #222",background:"#141414",color:"#888",fontSize:15,cursor:"pointer"}}>+</button>
                    <span style={{fontSize:12,color:"#555"}}>km</span>
                  </div>
                  {cd.km&&parseFloat(cd.km)<ci.min&&<div style={{marginTop:6,fontSize:10,color:"#f87171",textAlign:"center"}}>{"⚠️ Mínimo: "+ci.min+"km"}</div>}
                  {cd.km&&parseFloat(cd.km)>=ci.min&&<div style={{marginTop:6,fontSize:10,color:"#4ade80",textAlign:"center"}}>✓ Cardio cumplido</div>}
                </div>
              </div>

              {!isFinished?(
                <button onClick={finishWorkout} disabled={finishing} style={{marginTop:16,width:"100%",padding:"15px",borderRadius:12,border:"none",background:finishing?"#1a1a1a":"linear-gradient(135deg,#4ade80,#22c55e)",color:finishing?"#555":"#000",fontSize:15,fontWeight:800,cursor:finishing?"default":"pointer",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:2}}>
                  {finishing?"GUARDANDO...":"🏁 FINALIZAR ENTRENO"}
                </button>
              ):(
                <div style={{marginTop:16,padding:"14px",borderRadius:12,background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.3)",textAlign:"center",fontSize:13,color:"#4ade80",fontWeight:600}}>✅ Entreno finalizado y guardado</div>
              )}
              <button onClick={()=>setView("chat")} style={{marginTop:8,width:"100%",padding:"12px",borderRadius:12,border:"1px solid #1e1e1e",background:"transparent",color:"#666",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>💬 Hablar con mi entrenadora</button>
            </div>
          );
        })()}

        {view==="chat"&&(
          <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 270px)"}}>
            <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,paddingBottom:8}}>
              {chat.map((msg,i)=>(
                <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:7}}>
                  {msg.role==="assistant"&&<div style={{width:26,height:26,borderRadius:"50%",background:dc+"22",border:"1px solid "+dc+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>🌟</div>}
                  <div style={{maxWidth:"80%",padding:"9px 13px",borderRadius:msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:msg.role==="user"?"linear-gradient(135deg,"+dc+",#f97316)":"#111",border:msg.role==="assistant"?"1px solid #1a1a1a":"none",fontSize:12,lineHeight:1.65,color:"#f0f0f0",whiteSpace:"pre-wrap"}}>{msg.text}</div>
                </div>
              ))}
              {loading&&(<div style={{display:"flex",alignItems:"flex-end",gap:7}}><div style={{width:26,height:26,borderRadius:"50%",background:dc+"22",border:"1px solid "+dc+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🌟</div><div style={{display:"flex",gap:4,padding:"9px 13px",background:"#111",borderRadius:"16px 16px 16px 4px",border:"1px solid #1a1a1a"}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:dc,animation:"pulse 1.2s "+i*0.2+"s infinite"}}/>)}</div></div>)}
              <div ref={chatEnd}/>
            </div>
            <div style={{display:"flex",gap:7,paddingTop:10,borderTop:"1px solid #141414"}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="¿Cómo va el entreno?" style={{flex:1,padding:"10px 13px",borderRadius:12,border:"1px solid #1a1a1a",background:"#0f0f0f",color:"#f0f0f0",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
              <button onClick={sendMsg} disabled={loading} style={{padding:"10px 15px",borderRadius:12,border:"none",background:loading?"#141414":"linear-gradient(135deg,"+dc+",#f97316)",color:"#fff",fontSize:14,cursor:loading?"default":"pointer"}}>➤</button>
            </div>
          </div>
        )}

        {view==="history"&&(
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,letterSpacing:2,color:"#fff",marginBottom:4}}>📈 HISTORIAL DE ENTRENOS</div>
            <div style={{fontSize:11,color:"#555",marginBottom:14}}>Últimas sesiones finalizadas · Aqua Vilanova</div>
            {history.length===0?(
              <div style={{padding:"40px 20px",textAlign:"center",color:"#333",fontSize:13}}>Aún no hay entrenos. Pulsa "Finalizar entreno" al acabar tu primera sesión.</div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {history.map((entry,i)=>{
                  const r=ROUTINE[entry.day]||{color:"#666",emoji:"💪"};
                  return(
                    <div key={i} style={{padding:"13px 14px",borderRadius:12,border:"1px solid #1a1a1a",background:"#0f0f0f"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:"#e0e0e0"}}>{r.emoji+" "+entry.day} <span style={{fontSize:10,color:r.color,background:r.color+"22",padding:"1px 7px",borderRadius:10,marginLeft:4}}>{entry.type}</span></div>
                          <div style={{fontSize:11,color:"#444",marginTop:2}}>{entry.date+" · "+entry.time}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,color:"#4ade80"}}>{entry.done+"/"+entry.total}</div>
                          <div style={{fontSize:9,color:"#444"}}>ejercicios</div>
                        </div>
                      </div>
                      {entry.cardioKm&&<div style={{fontSize:11,color:"#555",marginBottom:6}}>{"🏃 "+(entry.cardioType==="treadmill"?"Cinta":"Elíptica")+": "+entry.cardioKm+"km"}</div>}
                      <div style={{display:"flex",flexDirection:"column",gap:3}}>
                        {entry.exercises.filter(e=>e.done||e.sets.length>0).map((e,j)=>(
                          <div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                            <span style={{color:"#555",flex:1,marginRight:8}}>{e.name}</span>
                            <span style={{color:"#666",flexShrink:0}}>{e.sets.join(" / ")||"—"}{e.rpe?" RPE"+e.rpe:""}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{"@keyframes pulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}*{box-sizing:border-box}::-webkit-scrollbar{display:none}input::placeholder{color:#333}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}"}</style>
    </div>
  );
}
