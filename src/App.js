// import { useState, useEffect, useRef } from "react";

// const API = "http://localhost:3001/api";
// const C = {
//   bg:"#f4f5f7",surface:"#ffffff",border:"#e2e4e9",muted:"#9ba3af",
//   text:"#111827",sub:"#6b7280",faint:"#d1d5db",
//   green:"#16a34a",greenBg:"#f0fdf4",greenBorder:"#bbf7d0",
//   red:"#dc2626",redBg:"#fef2f2",redBorder:"#fecaca",
//   blue:"#2563eb",blueBg:"#eff6ff",blueBorder:"#bfdbfe",
//   amber:"#d97706",amberBg:"#fffbeb",amberBorder:"#fde68a",
//   purple:"#7c3aed",purpleBg:"#f5f3ff",purpleBorder:"#ddd6fe",
//   teal:"#0d9488",tealBg:"#f0fdfa",tealBorder:"#99f6e4",
//   orange:"#ea580c",orangeBg:"#fff7ed",orangeBorder:"#fed7aa",
// };

// // ======================= ADMIN GATE =======================
// function AdminGate({ onAuthenticate, apiUrl }) {
//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [loginInput, setLoginInput] = useState("");
//   const [pinInput, setPinInput] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newAdmin, setNewAdmin] = useState({ name: "", login: "", pin: "", role: "Manager" });

//   useEffect(() => {
//     fetch(`${apiUrl}/admin/profiles`)
//       .then(res => res.json())
//       .then(data => {
//         setProfiles(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [apiUrl]);

//   const handleLogin = async () => {
//     if (!selectedProfile) { setError("Select a profile first"); return; }
//     if (loginInput !== selectedProfile.login) { setError("Login doesn't match selected profile"); return; }
//     if (!pinInput) { setError("Enter your PIN"); return; }
//     const res = await fetch(`${apiUrl}/admin/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ login: loginInput, pin: pinInput })
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("ct_admin_session", JSON.stringify({ ...data, expires: Date.now() + 8 * 60 * 60 * 1000 }));
//       onAuthenticate(data);
//     } else {
//       setError(data.error || "Invalid login or PIN");
//     }
//   };

//   const addNewAdmin = async () => {
//     if (!newAdmin.name || !newAdmin.login || !newAdmin.pin) { setError("Name, login, and PIN required"); return; }
//     const res = await fetch(`${apiUrl}/admin/profiles`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newAdmin)
//     });
//     if (res.ok) {
//       const updated = await fetch(`${apiUrl}/admin/profiles`).then(r => r.json());
//       setProfiles(updated);
//       setShowAddForm(false);
//       setNewAdmin({ name: "", login: "", pin: "", role: "Manager" });
//       setError("");
//     } else {
//       const err = await res.json();
//       setError(err.error || "Failed to add profile");
//     }
//   };

//   if (loading) return <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.8rem", color: C.muted }}>Loading...</div></div>;

//   return (
//     <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", overflowY: "auto" }}>
//       <div style={{ background: C.surface, borderRadius: 20, border: `1.5px solid ${C.border}`, maxWidth: 450, width: "100%", padding: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
//         <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
//           <div style={{ width: 50, height: 50, borderRadius: 12, background: C.blue, margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.5rem" }}>CT</span></div>
//           <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.6rem", letterSpacing: "0.08em", color: C.text }}>CONTROL TOWER</div>
//           <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginTop: 4 }}>TEN1 · AUTHORIZED ACCESS ONLY</div>
//         </div>
//         {error && <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "0.6rem", marginBottom: "1rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.red, textAlign: "center" }}>{error}</div>}
//         <div style={{ marginBottom: "1rem" }}>
//           <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 6 }}>SELECT YOUR PROFILE</div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//             {profiles.map(p => (
//               <button key={p.id} onClick={() => { setSelectedProfile(p); setLoginInput(p.login); setPinInput(""); setError(""); }}
//                 style={{ background: selectedProfile?.id === p.id ? C.blueBg : C.bg, border: `1.5px solid ${selectedProfile?.id === p.id ? C.blueBorder : C.border}`, borderRadius: 10, padding: "0.75rem", cursor: "pointer", textAlign: "left", transition: "all 0.12s" }}>
//                 <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", fontWeight: 600, color: C.text }}>{p.name}</div>
//                 <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.55rem", color: C.muted }}>{p.role} · @{p.login}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//         {selectedProfile && (
//           <>
//             <div style={{ marginBottom: "1rem" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 6 }}>LOGIN</div><input value={loginInput} onChange={e => setLoginInput(e.target.value)} style={{ width: "100%", padding: "0.65rem", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", background: "#f9fafb" }} placeholder="Enter your login" /></div>
//             <div style={{ marginBottom: "1.5rem" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 6 }}>PIN</div><input type="password" value={pinInput} onChange={e => setPinInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "0.65rem", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", background: "#f9fafb" }} placeholder="Enter your PIN" /></div>
//             <button onClick={handleLogin} style={{ width: "100%", padding: "0.85rem", background: C.blue, border: "none", borderRadius: 10, fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", fontWeight: 600, color: "#fff", cursor: "pointer" }}>ACCESS CONTROL TOWER →</button>
//           </>
//         )}
//         <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}><button onClick={() => setShowAddForm(!showAddForm)} style={{ background: "none", border: "none", color: C.blue, fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", cursor: "pointer" }}>{showAddForm ? "− Cancel" : "+ First Time? Add Admin Profile"}</button></div>
//         {showAddForm && (
//           <div style={{ marginTop: "1rem", padding: "1rem", background: C.bg, borderRadius: 10 }}>
//             <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 8 }}>NEW ADMIN PROFILE</div>
//             <input value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} placeholder="Full Name" style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }} />
//             <input value={newAdmin.login} onChange={e => setNewAdmin({...newAdmin, login: e.target.value})} placeholder="Login" style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }} />
//             <input type="password" value={newAdmin.pin} onChange={e => setNewAdmin({...newAdmin, pin: e.target.value})} placeholder="PIN" style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }} />
//             <select value={newAdmin.role} onChange={e => setNewAdmin({...newAdmin, role: e.target.value})} style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }}>
//               <option value="Manager">Manager</option><option value="Admin PA">Admin PA</option><option value="Area Manager">Area Manager</option><option value="Sr. Manager">Sr. Manager</option>
//             </select>
//             <button onClick={addNewAdmin} style={{ width: "100%", padding: "0.5rem", background: C.green, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Add Profile</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ======================= ROLE DEFINITIONS =======================
// const INDIRECT_ROLES = new Set(["Waterspider","Downstacker","Unloader","Upstacker","Cage Builder"]);
// const DIRECT_ROLES   = new Set(["CRETS Processing","WHD Processing","Refurb Processing","Tech Grading","Problem Solve","Super Solver"]);
// const OUTBOUND_INDIRECT = new Set(["Waterspider","Cage Builder","Step 2 Processor - Liquidation","Step 2 Processor - Sellable","Step 2 Processor - Donation/Destroy"]);
// const OUTBOUND_DIRECT   = new Set(["Pick Driver","Stow Driver","Rebin Processing","Pack Processing","Problem Solve","Super Solver","Step 1 Processor - Liquidation","Step 1 Processor - Sellable","Step 1 Processor - Donation/Destroy"]);

// const PATH_PRIORITY = {
//   "Unloader":10,"Downstacker":10,"Upstacker":9,"Waterspider":9,"Cage Builder":8,
//   "Problem Solve":8,"Super Solver":7,
//   "CRETS Processing":7,"WHD Processing":6,"Refurb Processing":6,"Tech Grading":5,
//   "Pick Driver":8,"Stow Driver":7,"Rebin Processing":7,"Pack Processing":6,
//   "Step 1 Processor - Liquidation":7,"Step 1 Processor - Sellable":7,"Step 1 Processor - Donation/Destroy":7,
//   "Step 2 Processor - Liquidation":6,"Step 2 Processor - Sellable":6,"Step 2 Processor - Donation/Destroy":6,
// };

// const INBOUND_INDIRECT_LIST  = ["Unloader","Downstacker","Upstacker","Waterspider","Cage Builder"];
// const INBOUND_DIRECT_LIST    = ["Problem Solve","Super Solver","CRETS Processing","WHD Processing","Refurb Processing","Tech Grading"];
// const OUTBOUND_INDIRECT_LIST = ["Waterspider","Cage Builder","Step 2 Processor - Liquidation","Step 2 Processor - Sellable","Step 2 Processor - Donation/Destroy"];
// const OUTBOUND_DIRECT_LIST   = ["Pick Driver","Stow Driver","Rebin Processing","Pack Processing","Problem Solve","Super Solver","Step 1 Processor - Liquidation","Step 1 Processor - Sellable","Step 1 Processor - Donation/Destroy"];

// const ALL_INBOUND_PATHS  = [...INBOUND_INDIRECT_LIST,...INBOUND_DIRECT_LIST];
// const ALL_OUTBOUND_PATHS = [...OUTBOUND_INDIRECT_LIST,...OUTBOUND_DIRECT_LIST];

// const getCanonicalRole = (pathName) => {
//   if (!pathName) return "";
//   const u = pathName.toUpperCase();
//   if (u.includes("CRETS")) return "CRETS Processing";
//   if (u.includes("WHD")) return "WHD Processing";
//   if (u.includes("REFURB")) return "Refurb Processing";
//   if (u.includes("TECH")) return "Tech Grading";
//   if (u.includes("PROBLEM SOLVE")) return "Problem Solve";
//   if (u.includes("SUPER SOLVER")) return "Super Solver";
//   if (u.includes("WATERSPIDER")) return "Waterspider";
//   if (u.includes("DOWNSTACKER")) return "Downstacker";
//   if (u.includes("UNLOADER")) return "Unloader";
//   if (u.includes("UPSTACKER")) return "Upstacker";
//   if (u.includes("CAGE")) return "Cage Builder";
//   if (u.includes("PICK")) return "Pick Driver";
//   if (u.includes("STOW")) return "Stow Driver";
//   if (u.includes("REBIN")) return "Rebin Processing";
//   if (u.includes("PACK")) return "Pack Processing";
//   if (u.includes("LIQUIDATION") && u.includes("STEP 1")) return "Step 1 Processor - Liquidation";
//   if (u.includes("LIQUIDATION") && u.includes("STEP 2")) return "Step 2 Processor - Liquidation";
//   if (u.includes("SELLABLE") && u.includes("STEP 1")) return "Step 1 Processor - Sellable";
//   if (u.includes("SELLABLE") && u.includes("STEP 2")) return "Step 2 Processor - Sellable";
//   if (u.includes("DONATION") && u.includes("STEP 1")) return "Step 1 Processor - Donation/Destroy";
//   if (u.includes("DONATION") && u.includes("STEP 2")) return "Step 2 Processor - Donation/Destroy";
//   return pathName;
// };

// const isInd    = p => INDIRECT_ROLES.has(getCanonicalRole(p))||OUTBOUND_INDIRECT.has(getCanonicalRole(p));
// const isDirect = p => DIRECT_ROLES.has(getCanonicalRole(p))||OUTBOUND_DIRECT.has(getCanonicalRole(p));

// function getDisplayRoleName(pathName, dept) {
//   const isIndirect = isInd(pathName);
//   if (!isIndirect) return pathName;
//   const prefix = dept === "INBOUND" ? "IB " : "OB ";
//   return prefix + pathName;
// }

// // ======================= FLOOR STRUCTURE =======================
// function buildFloor(){
//   const paths=[],lines=[],stations=[];
//   let lid=1,sid=1;
//   function addPath(pid,name,rt,dept,nLines,stPerSide){
//     paths.push({id:pid,name,role_type:rt,department:dept,active:true,display_order:pid*100, priority: PATH_PRIORITY[name] || 50});
//     for(let li=1;li<=nLines;li++){
//       const lId=lid++;
//       lines.push({id:lId,path_id:pid,name:`Line ${li}`,active:true});
//       for(let s=1;s<=stPerSide;s++) stations.push({id:sid++,line_id:lId,path_id:pid,name:`${li}-${s*2-1}`,side:"ODD",station_number:s*2-1,active:true});
//       for(let s=1;s<=stPerSide;s++) stations.push({id:sid++,line_id:lId,path_id:pid,name:`${li}-${s*2}`,side:"EVEN",station_number:s*2,active:true});
//     }
//   }
//   addPath(1,"CRETS Processing","DIRECT","INBOUND",8,8);
//   addPath(2,"CRETS High Side","DIRECT","INBOUND",2,10);
//   addPath(3,"WHD Processing","DIRECT","INBOUND",4,8);
//   addPath(4,"Refurb Processing","DIRECT","INBOUND",3,8);
//   addPath(5,"Tech Grading","DIRECT","INBOUND",2,8);
//   addPath(6,"Problem Solve","DIRECT","INBOUND",1,5);
//   addPath(7,"Super Solver","DIRECT","INBOUND",1,5);
//   addPath(8,"Waterspider","INDIRECT","INBOUND",1,6);
//   addPath(9,"Downstacker","INDIRECT","INBOUND",1,8);
//   addPath(10,"Unloader","INDIRECT","INBOUND",1,8);
//   addPath(11,"Upstacker","INDIRECT","INBOUND",1,6);
//   addPath(12,"Cage Builder","INDIRECT","INBOUND",1,4);
//   addPath(13,"Pick Driver","DIRECT","OUTBOUND",6,8);
//   addPath(14,"Stow Driver","DIRECT","OUTBOUND",4,8);
//   addPath(15,"Rebin Processing","DIRECT","OUTBOUND",3,8);
//   addPath(16,"Pack Processing","DIRECT","OUTBOUND",4,8);
//   addPath(17,"Problem Solve","DIRECT","OUTBOUND",1,5);
//   addPath(18,"Super Solver","DIRECT","OUTBOUND",1,5);
//   addPath(19,"Step 1 Processor - Liquidation","DIRECT","OUTBOUND",2,8);
//   addPath(20,"Step 2 Processor - Liquidation","INDIRECT","OUTBOUND",2,8);
//   addPath(21,"Step 1 Processor - Sellable","DIRECT","OUTBOUND",2,8);
//   addPath(22,"Step 2 Processor - Sellable","INDIRECT","OUTBOUND",2,8);
//   addPath(23,"Step 1 Processor - Donation/Destroy","DIRECT","OUTBOUND",2,8);
//   addPath(24,"Step 2 Processor - Donation/Destroy","INDIRECT","OUTBOUND",2,8);
//   addPath(25,"Waterspider","INDIRECT","OUTBOUND",1,6);
//   addPath(26,"Cage Builder","INDIRECT","OUTBOUND",1,4);
//   return {paths,lines,stations};
// }
// const INIT = buildFloor();

// // ======================= GLOBAL STATE =======================
// let contextStations = {};
// let contextBadges   = {};
// let floorPaths    = INIT.paths.map(p=>({...p}));
// let floorLines    = INIT.lines.map(l=>({...l}));
// let floorStations = INIT.stations.map(s=>({...s}));
// let shiftAssignments = {};
// let weekHistory = {};
// let assignHistory = [];
// let pathRenames = {};
// let preStaffData = {};

// let shiftFloorConfig = {};
// function getShiftConfig(shiftCode) {
//   if (!shiftFloorConfig[shiftCode]) {
//     shiftFloorConfig[shiftCode] = { paths: {}, lines: {}, stations: {}, customPaths: [], customLines: [], customStations: [] };
//   }
//   return shiftFloorConfig[shiftCode];
// }
// function resetShiftConfig(shiftCode) { delete shiftFloorConfig[shiftCode]; }

// // Mock associates (initial fallback – will be replaced by backend data)
// let mockAssocs = [
//   {badge:"101181",login:"moberete",name:"Mory Berete",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:5},{path_name:"Waterspider",lc_level:3},{path_name:"Problem Solve",lc_level:3}],
//    weekHours:[{path_name:"CRETS Processing",hours:28.5}],yesterdayRoles:[{path_name:"CRETS Processing",hours:9.5}]},
//   {badge:"172099",login:"mroblero",name:"Manuel Roblero",shift_code:"BHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"WHD Processing",lc_level:5},{path_name:"Tech Grading",lc_level:4},{path_name:"CRETS Processing",lc_level:3},{path_name:"Waterspider",lc_level:3}],
//    weekHours:[{path_name:"WHD Processing",hours:24}],yesterdayRoles:[{path_name:"WHD Processing",hours:8}]},
//   {badge:"700000",login:"alexin",name:"Alex Inbound",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"Problem Solve",lc_level:5},{path_name:"CRETS Processing",lc_level:4},{path_name:"Downstacker",lc_level:3},{path_name:"Unloader",lc_level:3}],
//    weekHours:[{path_name:"CRETS Processing",hours:10}],yesterdayRoles:[{path_name:"CRETS Processing",hours:10}]},
//   {badge:"105011",login:"pblakeld",name:"Patricia Blake",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:4},{path_name:"Refurb Processing",lc_level:5},{path_name:"Problem Solve",lc_level:3}],
//    weekHours:[{path_name:"CRETS Processing",hours:15},{path_name:"Refurb Processing",hours:13.5}],yesterdayRoles:[{path_name:"CRETS Processing",hours:5}]},
//   {badge:"239804",login:"jcclaire",name:"Justin Claire",shift_code:"FHN",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:5},{path_name:"Downstacker",lc_level:3}],
//    weekHours:[{path_name:"CRETS Processing",hours:27}],yesterdayRoles:[{path_name:"CRETS Processing",hours:9}]},
//   {badge:"347020",login:"diha",name:"Donna Iha",shift_code:"BHN",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"Upstacker",lc_level:4},{path_name:"Unloader",lc_level:3},{path_name:"CRETS Processing",lc_level:2}],
//    weekHours:[{path_name:"Upstacker",hours:20}],yesterdayRoles:[{path_name:"Upstacker",hours:5}]},
//   {badge:"115361",login:"nickomil",name:"Nick Miller",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:4},{path_name:"Downstacker",lc_level:3},{path_name:"Cage Builder",lc_level:2}],
//    weekHours:[{path_name:"CRETS Processing",hours:30}],yesterdayRoles:[{path_name:"CRETS Processing",hours:10}]},
//   {badge:"11762283",login:"warrema",name:"Matthew Warren",shift_code:"BHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"Refurb Processing",lc_level:5},{path_name:"WHD Processing",lc_level:4},{path_name:"Unloader",lc_level:3}],
//    weekHours:[{path_name:"Refurb Processing",hours:22.5}],yesterdayRoles:[{path_name:"Refurb Processing",hours:7.5}]},
//   {badge:"12880163",login:"willefc",name:"Clifford Willeford",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:5},{path_name:"Waterspider",lc_level:3}],
//    weekHours:[{path_name:"CRETS Processing",hours:29}],yesterdayRoles:[{path_name:"CRETS Processing",hours:9.5}]},
//   {badge:"11353448",login:"jenwheel",name:"Jeni Wheeler",shift_code:"BHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"Tech Grading",lc_level:5},{path_name:"Refurb Processing",lc_level:4},{path_name:"CRETS Processing",lc_level:3}],
//    weekHours:[{path_name:"Tech Grading",hours:27}],yesterdayRoles:[{path_name:"Tech Grading",hours:9}]},
//   {badge:"11873356",login:"dhunroha",name:"Rohan Dhungana",shift_code:"FHN",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:4},{path_name:"Downstacker",lc_level:3},{path_name:"Waterspider",lc_level:3}],
//    weekHours:[{path_name:"Downstacker",hours:15},{path_name:"Waterspider",hours:10}],yesterdayRoles:[{path_name:"Waterspider",hours:5}]},
//   {badge:"500001",login:"alexonly",name:"Alex Unloader",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"Unloader",lc_level:3}],weekHours:[],yesterdayRoles:[]},
//   {badge:"500002",login:"noperms",name:"Sam NoPerms",shift_code:"BHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[],weekHours:[],yesterdayRoles:[]},
//   {badge:"500003",login:"lowlc",name:"Casey LowLC",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:1},{path_name:"WHD Processing",lc_level:1},{path_name:"Downstacker",lc_level:1}],
//    weekHours:[],yesterdayRoles:[]},
//   {badge:"600001",login:"outpick1",name:"Dana Picker",shift_code:"FHD",operation_mode:"OUTBOUND",default_dept:"OUTBOUND",
//    permissions:[{path_name:"Pick Driver",lc_level:5},{path_name:"Stow Driver",lc_level:4}],
//    weekHours:[{path_name:"Pick Driver",hours:25}],yesterdayRoles:[{path_name:"Pick Driver",hours:9}]},
//   {badge:"600002",login:"outstow1",name:"Jordan Stower",shift_code:"BHD",operation_mode:"OUTBOUND",default_dept:"OUTBOUND",
//    permissions:[{path_name:"Stow Driver",lc_level:5},{path_name:"Rebin Processing",lc_level:4}],
//    weekHours:[{path_name:"Stow Driver",hours:22}],yesterdayRoles:[{path_name:"Stow Driver",hours:8}]},
//   {badge:"600003",login:"outpack1",name:"Riley Packer",shift_code:"FHN",operation_mode:"OUTBOUND",default_dept:"OUTBOUND",
//    permissions:[{path_name:"Pack Processing",lc_level:5},{path_name:"Rebin Processing",lc_level:3}],
//    weekHours:[{path_name:"Pack Processing",hours:20}],yesterdayRoles:[{path_name:"Pack Processing",hours:8}]},
//   {badge:"600004",login:"outrebin1",name:"Morgan Rebin",shift_code:"BHN",operation_mode:"OUTBOUND",default_dept:"OUTBOUND",
//    permissions:[{path_name:"Rebin Processing",lc_level:5},{path_name:"Pack Processing",lc_level:4}],
//    weekHours:[{path_name:"Rebin Processing",hours:18}],yesterdayRoles:[{path_name:"Rebin Processing",hours:7}]},
//   {badge:"600005",login:"outreplen",name:"Taylor Replen",shift_code:"FHD",operation_mode:"OUTBOUND",default_dept:"OUTBOUND",
//    permissions:[{path_name:"Waterspider",lc_level:4}],weekHours:[],yesterdayRoles:[]},
//   {badge:"700001",login:"flexstar1",name:"Alex Flex",shift_code:"FHD",operation_mode:"BOTH",default_dept:"INBOUND",
//    permissions:[{path_name:"CRETS Processing",lc_level:4},{path_name:"Pick Driver",lc_level:4},{path_name:"Waterspider",lc_level:3}],
//    weekHours:[{path_name:"CRETS Processing",hours:12},{path_name:"Pick Driver",hours:12}],yesterdayRoles:[{path_name:"Pick Driver",hours:8}]},
//   {badge:"700002",login:"flexstar2",name:"Blake Flex",shift_code:"BHD",operation_mode:"BOTH",default_dept:"OUTBOUND",
//    permissions:[{path_name:"WHD Processing",lc_level:5},{path_name:"Stow Driver",lc_level:4},{path_name:"Downstacker",lc_level:3}],
//    weekHours:[{path_name:"WHD Processing",hours:16},{path_name:"Stow Driver",hours:8}],yesterdayRoles:[{path_name:"WHD Processing",hours:8}]},
// ];

// weekHistory["11873356"] = [
//   {date:"2026-04-07",pathName:"Downstacker",roleType:"INDIRECT",half:"half1",dept:"INBOUND",shiftType:"DAY"},
//   {date:"2026-04-08",pathName:"Waterspider",roleType:"INDIRECT",half:"half1",dept:"INBOUND",shiftType:"DAY"},
//   {date:"2026-04-09",pathName:"Downstacker",roleType:"INDIRECT",half:"half1",dept:"INBOUND",shiftType:"DAY"},
// ];

// // ======================= HELPER FUNCTIONS =======================
// function consec3Indirect(badge, dept){
//   const h=(weekHistory[badge]||[]).filter(x=>!dept||x.dept===dept||!x.dept);
//   return h.length>=3&&h.slice(-3).every(x=>x.roleType==="INDIRECT");
// }
// function getWeekStart(){
//   const d = new Date();
//   d.setHours(0,0,0,0);
//   d.setDate(d.getDate() - 14); // BIWEEKLY (14 days)
//   return d;
// }
// function pruneOldHistory(){
//   const cutoff=getWeekStart();
//   Object.keys(weekHistory).forEach(badge=>{
//     weekHistory[badge]=(weekHistory[badge]||[]).filter(e=>{
//       try{return new Date(e.date)>=cutoff;}catch{return true;}
//     });
//   });
// }
// function scoreOnePath(assoc,pathName,dept){
//   const canon = getCanonicalRole(pathName);
//   const perm=assoc.permissions.find(p=>getCanonicalRole(p.path_name)===canon);
//   if(!perm) return null;
//   if(isInd(pathName)&&consec3Indirect(assoc.badge,dept)) return null;
//   const deptHistory=(weekHistory[assoc.badge]||[]).filter(x=>!dept||x.dept===dept||!x.dept);
//   const yd=(assoc.yesterdayRoles||[]).find(r=>getCanonicalRole(r.path_name)===canon)?.hours||0;
//   const wk=(assoc.weekHours||[]).find(r=>getCanonicalRole(r.path_name)===canon)?.hours||0;
//   const tot=Math.max(1,(assoc.weekHours||[]).reduce((s,r)=>s+r.hours,0));
//   const sh=wk/tot;
//   const weekCount=deptHistory.filter(e=>getCanonicalRole(e.pathName)===canon).length;
//   const totalWeekAssign=Math.max(1,deptHistory.length);
//   const histShare=weekCount/totalWeekAssign;
//   const prPts = PATH_PRIORITY[canon]||5;
//   const ydPts = yd>0 ? -Math.min(15,Math.round(yd*1.8)) : 4;
//   const wkPts = Math.round(Math.max(0,(0.5-sh)*6));
//   const rotPts = Math.round(Math.max(0,(0.4-histShare)*5));
//   const lcPts = +(perm.lc_level*0.8).toFixed(1);
//   const bPts = Math.min(1,(assoc.permissions||[]).length*0.1);
//   const total = Math.max(0, prPts+ydPts+wkPts+rotPts+lcPts+bPts);
//   return {
//     score:+total.toFixed(1),
//     lc:perm.lc_level,
//     roleType:isInd(pathName)?"INDIRECT":"DIRECT",
//     rotationHours:10,
//     breakdown:[
//       {factor:"Path Priority",pts:prPts,detail:`${prPts}/10 — ${pathName}`},
//       {factor:"Yesterday",pts:ydPts,detail:yd>0?`${yd.toFixed(1)}h yesterday`:"Not here yesterday (+2)"},
//       {factor:"Biweekly Hours",pts:wkPts,detail:`${wk.toFixed(1)}h/${tot.toFixed(1)}h = ${Math.round(sh*100)}% this 14 days`},
//       {factor:"Fair Rotation",pts:rotPts,detail:`${weekCount}/${totalWeekAssign} assignments this 14 days on this path`},
//       {factor:"LC Level",pts:lcPts,detail:`L${perm.lc_level}/5 — ${["","Beginner","Learning","Developing","Proficient","Expert"][perm.lc_level]}`},
//       {factor:"Breadth",pts:bPts,detail:`${(assoc.permissions||[]).length} qualified paths`},
//     ],
//   };
// }
// function getHalf(staffDate, shiftCode, dept){
//   const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
//   const now=new Date();
//   const ds=dateStr;
//   if(ds!==new Date().toISOString().split("T")[0]) return "half1";
//   if(shiftCode && dept) return getHalfByShift(staffDate, shiftCode, dept);
//   return now.getHours()<12?"half1":"half2";
// }
// function shiftKey(dept,dateStr,shiftType){
//   return `${dept}|${dateStr}|${shiftType}`;
// }
// async function api(ep,opts={}){try{const r=await fetch(API+ep,{headers:{"Content-Type":"application/json"},...opts});if(!r.ok)throw new Error();return r.json();}catch{return null;}}
// const fmtTime=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});
// const fmtDate=(d)=>{try{return(d instanceof Date?d:new Date(d)).toLocaleDateString("en-US",{weekday:"short",month:"numeric",day:"numeric",year:"numeric"});}catch{return"";}};
// const LC_COLOR=l=>l>=5?"#16a34a":l>=4?"#15803d":l>=3?"#ca8a04":l>=2?"#ea580c":"#dc2626";
// const LC_LABEL=l=>["–","Beginner","Learning","Developing","Proficient","Expert"][l]||"–";
// const LC_BG=l=>l>=4?C.greenBg:l>=3?C.amberBg:C.redBg;
// const LC_BORDER=l=>l>=4?C.greenBorder:l>=3?C.amberBorder:C.redBorder;

// // SHIFT TIMES
// const SHIFT_TIMES = {
//   FHD: { INBOUND:  {h:7,  m:0,  endH:17, endM:30, days:[0,1,2,3]},
//           OUTBOUND: {h:7,  m:15, endH:17, endM:45, days:[0,1,2,3]} },
//   FHN: { INBOUND:  {h:18, m:30, endH:5,  endM:0,  days:[0,1,2,3]},
//           OUTBOUND: {h:18, m:45, endH:5,  endM:15, days:[0,1,2,3]} },
//   BHD: { INBOUND:  {h:7,  m:0,  endH:17, endM:30, days:[3,4,5,6]},
//           OUTBOUND: {h:7,  m:15, endH:17, endM:45, days:[3,4,5,6]} },
//   BHN: { INBOUND:  {h:18, m:30, endH:5,  endM:0,  days:[3,4,5,6]},
//           OUTBOUND: {h:18, m:45, endH:5,  endM:15, days:[3,4,5,6]} },
// };
// function getShiftTimes(shiftCode, dept){ return SHIFT_TIMES[shiftCode]?.[dept] || SHIFT_TIMES[shiftCode]?.INBOUND || null; }
// function shiftDurationHours(shiftCode, dept){
//   const t = getShiftTimes(shiftCode, dept);
//   if(!t) return 10;
//   const startMins = t.h*60 + t.m;
//   let endMins = t.endH*60 + t.endM;
//   if(endMins <= startMins) endMins += 24*60;
//   return (endMins - startMins) / 60;
// }
// function shiftStartDate(dateStr, shiftCode, dept){
//   const t = getShiftTimes(shiftCode, dept);
//   if(!t) return null;
//   const d = new Date(dateStr + "T00:00:00");
//   d.setHours(t.h, t.m, 0, 0);
//   return d;
// }
// function shiftEndDate(dateStr, shiftCode, dept){
//   const t = getShiftTimes(shiftCode, dept);
//   if(!t) return null;
//   const d = new Date(dateStr + "T00:00:00");
//   d.setHours(t.endH, t.endM, 0, 0);
//   const startMins = t.h*60 + t.m;
//   const endMins   = t.endH*60 + t.endM;
//   if(endMins <= startMins) d.setDate(d.getDate() + 1);
//   return d;
// }
// function getHalfByShift(staffDate, shiftCode, dept){
//   const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
//   const now = new Date();
//   const start = shiftStartDate(dateStr, shiftCode, dept);
//   const end   = shiftEndDate(dateStr, shiftCode, dept);
//   if(!start || !end) return "half1";
//   const mid = new Date((start.getTime() + end.getTime()) / 2);
//   return now >= mid ? "half2" : "half1";
// }
// // No auto-detect function used anymore

// // Context helpers
// const getContextKey = (date, shift, dept) => {
//   const dateStr = date instanceof Date ? date.toISOString().split("T")[0] : date;
//   return `${dateStr}|${shift}|${dept}`;
// };
// const getStationAssignment = (contextKey, stationId) => contextStations[contextKey]?.[stationId];
// const getBadgeAssignment = (contextKey, badge) => contextBadges[contextKey]?.[badge];
// const setStationAssignment = (contextKey, stationId, assignment) => {
//   if (!contextStations[contextKey]) contextStations[contextKey] = {};
//   contextStations[contextKey][stationId] = assignment;
// };
// const setBadgeAssignment = (contextKey, badge, stationId) => {
//   if (!contextBadges[contextKey]) contextBadges[contextKey] = {};
//   contextBadges[contextKey][badge] = stationId;
// };
// const clearContextAssignments = (contextKey) => {
//   delete contextStations[contextKey];
//   delete contextBadges[contextKey];
// };

// function openStForPath(pathId, dept, dateStr, shiftType, usePreStaff = false, preStaffShiftOverride = null){
//   const effectiveShift = (usePreStaff && preStaffShiftOverride) ? preStaffShiftOverride : shiftType;
//   const ctx = `${dateStr}|${effectiveShift}|${dept}`;
//   const path = floorPaths.find(p => p.id === pathId && p.active !== false);
//   if (!path) return null;
//   let pathActive = true;
//   if (usePreStaff && preStaffShiftOverride) {
//     const cfg = getShiftConfig(preStaffShiftOverride);
//     if (cfg.paths[pathId] !== undefined) pathActive = cfg.paths[pathId];
//   } else {
//     pathActive = path.active !== false;
//   }
//   if (!pathActive) return null;
//   const lineIds = floorLines.filter(l => l.path_id === pathId).map(l => l.id);
//   if (!lineIds.length) return null;
//   const cands = floorStations.filter(s => {
//     if (!lineIds.includes(s.line_id)) return false;
//     if (s.active === false) return false;
//     let stationActive = true;
//     if (usePreStaff && preStaffShiftOverride) {
//       const cfg = getShiftConfig(preStaffShiftOverride);
//       if (cfg.stations[s.id] !== undefined) stationActive = cfg.stations[s.id];
//     } else {
//       stationActive = s.active !== false;
//     }
//     if (!stationActive) return false;
//     const occupied = usePreStaff ? (preStaffData[`${dept}|${dateStr}|${effectiveShift}`]?.[s.id]) : getStationAssignment(ctx, s.id);
//     return !occupied;
//   });
//   if (!cands.length) return null;
//   const pick = cands[0];
//   return {...pick, line_name: floorLines.find(l => l.id === pick.line_id)?.name || ""};
// }
// const isValidFloorStation = (stationId) => {
//   return floorStations.some(s => s.id === stationId && s.active !== false);
// };

// // ========== runScanWithLaborShare ==========
// function runScanWithLaborShare(badge, staffDate, shiftType, laborShareEnabled, laborShareCount, crossDeptUsage, getCrossDeptUsed, incrementCrossDept, contextKey) {
//   pruneOldHistory();
//   const assoc = mockAssocs.find(a => a.badge === badge || a.login === badge.toLowerCase());
//   if (!assoc) return null;

//   let targetDept = assoc.operation_mode === "BOTH" ? (assoc.default_dept || "INBOUND") : assoc.operation_mode;
//   let isCrossDept = false;

//   if (assoc.operation_mode === "BOTH" && laborShareEnabled) {
//     const defaultDept = assoc.default_dept || "INBOUND";
//     const otherDept = defaultDept === "INBOUND" ? "OUTBOUND" : "INBOUND";
//     const used = getCrossDeptUsed(contextKey);
//     if (laborShareCount === 0 || used < laborShareCount) {
//       const hasOtherDeptPerm = (assoc.permissions || []).some(p => {
//         const path = floorPaths.find(fp => fp.name === p.path_name);
//         return path && path.department === otherDept;
//       });
//       if (hasOtherDeptPerm) {
//         targetDept = otherDept;
//         isCrossDept = true;
//       } else {
//         targetDept = defaultDept;
//       }
//     } else {
//       targetDept = defaultDept;
//     }
//   }

//   const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
//   const half = getHalf(staffDate, shiftType, targetDept);
//   const sKey = shiftKey(targetDept, dateStr, shiftType);
//   const ctx = `${dateStr}|${shiftType}|${targetDept}`;

//   if (shiftAssignments[sKey]?.[assoc.badge]) {
//     const ex = shiftAssignments[sKey][assoc.badge];
//     const hd = ex[half] || ex.half1;
//     return { associate: assoc, path: hd.path, station: hd.station, score: hd.score, lc: hd.lc,
//       roleType: hd.roleType, rotationHours: hd.rotationHours, breakdown: hd.breakdown || [],
//       allScores: hd.allScores || [], method: "RECALL", isRecall: true, half,
//       half1: ex.half1, half2: ex.half2, consec3: consec3Indirect(assoc.badge, targetDept), dept: targetDept, assignedDept: targetDept };
//   }

//   const scored = floorPaths
//     .filter(fp => fp.department === targetDept && fp.active !== false)
//     .map(fp => {
//       const s = scoreOnePath(assoc, fp.name, targetDept);
//       if (!s) return null;
//       const openSt = openStForPath(fp.id, targetDept, dateStr, shiftType);
//       if (!openSt) return null;
//       return { path: fp.name, ...s, pathObj: fp };
//     })
//     .filter(Boolean)
//     .sort((a, b) => b.score - a.score);

//   if (!scored.length) {
//     const hasAnyPerm = assoc.permissions.length > 0;
//     const reason = hasAnyPerm
//       ? `All floor map stations for your qualified ${targetDept} paths are full or unavailable. See Admin.`
//       : "No permissions — go to Permissions tab to add qualifications.";
//     return { associate: assoc, path: "SEE ADMIN", station: null, score: 0, lc: 0, breakdown: [], allScores: [], reason, method: "AUTO", isRecall: false, half, dept: targetDept, assignedDept: targetDept };
//   }

//   const chosen = scored[0];
//   const chosenSt = openStForPath(chosen.pathObj.id, targetDept, dateStr, shiftType);
//   if (!chosenSt) {
//     return { associate: assoc, path: "SEE ADMIN", station: null, score: 0, lc: 0, breakdown: [], allScores: [],
//       reason: `No open floor map stations available for ${chosen.path}. See Admin.`, method: "AUTO", isRecall: false, half, dept: targetDept, assignedDept: targetDept };
//   }

//   const prevSid = getBadgeAssignment(ctx, assoc.badge);
//   if (prevSid) {
//     if (contextStations[ctx]) delete contextStations[ctx][prevSid];
//   }
//   setStationAssignment(ctx, chosenSt.id, {
//     login: assoc.login, name: assoc.name, badge: assoc.badge,
//     path: chosen.path, roleType: chosen.roleType,
//     assignedAt: Date.now(), method: "SCAN", dept: targetDept, half: "half1"
//   });
//   setBadgeAssignment(ctx, assoc.badge, chosenSt.id);

//   if (!weekHistory[assoc.badge]) weekHistory[assoc.badge] = [];
//   weekHistory[assoc.badge].push({ date: dateStr, pathName: chosen.path, roleType: chosen.roleType, half: "half1", dept: targetDept, shiftType });

