export const routes = {
    login: "/login",
    admin_login: "/admin/login",
    register: "/register",
    bird_list: "/birds",
    bird_unverified_list: "/birds/unverified",
    bird_create: "/birds/create",
    users: "/users"
}

const apiBaseUrl = "http://local.prjbirdservice.com/api";

export const apiRouts = {
    admin_login: `${apiBaseUrl}/v1/login`,
    user_login: `${apiBaseUrl}/v1/user/login`,
    admin_logout: `${apiBaseUrl}/v1/logout`,
    user_logout: `${apiBaseUrl}/v1/user/logout`,
    user_register: `${apiBaseUrl}/v1/user/register`,
    bird_list: `${apiBaseUrl}/v1/birds`,
    bird_unverified_list: `${apiBaseUrl}/v1/birds/list/unverified`,
    bird_create: `${apiBaseUrl}/v1/birds`,
    bird_update: `${apiBaseUrl}/v1/birds/{bird_id}`,
    bird_verify: `${apiBaseUrl}/v1/birds/{bird_id}/verifyStatus`,
    users: `${apiBaseUrl}/v1/users`,
    roles: `${apiBaseUrl}/v1/roles`,
    user_role_update: `${apiBaseUrl}/v1/users/{user_id}/role/{role_id}/update`,
    admin_logout: `${apiBaseUrl}/v1/logout`,
    logout: `${apiBaseUrl}/v1/user/logout`,
}