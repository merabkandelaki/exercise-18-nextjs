import UserDetails from './UserDetails.server';

function UserProfile({ userId }) {
    return (
        <div>
            <h2>User Profile</h2>
            <UserDetails userId={userId} />
        </div>
    );
}

export default UserProfile;