//   let h2Path = null, h2St = null, h2SeeAdmin = false, h2AdminReason = "";
//   if (chosen.roleType === "INDIRECT") {
//     const directOptions = scored.filter(s => s.roleType === "DIRECT");
//     if (directOptions.length > 0) {
//       for (const opt of directOptions) {
//         const st2 = openStForPath(opt.pathObj.id, targetDept, dateStr, shiftType);
//         if (st2) { h2Path = opt; h2St = st2; break; }
//       }
//     }
//     if (!h2St) {
//       h2SeeAdmin = true;
//       h2AdminReason = `${chosen.path} is capped at 5hr (INDIRECT). No direct-role floor map stations available for 2nd half.`;
//     }
//   } else {
//     const otherRoles = scored.filter(s => getCanonicalRole(s.path) !== getCanonicalRole(chosen.path));
//     if (otherRoles.length > 0) {
//       for (const opt of otherRoles) {
//         const st2 = openStForPath(opt.pathObj.id, targetDept, dateStr, shiftType);
//         if (st2) { h2Path = opt; h2St = st2; break; }
//       }
//     }
//     if (!h2St) {
//       const otherPaths = scored.filter(s => s.path !== chosen.path);
//       for (const opt of otherPaths) {
//         const st2 = openStForPath(opt.pathObj.id, targetDept, dateStr, shiftType);
//         if (st2) { h2Path = opt; h2St = st2; break; }
//       }
//     }
//     if (!h2St) {
//       h2Path = chosen; h2St = chosenSt;
//     }
//   }

//   const h1 = {
//     path: chosen.path, station: chosenSt, score: chosen.score, lc: chosen.lc,
//     roleType: chosen.roleType, rotationHours: chosen.rotationHours,
//     breakdown: chosen.breakdown,
//     allScores: scored.filter(s => s.path !== chosen.path).slice(0, 3).map(s => ({ path: s.path, score: s.score, type: s.roleType })),
//   };
//   const h2 = h2SeeAdmin
//     ? { path: "SEE ADMIN", station: null, score: 0, lc: 0, roleType: null, rotationHours: 0, breakdown: [], allScores: [], seeAdminReason: h2AdminReason }
//     : { path: h2Path.path, station: h2St, score: h2Path.score, lc: h2Path.lc,
//         roleType: h2Path.roleType, rotationHours: h2Path.rotationHours, breakdown: [], allScores: [] };

//   if (!shiftAssignments[sKey]) shiftAssignments[sKey] = {};
//   shiftAssignments[sKey][assoc.badge] = { date: dateStr, half1: h1, half2: h2, dept: targetDept, shiftType };
//   if (!h2SeeAdmin) {
//     weekHistory[assoc.badge].push({ date: dateStr, pathName: h2Path.path, roleType: h2Path.roleType, half: "half2", dept: targetDept, shiftType });
//   }
//   assignHistory.push({
//     badge: assoc.badge, login: assoc.login, name: assoc.name,
//     path: chosen.path, station: chosenSt.name, roleType: chosen.roleType, score: chosen.score,
//     method: "SCAN", assignedAt: Date.now(), staffDate: dateStr, shiftType, dept: targetDept, half: "half1",
//     half2Path: h2Path?.path, half2Station: h2St?.name || null, half2RoleType: h2Path?.roleType,
//   });

//   if (isCrossDept) incrementCrossDept(contextKey);

//   return {
//     associate: assoc, path: chosen.path, station: chosenSt, score: chosen.score, lc: chosen.lc,
//     roleType: chosen.roleType, rotationHours: chosen.rotationHours, breakdown: chosen.breakdown,
//     allScores: scored.filter(s => s.path !== chosen.path).slice(0, 3).map(s => ({ path: s.path, score: s.score, type: s.roleType })),
//     method: "AUTO", isRecall: false, half, half1: h1, half2: h2,
//     consec3: consec3Indirect(assoc.badge, targetDept), dept: targetDept, assignedDept: targetDept,
//   };
// }

// // ======================= UI COMPONENTS =======================
// const Bdg=({children,color=C.green,bg=C.greenBg,border=C.greenBorder,style={}})=>(<span style={{background:bg,border:`1px solid ${border}`,borderRadius:5,padding:"2px 7px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color,fontWeight:600,...style}}>{children}</span>);
// const Btn=({children,onClick,variant="default",size="sm",disabled=false,style={}})=>{
//   const v={default:{background:C.surface,border:`1.5px solid ${C.border}`,color:C.text},primary:{background:C.green,border:`1.5px solid ${C.green}`,color:"#fff"},danger:{background:C.red,border:`1.5px solid ${C.red}`,color:"#fff"},ghost:{background:"transparent",border:"none",color:C.sub},amber:{background:C.amber,border:`1.5px solid ${C.amber}`,color:"#fff"},purple:{background:C.purple,border:`1.5px solid ${C.purple}`,color:"#fff"}}[variant]||{background:C.surface,border:`1.5px solid ${C.border}`,color:C.text};
//   const s={sm:{padding:"5px 12px",fontSize:"0.65rem"},md:{padding:"8px 16px",fontSize:"0.72rem"},lg:{padding:"11px 22px",fontSize:"0.8rem"}}[size];
//   return <button onClick={onClick} disabled={disabled} style={{...v,...s,borderRadius:8,fontFamily:"'DM Mono',monospace",fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,letterSpacing:"0.06em",transition:"all 0.12s",...style}}>{children}</button>;
// };
// const Modal=({open,onClose,title,children,width=480})=>{
//   if(!open) return null;
//   return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}} onClick={onClose}><div style={{background:C.surface,borderRadius:16,border:`1.5px solid ${C.border}`,width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.25rem 1.5rem",borderBottom:`1px solid ${C.border}`}}><div style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:C.text,fontSize:"0.85rem"}}>{title}</div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:"1.2rem",lineHeight:1}}>×</button></div><div style={{padding:"1.5rem"}}>{children}</div></div></div>);
// };
// const Field=({label,req,children})=><div style={{marginBottom:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted,letterSpacing:"0.15em",marginBottom:5}}>{label}{req&&<span style={{color:C.red}}> *</span>}</div>{children}</div>;
// const Inp=({value,onChange,placeholder,type="text",style={}})=><input value={value} onChange={onChange} placeholder={placeholder} type={type} style={{width:"100%",padding:"0.65rem 0.9rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,outline:"none",boxSizing:"border-box",background:"#f9fafb",...style}}/>;
// const Sel=({value,onChange,children,style={}})=><select value={value} onChange={onChange} style={{width:"100%",padding:"0.65rem 0.9rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,outline:"none",background:"#f9fafb",...style}}>{children}</select>;
// const ScoreBar=({score,max=20})=>{const p=Math.min(100,Math.round(score/max*100));const col=p>=70?C.green:p>=40?C.amber:C.red;return<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:C.bg,borderRadius:4,height:6,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:col,borderRadius:4,transition:"width 0.4s"}}/></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:col,fontWeight:700,width:32,textAlign:"right"}}>{score}/10</div></div>;};

// function DeptToggle({dept,setDept}){
//   return(
//     <div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
//       {[{v:"INBOUND",icon:"📥",c:C.blue,bg:C.blueBg},{v:"OUTBOUND",icon:"📤",c:C.orange,bg:C.orangeBg}].map(d=>(
//         <button key={d.v} onClick={()=>setDept(d.v)}
//           style={{padding:"5px 13px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,
//             border:"none",cursor:"pointer",
//             background:dept===d.v?d.c:"transparent",
//             color:dept===d.v?"#fff":C.muted,transition:"all 0.15s"}}>
//           {d.icon} {d.v}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ======================= KIOSK =======================
// function Kiosk({ onAssign, shiftType, staffDate, laborShareEnabled, laborShareCount, crossDeptUsage, incrementCrossDept, getCrossDeptUsed }) {
//   const [cur, setCur] = useState(null);
//   const [inputVal, setInputVal] = useState("");
//   const [cd, setCd] = useState(30);
//   const inputRef = useRef(null);
//   const resetT = useRef(null);
//   const cdT = useRef(null);
//   const cdRef = useRef(30);
//   useEffect(() => { inputRef.current?.focus(); }, []);
//   useEffect(() => () => { clearTimeout(resetT.current); clearInterval(cdT.current); }, []);

//   function showResult(res) {
//     clearTimeout(resetT.current); clearInterval(cdT.current);
//     cdRef.current = 30; setCd(30);
//     setCur({ result: res, id: Date.now() });
//     cdT.current = setInterval(() => {
//       cdRef.current--; setCd(cdRef.current);
//       if (cdRef.current <= 0) clearInterval(cdT.current);
//     }, 1000);
//     resetT.current = setTimeout(() => { setCur(null); setCd(30); inputRef.current?.focus(); }, 30000);
//   }

//   async function handleScan(badge) {
//     if (!badge.trim()) return;
//     setInputVal("");
//     setTimeout(() => inputRef.current?.focus(), 20);
//     const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
//     const contextKey = `live|${dateStr}|${shiftType}`;
//     let res = await api("/scan", {
//       method: "POST",
//       body: JSON.stringify({ badge: badge.trim(), shiftType, staffDate: dateStr, laborShareEnabled, laborShareCount })
//     });
//     if (!res) {
//       res = runScanWithLaborShare(badge.trim(), staffDate, shiftType, laborShareEnabled, laborShareCount, crossDeptUsage, getCrossDeptUsed, incrementCrossDept, contextKey);
//     }
//     if (!res) { showResult({ notFound: true, badge: badge.trim() }); return; }
//     onAssign({ ...res, timestamp: new Date() });
//     showResult(res);
//   }

//   const r = cur?.result;
//   const gm = r && (!r.station || r.path === "SEE ADMIN");
//   const deptColor = r?.assignedDept === "OUTBOUND" ? C.orange : C.blue;
//   const deptBg = r?.assignedDept === "OUTBOUND" ? C.orangeBg : C.blueBg;
//   const deptBorder = r?.assignedDept === "OUTBOUND" ? C.orangeBorder : C.blueBorder;

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 104px)", padding: "1.5rem 1rem" }}>
//       <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
//         <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "2.6rem", letterSpacing: "0.1em", color: C.text, lineHeight: 1 }}>CONTROL TOWER</div>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
//           <div style={{ height: 1, width: 24, background: C.faint }} />
//           <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", color: C.muted }}>AUTO-STAFFING · TEN1</span>
//           <div style={{ height: 1, width: 24, background: C.faint }} />
//         </div>
//         <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 7, flexWrap: "wrap" }}>
//           <Bdg color={shiftType === "DAY" ? C.amber : C.purple} bg={shiftType === "DAY" ? C.amberBg : C.purpleBg} border={shiftType === "DAY" ? C.amberBorder : C.purpleBorder}>{shiftType === "DAY" ? "☀ DAY SHIFT" : "🌙 NIGHT SHIFT"}</Bdg>
//           <Bdg color={C.teal} bg={C.tealBg} border={C.tealBorder}>{fmtDate(staffDate)}</Bdg>
//         </div>
//       </div>
//       <div style={{ width: "100%", maxWidth: 420 }}>
//         <div style={{ background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
//           <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: C.muted, letterSpacing: "0.12em", marginBottom: 8, textAlign: "center" }}>🔖 SCAN BADGE OR ENTER ID</div>
//           <input ref={inputRef} value={inputVal} onChange={e => setInputVal(e.target.value.replace(/\s/g, ""))} onKeyDown={e => e.key === "Enter" && handleScan(inputVal)} placeholder="Badge number..." autoFocus
//             style={{ width: "100%", padding: "0.85rem 1rem", border: `1.5px solid ${C.border}`, borderRadius: 10, fontFamily: "'DM Mono',monospace", fontSize: "1.4rem", color: C.text, outline: "none", boxSizing: "border-box", textAlign: "center", letterSpacing: "0.12em", background: "#f9fafb" }} />
//           <div style={{ textAlign: "center", marginTop: 8, fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.faint }}>
//             Inbound: 101181 · 172099 · 105011 · 115361 · 500001 &nbsp;&nbsp; Outbound: 600001 · 600002 · 600003 · 600004 · 600005
//           </div>
//         </div>
//         {r && !r.notFound && (
//           <div key={cur.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${gm ? C.redBorder : C.greenBorder}`, padding: "1.25rem", boxShadow: "0 6px 24px rgba(0,0,0,0.07)", animation: "fadein 0.15s ease" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
//               <div style={{ flex: 1, background: C.bg, borderRadius: 4, height: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${cd / 30 * 100}%`, background: gm ? C.red : C.green, borderRadius: 4, transition: "width 1s linear" }} /></div>
//               <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.muted }}>{cd}s</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${C.bg}` }}>
//               <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.greenBg, border: `2px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontWeight: 700, color: C.green, fontSize: "1rem", flexShrink: 0 }}>{r.associate.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.4rem", color: C.text, letterSpacing: "0.06em", lineHeight: 1 }}>Hi {r.associate.name.split(" ")[0]}!</div>
//                 <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: C.muted, marginTop: 2 }}>{r.associate.login} · {r.associate.shift_code} · {r.associate.operation_mode}</div>
//               </div>
//               {r.isRecall && <Bdg color={C.teal} bg={C.tealBg} border={C.tealBorder}>RECALLED</Bdg>}
//             </div>
//             {gm ? (
//               <div style={{ background: C.redBg, border: `1.5px solid ${C.redBorder}`, borderRadius: 12, padding: "1.1rem", textAlign: "center" }}>
//                 <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>⚠️</div>
//                 <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.red, letterSpacing: "0.15em", marginBottom: 6 }}>SEE ADMIN</div>
//                 <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: C.text, lineHeight: 1.5 }}>{r.reason || "Admin will assign you manually."}</div>
//               </div>
//             ) : (
//               <>
//                 <div style={{ background: C.greenBg, border: `1.5px solid ${C.greenBorder}`, borderRadius: 12, padding: "1rem", marginBottom: "0.7rem" }}>
//                   <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.green, letterSpacing: "0.18em", marginBottom: 4 }}>{r.isRecall ? "YOUR SHIFT ASSIGNMENT:" : "1ST HALF ASSIGNMENT:"}</div>
//                   <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.8rem", color: C.text, letterSpacing: "0.05em", lineHeight: 1 }}>{getDisplayRoleName(r.half1?.path || r.path, r.assignedDept)}</div>
//                   {r.station?.line_name && <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: C.sub, marginTop: 2 }}>{r.station.line_name}</div>}
//                   <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "1.1rem", color: "#374151", marginTop: 3, fontWeight: 600 }}>Station {r.station?.name}</div>
//                   <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
//                     <Bdg color={LC_COLOR(r.lc)}>LC {r.lc}/5 · {LC_LABEL(r.lc)}</Bdg>
//                     <Bdg color={r.roleType === "INDIRECT" ? C.purple : C.blue} bg={r.roleType === "INDIRECT" ? C.purpleBg : C.blueBg} border={r.roleType === "INDIRECT" ? C.purpleBorder : C.blueBorder}>{r.roleType} · {r.rotationHours}hr cap</Bdg>
//                     <Bdg color={C.sub} bg={C.bg} border={C.border}>Score {r.score}/10</Bdg>
//                   </div>
//                 </div>
//                 {r.half2 && (r.half2.path === "SEE ADMIN" ? (
//                   <div style={{ background: C.amberBg, border: `1.5px solid ${C.amberBorder}`, borderRadius: 12, padding: "0.85rem", marginBottom: "0.7rem" }}>
//                     <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.amber, letterSpacing: "0.18em", marginBottom: 4 }}>2ND HALF (AFTER BREAK):</div>
//                     <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.85rem", color: C.amber, fontWeight: 700, marginBottom: 4 }}>⚠ SEE ADMIN</div>
//                     <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: C.text }}>{r.half2.seeAdminReason}</div>
//                   </div>
//                 ) : (
//                   <div style={{ background: r.half2.path === r.path ? C.tealBg : C.blueBg, border: `1.5px solid ${r.half2.path === r.path ? C.tealBorder : C.blueBorder}`, borderRadius: 12, padding: "0.85rem", marginBottom: "0.7rem" }}>
//                     <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: r.half2.path === r.path ? C.teal : C.blue, letterSpacing: "0.18em", marginBottom: 4 }}>2ND HALF (AFTER BREAK):</div>
//                     <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.5rem", color: C.text, letterSpacing: "0.05em", lineHeight: 1 }}>{getDisplayRoleName(r.half2.path, r.assignedDept)}</div>
//                     <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.95rem", color: "#374151", marginTop: 2, fontWeight: 600 }}>Station {r.half2.station?.name || r.station?.name}</div>
//                     <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
//                       <Bdg color={r.half2.roleType === "INDIRECT" ? C.purple : C.blue} bg={r.half2.roleType === "INDIRECT" ? C.purpleBg : C.blueBg} border={r.half2.roleType === "INDIRECT" ? C.purpleBorder : C.blueBorder}>{r.half2.roleType} · {r.half2.rotationHours}hr cap</Bdg>
//                     </div>
//                   </div>
//                 ))}
//                 {r.consec3 && <div style={{ background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 8, padding: "5px 9px", marginBottom: "0.6rem", fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.amber }}>⚠ 3 consecutive INDIRECT days — Admin may want to review</div>}
//                 {!r.isRecall && r.breakdown?.length > 0 && (
//                   <div style={{ marginBottom: "0.6rem" }}>
//                     <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.faint, letterSpacing: "0.15em", marginBottom: 5 }}>SCORE BREAKDOWN</div>
//                     <ScoreBar score={r.score} />
//                     <div style={{ marginTop: 7, display: "flex", flexDirection: "column", gap: 3 }}>
//                       {r.breakdown.map((b, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.sub, flex: 1 }}>{b.factor}: {b.detail}</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", fontWeight: 700, color: b.pts >= 0 ? C.green : C.red, flexShrink: 0 }}>{b.pts >= 0 ? "+" : ""}{b.pts}</span></div>)}
//                     </div>
//                   </div>
//                 )}
//                 {r.allScores?.length > 0 && !r.isRecall && <div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.faint, letterSpacing: "0.15em", marginBottom: 4 }}>ALTERNATES</div><div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{r.allScores.map((s, i) => <span key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 5, padding: "2px 7px", fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.muted }}>{getDisplayRoleName(s.path, r.assignedDept)} ({s.score})</span>)}</div></div>
//              }</>
//             )}
//             <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: C.green, fontWeight: 600, marginTop: "0.75rem" }}>Let's Make History 🏆</div>
//           </div>
//         )}
//         {r?.notFound && (
//           <div key={cur?.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.redBorder}`, padding: "1.5rem", textAlign: "center", animation: "fadein 0.15s ease" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}><div style={{ flex: 1, background: C.bg, borderRadius: 4, height: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${cd / 10 * 100}%`, background: C.red, borderRadius: 4, transition: "width 1s linear" }} /></div><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.muted }}>{cd}s</span></div>
//             <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>⚠️</div>
//             <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", color: C.red, letterSpacing: "0.12em", marginBottom: 5 }}>BADGE NOT FOUND</div>
//             <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.muted }}>"{r.badge}" — See Admin</div>
//           </div>
//         )}
//         {!cur && <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: "2.5rem 2rem", textAlign: "center", opacity: 0.6 }}><div style={{ fontSize: "1.5rem", marginBottom: 8 }}>🔖</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", color: C.muted, letterSpacing: "0.1em" }}>Waiting for scan...</div></div>}
//       </div>
//     </div>
//   );
// }

// // ======================= DASHBOARD =======================
// function Dashboard({log,shiftType,staffDate,dept}) {
//   const [tick,setTick]=useState(0);
//   const [manualModal,setManualModal]=useState(false);
//   const [adminModal,setAdminModal]=useState(false);
//   useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),5000);return()=>clearInterval(t);},[]);
//   const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
//   const ctx=`${dateStr}|${shiftType}|${dept}`;
//   const ctxAssigns=contextStations[ctx]||{};
//   const ctxValues=Object.values(ctxAssigns);
//   const totalAssigned=new Set(ctxValues.map(a=>a.badge)).size;
//   const adminCount=log.filter(e=>(!e.station||e.path==="SEE ADMIN")&&e.dept===dept).length;
//   const dirCnt=ctxValues.filter(a=>isDirect(a.path)).length;
//   const indCnt=ctxValues.filter(a=>isInd(a.path)).length;
//   const manCnt=ctxValues.filter(a=>a.method==="MANUAL").length;
//   const scnCnt=ctxValues.filter(a=>a.method==="SCAN").length;
//   const pm={};
//   ctxValues.filter(a=>a.path&&a.path!=="SEE ADMIN").forEach(a=>{pm[a.path]=(pm[a.path]||0)+1;});
//   const topPaths=Object.entries(pm).sort((a,b)=>b[1]-a[1]).slice(0,10);
//   const deptPathIds=new Set(floorPaths.filter(p=>p.department===dept&&p.active!==false).map(p=>p.id));
//   const deptStations=floorStations.filter(s=>deptPathIds.has(s.path_id)&&s.active!==false);
//   const filledStations=deptStations.filter(s=>!!ctxAssigns[s.id]).length;
//   const openStations=deptStations.length-filledStations;
//   const deptColor=dept==="OUTBOUND"?C.orange:C.blue;
//   const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;
//   return(
//     <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}>
//       <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1.25rem"}}>DASHBOARD · TEN1 · {shiftType==="DAY"?"☀ DAY":"🌙 NIGHT"} · {fmtDate(staffDate)} · {dept}</div>
//       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"1rem"}}>
//         {[{l:"ASSIGNED",v:totalAssigned,c:C.green,bg:C.greenBg,b:C.greenBorder},{l:"SEE ADMIN",v:adminCount,c:C.red,bg:C.redBg,b:C.redBorder,click:()=>setAdminModal(true)}].map(k=>(
//           <div key={k.l} onClick={k.click||undefined} style={{background:k.bg,border:`1.5px solid ${k.b}`,borderRadius:12,padding:"1rem",textAlign:"center",cursor:k.click?"pointer":"default",transition:"all 0.12s"}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"2.4rem",color:k.c,lineHeight:1}}>{k.v}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,letterSpacing:"0.12em",marginTop:3}}>{k.l}{k.click&&<span style={{color:C.red}}> ↗</span>}</div></div>
//         ))}
//       </div>
//       <div style={{background:C.surface,border:`1.5px solid ${deptBorder}`,borderRadius:12,padding:"1rem",marginBottom:10}}>
//         <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>FLOOR MAP STATIONS · {dept}</div>
//         <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
//           {[{l:"TOTAL",v:deptStations.length,c:C.text},{l:"FILLED",v:filledStations,c:C.red},{l:"OPEN",v:openStations,c:C.green}].map(k=>(
//             <div key={k.l} style={{textAlign:"center",padding:"0.5rem",background:C.bg,borderRadius:8}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:k.c,lineHeight:1}}>{k.v}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted,marginTop:2}}>{k.l}</div></div>
//           ))}
//         </div>
//         {deptStations.length>0&&(<div style={{marginTop:8}}><div style={{background:C.bg,borderRadius:4,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round(filledStations/deptStations.length*100)}%`,background:deptColor,borderRadius:4,transition:"width 0.4s"}}/></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,marginTop:4,textAlign:"right"}}>{Math.round(filledStations/deptStations.length*100)}% utilization</div></div>)}
//       </div>
//       <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1rem",marginBottom:10}}>
//         <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>ROLE BREAKDOWN</div>
//         <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
//           {[{l:"DIRECT",v:dirCnt,c:C.blue},{l:"INDIRECT",v:indCnt,c:C.purple},{l:"MANUAL",v:manCnt,c:C.amber,click:()=>setManualModal(true)},{l:"AUTO",v:scnCnt,c:C.green}].map(k=>(
//             <div key={k.l} onClick={k.click||undefined} style={{textAlign:"center",padding:"0.5rem",background:C.bg,borderRadius:8,cursor:k.click?"pointer":"default",border:k.click?`1.5px solid ${C.amberBorder}`:"1.5px solid transparent",transition:"all 0.12s"}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:k.c,lineHeight:1}}>{k.v}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted,marginTop:2}}>{k.l}{k.click&&<span style={{color:C.amber}}> ↗</span>}</div></div>
//           ))}
//         </div>
//       </div>
//       {topPaths.length>0&&(<div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>TOP PATHS — {dept}</div><div style={{display:"flex",flexDirection:"column",gap:5}}>{topPaths.map(([path,cnt])=>{const max=topPaths[0][1];const pct=cnt/max;const ind=isInd(path);return(<div key={path} style={{display:"flex",alignItems:"center",gap:8}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.text,width:160,flexShrink:0}}>{getDisplayRoleName(path, dept)}</div><div style={{flex:1,background:C.bg,borderRadius:3,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${pct*100}%`,background:ind?C.purple:deptColor,borderRadius:3,transition:"width 0.4s"}}/></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.muted,width:20,textAlign:"right"}}>{cnt}</div></div>);})}</div></div>)}
//       <Modal open={manualModal} onClose={()=>setManualModal(false)} title="Manually Staffed Associates" width={520}>
//         {(()=>{const seen=new Set();const manList=ctxValues.filter(a=>a.method==="MANUAL"&&!seen.has(a.badge)&&seen.add(a.badge));return manList.length===0?(<div style={{textAlign:"center",padding:"2rem",fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.faint}}>No manually staffed associates yet.</div>):(<div style={{display:"flex",flexDirection:"column",gap:6}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,marginBottom:4}}>{manList.length} associate{manList.length!==1?"s":""} manually assigned · {dept} · {shiftType} · {dateStr}</div>{manList.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,background:C.amberBg,border:`1.5px solid ${C.amberBorder}`,borderRadius:10,padding:"0.7rem 0.9rem"}}><div style={{width:32,height:32,borderRadius:"50%",background:C.surface,border:`1.5px solid ${C.amberBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.amber,fontSize:"0.72rem",flexShrink:0}}>{a.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"?"}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",color:C.text,fontWeight:600}}>{a.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{a.login} · {a.path}</div></div><Bdg color={C.amber} bg={C.surface} border={C.amberBorder} style={{fontSize:"0.52rem"}}>MANUAL</Bdg></div>))}</div>)})()}
//       </Modal>
//       <Modal open={adminModal} onClose={()=>setAdminModal(false)} title="See Admin — Associates" width={520}>
//         {(()=>{const seenA=new Set();const adminList=log.filter(e=>(!e.station||e.path==="SEE ADMIN")&&e.dept===dept&&!seenA.has(e.associate?.badge||e.badge)&&seenA.add(e.associate?.badge||e.badge));return adminList.length===0?(<div style={{textAlign:"center",padding:"2rem",fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.faint}}>No associates sent to admin yet.</div>):(<div style={{display:"flex",flexDirection:"column",gap:6}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,marginBottom:4}}>{adminList.length} associate{adminList.length!==1?"s":""} sent to admin · {dept} · {shiftType} · {dateStr}</div>{adminList.map((e,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,background:C.redBg,border:`1.5px solid ${C.redBorder}`,borderRadius:10,padding:"0.7rem 0.9rem"}}><div style={{width:32,height:32,borderRadius:"50%",background:C.surface,border:`1.5px solid ${C.redBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.red,fontSize:"0.72rem",flexShrink:0}}>{e.associate?.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"?"}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",color:C.text,fontWeight:600}}>{e.associate?.name||e.badge}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{e.associate?.login||""} · {e.reason||"No station available"}</div></div><Bdg color={C.red} bg={C.surface} border={C.redBorder} style={{fontSize:"0.52rem"}}>SEE ADMIN</Bdg></div>))}</div>)})()}
//       </Modal>
//     </div>
//   );
// }

// // ======================= FLOOR MAP =======================
// function FloorMap({log,dept,staffDate,shiftType, laborShareEnabled, laborShareCount, crossDeptUsage, incrementCrossDept, getCrossDeptUsed}) {
//   const [,fu]=useState(0);const tick=()=>fu(n=>n+1);
//   const [expPaths,setExpPaths]=useState(new Set([1]));
//   const [expLines,setExpLines]=useState(new Set());
//   const [manModal,setManModal]=useState(null);
//   const [manBadge,setManBadge]=useState("");
//   const [manMsg,setManMsg]=useState("");
//   const [editStM,setEditStM]=useState(null);
//   const [addPathM,setAddPathM]=useState(false);
//   const [addLineM,setAddLineM]=useState(false);
//   const [addStM,setAddStM]=useState(false);
//   const [renamePathM,setRenamePathM]=useState(null);
//   const [nPath,setNPath]=useState({name:"",role_type:"DIRECT"});
//   const [nLine,setNLine]=useState({name:"",path_id:""});
//   const [nSt,setNSt]=useState({name:"",side:"ODD",line_id:""});
//   const [showingHalf,setShowingHalf]=useState("half1");
//   const [lastContext,setLastContext]=useState(null);
//   const [preStaffMode,setPreStaffMode]=useState(false);
//   const [preStaffShift,setPreStaffShift]=useState("FHN");
//   const [draggedPathId,setDraggedPathId]=useState(null);
//   const [dragOverPathId,setDragOverPathId]=useState(null);
//   const [auditLog,setAuditLog]=useState([]);
//   const [localLaborShareEnabled, setLocalLaborShareEnabled] = useState(laborShareEnabled);
//   const [localLaborShareCount, setLocalLaborShareCount] = useState(laborShareCount);

//   useEffect(() => {
//     setLocalLaborShareEnabled(laborShareEnabled);
//     setLocalLaborShareCount(laborShareCount);
//   }, [laborShareEnabled, laborShareCount]);

//   const pushAudit = (action, badge, name, station, path, dept, shiftType, dateStr) => {
//     const who = window.activeAdmin ? `${window.activeAdmin.name} (${window.activeAdmin.role})` : "Unknown";
//     const newEntry = {who, badge, name, station, path, action, dept, shiftType, date:dateStr, ts:new Date().toISOString()};
//     setAuditLog(prev => [newEntry, ...prev].slice(0, 500));
//     window.auditLogGlobal = window.auditLogGlobal || [];
//     window.auditLogGlobal.unshift(newEntry);
//   };

//   useEffect(()=>{
//     const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
//     const ctx=`${dateStr}|${shiftType}|${dept}`;
//     if(lastContext!==ctx){
//       setShowingHalf("half1");
//       setLastContext(ctx);
//       tick();
//     }
//   },[dept,staffDate,shiftType,lastContext]);

//   // Reset global floor when date/department changes (live mode only)
//   useEffect(() => {
//     if (preStaffMode) return;
//     const basePaths = INIT.paths.map(p => ({ ...p }));
//     const baseLines = INIT.lines.map(l => ({ ...l }));
//     const baseStations = INIT.stations.map(s => ({ ...s }));
//     const savedCustom = JSON.parse(localStorage.getItem("ct_floor_custom") || "null");
//     if (savedCustom && savedCustom.paths) {
//       savedCustom.paths.forEach(cp => {
//         const existing = basePaths.find(p => p.id === cp.id);
//         if (!existing) basePaths.push(cp);
//         else Object.assign(existing, cp);
//       });
//       savedCustom.lines.forEach(cl => {
//         const existing = baseLines.find(l => l.id === cl.id);
//         if (!existing) baseLines.push(cl);
//         else Object.assign(existing, cl);
//       });
//       savedCustom.stations.forEach(cs => {
//         const existing = baseStations.find(s => s.id === cs.id);
//         if (!existing) baseStations.push(cs);
//         else Object.assign(existing, cs);
//       });
//     }
//     Object.entries(pathRenames).forEach(([id, newName]) => {
//       const p = basePaths.find(p => p.id === parseInt(id));
//       if (p) p.name = newName;
//     });
//     floorPaths = basePaths;
//     floorLines = baseLines;
//     floorStations = baseStations;
//     tick();
//   }, [staffDate, dept, preStaffMode]);

//   useEffect(()=>{
//     api("/floor-custom").then(data=>{
//       if(!data||(!data.paths.length&&!data.lines.length&&!data.stations.length)) return;
//       const existingPathIds = new Set(floorPaths.map(p=>p.id));
//       const newPaths = data.paths.filter(p=>!existingPathIds.has(p.id));
//       if(newPaths.length) floorPaths = [...floorPaths, ...newPaths];
//       const existingLineIds = new Set(floorLines.map(l=>l.id));
//       const newLines = data.lines.filter(l=>!existingLineIds.has(l.id));
//       if(newLines.length) floorLines = [...floorLines, ...newLines];
//       const existingStIds = new Set(floorStations.map(s=>s.id));
//       const newSts = data.stations.filter(s=>!existingStIds.has(s.id));
//       if(newSts.length) floorStations = [...floorStations, ...newSts];
//       localStorage.setItem("ct_floor_custom", JSON.stringify({ paths: floorPaths.filter(p => p.id >= 10000), lines: floorLines.filter(l => l.id >= 10000), stations: floorStations.filter(s => s.id >= 10000) }));
//       if(newPaths.length||newLines.length||newSts.length) tick();
//     });
//     api("/floor-custom-renames").then(data=>{
//       if(data && data.renames){
//         pathRenames = data.renames;
//         floorPaths = floorPaths.map(p => pathRenames[p.id] ? {...p, name: pathRenames[p.id]} : p);
//         tick();
//       }
//     });
//     if(window.auditLogGlobal) setAuditLog(window.auditLogGlobal.slice(0,100));
//   },[]);

