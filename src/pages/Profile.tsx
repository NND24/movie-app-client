import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChangeProfile from "../components/Profile/ChangeProfile";
import ChangePassword from "../components/Profile/ChangePassword";
import { RootState } from "../features/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [editInfo, setEditInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {editInfo ? (
        <ChangePassword setEditInfo={setEditInfo} />
      ) : (
        <ChangeProfile user={user} setEditInfo={setEditInfo} />
      )}
    </>
  );
};

export default Profile;
