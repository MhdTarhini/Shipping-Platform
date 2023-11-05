import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../rkt/userSlice";

function Home() {
  const user = useSelector(selectUser);
  return <div>{user?.user?.name}!</div>;
}

export default Home;