//   // Helper functions (PA, LA, SA, GA) – same as your existing working code
//   const PA = (pid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const customPath = cfg.customPaths.find(p => p.id === pid);
//       if (customPath) return customPath.active !== false;
//       if (cfg.paths[pid] !== undefined) return cfg.paths[pid];
//       const p = floorPaths.find(x => x.id === pid);
//       return p ? p.active !== false : false;
//     } else {
//       const p = floorPaths.find(x => x.id === pid);
//       return p ? p.active !== false : false;
//     }
//   };
//   const LA = (lid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const customLine = cfg.customLines.find(l => l.id === lid);
//       if (customLine) return customLine.active !== false;
//       if (cfg.lines[lid] !== undefined) return cfg.lines[lid];
//       const l = floorLines.find(x => x.id === lid);
//       return l ? l.active !== false : false;
//     } else {
//       const l = floorLines.find(x => x.id === lid);
//       return l ? l.active !== false : false;
//     }
//   };
//   const SA = (sid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const customSt = cfg.customStations.find(s => s.id === sid);
//       if (customSt) return customSt.active !== false;
//       if (cfg.stations[sid] !== undefined) return cfg.stations[sid];
//       const s = floorStations.find(x => x.id === sid);
//       return s ? s.active !== false : false;
//     } else {
//       const s = floorStations.find(x => x.id === sid);
//       return s ? s.active !== false : false;
//     }
//   };
//   const GA = (sid) => {
//     const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
//     if (preStaffMode && preStaffShift) {
//       const psKey = `${dept}|${dateStr}|${preStaffShift}`;
//       return preStaffData[psKey]?.[sid] || null;
//     }
//     const ctx = `${dateStr}|${shiftType}|${dept}`;
//     return getStationAssignment(ctx, sid) || null;
//   };
//   const tep=pid=>setExpPaths(p=>{const n=new Set(p);n.has(pid)?n.delete(pid):n.add(pid);return n;});
//   const tel=lid=>setExpLines(p=>{const n=new Set(p);n.has(lid)?n.delete(lid):n.add(lid);return n;});
//   const expAllL=pid=>{const ids=floorLines.filter(l=>l.path_id===pid).map(l=>l.id);setExpLines(p=>{const n=new Set(p);ids.forEach(i=>n.add(i));return n;});};
//   const colAllL=pid=>{const ids=new Set(floorLines.filter(l=>l.path_id===pid).map(l=>l.id));setExpLines(p=>{const n=new Set(p);ids.forEach(i=>n.delete(i));return n;});};
//   const togPath = (pid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const current = cfg.paths[pid] !== undefined ? cfg.paths[pid] : true;
//       cfg.paths[pid] = !current;
//     } else {
//       const p = floorPaths.find(x => x.id === pid);
//       if (p) p.active = !p.active;
//     }
//     tick();
//   };
//   const togLine = (lid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const current = cfg.lines[lid] !== undefined ? cfg.lines[lid] : true;
//       cfg.lines[lid] = !current;
//     } else {
//       const l = floorLines.find(x => x.id === lid);
//       if (l) l.active = !l.active;
//     }
//     tick();
//   };
//   const togSt = (sid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const current = cfg.stations[sid] !== undefined ? cfg.stations[sid] : true;
//       cfg.stations[sid] = !current;
//     } else {
//       const s = floorStations.find(x => x.id === sid);
//       if (s) s.active = !s.active;
//     }
//     tick();
//   };
//   const clrSt = (sid) => {
//     const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
//     if (preStaffMode && preStaffShift) {
//       const psKey = `${dept}|${dateStr}|${preStaffShift}`;
//       const a = preStaffData[psKey]?.[sid];
//       if (a) {
//         delete preStaffData[psKey][sid];
//         pushAudit("CLEAR", a.badge, a.name, floorStations.find(s=>s.id===sid)?.name, a.path, dept, preStaffShift, dateStr);
//       }
//     } else {
//       const ctx = `${dateStr}|${shiftType}|${dept}`;
//       const a = GA(sid);
//       if (a) {
//         const badgeSid = getBadgeAssignment(ctx, a.badge);
//         if (badgeSid === sid) {
//           if (!contextBadges[ctx]) contextBadges[ctx] = {};
//           delete contextBadges[ctx][a.badge];
//         }
//         const st = floorStations.find(s => s.id === sid);
//         pushAudit("CLEAR", a.badge, a.name, st?.name || String(sid), a.path, dept, shiftType, dateStr);
//       }
//       if (!contextStations[ctx]) contextStations[ctx] = {};
//       delete contextStations[ctx][sid];
//     }
//     tick();
//   };
//   const delPath = (pid) => {
//     if (!window.window.window.confirm("Delete path and all its lines/stations?")) return;
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       cfg.customPaths = cfg.customPaths.filter(p => p.id !== pid);
//       floorPaths = floorPaths.filter(p => p.id !== pid);
//       const lids = floorLines.filter(l => l.path_id === pid).map(l => l.id);
//       floorLines = floorLines.filter(l => l.path_id !== pid);
//       floorStations = floorStations.filter(s => !lids.includes(s.line_id));
//     } else {
//       floorPaths = floorPaths.filter(p => p.id !== pid);
//       const lids = floorLines.filter(l => l.path_id === pid).map(l => l.id);
//       floorLines = floorLines.filter(l => l.path_id !== pid);
//       floorStations = floorStations.filter(s => !lids.includes(s.line_id));
//       saveFloorCustom();
//     }
//     tick();
//   };
//   const delLine = (lid) => {
//     if (!window.window.window.confirm("Delete line and all its stations?")) return;
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       cfg.customLines = cfg.customLines.filter(l => l.id !== lid);
//       floorLines = floorLines.filter(l => l.id !== lid);
//       floorStations = floorStations.filter(s => s.line_id !== lid);
//     } else {
//       floorLines = floorLines.filter(l => l.id !== lid);
//       floorStations = floorStations.filter(s => s.line_id !== lid);
//       saveFloorCustom();
//     }
//     tick();
//   };
//   const delSt = (sid) => {
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       cfg.customStations = cfg.customStations.filter(s => s.id !== sid);
//       floorStations = floorStations.filter(s => s.id !== sid);
//     } else {
//       floorStations = floorStations.filter(s => s.id !== sid);
//       saveFloorCustom();
//     }
//     clrSt(sid);
//     tick();
//   };
//   const addPath2 = () => {
//     if (!nPath.name.trim()) return;
//     const newId = Math.max(10000, ...floorPaths.map(p => p.id)) + 1;
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       const newPath = { id: newId, name: nPath.name.trim(), role_type: nPath.role_type, department: dept, active: true };
//       cfg.customPaths.push(newPath);
//       floorPaths.push(newPath);
//     } else {
//       floorPaths.push({ id: newId, name: nPath.name.trim(), role_type: nPath.role_type, department: dept, active: true });
//       saveFloorCustom();
//     }
//     setAddPathM(false);
//     setNPath({ name: "", role_type: "DIRECT" });
//     tick();
//   };
//   const addLine2 = () => {
//     if (!nLine.name.trim() || !nLine.path_id) return;
//     const newId = Math.max(10000, ...floorLines.map(l => l.id)) + 1;
//     const newLine = { id: newId, path_id: parseInt(nLine.path_id), name: nLine.name.trim(), active: true };
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       cfg.customLines.push(newLine);
//       floorLines.push(newLine);
//     } else {
//       floorLines.push(newLine);
//       saveFloorCustom();
//     }
//     setAddLineM(false);
//     setNLine({ name: "", path_id: "" });
//     tick();
//   };
//   const addSt2 = () => {
//     if (!nSt.name.trim() || !nSt.line_id) return;
//     const lid = parseInt(nSt.line_id);
//     const line = floorLines.find(l => l.id === lid);
//     const newId = Math.max(10000, ...floorStations.map(s => s.id)) + 1;
//     const newStation = { id: newId, line_id: lid, path_id: line?.path_id || 0, name: nSt.name.trim(), side: nSt.side, station_number: newId, active: true };
//     if (preStaffMode && preStaffShift) {
//       const cfg = getShiftConfig(preStaffShift);
//       cfg.customStations.push(newStation);
//       floorStations.push(newStation);
//     } else {
//       floorStations.push(newStation);
//       saveFloorCustom();
//     }
//     setAddStM(false);
//     setNSt({ name: "", side: "ODD", line_id: "" });
//     tick();
//   };
//   const saveFloorCustom = () => {
//     api("/floor-custom", { method: "POST", body: JSON.stringify({ paths: floorPaths.filter(p => p.id >= 10000), lines: floorLines.filter(l => l.id >= 10000), stations: floorStations.filter(s => s.id >= 10000) }) });
//     localStorage.setItem("ct_floor_custom", JSON.stringify({ paths: floorPaths.filter(p => p.id >= 10000), lines: floorLines.filter(l => l.id >= 10000), stations: floorStations.filter(s => s.id >= 10000) }));
//   };
//   const savePathRenames = () => { api("/floor-custom-renames", { method: "POST", body: JSON.stringify({ renames: pathRenames }) }); };
//   const handlePathDragStart = (e, pathId) => { setDraggedPathId(pathId); e.dataTransfer.effectAllowed = "move"; };
//   const handlePathDragOver = (e, pathId) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; if(draggedPathId !== pathId) setDragOverPathId(pathId); };
//   const handlePathDragLeave = () => setDragOverPathId(null);
//   const handlePathDrop = (e, targetPathId) => { e.preventDefault(); if(draggedPathId === null || draggedPathId === targetPathId) return; const deptPathsList = floorPaths.filter(p => p.department === dept).sort((a,b)=>(a.display_order||0)-(b.display_order||0)); const draggedIdx = deptPathsList.findIndex(p => p.id === draggedPathId); const targetIdx = deptPathsList.findIndex(p => p.id === targetPathId); if(draggedIdx === targetIdx) return; const newOrder = [...deptPathsList]; const [draggedPath] = newOrder.splice(draggedIdx, 1); newOrder.splice(targetIdx, 0, draggedPath); newOrder.forEach((p, idx) => { const fp = floorPaths.find(fp => fp.id === p.id); if(fp) fp.display_order = idx * 100; }); setDraggedPathId(null); setDragOverPathId(null); tick(); saveFloorCustom(); };
//   const handlePathDragEnd = () => { setDraggedPathId(null); setDragOverPathId(null); };
//   function switchToHalf(half){ const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate; const ctx=`${dateStr}|${shiftType}|${dept}`; const sKey=shiftKey(dept,dateStr,shiftType); const deptAssigns=shiftAssignments[sKey]||{}; if(!contextStations[ctx]) contextStations[ctx]={}; if(!contextBadges[ctx]) contextBadges[ctx]={}; Object.keys(contextStations[ctx]).forEach(sid=>{ delete contextStations[ctx][sid]; }); Object.keys(contextBadges[ctx]).forEach(badge=>{ delete contextBadges[ctx][badge]; }); Object.entries(deptAssigns).forEach(([badge,assign])=>{ const hd=assign[half]; if(!hd||hd.path==="SEE ADMIN"||!hd.station) return; const sid=hd.station.id; if(!sid||!isValidFloorStation(sid)) return; const assoc=mockAssocs.find(a=>a.badge===badge); if(!assoc) return; setStationAssignment(ctx,sid,{login:assoc.login,name:assoc.name,badge,path:hd.path,roleType:hd.roleType,assignedAt:Date.now(),method:"SCAN",dept,half}); setBadgeAssignment(ctx,badge,sid); }); setShowingHalf(half); tick(); }

//   function doAssign(override=false){
//     if(!manBadge.trim()){setManMsg("Enter badge or login");return;}
//     const assoc=mockAssocs.find(a=>a.badge===manBadge.trim()||a.login===manBadge.trim().toLowerCase());
//     if(!assoc){setManMsg("Associate not found");return;}
//     const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
//     if(preStaffMode){
//       const psKey=`${dept}|${dateStr}|${preStaffShift}`;
//       if(!preStaffData) preStaffData = {};
//       if(!preStaffData[psKey]) preStaffData[psKey]={};
//       const ex=preStaffData[psKey][manModal.sid];
//       if(ex&&!override){setManMsg(`Pre-staffed: ${ex.login}. Use Override.`);return;}
//       preStaffData[psKey][manModal.sid]={login:assoc.login,name:assoc.name,badge:assoc.badge,path:manModal.pathName,roleType:"MANUAL",assignedAt:Date.now(),method:"PRE-STAFF",dept,half:"half1"};
//       pushAudit("PRE-STAFF",assoc.badge,assoc.name,manModal.stName,manModal.pathName,dept,preStaffShift,dateStr);
//       setManMsg(`Pre-staffed: ${assoc.name} → ${manModal.stName} (${preStaffShift})`);tick();
//       setTimeout(()=>{setManModal(null);setManBadge("");setManMsg("");},1400);
//       return;
//     }
//     const ctx=`${dateStr}|${shiftType}|${dept}`;
//     const ex=GA(manModal.sid);
//     if(ex&&!override){setManMsg(`Occupied by ${ex.login}. Use Override.`);return;}
//     // Determine station's department
//     const stationObj = floorStations.find(s => s.id === manModal.sid);
//     const lineObj = floorLines.find(l => l.id === stationObj?.line_id);
//     const pathObj = floorPaths.find(p => p.id === lineObj?.path_id);
//     const stationDept = pathObj?.department;
//     const isCrossDept = stationDept && assoc.operation_mode !== "BOTH" && assoc.operation_mode !== stationDept;
//     if (isCrossDept) {
//       if (!localLaborShareEnabled) {
//         setManMsg(`Cannot assign ${assoc.name} (${assoc.operation_mode}) to ${stationDept} station. Enable Labor Share Mode to override.`);
//         return;
//       }
//       const used = getCrossDeptUsed(getUsageKey());
//       if (localLaborShareCount > 0 && used >= localLaborShareCount) {
//         setManMsg(`Labor share limit reached (${used}/${localLaborShareCount}). Cannot assign more cross‑department.`);
//         return;
//       }
//     }
//     if(ex){
//       const exBadge=ex.badge;
//       if(!contextBadges[ctx]) contextBadges[ctx]={};
//       delete contextBadges[ctx][exBadge];
//     }
//     const oldSid=getBadgeAssignment(ctx,assoc.badge);
//     if(oldSid){
//       if(!contextStations[ctx]) contextStations[ctx]={};
//       delete contextStations[ctx][oldSid];
//     }
//     setStationAssignment(ctx,manModal.sid,{login:assoc.login,name:assoc.name,badge:assoc.badge,path:manModal.pathName,roleType:"MANUAL",assignedAt:Date.now(),method:"MANUAL",dept,half:showingHalf});
//     setBadgeAssignment(ctx,assoc.badge,manModal.sid);
//     assignHistory.push({badge:assoc.badge,login:assoc.login,name:assoc.name,path:manModal.pathName,station:manModal.stName,roleType:"MANUAL",method:"MANUAL",assignedAt:Date.now(),staffDate:dateStr,shiftType:shiftType,dept,half:showingHalf});
//     pushAudit("ASSIGN",assoc.badge,assoc.name,manModal.stName,manModal.pathName,dept,shiftType,dateStr);
//     if (isCrossDept) incrementCrossDept(getUsageKey());
//     setManMsg(`${assoc.name} → ${manModal.stName}`);tick();
//     setTimeout(()=>{setManModal(null);setManBadge("");setManMsg("");},1400);
//   }

//   const getUsageKey = () => {
//     const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
//     if (preStaffMode) return `prestaff|${dept}|${dateStr}|${preStaffShift}`;
//     return `live|${dept}|${dateStr}|${shiftType}`;
//   };

//   const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
//   const deptPaths=floorPaths.filter(p=>p.department===dept).sort((a,b)=>(a.display_order||0)-(b.display_order||0));
//   const ctxForLive = `${dateStr}|${shiftType}|${dept}`;
//   const totFilled = preStaffMode ? (preStaffData[`${dept}|${dateStr}|${preStaffShift}`] ? Object.keys(preStaffData[`${dept}|${dateStr}|${preStaffShift}`]).length : 0) : (contextStations[ctxForLive] ? Object.keys(contextStations[ctxForLive]).length : 0);
//   const totOpen = preStaffMode ? floorStations.filter(s=>{const p=floorPaths.find(fp=>fp.id===s.path_id);return p?.department===dept&&s.active!==false&&!GA(s.id)&&LA(s.line_id);}).length : floorStations.filter(s=>{const p=floorPaths.find(fp=>fp.id===s.path_id);return p?.department===dept&&s.active!==false&&!GA(s.id)&&LA(s.line_id);}).length;
//   const deptColor=dept==="OUTBOUND"?C.orange:C.blue;
//   const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;

//   const stCell=(st,pathName)=>{
//     const asn = GA(st.id);
//     const act = SA(st.id);
//     return(
//       <div key={st.id}
//         style={{background:!act?"#f3f4f6":asn?C.redBg:C.greenBg,border:`1.5px solid ${!act?C.border:asn?C.redBorder:C.greenBorder}`,borderRadius:9,padding:"0.5rem 0.6rem",cursor:"pointer",opacity:!act?0.5:1,transition:"all 0.12s"}}
//         onClick={()=>{if(!act)return;setManModal({sid:st.id,stName:st.name,pathName,existing:asn||null});setManBadge("");setManMsg("");}}>
//         <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",fontWeight:700,color:asn?C.red:C.green}}>{st.name}</div>
//         {asn?(<div style={{marginTop:3}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.text,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{asn.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{asn.login}</div><Bdg color={asn.method==="MANUAL"?C.amber:C.green} bg={asn.method==="MANUAL"?C.amberBg:C.greenBg} border={asn.method==="MANUAL"?C.amberBorder:C.greenBorder} style={{marginTop:3,fontSize:"0.5rem"}}>{asn.method}</Bdg></div>):(<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.green,marginTop:2}}>OPEN</div>)}
//         <div style={{display:"flex",gap:3,marginTop:4}}>
//           <button onClick={e=>{e.stopPropagation();togSt(st.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.muted,padding:"1px 3px"}}>{act?"OFF":"ON"}</button>
//           {asn&&<button onClick={e=>{e.stopPropagation();clrSt(st.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.red,padding:"1px 3px"}}>CLR</button>}
//           <button onClick={e=>{e.stopPropagation();setEditStM({...st});}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.muted,padding:"1px 3px"}}>✏</button>
//           <button onClick={e=>{e.stopPropagation();if(window.window.window.confirm("Delete station?"))delSt(st.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.red,padding:"1px 3px"}}>✕</button>
//         </div>
//       </div>
//     );
//   };

//   return(
//     <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}>
//       {preStaffMode&&(<div style={{background:C.purpleBg,border:`1.5px solid ${C.purpleBorder}`,borderRadius:10,padding:"0.6rem 1rem",marginBottom:"0.75rem",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:"1rem"}}>🟣</span><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.purple,fontWeight:600,flex:1}}>PRE-STAFFING MODE — Assignments saved for <strong>{preStaffShift}</strong>. Live floor unaffected.</div><Bdg color={C.purple} bg={C.surface} border={C.purpleBorder}>{(preStaffData?.[`${dept}|${dateStr}|${preStaffShift}`] && Object.keys(preStaffData[`${dept}|${dateStr}|${preStaffShift}`]).length) || 0} pre-staffed</Bdg></div>)}
//       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
//         <div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>FLOOR MAP · TEN1 · {dept}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.sub,marginTop:2}}>{fmtDate(staffDate)} · {preStaffMode ? `Pre-staffing ${preStaffShift}` : shiftType} · <span style={{color:C.red}}>{totFilled} filled</span> · <span style={{color:C.green}}>{totOpen} open</span></div></div>
//         <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
//           <div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
//             {[{v:"half1",l:"1ST HALF"},{v:"half2",l:"2ND HALF"}].map(h=>(
//               <button key={h.v} onClick={()=>switchToHalf(h.v)}
//                 style={{padding:"5px 11px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,border:"none",cursor:"pointer",
//                   background:showingHalf===h.v?C.teal:"transparent",color:showingHalf===h.v?"#fff":C.muted}}>
//                 {h.l}
//               </button>
//             ))}
//           </div>
//           {/* Labor Share Toggle + Count */}
//           <div style={{display:"flex",alignItems:"center",gap:8,background:localLaborShareEnabled?C.purpleBg:C.bg,border:`1.5px solid ${localLaborShareEnabled?C.purpleBorder:C.border}`,borderRadius:8,padding:"3px 8px"}}>
//             <button onClick={()=>{ const newVal = !localLaborShareEnabled; setLocalLaborShareEnabled(newVal); /* propagate to parent if needed */ }} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",fontWeight:600,color:localLaborShareEnabled?C.purple:C.muted,letterSpacing:"0.06em"}}>
//               {localLaborShareEnabled?"🔄 LABOR SHARE ON":"⚪ LABOR SHARE"}
//             </button>
//             {localLaborShareEnabled && (
//               <div style={{display:"flex",alignItems:"center",gap:6}}>
//                 <input
//                   type="number"
//                   min="0"
//                   max="100"
//                   value={localLaborShareCount}
//                   onChange={e => setLocalLaborShareCount(parseInt(e.target.value) || 0)}
//                   style={{width:60,padding:"0.2rem 0.3rem",borderRadius:4,border:`1px solid ${C.purpleBorder}`,textAlign:"center"}}
//                 />
//                 <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.purple}}>
//                   used {getCrossDeptUsed(getUsageKey())}/{localLaborShareCount === 0 ? "∞" : localLaborShareCount}
//                 </span>
//               </div>
//             )}
//           </div>
//           <Btn size="sm" variant="primary" onClick={()=>setAddPathM(true)}>+ Path</Btn>
//           <Btn size="sm" onClick={()=>setAddLineM(true)}>+ Line</Btn>
//           <Btn size="sm" onClick={()=>setAddStM(true)}>+ Station</Btn>
//           <div style={{display:"flex",alignItems:"center",gap:4,background:preStaffMode?C.purpleBg:C.bg,border:`1.5px solid ${preStaffMode?C.purpleBorder:C.border}`,borderRadius:8,padding:"3px 8px"}}>
//             <button onClick={()=>setPreStaffMode(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",fontWeight:600,color:preStaffMode?C.purple:C.muted,letterSpacing:"0.06em"}}>
//               {preStaffMode?"🟣 PRE-STAFFING":"⚪ PRE-STAFF"}
//             </button>
//             {preStaffMode&&(
//               <Sel value={preStaffShift} onChange={e=>setPreStaffShift(e.target.value)} style={{width:70,padding:"2px 4px",fontSize:"0.58rem"}}>
//                 {["FHD","FHN","BHD","BHN"].map(s=><option key={s} value={s}>{s}</option>)}
//               </Sel>
//             )}
//           </div>
//         </div>
//       </div>
//       <div style={{display:"flex",flexDirection:"column",gap:10}}>{deptPaths.map((path,pathIdx)=>{const pathLines=floorLines.filter(l=>l.path_id===path.id); const pathStations=floorStations.filter(s=>s.path_id===path.id); const filledCount = preStaffMode ? (preStaffData[`${dept}|${dateStr}|${preStaffShift}`] ? Object.values(preStaffData[`${dept}|${dateStr}|${preStaffShift}`]).filter(a=>a.path===path.name).length : 0) : pathStations.filter(s=>!!GA(s.id)).length; const openCount = preStaffMode ? pathStations.filter(s=>SA(s.id)&&!GA(s.id)&&LA(s.line_id)).length : pathStations.filter(s=>SA(s.id)&&!GA(s.id)&&LA(s.line_id)).length; const isExp=expPaths.has(path.id); return(<div key={path.id} draggable onDragStart={(e) => handlePathDragStart(e, path.id)} onDragOver={(e) => handlePathDragOver(e, path.id)} onDragLeave={handlePathDragLeave} onDrop={(e) => handlePathDrop(e, path.id)} onDragEnd={handlePathDragEnd} style={{background:C.surface,border:`1.5px solid ${dragOverPathId===path.id?C.blueBorder:PA(path.id)?deptBorder:C.border}`,borderRadius:14,overflow:"hidden",opacity:draggedPathId===path.id?0.5:PA(path.id)?1:0.6,transition:"all 0.15s",cursor:"grab"}}><div style={{display:"flex",alignItems:"center",gap:10,padding:"0.85rem 1rem",cursor:"pointer",background:PA(path.id)?"transparent":"#f9fafb"}} onClick={()=>tep(path.id)}><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,fontSize:"0.78rem",color:C.text}}>{getDisplayRoleName(path.name, dept)}</span><Bdg color={path.role_type==="INDIRECT"?C.purple:C.blue} bg={path.role_type==="INDIRECT"?C.purpleBg:C.blueBg} border={path.role_type==="INDIRECT"?C.purpleBorder:C.blueBorder} style={{fontSize:"0.52rem"}}>{path.role_type}</Bdg><Bdg color={C.red} bg={C.redBg} border={C.redBorder} style={{fontSize:"0.52rem"}}>{filledCount} filled</Bdg><Bdg color={C.green} bg={C.greenBg} border={C.greenBorder} style={{fontSize:"0.52rem"}}>{openCount} open</Bdg></div></div><div style={{display:"flex",gap:5,alignItems:"center"}}><button onClick={e=>{e.stopPropagation();togPath(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,padding:"2px 5px"}}>{PA(path.id)?"DISABLE":"ENABLE"}</button><button onClick={e=>{e.stopPropagation();expAllL(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,padding:"2px 5px"}}>ALL</button><button onClick={e=>{e.stopPropagation();colAllL(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,padding:"2px 5px"}}>NONE</button><button onClick={e=>{e.stopPropagation();setRenamePathM({id:path.id,name:path.name});}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.blue,padding:"2px 5px"}}>✏ REN</button><button onClick={e=>{e.stopPropagation();if(window.window.window.confirm(`Delete path "${path.name}" and all its lines/stations?`))delPath(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.red,padding:"2px 5px"}}>DEL</button><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>{isExp?"▲":"▼"}</span></div></div>{isExp&&(<div style={{borderTop:`1px solid ${C.border}`,padding:"0.75rem 1rem",display:"flex",flexDirection:"column",gap:8}}>{pathLines.map(line=>{const lineStations=floorStations.filter(s=>s.line_id===line.id); const odd=lineStations.filter(s=>s.side==="ODD"); const evn=lineStations.filter(s=>s.side==="EVEN"); const isLineExp=expLines.has(line.id); return(<div key={line.id} style={{background:C.bg,borderRadius:10,border:`1px solid ${LA(line.id)?C.border:"#e5e7eb"}`,opacity:LA(line.id)?1:0.55}}><div style={{display:"flex",alignItems:"center",gap:8,padding:"0.55rem 0.75rem",cursor:"pointer"}} onClick={()=>tel(line.id)}><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",fontWeight:600,color:C.text,flex:1}}>{line.name}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted}}>{lineStations.filter(s=>!!GA(s.id)).length}/{lineStations.length} filled</span><button onClick={e=>{e.stopPropagation();togLine(line.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted,padding:"1px 4px"}}>{LA(line.id)?"OFF":"ON"}</button><button onClick={e=>{e.stopPropagation();if(window.window.window.confirm(`Delete line "${line.name}"?`))delLine(line.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.red,padding:"1px 4px"}}>DEL</button><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.muted}}>{isLineExp?"▲":"▼"}</span></div>{isLineExp&&(<div style={{padding:"0 0.75rem 0.75rem"}}>{odd.length>0&&(<div style={{marginBottom:"0.6rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,letterSpacing:"0.12em",marginBottom:6}}>ODD SIDE</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:6}}>{odd.map(st=>stCell(st,path.name))}</div></div>)}{evn.length>0&&(<div style={{marginTop:"0.6rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,letterSpacing:"0.12em",marginBottom:6}}>EVEN SIDE</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:6}}>{evn.map(st=>stCell(st,path.name))}</div></div>)}</div>)}</div>);})}</div>)}</div>);})}</div>
//       <Modal open={!!manModal} onClose={()=>{setManModal(null);setManBadge("");setManMsg("");}} title={`Station: ${manModal?.stName} — ${manModal?.pathName}`}>{manModal?.existing&&<div style={{marginBottom:"1rem"}}><div style={{background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:8,padding:"0.75rem",marginBottom:"0.75rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.red,marginBottom:3}}>Currently assigned:</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,fontWeight:600}}>{manModal.existing.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted}}>{manModal.existing.login} · {manModal.existing.method}</div></div><Btn variant="danger" onClick={()=>clrSt(manModal.sid)}>Clear Station</Btn></div>}{manMsg&&<div style={{background:manMsg.includes("→")?C.greenBg:C.redBg,border:`1px solid ${manMsg.includes("→")?C.greenBorder:C.redBorder}`,borderRadius:8,padding:"0.6rem 0.9rem",marginBottom:"0.75rem",fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:manMsg.includes("→")?C.green:C.red}}>{manMsg}</div>}<Field label={manModal?.existing?"OVERRIDE WITH":"ASSIGN ASSOCIATE"}><Inp value={manBadge} onChange={e=>setManBadge(e.target.value)} placeholder="Badge or login"/></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn onClick={()=>{setManModal(null);setManBadge("");setManMsg("");}}>Cancel</Btn>{manModal?.existing&&<Btn variant="danger" onClick={()=>doAssign(true)}>Override</Btn>}<Btn variant="primary" onClick={()=>doAssign(false)}>Assign</Btn></div></Modal>
//       <Modal open={!!editStM} onClose={()=>setEditStM(null)} title="Edit Station"><Field label="NAME"><Inp value={editStM?.name||""} onChange={e=>setEditStM({...editStM,name:e.target.value})}/></Field><Field label="SIDE"><Sel value={editStM?.side||"ODD"} onChange={e=>setEditStM({...editStM,side:e.target.value})}><option value="ODD">ODD</option><option value="EVEN">EVEN</option></Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setEditStM(null)}>Cancel</Btn><Btn variant="primary" onClick={()=>{const s=floorStations.find(x=>x.id===editStM.id);if(s){s.name=editStM.name;s.side=editStM.side;}setEditStM(null);tick();}}>Save</Btn></div></Modal>
//       <Modal open={addPathM} onClose={()=>setAddPathM(false)} title={`Add New Path — ${dept}`}><Field label="PATH NAME" req><Inp value={nPath.name} onChange={e=>setNPath({...nPath,name:e.target.value})} placeholder="e.g. CRETS High Side"/></Field><Field label="ROLE TYPE"><Sel value={nPath.role_type} onChange={e=>setNPath({...nPath,role_type:e.target.value})}><option value="DIRECT">DIRECT (10hr cap)</option><option value="INDIRECT">INDIRECT (5hr cap)</option></Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setAddPathM(false)}>Cancel</Btn><Btn variant="primary" onClick={addPath2}>Add Path</Btn></div></Modal>
//       <Modal open={addLineM} onClose={()=>setAddLineM(false)} title="Add New Line"><Field label="LINE NAME" req><Inp value={nLine.name} onChange={e=>setNLine({...nLine,name:e.target.value})} placeholder="e.g. Line 9"/></Field><Field label="PATH" req><Sel value={nLine.path_id||""} onChange={e=>setNLine({...nLine,path_id:e.target.value})}><option value="">— Select Path —</option>{deptPaths.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setAddLineM(false)}>Cancel</Btn><Btn variant="primary" onClick={addLine2}>Add Line</Btn></div></Modal>
//       <Modal open={addStM} onClose={()=>setAddStM(false)} title="Add Station"><Field label="STATION NAME" req><Inp value={nSt.name} onChange={e=>setNSt({...nSt,name:e.target.value})} placeholder="e.g. Dock Door 250"/></Field><Field label="SIDE"><Sel value={nSt.side} onChange={e=>setNSt({...nSt,side:e.target.value})}><option value="ODD">ODD</option><option value="EVEN">EVEN</option></Sel></Field><Field label="LINE" req><Sel value={nSt.line_id||""} onChange={e=>setNSt({...nSt,line_id:e.target.value})}><option value="">— Select Line —</option>{floorLines.filter(l=>deptPaths.some(p=>p.id===l.path_id)).map(l=>{const p=deptPaths.find(x=>x.id===l.path_id);return<option key={l.id} value={l.id}>{p?.name} / {l.name}</option>;})}</Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setAddStM(false)}>Cancel</Btn><Btn variant="primary" onClick={addSt2}>Add Station</Btn></div></Modal>
//       <Modal open={!!renamePathM} onClose={()=>setRenamePathM(null)} title="Rename Path"><Field label="PATH NAME" req><Inp value={renamePathM?.name||""} onChange={e=>setRenamePathM({...renamePathM,name:e.target.value})} placeholder="New path name"/></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setRenamePathM(null)}>Cancel</Btn><Btn variant="primary" onClick={()=>{ if(!renamePathM?.name.trim()) return; const p=floorPaths.find(x=>x.id===renamePathM.id); if(p){ p.name=renamePathM.name.trim(); pathRenames[renamePathM.id]=renamePathM.name.trim(); savePathRenames(); tick(); saveFloorCustom(); } setRenamePathM(null); }}>Save</Btn></div></Modal>
//     </div>
//   );
// }

// // ======================= COMPONENTS YOU WILL KEEP =======================



// // ======================= COMPONENTS YOU WILL KEEP (placeholders) =======================




// // ======================= PERMISSIONS =======================
// function Permissions({dept}) {
//   const [view,setView]=useState("byAssoc");
//   const [search,setSearch]=useState("");
//   const [editAssoc,setEditAssoc]=useState(null);
//   const [editPerm,setEditPerm]=useState(null);
//   const [addingPerm,setAddingPerm]=useState(false);
//   const [nPerm,setNPerm]=useState({path_name:"Unloader",lc_level:1});
//   const [,fu]=useState(0);
//   const deptAssocs=mockAssocs.filter(a=>a.operation_mode===dept||a.operation_mode==="BOTH");
//   const displayAssocs=deptAssocs.filter(a=>{const s=search.toLowerCase();return !search||a.name.toLowerCase().includes(s)||a.login.toLowerCase().includes(s)||a.badge.includes(search);});
//   const indList=dept==="OUTBOUND"?OUTBOUND_INDIRECT_LIST:INBOUND_INDIRECT_LIST;
//   const dirList=dept==="OUTBOUND"?OUTBOUND_DIRECT_LIST:INBOUND_DIRECT_LIST;
//   const allPaths=[...indList,...dirList];
//   const matrix={};
//   allPaths.forEach(p=>{matrix[p]={path:p,lc1:0,lc2:0,lc3:0,lc4:0,lc5:0,total:0,type:isInd(p)?"INDIRECT":"DIRECT"};});
//   deptAssocs.forEach(a=>(a.permissions||[]).forEach(pm=>{if(matrix[pm.path_name]){matrix[pm.path_name][`lc${pm.lc_level}`]++;matrix[pm.path_name].total++;}}));
//   const matRows=Object.values(matrix).sort((a,b)=>(PATH_PRIORITY[b.path]||0)-(PATH_PRIORITY[a.path]||0));
//   function saveEdit(){if(!editAssoc||!editPerm)return;const idx=mockAssocs.findIndex(a=>a.badge===editAssoc.badge);if(idx<0)return;const pi=mockAssocs[idx].permissions.findIndex(p=>p.path_name===editPerm.path_name);if(pi>=0)mockAssocs[idx].permissions[pi].lc_level=editPerm.lc_level;setEditPerm(null);fu(n=>n+1);}
//   function delPerm(badge,pn){const idx=mockAssocs.findIndex(a=>a.badge===badge);if(idx>=0)mockAssocs[idx].permissions=mockAssocs[idx].permissions.filter(p=>p.path_name!==pn);fu(n=>n+1);}
//   function addPerm(){if(!editAssoc||!nPerm.path_name)return;const idx=mockAssocs.findIndex(a=>a.badge===editAssoc.badge);if(idx<0)return;const ex=mockAssocs[idx].permissions.find(p=>p.path_name===nPerm.path_name);if(ex)ex.lc_level=parseInt(nPerm.lc_level);else mockAssocs[idx].permissions.push({path_name:nPerm.path_name,lc_level:parseInt(nPerm.lc_level),role_type:isInd(nPerm.path_name)?"INDIRECT":"DIRECT"});setAddingPerm(false);setNPerm({path_name:indList[0],lc_level:1});fu(n=>n+1);}
//   return(
//     <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>PERMISSIONS · TEN1 · {dept}</div><div style={{display:"flex",gap:6}}>{["byAssoc","matrix"].map(v=><button key={v} onClick={()=>setView(v)} style={{background:view===v?C.greenBg:C.surface,border:`1.5px solid ${view===v?C.green:C.border}`,borderRadius:7,padding:"4px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:view===v?C.green:C.muted,cursor:"pointer"}}>{v==="byAssoc"?"By Associate":"By Path"}</button>)}</div></div>
//       <Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search associate..." style={{marginBottom:14}}/>
//       {view==="matrix"&&(<div style={{display:"flex",flexDirection:"column",gap:7}}><div style={{display:"grid",gridTemplateColumns:"1fr 44px 32px 32px 32px 32px 32px 56px",gap:3,padding:"0.4rem 0.75rem",fontFamily:"'DM Mono',monospace",fontSize:"0.57rem",color:C.muted,letterSpacing:"0.08em"}}><div>PATH</div><div style={{textAlign:"center"}}>TYPE</div>{[1,2,3,4,5].map(l=><div key={l} style={{textAlign:"center",color:LC_COLOR(l)}}>L{l}</div>)}<div style={{textAlign:"center"}}>TOTAL</div></div>{matRows.map(row=>(<div key={row.path} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.7rem 0.75rem",display:"grid",gridTemplateColumns:"1fr 44px 32px 32px 32px 32px 32px 56px",gap:3,alignItems:"center"}}><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",color:C.text,fontWeight:600}}>{row.path}</div><Bdg color={C.amber} bg={C.amberBg} border={C.amberBorder} style={{marginTop:3,fontSize:"0.52rem"}}>P{PATH_PRIORITY[row.path]||"?"}/10</Bdg></div><div style={{textAlign:"center"}}><Bdg color={row.type==="INDIRECT"?C.purple:C.blue} bg={row.type==="INDIRECT"?C.purpleBg:C.blueBg} border={row.type==="INDIRECT"?C.purpleBorder:C.blueBorder} style={{fontSize:"0.52rem"}}>{row.type==="INDIRECT"?"I":"D"}</Bdg></div>{[1,2,3,4,5].map(l=><div key={l} style={{textAlign:"center"}}>{row[`lc${l}`]>0?<span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",fontWeight:700,color:LC_COLOR(l),background:LC_BG(l),border:`1px solid ${LC_BORDER(l)}`,borderRadius:5,padding:"1px 5px"}}>{row[`lc${l}`]}</span>:<span style={{color:C.faint,fontSize:"0.6rem"}}>-</span>}</div>)}<div style={{textAlign:"center"}}><Bdg color={C.text} bg={C.bg} border={C.border}>{row.total}</Bdg></div></div>))}</div>)}
//       {view==="byAssoc"&&(<div style={{display:"flex",flexDirection:"column",gap:8}}>{displayAssocs.map(a=>(<div key={a.badge} style={{background:C.surface,border:`1.5px solid ${editAssoc?.badge===a.badge?C.green:C.border}`,borderRadius:12,padding:"0.9rem 1rem"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:36,height:36,borderRadius:"50%",background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"0.8rem",flexShrink:0}}>{a.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,fontWeight:600}}>{a.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{a.login} · {a.badge} · {a.operation_mode}</div></div><Bdg>{(a.permissions||[]).length} paths</Bdg><Btn size="sm" onClick={()=>setEditAssoc(editAssoc?.badge===a.badge?null:a)}>{editAssoc?.badge===a.badge?"Done":"Edit"}</Btn></div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{(a.permissions||[]).length===0&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.faint}}>No permissions — click Edit to add</span>}{(a.permissions||[]).map(p=>(<div key={p.path_name} style={{background:LC_BG(p.lc_level),border:`1.5px solid ${LC_BORDER(p.lc_level)}`,borderRadius:6,padding:"2px 7px",display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.text}}>{p.path_name}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",fontWeight:700,color:LC_COLOR(p.lc_level)}}>L{p.lc_level}</span>{editAssoc?.badge===a.badge&&<button onClick={()=>{setEditPerm({...p});}} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:"0.6rem",padding:"0 2px"}}>✏</button>}{editAssoc?.badge===a.badge&&<button onClick={()=>delPerm(a.badge,p.path_name)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:"0.6rem",padding:"0 2px"}}>✕</button>}</div>))}</div>{editAssoc?.badge===a.badge&&(<div style={{marginTop:10,borderTop:`1px solid ${C.border}`,paddingTop:10}}>{editPerm&&(<div style={{background:C.amberBg,border:`1px solid ${C.amberBorder}`,borderRadius:8,padding:"0.75rem",marginBottom:8}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.amber,marginBottom:6}}>Edit: {editPerm.path_name}</div><div style={{display:"flex",gap:6,alignItems:"center"}}><Sel value={editPerm.lc_level} onChange={e=>setEditPerm({...editPerm,lc_level:parseInt(e.target.value)})} style={{width:120}}>{[1,2,3,4,5].map(l=><option key={l} value={l}>L{l} — {LC_LABEL(l)}</option>)}</Sel><Btn variant="primary" size="sm" onClick={saveEdit}>Save</Btn><Btn size="sm" onClick={()=>setEditPerm(null)}>Cancel</Btn></div></div>)}{addingPerm?(<div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:8,padding:"0.75rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.green,marginBottom:6}}>Add Permission</div><div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><Sel value={nPerm.path_name} onChange={e=>setNPerm({...nPerm,path_name:e.target.value})} style={{flex:1,minWidth:140}}><optgroup label="INDIRECT">{indList.map(p=><option key={p} value={p}>{p}</option>)}</optgroup><optgroup label="DIRECT">{dirList.map(p=><option key={p} value={p}>{p}</option>)}</optgroup></Sel><Sel value={nPerm.lc_level} onChange={e=>setNPerm({...nPerm,lc_level:parseInt(e.target.value)})} style={{width:120}}>{[1,2,3,4,5].map(l=><option key={l} value={l}>L{l} — {LC_LABEL(l)}</option>)}</Sel><Btn variant="primary" size="sm" onClick={addPerm}>Add</Btn><Btn size="sm" onClick={()=>setAddingPerm(false)}>Cancel</Btn></div></div>):(<Btn size="sm" variant="primary" onClick={()=>setAddingPerm(true)}>+ Add Permission</Btn>)}</div>)}</div>))}</div>)}
//     </div>
//   );
// }

// // ======================= ASSOCIATES FULL =======================
// function AssociatesFull({dept}) {
//   const [search,setSearch]=useState("");
//   const [opF,setOpF]=useState("ALL");
//   const [shF,setShF]=useState("ALL");
//   const [openId,setOpenId]=useState(null);
//   const [,fu]=useState(0);
//   const filtered=mockAssocs.filter(a=>{const s=search.toLowerCase();return(!search||a.name.toLowerCase().includes(s)||a.login.toLowerCase().includes(s)||a.badge.includes(search))&&(opF==="ALL"||a.operation_mode===opF)&&(shF==="ALL"||a.shift_code===shF);});
//   return(
//     <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>ASSOCIATES · {filtered.length} of {mockAssocs.length}</div></div>
//       <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}><Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, login, badge..." style={{flex:1,minWidth:140}}/><Sel value={opF} onChange={e=>setOpF(e.target.value)} style={{width:130}}><option value="ALL">All Modes</option><option value="INBOUND">Inbound</option><option value="OUTBOUND">Outbound</option><option value="BOTH">Both/Flex</option></Sel><Sel value={shF} onChange={e=>setShF(e.target.value)} style={{width:100}}><option value="ALL">All Shifts</option>{["FHD","BHD","FHN","BHN"].map(s=><option key={s} value={s}>{s}</option>)}</Sel></div>
//       <div style={{display:"flex",flexDirection:"column",gap:7}}>{filtered.map(a=>{const isOpen=openId===a.badge;const deptColor=a.operation_mode==="OUTBOUND"?C.orange:a.operation_mode==="BOTH"?C.teal:C.blue;const onFloor=Object.values(contextBadges).some(ctx=>ctx[a.badge]);return(<div key={a.badge} style={{background:C.surface,border:`1.5px solid ${isOpen?C.greenBorder:C.border}`,borderRadius:12,padding:"0.9rem 1rem",cursor:"pointer"}} onClick={()=>setOpenId(isOpen?null:a.badge)}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:38,height:38,borderRadius:"50%",background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"0.85rem",flexShrink:0}}>{a.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{flex:1,minWidth:0}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.78rem",color:C.text,fontWeight:600}}>{a.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{a.login} · {a.badge}</div></div><div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}><Bdg color={C.sub} bg={C.bg} border={C.border}>{a.shift_code}</Bdg><Bdg color={deptColor} bg={C.bg} border={C.border}>{a.operation_mode}</Bdg><Bdg>{(a.permissions||[]).length} paths</Bdg>{onFloor&&<Bdg color={C.amber} bg={C.amberBg} border={C.amberBorder}>ON FLOOR</Bdg>}</div></div>{isOpen&&(<div style={{marginTop:"1rem",paddingTop:"1rem",borderTop:`1px solid ${C.bg}`}}><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.56rem",color:C.faint,letterSpacing:"0.15em",marginBottom:5}}>PERMISSIONS</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{(a.permissions||[]).length===0?<span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.faint}}>None — add in Permissions tab</span>:(a.permissions||[]).map(p=><div key={p.path_name} style={{background:LC_BG(p.lc_level),border:`1.5px solid ${LC_BORDER(p.lc_level)}`,borderRadius:6,padding:"3px 8px",display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{p.path_name}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:700,color:LC_COLOR(p.lc_level)}}>{p.lc_level}</span></div>)}</div></div></div>)}</div>);})}{filtered.length===0&&<div style={{textAlign:"center",padding:"2rem",fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.faint}}>No associates match filters.</div>}</div>
//     </div>
//   );
// }



