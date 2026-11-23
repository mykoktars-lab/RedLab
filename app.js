let activeCalc='ffa';
const pages=[...document.querySelectorAll('.page')];
function showPage(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav').forEach(n=>n.classList.remove('selected'));if(id==='dashboard')document.querySelectorAll('.nav')[0].classList.add('selected');if(id==='calculator')document.querySelectorAll('.nav')[1].classList.add('selected');if(id==='settings')document.querySelectorAll('.nav')[2].classList.add('selected');if(id==='calculator')renderCalc();}
function selectCalc(name){activeCalc=name;document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('selected',t.dataset.calc===name));renderCalc();}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>selectCalc(t.dataset.calc)));
const num=(id)=>parseFloat(document.getElementById(id)?.value);
const val=(id)=>document.getElementById(id)?.value ?? '';
function field(id,label,placeholder='0',step='any'){return `<div class="field"><label>${label}</label><input id="${id}" type="number" inputmode="decimal" step="${step}" placeholder="${placeholder}" oninput="calculate()"></div>`}
function resultBox(){return `<div id="result" class="result empty"><div class="label">Hasil otomatis</div><div class="value">—</div><div class="status">Lengkapi semua data</div></div>`}
function renderCalc(){
 const c=document.getElementById('calcContent'); let html='';
 if(activeCalc==='ffa')html=`<div class="calc-card"><h3>Perhitungan FFA</h3>${field('weight','Berat sampel (g)')}${field('volume','Volume titrasi (mL)')}${field('normality','Normalitas','', '0.0001')}<small class="muted">Normalitas dapat dipertahankan untuk sampel berikutnya.</small>${resultBox()}<button class="secondary" onclick="nextSample()">Sampel berikutnya</button></div>`;
 if(activeCalc==='moisture')html=`<div class="calc-card"><h3>Perhitungan Kadar Air</h3>${field('bottle','Berat botol timbang kosong (g)')}${field('sample','Berat sampel (g)')}${field('final','Berat akhir (g)')}${resultBox()}<button class="secondary" onclick="nextSample()">Sampel berikutnya</button></div>`;
 if(activeCalc==='fat')html=`<div class="calc-card"><h3>Perhitungan Kadar Lemak</h3>${field('initial','Berat awal (g)')}${field('final','Berat akhir (g)')}${field('sample','Berat sampel (g)')}${resultBox()}<button class="secondary" onclick="nextSample()">Sampel berikutnya</button></div>`;
 if(activeCalc==='av')html=`<div class="calc-card"><h3>Perhitungan AV</h3>${field('bottle','Berat botol kosong (g)')}${field('final','Berat akhir (g)')}<div class="field"><label>Berat sampel (g)</label><input id="sample" readonly placeholder="Otomatis: berat akhir − botol kosong"></div>${field('normality','Normalitas','', '0.0001')}${field('volume','Volume titrasi (mL)')}${resultBox()}<button class="secondary" onclick="nextSample()">Sampel berikutnya</button></div>`;
 c.innerHTML=html;
 if(activeCalc==='ffa')document.getElementById('normality').value=localStorage.getItem('labNormality')||document.getElementById('normalityDefault').value;
 if(activeCalc==='av')document.getElementById('normality').value=localStorage.getItem('labNormality')||document.getElementById('normalityDefault').value;
}
function calculate(){
 let r=document.getElementById('result');if(!r)return;let output=null,label='',status='';
 const complete=(...xs)=>xs.every(x=>Number.isFinite(x));
 if(activeCalc==='ffa'){let w=num('weight'),v=num('volume'),n=num('normality');if(complete(w,v,n)&&w>0){output=v*25.6*n/w;label='FFA';let limit=parseFloat(localStorage.getItem('ffaStandard')||'0.245');status=output<=limit?`Memenuhi standar ≤ ${limit}`:`Melebihi standar ${limit}`;}}
 if(activeCalc==='moisture'){let b=num('bottle'),s=num('sample'),f=num('final');if(complete(b,s,f)&&s>0){output=(b+s-f)/s*100;label='Kadar Air';status='Hasil perhitungan';}}
 if(activeCalc==='fat'){let i=num('initial'),f=num('final'),s=num('sample');if(complete(i,f,s)&&s>0){output=(f-i)/s*100;label='Kadar Lemak';status='Hasil perhitungan';}}
 if(activeCalc==='av'){let b=num('bottle'),f=num('final'),n=num('normality'),v=num('volume');let s=document.getElementById('sample');if(Number.isFinite(b)&&Number.isFinite(f))s.value=(f-b).toFixed(4);if(complete(b,f,n,v)&&f-b>0){output=56.1*n*v/(f-b);label='Acid Value';status='Hasil perhitungan';}}
 if(output!==null&&Number.isFinite(output)){r.className='result';r.innerHTML=`<div class="label">${label}</div><div class="value">${output.toFixed(4)}</div><div class="status ${activeCalc==='ffa'?(output<=parseFloat(localStorage.getItem('ffaStandard')||'0.245')?'ok':'bad'):'ok'}">${status}</div>`;}else{r.className='result empty';r.innerHTML='<div class="label">Hasil otomatis</div><div class="value">—</div><div class="status">Lengkapi semua data</div>';}}
function nextSample(){let n=document.getElementById('normality')?.value;renderCalc();if(n&&document.getElementById('normality'))document.getElementById('normality').value=n;['volume','weight','bottle','sample','final','initial'].forEach(id=>{let e=document.getElementById(id);if(e&&!e.readOnly)e.value='';});calculate();}
function saveSettings(){let s=document.getElementById('ffaStandard').value,n=document.getElementById('normalityDefault').value;localStorage.setItem('ffaStandard',s);localStorage.setItem('labNormality',n);document.getElementById('settingsMessage').textContent='Pengaturan tersimpan.';}
function loadSettings(){document.getElementById('ffaStandard').value=localStorage.getItem('ffaStandard')||'0.245';document.getElementById('normalityDefault').value=localStorage.getItem('labNormality')||'0.1';}
function previewImages(input,target){let box=document.getElementById(target);[...input.files].forEach(file=>{let img=document.createElement('img');img.src=URL.createObjectURL(file);box.appendChild(img);});}
loadSettings();renderCalc();