import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, RefreshCw, Eraser, ShieldCheck } from 'lucide-react';

const App = () => {
  const [template, setTemplate] = useState('classic');

  const emptyState = {
    personal: { name: '', title: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [{ id: 1, company: '', role: '', dates: '', desc: '' }],
    skills: ''
  };

  const sampleData = {
    personal: { name: 'Jordan Smith', title: 'Product Manager', email: 'jordan.smith@email.com', phone: '(555) 987-6543', location: 'San Francisco, CA' },
    summary: 'Strategic Product Manager with 6+ years of experience in SaaS development. Proven track record of increasing user retention by 25% through data-driven feature prioritization.',
    experience: [
      { id: 1, company: 'CloudScale AI', role: 'Senior Product Manager', dates: '2021 - Present', desc: '• Led cross-functional team of 15 to launch "VisionStream" API.\n• Reduced churn rate by 15% through improved onboarding flows.\n• Managed $2M annual R&D budget.' },
      { id: 2, company: 'DataFlow Systems', role: 'Product Analyst', dates: '2018 - 2021', desc: '• Conducted market research for 3 new product verticals.\n• Automated weekly reporting using SQL and Tableau.' }
    ],
    skills: 'Agile/Scrum, Product Roadmap, SQL, Python, Mixpanel, A/B Testing, Stakeholder Management'
  };

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : sampleData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Actions
  const loadSample = () => { if(window.confirm("Load sample data? This will overwrite your current progress.")) setResumeData(sampleData); };
  const clearData = () => { if(window.confirm("Clear all data?")) setResumeData(emptyState); };
  const updatePersonal = (field, value) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  // Dynamic Styles
  const isModern = template === 'modern';
  const s = {
    container: isModern ? "flex flex-col min-h-[1056px]" : "p-12 text-center min-h-[1056px]",
    header: isModern ? "bg-slate-900 text-white p-10" : "border-b-2 border-slate-900 pb-6 mb-8",
    body: isModern ? "p-10 text-left" : "text-left",
    heading: isModern ? "text-indigo-600 font-bold uppercase tracking-tighter mb-4 border-b border-slate-100 pb-1" : "text-base font-bold uppercase tracking-widest border-b border-slate-300 mb-3 pb-1"
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased">
      {/* Navbar */}
      <nav className="print:hidden bg-white border-b sticky top-0 z-20 px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-black text-indigo-600 tracking-tighter italic">ATS.READY</h1>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['classic', 'modern'].map(t => (
              <button key={t} onClick={() => setTemplate(t)} className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${template === t ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadSample} className="p-2 text-slate-500 hover:text-indigo-600 title='Load Sample'"><RefreshCw size={20} /></button>
          <button onClick={clearData} className="p-2 text-slate-500 hover:text-red-500 title='Clear All'"><Eraser size={20} /></button>
          <button onClick={() => window.print()} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-md transition-all active:scale-95">
            <Download size={18} /> DOWNLOAD PDF
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Editor */}
        <div className="print:hidden space-y-8 h-[calc(100vh-140px)] overflow-y-auto pr-4 scroll-smooth">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Contact</h2>
            <div className="grid grid-cols-2 gap-5">
              <input type="text" placeholder="Full Name" className="col-span-2 p-3 bg-slate-50 border-none rounded-xl focus:ring-2 ring-indigo-500 transition" value={resumeData.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} />
              <input type="text" placeholder="Job Title" className="p-3 bg-slate-50 border-none rounded-xl" value={resumeData.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} />
              <input type="text" placeholder="Location" className="p-3 bg-slate-50 border-none rounded-xl" value={resumeData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} />
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Work Experience</h2>
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="mb-6 p-4 border border-slate-100 rounded-2xl relative">
                <textarea className="w-full bg-transparent font-bold text-lg outline-none mb-1" placeholder="Company" value={exp.company} onChange={(e) => {/* update logic */}} />
                <textarea className="w-full bg-transparent text-sm outline-none whitespace-pre-line" rows="4" value={exp.desc} onChange={(e) => {/* update logic */}} />
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition font-bold">+ Add Experience</button>
          </section>
        </div>

        {/* Preview */}
        <div className="sticky top-28 h-fit">
          <div id="resume-preview" className={`bg-white shadow-2xl w-full border border-slate-200 overflow-hidden print:border-none print:shadow-none ${s.container}`}>
            <div className={s.header}>
              <h1 className="text-4xl font-black uppercase tracking-tight leading-none">{resumeData.personal.name || "YOUR NAME"}</h1>
              <p className={`text-xl font-medium mt-2 ${isModern ? 'text-indigo-400' : 'text-slate-600'}`}>{resumeData.personal.title}</p>
              <div className={`text-xs mt-4 flex flex-wrap gap-4 font-bold ${!isModern ? 'justify-center text-slate-400' : 'text-slate-300'}`}>
                <span>{resumeData.personal.email}</span> <span>{resumeData.personal.phone}</span> <span>{resumeData.personal.location}</span>
              </div>
            </div>

            <div className={s.body}>
              <div className="mb-8">
                <h3 className={s.heading}>Professional Summary</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{resumeData.summary}</p>
              </div>
              <div className="mb-8">
                <h3 className={s.heading}>Experience</h3>
                {resumeData.experience.map(exp => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{exp.company}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">{exp.dates}</span>
                    </div>
                    <div className="text-sm font-bold text-indigo-600 italic mb-2">{exp.role}</div>
                    <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className={s.heading}>Skills</h3>
                <p className="text-sm text-slate-700 font-medium">{resumeData.skills}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
          