// function AssignHistory(){
//   const [search,setSearch]=useState("");
//   const [dateF,setDateF]=useState("");
//   const [roleF,setRoleF]=useState("ALL");
//   const [deptF,setDeptF]=useState("ALL");
//   const [halfF,setHalfF]=useState("ALL");
//   const [,tick]=useState(0);
//   useEffect(()=>{const t=setInterval(()=>tick(n=>n+1),5000);return()=>clearInterval(t);},[]);
//   pruneOldHistory();
//   const seedH=[]; Object.entries(weekHistory).forEach(([badge,entries])=>{const a=mockAssocs.find(x=>x.badge===badge);if(!a)return;entries.forEach(e=>seedH.push({badge,login:a.login,name:a.name,path:e.pathName,roleType:e.roleType,method:"HISTORY",assignedAt:0,staffDate:e.date,shiftType:e.shiftType||"—",dept:e.dept||"INBOUND",half:e.half||"half1",station:null}));});
//   const combined=[...assignHistory,...seedH.filter(s=>!assignHistory.find(h=>h.badge===s.badge&&h.staffDate===s.staffDate&&h.path===s.path&&h.half===s.half))].reverse();
//   const filtered=combined.filter(e=>{const q=search.toLowerCase();return(!search||e.name?.toLowerCase().includes(q)||e.login?.toLowerCase().includes(q)||e.badge?.includes(search)||e.path?.toLowerCase().includes(q))&&(!dateF||e.staffDate===dateF)&&(roleF==="ALL"||(roleF==="DIRECT"&&isDirect(e.path))||(roleF==="INDIRECT"&&isInd(e.path)))&&(deptF==="ALL"||e.dept===deptF)&&(halfF==="ALL"||e.half===halfF);});
//   const byA={}; filtered.forEach(e=>{if(!byA[e.badge])byA[e.badge]={badge:e.badge,login:e.login,name:e.name,entries:[]};byA[e.badge].entries.push(e);});
//   const groups=Object.values(byA).sort((a,b)=>a.name?.localeCompare(b.name));
//   return(
//     <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1rem"}}>ASSIGNMENT HISTORY · ROLLING 14 DAYS</div>
//       <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{flex:1,minWidth:160}}/><input type="date" value={dateF} onChange={e=>setDateF(e.target.value)} style={{padding:"0.6rem 0.8rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",background:"#f9fafb"}}/><div style={{display:"flex",background:C.bg,borderRadius:8,overflow:"hidden"}}>{["ALL","DIRECT","INDIRECT"].map(r=><button key={r} onClick={()=>setRoleF(r)} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",border:"none",cursor:"pointer",background:roleF===r?C.green:"transparent",color:roleF===r?"#fff":C.muted}}>{r}</button>)}</div><div style={{display:"flex",background:C.bg,borderRadius:8,overflow:"hidden"}}>{["ALL","INBOUND","OUTBOUND"].map(d=><button key={d} onClick={()=>setDeptF(d)} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",border:"none",cursor:"pointer",background:deptF===d?C.blue:"transparent",color:deptF===d?"#fff":C.muted}}>{d}</button>)}</div><div style={{display:"flex",background:C.bg,borderRadius:8,overflow:"hidden"}}>{[{v:"ALL",l:"ALL"},{v:"half1",l:"1ST"},{v:"half2",l:"2ND"}].map(h=><button key={h.v} onClick={()=>setHalfF(h.v)} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",border:"none",cursor:"pointer",background:halfF===h.v?C.teal:"transparent",color:halfF===h.v?"#fff":C.muted}}>{h.l}</button>)}</div>{(search||dateF||roleF!=="ALL"||deptF!=="ALL"||halfF!=="ALL")&&<Btn size="sm" onClick={()=>{setSearch("");setDateF("");setRoleF("ALL");setDeptF("ALL");setHalfF("ALL");}}>Clear</Btn>}</div>
//       {groups.length===0&&<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>📋</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>No history yet — scan in associates to populate.</div></div>}
//       <div style={{display:"flex",flexDirection:"column",gap:8}}>{groups.map(g=>(<div key={g.badge} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"0.9rem 1rem"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:36,height:36,borderRadius:"50%",background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"0.8rem",flexShrink:0}}>{g.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"??"}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,fontWeight:600}}>{g.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{g.login} · {g.badge}</div></div><Bdg>{g.entries.length} record{g.entries.length!==1?"s":""}</Bdg></div><div style={{display:"flex",flexDirection:"column",gap:4}}>{g.entries.map((e,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"0.45rem 0.75rem",background:e.half==="half2"?C.tealBg:C.bg,borderRadius:8,flexWrap:"wrap",border:`1px solid ${e.half==="half2"?C.tealBorder:C.border}`}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:e.half==="half2"?C.teal:C.muted,fontWeight:700,minWidth:36}}>{e.half==="half2"?"2ND":"1ST"}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.text,fontWeight:600,minWidth:120}}>{e.path}</div>{e.station&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>Stn {e.station}</div>}<Bdg color={isDirect(e.path)?C.blue:C.purple}>{isDirect(e.path)?"DIRECT":"INDIRECT"}</Bdg><Bdg color={e.dept==="OUTBOUND"?C.orange:C.blue}>{e.dept||"INBOUND"}</Bdg><Bdg color={e.method==="MANUAL"?C.amber:C.green}>{e.method||"SCAN"}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.teal,marginLeft:"auto"}}>{e.staffDate}</div><Bdg color={e.shiftType==="DAY"?C.amber:e.shiftType==="NIGHT"?C.purple:C.muted}>{e.shiftType||"—"}</Bdg></div>))}</div></div>))}</div>
//     </div>
//   );
// }

// // ======================= SEARCH LOOKUP (unchanged) =======================
// // ======================= SEARCH LOOKUP =======================
// function SearchLookup(){
//   const [query,setQuery]=useState("");
//   const [result,setResult]=useState(null);
//   const [searched,setSearched]=useState(false);
//   function doSearch(){ if(!query.trim()){setResult(null);setSearched(false);return;} const q=query.trim().toLowerCase(); const assoc=mockAssocs.find(a=>a.badge===query.trim()||a.login===q||a.name.toLowerCase().includes(q)); setSearched(true); if(!assoc){setResult(null);return;} const allAssigns=[]; assignHistory.filter(e=>e.badge===assoc.badge).forEach(e=>allAssigns.push({...e,source:"live"})); (weekHistory[assoc.badge]||[]).forEach(e=>{const already=allAssigns.find(a=>a.staffDate===e.date&&a.path===e.pathName&&a.half===e.half);if(!already) allAssigns.push({badge:assoc.badge,login:assoc.login,name:assoc.name,path:e.pathName,roleType:e.roleType,staffDate:e.date,shiftType:e.shiftType||"—",dept:e.dept||"INBOUND",half:e.half||"half1",method:"HISTORY",station:null,source:"history"});}); Object.entries(shiftAssignments).forEach(([sKey,assigns])=>{const sa=assigns[assoc.badge];if(!sa)return;const [dept,date,shiftType]=sKey.split("|");["half1","half2"].forEach(half=>{const hd=sa[half];if(!hd||hd.path==="SEE ADMIN")return;const already=allAssigns.find(a=>a.staffDate===date&&a.path===hd.path&&a.half===half);if(!already) allAssigns.push({badge:assoc.badge,login:assoc.login,name:assoc.name,path:hd.path,roleType:hd.roleType,staffDate:date,shiftType,dept,half,method:"SCAN",station:hd.station?.name||null,source:"session"});});}); allAssigns.sort((a,b)=>b.staffDate.localeCompare(a.staffDate)); setResult({assoc,assignments:allAssigns}); }
//   const deptColor=result?.assoc?.operation_mode==="OUTBOUND"?C.orange:result?.assoc?.operation_mode==="BOTH"?C.teal:C.blue;
//   return(<div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1rem"}}>EMPLOYEE LOOKUP</div><div style={{display:"flex",gap:8,marginBottom:"1.5rem"}}><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder="Badge or login..." style={{flex:1,padding:"0.75rem 1rem",border:`1.5px solid ${C.border}`,borderRadius:10,fontFamily:"'DM Mono',monospace",fontSize:"0.8rem",background:"#f9fafb"}}/><Btn variant="primary" onClick={doSearch}>🔍 Search</Btn>{query&&<Btn onClick={()=>{setQuery("");setResult(null);setSearched(false);}}>Clear</Btn>}</div>{searched&&!result&&(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.redBorder}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>⚠️</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.red}}>NOT FOUND</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.muted}}>No associate matches "{query}"</div></div>)}{result&&(<div><div style={{background:C.surface,border:`1.5px solid ${C.greenBorder}`,borderRadius:14,padding:"1.1rem 1.25rem",marginBottom:"1.25rem"}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:48,height:48,borderRadius:"50%",background:C.greenBg,border:`2px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"1.1rem",flexShrink:0}}>{result.assoc.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{flex:1}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:C.text,lineHeight:1}}>{result.assoc.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.muted}}>{result.assoc.login} · Badge {result.assoc.badge}</div></div><div style={{display:"flex",gap:6}}><Bdg>{result.assoc.shift_code}</Bdg><Bdg color={deptColor}>{result.assoc.operation_mode}</Bdg><Bdg>{(result.assoc.permissions||[]).length} paths</Bdg></div></div></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.2em",marginBottom:10}}>ASSIGNMENT HISTORY · {result.assignments.length} records</div>{result.assignments.length===0?(<div style={{textAlign:"center",padding:"2rem",background:C.surface,borderRadius:12}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.faint}}>No assignment records found.</div></div>):(<div style={{display:"flex",flexDirection:"column",gap:5}}>{result.assignments.map((e,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"0.55rem 0.9rem",background:e.half==="half2"?C.tealBg:C.surface,borderRadius:10,border:`1.5px solid ${e.half==="half2"?C.tealBorder:C.border}`,flexWrap:"wrap"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:e.half==="half2"?C.teal:C.muted,fontWeight:700,minWidth:36}}>{e.half==="half2"?"2ND":"1ST"}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",color:C.text,fontWeight:600,flex:1,minWidth:130}}>{e.path}</div>{e.station&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted}}>Stn {e.station}</div>}<Bdg color={isDirect(e.path)?C.blue:C.purple}>{isDirect(e.path)?"DIRECT":"INDIRECT"}</Bdg><Bdg color={e.dept==="OUTBOUND"?C.orange:C.blue}>{e.dept||"INBOUND"}</Bdg><Bdg color={e.shiftType==="DAY"?C.amber:e.shiftType==="NIGHT"?C.purple:C.muted}>{e.shiftType||"—"}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.teal}}>{e.staffDate}</div></div>))}</div>)}</div>)}{!searched&&(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`,opacity:0.7}}><div style={{fontSize:"1.8rem",marginBottom:8}}>🔍</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>Enter a badge number or login to look up assignments</div></div>)}</div>);
// }


// // ======================= REPORT (unchanged) =======================
// // ======================= REPORT =======================
// function Report({dept,staffDate,shiftType}){
//   const [,fu]=useState(0);
//   const [reportView,setReportView]=useState("assignments");
//   useEffect(()=>{const t=setInterval(()=>fu(n=>n+1),5000);return()=>clearInterval(t);},[]);
//   const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
//   const ctx=`${dateStr}|${shiftType}|${dept}`;
//   const ctxAssigns=contextStations[ctx]||{};
//   const rows=Object.entries(ctxAssigns).map(([sid,a])=>{const station=floorStations.find(s=>s.id===parseInt(sid)); const line=station?floorLines.find(l=>l.id===station.line_id):null; const path=line?floorPaths.find(p=>p.id===line.path_id):null; const audit = (window.auditLogGlobal || []).find(e=>e.badge===a.badge && e.station===(station?.name||"") && e.dept===dept); return {badge:a.badge||"",name:a.name||"",login:a.login||"",path:a.path||path?.name||"",line:line?.name||"",station:station?.name||"",method:a.method||"",dept,shiftType,date:dateStr,changedBy:audit?.who||"AUTO",changedAt:audit?.ts?new Date(audit.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}; }).sort((a,b)=>a.path.localeCompare(b.path));
//   const auditRows = (window.auditLogGlobal || []).filter(e=>e.dept===dept && e.date===dateStr);
//   function downloadCSV(){ const headers=["Date","Shift","Dept","Badge","Name","Login","Path","Line","Station","Method","ChangedBy","ChangedAt"]; const csvRows=[headers.join(","),...rows.map(r=>[r.date,r.shiftType,r.dept,r.badge,`"${r.name}"`,r.login,`"${r.path}"`,`"${r.line}"`,r.station,r.method,`"${r.changedBy}"`,r.changedAt].join(","))]; const blob=new Blob([csvRows.join("\n")],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a");a.href=url;a.download=`floor-report-${dept}-${dateStr}-${shiftType}.csv`;a.click();URL.revokeObjectURL(url); }
//   function downloadAuditCSV(){ const headers=["Timestamp","Action","Who","Badge","Associate","Station","Path","Shift","Dept"]; const csvRows=[headers.join(","),...auditRows.map(r=>[r.ts,r.action,`"${r.who}"`,r.badge,`"${r.name}"`,r.station,`"${r.path}"`,r.shiftType,r.dept].join(","))]; const blob=new Blob([csvRows.join("\n")],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a");a.href=url;a.download=`audit-log-${dept}-${dateStr}-${shiftType}.csv`;a.click();URL.revokeObjectURL(url); }
//   const deptColor=dept==="OUTBOUND"?C.orange:C.blue; const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;
//   return(<div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>REPORT · TEN1 · {dept} · {shiftType} · {dateStr}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.sub,marginTop:2}}>{rows.length} on floor · {auditRows.length} audit events</div></div><div style={{display:"flex",gap:6}}>{reportView==="assignments"?<Btn variant="primary" onClick={downloadCSV}>⬇ Floor CSV</Btn>:<Btn variant="primary" onClick={downloadAuditCSV}>⬇ Audit CSV</Btn>}</div></div><div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden",marginBottom:"1rem",width:"fit-content"}}>{[{v:"assignments",l:"📋 Floor Assignments"},{v:"audit",l:"🔍 Audit Log"}].map(t=>(<button key={t.v} onClick={()=>setReportView(t.v)} style={{padding:"6px 14px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,border:"none",cursor:"pointer",background:reportView===t.v?deptColor:"transparent",color:reportView===t.v?"#fff":C.muted}}>{t.l}</button>))}</div>{reportView==="assignments"&&(rows.length===0?(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>📋</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>No assignments yet for this shift.</div></div>):(<div style={{background:C.surface,border:`1.5px solid ${deptBorder}`,borderRadius:12,overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"80px 1fr 90px 1fr 70px 1fr",gap:0,background:C.bg,padding:"0.5rem 1rem",borderBottom:`1px solid ${C.border}`}}>{["BADGE","NAME","PATH","LINE / STATION","METHOD","CHANGED BY"].map(h=>(<div key={h} style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{h}</div>))}</div>{rows.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 90px 1fr 70px 1fr",gap:0,padding:"0.55rem 1rem",borderBottom:i<rows.length-1?`1px solid ${C.border}`:"none",background:i%2===0?C.surface:"#fafafa",alignItems:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted}}>{r.badge}</div><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.67rem",color:C.text,fontWeight:600}}>{r.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.54rem",color:C.muted}}>{r.login}</div></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:deptColor,fontWeight:600}}>{r.path}</div><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{r.line}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>Stn {r.station}</div></div><Bdg color={r.method==="MANUAL"?C.amber:C.green} style={{fontSize:"0.5rem"}}>{r.method}</Bdg><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{r.changedBy}</div>{r.changedAt&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.54rem",color:C.muted}}>{r.changedAt}</div>}</div></div>))}</div>))}{reportView==="audit"&&(auditRows.length===0?(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>🔍</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>No audit events yet.</div></div>):(<div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"70px 80px 1fr 1fr 90px",gap:0,background:C.bg,padding:"0.5rem 1rem",borderBottom:`1px solid ${C.border}`}}>{["TIME","ACTION","WHO","ASSOCIATE · STATION","SHIFT"].map(h=>(<div key={h} style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{h}</div>))}</div>{auditRows.map((e,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 80px 1fr 1fr 90px",gap:0,padding:"0.55rem 1rem",borderBottom:i<auditRows.length-1?`1px solid ${C.border}`:"none",background:i%2===0?C.surface:"#fafafa",alignItems:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{new Date(e.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div><Bdg color={e.action==="CLEAR"?C.red:e.action==="PRE-STAFF"?C.purple:C.amber} bg={e.action==="CLEAR"?C.redBg:e.action==="PRE-STAFF"?C.purpleBg:C.amberBg} border={e.action==="CLEAR"?C.redBorder:e.action==="PRE-STAFF"?C.purpleBorder:C.amberBorder} style={{fontSize:"0.5rem"}}>{e.action}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{e.who}</div><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text,fontWeight:600}}>{e.name} · Stn {e.station}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.54rem",color:C.muted}}>{e.path}</div></div><Bdg color={C.sub} bg={C.bg} border={C.border} style={{fontSize:"0.5rem"}}>{e.shiftType}</Bdg></div>))}</div>))}</div>);
// }

// // ======================= SETTINGS (unchanged) =======================

// // ======================= SETTINGS =======================
// function Settings({onAdminChange, apiUrl}) {
//   const [stab,setStab]=useState("admins");
//   const [,fu]=useState(0);const tick=()=>fu(n=>n+1);
//   const [adminProfiles,setAdminProfiles] = useState([]);
//   const [newAdmin,setNewAdmin]=useState({name:"",role:"Manager",login:"",pin:""});
//   const [adminErr,setAdminErr]=useState("");
//   const [pathPriorities,setPathPriorities] = useState([]);
//   const [uploadMsg,setUploadMsg]=useState("");
//   const [uploadErr,setUploadErr]=useState("");
//   const empRef=useRef(null);
//   const permRef=useRef(null);
//   const [currentAdmin, setCurrentAdmin] = useState(null);

//   useEffect(() => {
//     fetch(`${apiUrl}/admin/profiles`).then(r=>r.json()).then(setAdminProfiles).catch(()=>{});
//     fetch(`${apiUrl}/path-priorities`).then(r=>r.json()).then(setPathPriorities).catch(()=>{});
//     const session = JSON.parse(localStorage.getItem("ct_admin_session")||"null");
//     setCurrentAdmin(session);
//   }, [apiUrl]);

//   async function addAdmin(){
//     if(!newAdmin.name.trim()){setAdminErr("Name required.");return;}
//     if(!newAdmin.login.trim()){setAdminErr("Login required.");return;}
//     if(!newAdmin.pin.trim()){setAdminErr("PIN required.");return;}
//     const res = await fetch(`${apiUrl}/admin/profiles`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(newAdmin)});
//     if(res.ok){
//       const updated = await fetch(`${apiUrl}/admin/profiles`).then(r=>r.json());
//       setAdminProfiles(updated);
//       setNewAdmin({name:"",role:"Manager",login:"",pin:""});
//       setAdminErr("");
//     } else { const err = await res.json(); setAdminErr(err.error || "Failed to add profile"); }
//   }
//   async function removeAdmin(id){
//     if(!window.window.window.confirm("Remove this admin profile?"))return;
//     await fetch(`${apiUrl}/admin/profiles/${id}`, {method:"DELETE"});
//     const updated = await fetch(`${apiUrl}/admin/profiles`).then(r=>r.json());
//     setAdminProfiles(updated);
//     const session = JSON.parse(localStorage.getItem("ct_admin_session")||"null");
//     if(session && session.id === id){
//       localStorage.removeItem("ct_admin_session");
//       if(onAdminChange) onAdminChange(null);
//     }
//     tick();
//   }
//   async function updatePathPriority(id, priority){
//     await fetch(`${apiUrl}/path-priorities/${id}`, {method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({priority})});
//     const updated = await fetch(`${apiUrl}/path-priorities`).then(r=>r.json());
//     setPathPriorities(updated);
//     const fp = floorPaths.find(p=>p.id === id);
//     if(fp) fp.priority = priority;
//     tick();
//   }
//   function parseCSV(text){ const lines=text.trim().split(/\r?\n/); const headers=lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,"").toLowerCase()); return lines.slice(1).filter(l=>l.trim()).map(l=>{ const vals=[];let cur="",inQ=false; for(const ch of l){if(ch==='"'){inQ=!inQ;}else if(ch===","&&!inQ){vals.push(cur.trim());cur="";}else cur+=ch;} vals.push(cur.trim()); const obj={};headers.forEach((h,i)=>obj[h]=vals[i]?.replace(/^"|"$/g,"")||""); return obj; }); }
//   function uploadEmployees(e){ const file=e.target.files[0];if(!file)return; const reader=new FileReader(); reader.onload=ev=>{ try{ const rows=parseCSV(ev.target.result); let added=0,updated=0; rows.forEach(r=>{ const badge=(r.badge||r["badge"]||"").trim(); const login=(r.login||"").trim(); const name=(r.name||"").trim(); const empId=(r["employee id"]||r["employeeid"]||r["employee_id"]||"").trim(); const jobTitle=(r["job title"]||r["jobtitle"]||r["job_title"]||"").trim(); const dept=(r.department||r.dept||"").trim(); const manager=(r.manager||"").trim(); if(!badge||!login||!name) return; const existing=mockAssocs.find(a=>a.badge===badge); if(existing){ existing.login=login||existing.login; existing.name=name||existing.name; if(dept) existing.home_dept=dept; if(manager) existing.manager=manager; if(jobTitle) existing.job_title=jobTitle; if(empId) existing.employee_id=empId; updated++; } else { mockAssocs.push({ badge,login,name, employee_id:empId,job_title:jobTitle, home_dept:dept,manager, shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND", permissions:[],weekHours:[],yesterdayRoles:[],active:1 }); api("/associates",{method:"POST",body:JSON.stringify({badge,login,name,home_dept:dept||"CRETS Processing",manager,shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND"})}); added++; } }); setUploadMsg(`✅ Employees: ${added} added, ${updated} updated.`);setUploadErr(""); }catch(err){setUploadErr("Failed to parse CSV: "+err.message);setUploadMsg("");} empRef.current.value=""; tick(); }; reader.readAsText(file); }
//   function uploadPermissions(e){ const file=e.target.files[0];if(!file)return; const reader=new FileReader(); reader.onload=ev=>{ try{ const rows=parseCSV(ev.target.result); let added=0,skipped=0; rows.forEach(r=>{ const badge=(r.badge||"").trim(); const pathName=(r["path name"]||r["path_name"]||r.path||"").trim(); const lc=parseInt(r["lc level"]||r["lc_level"]||r.lc||"1")||1; if(!badge||!pathName) return; const assoc=mockAssocs.find(a=>a.badge===badge); if(!assoc) return; const existing=(assoc.permissions||[]).find(p=>p.path_name===pathName); if(existing){skipped++;return;} if(!assoc.permissions) assoc.permissions=[]; assoc.permissions.push({path_name:pathName,lc_level:lc}); api("/permissions",{method:"POST",body:JSON.stringify({badge,path_id:pathName,lc_level:lc})}); added++; }); setUploadMsg(`✅ Permissions: ${added} added, ${skipped} already existed (kept).`);setUploadErr(""); }catch(err){setUploadErr("Failed to parse CSV: "+err.message);setUploadMsg("");} permRef.current.value=""; tick(); }; reader.readAsText(file); }
//   const inboundPaths = pathPriorities.filter(p => p.mode === "INBOUND" || p.mode === "BOTH").sort((a,b)=>b.priority - a.priority);
//   const outboundPaths = pathPriorities.filter(p => p.mode === "OUTBOUND" || p.mode === "BOTH").sort((a,b)=>b.priority - a.priority);
//   return(<div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1rem"}}>SETTINGS · TEN1</div><div style={{display:"flex",gap:4,marginBottom:"1.25rem",borderBottom:`1px solid ${C.border}`,paddingBottom:0,flexWrap:"wrap"}}>{[{id:"admins",l:"👤 Admin Profiles"},{id:"shifts",l:"⏱ Shift Times"},{id:"upload",l:"📤 CSV Upload"},{id:"priorities",l:"🎯 Path Priorities"}].map(t=>(<button key={t.id} onClick={()=>setStab(t.id)} style={{background:"transparent",border:"none",borderBottom:`2px solid ${stab===t.id?C.blue:"transparent"}`,padding:"8px 14px",fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:stab===t.id?C.blue:C.muted,cursor:"pointer"}}>{t.l}</button>))}</div>
//     {stab==="admins"&&(<div><div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1rem",marginBottom:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>ADD PROFILE</div>{adminErr&&<div style={{background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:8,padding:"0.5rem 0.8rem",marginBottom:8,fontSize:"0.62rem",color:C.red}}>{adminErr}</div>}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 100px 80px",gap:8,marginBottom:8}}><Inp value={newAdmin.name} onChange={e=>setNewAdmin({...newAdmin,name:e.target.value})} placeholder="Full name"/><Inp value={newAdmin.login} onChange={e=>setNewAdmin({...newAdmin,login:e.target.value.trim()})} placeholder="Login"/><Inp type="password" value={newAdmin.pin} onChange={e=>setNewAdmin({...newAdmin,pin:e.target.value})} placeholder="PIN"/><Sel value={newAdmin.role} onChange={e=>setNewAdmin({...newAdmin,role:e.target.value})}><option value="Manager">Manager</option><option value="Admin PA">Admin PA</option></Sel></div><Btn variant="primary" onClick={addAdmin}>+ Add Profile</Btn></div>{adminProfiles.length===0?(<div style={{textAlign:"center",padding:"2rem",background:C.surface,borderRadius:12}}>No profiles yet</div>):(<div style={{display:"flex",flexDirection:"column",gap:6}}>{adminProfiles.map(a=>{ const isSelf = currentAdmin && currentAdmin.id === a.id; return(<div key={a.id} style={{display:"flex",alignItems:"center",gap:10,background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.75rem 1rem"}}><div style={{width:36,height:36,borderRadius:"50%",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{a.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{flex:1}}><div style={{fontWeight:600}}>{a.name}</div><div style={{fontSize:"0.58rem",color:C.muted}}>{a.login} · {a.role}</div></div>{!isSelf && <Btn size="sm" variant="danger" onClick={()=>removeAdmin(a.id)}>✕</Btn>}{isSelf && <Bdg color={C.green} bg={C.greenBg} border={C.greenBorder}>YOU</Bdg>}</div>);})}</div>)}</div>)}
//     {stab==="shifts"&&(<div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.sub,marginBottom:"1rem"}}>Shift windows used for hour calculations and auto-reset. 1st/2nd half split at midpoint.</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{Object.entries(SHIFT_TIMES).map(([code,depts])=>(<div key={code} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:"0.75rem",color:C.text,marginBottom:8}}>{code}</div>{Object.entries(depts).map(([d,t])=>{const dur=shiftDurationHours(code,d); const startMins=t.h*60+t.m; const endMins=t.endH*60+t.endM+(t.endH*60+t.endM<=startMins?24*60:0); const midMins=(startMins+endMins)/2; const midH=Math.floor(midMins/60)%24; const midM=Math.round(midMins%60); const fmt=(h,m)=>`${h%12||12}:${String(m).padStart(2,"0")} ${h<12||h===24?"AM":"PM"}`; return(<div key={d} style={{display:"flex",alignItems:"center",gap:10,padding:"0.5rem 0",borderTop:`1px solid ${C.border}`}}><Bdg color={d==="OUTBOUND"?C.orange:C.blue} bg={d==="OUTBOUND"?C.orangeBg:C.blueBg} border={d==="OUTBOUND"?C.orangeBorder:C.blueBorder} style={{minWidth:70,justifyContent:"center"}}>{d}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.text,flex:1}}>{fmt(t.h,t.m)} → {fmt(t.endH,t.endM)}{t.endH*60+t.endM<=t.h*60+t.m?" (+1 day)":""}</div><Bdg color={C.teal} bg={C.tealBg} border={C.tealBorder}>{dur.toFixed(1)}h</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>Half split: {fmt(midH,midM)}</div></div>);})}</div>))}</div></div>)}
//     {stab==="upload"&&(<div>{uploadMsg&&<div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:8,padding:"0.65rem 1rem",marginBottom:"1rem",fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.green}}>{uploadMsg}</div>}{uploadErr&&<div style={{background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:8,padding:"0.65rem 1rem",marginBottom:"1rem",fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.red}}>{uploadErr}</div>}<div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1.1rem",marginBottom:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",fontWeight:700,color:C.text,marginBottom:6}}>👥 EMPLOYEE CSV UPLOAD</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,marginBottom:10,lineHeight:1.6}}>Required columns: <strong>Badge, Login, Name, Department, Manager, Job Title, Employee ID</strong><br/>Merge rule: adds new, updates existing, keeps associates not in file.</div><input ref={empRef} type="file" accept=".csv" onChange={uploadEmployees} style={{display:"none"}}/><Btn variant="primary" onClick={()=>empRef.current.click()}>📂 Choose Employee CSV</Btn></div><div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1.1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",fontWeight:700,color:C.text,marginBottom:6}}>🔐 PERMISSIONS CSV UPLOAD</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,marginBottom:10,lineHeight:1.6}}>Required columns: <strong>Badge, Path Name, LC Level</strong><br/>Merge rule: adds new permissions only. Existing permissions are never overwritten.</div><input ref={permRef} type="file" accept=".csv" onChange={uploadPermissions} style={{display:"none"}}/><Btn variant="primary" onClick={()=>permRef.current.click()}>📂 Choose Permissions CSV</Btn></div></div>)}
//     {stab==="priorities"&&(<div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.sub,marginBottom:"1rem"}}>Path priority determines assignment score. <strong>10 = highest priority, 1 = lowest.</strong> Changes take effect immediately.</div>
//       <div style={{marginBottom:"1.5rem",background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}><div style={{background:C.blueBg,padding:"0.6rem 1rem",fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:"0.7rem",color:C.blue}}>📥 INBOUND PATHS</div><div style={{padding:"0.5rem"}}>{inboundPaths.map(p=>(<div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"0.5rem 0.75rem",borderBottom:`1px solid ${C.border}`}}><div style={{flex:1,fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.text}}>{p.name}</div><input type="number" min="1" max="10" value={p.priority} onChange={e=>updatePathPriority(p.id, parseInt(e.target.value))} style={{width:70,padding:"0.3rem 0.5rem",border:`1.5px solid ${C.border}`,borderRadius:6,fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",textAlign:"center"}} /></div>))}{inboundPaths.length===0&&<div style={{padding:"1rem",textAlign:"center",color:C.muted}}>No inbound paths found.</div>}</div></div>
//       <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}><div style={{background:C.orangeBg,padding:"0.6rem 1rem",fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:"0.7rem",color:C.orange}}>📤 OUTBOUND PATHS</div><div style={{padding:"0.5rem"}}>{outboundPaths.map(p=>(<div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"0.5rem 0.75rem",borderBottom:`1px solid ${C.border}`}}><div style={{flex:1,fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.text}}>{p.name}</div><input type="number" min="1" max="10" value={p.priority} onChange={e=>updatePathPriority(p.id, parseInt(e.target.value))} style={{width:70,padding:"0.3rem 0.5rem",border:`1.5px solid ${C.border}`,borderRadius:6,fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",textAlign:"center"}} /></div>))}{outboundPaths.length===0&&<div style={{padding:"1rem",textAlign:"center",color:C.muted}}>No outbound paths found.</div>}</div></div>
//     </div>)}
//   </div>);
// }

// // ======================= MAIN APP =======================
// export default function App(){
//   const [tab,setTab]=useState("kiosk");
//   const [log,setLog]=useState([]);
//   const [clock,setClock]=useState(fmtTime());
//   const [shiftType,setShiftType]=useState("DAY");
//   const [staffDate,setStaffDate]=useState(new Date());
//   const [datePicker,setDatePicker]=useState(false);
//   const [dateInput,setDateInput]=useState(new Date().toISOString().split("T")[0]);
//   const [live,setLive]=useState(false);
//   const [resetModal,setResetModal]=useState(false);
//   const [dept,setDept]=useState("INBOUND");
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [activeAdmin, setActiveAdmin] = useState(null);
//   const [laborShareEnabled, setLaborShareEnabled] = useState(false);
//   const [laborShareCount, setLaborShareCount] = useState(0);
//   const [crossDeptUsage, setCrossDeptUsage] = useState({});
//   const incrementCrossDept = (key) => { setCrossDeptUsage(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 })); };
//   const getCrossDeptUsed = (key) => crossDeptUsage[key] || 0;

//   useEffect(()=>{const t=setInterval(()=>setClock(fmtTime()),1000);return()=>clearInterval(t);},[]);
//   useEffect(()=>{const chk=async()=>{const r=await api("/system");if(r)setLive(true);else setLive(false);};chk();const t=setInterval(chk,20000);return()=>clearInterval(t);},[]);

//   // Load associates from backend on startup – REPLACES mockAssocs
//   useEffect(() => {
//     api("/associates").then(data => {
//       if (Array.isArray(data) && data.length) {
//         // Replace mockAssocs with data from backend
//         mockAssocs = data.map(a => ({
//           ...a,
//           permissions: a.permissions || [],
//           weekHours: a.weekHours || [],
//           yesterdayRoles: a.yesterdayRoles || [],
//         }));
//       } else {
//         // If no data, keep the initial mockAssocs (already populated)
//       }
//     });
//   }, []);

//   useEffect(()=>{ const session = localStorage.getItem("ct_admin_session"); if(session){ try{ const parsed = JSON.parse(session); if(parsed.expires && parsed.expires > Date.now()){ setIsAuthenticated(true); setActiveAdmin(parsed); window.activeAdmin = parsed; } else { localStorage.removeItem("ct_admin_session"); setIsAuthenticated(false); } } catch { setIsAuthenticated(false); } } else { setIsAuthenticated(false); } },[]);
//   async function resetShift(){ await api("/reset-shift",{method:"POST"}); const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate; const ctx=`${dateStr}|${shiftType}|${dept}`; clearContextAssignments(ctx); resetShiftConfig(shiftType); setLog([]);setResetModal(false); }
//   function applyDate(){const d=new Date(dateInput+"T00:00:00");if(!isNaN(d))setStaffDate(d);setDatePicker(false);}
//   const handleAuthenticate = (admin) => { setIsAuthenticated(true); setActiveAdmin(admin); window.activeAdmin = admin; };
//   const handleSignOut = () => { localStorage.removeItem("ct_admin_session"); setIsAuthenticated(false); setActiveAdmin(null); window.activeAdmin = null; };
//   const handleLaborShareChange = (enabled, count) => { setLaborShareEnabled(enabled); setLaborShareCount(count); };
//   if (isAuthenticated === false) return <AdminGate onAuthenticate={handleAuthenticate} apiUrl={API} />;
//   if (isAuthenticated === null) return <div style={{ background: C.bg, minHeight: "100vh" }} />;
//   const TABS = [{id:"kiosk",label:"KIOSK",icon:"🔖"},{id:"dashboard",label:"DASHBOARD",icon:"📊"},{id:"map",label:"FLOOR MAP",icon:"🗺"},{id:"perms",label:"PERMISSIONS",icon:"🔐"},{id:"assocs",label:"ASSOCIATES",icon:"👥"},{id:"history",label:"HISTORY",icon:"📋"},{id:"search",label:"SEARCH",icon:"🔍"},{id:"report",label:"REPORT",icon:"📥"},{id:"settings",label:"SETTINGS",icon:"⚙️"}];
//   const deptColor=dept==="OUTBOUND"?C.orange:C.blue; const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;
//   return(<div style={{background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column"}}><style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#e2e4e9;border-radius:2px;}@keyframes fadein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}button:hover{filter:brightness(0.96);}`}</style><div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,flexShrink:0,position:"sticky",top:0,zIndex:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:8,background:deptColor,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"0.75rem"}}>CT</span></div><span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.15rem",letterSpacing:"0.12em",color:C.text}}>CONTROL TOWER</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.57rem",color:C.faint}}>TEN1</span></div><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><DeptToggle dept={dept} setDept={setDept}/><div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>{[{v:"DAY",icon:"☀",c:C.amber},{v:"NIGHT",icon:"🌙",c:C.purple}].map(s=>(<button key={s.v} onClick={()=>setShiftType(s.v)} style={{padding:"5px 11px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,border:"none",cursor:"pointer",background:shiftType===s.v?s.c:"transparent",color:shiftType===s.v?"#fff":C.muted}}>{s.icon} {s.v}</button>))}</div><div style={{position:"relative"}}><button onClick={()=>setDatePicker(!datePicker)} style={{background:C.tealBg,border:`1.5px solid ${C.tealBorder}`,borderRadius:8,padding:"5px 11px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,color:C.teal,cursor:"pointer"}}>📅 {staffDate.toLocaleDateString("en-US",{month:"numeric",day:"numeric",year:"numeric"})}</button>{datePicker&&(<div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"1rem",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:220}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted,marginBottom:8}}>SELECT STAFFING DATE</div><input type="date" value={dateInput} onChange={e=>setDateInput(e.target.value)} style={{width:"100%",padding:"0.6rem 0.8rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",marginBottom:8}}/><div style={{display:"flex",gap:6}}><Btn onClick={()=>setDatePicker(false)}>Cancel</Btn><Btn variant="primary" onClick={applyDate}>Apply</Btn></div></div>)}</div><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:6,height:6,borderRadius:"50%",background:live?C.green:C.faint}}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.57rem",color:C.muted}}>{live?"LIVE":"DEMO"}</span></div>{activeAdmin&&(<div style={{display:"flex",alignItems:"center",gap:5,background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,borderRadius:8,padding:"4px 9px"}}><div style={{width:20,height:20,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:"#fff",fontSize:"0.55rem"}}>{activeAdmin.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.green,fontWeight:600}}>{activeAdmin.name.split(" ")[0]}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{activeAdmin.role}</div><button onClick={handleSignOut} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:"0.7rem",marginLeft:"4px"}}>🚪</button></div>)}<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.sub}}>{clock}</div>{log.length>0&&<Bdg>{log.length} scanned</Bdg>}<Btn size="sm" variant="danger" onClick={()=>setResetModal(true)}>🔄 RESET</Btn></div></div><div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 1rem",display:"flex",gap:2,flexShrink:0,overflowX:"auto"}}>{TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{background:"transparent",border:"none",borderBottom:`2px solid ${tab===t.id?deptColor:"transparent"}`,padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:"0.63rem",color:tab===t.id?deptColor:C.muted,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:"0.78rem"}}>{t.icon}</span>{t.label}</button>))}</div><div style={{flex:1,overflow:"hidden"}}><div style={{height:"100%",overflowY:"auto",animation:"fadein 0.18s ease"}}>{tab==="kiosk"&&<Kiosk onAssign={e=>setLog(p=>[...p,e])} shiftType={shiftType} staffDate={staffDate} laborShareEnabled={laborShareEnabled} laborShareCount={laborShareCount} crossDeptUsage={crossDeptUsage} incrementCrossDept={incrementCrossDept} getCrossDeptUsed={getCrossDeptUsed} />}{tab==="dashboard"&&<Dashboard log={log} shiftType={shiftType} staffDate={staffDate} dept={dept} />}{tab==="map"&&<FloorMap log={log} dept={dept} staffDate={staffDate} shiftType={shiftType} laborShareEnabled={laborShareEnabled} laborShareCount={laborShareCount} crossDeptUsage={crossDeptUsage} incrementCrossDept={incrementCrossDept} getCrossDeptUsed={getCrossDeptUsed} />}{tab==="perms"&&<Permissions dept={dept} />}{tab==="assocs"&&<AssociatesFull dept={dept} />}{tab==="history"&&<AssignHistory />}{tab==="search"&&<SearchLookup />}{tab==="report"&&<Report dept={dept} staffDate={staffDate} shiftType={shiftType} />}{tab==="settings"&&<Settings onAdminChange={setActiveAdmin} apiUrl={API} />}</div></div><Modal open={resetModal} onClose={()=>setResetModal(false)} title="Reset Shift"><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,marginBottom:"1rem"}}>Clears all station assignments for <strong>{dept}</strong> on {fmtDate(staffDate)} ({shiftType}). History is preserved.</div><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn onClick={()=>setResetModal(false)}>Cancel</Btn><Btn variant="danger" onClick={resetShift}>🔄 Reset Shift</Btn></div></Modal></div>);
// }



