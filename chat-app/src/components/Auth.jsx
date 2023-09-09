import {auth,provider} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
import "../styles/Auth.css"
const cookies = new Cookies();
export const Auth =(props)=>{
    const {setIsAuth} = props;
    const signInWithGoogle = async()=>{
        try{
        const result = await signInWithPopup(auth,provider);
        setIsAuth(true);
        cookies.set("auth-token",result.user.refreshToken)
        }catch(err){
            console.error(err)
        }

    }
    return (
        <div className="auth">
            <h1>Sign In To HeartMessages with Google</h1>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
}