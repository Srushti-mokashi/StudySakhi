import React, { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Progress from './pages/Progress'
import Modal from './components/ui/Modal'
import TaskForm from './components/ui/TaskForm'
import { useStudyData } from './utils/useStudyData'

function App() {
    const [activePage, setActivePage] = useState('dashboard')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    const {
        tasks,
        subjects,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        addSubject
    } = useStudyData()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mr-4"></div>
                Loading study data...
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 text-red-500">
                Error: {error}. Please ensure the JSON server is running.
            </div>
        )
    }

    const handleOpenAddModal = () => {
        setEditingTask(null)
        setIsModalOpen(true)
    }

    const handleOpenEditModal = (task) => {
        setEditingTask(task)
        setIsModalOpen(true)
    }

    const handleSubmitTask = (taskData) => {
        if (editingTask) {
            updateTask({ ...taskData, id: editingTask.id })
        } else {
            addTask(taskData)
        }
        setIsModalOpen(false)
    }

    const handleToggleTask = (id) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            updateTask({
                ...task,
                status: task.status === 'Completed' ? 'Pending' : 'Completed'
            })
        }
    }

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return (
                    <Dashboard
                        tasks={tasks}
                        subjects={subjects}
                        onToggleTask={handleToggleTask}
                        onDeleteTask={deleteTask}
                        onEditTask={handleOpenEditModal}
                        onAddTask={handleOpenAddModal}
                    />
                )
            case 'tasks':
                return (
                    <Tasks
                        tasks={tasks}
                        subjects={subjects}
                        onToggleTask={handleToggleTask}
                        onDeleteTask={deleteTask}
                        onEditTask={handleOpenEditModal}
                        onAddTask={handleOpenAddModal}
                    />
                )
            case 'progress':
                return <Progress tasks={tasks} subjects={subjects} />
            case 'subjects':
                return (
                    <div className="flex items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 italic text-slate-400">
                        Subject management coming soon... (Integrated in Tasks view)
                    </div>
                )
            case 'schedule':
                return (
                    <div className="flex items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 italic text-slate-400">
                        Calendar view coming soon...
                    </div>
                )
            default:
                return <Dashboard tasks={tasks} subjects={subjects} />
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar activePage={activePage} />

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {renderPage()}
                    </div>
                </main>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTask ? "Edit Study Task" : "Add New Task"}
            >
                <TaskForm
                    subjects={subjects}
                    onSubmit={handleSubmitTask}
                    initialData={editingTask}
                />
            </Modal>
        </div>
    )
}

export default App
