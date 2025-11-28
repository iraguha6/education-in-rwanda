import React, { useState } from 'react';
import { Lesson, Assessment, StudentGrades } from '../types';

// --- Teacher Dashboard ---
interface TeacherDashboardProps {
  lessons: Lesson[];
  assessments: Assessment[];
  onAddLesson: (l: Lesson) => void;
  onAddAssessment: (a: Assessment) => void;
  onDeleteAssessment: (id: number) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lessons,
  assessments,
  onAddLesson,
  onAddAssessment,
  onDeleteAssessment
}) => {
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);

  // Lesson Form State
  const [lTitle, setLTitle] = useState('');
  const [lClass, setLClass] = useState('');
  const [lDesc, setLDesc] = useState('');

  // Assessment Form State
  const [aName, setAName] = useState('');
  const [aClass, setAClass] = useState('');
  const [aSdms, setASdms] = useState('');
  const [aType, setAType] = useState<'quiz' | 'assignment' | 'exam'>('quiz');
  const [aDate, setADate] = useState('');
  const [aInst, setAInst] = useState('');

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLesson({
      id: Date.now(),
      title: lTitle,
      class: lClass,
      description: lDesc,
    });
    setLTitle(''); setLClass(''); setLDesc('');
    setShowLessonForm(false);
    alert("Lesson Added!");
  };

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAssessment({
      id: Date.now(),
      name: aName,
      class: aClass,
      assignedToSDMS: aSdms.split(',').map(s => s.trim()),
      type: aType,
      dueDate: aDate,
      instructions: aInst,
    });
    setAName(''); setAClass(''); setASdms(''); setADate(''); setAInst('');
    setShowAssessmentForm(false);
    alert("Assessment Published!");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2">Teacher Dashboard</h2>
      
      {/* Manage Lessons */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
        <h3 className="text-xl text-primary font-bold mb-2">Manage Lessons</h3>
        <p className="text-gray-600 mb-4">Create new lessons and schedule classes.</p>
        <button 
          onClick={() => setShowLessonForm(!showLessonForm)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {showLessonForm ? 'Cancel' : 'Add New Lesson'}
        </button>

        {showLessonForm && (
          <form onSubmit={handleLessonSubmit} className="mt-4 space-y-4 bg-gray-50 p-4 rounded">
            <input className="w-full p-2 border rounded" placeholder="Lesson Title" value={lTitle} onChange={e => setLTitle(e.target.value)} required />
            <input className="w-full p-2 border rounded" placeholder="Class (e.g. S4 Math)" value={lClass} onChange={e => setLClass(e.target.value)} required />
            <textarea className="w-full p-2 border rounded" placeholder="Description" rows={3} value={lDesc} onChange={e => setLDesc(e.target.value)} />
            <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Save Lesson</button>
          </form>
        )}
        
        <div className="mt-6">
          <h4 className="font-bold mb-2">Current Lessons:</h4>
          <ul className="space-y-2">
            {lessons.map(l => (
              <li key={l.id} className="bg-gray-100 p-2 rounded">
                <strong>{l.title}</strong> - {l.class}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Manage Assessments */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
        <h3 className="text-xl text-primary font-bold mb-2">Student Assessments</h3>
        <p className="text-gray-600 mb-4">Create and assign assessments.</p>
        <button 
           onClick={() => setShowAssessmentForm(!showAssessmentForm)}
           className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {showAssessmentForm ? 'Cancel' : 'Create Assessment'}
        </button>

        {showAssessmentForm && (
          <form onSubmit={handleAssessmentSubmit} className="mt-4 space-y-4 bg-gray-50 p-4 rounded">
             <input className="w-full p-2 border rounded" placeholder="Assessment Name" value={aName} onChange={e => setAName(e.target.value)} required />
             <input className="w-full p-2 border rounded" placeholder="Class" value={aClass} onChange={e => setAClass(e.target.value)} required />
             <input className="w-full p-2 border rounded" placeholder="Student SDMS (comma separated)" value={aSdms} onChange={e => setASdms(e.target.value)} required />
             <select className="w-full p-2 border rounded" value={aType} onChange={(e: any) => setAType(e.target.value)}>
               <option value="quiz">Quiz</option>
               <option value="assignment">Assignment</option>
               <option value="exam">Exam</option>
             </select>
             <input type="date" className="w-full p-2 border rounded" value={aDate} onChange={e => setADate(e.target.value)} required />
             <textarea className="w-full p-2 border rounded" placeholder="Instructions" value={aInst} onChange={e => setAInst(e.target.value)} />
             <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Publish</button>
          </form>
        )}

        <div className="mt-6">
          <h4 className="font-bold mb-2">Active Assessments:</h4>
          <ul className="space-y-2">
            {assessments.map(a => (
              <li key={a.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                <span>{a.name} ({a.type}) - Due: {a.dueDate}</span>
                <button onClick={() => onDeleteAssessment(a.id)} className="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Student Dashboard ---
interface StudentDashboardProps {
  lessons: Lesson[];
  assessments: Assessment[];
  studentSDMS: string;
  grades: StudentGrades;
  onSubmitScore: (assessmentId: number, score: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lessons,
  assessments,
  studentSDMS,
  grades,
  onSubmitScore
}) => {
  const relevantAssessments = assessments.filter(a => 
    a.assignedToSDMS.includes(studentSDMS) || a.assignedToSDMS.includes('all')
  );

  const [scoreInputs, setScoreInputs] = useState<{[key: number]: string}>({});

  const handleScoreSubmit = (id: number) => {
    const score = parseInt(scoreInputs[id]);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      onSubmitScore(id, score);
    } else {
      alert("Invalid Score");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-heading text-primary border-b-2 border-primary pb-2">Student Dashboard</h2>

      {/* Lessons */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
        <h3 className="text-xl text-primary font-bold mb-4">My Lessons</h3>
        {lessons.length === 0 ? <p>No lessons available.</p> : (
          <div className="grid gap-4">
            {lessons.map(l => (
              <div key={l.id} className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-lg text-primary">{l.class} - {l.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{l.description}</p>
                <button className="mt-3 bg-secondary text-white px-3 py-1 rounded text-sm hover:bg-teal-700">Start Lesson</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assessments */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
        <h3 className="text-xl text-primary font-bold mb-4">My Assessments</h3>
        {relevantAssessments.length === 0 ? <p>No assessments assigned.</p> : (
          <div className="grid gap-4">
            {relevantAssessments.map(a => {
              const myGrade = grades[a.id]?.[studentSDMS];
              return (
                <div key={a.id} className="bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg text-primary">{a.name}</h4>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{a.type.toUpperCase()}</span>
                      <p className="text-sm text-gray-600 mt-1">Due: {a.dueDate}</p>
                    </div>
                    {myGrade !== undefined ? (
                      <div className="text-green-600 font-bold text-xl">Score: {myGrade}%</div>
                    ) : (
                      <span className="text-orange-500 font-semibold text-sm">Pending</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm italic">{a.instructions}</p>
                  
                  {myGrade === undefined && (
                    <div className="mt-4 flex gap-2">
                       <input 
                         type="number" 
                         placeholder="Score (Simulated)" 
                         className="border p-1 rounded w-32 text-sm"
                         value={scoreInputs[a.id] || ''}
                         onChange={(e) => setScoreInputs({...scoreInputs, [a.id]: e.target.value})}
                       />
                       <button 
                         onClick={() => handleScoreSubmit(a.id)}
                         className="bg-primary text-white px-3 py-1 rounded text-sm"
                       >
                         Submit
                       </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

       {/* E-Learning */}
       <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
          <h3 className="text-xl text-primary font-bold mb-4">E-Learning Resources</h3>
          <ul className="space-y-4">
            {['Mathematics', 'Physics', 'History', 'Biology'].map(subj => (
              <li key={subj} className="flex justify-between items-center border-b pb-2">
                <span>{subj} Resources</span>
                <button className="text-secondary hover:underline text-sm font-bold">View Materials</button>
              </li>
            ))}
          </ul>
       </div>
    </div>
  );
};
