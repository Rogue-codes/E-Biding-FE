const expirationDate = new Date();  // Get the current date and time
expirationDate.setDate(expirationDate.getDate() + 7);  // Set the expiration date to 7 days from now

// Convert the expiration date to a string in the format required by the 'expires' attribute
const expires = expirationDate.toUTCString();
export const loginAuth = (access_token:string) =>{
    document.cookie = `access_token=${access_token}; expires=${expires}; path="/";`
}

export function logoutAuth() {
    document.cookie = 'access_token='
}

export function getAuthToken() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies)   {
        const [field, value ] = cookie.split("=")
        if (field === 'access_token')
            return value;
    }
    return null;
}