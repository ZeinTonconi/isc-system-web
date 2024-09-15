import jsonClient from "./jsonServerInstance";

const getPermissions = async () => {
    try {
        const response = await jsonClient.get('permissions/');
        return response.data;
    } catch (error) {
        console.error("Error fetching permissions data:", error);
    }
};

export default getPermissions