import { useState, useEffect, useRef } from "react";




const API = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
const C = {
  bg:"#f4f5f7",surface:"#ffffff",border:"#e2e4e9",muted:"#9ba3af",
  text:"#111827",sub:"#6b7280",faint:"#d1d5db",
  green:"#16a34a",greenBg:"#f0fdf4",greenBorder:"#bbf7d0",
  red:"#dc2626",redBg:"#fef2f2",redBorder:"#fecaca",
  blue:"#2563eb",blueBg:"#eff6ff",blueBorder:"#bfdbfe",
  amber:"#d97706",amberBg:"#fffbeb",amberBorder:"#fde68a",
  purple:"#7c3aed",purpleBg:"#f5f3ff",purpleBorder:"#ddd6fe",
  teal:"#0d9488",tealBg:"#f0fdfa",tealBorder:"#99f6e4",
  orange:"#ea580c",orangeBg:"#fff7ed",orangeBorder:"#fed7aa",
};

// ======================= ADMIN GATE =======================
function AdminGate({ onAuthenticate, apiUrl }) {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loginInput, setLoginInput] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", login: "", pin: "", role: "Manager" });

  useEffect(() => {
    fetch(`${apiUrl}/admin/profiles`)
      .then(res => res.json())
      .then(data => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiUrl]);

  const handleLogin = async () => {
    if (!selectedProfile) { setError("Select a profile first"); return; }
    if (loginInput !== selectedProfile.login) { setError("Login doesn't match selected profile"); return; }
    if (!pinInput) { setError("Enter your PIN"); return; }
    const res = await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: loginInput, pin: pinInput })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("ct_admin_session", JSON.stringify({ ...data, expires: Date.now() + 8 * 60 * 60 * 1000 }));
      onAuthenticate(data);
    } else {
      setError(data.error || "Invalid login or PIN");
    }
  };

  const addNewAdmin = async () => {
    if (!newAdmin.name || !newAdmin.login || !newAdmin.pin) { setError("Name, login, and PIN required"); return; }
    const res = await fetch(`${apiUrl}/admin/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin)
    });
    if (res.ok) {
      const updated = await fetch(`${apiUrl}/admin/profiles`).then(r => r.json());
      setProfiles(updated);
      setShowAddForm(false);
      setNewAdmin({ name: "", login: "", pin: "", role: "Manager" });
      setError("");
    } else {
      const err = await res.json();
      setError(err.error || "Failed to add profile");
    }
  };

  if (loading) return <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.8rem", color: C.muted }}>Loading...</div></div>;

  return (
    <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", overflowY: "auto" }}>
      <div style={{ background: C.surface, borderRadius: 20, border: `1.5px solid ${C.border}`, maxWidth: 450, width: "100%", padding: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ width: 50, height: 50, borderRadius: 12, background: C.blue, margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.5rem" }}>CT</span></div>
          <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.6rem", letterSpacing: "0.08em", color: C.text }}>CONTROL TOWER</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginTop: 4 }}>TEN1 · AUTHORIZED ACCESS ONLY</div>
        </div>
        {error && <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "0.6rem", marginBottom: "1rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.red, textAlign: "center" }}>{error}</div>}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 6 }}>SELECT YOUR PROFILE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => { setSelectedProfile(p); setLoginInput(p.login); setPinInput(""); setError(""); }}
                style={{ background: selectedProfile?.id === p.id ? C.blueBg : C.bg, border: `1.5px solid ${selectedProfile?.id === p.id ? C.blueBorder : C.border}`, borderRadius: 10, padding: "0.75rem", cursor: "pointer", textAlign: "left", transition: "all 0.12s" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", fontWeight: 600, color: C.text }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.55rem", color: C.muted }}>{p.role} · @{p.login}</div>
              </button>
            ))}
          </div>
        </div>
        {selectedProfile && (
          <>
            <div style={{ marginBottom: "1rem" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 6 }}>LOGIN</div><input value={loginInput} onChange={e => setLoginInput(e.target.value)} style={{ width: "100%", padding: "0.65rem", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", background: "#f9fafb" }} placeholder="Enter your login" /></div>
            <div style={{ marginBottom: "1.5rem" }}><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 6 }}>PIN</div><input type="password" value={pinInput} onChange={e => setPinInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "0.65rem", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", background: "#f9fafb" }} placeholder="Enter your PIN" /></div>
            <button onClick={handleLogin} style={{ width: "100%", padding: "0.85rem", background: C.blue, border: "none", borderRadius: 10, fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", fontWeight: 600, color: "#fff", cursor: "pointer" }}>ACCESS CONTROL TOWER →</button>
          </>
        )}
        <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}><button onClick={() => setShowAddForm(!showAddForm)} style={{ background: "none", border: "none", color: C.blue, fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", cursor: "pointer" }}>{showAddForm ? "− Cancel" : "+ First Time? Add Admin Profile"}</button></div>
        {showAddForm && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: C.bg, borderRadius: 10 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 8 }}>NEW ADMIN PROFILE</div>
            <input value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} placeholder="Full Name" style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }} />
            <input value={newAdmin.login} onChange={e => setNewAdmin({...newAdmin, login: e.target.value})} placeholder="Login" style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }} />
            <input type="password" value={newAdmin.pin} onChange={e => setNewAdmin({...newAdmin, pin: e.target.value})} placeholder="PIN" style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }} />
            <select value={newAdmin.role} onChange={e => setNewAdmin({...newAdmin, role: e.target.value})} style={{ width: "100%", marginBottom: 8, padding: "0.5rem", borderRadius: 6, border: `1px solid ${C.border}` }}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Admin PA">Admin PA</option>
              <option value="Area Manager">Area Manager</option>
              <option value="Sr. Manager">Sr. Manager</option>
            </select>
            <button onClick={addNewAdmin} style={{ width: "100%", padding: "0.5rem", background: C.green, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Add Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ======================= ROLE DEFINITIONS =======================
const INDIRECT_ROLES = new Set(["Waterspider","Downstacker","Unloader","Upstacker","Cage Builder"]);
const DIRECT_ROLES   = new Set(["CRETS Processing","WHD Processing","Refurb Processing","Tech Grading","Problem Solve","Super Solver"]);
const OUTBOUND_INDIRECT = new Set(["Waterspider","Cage Builder","Step 2 Processor - Liquidation","Step 2 Processor - Sellable","Step 2 Processor - Donation/Destroy"]);
const OUTBOUND_DIRECT   = new Set(["Pick Driver","Stow Driver","Rebin Processing","Pack Processing","Problem Solve","Super Solver","Step 1 Processor - Liquidation","Step 1 Processor - Sellable","Step 1 Processor - Donation/Destroy"]);

const PATH_PRIORITY = {
  "Unloader":10,"Downstacker":10,"Upstacker":9,"Waterspider":9,"Cage Builder":8,
  "Problem Solve":8,"Super Solver":7,
  "CRETS Processing":7,"WHD Processing":6,"Refurb Processing":6,"Tech Grading":5,
  "Pick Driver":8,"Stow Driver":7,"Rebin Processing":7,"Pack Processing":6,
  "Step 1 Processor - Liquidation":7,"Step 1 Processor - Sellable":7,"Step 1 Processor - Donation/Destroy":7,
  "Step 2 Processor - Liquidation":6,"Step 2 Processor - Sellable":6,"Step 2 Processor - Donation/Destroy":6,
};

const INBOUND_INDIRECT_LIST  = ["Unloader","Downstacker","Upstacker","Waterspider","Cage Builder"];
const INBOUND_DIRECT_LIST    = ["Problem Solve","Super Solver","CRETS Processing","WHD Processing","Refurb Processing","Tech Grading"];
const OUTBOUND_INDIRECT_LIST = ["Waterspider","Cage Builder","Step 2 Processor - Liquidation","Step 2 Processor - Sellable","Step 2 Processor - Donation/Destroy"];
const OUTBOUND_DIRECT_LIST   = ["Pick Driver","Stow Driver","Rebin Processing","Pack Processing","Problem Solve","Super Solver","Step 1 Processor - Liquidation","Step 1 Processor - Sellable","Step 1 Processor - Donation/Destroy"];

const ALL_INBOUND_PATHS  = [...INBOUND_INDIRECT_LIST,...INBOUND_DIRECT_LIST];
const ALL_OUTBOUND_PATHS = [...OUTBOUND_INDIRECT_LIST,...OUTBOUND_DIRECT_LIST];

const getCanonicalRole = (pathName) => {
  if (!pathName) return "";
  const u = pathName.toUpperCase();
  if (u.includes("CRETS")) return "CRETS Processing";
  if (u.includes("WHD")) return "WHD Processing";
  if (u.includes("REFURB")) return "Refurb Processing";
  if (u.includes("TECH")) return "Tech Grading";
  if (u.includes("PROBLEM SOLVE")) return "Problem Solve";
  if (u.includes("SUPER SOLVER")) return "Super Solver";
  if (u.includes("WATERSPIDER")) return "Waterspider";
  if (u.includes("DOWNSTACKER")) return "Downstacker";
  if (u.includes("UNLOADER")) return "Unloader";
  if (u.includes("UPSTACKER")) return "Upstacker";
  if (u.includes("CAGE")) return "Cage Builder";
  if (u.includes("PICK")) return "Pick Driver";
  if (u.includes("STOW")) return "Stow Driver";
  if (u.includes("REBIN")) return "Rebin Processing";
  if (u.includes("PACK")) return "Pack Processing";
  if (u.includes("LIQUIDATION") && u.includes("STEP 1")) return "Step 1 Processor - Liquidation";
  if (u.includes("LIQUIDATION") && u.includes("STEP 2")) return "Step 2 Processor - Liquidation";
  if (u.includes("SELLABLE") && u.includes("STEP 1")) return "Step 1 Processor - Sellable";
  if (u.includes("SELLABLE") && u.includes("STEP 2")) return "Step 2 Processor - Sellable";
  if (u.includes("DONATION") && u.includes("STEP 1")) return "Step 1 Processor - Donation/Destroy";
  if (u.includes("DONATION") && u.includes("STEP 2")) return "Step 2 Processor - Donation/Destroy";
  return pathName;
};

const isInd    = p => INDIRECT_ROLES.has(getCanonicalRole(p))||OUTBOUND_INDIRECT.has(getCanonicalRole(p));
const isDirect = p => DIRECT_ROLES.has(getCanonicalRole(p))||OUTBOUND_DIRECT.has(getCanonicalRole(p));

function getDisplayRoleName(pathName, dept) {
  const isIndirect = isInd(pathName);
  if (!isIndirect) return pathName;
  const prefix = dept === "INBOUND" ? "IB " : "OB ";
  return prefix + pathName;
}

// ======================= FLOOR STRUCTURE =======================
function buildFloor(){
  const paths=[],lines=[],stations=[];
  let lid=1,sid=1;
  function addPath(pid,name,rt,dept,nLines,stPerSide){
    paths.push({id:pid,name,role_type:rt,department:dept,active:true,display_order:pid*100, priority: PATH_PRIORITY[name] || 50});
    for(let li=1;li<=nLines;li++){
      const lId=lid++;
      lines.push({id:lId,path_id:pid,name:`Line ${li}`,active:true});
      for(let s=1;s<=stPerSide;s++) stations.push({id:sid++,line_id:lId,path_id:pid,name:`${li}-${s*2-1}`,side:"ODD",station_number:s*2-1,active:true});
      for(let s=1;s<=stPerSide;s++) stations.push({id:sid++,line_id:lId,path_id:pid,name:`${li}-${s*2}`,side:"EVEN",station_number:s*2,active:true});
    }
  }
  addPath(1,"CRETS Processing","DIRECT","INBOUND",8,8);
  addPath(2,"CRETS High Side","DIRECT","INBOUND",2,10);
  addPath(3,"WHD Processing","DIRECT","INBOUND",4,8);
  addPath(4,"Refurb Processing","DIRECT","INBOUND",3,8);
  addPath(5,"Tech Grading","DIRECT","INBOUND",2,8);
  addPath(6,"Problem Solve","DIRECT","INBOUND",1,5);
  addPath(7,"Super Solver","DIRECT","INBOUND",1,5);
  addPath(8,"Waterspider","INDIRECT","INBOUND",1,6);
  addPath(9,"Downstacker","INDIRECT","INBOUND",1,8);
  addPath(10,"Unloader","INDIRECT","INBOUND",1,8);
  addPath(11,"Upstacker","INDIRECT","INBOUND",1,6);
  addPath(12,"Cage Builder","INDIRECT","INBOUND",1,4);
  addPath(13,"Pick Driver","DIRECT","OUTBOUND",6,8);
  addPath(14,"Stow Driver","DIRECT","OUTBOUND",4,8);
  addPath(15,"Rebin Processing","DIRECT","OUTBOUND",3,8);
  addPath(16,"Pack Processing","DIRECT","OUTBOUND",4,8);
  addPath(17,"Problem Solve","DIRECT","OUTBOUND",1,5);
  addPath(18,"Super Solver","DIRECT","OUTBOUND",1,5);
  addPath(19,"Step 1 Processor - Liquidation","DIRECT","OUTBOUND",2,8);
  addPath(20,"Step 2 Processor - Liquidation","INDIRECT","OUTBOUND",2,8);
  addPath(21,"Step 1 Processor - Sellable","DIRECT","OUTBOUND",2,8);
  addPath(22,"Step 2 Processor - Sellable","INDIRECT","OUTBOUND",2,8);
  addPath(23,"Step 1 Processor - Donation/Destroy","DIRECT","OUTBOUND",2,8);
  addPath(24,"Step 2 Processor - Donation/Destroy","INDIRECT","OUTBOUND",2,8);
  addPath(25,"Waterspider","INDIRECT","OUTBOUND",1,6);
  addPath(26,"Cage Builder","INDIRECT","OUTBOUND",1,4);
  return {paths,lines,stations};
}
const INIT = buildFloor();

// ======================= GLOBAL STATE =======================
let contextStations = {};
let contextBadges   = {};
let floorPaths    = INIT.paths.map(p=>({...p}));
let floorLines    = INIT.lines.map(l=>({...l}));
let floorStations = INIT.stations.map(s=>({...s}));
let shiftAssignments = {};
let weekHistory = {};
let assignHistory = [];
let pathRenames = {};
let preStaffData = {};

let shiftFloorConfig = {};
function getShiftConfig(shiftCode) {
  if (!shiftFloorConfig[shiftCode]) {
    shiftFloorConfig[shiftCode] = { paths: {}, lines: {}, stations: {}, customPaths: [], customLines: [], customStations: [] };
  }
  return shiftFloorConfig[shiftCode];
}
function resetShiftConfig(shiftCode) { delete shiftFloorConfig[shiftCode]; }

// Mock associates (initial fallback – will be replaced by backend data)
let mockAssocs = [
  {badge:"101181",login:"moberete",name:"Mory Berete",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND",
   permissions:[{path_name:"CRETS Processing",lc_level:5},{path_name:"Waterspider",lc_level:3},{path_name:"Problem Solve",lc_level:3}],
   weekHours:[{path_name:"CRETS Processing",hours:28.5}],yesterdayRoles:[{path_name:"CRETS Processing",hours:9.5}]},
  
];

weekHistory["11873356"] = [
  {date:"2026-04-07",pathName:"Downstacker",roleType:"INDIRECT",half:"half1",dept:"INBOUND",shiftType:"DAY"},
  {date:"2026-04-08",pathName:"Waterspider",roleType:"INDIRECT",half:"half1",dept:"INBOUND",shiftType:"DAY"},
  {date:"2026-04-09",pathName:"Downstacker",roleType:"INDIRECT",half:"half1",dept:"INBOUND",shiftType:"DAY"},
];

// ======================= HELPER FUNCTIONS =======================
function consec3Indirect(badge, dept){
  const h=(weekHistory[badge]||[]).filter(x=>!dept||x.dept===dept||!x.dept);
  return h.length>=3&&h.slice(-3).every(x=>x.roleType==="INDIRECT");
}
function getWeekStart(){
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - 14); // BIWEEKLY (14 days)
  return d;
}
function pruneOldHistory(){
  const cutoff=getWeekStart();
  Object.keys(weekHistory).forEach(badge=>{
    weekHistory[badge]=(weekHistory[badge]||[]).filter(e=>{
      try{return new Date(e.date)>=cutoff;}catch{return true;}
    });
  });
}
function scoreOnePath(assoc,pathName,dept){
  const canon = getCanonicalRole(pathName);
  const perm=assoc.permissions.find(p=>getCanonicalRole(p.path_name)===canon);
  if(!perm) return null;
  if(isInd(pathName)&&consec3Indirect(assoc.badge,dept)) return null;
  const deptHistory=(weekHistory[assoc.badge]||[]).filter(x=>!dept||x.dept===dept||!x.dept);
  const yd=(assoc.yesterdayRoles||[]).find(r=>getCanonicalRole(r.path_name)===canon)?.hours||0;
  const wk=(assoc.weekHours||[]).find(r=>getCanonicalRole(r.path_name)===canon)?.hours||0;
  const tot=Math.max(1,(assoc.weekHours||[]).reduce((s,r)=>s+r.hours,0));
  const sh=wk/tot;
  const weekCount=deptHistory.filter(e=>getCanonicalRole(e.pathName)===canon).length;
  const totalWeekAssign=Math.max(1,deptHistory.length);
  const histShare=weekCount/totalWeekAssign;
  const prPts = PATH_PRIORITY[canon]||5;
  const ydPts = yd>0 ? -Math.min(15,Math.round(yd*1.8)) : 4;
  const wkPts = Math.round(Math.max(0,(0.5-sh)*6));
  const rotPts = Math.round(Math.max(0,(0.4-histShare)*5));
  const lcPts = +(perm.lc_level*0.8).toFixed(1);
  const bPts = Math.min(1,(assoc.permissions||[]).length*0.1);
  const total = Math.max(0, prPts+ydPts+wkPts+rotPts+lcPts+bPts);
  let rotationHours = 10;
  if (pathName === "CRETS High Side") rotationHours = 5;
  return {
    score:+total.toFixed(1),
    lc:perm.lc_level,
    roleType:isInd(pathName)?"INDIRECT":"DIRECT",
    rotationHours: rotationHours,
    breakdown:[
      {factor:"Path Priority",pts:prPts,detail:`${prPts}/10 — ${pathName}`},
      {factor:"Yesterday",pts:ydPts,detail:yd>0?`${yd.toFixed(1)}h yesterday`:"Not here yesterday (+2)"},
      {factor:"Biweekly Hours",pts:wkPts,detail:`${wk.toFixed(1)}h/${tot.toFixed(1)}h = ${Math.round(sh*100)}% this 14 days`},
      {factor:"Fair Rotation",pts:rotPts,detail:`${weekCount}/${totalWeekAssign} assignments this 14 days on this path`},
      {factor:"LC Level",pts:lcPts,detail:`L${perm.lc_level}/5 — ${["","Beginner","Learning","Developing","Proficient","Expert"][perm.lc_level]}`},
      {factor:"Breadth",pts:bPts,detail:`${(assoc.permissions||[]).length} qualified paths`},
    ],
  };
}
function getHalf(staffDate, shiftCode, dept){
  const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
  const now=new Date();
  const ds=dateStr;
  if(ds!==new Date().toISOString().split("T")[0]) return "half1";
  if(shiftCode && dept) return getHalfByShift(staffDate, shiftCode, dept);
  return now.getHours()<12?"half1":"half2";
}
function shiftKey(dept,dateStr,shiftType){
  return `${dept}|${dateStr}|${shiftType}`;
}
async function api(ep,opts={}){try{const r=await fetch(API+ep,{headers:{"Content-Type":"application/json"},...opts});if(!r.ok)throw new Error();return r.json();}catch{return null;}}
const fmtTime=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});
const fmtDate=(d)=>{try{return(d instanceof Date?d:new Date(d)).toLocaleDateString("en-US",{weekday:"short",month:"numeric",day:"numeric",year:"numeric"});}catch{return"";}};
const LC_COLOR=l=>l>=5?"#16a34a":l>=4?"#15803d":l>=3?"#ca8a04":l>=2?"#ea580c":"#dc2626";
const LC_LABEL=l=>["–","Beginner","Learning","Developing","Proficient","Expert"][l]||"–";
const LC_BG=l=>l>=4?C.greenBg:l>=3?C.amberBg:C.redBg;
const LC_BORDER=l=>l>=4?C.greenBorder:l>=3?C.amberBorder:C.redBorder;

// SHIFT TIMES
const SHIFT_TIMES = {
  FHD: { INBOUND:  {h:7,  m:0,  endH:17, endM:30, days:[0,1,2,3]},
          OUTBOUND: {h:7,  m:15, endH:17, endM:45, days:[0,1,2,3]} },
  FHN: { INBOUND:  {h:18, m:30, endH:5,  endM:0,  days:[0,1,2,3]},
          OUTBOUND: {h:18, m:45, endH:5,  endM:15, days:[0,1,2,3]} },
  BHD: { INBOUND:  {h:7,  m:0,  endH:17, endM:30, days:[3,4,5,6]},
          OUTBOUND: {h:7,  m:15, endH:17, endM:45, days:[3,4,5,6]} },
  BHN: { INBOUND:  {h:18, m:30, endH:5,  endM:0,  days:[3,4,5,6]},
          OUTBOUND: {h:18, m:45, endH:5,  endM:15, days:[3,4,5,6]} },
};
function getShiftTimes(shiftCode, dept){ return SHIFT_TIMES[shiftCode]?.[dept] || SHIFT_TIMES[shiftCode]?.INBOUND || null; }
function shiftDurationHours(shiftCode, dept){
  const t = getShiftTimes(shiftCode, dept);
  if(!t) return 10;
  const startMins = t.h*60 + t.m;
  let endMins = t.endH*60 + t.endM;
  if(endMins <= startMins) endMins += 24*60;
  return (endMins - startMins) / 60;
}
function shiftStartDate(dateStr, shiftCode, dept){
  const t = getShiftTimes(shiftCode, dept);
  if(!t) return null;
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(t.h, t.m, 0, 0);
  return d;
}
function shiftEndDate(dateStr, shiftCode, dept){
  const t = getShiftTimes(shiftCode, dept);
  if(!t) return null;
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(t.endH, t.endM, 0, 0);
  const startMins = t.h*60 + t.m;
  const endMins   = t.endH*60 + t.endM;
  if(endMins <= startMins) d.setDate(d.getDate() + 1);
  return d;
}
function getHalfByShift(staffDate, shiftCode, dept){
  const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
  const now = new Date();
  const start = shiftStartDate(dateStr, shiftCode, dept);
  const end   = shiftEndDate(dateStr, shiftCode, dept);
  if(!start || !end) return "half1";
  const mid = new Date((start.getTime() + end.getTime()) / 2);
  return now >= mid ? "half2" : "half1";
}

// Context helpers
const getContextKey = (date, shift, dept) => {
  const dateStr = date instanceof Date ? date.toISOString().split("T")[0] : date;
  return `${dateStr}|${shift}|${dept}`;
};
const getStationAssignment = (contextKey, stationId) => contextStations[contextKey]?.[stationId];
const getBadgeAssignment = (contextKey, badge) => contextBadges[contextKey]?.[badge];
const setStationAssignment = (contextKey, stationId, assignment) => {
  if (!contextStations[contextKey]) contextStations[contextKey] = {};
  contextStations[contextKey][stationId] = assignment;
};
const setBadgeAssignment = (contextKey, badge, stationId) => {
  if (!contextBadges[contextKey]) contextBadges[contextKey] = {};
  contextBadges[contextKey][badge] = stationId;
};
const clearContextAssignments = (contextKey) => {
  delete contextStations[contextKey];
  delete contextBadges[contextKey];
};

function openStForPath(pathId, dept, dateStr, shiftType, usePreStaff = false, preStaffShiftOverride = null){
  const effectiveShift = (usePreStaff && preStaffShiftOverride) ? preStaffShiftOverride : shiftType;
  const ctx = `${dateStr}|${effectiveShift}|${dept}`;
  const path = floorPaths.find(p => p.id === pathId && p.active !== false);
  if (!path) return null;
  let pathActive = true;
  if (usePreStaff && preStaffShiftOverride) {
    const cfg = getShiftConfig(preStaffShiftOverride);
    if (cfg.paths[pathId] !== undefined) pathActive = cfg.paths[pathId];
  } else {
    pathActive = path.active !== false;
  }
  if (!pathActive) return null;
  const lineIds = floorLines.filter(l => l.path_id === pathId).map(l => l.id);
  if (!lineIds.length) return null;
  const cands = floorStations.filter(s => {
    if (!lineIds.includes(s.line_id)) return false;
    if (s.active === false) return false;
    let stationActive = true;
    if (usePreStaff && preStaffShiftOverride) {
      const cfg = getShiftConfig(preStaffShiftOverride);
      if (cfg.stations[s.id] !== undefined) stationActive = cfg.stations[s.id];
    } else {
      stationActive = s.active !== false;
    }
    if (!stationActive) return false;
    const occupied = usePreStaff ? (preStaffData[`${dept}|${dateStr}|${effectiveShift}`]?.[s.id]) : getStationAssignment(ctx, s.id);
    return !occupied;
  });
  if (!cands.length) return null;
  const pick = cands[0];
  return {...pick, line_name: floorLines.find(l => l.id === pick.line_id)?.name || ""};
}
const isValidFloorStation = (stationId) => {
  return floorStations.some(s => s.id === stationId && s.active !== false);
};

// ========== runScanWithLaborShare ==========
function runScanWithLaborShare(badge, staffDate, shiftType, laborShareEnabled, laborShareCount, crossDeptUsage, getCrossDeptUsed, incrementCrossDept, contextKey) {
  pruneOldHistory();
  const assoc = mockAssocs.find(a => a.badge === badge || a.login === badge.toLowerCase());
  if (!assoc) return null;

  let targetDept = assoc.operation_mode === "BOTH" ? (assoc.default_dept || "INBOUND") : assoc.operation_mode;
  let isCrossDept = false;

  if (assoc.operation_mode === "BOTH" && laborShareEnabled) {
    const defaultDept = assoc.default_dept || "INBOUND";
    const otherDept = defaultDept === "INBOUND" ? "OUTBOUND" : "INBOUND";
    const used = getCrossDeptUsed(contextKey);
    if (laborShareCount === 0 || used < laborShareCount) {
      const hasOtherDeptPerm = (assoc.permissions || []).some(p => {
        const path = floorPaths.find(fp => fp.name === p.path_name);
        return path && path.department === otherDept;
      });
      if (hasOtherDeptPerm) {
        targetDept = otherDept;
        isCrossDept = true;
      } else {
        targetDept = defaultDept;
      }
    } else {
      targetDept = defaultDept;
    }
  }

  const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
  const half = getHalf(staffDate, shiftType, targetDept);
  const sKey = shiftKey(targetDept, dateStr, shiftType);
  const ctx = `${dateStr}|${shiftType}|${targetDept}`;

  if (shiftAssignments[sKey]?.[assoc.badge]) {
    const ex = shiftAssignments[sKey][assoc.badge];
    const hd = ex[half] || ex.half1;
    return { associate: assoc, path: hd.path, station: hd.station, score: hd.score, lc: hd.lc,
      roleType: hd.roleType, rotationHours: hd.rotationHours, breakdown: hd.breakdown || [],
      allScores: hd.allScores || [], method: "RECALL", isRecall: true, half,
      half1: ex.half1, half2: ex.half2, consec3: consec3Indirect(assoc.badge, targetDept), dept: targetDept, assignedDept: targetDept };
  }

  const scored = floorPaths
    .filter(fp => fp.department === targetDept && fp.active !== false)
    .map(fp => {
      const s = scoreOnePath(assoc, fp.name, targetDept);
      if (!s) return null;
      const openSt = openStForPath(fp.id, targetDept, dateStr, shiftType);
      if (!openSt) return null;
      return { path: fp.name, ...s, pathObj: fp };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    const hasAnyPerm = assoc.permissions.length > 0;
    const reason = hasAnyPerm
      ? `All floor map stations for your qualified ${targetDept} paths are full or unavailable. See Admin.`
      : "No permissions — go to Permissions tab to add qualifications.";
    return { associate: assoc, path: "SEE ADMIN", station: null, score: 0, lc: 0, breakdown: [], allScores: [], reason, method: "AUTO", isRecall: false, half, dept: targetDept, assignedDept: targetDept };
  }

  const chosen = scored[0];
  const chosenSt = openStForPath(chosen.pathObj.id, targetDept, dateStr, shiftType);
  if (!chosenSt) {
    return { associate: assoc, path: "SEE ADMIN", station: null, score: 0, lc: 0, breakdown: [], allScores: [],
      reason: `No open floor map stations available for ${chosen.path}. See Admin.`, method: "AUTO", isRecall: false, half, dept: targetDept, assignedDept: targetDept };
  }

  const prevSid = getBadgeAssignment(ctx, assoc.badge);
  if (prevSid) {
    if (contextStations[ctx]) delete contextStations[ctx][prevSid];
  }
  setStationAssignment(ctx, chosenSt.id, {
    login: assoc.login, name: assoc.name, badge: assoc.badge,
    path: chosen.path, roleType: chosen.roleType,
    assignedAt: Date.now(), method: "SCAN", dept: targetDept, half: "half1"
  });
  setBadgeAssignment(ctx, assoc.badge, chosenSt.id);

  if (!weekHistory[assoc.badge]) weekHistory[assoc.badge] = [];
  weekHistory[assoc.badge].push({ date: dateStr, pathName: chosen.path, roleType: chosen.roleType, half: "half1", dept: targetDept, shiftType });

  let h2Path = null, h2St = null, h2SeeAdmin = false, h2AdminReason = "";
  if (chosen.roleType === "INDIRECT") {
    const directOptions = scored.filter(s => s.roleType === "DIRECT");
    if (directOptions.length > 0) {
      for (const opt of directOptions) {
        const st2 = openStForPath(opt.pathObj.id, targetDept, dateStr, shiftType);
        if (st2) { h2Path = opt; h2St = st2; break; }
      }
    }
    if (!h2St) {
      h2SeeAdmin = true;
      h2AdminReason = `${chosen.path} is capped at 5hr (INDIRECT). No direct-role floor map stations available for 2nd half.`;
    }
  } else {
    const otherRoles = scored.filter(s => getCanonicalRole(s.path) !== getCanonicalRole(chosen.path));
    if (otherRoles.length > 0) {
      for (const opt of otherRoles) {
        const st2 = openStForPath(opt.pathObj.id, targetDept, dateStr, shiftType);
        if (st2) { h2Path = opt; h2St = st2; break; }
      }
    }
    if (!h2St) {
      const otherPaths = scored.filter(s => s.path !== chosen.path);
      for (const opt of otherPaths) {
        const st2 = openStForPath(opt.pathObj.id, targetDept, dateStr, shiftType);
        if (st2) { h2Path = opt; h2St = st2; break; }
      }
    }
    if (!h2St) {
      h2Path = chosen; h2St = chosenSt;
    }
  }

  const h1 = {
    path: chosen.path, station: chosenSt, score: chosen.score, lc: chosen.lc,
    roleType: chosen.roleType, rotationHours: chosen.rotationHours,
    breakdown: chosen.breakdown,
    allScores: scored.filter(s => s.path !== chosen.path).slice(0, 3).map(s => ({ path: s.path, score: s.score, type: s.roleType })),
  };
  const h2 = h2SeeAdmin
    ? { path: "SEE ADMIN", station: null, score: 0, lc: 0, roleType: null, rotationHours: 0, breakdown: [], allScores: [], seeAdminReason: h2AdminReason }
    : { path: h2Path.path, station: h2St, score: h2Path.score, lc: h2Path.lc,
        roleType: h2Path.roleType, rotationHours: h2Path.rotationHours, breakdown: [], allScores: [] };

  if (!shiftAssignments[sKey]) shiftAssignments[sKey] = {};
  shiftAssignments[sKey][assoc.badge] = { date: dateStr, half1: h1, half2: h2, dept: targetDept, shiftType };
  if (!h2SeeAdmin) {
    weekHistory[assoc.badge].push({ date: dateStr, pathName: h2Path.path, roleType: h2Path.roleType, half: "half2", dept: targetDept, shiftType });
  }
  assignHistory.push({
    badge: assoc.badge, login: assoc.login, name: assoc.name,
    path: chosen.path, station: chosenSt.name, roleType: chosen.roleType, score: chosen.score,
    method: "SCAN", assignedAt: Date.now(), staffDate: dateStr, shiftType, dept: targetDept, half: "half1",
    half2Path: h2Path?.path, half2Station: h2St?.name || null, half2RoleType: h2Path?.roleType,
  });

  if (isCrossDept) incrementCrossDept(contextKey);

  return {
    associate: assoc, path: chosen.path, station: chosenSt, score: chosen.score, lc: chosen.lc,
    roleType: chosen.roleType, rotationHours: chosen.rotationHours, breakdown: chosen.breakdown,
    allScores: scored.filter(s => s.path !== chosen.path).slice(0, 3).map(s => ({ path: s.path, score: s.score, type: s.roleType })),
    method: "AUTO", isRecall: false, half, half1: h1, half2: h2,
    consec3: consec3Indirect(assoc.badge, targetDept), dept: targetDept, assignedDept: targetDept,
  };
}

// ======================= UI COMPONENTS =======================
const Bdg=({children,color=C.green,bg=C.greenBg,border=C.greenBorder,style={}})=>(<span style={{background:bg,border:`1px solid ${border}`,borderRadius:5,padding:"2px 7px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color,fontWeight:600,...style}}>{children}</span>);
const Btn=({children,onClick,variant="default",size="sm",disabled=false,style={}})=>{
  const v={default:{background:C.surface,border:`1.5px solid ${C.border}`,color:C.text},primary:{background:C.green,border:`1.5px solid ${C.green}`,color:"#fff"},danger:{background:C.red,border:`1.5px solid ${C.red}`,color:"#fff"},ghost:{background:"transparent",border:"none",color:C.sub},amber:{background:C.amber,border:`1.5px solid ${C.amber}`,color:"#fff"},purple:{background:C.purple,border:`1.5px solid ${C.purple}`,color:"#fff"}}[variant]||{background:C.surface,border:`1.5px solid ${C.border}`,color:C.text};
  const s={sm:{padding:"5px 12px",fontSize:"0.65rem"},md:{padding:"8px 16px",fontSize:"0.72rem"},lg:{padding:"11px 22px",fontSize:"0.8rem"}}[size];
  return <button onClick={onClick} disabled={disabled} style={{...v,...s,borderRadius:8,fontFamily:"'DM Mono',monospace",fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,letterSpacing:"0.06em",transition:"all 0.12s",...style}}>{children}</button>;
};
const Modal=({open,onClose,title,children,width=480})=>{
  if(!open) return null;
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}} onClick={onClose}><div style={{background:C.surface,borderRadius:16,border:`1.5px solid ${C.border}`,width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.25rem 1.5rem",borderBottom:`1px solid ${C.border}`}}><div style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:C.text,fontSize:"0.85rem"}}>{title}</div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:"1.2rem",lineHeight:1}}>×</button></div><div style={{padding:"1.5rem"}}>{children}</div></div></div>);
};
const Field=({label,req,children})=><div style={{marginBottom:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted,letterSpacing:"0.15em",marginBottom:5}}>{label}{req&&<span style={{color:C.red}}> *</span>}</div>{children}</div>;
const Inp=({value,onChange,placeholder,type="text",style={}})=><input value={value} onChange={onChange} placeholder={placeholder} type={type} style={{width:"100%",padding:"0.65rem 0.9rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,outline:"none",boxSizing:"border-box",background:"#f9fafb",...style}}/>;
const Sel=({value,onChange,children,style={}})=><select value={value} onChange={onChange} style={{width:"100%",padding:"0.65rem 0.9rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,outline:"none",background:"#f9fafb",...style}}>{children}</select>;
const ScoreBar=({score,max=20})=>{const p=Math.min(100,Math.round(score/max*100));const col=p>=70?C.green:p>=40?C.amber:C.red;return<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:C.bg,borderRadius:4,height:6,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:col,borderRadius:4,transition:"width 0.4s"}}/></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:col,fontWeight:700,width:32,textAlign:"right"}}>{score}/10</div></div>;};

function DeptToggle({dept,setDept}){
  return(
    <div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
      {[{v:"INBOUND",icon:"📥",c:C.blue,bg:C.blueBg},{v:"OUTBOUND",icon:"📤",c:C.orange,bg:C.orangeBg}].map(d=>(
        <button key={d.v} onClick={()=>setDept(d.v)}
          style={{padding:"5px 13px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,
            border:"none",cursor:"pointer",
            background:dept===d.v?d.c:"transparent",
            color:dept===d.v?"#fff":C.muted,transition:"all 0.15s"}}>
          {d.icon} {d.v}
        </button>
      ))}
    </div>
  );
}

// ======================= KIOSK =======================
function Kiosk({ onAssign, shiftType, staffDate, laborShareEnabled, laborShareCount, crossDeptUsage, incrementCrossDept, getCrossDeptUsed }) {
  const [cur, setCur] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [cd, setCd] = useState(30);
  const inputRef = useRef(null);
  const resetT = useRef(null);
  const cdT = useRef(null);
  const cdRef = useRef(30);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => () => { clearTimeout(resetT.current); clearInterval(cdT.current); }, []);

  function showResult(res) {
    clearTimeout(resetT.current); clearInterval(cdT.current);
    cdRef.current = 30; setCd(30);
    setCur({ result: res, id: Date.now() });
    cdT.current = setInterval(() => {
      cdRef.current--; setCd(cdRef.current);
      if (cdRef.current <= 0) clearInterval(cdT.current);
    }, 1000);
    resetT.current = setTimeout(() => { setCur(null); setCd(30); inputRef.current?.focus(); }, 30000);
  }

  async function handleScan(badge) {
    if (!badge.trim()) return;
    setInputVal("");
    setTimeout(() => inputRef.current?.focus(), 20);
    const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
    const contextKey = `live|${dateStr}|${shiftType}`;
    let res = await api("/scan", {
      method: "POST",
      body: JSON.stringify({ badge: badge.trim(), shiftType, staffDate: dateStr, laborShareEnabled, laborShareCount })
    });
    if (!res) {
      res = runScanWithLaborShare(badge.trim(), staffDate, shiftType, laborShareEnabled, laborShareCount, crossDeptUsage, getCrossDeptUsed, incrementCrossDept, contextKey);
    }
    if (!res) { showResult({ notFound: true, badge: badge.trim() }); return; }
    onAssign({ ...res, timestamp: new Date() });
    showResult(res);
  }

  const r = cur?.result;
  const gm = r && (!r.station || r.path === "SEE ADMIN");
  const deptColor = r?.assignedDept === "OUTBOUND" ? C.orange : C.blue;
  const deptBg = r?.assignedDept === "OUTBOUND" ? C.orangeBg : C.blueBg;
  const deptBorder = r?.assignedDept === "OUTBOUND" ? C.orangeBorder : C.blueBorder;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 104px)", padding: "1.5rem 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "2.6rem", letterSpacing: "0.1em", color: C.text, lineHeight: 1 }}>CONTROL TOWER</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
          <div style={{ height: 1, width: 24, background: C.faint }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", color: C.muted }}>AUTO-STAFFING · TEN1</span>
          <div style={{ height: 1, width: 24, background: C.faint }} />
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 7, flexWrap: "wrap" }}>
          <Bdg color={shiftType === "DAY" ? C.amber : C.purple} bg={shiftType === "DAY" ? C.amberBg : C.purpleBg} border={shiftType === "DAY" ? C.amberBorder : C.purpleBorder}>{shiftType === "DAY" ? "☀ DAY SHIFT" : "🌙 NIGHT SHIFT"}</Bdg>
          <Bdg color={C.teal} bg={C.tealBg} border={C.tealBorder}>{fmtDate(staffDate)}</Bdg>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ background: C.surface, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: C.muted, letterSpacing: "0.12em", marginBottom: 8, textAlign: "center" }}>🔖 SCAN BADGE OR ENTER ID</div>
          <input ref={inputRef} value={inputVal} onChange={e => setInputVal(e.target.value.replace(/\s/g, ""))} onKeyDown={e => e.key === "Enter" && handleScan(inputVal)} placeholder="Badge number..." autoFocus
            style={{ width: "100%", padding: "0.85rem 1rem", border: `1.5px solid ${C.border}`, borderRadius: 10, fontFamily: "'DM Mono',monospace", fontSize: "1.4rem", color: C.text, outline: "none", boxSizing: "border-box", textAlign: "center", letterSpacing: "0.12em", background: "#f9fafb" }} />
          <div style={{ textAlign: "center", marginTop: 8, fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.faint }}>
            Inbound: 101181 · 172099 · 105011 · 115361 · 500001 &nbsp;&nbsp; Outbound: 600001 · 600002 · 600003 · 600004 · 600005
          </div>
        </div>
        {r && !r.notFound && (
          <div key={cur.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${gm ? C.redBorder : C.greenBorder}`, padding: "1.25rem", boxShadow: "0 6px 24px rgba(0,0,0,0.07)", animation: "fadein 0.15s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <div style={{ flex: 1, background: C.bg, borderRadius: 4, height: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${cd / 30 * 100}%`, background: gm ? C.red : C.green, borderRadius: 4, transition: "width 1s linear" }} /></div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.muted }}>{cd}s</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${C.bg}` }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.greenBg, border: `2px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontWeight: 700, color: C.green, fontSize: "1rem", flexShrink: 0 }}>{r.associate.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.4rem", color: C.text, letterSpacing: "0.06em", lineHeight: 1 }}>Hi {r.associate.name.split(" ")[0]}!</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: C.muted, marginTop: 2 }}>{r.associate.login} · {r.associate.shift_code} · {r.associate.operation_mode}</div>
              </div>
              {r.isRecall && <Bdg color={C.teal} bg={C.tealBg} border={C.tealBorder}>RECALLED</Bdg>}
            </div>
            {gm ? (
              <div style={{ background: C.redBg, border: `1.5px solid ${C.redBorder}`, borderRadius: 12, padding: "1.1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>⚠️</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.red, letterSpacing: "0.15em", marginBottom: 6 }}>SEE ADMIN</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: C.text, lineHeight: 1.5 }}>{r.reason || "Admin will assign you manually."}</div>
              </div>
            ) : (
              <>
                <div style={{ background: C.greenBg, border: `1.5px solid ${C.greenBorder}`, borderRadius: 12, padding: "1rem", marginBottom: "0.7rem" }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.green, letterSpacing: "0.18em", marginBottom: 4 }}>{r.isRecall ? "YOUR SHIFT ASSIGNMENT:" : "1ST HALF ASSIGNMENT:"}</div>
                  <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.8rem", color: C.text, letterSpacing: "0.05em", lineHeight: 1 }}>{getDisplayRoleName(r.half1?.path || r.path, r.assignedDept)}</div>
                  {r.station?.line_name && <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: C.sub, marginTop: 2 }}>{r.station.line_name}</div>}
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "1.1rem", color: "#374151", marginTop: 3, fontWeight: 600 }}>Station {r.station?.name}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    <Bdg color={LC_COLOR(r.lc)}>LC {r.lc}/5 · {LC_LABEL(r.lc)}</Bdg>
                    <Bdg color={r.roleType === "INDIRECT" ? C.purple : C.blue} bg={r.roleType === "INDIRECT" ? C.purpleBg : C.blueBg} border={r.roleType === "INDIRECT" ? C.purpleBorder : C.blueBorder}>{r.roleType} · {r.rotationHours}hr cap</Bdg>
                    <Bdg color={C.sub} bg={C.bg} border={C.border}>Score {r.score}/10</Bdg>
                  </div>
                </div>
                {r.half2 && (r.half2.path === "SEE ADMIN" ? (
                  <div style={{ background: C.amberBg, border: `1.5px solid ${C.amberBorder}`, borderRadius: 12, padding: "0.85rem", marginBottom: "0.7rem" }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.amber, letterSpacing: "0.18em", marginBottom: 4 }}>2ND HALF (AFTER BREAK):</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.85rem", color: C.amber, fontWeight: 700, marginBottom: 4 }}>⚠ SEE ADMIN</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: C.text }}>{r.half2.seeAdminReason}</div>
                  </div>
                ) : (
                  <div style={{ background: r.half2.path === r.path ? C.tealBg : C.blueBg, border: `1.5px solid ${r.half2.path === r.path ? C.tealBorder : C.blueBorder}`, borderRadius: 12, padding: "0.85rem", marginBottom: "0.7rem" }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: r.half2.path === r.path ? C.teal : C.blue, letterSpacing: "0.18em", marginBottom: 4 }}>2ND HALF (AFTER BREAK):</div>
                    <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "1.5rem", color: C.text, letterSpacing: "0.05em", lineHeight: 1 }}>{getDisplayRoleName(r.half2.path, r.assignedDept)}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.95rem", color: "#374151", marginTop: 2, fontWeight: 600 }}>Station {r.half2.station?.name || r.station?.name}</div>
                    <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                      <Bdg color={r.half2.roleType === "INDIRECT" ? C.purple : C.blue} bg={r.half2.roleType === "INDIRECT" ? C.purpleBg : C.blueBg} border={r.half2.roleType === "INDIRECT" ? C.purpleBorder : C.blueBorder}>{r.half2.roleType} · {r.half2.rotationHours}hr cap</Bdg>
                    </div>
                  </div>
                ))}
                {r.consec3 && <div style={{ background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 8, padding: "5px 9px", marginBottom: "0.6rem", fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.amber }}>⚠ 3 consecutive INDIRECT days — Admin may want to review</div>}
                {!r.isRecall && r.breakdown?.length > 0 && (
                  <div style={{ marginBottom: "0.6rem" }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.faint, letterSpacing: "0.15em", marginBottom: 5 }}>SCORE BREAKDOWN</div>
                    <ScoreBar score={r.score} />
                    <div style={{ marginTop: 7, display: "flex", flexDirection: "column", gap: 3 }}>
                      {r.breakdown.map((b, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.sub, flex: 1 }}>{b.factor}: {b.detail}</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", fontWeight: 700, color: b.pts >= 0 ? C.green : C.red, flexShrink: 0 }}>{b.pts >= 0 ? "+" : ""}{b.pts}</span></div>)}
                    </div>
                  </div>
                )}
                {r.allScores?.length > 0 && !r.isRecall && <div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.faint, letterSpacing: "0.15em", marginBottom: 4 }}>ALTERNATES</div><div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{r.allScores.map((s, i) => <span key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 5, padding: "2px 7px", fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.muted }}>{getDisplayRoleName(s.path, r.assignedDept)} ({s.score})</span>)}</div></div>
}</>
            )}
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: C.green, fontWeight: 600, marginTop: "0.75rem" }}>Let's Make History 🏆</div>
          </div>
        )}
        {r?.notFound && (
          <div key={cur?.id} style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.redBorder}`, padding: "1.5rem", textAlign: "center", animation: "fadein 0.15s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}><div style={{ flex: 1, background: C.bg, borderRadius: 4, height: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${cd / 10 * 100}%`, background: C.red, borderRadius: 4, transition: "width 1s linear" }} /></div><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.57rem", color: C.muted }}>{cd}s</span></div>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>⚠️</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem", color: C.red, letterSpacing: "0.12em", marginBottom: 5 }}>BADGE NOT FOUND</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.muted }}>"{r.badge}" — See Admin</div>
          </div>
        )}
        {!cur && <div style={{ background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: "2.5rem 2rem", textAlign: "center", opacity: 0.6 }}><div style={{ fontSize: "1.5rem", marginBottom: 8 }}>🔖</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", color: C.muted, letterSpacing: "0.1em" }}>Waiting for scan...</div></div>}
      </div>
    </div>
  );
}

