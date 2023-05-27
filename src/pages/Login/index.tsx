import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ControllersContext, StoresContext } from "@/context";
import { RoutePath } from "@/models";

export const LoginPage = observer(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const { authontroller } = useContext(ControllersContext);
  const { authStore } = useContext(StoresContext);
  
  const isAuth = authStore.getAuthenticated;

  useEffect(() => {
    if(isAuth){
        navigate(RoutePath.home)
    }
  }, [isAuth])

  useEffect(() => {
    if (searchParams.has("error")) {
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      alert(`${error}\n${errorDescription}`);
    }

    const code = searchParams.get("code");
    if (code) {
      authontroller.authenticate(code);
    }
  }, []);

  return (
    <div>
      <div>LOGIN PAGE</div>
      <Link to={authontroller.authorizeLink}> Login with GitHub</Link>
    </div>
  );
});
