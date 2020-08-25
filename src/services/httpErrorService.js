import { generateNotification } from "./notificationService";
import { resetData } from './dataService';

export const handleHttpError = (error) => {
    if(error && error.status == 401){
        generateNotification({title: "Token Expiered", text: "", icon: "error"});
        resetData();
        window.location.href = "/login";
    }
    if(error && error.status == 403){
        generateNotification({title: "Permission Denied", text: "You are not allowed to perfrom following action", icon: "error"});
    }
}