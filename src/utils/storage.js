const STORAGE_KEY = 'studybuddy_data';

export const loadData = (initialData) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);

    // Set initial data if nothing in storage
    saveData(initialData);
    return initialData;
};

export const saveData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
};
