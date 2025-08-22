import Spinner from "@/components/spinner";
import { getUserByDomain } from "@/lib/actions/getUserByDomain";
import UserHead from "@/lib/overideMetada";
import dynamic from "next/dynamic";

const AtlasTemplate = dynamic(() => import("@/components/templates/Atlas"), {
  loading: () => <Spinner />,
});
const CanvasTemplate = dynamic(() => import("@/components/templates/Canvas"), {
  loading: () => <Spinner />,
});
const HorizonTemplate = dynamic(
  () => import("@/components/templates/Horizon"),
  {
    loading: () => <Spinner />,
  },
);
const PulseTemplate = dynamic(() => import("@/components/templates/Pulse"), {
  loading: () => <Spinner />,
});

async function getFullUser(userId: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/public?userid=${userId}`,
    { cache: "no-store" },
  );
  return res.json();
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const userId = await getUserByDomain(subdomain);
  if (!userId) {
    return <div>User not found</div>;
  }
  const userData = await getFullUser(userId);

  let TemplateComponent = null;

  if (userData.TemplateId === "140b76f2-b630-4546-bbf0-ae912ea5002b") {
    TemplateComponent = <PulseTemplate data={userData} />;
  } else if (userData.TemplateId === "4c3a1d73-dccc-4406-af9b-90546f601dd5") {
    TemplateComponent = <CanvasTemplate data={userData} />;
  } else if (userData.TemplateId === "9e1b1653-ee01-4f9f-835d-a437b4de87f5") {
    TemplateComponent = <HorizonTemplate data={userData} />;
  } else if (userData.TemplateId === "b53023bb-1fe3-4821-8e9a-318d51d93f1d") {
    TemplateComponent = <AtlasTemplate data={userData} />;
  } else {
    return <div>Template not found</div>;
  }

  if (!userData) return <div>User not found</div>;

  return (
    <>
      <UserHead
        title={userData.name || "User Portfolio"}
        favicon={userData.avatarUrl || "/favicon.ico"}
      />
      <div className="relative">{TemplateComponent}</div>
    </>
  );
}
