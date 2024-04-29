import { getUsers } from "../services/authApi";

async function UserDetails({ userId }) {
    const userData = await getUsers(userId);
    
    return (
        <div>
            <h1>{userData.name}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
}

export default UserDetails;