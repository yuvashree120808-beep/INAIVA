import { useMemo, useState } from 'react';
import { Sprout, LayoutDashboard, Wallet, Calculator, ShoppingBag, Users, Languages, Plus, Search, TrendingUp, IndianRupee, Menu, X, CheckCircle2 } from 'lucide-react';

type Entry = { id: number; kind: 'Income' | 'Expense'; title: string; amount: number; date: string; category: string };
const starterEntries: Entry[] = [
  { id: 1, kind: 'Income', title: 'Handmade cotton bags', amount: 4200, date: '2026-10-21', category: 'Sales' },
  { id: 2, kind: 'Expense', title: 'Cotton fabric and thread', amount: 1450, date: '2026-10-20', category: 'Materials' },
  { id: 3, kind: 'Income', title: 'Festival gift orders', amount: 2800, date: '2026-10-18', category: 'Sales' },
  { id: 4, kind: 'Expense', title: 'Packaging supplies', amount: 450, date: '2026-10-17', category: 'Packaging' }
];
const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
type Page = 'Overview' | 'Transactions' | 'Price Calculator' | 'Marketplace' | 'SHG Members';
export default function App() {
  const [page, setPage] = useState<Page>('Overview');
  const [entries, setEntries] = useState<Entry[]>(starterEntries);
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [kind, setKind] = useState<'Income' | 'Expense'>('Income');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [cost, setCost] = useState('80');
  const [margin, setMargin] = useState('30');
  const [tamil, setTamil] = useState(false);
  const income = entries.filter(e => e.kind === 'Income').reduce((s, e) => s + e.amount, 0);
  const expenses = entries.filter(e => e.kind === 'Expense').reduce((s, e) => s + e.amount, 0);
  const filtered = useMemo(() => entries.filter(e => `${e.title} ${e.category} ${e.kind}`.toLowerCase().includes(search.toLowerCase())), [entries, search]);
  const nav: { label: Page; icon: typeof LayoutDashboard }[] = [
    { label: 'Overview', icon: LayoutDashboard }, { label: 'Transactions', icon: Wallet },
    { label: 'Price Calculator', icon: Calculator }, { label: 'Marketplace', icon: ShoppingBag }, { label: 'SHG Members', icon: Users }
  ];
  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || Number(amount) <= 0) return;
    setEntries([{ id: Date.now(), kind, title: title.trim(), amount: Number(amount), date: new Date().toISOString().slice(0, 10), category: kind === 'Income' ? 'Sales' : 'Materials' }, ...entries]);
    setTitle(''); setAmount(''); setShowForm(false); setPage('Transactions');
  }
  const price = Number(cost || 0) * (1 + Number(margin || 0) / 100);
  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? 'open' : ''}`}>
      <div className="brand"><span className="brand-icon"><Sprout size={24}/></span><span><b>INAIVA</b><small>Together, We Rise</small></span><button className="close-menu" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X/></button></div>
      <div className="group-label">YOUR WORKSPACE</div>
      <nav>{nav.map(({label, icon: Icon}) => <button key={label} className={`nav-item ${page === label ? 'active' : ''}`} onClick={() => {setPage(label); setMobileMenu(false)}}><Icon size={19}/><span>{label}</span>{label === 'Transactions' && <span className="nav-count">{entries.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><span className="help-leaf"><Sprout size={19}/></span><b>Your business, growing</b><p>Small steps today. Stronger livelihoods tomorrow.</p></div><div className="profile"><div className="avatar">LK</div><div><b> Lakshmi's SHG</b><small>Group administrator</small></div><span className="online-dot"/></div></div>
    </aside>
    {mobileMenu && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)}/>}
    <main className="main-area">
      <header className="topbar"><button className="menu-toggle" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><span className="status"><i/> Demo workspace</span><button className="language" onClick={() => setTamil(!tamil)}><Languages size={17}/>{tamil ? 'தமிழ்' : 'English'}</button><div className="avatar top-avatar">LK</div></div></header>
      <div className="content">
        <section className="welcome-row"><div><div className="eyebrow"><Sprout size={15}/> WOMEN'S SELF-HELP GROUP TOOLKIT</div><h1>{tamil ? 'வணக்கம், லக்ஷ்மி!' : 'Good morning, Lakshmi!'} <span>✳</span></h1><p>Here's how your group's business is doing. Keep growing, together.</p></div><button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={18}/> Add transaction</button></section>
        {page === 'Overview' && <>
          <div className="stat-grid">
            <Stat title="Total income" value={money(income)} note="Money earned from sales" icon={<TrendingUp/>} tone="green" />
            <Stat title="Total expenses" value={money(expenses)} note="Costs and supplies" icon={<Wallet/>} tone="orange" />
            <Stat title="Net profit" value={money(income-expenses)} note="Income minus expenses" icon={<IndianRupee/>} tone="purple" />
            <Stat title="Transactions" value={String(entries.length)} note="Recorded in this demo" icon={<CheckCircle2/>} tone="blue" />
          </div>
          <div className="dashboard-grid"><section className="panel transactions-panel"><div className="panel-head"><div><h2>Recent transactions</h2><p>Your latest business activity</p></div><button className="text-btn" onClick={() => setPage('Transactions')}>View all →</button></div><TransactionTable entries={entries.slice(0,4)}/></section>
            <section className="panel profit-panel"><div className="panel-head"><div><h2>Profit at a glance</h2><p>Understand your group's progress</p></div></div><div className="profit-circle"><div><small>NET PROFIT</small><b>{money(income-expenses)}</b><span>This demo period</span></div></div><div className="legend-row"><span><i className="dot income-dot"/>Income</span><b>{money(income)}</b></div><div className="meter"><span style={{width: `${income ? income/(income+expenses)*100 : 0}%`}}/></div><div className="legend-row"><span><i className="dot expense-dot"/>Expenses</span><b>{money(expenses)}</b></div><div className="meter expense-meter"><span style={{width: `${income ? expenses/(income+expenses)*100 : 0}%`}}/></div><div className="tip"><Sprout size={18}/><p><b>Business tip</b><br/>Record every small expense to get a clearer picture of your profit.</p></div></section></div>
          <section className="panel quick-panel"><div className="panel-head"><div><h2>What would you like to do?</h2><p>Simple tools to help your business grow</p></div></div><div className="quick-grid"><Quick title="Record income or expense" detail="Keep your accounts up to date" icon={<Wallet/>} onClick={() => setShowForm(true)}/><Quick title="Calculate product price" detail="Include costs and profit margin" icon={<Calculator/>} onClick={() => setPage('Price Calculator')}/><Quick title="Explore marketplace" detail="Showcase products to more buyers" icon={<ShoppingBag/>} onClick={() => setPage('Marketplace')}/></div></section>
        </>}
        {page === 'Transactions' && <section className="panel page-panel"><div className="panel-head"><div><h2>Income & expenses</h2><p>Track the money coming into and going out of your group.</p></div><button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17}/> Add entry</button></div><div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search transactions..."/></div><TransactionTable entries={filtered}/></section>}
        {page === 'Price Calculator' && <section className="panel page-panel calculator-panel"><div className="panel-head"><div><h2>Product price calculator</h2><p>Choose a fair price that covers your costs and earns a profit.</p></div></div><div className="calc-layout"><div className="calc-fields"><label>Cost to make one product (₹)<input type="number" min="0" value={cost} onChange={e=>setCost(e.target.value)}/></label><label>Desired profit margin (%)<input type="number" min="0" value={margin} onChange={e=>setMargin(e.target.value)}/></label><p className="field-hint">Include materials, packaging, transport and your time.</p></div><div className="price-result"><span>Suggested selling price</span><strong>{money(price)}</strong><div className="result-row"><span>Product cost</span><b>{money(Number(cost||0))}</b></div><div className="result-row"><span>Profit per item</span><b className="positive">{money(price-Number(cost||0))}</b></div><div className="result-row"><span>Profit margin</span><b>{Number(margin||0)}%</b></div></div></div></section>}
        {page === 'Marketplace' && <section className="panel page-panel"><div className="panel-head"><div><h2>Community marketplace</h2><p>A sample product showcase for local women entrepreneurs.</p></div></div><div className="product-grid"><Product emoji="👜" name="Handmade cotton bags" group="Lakshmi's SHG" price="₹350" tag="Handmade"/><Product emoji="🕯️" name="Decorative candles" group="Malar Women's Group" price="₹180" tag="Home & living"/><Product emoji="🌶️" name="Homemade spice mix" group="Thendral SHG" price="₹120" tag="Food products"/></div><p className="demo-note">Demo listings only. Add real product photos, seller details, and verified contact information before publishing.</p></section>}
        {page === 'SHG Members' && <section className="panel page-panel"><div className="panel-head"><div><h2>Your SHG members</h2><p>Sample member directory for the group workspace.</p></div><button className="secondary-btn" onClick={() => alert('Demo only: member invitations are not connected yet.')}>Invite member</button></div><div className="member-list">{[['LK','Lakshmi K.','Group administrator'],['MR','Meena R.','Treasurer'],['PK','Priya K.','Product coordinator'],['SR','Selvi R.','Member']].map(m=><div className="member-row" key={m[0]}><div className="avatar">{m[0]}</div><div><b>{m[1]}</b><small>{m[2]}</small></div><span className="member-active"><i/> Active</span></div>)}</div><p className="demo-note">Sample names are illustrative. Replace them with consented member data before deployment.</p></section>}
        <footer>© 2026 INAIVA <span>Built for stronger livelihoods, together.</span><span className="demo-tag">Prototype · Sample data</span></footer>
      </div>
    </main>
    {showForm && <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setShowForm(false)}}><form className="modal" onSubmit={addEntry}><div className="modal-head"><div><h2>Add transaction</h2><p>Record income or an expense for your group.</p></div><button type="button" className="icon-btn" onClick={() => setShowForm(false)} aria-label="Close"><X/></button></div><div className="toggle-kind"><button type="button" className={kind==='Income'?'selected':''} onClick={()=>setKind('Income')}>Income</button><button type="button" className={kind==='Expense'?'selected expense-selected':''} onClick={()=>setKind('Expense')}>Expense</button></div><label>Description<input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Sold 10 cotton bags"/></label><label>Amount (₹)<input required min="1" type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount"/></label><div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setShowForm(false)}>Cancel</button><button type="submit" className="primary-btn">Save transaction</button></div></form></div>}
  </div>;
}
function Stat({title,value,note,icon,tone}:{title:string;value:string;note:string;icon:React.ReactNode;tone:string}) { return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><span className="stat-title">{title}</span><strong>{value}</strong><small>{note}</small></div>; }
function TransactionTable({entries}:{entries:Entry[]}) { return <div className="table-wrap"><table><thead><tr><th>TRANSACTION</th><th>DATE</th><th>TYPE</th><th className="align-right">AMOUNT</th></tr></thead><tbody>{entries.map(e=><tr key={e.id}><td><div className="transaction-title"><span className={`mini-icon ${e.kind==='Income'?'mini-income':'mini-expense'}`}>{e.kind==='Income'?<TrendingUp size={16}/>:<Wallet size={16}/>}</span><span><b>{e.title}</b><small>{e.category}</small></span></div></td><td>{new Date(e.date+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</td><td><span className={`pill ${e.kind==='Income'?'pill-income':'pill-expense'}`}>{e.kind}</span></td><td className={`align-right amount ${e.kind==='Income'?'positive':'negative'}`}>{e.kind==='Income'?'+':'−'}{money(e.amount)}</td></tr>)}</tbody></table>{entries.length===0&&<div className="empty">No matching transactions found.</div>}</div>; }
function Quick({title,detail,icon,onClick}:{title:string;detail:string;icon:React.ReactNode;onClick:()=>void}) { return <button className="quick-action" onClick={onClick}><span className="quick-icon">{icon}</span><span><b>{title}</b><small>{detail}</small></span><span className="quick-arrow">→</span></button>; }
function Product({emoji,name,group,price,tag}:{emoji:string;name:string;group:string;price:string;tag:string}) { return <article className="product-card"><div className="product-art">{emoji}</div><div className="product-info"><span className="product-tag">{tag}</span><h3>{name}</h3><p>{group}</p><div className="product-bottom"><b>{price}</b><button onClick={()=>alert('Demo listing: connect seller contact and order workflow before launch.')}>View details</button></div></div></article>; }