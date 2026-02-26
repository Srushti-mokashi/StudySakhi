import { useState, useEffect } from "react";
import sampleData from "../data/sampleData.json";

export const useStudyData = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from local JSON
  const loadData = () => {
    try {
      setLoading(true);

      setSubjects(sampleData.subjects || []);
      setTasks(sampleData.tasks || []);

      setError(null);
    } catch (err) {
      console.error("Error loading study data:", err);
      setError("Failed to load study data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---- Local-only operations ----

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addSubject = (subject) => {
    setSubjects((prev) => [...prev, { ...subject, id: Date.now() }]);
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
    refreshData: loadData,
  };
};