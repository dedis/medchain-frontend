import { Roster } from "@dedis/cothority/network";
import { FunctionComponent, useContext, useState } from "react";
import { FaExchangeAlt, FaUsers } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { ConnectButton, DisconnectButton, FollowButton } from "../components/Buttons";
import { ConnectionContext } from "../contexts/ConnectionContext";
import { byprosFollow } from "../services/cothorityGateway";
import { EmptyReply } from "../services/messages";
import { getRosterStr } from "../services/roster";
import { formatAccountName } from "../tools/format";
import ConnectModal from "./ConnectModal";
import Success from "./Success";

const SidebarNavLink: FunctionComponent<{
  icon: IconType;
  title: string;
  to: string;
}> = ({ icon: Icon, title, to }) => {
  return (
    <NavLink
      exact
      to={to}
      className="block flex text-white font-bold items-center border-r-4 border-transparent hover:border-primary-200 hover:bg-primary-600 px-3 py-2"
      activeClassName="bg-primary-600 border-primary-200"
    >
      <Icon />
      <span className="ml-2 text-lg">{title}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const { connection, setConnection } = useContext(ConnectionContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const followBypros = () => {
    byprosFollow().then(
      (reply: EmptyReply) => {
        setSuccess('Started following ' + Roster.fromTOML(getRosterStr()).list[0].getWebSocketAddress())
      }
    ).catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="w-52 flex flex-col h-full bg-primary-400">
      <Success title="Succesfull connection" success={success}
        setSuccess={setSuccess}/>
      <h1 className="font-bold text-white text-2xl m-3">Medchain</h1>
      <SidebarNavLink icon={FaUsers} title="Admins" to="/admins" />
      <SidebarNavLink
        icon={FaExchangeAlt}
        title="Transactions"
        to="/transactions"
      />
      <SidebarNavLink icon={GoProject} title="Projects" to="/projects" />
      <div className="flex flex-col mt-auto mb-4 px-3">
        <FollowButton
        onClick={followBypros}/>
        {!connection.connected ? (
          <div className="flex flex-col">
            <ConnectModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setConnection={setConnection}/>
            <ConnectButton
              onClick={(e) => {
                setIsOpen(true);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="text-xs text-white font-bold mb-2">{`Connected to: ${formatAccountName(
              connection.public
            )}`}</p>
            <DisconnectButton
              onClick={(e) => {
                setConnection({ connected: false, public: "", private: "" });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
