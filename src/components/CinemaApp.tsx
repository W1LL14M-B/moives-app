import { AuthProvider } from "../hook/AutoContex";
import AppRouter from "../router/AppRouter";


const CinemaApp = () => {
  return (
    <div>
{/*       <Navbar /> */}

<AuthProvider> 
  <AppRouter/>
 </AuthProvider> 
    </div>
  );
};

export default CinemaApp;
