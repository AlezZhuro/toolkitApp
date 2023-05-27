import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ControllersContext } from "@/context";

export const HomePage = observer(() => {
  const { authontroller } = useContext(ControllersContext);

  const logoutHandle = () => {
    authontroller.logout();
  };

  return (
    <div>
      <div>HOME PAGE</div>

      <button onClick={logoutHandle}>logout</button>
    </div>
  );
});
