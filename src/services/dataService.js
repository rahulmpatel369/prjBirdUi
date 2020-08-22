export const setData = (key, value) => {
    resetData(key);
    if(typeof value == "object") value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

export const getData = (key) => {
    localStorage.getItem(key);
}

export const resetData = (key) => {
    if(key !== undefined) localStorage.removeItem(key);
    else localStorage.clear();
}