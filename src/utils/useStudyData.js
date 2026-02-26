import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001';

export const useStudyData = () => {
    const [tasks, setTasks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [tasksRes, subjectsRes] = await Promise.all([
                fetch(`${API_URL}/tasks`),
                fetch(`${API_URL}/subjects`)
            ]);
            
            if (!tasksRes.ok || !subjectsRes.ok) throw new Error('Failed to fetch data');
            
            const tasksData = await tasksRes.json();
            const subjectsData = await subjectsRes.json();
            
            setTasks(tasksData);
            setSubjects(subjectsData);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error loading study data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            if (!response.ok) throw new Error('Failed to add task');
            const newTask = await response.json();
            setTasks(prev => [...prev, newTask]);
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });
            if (!response.ok) throw new Error('Failed to update task');
            const data = await response.json();
            setTasks(prev => prev.map(t => t.id === data.id ? data : t));
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete task');
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const addSubject = async (subject) => {
        try {
            const response = await fetch(`${API_URL}/subjects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subject)
            });
            if (!response.ok) throw new Error('Failed to add subject');
            const newSubject = await response.json();
            setSubjects(prev => [...prev, newSubject]);
        } catch (err) {
            console.error('Error adding subject:', err);
        }
    };

    return {
        tasks,
        subjects,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        addSubject,
        refreshData: fetchData
    };
};
