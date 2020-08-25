import swal from 'sweetalert';

export const generateNotification = ({ title, text, icon, button, ...rest }) => {
    swal({ title, text, icon, button, ...rest });
}