export const setData = (key, value) => {
    resetData(key);
    if(typeof value == "object") value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

export const getData = (key) => {
    return localStorage.getItem(key);
}

export const resetData = (key) => {
    if(key !== undefined) localStorage.removeItem(key);
    else localStorage.clear();
}

export const getRole = () => {
    let role = getData("role");
    if(role != undefined){
        role = JSON.parse(role);
        return role.name;
    }else {
        return null;
    }
}