// ======================= DASHBOARD =======================
function Dashboard({log,shiftType,staffDate,dept}) {
  const [tick,setTick]=useState(0);
  const [manualModal,setManualModal]=useState(false);
  const [adminModal,setAdminModal]=useState(false);
  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),5000);return()=>clearInterval(t);},[]);
  const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
  const ctx=`${dateStr}|${shiftType}|${dept}`;
  const ctxAssigns=contextStations[ctx]||{};
  const ctxValues=Object.values(ctxAssigns);
  const totalAssigned=new Set(ctxValues.map(a=>a.badge)).size;
  const adminCount=log.filter(e=>(!e.station||e.path==="SEE ADMIN")&&e.dept===dept).length;
  const dirCnt=ctxValues.filter(a=>isDirect(a.path)).length;
  const indCnt=ctxValues.filter(a=>isInd(a.path)).length;
  const manCnt=ctxValues.filter(a=>a.method==="MANUAL").length;
  const scnCnt=ctxValues.filter(a=>a.method==="SCAN").length;
  const pm={};
  ctxValues.filter(a=>a.path&&a.path!=="SEE ADMIN").forEach(a=>{pm[a.path]=(pm[a.path]||0)+1;});
  const topPaths=Object.entries(pm).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const deptPathIds=new Set(floorPaths.filter(p=>p.department===dept&&p.active!==false).map(p=>p.id));
  const deptStations=floorStations.filter(s=>deptPathIds.has(s.path_id)&&s.active!==false);
  const filledStations=deptStations.filter(s=>!!ctxAssigns[s.id]).length;
  const openStations=deptStations.length-filledStations;
  const deptColor=dept==="OUTBOUND"?C.orange:C.blue;
  const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;
  return(
    <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1.25rem"}}>DASHBOARD · TEN1 · {shiftType==="DAY"?"☀ DAY":"🌙 NIGHT"} · {fmtDate(staffDate)} · {dept}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"1rem"}}>
        {[{l:"ASSIGNED",v:totalAssigned,c:C.green,bg:C.greenBg,b:C.greenBorder},{l:"SEE ADMIN",v:adminCount,c:C.red,bg:C.redBg,b:C.redBorder,click:()=>setAdminModal(true)}].map(k=>(
          <div key={k.l} onClick={k.click||undefined} style={{background:k.bg,border:`1.5px solid ${k.b}`,borderRadius:12,padding:"1rem",textAlign:"center",cursor:k.click?"pointer":"default",transition:"all 0.12s"}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"2.4rem",color:k.c,lineHeight:1}}>{k.v}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,letterSpacing:"0.12em",marginTop:3}}>{k.l}{k.click&&<span style={{color:C.red}}> ↗</span>}</div></div>
        ))}
      </div>
      <div style={{background:C.surface,border:`1.5px solid ${deptBorder}`,borderRadius:12,padding:"1rem",marginBottom:10}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>FLOOR MAP STATIONS · {dept}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
          {[{l:"TOTAL",v:deptStations.length,c:C.text},{l:"FILLED",v:filledStations,c:C.red},{l:"OPEN",v:openStations,c:C.green}].map(k=>(
            <div key={k.l} style={{textAlign:"center",padding:"0.5rem",background:C.bg,borderRadius:8}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:k.c,lineHeight:1}}>{k.v}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted,marginTop:2}}>{k.l}</div></div>
          ))}
        </div>
        {deptStations.length>0&&(<div style={{marginTop:8}}><div style={{background:C.bg,borderRadius:4,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round(filledStations/deptStations.length*100)}%`,background:deptColor,borderRadius:4,transition:"width 0.4s"}}/></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,marginTop:4,textAlign:"right"}}>{Math.round(filledStations/deptStations.length*100)}% utilization</div></div>)}
      </div>
      <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1rem",marginBottom:10}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>ROLE BREAKDOWN</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
          {[{l:"DIRECT",v:dirCnt,c:C.blue},{l:"INDIRECT",v:indCnt,c:C.purple},{l:"MANUAL",v:manCnt,c:C.amber,click:()=>setManualModal(true)},{l:"AUTO",v:scnCnt,c:C.green}].map(k=>(
            <div key={k.l} onClick={k.click||undefined} style={{textAlign:"center",padding:"0.5rem",background:C.bg,borderRadius:8,cursor:k.click?"pointer":"default",border:k.click?`1.5px solid ${C.amberBorder}`:"1.5px solid transparent",transition:"all 0.12s"}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.6rem",color:k.c,lineHeight:1}}>{k.v}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted,marginTop:2}}>{k.l}{k.click&&<span style={{color:C.amber}}> ↗</span>}</div></div>
          ))}
        </div>
      </div>
      {topPaths.length>0&&(<div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"1rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.15em",marginBottom:10}}>TOP PATHS — {dept}</div><div style={{display:"flex",flexDirection:"column",gap:5}}>{topPaths.map(([path,cnt])=>{const max=topPaths[0][1];const pct=cnt/max;const ind=isInd(path);return(<div key={path} style={{display:"flex",alignItems:"center",gap:8}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.text,width:160,flexShrink:0}}>{getDisplayRoleName(path, dept)}</div><div style={{flex:1,background:C.bg,borderRadius:3,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${pct*100}%`,background:ind?C.purple:deptColor,borderRadius:3,transition:"width 0.4s"}}/></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.muted,width:20,textAlign:"right"}}>{cnt}</div></div>);})}</div></div>)}
      <Modal open={manualModal} onClose={()=>setManualModal(false)} title="Manually Staffed Associates" width={520}>
        {(()=>{const seen=new Set();const manList=ctxValues.filter(a=>a.method==="MANUAL"&&!seen.has(a.badge)&&seen.add(a.badge));return manList.length===0?(<div style={{textAlign:"center",padding:"2rem",fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.faint}}>No manually staffed associates yet.</div>):(<div style={{display:"flex",flexDirection:"column",gap:6}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,marginBottom:4}}>{manList.length} associate{manList.length!==1?"s":""} manually assigned · {dept} · {shiftType} · {dateStr}</div>{manList.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,background:C.amberBg,border:`1.5px solid ${C.amberBorder}`,borderRadius:10,padding:"0.7rem 0.9rem"}}><div style={{width:32,height:32,borderRadius:"50%",background:C.surface,border:`1.5px solid ${C.amberBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.amber,fontSize:"0.72rem",flexShrink:0}}>{a.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"?"}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",color:C.text,fontWeight:600}}>{a.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{a.login} · {a.path}</div></div><Bdg color={C.amber} bg={C.surface} border={C.amberBorder} style={{fontSize:"0.52rem"}}>MANUAL</Bdg></div>))}</div>)})()}
      </Modal>
      <Modal open={adminModal} onClose={()=>setAdminModal(false)} title="See Admin — Associates" width={520}>
        {(()=>{const seenA=new Set();const adminList=log.filter(e=>(!e.station||e.path==="SEE ADMIN")&&e.dept===dept&&!seenA.has(e.associate?.badge||e.badge)&&seenA.add(e.associate?.badge||e.badge));return adminList.length===0?(<div style={{textAlign:"center",padding:"2rem",fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.faint}}>No associates sent to admin yet.</div>):(<div style={{display:"flex",flexDirection:"column",gap:6}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,marginBottom:4}}>{adminList.length} associate{adminList.length!==1?"s":""} sent to admin · {dept} · {shiftType} · {dateStr}</div>{adminList.map((e,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,background:C.redBg,border:`1.5px solid ${C.redBorder}`,borderRadius:10,padding:"0.7rem 0.9rem"}}><div style={{width:32,height:32,borderRadius:"50%",background:C.surface,border:`1.5px solid ${C.redBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.red,fontSize:"0.72rem",flexShrink:0}}>{e.associate?.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"?"}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",color:C.text,fontWeight:600}}>{e.associate?.name||e.badge}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{e.associate?.login||""} · {e.reason||"No station available"}</div></div><Bdg color={C.red} bg={C.surface} border={C.redBorder} style={{fontSize:"0.52rem"}}>SEE ADMIN</Bdg></div>))}</div>)})()}
      </Modal>
    </div>
  );
}

// ======================= FLOOR MAP =======================
function FloorMap({log,dept,staffDate,shiftType, laborShareEnabled, laborShareCount, crossDeptUsage, incrementCrossDept, getCrossDeptUsed}) {
  const [,fu]=useState(0);const tick=()=>fu(n=>n+1);
  const [expPaths,setExpPaths]=useState(new Set([1]));
  const [expLines,setExpLines]=useState(new Set());
  const [manModal,setManModal]=useState(null);
  const [manBadge,setManBadge]=useState("");
  const [manMsg,setManMsg]=useState("");
  const [editStM,setEditStM]=useState(null);
  const [addPathM,setAddPathM]=useState(false);
  const [addLineM,setAddLineM]=useState(false);
  const [addStM,setAddStM]=useState(false);
  const [renamePathM,setRenamePathM]=useState(null);
  const [nPath,setNPath]=useState({name:"",role_type:"DIRECT"});
  const [nLine,setNLine]=useState({name:"",path_id:""});
  const [nSt,setNSt]=useState({name:"",side:"ODD",line_id:""});
  const [showingHalf,setShowingHalf]=useState("half1");
  const [lastContext,setLastContext]=useState(null);
  const [preStaffMode,setPreStaffMode]=useState(false);
  const [preStaffShift,setPreStaffShift]=useState("FHN");
  const [draggedPathId,setDraggedPathId]=useState(null);
  const [dragOverPathId,setDragOverPathId]=useState(null);
  const [auditLog,setAuditLog]=useState([]);
  const [localLaborShareEnabled, setLocalLaborShareEnabled] = useState(laborShareEnabled);
  const [localLaborShareCount, setLocalLaborShareCount] = useState(laborShareCount);

  useEffect(() => {
    setLocalLaborShareEnabled(laborShareEnabled);
    setLocalLaborShareCount(laborShareCount);
  }, [laborShareEnabled, laborShareCount]);

  const pushAudit = (action, badge, name, station, path, dept, shiftType, dateStr) => {
    const who = window.activeAdmin ? `${window.activeAdmin.name} (${window.activeAdmin.role})` : "Unknown";
    const newEntry = {who, badge, name, station, path, action, dept, shiftType, date:dateStr, ts:new Date().toISOString()};
    setAuditLog(prev => [newEntry, ...prev].slice(0, 500));
    window.auditLogGlobal = window.auditLogGlobal || [];
    window.auditLogGlobal.unshift(newEntry);
  };

  useEffect(()=>{
    const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
    const ctx=`${dateStr}|${shiftType}|${dept}`;
    if(lastContext!==ctx){
      setShowingHalf("half1");
      setLastContext(ctx);
      tick();
    }
  },[dept,staffDate,shiftType,lastContext]);

  // Reset global floor when date/department changes (live mode only)
  useEffect(() => {
    if (preStaffMode) return;
    const basePaths = INIT.paths.map(p => ({ ...p }));
    const baseLines = INIT.lines.map(l => ({ ...l }));
    const baseStations = INIT.stations.map(s => ({ ...s }));
    const savedCustom = JSON.parse(localStorage.getItem("ct_floor_custom") || "null");
    if (savedCustom && savedCustom.paths) {
      savedCustom.paths.forEach(cp => {
        const existing = basePaths.find(p => p.id === cp.id);
        if (!existing) basePaths.push(cp);
        else Object.assign(existing, cp);
      });
      savedCustom.lines.forEach(cl => {
        const existing = baseLines.find(l => l.id === cl.id);
        if (!existing) baseLines.push(cl);
        else Object.assign(existing, cl);
      });
      savedCustom.stations.forEach(cs => {
        const existing = baseStations.find(s => s.id === cs.id);
        if (!existing) baseStations.push(cs);
        else Object.assign(existing, cs);
      });
    }
    Object.entries(pathRenames).forEach(([id, newName]) => {
      const p = basePaths.find(p => p.id === parseInt(id));
      if (p) p.name = newName;
    });
    floorPaths = basePaths;
    floorLines = baseLines;
    floorStations = baseStations;
    tick();
  }, [staffDate, dept, preStaffMode]);

  useEffect(()=>{
    api("/floor-custom").then(data=>{
      if(!data||(!data.paths.length&&!data.lines.length&&!data.stations.length)) return;
      const existingPathIds = new Set(floorPaths.map(p=>p.id));
      const newPaths = data.paths.filter(p=>!existingPathIds.has(p.id));
      if(newPaths.length) floorPaths = [...floorPaths, ...newPaths];
      const existingLineIds = new Set(floorLines.map(l=>l.id));
      const newLines = data.lines.filter(l=>!existingLineIds.has(l.id));
      if(newLines.length) floorLines = [...floorLines, ...newLines];
      const existingStIds = new Set(floorStations.map(s=>s.id));
      const newSts = data.stations.filter(s=>!existingStIds.has(s.id));
      if(newSts.length) floorStations = [...floorStations, ...newSts];
      localStorage.setItem("ct_floor_custom", JSON.stringify({ paths: floorPaths.filter(p => p.id >= 10000), lines: floorLines.filter(l => l.id >= 10000), stations: floorStations.filter(s => s.id >= 10000) }));
      if(newPaths.length||newLines.length||newSts.length) tick();
    });
    api("/floor-custom-renames").then(data=>{
      if(data && data.renames){
        pathRenames = data.renames;
        floorPaths = floorPaths.map(p => pathRenames[p.id] ? {...p, name: pathRenames[p.id]} : p);
        tick();
      }
    });
    if(window.auditLogGlobal) setAuditLog(window.auditLogGlobal.slice(0,100));
  },[]);

  // Helper functions (PA, LA, SA, GA) – same as your existing working code
  const PA = (pid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const customPath = cfg.customPaths.find(p => p.id === pid);
      if (customPath) return customPath.active !== false;
      if (cfg.paths[pid] !== undefined) return cfg.paths[pid];
      const p = floorPaths.find(x => x.id === pid);
      return p ? p.active !== false : false;
    } else {
      const p = floorPaths.find(x => x.id === pid);
      return p ? p.active !== false : false;
    }
  };
  const LA = (lid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const customLine = cfg.customLines.find(l => l.id === lid);
      if (customLine) return customLine.active !== false;
      if (cfg.lines[lid] !== undefined) return cfg.lines[lid];
      const l = floorLines.find(x => x.id === lid);
      return l ? l.active !== false : false;
    } else {
      const l = floorLines.find(x => x.id === lid);
      return l ? l.active !== false : false;
    }
  };
  const SA = (sid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const customSt = cfg.customStations.find(s => s.id === sid);
      if (customSt) return customSt.active !== false;
      if (cfg.stations[sid] !== undefined) return cfg.stations[sid];
      const s = floorStations.find(x => x.id === sid);
      return s ? s.active !== false : false;
    } else {
      const s = floorStations.find(x => x.id === sid);
      return s ? s.active !== false : false;
    }
  };
  const GA = (sid) => {
    const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
    if (preStaffMode && preStaffShift) {
      const psKey = `${dept}|${dateStr}|${preStaffShift}`;
      return preStaffData[psKey]?.[sid] || null;
    }
    const ctx = `${dateStr}|${shiftType}|${dept}`;
    return getStationAssignment(ctx, sid) || null;
  };
  const tep=pid=>setExpPaths(p=>{const n=new Set(p);n.has(pid)?n.delete(pid):n.add(pid);return n;});
  const tel=lid=>setExpLines(p=>{const n=new Set(p);n.has(lid)?n.delete(lid):n.add(lid);return n;});
  const expAllL=pid=>{const ids=floorLines.filter(l=>l.path_id===pid).map(l=>l.id);setExpLines(p=>{const n=new Set(p);ids.forEach(i=>n.add(i));return n;});};
  const colAllL=pid=>{const ids=new Set(floorLines.filter(l=>l.path_id===pid).map(l=>l.id));setExpLines(p=>{const n=new Set(p);ids.forEach(i=>n.delete(i));return n;});};
  const togPath = (pid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const current = cfg.paths[pid] !== undefined ? cfg.paths[pid] : true;
      cfg.paths[pid] = !current;
    } else {
      const p = floorPaths.find(x => x.id === pid);
      if (p) p.active = !p.active;
    }
    tick();
  };
  const togLine = (lid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const current = cfg.lines[lid] !== undefined ? cfg.lines[lid] : true;
      cfg.lines[lid] = !current;
    } else {
      const l = floorLines.find(x => x.id === lid);
      if (l) l.active = !l.active;
    }
    tick();
  };
  const togSt = (sid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const current = cfg.stations[sid] !== undefined ? cfg.stations[sid] : true;
      cfg.stations[sid] = !current;
    } else {
      const s = floorStations.find(x => x.id === sid);
      if (s) s.active = !s.active;
    }
    tick();
  };
  const clrSt = (sid) => {
    const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
    if (preStaffMode && preStaffShift) {
      const psKey = `${dept}|${dateStr}|${preStaffShift}`;
      const a = preStaffData[psKey]?.[sid];
      if (a) {
        delete preStaffData[psKey][sid];
        pushAudit("CLEAR", a.badge, a.name, floorStations.find(s=>s.id===sid)?.name, a.path, dept, preStaffShift, dateStr);
      }
    } else {
      const ctx = `${dateStr}|${shiftType}|${dept}`;
      const a = GA(sid);
      if (a) {
        const badgeSid = getBadgeAssignment(ctx, a.badge);
        if (badgeSid === sid) {
          if (!contextBadges[ctx]) contextBadges[ctx] = {};
          delete contextBadges[ctx][a.badge];
        }
        const st = floorStations.find(s => s.id === sid);
        pushAudit("CLEAR", a.badge, a.name, st?.name || String(sid), a.path, dept, shiftType, dateStr);
      }
      if (!contextStations[ctx]) contextStations[ctx] = {};
      delete contextStations[ctx][sid];
    }
    tick();
  };
  const delPath = (pid) => {
    if (!window.window.window.confirm("Delete path and all its lines/stations?")) return;
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      cfg.customPaths = cfg.customPaths.filter(p => p.id !== pid);
      floorPaths = floorPaths.filter(p => p.id !== pid);
      const lids = floorLines.filter(l => l.path_id === pid).map(l => l.id);
      floorLines = floorLines.filter(l => l.path_id !== pid);
      floorStations = floorStations.filter(s => !lids.includes(s.line_id));
    } else {
      floorPaths = floorPaths.filter(p => p.id !== pid);
      const lids = floorLines.filter(l => l.path_id === pid).map(l => l.id);
      floorLines = floorLines.filter(l => l.path_id !== pid);
      floorStations = floorStations.filter(s => !lids.includes(s.line_id));
      saveFloorCustom();
    }
    tick();
  };
  const delLine = (lid) => {
    if (!window.window.window.confirm("Delete line and all its stations?")) return;
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      cfg.customLines = cfg.customLines.filter(l => l.id !== lid);
      floorLines = floorLines.filter(l => l.id !== lid);
      floorStations = floorStations.filter(s => s.line_id !== lid);
    } else {
      floorLines = floorLines.filter(l => l.id !== lid);
      floorStations = floorStations.filter(s => s.line_id !== lid);
      saveFloorCustom();
    }
    tick();
  };
  const delSt = (sid) => {
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      cfg.customStations = cfg.customStations.filter(s => s.id !== sid);
      floorStations = floorStations.filter(s => s.id !== sid);
    } else {
      floorStations = floorStations.filter(s => s.id !== sid);
      saveFloorCustom();
    }
    clrSt(sid);
    tick();
  };
  const addPath2 = () => {
    if (!nPath.name.trim()) return;
    const newId = Math.max(10000, ...floorPaths.map(p => p.id)) + 1;
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      const newPath = { id: newId, name: nPath.name.trim(), role_type: nPath.role_type, department: dept, active: true };
      cfg.customPaths.push(newPath);
      floorPaths.push(newPath);
    } else {
      floorPaths.push({ id: newId, name: nPath.name.trim(), role_type: nPath.role_type, department: dept, active: true });
      saveFloorCustom();
    }
    setAddPathM(false);
    setNPath({ name: "", role_type: "DIRECT" });
    tick();
  };
  const addLine2 = () => {
    if (!nLine.name.trim() || !nLine.path_id) return;
    const newId = Math.max(10000, ...floorLines.map(l => l.id)) + 1;
    const newLine = { id: newId, path_id: parseInt(nLine.path_id), name: nLine.name.trim(), active: true };
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      cfg.customLines.push(newLine);
      floorLines.push(newLine);
    } else {
      floorLines.push(newLine);
      saveFloorCustom();
    }
    setAddLineM(false);
    setNLine({ name: "", path_id: "" });
    tick();
  };
  const addSt2 = () => {
    if (!nSt.name.trim() || !nSt.line_id) return;
    const lid = parseInt(nSt.line_id);
    const line = floorLines.find(l => l.id === lid);
    const newId = Math.max(10000, ...floorStations.map(s => s.id)) + 1;
    const newStation = { id: newId, line_id: lid, path_id: line?.path_id || 0, name: nSt.name.trim(), side: nSt.side, station_number: newId, active: true };
    if (preStaffMode && preStaffShift) {
      const cfg = getShiftConfig(preStaffShift);
      cfg.customStations.push(newStation);
      floorStations.push(newStation);
    } else {
      floorStations.push(newStation);
      saveFloorCustom();
    }
    setAddStM(false);
    setNSt({ name: "", side: "ODD", line_id: "" });
    tick();
  };
  const saveFloorCustom = () => {
    api("/floor-custom", { method: "POST", body: JSON.stringify({ paths: floorPaths.filter(p => p.id >= 10000), lines: floorLines.filter(l => l.id >= 10000), stations: floorStations.filter(s => s.id >= 10000) }) });
    localStorage.setItem("ct_floor_custom", JSON.stringify({ paths: floorPaths.filter(p => p.id >= 10000), lines: floorLines.filter(l => l.id >= 10000), stations: floorStations.filter(s => s.id >= 10000) }));
  };
  const savePathRenames = () => { api("/floor-custom-renames", { method: "POST", body: JSON.stringify({ renames: pathRenames }) }); };
  const handlePathDragStart = (e, pathId) => { setDraggedPathId(pathId); e.dataTransfer.effectAllowed = "move"; };
  const handlePathDragOver = (e, pathId) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; if(draggedPathId !== pathId) setDragOverPathId(pathId); };
  const handlePathDragLeave = () => setDragOverPathId(null);
  const handlePathDrop = (e, targetPathId) => { e.preventDefault(); if(draggedPathId === null || draggedPathId === targetPathId) return; const deptPathsList = floorPaths.filter(p => p.department === dept).sort((a,b)=>(a.display_order||0)-(b.display_order||0)); const draggedIdx = deptPathsList.findIndex(p => p.id === draggedPathId); const targetIdx = deptPathsList.findIndex(p => p.id === targetPathId); if(draggedIdx === targetIdx) return; const newOrder = [...deptPathsList]; const [draggedPath] = newOrder.splice(draggedIdx, 1); newOrder.splice(targetIdx, 0, draggedPath); newOrder.forEach((p, idx) => { const fp = floorPaths.find(fp => fp.id === p.id); if(fp) fp.display_order = idx * 100; }); setDraggedPathId(null); setDragOverPathId(null); tick(); saveFloorCustom(); };
  const handlePathDragEnd = () => { setDraggedPathId(null); setDragOverPathId(null); };
  function switchToHalf(half){ const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate; const ctx=`${dateStr}|${shiftType}|${dept}`; const sKey=shiftKey(dept,dateStr,shiftType); const deptAssigns=shiftAssignments[sKey]||{}; if(!contextStations[ctx]) contextStations[ctx]={}; if(!contextBadges[ctx]) contextBadges[ctx]={}; Object.keys(contextStations[ctx]).forEach(sid=>{ delete contextStations[ctx][sid]; }); Object.keys(contextBadges[ctx]).forEach(badge=>{ delete contextBadges[ctx][badge]; }); Object.entries(deptAssigns).forEach(([badge,assign])=>{ const hd=assign[half]; if(!hd||hd.path==="SEE ADMIN"||!hd.station) return; const sid=hd.station.id; if(!sid||!isValidFloorStation(sid)) return; const assoc=mockAssocs.find(a=>a.badge===badge); if(!assoc) return; setStationAssignment(ctx,sid,{login:assoc.login,name:assoc.name,badge,path:hd.path,roleType:hd.roleType,assignedAt:Date.now(),method:"SCAN",dept,half}); setBadgeAssignment(ctx,badge,sid); }); setShowingHalf(half); tick(); }

  function doAssign(override=false){
    if(!manBadge.trim()){setManMsg("Enter badge or login");return;}
    const assoc=mockAssocs.find(a=>a.badge===manBadge.trim()||a.login===manBadge.trim().toLowerCase());
    if(!assoc){setManMsg("Associate not found");return;}
    const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
    if(preStaffMode){
      const psKey=`${dept}|${dateStr}|${preStaffShift}`;
      if(!preStaffData) preStaffData = {};
      if(!preStaffData[psKey]) preStaffData[psKey]={};
      const ex=preStaffData[psKey][manModal.sid];
      if(ex&&!override){setManMsg(`Pre-staffed: ${ex.login}. Use Override.`);return;}
      preStaffData[psKey][manModal.sid]={login:assoc.login,name:assoc.name,badge:assoc.badge,path:manModal.pathName,roleType:"MANUAL",assignedAt:Date.now(),method:"PRE-STAFF",dept,half:"half1"};
      pushAudit("PRE-STAFF",assoc.badge,assoc.name,manModal.stName,manModal.pathName,dept,preStaffShift,dateStr);
      setManMsg(`Pre-staffed: ${assoc.name} → ${manModal.stName} (${preStaffShift})`);tick();
      setTimeout(()=>{setManModal(null);setManBadge("");setManMsg("");},1400);
      return;
    }
    const ctx=`${dateStr}|${shiftType}|${dept}`;
    const ex=GA(manModal.sid);
    if(ex&&!override){setManMsg(`Occupied by ${ex.login}. Use Override.`);return;}
    // Determine station's department
    const stationObj = floorStations.find(s => s.id === manModal.sid);
    const lineObj = floorLines.find(l => l.id === stationObj?.line_id);
    const pathObj = floorPaths.find(p => p.id === lineObj?.path_id);
    const stationDept = pathObj?.department;
    const isCrossDept = stationDept && assoc.operation_mode !== "BOTH" && assoc.operation_mode !== stationDept;
    if (isCrossDept) {
      if (!localLaborShareEnabled) {
        setManMsg(`Cannot assign ${assoc.name} (${assoc.operation_mode}) to ${stationDept} station. Enable Labor Share Mode to override.`);
        return;
      }
      const used = getCrossDeptUsed(getUsageKey());
      if (localLaborShareCount > 0 && used >= localLaborShareCount) {
        setManMsg(`Labor share limit reached (${used}/${localLaborShareCount}). Cannot assign more cross‑department.`);
        return;
      }
    }
    if(ex){
      const exBadge=ex.badge;
      if(!contextBadges[ctx]) contextBadges[ctx]={};
      delete contextBadges[ctx][exBadge];
    }
    const oldSid=getBadgeAssignment(ctx,assoc.badge);
    if(oldSid){
      if(!contextStations[ctx]) contextStations[ctx]={};
      delete contextStations[ctx][oldSid];
    }
    setStationAssignment(ctx,manModal.sid,{login:assoc.login,name:assoc.name,badge:assoc.badge,path:manModal.pathName,roleType:"MANUAL",assignedAt:Date.now(),method:"MANUAL",dept,half:showingHalf});
    setBadgeAssignment(ctx,assoc.badge,manModal.sid);
    assignHistory.push({badge:assoc.badge,login:assoc.login,name:assoc.name,path:manModal.pathName,station:manModal.stName,roleType:"MANUAL",method:"MANUAL",assignedAt:Date.now(),staffDate:dateStr,shiftType:shiftType,dept,half:showingHalf});
    pushAudit("ASSIGN",assoc.badge,assoc.name,manModal.stName,manModal.pathName,dept,shiftType,dateStr);
    if (isCrossDept) incrementCrossDept(getUsageKey());
    setManMsg(`${assoc.name} → ${manModal.stName}`);tick();
    setTimeout(()=>{setManModal(null);setManBadge("");setManMsg("");},1400);
  }

  const getUsageKey = () => {
    const dateStr = staffDate instanceof Date ? staffDate.toISOString().split("T")[0] : staffDate;
    if (preStaffMode) return `prestaff|${dept}|${dateStr}|${preStaffShift}`;
    return `live|${dept}|${dateStr}|${shiftType}`;
  };

  const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
  const deptPaths=floorPaths.filter(p=>p.department===dept).sort((a,b)=>(a.display_order||0)-(b.display_order||0));
  const ctxForLive = `${dateStr}|${shiftType}|${dept}`;
  const totFilled = preStaffMode ? (preStaffData[`${dept}|${dateStr}|${preStaffShift}`] ? Object.keys(preStaffData[`${dept}|${dateStr}|${preStaffShift}`]).length : 0) : (contextStations[ctxForLive] ? Object.keys(contextStations[ctxForLive]).length : 0);
  const totOpen = preStaffMode ? floorStations.filter(s=>{const p=floorPaths.find(fp=>fp.id===s.path_id);return p?.department===dept&&s.active!==false&&!GA(s.id)&&LA(s.line_id);}).length : floorStations.filter(s=>{const p=floorPaths.find(fp=>fp.id===s.path_id);return p?.department===dept&&s.active!==false&&!GA(s.id)&&LA(s.line_id);}).length;
  const deptColor=dept==="OUTBOUND"?C.orange:C.blue;
  const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;

  const stCell=(st,pathName)=>{
    const asn = GA(st.id);
    const act = SA(st.id);
    return(
      <div key={st.id}
        style={{background:!act?"#f3f4f6":asn?C.redBg:C.greenBg,border:`1.5px solid ${!act?C.border:asn?C.redBorder:C.greenBorder}`,borderRadius:9,padding:"0.5rem 0.6rem",cursor:"pointer",opacity:!act?0.5:1,transition:"all 0.12s"}}
        onClick={()=>{if(!act)return;setManModal({sid:st.id,stName:st.name,pathName,existing:asn||null});setManBadge("");setManMsg("");}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",fontWeight:700,color:asn?C.red:C.green}}>{st.name}</div>
        {asn?(<div style={{marginTop:3}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.text,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{asn.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{asn.login}</div><Bdg color={asn.method==="MANUAL"?C.amber:C.green} bg={asn.method==="MANUAL"?C.amberBg:C.greenBg} border={asn.method==="MANUAL"?C.amberBorder:C.greenBorder} style={{marginTop:3,fontSize:"0.5rem"}}>{asn.method}</Bdg></div>):(<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.green,marginTop:2}}>OPEN</div>)}
        <div style={{display:"flex",gap:3,marginTop:4}}>
          <button onClick={e=>{e.stopPropagation();togSt(st.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.muted,padding:"1px 3px"}}>{act?"OFF":"ON"}</button>
          {asn&&<button onClick={e=>{e.stopPropagation();clrSt(st.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.red,padding:"1px 3px"}}>CLR</button>}
          <button onClick={e=>{e.stopPropagation();setEditStM({...st});}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.muted,padding:"1px 3px"}}>✏</button>
          <button onClick={e=>{e.stopPropagation();if(window.window.window.confirm("Delete station?"))delSt(st.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.5rem",color:C.red,padding:"1px 3px"}}>✕</button>
        </div>
      </div>
    );
  };

  return(
    <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}>
      {preStaffMode&&(<div style={{background:C.purpleBg,border:`1.5px solid ${C.purpleBorder}`,borderRadius:10,padding:"0.6rem 1rem",marginBottom:"0.75rem",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:"1rem"}}>🟣</span><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.purple,fontWeight:600,flex:1}}>PRE-STAFFING MODE — Assignments saved for <strong>{preStaffShift}</strong>. Live floor unaffected.</div><Bdg color={C.purple} bg={C.surface} border={C.purpleBorder}>{(preStaffData?.[`${dept}|${dateStr}|${preStaffShift}`] && Object.keys(preStaffData[`${dept}|${dateStr}|${preStaffShift}`]).length) || 0} pre-staffed</Bdg></div>)}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
        <div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>FLOOR MAP · TEN1 · {dept}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.sub,marginTop:2}}>{fmtDate(staffDate)} · {preStaffMode ? `Pre-staffing ${preStaffShift}` : shiftType} · <span style={{color:C.red}}>{totFilled} filled</span> · <span style={{color:C.green}}>{totOpen} open</span></div></div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
            {[{v:"half1",l:"1ST HALF"},{v:"half2",l:"2ND HALF"}].map(h=>(
              <button key={h.v} onClick={()=>switchToHalf(h.v)}
                style={{padding:"5px 11px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,border:"none",cursor:"pointer",
                  background:showingHalf===h.v?C.teal:"transparent",color:showingHalf===h.v?"#fff":C.muted}}>
                {h.l}
              </button>
            ))}
          </div>
          {/* Labor Share Toggle + Count */}
          <div style={{display:"flex",alignItems:"center",gap:8,background:localLaborShareEnabled?C.purpleBg:C.bg,border:`1.5px solid ${localLaborShareEnabled?C.purpleBorder:C.border}`,borderRadius:8,padding:"3px 8px"}}>
            <button onClick={()=>{ const newVal = !localLaborShareEnabled; setLocalLaborShareEnabled(newVal); /* propagate to parent if needed */ }} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",fontWeight:600,color:localLaborShareEnabled?C.purple:C.muted,letterSpacing:"0.06em"}}>
              {localLaborShareEnabled?"🔄 LABOR SHARE ON":"⚪ LABOR SHARE"}
            </button>
            {localLaborShareEnabled && (
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={localLaborShareCount}
                  onChange={e => setLocalLaborShareCount(parseInt(e.target.value) || 0)}
                  style={{width:60,padding:"0.2rem 0.3rem",borderRadius:4,border:`1px solid ${C.purpleBorder}`,textAlign:"center"}}
                />
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.purple}}>
                  used {getCrossDeptUsed(getUsageKey())}/{localLaborShareCount === 0 ? "∞" : localLaborShareCount}
                </span>
              </div>
            )}
          </div>
          <Btn size="sm" variant="primary" onClick={()=>setAddPathM(true)}>+ Path</Btn>
          <Btn size="sm" onClick={()=>setAddLineM(true)}>+ Line</Btn>
          <Btn size="sm" onClick={()=>setAddStM(true)}>+ Station</Btn>
          <div style={{display:"flex",alignItems:"center",gap:4,background:preStaffMode?C.purpleBg:C.bg,border:`1.5px solid ${preStaffMode?C.purpleBorder:C.border}`,borderRadius:8,padding:"3px 8px"}}>
            <button onClick={()=>setPreStaffMode(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",fontWeight:600,color:preStaffMode?C.purple:C.muted,letterSpacing:"0.06em"}}>
              {preStaffMode?"🟣 PRE-STAFFING":"⚪ PRE-STAFF"}
            </button>
            {preStaffMode&&(
              <Sel value={preStaffShift} onChange={e=>setPreStaffShift(e.target.value)} style={{width:70,padding:"2px 4px",fontSize:"0.58rem"}}>
                {["FHD","FHN","BHD","BHN"].map(s=><option key={s} value={s}>{s}</option>)}
              </Sel>
            )}
          </div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{deptPaths.map((path,pathIdx)=>{const pathLines=floorLines.filter(l=>l.path_id===path.id); const pathStations=floorStations.filter(s=>s.path_id===path.id); const filledCount = preStaffMode ? (preStaffData[`${dept}|${dateStr}|${preStaffShift}`] ? Object.values(preStaffData[`${dept}|${dateStr}|${preStaffShift}`]).filter(a=>a.path===path.name).length : 0) : pathStations.filter(s=>!!GA(s.id)).length; const openCount = preStaffMode ? pathStations.filter(s=>SA(s.id)&&!GA(s.id)&&LA(s.line_id)).length : pathStations.filter(s=>SA(s.id)&&!GA(s.id)&&LA(s.line_id)).length; const isExp=expPaths.has(path.id); return(<div key={path.id} draggable onDragStart={(e) => handlePathDragStart(e, path.id)} onDragOver={(e) => handlePathDragOver(e, path.id)} onDragLeave={handlePathDragLeave} onDrop={(e) => handlePathDrop(e, path.id)} onDragEnd={handlePathDragEnd} style={{background:C.surface,border:`1.5px solid ${dragOverPathId===path.id?C.blueBorder:PA(path.id)?deptBorder:C.border}`,borderRadius:14,overflow:"hidden",opacity:draggedPathId===path.id?0.5:PA(path.id)?1:0.6,transition:"all 0.15s",cursor:"grab"}}><div style={{display:"flex",alignItems:"center",gap:10,padding:"0.85rem 1rem",cursor:"pointer",background:PA(path.id)?"transparent":"#f9fafb"}} onClick={()=>tep(path.id)}><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,fontSize:"0.78rem",color:C.text}}>{getDisplayRoleName(path.name, dept)}</span><Bdg color={path.role_type==="INDIRECT"?C.purple:C.blue} bg={path.role_type==="INDIRECT"?C.purpleBg:C.blueBg} border={path.role_type==="INDIRECT"?C.purpleBorder:C.blueBorder} style={{fontSize:"0.52rem"}}>{path.role_type}</Bdg><Bdg color={C.red} bg={C.redBg} border={C.redBorder} style={{fontSize:"0.52rem"}}>{filledCount} filled</Bdg><Bdg color={C.green} bg={C.greenBg} border={C.greenBorder} style={{fontSize:"0.52rem"}}>{openCount} open</Bdg></div></div><div style={{display:"flex",gap:5,alignItems:"center"}}><button onClick={e=>{e.stopPropagation();togPath(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,padding:"2px 5px"}}>{PA(path.id)?"DISABLE":"ENABLE"}</button><button onClick={e=>{e.stopPropagation();expAllL(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,padding:"2px 5px"}}>ALL</button><button onClick={e=>{e.stopPropagation();colAllL(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,padding:"2px 5px"}}>NONE</button><button onClick={e=>{e.stopPropagation();setRenamePathM({id:path.id,name:path.name});}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.blue,padding:"2px 5px"}}>✏ REN</button><button onClick={e=>{e.stopPropagation();if(window.window.window.confirm(`Delete path "${path.name}" and all its lines/stations?`))delPath(path.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.red,padding:"2px 5px"}}>DEL</button><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>{isExp?"▲":"▼"}</span></div></div>{isExp&&(<div style={{borderTop:`1px solid ${C.border}`,padding:"0.75rem 1rem",display:"flex",flexDirection:"column",gap:8}}>{pathLines.map(line=>{const lineStations=floorStations.filter(s=>s.line_id===line.id); const odd=lineStations.filter(s=>s.side==="ODD"); const evn=lineStations.filter(s=>s.side==="EVEN"); const isLineExp=expLines.has(line.id); return(<div key={line.id} style={{background:C.bg,borderRadius:10,border:`1px solid ${LA(line.id)?C.border:"#e5e7eb"}`,opacity:LA(line.id)?1:0.55}}><div style={{display:"flex",alignItems:"center",gap:8,padding:"0.55rem 0.75rem",cursor:"pointer"}} onClick={()=>tel(line.id)}><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",fontWeight:600,color:C.text,flex:1}}>{line.name}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted}}>{lineStations.filter(s=>!!GA(s.id)).length}/{lineStations.length} filled</span><button onClick={e=>{e.stopPropagation();togLine(line.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted,padding:"1px 4px"}}>{LA(line.id)?"OFF":"ON"}</button><button onClick={e=>{e.stopPropagation();if(window.window.window.confirm(`Delete line "${line.name}"?`))delLine(line.id);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.red,padding:"1px 4px"}}>DEL</button><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.muted}}>{isLineExp?"▲":"▼"}</span></div>{isLineExp&&(<div style={{padding:"0 0.75rem 0.75rem"}}>{odd.length>0&&(<div style={{marginBottom:"0.6rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,letterSpacing:"0.12em",marginBottom:6}}>ODD SIDE</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:6}}>{odd.map(st=>stCell(st,path.name))}</div></div>)}{evn.length>0&&(<div style={{marginTop:"0.6rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:C.muted,letterSpacing:"0.12em",marginBottom:6}}>EVEN SIDE</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:6}}>{evn.map(st=>stCell(st,path.name))}</div></div>)}</div>)}</div>);})}</div>)}</div>);})}</div>
      <Modal open={!!manModal} onClose={()=>{setManModal(null);setManBadge("");setManMsg("");}} title={`Station: ${manModal?.stName} — ${manModal?.pathName}`}>{manModal?.existing&&<div style={{marginBottom:"1rem"}}><div style={{background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:8,padding:"0.75rem",marginBottom:"0.75rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.red,marginBottom:3}}>Currently assigned:</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,fontWeight:600}}>{manModal.existing.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted}}>{manModal.existing.login} · {manModal.existing.method}</div></div><Btn variant="danger" onClick={()=>clrSt(manModal.sid)}>Clear Station</Btn></div>}{manMsg&&<div style={{background:manMsg.includes("→")?C.greenBg:C.redBg,border:`1px solid ${manMsg.includes("→")?C.greenBorder:C.redBorder}`,borderRadius:8,padding:"0.6rem 0.9rem",marginBottom:"0.75rem",fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:manMsg.includes("→")?C.green:C.red}}>{manMsg}</div>}<Field label={manModal?.existing?"OVERRIDE WITH":"ASSIGN ASSOCIATE"}><Inp value={manBadge} onChange={e=>setManBadge(e.target.value)} placeholder="Badge or login"/></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn onClick={()=>{setManModal(null);setManBadge("");setManMsg("");}}>Cancel</Btn>{manModal?.existing&&<Btn variant="danger" onClick={()=>doAssign(true)}>Override</Btn>}<Btn variant="primary" onClick={()=>doAssign(false)}>Assign</Btn></div></Modal>
      <Modal open={!!editStM} onClose={()=>setEditStM(null)} title="Edit Station"><Field label="NAME"><Inp value={editStM?.name||""} onChange={e=>setEditStM({...editStM,name:e.target.value})}/></Field><Field label="SIDE"><Sel value={editStM?.side||"ODD"} onChange={e=>setEditStM({...editStM,side:e.target.value})}><option value="ODD">ODD</option><option value="EVEN">EVEN</option></Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setEditStM(null)}>Cancel</Btn><Btn variant="primary" onClick={()=>{const s=floorStations.find(x=>x.id===editStM.id);if(s){s.name=editStM.name;s.side=editStM.side;}setEditStM(null);tick();}}>Save</Btn></div></Modal>
      <Modal open={addPathM} onClose={()=>setAddPathM(false)} title={`Add New Path — ${dept}`}><Field label="PATH NAME" req><Inp value={nPath.name} onChange={e=>setNPath({...nPath,name:e.target.value})} placeholder="e.g. CRETS High Side"/></Field><Field label="ROLE TYPE"><Sel value={nPath.role_type} onChange={e=>setNPath({...nPath,role_type:e.target.value})}><option value="DIRECT">DIRECT (10hr cap)</option><option value="INDIRECT">INDIRECT (5hr cap)</option></Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setAddPathM(false)}>Cancel</Btn><Btn variant="primary" onClick={addPath2}>Add Path</Btn></div></Modal>
      <Modal open={addLineM} onClose={()=>setAddLineM(false)} title="Add New Line"><Field label="LINE NAME" req><Inp value={nLine.name} onChange={e=>setNLine({...nLine,name:e.target.value})} placeholder="e.g. Line 9"/></Field><Field label="PATH" req><Sel value={nLine.path_id||""} onChange={e=>setNLine({...nLine,path_id:e.target.value})}><option value="">— Select Path —</option>{deptPaths.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setAddLineM(false)}>Cancel</Btn><Btn variant="primary" onClick={addLine2}>Add Line</Btn></div></Modal>
      <Modal open={addStM} onClose={()=>setAddStM(false)} title="Add Station"><Field label="STATION NAME" req><Inp value={nSt.name} onChange={e=>setNSt({...nSt,name:e.target.value})} placeholder="e.g. Dock Door 250"/></Field><Field label="SIDE"><Sel value={nSt.side} onChange={e=>setNSt({...nSt,side:e.target.value})}><option value="ODD">ODD</option><option value="EVEN">EVEN</option></Sel></Field><Field label="LINE" req><Sel value={nSt.line_id||""} onChange={e=>setNSt({...nSt,line_id:e.target.value})}><option value="">— Select Line —</option>{floorLines.filter(l=>deptPaths.some(p=>p.id===l.path_id)).map(l=>{const p=deptPaths.find(x=>x.id===l.path_id);return<option key={l.id} value={l.id}>{p?.name} / {l.name}</option>;})}</Sel></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setAddStM(false)}>Cancel</Btn><Btn variant="primary" onClick={addSt2}>Add Station</Btn></div></Modal>
      <Modal open={!!renamePathM} onClose={()=>setRenamePathM(null)} title="Rename Path"><Field label="PATH NAME" req><Inp value={renamePathM?.name||""} onChange={e=>setRenamePathM({...renamePathM,name:e.target.value})} placeholder="New path name"/></Field><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>setRenamePathM(null)}>Cancel</Btn><Btn variant="primary" onClick={()=>{ if(!renamePathM?.name.trim()) return; const p=floorPaths.find(x=>x.id===renamePathM.id); if(p){ p.name=renamePathM.name.trim(); pathRenames[renamePathM.id]=renamePathM.name.trim(); savePathRenames(); tick(); saveFloorCustom(); } setRenamePathM(null); }}>Save</Btn></div></Modal>
    </div>
  );
}

// ======================= COMPONENTS YOU WILL KEEP (placeholders) =======================
// Replace these with your original implementations (they are unchanged from your previous working version)
// ======================= PERMISSIONS =======================
function Permissions({dept}) {
  const [view,setView]=useState("byAssoc");
  const [search,setSearch]=useState("");
  const [editAssoc,setEditAssoc]=useState(null);
  const [editPerm,setEditPerm]=useState(null);
  const [addingPerm,setAddingPerm]=useState(false);
  const [nPerm,setNPerm]=useState({path_name:"Unloader",lc_level:1});
  const [,fu]=useState(0);
  const deptAssocs=mockAssocs.filter(a=>a.operation_mode===dept||a.operation_mode==="BOTH");
  const displayAssocs=deptAssocs.filter(a=>{const s=search.toLowerCase();return !search||a.name.toLowerCase().includes(s)||a.login.toLowerCase().includes(s)||a.badge.includes(search);});
  const indList=dept==="OUTBOUND"?OUTBOUND_INDIRECT_LIST:INBOUND_INDIRECT_LIST;
  const dirList=dept==="OUTBOUND"?OUTBOUND_DIRECT_LIST:INBOUND_DIRECT_LIST;
  const allPaths=[...indList,...dirList];
  const matrix={};
  allPaths.forEach(p=>{matrix[p]={path:p,lc1:0,lc2:0,lc3:0,lc4:0,lc5:0,total:0,type:isInd(p)?"INDIRECT":"DIRECT"};});
  deptAssocs.forEach(a=>(a.permissions||[]).forEach(pm=>{if(matrix[pm.path_name]){matrix[pm.path_name][`lc${pm.lc_level}`]++;matrix[pm.path_name].total++;}}));
  const matRows=Object.values(matrix).sort((a,b)=>(PATH_PRIORITY[b.path]||0)-(PATH_PRIORITY[a.path]||0));
  function saveEdit(){if(!editAssoc||!editPerm)return;const idx=mockAssocs.findIndex(a=>a.badge===editAssoc.badge);if(idx<0)return;const pi=mockAssocs[idx].permissions.findIndex(p=>p.path_name===editPerm.path_name);if(pi>=0)mockAssocs[idx].permissions[pi].lc_level=editPerm.lc_level;setEditPerm(null);fu(n=>n+1);}
  function delPerm(badge,pn){const idx=mockAssocs.findIndex(a=>a.badge===badge);if(idx>=0)mockAssocs[idx].permissions=mockAssocs[idx].permissions.filter(p=>p.path_name!==pn);fu(n=>n+1);}
  function addPerm(){if(!editAssoc||!nPerm.path_name)return;const idx=mockAssocs.findIndex(a=>a.badge===editAssoc.badge);if(idx<0)return;const ex=mockAssocs[idx].permissions.find(p=>p.path_name===nPerm.path_name);if(ex)ex.lc_level=parseInt(nPerm.lc_level);else mockAssocs[idx].permissions.push({path_name:nPerm.path_name,lc_level:parseInt(nPerm.lc_level),role_type:isInd(nPerm.path_name)?"INDIRECT":"DIRECT"});setAddingPerm(false);setNPerm({path_name:indList[0],lc_level:1});fu(n=>n+1);}
  return(
    <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>PERMISSIONS · TEN1 · {dept}</div><div style={{display:"flex",gap:6}}>{["byAssoc","matrix"].map(v=><button key={v} onClick={()=>setView(v)} style={{background:view===v?C.greenBg:C.surface,border:`1.5px solid ${view===v?C.green:C.border}`,borderRadius:7,padding:"4px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:view===v?C.green:C.muted,cursor:"pointer"}}>{v==="byAssoc"?"By Associate":"By Path"}</button>)}</div></div>
      <Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search associate..." style={{marginBottom:14}}/>
      {view==="matrix"&&(<div style={{display:"flex",flexDirection:"column",gap:7}}><div style={{display:"grid",gridTemplateColumns:"1fr 44px 32px 32px 32px 32px 32px 56px",gap:3,padding:"0.4rem 0.75rem",fontFamily:"'DM Mono',monospace",fontSize:"0.57rem",color:C.muted,letterSpacing:"0.08em"}}><div>PATH</div><div style={{textAlign:"center"}}>TYPE</div>{[1,2,3,4,5].map(l=><div key={l} style={{textAlign:"center",color:LC_COLOR(l)}}>L{l}</div>)}<div style={{textAlign:"center"}}>TOTAL</div></div>{matRows.map(row=>(<div key={row.path} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.7rem 0.75rem",display:"grid",gridTemplateColumns:"1fr 44px 32px 32px 32px 32px 32px 56px",gap:3,alignItems:"center"}}><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",color:C.text,fontWeight:600}}>{row.path}</div><Bdg color={C.amber} bg={C.amberBg} border={C.amberBorder} style={{marginTop:3,fontSize:"0.52rem"}}>P{PATH_PRIORITY[row.path]||"?"}/10</Bdg></div><div style={{textAlign:"center"}}><Bdg color={row.type==="INDIRECT"?C.purple:C.blue} bg={row.type==="INDIRECT"?C.purpleBg:C.blueBg} border={row.type==="INDIRECT"?C.purpleBorder:C.blueBorder} style={{fontSize:"0.52rem"}}>{row.type==="INDIRECT"?"I":"D"}</Bdg></div>{[1,2,3,4,5].map(l=><div key={l} style={{textAlign:"center"}}>{row[`lc${l}`]>0?<span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",fontWeight:700,color:LC_COLOR(l),background:LC_BG(l),border:`1px solid ${LC_BORDER(l)}`,borderRadius:5,padding:"1px 5px"}}>{row[`lc${l}`]}</span>:<span style={{color:C.faint,fontSize:"0.6rem"}}>-</span>}</div>)}<div style={{textAlign:"center"}}><Bdg color={C.text} bg={C.bg} border={C.border}>{row.total}</Bdg></div></div>))}</div>)}
      {view==="byAssoc"&&(<div style={{display:"flex",flexDirection:"column",gap:8}}>{displayAssocs.map(a=>(<div key={a.badge} style={{background:C.surface,border:`1.5px solid ${editAssoc?.badge===a.badge?C.green:C.border}`,borderRadius:12,padding:"0.9rem 1rem"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:36,height:36,borderRadius:"50%",background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"0.8rem",flexShrink:0}}>{a.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,fontWeight:600}}>{a.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{a.login} · {a.badge} · {a.operation_mode}</div></div><Bdg>{(a.permissions||[]).length} paths</Bdg><Btn size="sm" onClick={()=>setEditAssoc(editAssoc?.badge===a.badge?null:a)}>{editAssoc?.badge===a.badge?"Done":"Edit"}</Btn></div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{(a.permissions||[]).length===0&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.faint}}>No permissions — click Edit to add</span>}{(a.permissions||[]).map(p=>(<div key={p.path_name} style={{background:LC_BG(p.lc_level),border:`1.5px solid ${LC_BORDER(p.lc_level)}`,borderRadius:6,padding:"2px 7px",display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.text}}>{p.path_name}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",fontWeight:700,color:LC_COLOR(p.lc_level)}}>L{p.lc_level}</span>{editAssoc?.badge===a.badge&&<button onClick={()=>{setEditPerm({...p});}} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:"0.6rem",padding:"0 2px"}}>✏</button>}{editAssoc?.badge===a.badge&&<button onClick={()=>delPerm(a.badge,p.path_name)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:"0.6rem",padding:"0 2px"}}>✕</button>}</div>))}</div>{editAssoc?.badge===a.badge&&(<div style={{marginTop:10,borderTop:`1px solid ${C.border}`,paddingTop:10}}>{editPerm&&(<div style={{background:C.amberBg,border:`1px solid ${C.amberBorder}`,borderRadius:8,padding:"0.75rem",marginBottom:8}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.amber,marginBottom:6}}>Edit: {editPerm.path_name}</div><div style={{display:"flex",gap:6,alignItems:"center"}}><Sel value={editPerm.lc_level} onChange={e=>setEditPerm({...editPerm,lc_level:parseInt(e.target.value)})} style={{width:120}}>{[1,2,3,4,5].map(l=><option key={l} value={l}>L{l} — {LC_LABEL(l)}</option>)}</Sel><Btn variant="primary" size="sm" onClick={saveEdit}>Save</Btn><Btn size="sm" onClick={()=>setEditPerm(null)}>Cancel</Btn></div></div>)}{addingPerm?(<div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:8,padding:"0.75rem"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.green,marginBottom:6}}>Add Permission</div><div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><Sel value={nPerm.path_name} onChange={e=>setNPerm({...nPerm,path_name:e.target.value})} style={{flex:1,minWidth:140}}><optgroup label="INDIRECT">{indList.map(p=><option key={p} value={p}>{p}</option>)}</optgroup><optgroup label="DIRECT">{dirList.map(p=><option key={p} value={p}>{p}</option>)}</optgroup></Sel><Sel value={nPerm.lc_level} onChange={e=>setNPerm({...nPerm,lc_level:parseInt(e.target.value)})} style={{width:120}}>{[1,2,3,4,5].map(l=><option key={l} value={l}>L{l} — {LC_LABEL(l)}</option>)}</Sel><Btn variant="primary" size="sm" onClick={addPerm}>Add</Btn><Btn size="sm" onClick={()=>setAddingPerm(false)}>Cancel</Btn></div></div>):(<Btn size="sm" variant="primary" onClick={()=>setAddingPerm(true)}>+ Add Permission</Btn>)}</div>)}</div>))}</div>)}
    </div>
  );
}

// ======================= ASSOCIATES FULL =======================
function AssociatesFull({dept}) {
  const [search, setSearch] = useState("");
  const [opF, setOpF] = useState("ALL");
  const [shF, setShF] = useState("ALL");
  const [openId, setOpenId] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newAssoc, setNewAssoc] = useState({
    badge: "", login: "", name: "", shift_code: "FHD", operation_mode: dept, default_dept: dept, manager: ""
  });
  const [addErr, setAddErr] = useState("");
  const [, fu] = useState(0);
  const tick = () => fu(n => n + 1);

  // Refresh the global mockAssocs from backend
  const refreshAssociates = async () => {
    const data = await api("/associates");
    if (Array.isArray(data) && data.length) {
      mockAssocs = data.map(a => ({
        ...a,
        permissions: a.permissions || [],
        weekHours: a.weekHours || [],
        yesterdayRoles: a.yesterdayRoles || [],
      }));
      tick();
    }
  };

  // Delete associate
  const deleteAssociate = async (badge, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name} (${badge})? This cannot be undone.`)) return;
    const res = await api(`/associates/${badge}`, { method: "DELETE" });
    if (res && res.success) {
      await refreshAssociates();
      if (openId === badge) setOpenId(null);
    } else {
      alert("Failed to delete associate.");
    }
  };

  // Add new associate
  const addAssociate = async () => {
    setAddErr("");
    if (!newAssoc.badge.trim()) { setAddErr("Badge ID required"); return; }
    if (!newAssoc.login.trim()) { setAddErr("Login required"); return; }
    if (!newAssoc.name.trim()) { setAddErr("Name required"); return; }
    const res = await api("/associates", {
      method: "POST",
      body: JSON.stringify({
        badge: newAssoc.badge.trim(),
        login: newAssoc.login.trim(),
        name: newAssoc.name.trim(),
        shift_code: newAssoc.shift_code,
        operation_mode: newAssoc.operation_mode,
        default_dept: newAssoc.default_dept,
        manager: newAssoc.manager.trim(),
        home_dept: "CRETS Processing"
      })
    });
    if (res && !res.error) {
      setAddModal(false);
      setNewAssoc({ badge: "", login: "", name: "", shift_code: "FHD", operation_mode: dept, default_dept: dept, manager: "" });
      await refreshAssociates();
    } else {
      setAddErr(res?.error || "Failed to add associate");
    }
  };

  const filtered = mockAssocs.filter(a => {
    const s = search.toLowerCase();
    return (!search || a.name.toLowerCase().includes(s) || a.login.toLowerCase().includes(s) || a.badge.includes(search)) &&
      (opF === "ALL" || a.operation_mode === opF) &&
      (shF === "ALL" || a.shift_code === shF);
  });

  return (
    <div style={{ padding: "1.5rem", height: "100%", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, letterSpacing: "0.25em" }}>
          ASSOCIATES · {filtered.length} of {mockAssocs.length}
        </div>
        <Btn variant="primary" size="sm" onClick={() => setAddModal(true)}>+ ADD ASSOCIATE</Btn>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <Inp value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, login, badge..." style={{ flex: 1, minWidth: 140 }} />
        <Sel value={opF} onChange={e => setOpF(e.target.value)} style={{ width: 130 }}>
          <option value="ALL">All Modes</option>
          <option value="INBOUND">Inbound</option>
          <option value="OUTBOUND">Outbound</option>
          <option value="BOTH">Both/Flex</option>
        </Sel>
        <Sel value={shF} onChange={e => setShF(e.target.value)} style={{ width: 100 }}>
          <option value="ALL">All Shifts</option>
          {["FHD", "BHD", "FHN", "BHN"].map(s => <option key={s} value={s}>{s}</option>)}
        </Sel>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {filtered.map(a => {
          const isOpen = openId === a.badge;
          const deptColor = a.operation_mode === "OUTBOUND" ? C.orange : a.operation_mode === "BOTH" ? C.teal : C.blue;
          const onFloor = Object.values(contextBadges).some(ctx => ctx[a.badge]);
          return (
            <div key={a.badge} style={{ background: C.surface, border: `1.5px solid ${isOpen ? C.greenBorder : C.border}`, borderRadius: 12, padding: "0.9rem 1rem", cursor: "pointer" }} onClick={() => setOpenId(isOpen ? null : a.badge)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.greenBg, border: `1.5px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontWeight: 700, color: C.green, fontSize: "0.85rem", flexShrink: 0 }}>
                  {a.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.78rem", color: C.text, fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted }}>{a.login} · {a.badge}</div>
                </div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
                  <Bdg color={C.sub} bg={C.bg} border={C.border}>{a.shift_code}</Bdg>
                  <Bdg color={deptColor} bg={C.bg} border={C.border}>{a.operation_mode}</Bdg>
                  <Bdg>{(a.permissions || []).length} paths</Bdg>
                  {onFloor && <Bdg color={C.amber} bg={C.amberBg} border={C.amberBorder}>ON FLOOR</Bdg>}
                  <Btn size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); deleteAssociate(a.badge, a.name); }}>DELETE</Btn>
                </div>
              </div>
              {isOpen && (
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${C.bg}` }}>
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem", color: C.faint, letterSpacing: "0.15em", marginBottom: 5 }}>PERMISSIONS</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {(a.permissions || []).length === 0 ? (
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: C.faint }}>None — add in Permissions tab</span>
                      ) : (
                        (a.permissions || []).map(p => (
                          <div key={p.path_name} style={{ background: LC_BG(p.lc_level), border: `1.5px solid ${LC_BORDER(p.lc_level)}`, borderRadius: 6, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: C.text }}>{getDisplayRoleName(p.path_name, a.operation_mode === "BOTH" ? (a.default_dept || "INBOUND") : a.operation_mode)}</span>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", fontWeight: 700, color: LC_COLOR(p.lc_level) }}>{p.lc_level}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.faint }}>
            No associates match filters.
          </div>
        )}
      </div>

      {/* Add Associate Modal */}
      <Modal open={addModal} onClose={() => { setAddModal(false); setAddErr(""); setNewAssoc({ badge: "", login: "", name: "", shift_code: "FHD", operation_mode: dept, default_dept: dept, manager: "" }); }} title="Add Associate" width={440}>
        {addErr && <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "0.6rem", marginBottom: "1rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.red }}>{addErr}</div>}
        <Field label="BADGE ID" req><Inp value={newAssoc.badge} onChange={e => setNewAssoc({ ...newAssoc, badge: e.target.value })} placeholder="e.g. 500099" /></Field>
        <Field label="LOGIN" req><Inp value={newAssoc.login} onChange={e => setNewAssoc({ ...newAssoc, login: e.target.value })} placeholder="e.g. jsmith" /></Field>
        <Field label="FULL NAME" req><Inp value={newAssoc.name} onChange={e => setNewAssoc({ ...newAssoc, name: e.target.value })} placeholder="John Smith" /></Field>
        <Field label="SHIFT"><Sel value={newAssoc.shift_code} onChange={e => setNewAssoc({ ...newAssoc, shift_code: e.target.value })}><option value="FHD">FHD</option><option value="BHD">BHD</option><option value="FHN">FHN</option><option value="BHN">BHN</option></Sel></Field>
        <Field label="DEPT MODE"><Sel value={newAssoc.operation_mode} onChange={e => setNewAssoc({ ...newAssoc, operation_mode: e.target.value, default_dept: e.target.value === "BOTH" ? newAssoc.default_dept : e.target.value })}>
          <option value="INBOUND">INBOUND</option><option value="OUTBOUND">OUTBOUND</option><option value="BOTH">BOTH/FLEX</option>
        </Sel></Field>
        {newAssoc.operation_mode === "BOTH" && (
          <Field label="DEFAULT DEPT"><Sel value={newAssoc.default_dept} onChange={e => setNewAssoc({ ...newAssoc, default_dept: e.target.value })}><option value="INBOUND">INBOUND</option><option value="OUTBOUND">OUTBOUND</option></Sel></Field>
        )}
        <Field label="MANAGER (optional)"><Inp value={newAssoc.manager} onChange={e => setNewAssoc({ ...newAssoc, manager: e.target.value })} placeholder="Last, First" /></Field>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: "1rem" }}>
          <Btn onClick={() => { setAddModal(false); setAddErr(""); }}>Cancel</Btn>
          <Btn variant="primary" onClick={addAssociate}>Add Associate</Btn>
        </div>
      </Modal>
    </div>
  );
}

function AssignHistory(){
  const [search,setSearch]=useState("");
  const [dateF,setDateF]=useState("");
  const [roleF,setRoleF]=useState("ALL");
  const [deptF,setDeptF]=useState("ALL");
  const [halfF,setHalfF]=useState("ALL");
  const [,tick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>tick(n=>n+1),5000);return()=>clearInterval(t);},[]);
  pruneOldHistory();
  const seedH=[]; Object.entries(weekHistory).forEach(([badge,entries])=>{const a=mockAssocs.find(x=>x.badge===badge);if(!a)return;entries.forEach(e=>seedH.push({badge,login:a.login,name:a.name,path:e.pathName,roleType:e.roleType,method:"HISTORY",assignedAt:0,staffDate:e.date,shiftType:e.shiftType||"—",dept:e.dept||"INBOUND",half:e.half||"half1",station:null}));});
  const combined=[...assignHistory,...seedH.filter(s=>!assignHistory.find(h=>h.badge===s.badge&&h.staffDate===s.staffDate&&h.path===s.path&&h.half===s.half))].reverse();
  const filtered=combined.filter(e=>{const q=search.toLowerCase();return(!search||e.name?.toLowerCase().includes(q)||e.login?.toLowerCase().includes(q)||e.badge?.includes(search)||e.path?.toLowerCase().includes(q))&&(!dateF||e.staffDate===dateF)&&(roleF==="ALL"||(roleF==="DIRECT"&&isDirect(e.path))||(roleF==="INDIRECT"&&isInd(e.path)))&&(deptF==="ALL"||e.dept===deptF)&&(halfF==="ALL"||e.half===halfF);});
  const byA={}; filtered.forEach(e=>{if(!byA[e.badge])byA[e.badge]={badge:e.badge,login:e.login,name:e.name,entries:[]};byA[e.badge].entries.push(e);});
  const groups=Object.values(byA).sort((a,b)=>a.name?.localeCompare(b.name));
  return(
    <div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1rem"}}>ASSIGNMENT HISTORY · ROLLING 14 DAYS</div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{flex:1,minWidth:160}}/><input type="date" value={dateF} onChange={e=>setDateF(e.target.value)} style={{padding:"0.6rem 0.8rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",background:"#f9fafb"}}/><div style={{display:"flex",background:C.bg,borderRadius:8,overflow:"hidden"}}>{["ALL","DIRECT","INDIRECT"].map(r=><button key={r} onClick={()=>setRoleF(r)} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",border:"none",cursor:"pointer",background:roleF===r?C.green:"transparent",color:roleF===r?"#fff":C.muted}}>{r}</button>)}</div><div style={{display:"flex",background:C.bg,borderRadius:8,overflow:"hidden"}}>{["ALL","INBOUND","OUTBOUND"].map(d=><button key={d} onClick={()=>setDeptF(d)} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",border:"none",cursor:"pointer",background:deptF===d?C.blue:"transparent",color:deptF===d?"#fff":C.muted}}>{d}</button>)}</div><div style={{display:"flex",background:C.bg,borderRadius:8,overflow:"hidden"}}>{[{v:"ALL",l:"ALL"},{v:"half1",l:"1ST"},{v:"half2",l:"2ND"}].map(h=><button key={h.v} onClick={()=>setHalfF(h.v)} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",border:"none",cursor:"pointer",background:halfF===h.v?C.teal:"transparent",color:halfF===h.v?"#fff":C.muted}}>{h.l}</button>)}</div>{(search||dateF||roleF!=="ALL"||deptF!=="ALL"||halfF!=="ALL")&&<Btn size="sm" onClick={()=>{setSearch("");setDateF("");setRoleF("ALL");setDeptF("ALL");setHalfF("ALL");}}>Clear</Btn>}</div>
      {groups.length===0&&<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>📋</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>No history yet — scan in associates to populate.</div></div>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>{groups.map(g=>(<div key={g.badge} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"0.9rem 1rem"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:36,height:36,borderRadius:"50%",background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"0.8rem",flexShrink:0}}>{g.name?.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"??"}</div><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,fontWeight:600}}>{g.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{g.login} · {g.badge}</div></div><Bdg>{g.entries.length} record{g.entries.length!==1?"s":""}</Bdg></div><div style={{display:"flex",flexDirection:"column",gap:4}}>{g.entries.map((e,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"0.45rem 0.75rem",background:e.half==="half2"?C.tealBg:C.bg,borderRadius:8,flexWrap:"wrap",border:`1px solid ${e.half==="half2"?C.tealBorder:C.border}`}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:e.half==="half2"?C.teal:C.muted,fontWeight:700,minWidth:36}}>{e.half==="half2"?"2ND":"1ST"}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.text,fontWeight:600,minWidth:120}}>{e.path}</div>{e.station&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>Stn {e.station}</div>}<Bdg color={isDirect(e.path)?C.blue:C.purple}>{isDirect(e.path)?"DIRECT":"INDIRECT"}</Bdg><Bdg color={e.dept==="OUTBOUND"?C.orange:C.blue}>{e.dept||"INBOUND"}</Bdg><Bdg color={e.method==="MANUAL"?C.amber:C.green}>{e.method||"SCAN"}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.teal,marginLeft:"auto"}}>{e.staffDate}</div><Bdg color={e.shiftType==="DAY"?C.amber:e.shiftType==="NIGHT"?C.purple:C.muted}>{e.shiftType||"—"}</Bdg></div>))}</div></div>))}</div>
    </div>
  );
}

// ======================= SEARCH LOOKUP (unchanged) =======================
// ======================= SEARCH LOOKUP =======================
function SearchLookup(){
  const [query,setQuery]=useState("");
  const [result,setResult]=useState(null);
  const [searched,setSearched]=useState(false);
  function doSearch(){ if(!query.trim()){setResult(null);setSearched(false);return;} const q=query.trim().toLowerCase(); const assoc=mockAssocs.find(a=>a.badge===query.trim()||a.login===q||a.name.toLowerCase().includes(q)); setSearched(true); if(!assoc){setResult(null);return;} const allAssigns=[]; assignHistory.filter(e=>e.badge===assoc.badge).forEach(e=>allAssigns.push({...e,source:"live"})); (weekHistory[assoc.badge]||[]).forEach(e=>{const already=allAssigns.find(a=>a.staffDate===e.date&&a.path===e.pathName&&a.half===e.half);if(!already) allAssigns.push({badge:assoc.badge,login:assoc.login,name:assoc.name,path:e.pathName,roleType:e.roleType,staffDate:e.date,shiftType:e.shiftType||"—",dept:e.dept||"INBOUND",half:e.half||"half1",method:"HISTORY",station:null,source:"history"});}); Object.entries(shiftAssignments).forEach(([sKey,assigns])=>{const sa=assigns[assoc.badge];if(!sa)return;const [dept,date,shiftType]=sKey.split("|");["half1","half2"].forEach(half=>{const hd=sa[half];if(!hd||hd.path==="SEE ADMIN")return;const already=allAssigns.find(a=>a.staffDate===date&&a.path===hd.path&&a.half===half);if(!already) allAssigns.push({badge:assoc.badge,login:assoc.login,name:assoc.name,path:hd.path,roleType:hd.roleType,staffDate:date,shiftType,dept,half,method:"SCAN",station:hd.station?.name||null,source:"session"});});}); allAssigns.sort((a,b)=>b.staffDate.localeCompare(a.staffDate)); setResult({assoc,assignments:allAssigns}); }
  const deptColor=result?.assoc?.operation_mode==="OUTBOUND"?C.orange:result?.assoc?.operation_mode==="BOTH"?C.teal:C.blue;
  return(<div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em",marginBottom:"1rem"}}>EMPLOYEE LOOKUP</div><div style={{display:"flex",gap:8,marginBottom:"1.5rem"}}><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder="Badge or login..." style={{flex:1,padding:"0.75rem 1rem",border:`1.5px solid ${C.border}`,borderRadius:10,fontFamily:"'DM Mono',monospace",fontSize:"0.8rem",background:"#f9fafb"}}/><Btn variant="primary" onClick={doSearch}>🔍 Search</Btn>{query&&<Btn onClick={()=>{setQuery("");setResult(null);setSearched(false);}}>Clear</Btn>}</div>{searched&&!result&&(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.redBorder}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>⚠️</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.red}}>NOT FOUND</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.muted}}>No associate matches "{query}"</div></div>)}{result&&(<div><div style={{background:C.surface,border:`1.5px solid ${C.greenBorder}`,borderRadius:14,padding:"1.1rem 1.25rem",marginBottom:"1.25rem"}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:48,height:48,borderRadius:"50%",background:C.greenBg,border:`2px solid ${C.greenBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:C.green,fontSize:"1.1rem",flexShrink:0}}>{result.assoc.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{flex:1}}><div style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.4rem",color:C.text,lineHeight:1}}>{result.assoc.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.62rem",color:C.muted}}>{result.assoc.login} · Badge {result.assoc.badge}</div></div><div style={{display:"flex",gap:6}}><Bdg>{result.assoc.shift_code}</Bdg><Bdg color={deptColor}>{result.assoc.operation_mode}</Bdg><Bdg>{(result.assoc.permissions||[]).length} paths</Bdg></div></div></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.2em",marginBottom:10}}>ASSIGNMENT HISTORY · {result.assignments.length} records</div>{result.assignments.length===0?(<div style={{textAlign:"center",padding:"2rem",background:C.surface,borderRadius:12}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.faint}}>No assignment records found.</div></div>):(<div style={{display:"flex",flexDirection:"column",gap:5}}>{result.assignments.map((e,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"0.55rem 0.9rem",background:e.half==="half2"?C.tealBg:C.surface,borderRadius:10,border:`1.5px solid ${e.half==="half2"?C.tealBorder:C.border}`,flexWrap:"wrap"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.55rem",color:e.half==="half2"?C.teal:C.muted,fontWeight:700,minWidth:36}}>{e.half==="half2"?"2ND":"1ST"}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",color:C.text,fontWeight:600,flex:1,minWidth:130}}>{e.path}</div>{e.station&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted}}>Stn {e.station}</div>}<Bdg color={isDirect(e.path)?C.blue:C.purple}>{isDirect(e.path)?"DIRECT":"INDIRECT"}</Bdg><Bdg color={e.dept==="OUTBOUND"?C.orange:C.blue}>{e.dept||"INBOUND"}</Bdg><Bdg color={e.shiftType==="DAY"?C.amber:e.shiftType==="NIGHT"?C.purple:C.muted}>{e.shiftType||"—"}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.teal}}>{e.staffDate}</div></div>))}</div>)}</div>)}{!searched&&(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`,opacity:0.7}}><div style={{fontSize:"1.8rem",marginBottom:8}}>🔍</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>Enter a badge number or login to look up assignments</div></div>)}</div>);
}


// ======================= REPORT (unchanged) =======================
// ======================= REPORT =======================
function Report({dept,staffDate,shiftType}){
  const [,fu]=useState(0);
  const [reportView,setReportView]=useState("assignments");
  useEffect(()=>{const t=setInterval(()=>fu(n=>n+1),5000);return()=>clearInterval(t);},[]);
  const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate;
  const ctx=`${dateStr}|${shiftType}|${dept}`;
  const ctxAssigns=contextStations[ctx]||{};
  const rows=Object.entries(ctxAssigns).map(([sid,a])=>{const station=floorStations.find(s=>s.id===parseInt(sid)); const line=station?floorLines.find(l=>l.id===station.line_id):null; const path=line?floorPaths.find(p=>p.id===line.path_id):null; const audit = (window.auditLogGlobal || []).find(e=>e.badge===a.badge && e.station===(station?.name||"") && e.dept===dept); return {badge:a.badge||"",name:a.name||"",login:a.login||"",path:a.path||path?.name||"",line:line?.name||"",station:station?.name||"",method:a.method||"",dept,shiftType,date:dateStr,changedBy:audit?.who||"AUTO",changedAt:audit?.ts?new Date(audit.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}; }).sort((a,b)=>a.path.localeCompare(b.path));
  const auditRows = (window.auditLogGlobal || []).filter(e=>e.dept===dept && e.date===dateStr);
  function downloadCSV(){ const headers=["Date","Shift","Dept","Badge","Name","Login","Path","Line","Station","Method","ChangedBy","ChangedAt"]; const csvRows=[headers.join(","),...rows.map(r=>[r.date,r.shiftType,r.dept,r.badge,`"${r.name}"`,r.login,`"${r.path}"`,`"${r.line}"`,r.station,r.method,`"${r.changedBy}"`,r.changedAt].join(","))]; const blob=new Blob([csvRows.join("\n")],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a");a.href=url;a.download=`floor-report-${dept}-${dateStr}-${shiftType}.csv`;a.click();URL.revokeObjectURL(url); }
  function downloadAuditCSV(){ const headers=["Timestamp","Action","Who","Badge","Associate","Station","Path","Shift","Dept"]; const csvRows=[headers.join(","),...auditRows.map(r=>[r.ts,r.action,`"${r.who}"`,r.badge,`"${r.name}"`,r.station,`"${r.path}"`,r.shiftType,r.dept].join(","))]; const blob=new Blob([csvRows.join("\n")],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a");a.href=url;a.download=`audit-log-${dept}-${dateStr}-${shiftType}.csv`;a.click();URL.revokeObjectURL(url); }
  const deptColor=dept==="OUTBOUND"?C.orange:C.blue; const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;
  return(<div style={{padding:"1.5rem",height:"100%",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted,letterSpacing:"0.25em"}}>REPORT · TEN1 · {dept} · {shiftType} · {dateStr}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.sub,marginTop:2}}>{rows.length} on floor · {auditRows.length} audit events</div></div><div style={{display:"flex",gap:6}}>{reportView==="assignments"?<Btn variant="primary" onClick={downloadCSV}>⬇ Floor CSV</Btn>:<Btn variant="primary" onClick={downloadAuditCSV}>⬇ Audit CSV</Btn>}</div></div><div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden",marginBottom:"1rem",width:"fit-content"}}>{[{v:"assignments",l:"📋 Floor Assignments"},{v:"audit",l:"🔍 Audit Log"}].map(t=>(<button key={t.v} onClick={()=>setReportView(t.v)} style={{padding:"6px 14px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,border:"none",cursor:"pointer",background:reportView===t.v?deptColor:"transparent",color:reportView===t.v?"#fff":C.muted}}>{t.l}</button>))}</div>{reportView==="assignments"&&(rows.length===0?(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>📋</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>No assignments yet for this shift.</div></div>):(<div style={{background:C.surface,border:`1.5px solid ${deptBorder}`,borderRadius:12,overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"80px 1fr 90px 1fr 70px 1fr",gap:0,background:C.bg,padding:"0.5rem 1rem",borderBottom:`1px solid ${C.border}`}}>{["BADGE","NAME","PATH","LINE / STATION","METHOD","CHANGED BY"].map(h=>(<div key={h} style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{h}</div>))}</div>{rows.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 90px 1fr 70px 1fr",gap:0,padding:"0.55rem 1rem",borderBottom:i<rows.length-1?`1px solid ${C.border}`:"none",background:i%2===0?C.surface:"#fafafa",alignItems:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted}}>{r.badge}</div><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.67rem",color:C.text,fontWeight:600}}>{r.name}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.54rem",color:C.muted}}>{r.login}</div></div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:deptColor,fontWeight:600}}>{r.path}</div><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{r.line}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>Stn {r.station}</div></div><Bdg color={r.method==="MANUAL"?C.amber:C.green} style={{fontSize:"0.5rem"}}>{r.method}</Bdg><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{r.changedBy}</div>{r.changedAt&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.54rem",color:C.muted}}>{r.changedAt}</div>}</div></div>))}</div>))}{reportView==="audit"&&(auditRows.length===0?(<div style={{textAlign:"center",padding:"3rem 2rem",background:C.surface,borderRadius:12,border:`1.5px solid ${C.border}`}}><div style={{fontSize:"1.8rem",marginBottom:8}}>🔍</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:C.muted}}>No audit events yet.</div></div>):(<div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"70px 80px 1fr 1fr 90px",gap:0,background:C.bg,padding:"0.5rem 1rem",borderBottom:`1px solid ${C.border}`}}>{["TIME","ACTION","WHO","ASSOCIATE · STATION","SHIFT"].map(h=>(<div key={h} style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{h}</div>))}</div>{auditRows.map((e,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 80px 1fr 1fr 90px",gap:0,padding:"0.55rem 1rem",borderBottom:i<auditRows.length-1?`1px solid ${C.border}`:"none",background:i%2===0?C.surface:"#fafafa",alignItems:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.muted}}>{new Date(e.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div><Bdg color={e.action==="CLEAR"?C.red:e.action==="PRE-STAFF"?C.purple:C.amber} bg={e.action==="CLEAR"?C.redBg:e.action==="PRE-STAFF"?C.purpleBg:C.amberBg} border={e.action==="CLEAR"?C.redBorder:e.action==="PRE-STAFF"?C.purpleBorder:C.amberBorder} style={{fontSize:"0.5rem"}}>{e.action}</Bdg><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text}}>{e.who}</div><div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.text,fontWeight:600}}>{e.name} · Stn {e.station}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.54rem",color:C.muted}}>{e.path}</div></div><Bdg color={C.sub} bg={C.bg} border={C.border} style={{fontSize:"0.5rem"}}>{e.shiftType}</Bdg></div>))}</div>))}</div>);
}
function Settings({onAdminChange, apiUrl, userRole}) {
  const isAdmin = userRole === "Admin";
  const [stab, setStab] = useState(isAdmin ? "admins" : "shifts");
  const [, fu] = useState(0); const tick = () => fu(n => n + 1);
  const [adminProfiles, setAdminProfiles] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", role: "Manager", login: "", pin: "" });
  const [adminErr, setAdminErr] = useState("");
  const [pathPriorities, setPathPriorities] = useState([]);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const empRef = useRef(null);
  const permRef = useRef(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/admin/profiles`).then(r => r.json()).then(setAdminProfiles).catch(() => {});
    fetch(`${apiUrl}/path-priorities`).then(r => r.json()).then(setPathPriorities).catch(() => {});
    const session = JSON.parse(localStorage.getItem("ct_admin_session") || "null");
    setCurrentAdmin(session);
  }, [apiUrl]);

  async function addAdmin() {
    if (!isAdmin) return;
    if (!newAdmin.name.trim()) { setAdminErr("Name required."); return; }
    if (!newAdmin.login.trim()) { setAdminErr("Login required."); return; }
    if (!newAdmin.pin.trim()) { setAdminErr("PIN required."); return; }
    const res = await fetch(`${apiUrl}/admin/profiles`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newAdmin) });
    if (res.ok) {
      const updated = await fetch(`${apiUrl}/admin/profiles`).then(r => r.json());
      setAdminProfiles(updated);
      setNewAdmin({ name: "", role: "Manager", login: "", pin: "" });
      setAdminErr("");
    } else { const err = await res.json(); setAdminErr(err.error || "Failed to add profile"); }
  }
  async function removeAdmin(id) {
    if (!isAdmin) return;
    if (!window.window.window.confirm("Remove this admin profile?")) return;
    await fetch(`${apiUrl}/admin/profiles/${id}`, { method: "DELETE" });
    const updated = await fetch(`${apiUrl}/admin/profiles`).then(r => r.json());
    setAdminProfiles(updated);
    const session = JSON.parse(localStorage.getItem("ct_admin_session") || "null");
    if (session && session.id === id) {
      localStorage.removeItem("ct_admin_session");
      if (onAdminChange) onAdminChange(null);
    }
    tick();
  }
  async function updatePathPriority(id, priority) {
    if (!isAdmin) return;
    await fetch(`${apiUrl}/path-priorities/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ priority }) });
    const updated = await fetch(`${apiUrl}/path-priorities`).then(r => r.json());
    setPathPriorities(updated);
    const fp = floorPaths.find(p => p.id === id);
    if (fp) fp.priority = priority;
    tick();
  }
  function parseCSV(text) { const lines=text.trim().split(/\r?\n/); const headers=lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,"").toLowerCase()); return lines.slice(1).filter(l=>l.trim()).map(l=>{ const vals=[];let cur="",inQ=false; for(const ch of l){if(ch==='"'){inQ=!inQ;}else if(ch===","&&!inQ){vals.push(cur.trim());cur="";}else cur+=ch;} vals.push(cur.trim()); const obj={};headers.forEach((h,i)=>obj[h]=vals[i]?.replace(/^"|"$/g,"")||""); return obj; }); }
  async function uploadEmployees(e) { const file=e.target.files[0];if(!file)return; const reader=new FileReader(); reader.onload=async (ev)=>{ try{ const rows=parseCSV(ev.target.result); let added=0,updated=0; for(const r of rows){ const badge=(r.badge||r["badge"]||"").trim(); const login=(r.login||"").trim(); const name=(r.name||"").trim(); const dept=(r.department||r.dept||"").trim(); const manager=(r.manager||"").trim(); if(!badge||!login||!name) continue; const existing=mockAssocs.find(a=>a.badge===badge); if(existing){ await fetch(`${API}/associates/${badge}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,login,home_dept:dept||existing.home_dept,manager:manager||existing.manager,shift_code:existing.shift_code,operation_mode:existing.operation_mode,default_dept:existing.default_dept})}); updated++; } else { await fetch(`${API}/associates`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({badge,login,name,home_dept:dept||"CRETS Processing",manager:manager||"",shift_code:"FHD",operation_mode:"INBOUND",default_dept:"INBOUND"})}); added++; } } const freshData = await api("/associates"); if(Array.isArray(freshData)){ mockAssocs = freshData.map(a=>({...a,permissions:a.permissions||[],weekHours:a.weekHours||[],yesterdayRoles:a.yesterdayRoles||[]})); } setUploadMsg(`✅ Employees: ${added} added, ${updated} updated.`); setUploadErr(""); tick(); }catch(err){ setUploadErr("Failed to parse CSV: "+err.message); setUploadMsg(""); } empRef.current.value=""; }; reader.readAsText(file); }
  async function uploadPermissions(e) { const file=e.target.files[0];if(!file)return; const reader=new FileReader(); reader.onload=async (ev)=>{ try{ const rows=parseCSV(ev.target.result); let added=0,skipped=0; for(const r of rows){ const badge=(r.badge||"").trim(); const pathName=(r["path name"]||r["path_name"]||r.path||"").trim(); const lc=parseInt(r["lc level"]||r["lc_level"]||r.lc||"1")||1; if(!badge||!pathName) continue; const pathRes=await fetch(`${API}/paths?search=${encodeURIComponent(pathName)}`); const paths=await pathRes.json(); const pathId=paths.find(p=>p.name===pathName)?.id; if(!pathId){ skipped++; continue; } await fetch(`${API}/permissions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({badge,path_id:pathId,lc_level:lc})}); added++; } const freshData=await api("/associates"); if(Array.isArray(freshData)){ mockAssocs=freshData.map(a=>({...a,permissions:a.permissions||[],weekHours:a.weekHours||[],yesterdayRoles:a.yesterdayRoles||[]})); } setUploadMsg(`✅ Permissions: ${added} added, ${skipped} skipped (path not found).`); setUploadErr(""); tick(); }catch(err){ setUploadErr("Failed to parse CSV: "+err.message); setUploadMsg(""); } permRef.current.value=""; }; reader.readAsText(file); }

  const inboundPaths = pathPriorities.filter(p => p.mode === "INBOUND" || p.mode === "BOTH").sort((a,b)=>b.priority - a.priority);
  const outboundPaths = pathPriorities.filter(p => p.mode === "OUTBOUND" || p.mode === "BOTH").sort((a,b)=>b.priority - a.priority);

  const tabs = [
    { id: "shifts", l: "⏱ Shift Times" },
    { id: "upload", l: "📤 CSV Upload" }
  ];
  if (isAdmin) {
    tabs.unshift({ id: "admins", l: "👤 Admin Profiles" });
    tabs.push({ id: "priorities", l: "🎯 Path Priorities" });
  }

  return (
    <div style={{ padding: "1.5rem", height: "100%", overflowY: "auto" }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, letterSpacing: "0.25em", marginBottom: "1rem" }}>SETTINGS · TEN1</div>
      <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", borderBottom: `1px solid ${C.border}`, paddingBottom: 0, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setStab(t.id)} style={{ background: "transparent", border: "none", borderBottom: `2px solid ${stab === t.id ? C.blue : "transparent"}`, padding: "8px 14px", fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: stab === t.id ? C.blue : C.muted, cursor: "pointer" }}>
            {t.l}
          </button>
        ))}
      </div>

      {isAdmin && stab === "admins" && (
        <div>
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, letterSpacing: "0.15em", marginBottom: 10 }}>ADD PROFILE</div>
            {adminErr && <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "0.5rem 0.8rem", marginBottom: 8, fontSize: "0.62rem", color: C.red }}>{adminErr}</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 80px", gap: 8, marginBottom: 8 }}>
              <Inp value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} placeholder="Full name" />
              <Inp value={newAdmin.login} onChange={e => setNewAdmin({ ...newAdmin, login: e.target.value.trim() })} placeholder="Login" />
              <Inp type="password" value={newAdmin.pin} onChange={e => setNewAdmin({ ...newAdmin, pin: e.target.value })} placeholder="PIN" />
              <Sel value={newAdmin.role} onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value })}>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Admin PA">Admin PA</option>
                <option value="Area Manager">Area Manager</option>
                <option value="Sr. Manager">Sr. Manager</option>
              </Sel>
            </div>
            <Btn variant="primary" onClick={addAdmin}>+ Add Profile</Btn>
          </div>
          {adminProfiles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", background: C.surface, borderRadius: 12 }}>No profiles yet</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {adminProfiles.map(a => {
                const isSelf = currentAdmin && currentAdmin.id === a.id;
                return (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "0.75rem 1rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{a.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: "0.58rem", color: C.muted }}>{a.login} · {a.role}</div></div>
                    {!isSelf && <Btn size="sm" variant="danger" onClick={() => removeAdmin(a.id)}>✕</Btn>}
                    {isSelf && <Bdg color={C.green} bg={C.greenBg} border={C.greenBorder}>YOU</Bdg>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {stab === "shifts" && (
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: C.sub, marginBottom: "1rem" }}>Shift windows used for hour calculations and auto-reset. 1st/2nd half split at midpoint.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(SHIFT_TIMES).map(([code, depts]) => (
              <div key={code} style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "1rem" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: "0.75rem", color: C.text, marginBottom: 8 }}>{code}</div>
                {Object.entries(depts).map(([d, t]) => {
                  const dur = shiftDurationHours(code, d);
                  const startMins = t.h * 60 + t.m;
                  const endMins = t.endH * 60 + t.endM + (t.endH * 60 + t.endM <= startMins ? 24 * 60 : 0);
                  const midMins = (startMins + endMins) / 2;
                  const midH = Math.floor(midMins / 60) % 24;
                  const midM = Math.round(midMins % 60);
                  const fmt = (h, m) => `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 || h === 24 ? "AM" : "PM"}`;
                  return (
                    <div key={d} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.5rem 0", borderTop: `1px solid ${C.border}` }}>
                      <Bdg color={d === "OUTBOUND" ? C.orange : C.blue} bg={d === "OUTBOUND" ? C.orangeBg : C.blueBg} border={d === "OUTBOUND" ? C.orangeBorder : C.blueBorder} style={{ minWidth: 70, justifyContent: "center" }}>{d}</Bdg>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.text, flex: 1 }}>{fmt(t.h, t.m)} → {fmt(t.endH, t.endM)}{t.endH * 60 + t.endM <= t.h * 60 + t.m ? " (+1 day)" : ""}</div>
                      <Bdg color={C.teal} bg={C.tealBg} border={C.tealBorder}>{dur.toFixed(1)}h</Bdg>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted }}>Half split: {fmt(midH, midM)}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {stab === "upload" && (
        <div>
          {uploadMsg && <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "0.65rem 1rem", marginBottom: "1rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.green }}>{uploadMsg}</div>}
          {uploadErr && <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "0.65rem 1rem", marginBottom: "1rem", fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: C.red }}>{uploadErr}</div>}
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "1.1rem", marginBottom: "1rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", fontWeight: 700, color: C.text, marginBottom: 6 }}>👥 EMPLOYEE CSV UPLOAD</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 10, lineHeight: 1.6 }}>Required columns: <strong>Badge, Login, Name, Department, Manager, Job Title, Employee ID</strong><br />Merge rule: adds new, updates existing, keeps associates not in file.</div>
            <input ref={empRef} type="file" accept=".csv" onChange={uploadEmployees} style={{ display: "none" }} />
            <Btn variant="primary" onClick={() => empRef.current.click()}>📂 Choose Employee CSV</Btn>
          </div>
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "1.1rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", fontWeight: 700, color: C.text, marginBottom: 6 }}>🔐 PERMISSIONS CSV UPLOAD</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", color: C.muted, marginBottom: 10, lineHeight: 1.6 }}>Required columns: <strong>Badge, Path Name, LC Level</strong><br />Merge rule: adds new permissions only. Existing permissions are never overwritten.</div>
            <input ref={permRef} type="file" accept=".csv" onChange={uploadPermissions} style={{ display: "none" }} />
            <Btn variant="primary" onClick={() => permRef.current.click()}>📂 Choose Permissions CSV</Btn>
          </div>
        </div>
      )}

      {isAdmin && stab === "priorities" && (
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: C.sub, marginBottom: "1rem" }}>
            Path priority determines assignment score. <strong>10 = highest priority, 1 = lowest.</strong> Changes take effect immediately.
          </div>
          <div style={{ marginBottom: "1.5rem", background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ background: C.blueBg, padding: "0.6rem 1rem", fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: "0.7rem", color: C.blue }}>📥 INBOUND PATHS</div>
            <div style={{ padding: "0.5rem" }}>
              {inboundPaths.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.5rem 0.75rem", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ flex: 1, fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", color: C.text }}>{p.name}</div>
                  <input type="number" min="1" max="10" value={p.priority} onChange={e => updatePathPriority(p.id, parseInt(e.target.value))} style={{ width: 70, padding: "0.3rem 0.5rem", border: `1.5px solid ${C.border}`, borderRadius: 6, fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", textAlign: "center" }} />
                </div>
              ))}
              {inboundPaths.length === 0 && <div style={{ padding: "1rem", textAlign: "center", color: C.muted }}>No inbound paths found.</div>}
            </div>
          </div>
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ background: C.orangeBg, padding: "0.6rem 1rem", fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: "0.7rem", color: C.orange }}>📤 OUTBOUND PATHS</div>
            <div style={{ padding: "0.5rem" }}>
              {outboundPaths.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.5rem 0.75rem", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ flex: 1, fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", color: C.text }}>{p.name}</div>
                  <input type="number" min="1" max="10" value={p.priority} onChange={e => updatePathPriority(p.id, parseInt(e.target.value))} style={{ width: 70, padding: "0.3rem 0.5rem", border: `1.5px solid ${C.border}`, borderRadius: 6, fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", textAlign: "center" }} />
                </div>
              ))}
              {outboundPaths.length === 0 && <div style={{ padding: "1rem", textAlign: "center", color: C.muted }}>No outbound paths found.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ======================= MAIN APP =======================
export default function App(){
  const [tab,setTab]=useState("kiosk");
  const [log,setLog]=useState([]);
  const [clock,setClock]=useState(fmtTime());
  const [shiftType,setShiftType]=useState("DAY");
  const [staffDate,setStaffDate]=useState(new Date());
  const [datePicker,setDatePicker]=useState(false);
  const [dateInput,setDateInput]=useState(new Date().toISOString().split("T")[0]);
  const [live,setLive]=useState(false);
  const [resetModal,setResetModal]=useState(false);
  const [dept,setDept]=useState("INBOUND");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [activeAdmin, setActiveAdmin] = useState(null);
  const [laborShareEnabled, setLaborShareEnabled] = useState(false);
  const [laborShareCount, setLaborShareCount] = useState(0);
  const [crossDeptUsage, setCrossDeptUsage] = useState({});
  const incrementCrossDept = (key) => { setCrossDeptUsage(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 })); };
  const getCrossDeptUsed = (key) => crossDeptUsage[key] || 0;

  useEffect(()=>{const t=setInterval(()=>setClock(fmtTime()),1000);return()=>clearInterval(t);},[]);
  useEffect(()=>{const chk=async()=>{const r=await api("/system");if(r)setLive(true);else setLive(false);};chk();const t=setInterval(chk,20000);return()=>clearInterval(t);},[]);

  // Load associates from backend on startup – REPLACES mockAssocs
  useEffect(() => {
    api("/associates").then(data => {
      if (Array.isArray(data) && data.length) {
        mockAssocs = data.map(a => ({
          ...a,
          permissions: a.permissions || [],
          weekHours: a.weekHours || [],
          yesterdayRoles: a.yesterdayRoles || [],
        }));
      }
    });
  }, []);

  useEffect(()=>{ const session = localStorage.getItem("ct_admin_session"); if(session){ try{ const parsed = JSON.parse(session); if(parsed.expires && parsed.expires > Date.now()){ setIsAuthenticated(true); setActiveAdmin(parsed); window.activeAdmin = parsed; } else { localStorage.removeItem("ct_admin_session"); setIsAuthenticated(false); } } catch { setIsAuthenticated(false); } } else { setIsAuthenticated(false); } },[]);
  async function resetShift(){ await api("/reset-shift",{method:"POST"}); const dateStr=staffDate instanceof Date?staffDate.toISOString().split("T")[0]:staffDate; const ctx=`${dateStr}|${shiftType}|${dept}`; clearContextAssignments(ctx); resetShiftConfig(shiftType); setLog([]);setResetModal(false); }
  function applyDate(){const d=new Date(dateInput+"T00:00:00");if(!isNaN(d))setStaffDate(d);setDatePicker(false);}
  const handleAuthenticate = (admin) => { setIsAuthenticated(true); setActiveAdmin(admin); window.activeAdmin = admin; };
  const handleSignOut = () => { localStorage.removeItem("ct_admin_session"); setIsAuthenticated(false); setActiveAdmin(null); window.activeAdmin = null; };
  const handleLaborShareChange = (enabled, count) => { setLaborShareEnabled(enabled); setLaborShareCount(count); };
  if (isAuthenticated === false) return <AdminGate onAuthenticate={handleAuthenticate} apiUrl={API} />;
  if (isAuthenticated === null) return <div style={{ background: C.bg, minHeight: "100vh" }} />;
  const TABS = [{id:"kiosk",label:"KIOSK",icon:"🔖"},{id:"dashboard",label:"DASHBOARD",icon:"📊"},{id:"map",label:"FLOOR MAP",icon:"🗺"},{id:"perms",label:"PERMISSIONS",icon:"🔐"},{id:"assocs",label:"ASSOCIATES",icon:"👥"},{id:"history",label:"HISTORY",icon:"📋"},{id:"search",label:"SEARCH",icon:"🔍"},{id:"report",label:"REPORT",icon:"📥"},{id:"settings",label:"SETTINGS",icon:"⚙️"}];
  const deptColor=dept==="OUTBOUND"?C.orange:C.blue; const deptBorder=dept==="OUTBOUND"?C.orangeBorder:C.blueBorder;
  return(<div style={{background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column"}}><style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#e2e4e9;border-radius:2px;}@keyframes fadein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}button:hover{filter:brightness(0.96);}`}</style><div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,flexShrink:0,position:"sticky",top:0,zIndex:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:8,background:deptColor,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"0.75rem"}}>CT</span></div><span style={{fontFamily:"'Bebas Neue',Impact,sans-serif",fontSize:"1.15rem",letterSpacing:"0.12em",color:C.text}}>CONTROL TOWER</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.57rem",color:C.faint}}>TEN1</span></div><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><DeptToggle dept={dept} setDept={setDept}/><div style={{display:"flex",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>{[{v:"DAY",icon:"☀",c:C.amber},{v:"NIGHT",icon:"🌙",c:C.purple}].map(s=>(<button key={s.v} onClick={()=>setShiftType(s.v)} style={{padding:"5px 11px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,border:"none",cursor:"pointer",background:shiftType===s.v?s.c:"transparent",color:shiftType===s.v?"#fff":C.muted}}>{s.icon} {s.v}</button>))}</div><div style={{position:"relative"}}><button onClick={()=>setDatePicker(!datePicker)} style={{background:C.tealBg,border:`1.5px solid ${C.tealBorder}`,borderRadius:8,padding:"5px 11px",fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",fontWeight:600,color:C.teal,cursor:"pointer"}}>📅 {staffDate.toLocaleDateString("en-US",{month:"numeric",day:"numeric",year:"numeric"})}</button>{datePicker&&(<div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"1rem",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:220}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.muted,marginBottom:8}}>SELECT STAFFING DATE</div><input type="date" value={dateInput} onChange={e=>setDateInput(e.target.value)} style={{width:"100%",padding:"0.6rem 0.8rem",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",marginBottom:8}}/><div style={{display:"flex",gap:6}}><Btn onClick={()=>setDatePicker(false)}>Cancel</Btn><Btn variant="primary" onClick={applyDate}>Apply</Btn></div></div>)}</div><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:6,height:6,borderRadius:"50%",background:live?C.green:C.faint}}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.57rem",color:C.muted}}>{live?"LIVE":"DEMO"}</span></div>{activeAdmin&&(<div style={{display:"flex",alignItems:"center",gap:5,background:C.greenBg,border:`1.5px solid ${C.greenBorder}`,borderRadius:8,padding:"4px 9px"}}><div style={{width:20,height:20,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:"#fff",fontSize:"0.55rem"}}>{activeAdmin.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.green,fontWeight:600}}>{activeAdmin.name.split(" ")[0]}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.52rem",color:C.muted}}>{activeAdmin.role}</div><button onClick={handleSignOut} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:"0.7rem",marginLeft:"4px"}}>🚪</button></div>)}<div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.sub}}>{clock}</div>{log.length>0&&<Bdg>{log.length} scanned</Bdg>}<Btn size="sm" variant="danger" onClick={()=>setResetModal(true)}>🔄 RESET</Btn></div></div><div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 1rem",display:"flex",gap:2,flexShrink:0,overflowX:"auto"}}>{TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{background:"transparent",border:"none",borderBottom:`2px solid ${tab===t.id?deptColor:"transparent"}`,padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:"0.63rem",color:tab===t.id?deptColor:C.muted,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:"0.78rem"}}>{t.icon}</span>{t.label}</button>))}</div><div style={{flex:1,overflow:"hidden"}}><div style={{height:"100%",overflowY:"auto",animation:"fadein 0.18s ease"}}>{tab==="kiosk"&&<Kiosk onAssign={e=>setLog(p=>[...p,e])} shiftType={shiftType} staffDate={staffDate} laborShareEnabled={laborShareEnabled} laborShareCount={laborShareCount} crossDeptUsage={crossDeptUsage} incrementCrossDept={incrementCrossDept} getCrossDeptUsed={getCrossDeptUsed} />}{tab==="dashboard"&&<Dashboard log={log} shiftType={shiftType} staffDate={staffDate} dept={dept} />}{tab==="map"&&<FloorMap log={log} dept={dept} staffDate={staffDate} shiftType={shiftType} laborShareEnabled={laborShareEnabled} laborShareCount={laborShareCount} crossDeptUsage={crossDeptUsage} incrementCrossDept={incrementCrossDept} getCrossDeptUsed={getCrossDeptUsed} />}{tab==="perms"&&<Permissions dept={dept} />}{tab==="assocs"&&<AssociatesFull dept={dept} />}{tab==="history"&&<AssignHistory />}{tab==="search"&&<SearchLookup />}{tab==="report"&&<Report dept={dept} staffDate={staffDate} shiftType={shiftType} />}{tab==="settings"&&<Settings onAdminChange={setActiveAdmin} apiUrl={API} userRole={activeAdmin?.role} />}</div></div><Modal open={resetModal} onClose={()=>setResetModal(false)} title="Reset Shift"><div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.75rem",color:C.text,marginBottom:"1rem"}}>Clears all station assignments for <strong>{dept}</strong> on {fmtDate(staffDate)} ({shiftType}). History is preserved.</div><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn onClick={()=>setResetModal(false)}>Cancel</Btn><Btn variant="danger" onClick={resetShift}>🔄 Reset Shift</Btn></div></Modal></div>);
}