import { routes } from "../../routes";
import {WaNavLink} from '../../onkrzyczy'
import { useAuthContext } from "../../Auth/AuthContext";

export const UserMenu = () => {
    const { isLoggedIn, username, logOut } = useAuthContext();
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');  // Remove the JWT token
        logOut()
    }

    return (
        <>
            {isLoggedIn ? (
                <div className="flex flex-row items-center">
                    <p className="">{username}</p>
                    <button className="log-in px-3 py-1" onClick={handleLogout}>Logout</button>
                </div>
            ) : (<>
            </>
            )}
    </>
  );
}