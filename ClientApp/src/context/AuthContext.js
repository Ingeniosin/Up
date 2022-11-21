import {createContext, useEffect, useState} from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {toast} from "react-hot-toast";
import {auth} from "../components/api/firebase";
import LoadingSpinner from "../components/devextreme/LoadingSpinner";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>}
            <LoadingSpinner/>;
        </div>
    )
    return (
        <AuthContext.Provider value={{
            user,
            logout: () => auth.signOut(),
            isLogged: user !== null,
            login: async (email, password) => {
                await toast.promise(signInWithEmailAndPassword(auth, email, password), {
                    loading: "Iniciando sesión...",
                    success: "Sesión iniciada correctamente",
                    error: e => "Error al iniciar sesión: " + e.message
                })
            },
            register: async (firstName, lastName, email, password) => {
                const fn = async () => {
                    await createUserWithEmailAndPassword(auth, email, password)
                    await updateProfile(auth.currentUser, {
                        displayName: `${firstName} ${lastName}`
                    });
                }
                await toast.promise(fn(), {
                    loading: "Creando cuenta...",
                    success: "Cuenta creada con éxito",
                    error: e => "Error al crear la cuenta: " + e.message
                })
            },
            recoverPassword: async (email) => {
                await toast.promise(sendPasswordResetEmail(auth, email), {
                    loading: "Enviando correo...",
                    success: "Correo enviado con éxito",
                    error: e => "Error al enviar el correo: " + e.message
                })
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};

