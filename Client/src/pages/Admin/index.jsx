import { Tabs } from "antd";
import Movies from "../Admin/Movies";
import Artists from "../Admin/Artists";
import Users from "../Admin/Users";
import { useSelector } from "react-redux";
import Item from "antd/es/list/Item";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Admin() {
  const [activeTab, setActiveTab] = useState("1");
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {});
  return (
    <div>
      {user?.isAdmin ? (
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            navigate(`/admin?tab=${key}`);
          }}
        >
          <Item tab="Movies" key="1">
            <Movies />
          </Item>
          <Item tab="Artists" key="2">
            <Artists />
          </Item>
          <Item tab="Users" key="3">
            <Users />
          </Item>
        </Tabs>
      ) : (
        <div className="text-gray-600 text-md text-center mt-20">
          You are not authorized to view this page
        </div>
      )}
    </div>
  );
}

export default Admin;
