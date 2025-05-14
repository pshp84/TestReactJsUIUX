import { Layout } from "../components/Layout";
import { useRequestContext } from "../context/useRequestContext";

export const DashboardPage: React.FC = () => {
  const {requests} = useRequestContext();
  console.log(requests)
  const sidebarLinks = [
    { label: "Users", key: "users" },
    { label: "Services", key: "services" },
  ];
  return (
    <Layout sidebarLinks={sidebarLinks}>
      {(activeTab) => {
        switch (activeTab) {
          case "users":
            return (
              <>
                <div>users</div>
              </>
            );
            case "services":
              return(
                <>
                <div>services</div>
                </>
              )

          default:
            return null;
        }
      }}
    </Layout>
  );
};
