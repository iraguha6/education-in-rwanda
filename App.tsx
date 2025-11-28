import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import { TeacherDashboard, StudentDashboard } from './components/Dashboards';
import { User, Lesson, Assessment, StudentGrades, ViewState } from './types';

// --- Placeholder Images ---
const IMG_CLASSROOM = "https://picsum.photos/400/300?random=1";
const IMG_LIBRARY = "https://picsum.photos/400/300?random=2";
const IMG_LAB = "https://picsum.photos/400/300?random=3";

const App: React.FC = () => {
  // --- State ---
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');

  // Data State
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([
    { id: 1, name: "Algebra Quiz", class: "S4 Math", assignedToSDMS: ["S123", "all"], type: "quiz", dueDate: "2024-12-01", instructions: "Solve all."}
  ]);
  const [grades, setGrades] = useState<StudentGrades>({});

  // --- Auth Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail === 'teacher@ttc.rw' && authPass === 'password') {
      setUser({ email: authEmail, role: 'teacher', name: 'Mr. Teacher' });
      setCurrentView('teacher-dashboard');
      setShowWelcome(false);
      setShowAuthModal(false);
    } else if (authEmail === 'student@ttc.rw' && authPass === 'password') {
      setUser({ email: authEmail, role: 'student', sdms: 'S123', name: 'John Doe' });
      setCurrentView('student-dashboard');
      setShowWelcome(false);
      setShowAuthModal(false);
    } else {
      alert("Invalid credentials. Try teacher@ttc.rw / password OR student@ttc.rw / password");
    }
  };

  const handleGuestEnter = () => {
    setUser({ role: 'guest' });
    setShowWelcome(false);
    setShowAuthModal(false);
  };

  // --- Render Helpers ---
  const NavButton = ({ view, label }: { view: ViewState, label: string }) => (
    <button
      onClick={() => {
        if ((view === 'teacher-dashboard' && user?.role !== 'teacher') ||
            (view === 'student-dashboard' && user?.role !== 'student')) {
          alert(`Please login as a ${view.split('-')[0]} first.`);
          setShowAuthModal(true);
          return;
        }
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`w-full text-left px-6 py-3 font-semibold transition-colors duration-200 ${
        currentView === view 
          ? 'bg-primary text-white border-l-4 border-highlight' 
          : 'text-white hover:bg-teal-800'
      }`}
    >
      {label}
    </button>
  );

  // --- Main Content Renderer ---
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <section className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
             <div className="border-b-4 border-primary pb-4 mb-6">
               <h2 className="text-3xl font-heading text-primary font-bold">Welcome to TTC Bicumbi Community!</h2>
               {/* MARQUEE TEXT SLIDING LEFT TO RIGHT */}
               <div className="w-full overflow-hidden bg-gray-100 py-2 mt-2 rounded border border-gray-300">
                  <div className="animate-slide-right whitespace-nowrap inline-block font-bold text-secondary text-lg w-full">
                     Welcome to TTC Bicumbi &nbsp;&nbsp;&nbsp;&nbsp; Quality Education for All &nbsp;&nbsp;&nbsp;&nbsp; Join our Community
                  </div>
               </div>
             </div>
             
             <p className="text-gray-700 leading-relaxed mb-4">
               TTC Bicumbi is a respected institution dedicated to providing quality education and fostering a supportive community. 
               We believe that quality education is the key to a bright future.
             </p>
             <p className="text-gray-700 leading-relaxed mb-6">
               This platform connects teachers, students, parents, and management to stay connected and improve communication.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-bgMain p-4 rounded border-l-4 border-secondary">
                 <h3 className="font-bold text-primary mb-2">Platform Features</h3>
                 <ul className="list-disc list-inside text-sm space-y-1">
                   <li>Real-time Communication</li>
                   <li>Student & Teacher Dashboards</li>
                   <li>Interactive Forums</li>
                   <li>Online Applications</li>
                 </ul>
               </div>
               <div className="bg-bgMain p-4 rounded border-l-4 border-highlight">
                  <h3 className="font-bold text-primary mb-2">Announcements</h3>
                  <p className="text-sm">Check the News section for the latest updates on school reopening and events.</p>
               </div>
             </div>
          </section>
        );
      case 'about':
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2 mb-4">About TTC Bicumbi</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">Our Mission</h3>
                <p className="mb-4">To provide a dynamic learning environment that nurtures critical thinking, creativity, and social responsibility.</p>
                <h3 className="text-xl font-bold text-secondary mb-2">Our Values</h3>
                <ul className="list-disc list-inside bg-gray-50 p-4 rounded">
                  <li>Excellence in Education</li>
                  <li>Community & Collaboration</li>
                  <li>Integrity & Respect</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <img src={IMG_CLASSROOM} alt="Classroom" className="rounded shadow hover:scale-105 transition-transform" />
                  <p className="text-xs text-center font-bold text-gray-500">Modern Classrooms</p>
                </div>
                <div className="space-y-2">
                  <img src={IMG_LAB} alt="Lab" className="rounded shadow hover:scale-105 transition-transform" />
                  <p className="text-xs text-center font-bold text-gray-500">Science Labs</p>
                </div>
                <div className="space-y-2">
                  <img src={IMG_LIBRARY} alt="Library" className="rounded shadow hover:scale-105 transition-transform" />
                  <p className="text-xs text-center font-bold text-gray-500">Library</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'communication':
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2 mb-4">Communication Hub</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message Sent!'); }} className="space-y-4 max-w-lg">
              <div>
                <label className="block font-bold mb-1">To:</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Recipient..." required />
              </div>
              <div>
                <label className="block font-bold mb-1">Subject:</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Subject..." required />
              </div>
              <div>
                <label className="block font-bold mb-1">Message:</label>
                <textarea rows={5} className="w-full p-2 border rounded" placeholder="Write your message..." required />
              </div>
              <button className="bg-secondary text-white px-6 py-2 rounded hover:bg-teal-700 font-bold">Send Message</button>
            </form>
          </section>
        );
      case 'teacher-dashboard':
        return (
          <TeacherDashboard 
            lessons={lessons} 
            assessments={assessments}
            onAddLesson={(l) => setLessons([...lessons, l])}
            onAddAssessment={(a) => setAssessments([...assessments, a])}
            onDeleteAssessment={(id) => setAssessments(assessments.filter(a => a.id !== id))}
          />
        );
      case 'student-dashboard':
        return (
          <StudentDashboard 
            lessons={lessons}
            assessments={assessments}
            studentSDMS={user?.sdms || ''}
            grades={grades}
            onSubmitScore={(id, score) => setGrades({
              ...grades, 
              [id]: { ...(grades[id] || {}), [user?.sdms || '']: score }
            })}
          />
        );
      case 'forum':
        return (
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2 mb-4">Community Forum</h2>
                <div className="bg-indigo-50 p-4 rounded mb-6 border border-indigo-100">
                    <h3 className="font-bold text-primary text-lg">Guidelines</h3>
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                        <li>Teachers: Initiate discussions on lessons.</li>
                        <li>Parents: Ask questions about education quality.</li>
                        <li>Admin: Monitor and moderate.</li>
                    </ul>
                </div>
                
                <div className="bg-white border border-l-4 border-l-primary p-4 rounded shadow-sm mb-4">
                     <h3 className="font-bold text-secondary">Meeting Platform</h3>
                     <p className="text-sm mb-2">Join live discussions and classes.</p>
                     <a href="https://meet.google.com/new" target="_blank" rel="noreferrer" className="inline-block bg-primary text-white text-xs px-3 py-2 rounded hover:bg-blue-800">Launch Google Meet</a>
                </div>

                <h3 className="font-bold text-lg mb-2">Recent Topics</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded border">
                        <h4 className="font-bold text-gray-800">How to access online materials?</h4>
                        <p className="text-xs text-gray-500">Posted by Student X</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border">
                        <h4 className="font-bold text-gray-800">Upcoming School Fair Ideas</h4>
                        <p className="text-xs text-gray-500">Posted by Parent Y</p>
                    </div>
                </div>
            </section>
        );
      case 'apply':
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2 mb-4">Apply Online</h2>
            <form onSubmit={(e) => {e.preventDefault(); alert("Application Submitted!"); }} className="space-y-4 max-w-xl">
               <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="appType" defaultChecked /> Student Admission
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="appType" /> Staff Position
                  </label>
               </div>
               <input className="w-full p-2 border rounded" placeholder="Full Name" required />
               <input className="w-full p-2 border rounded" placeholder="Email" type="email" required />
               <input className="w-full p-2 border rounded" placeholder="Phone Number" required />
               <input className="w-full p-2 border rounded" placeholder="Applying for (Grade/Position)" required />
               <textarea className="w-full p-2 border rounded" rows={4} placeholder="Cover Letter / Additional Info"></textarea>
               <button className="bg-secondary text-white px-6 py-2 rounded font-bold">Submit Application</button>
            </form>
          </section>
        );
      case 'contact':
        return (
           <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2 mb-4">Contact Us</h2>
              <div className="space-y-2 mb-6">
                <p><strong>Email:</strong> info@ttcbicumbi.edu.rw</p>
                <p><strong>Phone:</strong> +250 788 123 456</p>
                <p><strong>Address:</strong> Bicumbi District, Eastern Province, Rwanda</p>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  [Map Placeholder: Bicumbi District]
              </div>
           </section>
        );
      default:
        return <div>Section Under Construction</div>;
    }
  };

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen 
          onEnter={handleGuestEnter}
          onLoginClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
          onSignupClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
        />
      ) : (
        <div className="min-h-screen bg-bgMain flex flex-col md:flex-row font-sans">
          
          {/* Mobile Header */}
          <div className="md:hidden bg-secondary text-white p-4 flex justify-between items-center shadow-md">
             <h1 className="font-heading font-bold text-lg">TTC Bicumbi</h1>
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl">
               ☰
             </button>
          </div>

          {/* Navigation Sidebar */}
          <nav className={`
            fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 transition duration-200 ease-in-out
            w-64 bg-secondary flex flex-col shadow-xl z-20 pt-10 md:pt-4
          `}>
             <div className="px-6 mb-8 text-white hidden md:block">
               <h1 className="font-heading text-2xl font-bold">TTC Bicumbi</h1>
               <p className="text-xs opacity-75">Education Platform</p>
             </div>

             <NavButton view="home" label="Home" />
             <NavButton view="about" label="About Us" />
             <NavButton view="communication" label="Communication" />
             <NavButton view="news" label="News & Updates" />
             <NavButton view="forum" label="Forum" />
             <NavButton view="teacher-dashboard" label="Teacher Dashboard" />
             <NavButton view="student-dashboard" label="Student Dashboard" />
             <NavButton view="apply" label="Apply Online" />
             <NavButton view="contact" label="Contact Us" />

             {/* User Info / Logout at bottom */}
             <div className="mt-auto p-4 bg-teal-900 text-white text-sm">
                {user?.role !== 'guest' ? (
                  <>
                    <p className="font-bold">{user?.name}</p>
                    <p className="opacity-75 capitalize">{user?.role}</p>
                    <button onClick={() => { setUser(null); setShowWelcome(true); }} className="text-highlight text-xs mt-2 underline">Logout</button>
                  </>
                ) : (
                   <button onClick={() => { setShowWelcome(true); }} className="text-highlight text-xs underline">Login / Exit Guest</button>
                )}
             </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
             <header className="bg-primary text-white p-6 shadow-md hidden md:block">
                <h1 className="font-heading text-2xl font-bold">TTC Bicumbi Platform</h1>
                <p className="text-sm opacity-90">Learning & Opportunity</p>
             </header>

             <main className="flex-1 overflow-auto p-4 md:p-8">
               <div className="max-w-5xl mx-auto">
                 {renderContent()}
               </div>
             </main>

             <footer className="bg-primary text-white p-4 text-center text-sm">
               &copy; 2024 TTC Bicumbi. All rights reserved.
             </footer>
          </div>
        </div>
      )}

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 relative">
             <button onClick={() => setShowAuthModal(false)} className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-black">&times;</button>
             
             <div className="flex mb-4 border-b">
               <button 
                 onClick={() => setAuthMode('login')} 
                 className={`flex-1 pb-2 font-bold ${authMode === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
               >Login</button>
               <button 
                 onClick={() => setAuthMode('signup')}
                 className={`flex-1 pb-2 font-bold ${authMode === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
               >Sign Up</button>
             </div>

             <form onSubmit={authMode === 'login' ? handleLogin : (e) => { e.preventDefault(); alert('Signed up!'); }} className="space-y-4">
               <div>
                 <label className="block text-sm font-bold mb-1">Email</label>
                 <input 
                    type="email" 
                    className="w-full border p-2 rounded" 
                    value={authEmail} 
                    onChange={e => setAuthEmail(e.target.value)} 
                    placeholder="student@ttc.rw"
                    required 
                  />
               </div>
               <div>
                 <label className="block text-sm font-bold mb-1">Password</label>
                 <input 
                    type="password" 
                    className="w-full border p-2 rounded" 
                    value={authPass} 
                    onChange={e => setAuthPass(e.target.value)} 
                    placeholder="password"
                    required 
                  />
               </div>
               <button type="submit" className="w-full bg-secondary text-white py-2 rounded font-bold hover:bg-teal-700">
                 {authMode === 'login' ? 'Login' : 'Sign Up'}
               </button>

               <div className="relative flex py-2 items-center">
                 <div className="flex-grow border-t border-gray-300"></div>
                 <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
                 <div className="flex-grow border-t border-gray-300"></div>
               </div>
               
               <button type="button" onClick={() => alert('Google Auth Simulated')} className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50">
                  <span className="font-bold text-gray-600">Google</span>
               </button>
             </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;