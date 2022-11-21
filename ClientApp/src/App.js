import './assets/design/dx.material.custom-scheme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./context/AuthContext";
import AppRouter from "./routers/AppRouter";

const App = () => {
    return (
       <>
           <AuthProvider>
               <AppRouter/>
               <Toaster position="bottom-right"/>
           </AuthProvider>
       </>
    );
};


export default App;
