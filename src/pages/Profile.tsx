import { useState } from "react";
import { useSelector } from "react-redux";
import ChangeProfile from "../components/Profile/ChangeProfile";
import ChangePassword from "../components/Profile/ChangePassword";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [editInfo, setEditInfo] = useState(false);
  const [avatar, setAvatar] = useState(null);

  return (
    <>
      {editInfo ? (
        <ChangePassword setEditInfo={setEditInfo} />
      ) : (
        <ChangeProfile avatar={avatar} user={user} setEditInfo={setEditInfo} />
      )}
    </>
  );
};

export default Profile;
