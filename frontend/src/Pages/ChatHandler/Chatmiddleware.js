import ChatsPage from "./chatsPage";
import { useAuthContext } from "../../hooks/useAuthContext.js";

function Chatmiddleware() {
    const { user } = useAuthContext();

    // If user is logged in, show the chat page directly
    if (user) {
        return <ChatsPage />;
    } else {
        // Redirect to login if not authenticated
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h2>Please log in to access chat</h2>
                <a href="/login" style={{
                    padding: '10px 20px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>
                    Go to Login
                </a>
            </div>
        );
    }
}

export default Chatmiddleware;
