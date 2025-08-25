"use client";

import { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/spinner";
import { getUserByDomain } from "@/lib/actions/getUserByDomain";
import { useGetFullUser } from "@/lib/query/user";
import UserHead from "@/lib/overideMetada";

const AtlasTemplate = dynamic(() => import("@/components/templates/Atlas"), {
  loading: () => <Spinner />,
});
const CanvasTemplate = dynamic(() => import("@/components/templates/Canvas"), {
  loading: () => <Spinner />,
});
const HorizonTemplate = dynamic(
  () => import("@/components/templates/Horizon"),
  { loading: () => <Spinner /> },
);
const PulseTemplate = dynamic(() => import("@/components/templates/Pulse"), {
  loading: () => <Spinner />,
});

export default function PremiumUserPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = use(params);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUserId, setLoadingUserId] = useState(true);

  // Fetch userId on mount
  useEffect(() => {
    getUserByDomain(subdomain)
      .then((id) => setUserId(id))
      .finally(() => setLoadingUserId(false));
  }, [subdomain]);

  const { data: userData, isLoading: loadingUserData } = useGetFullUser(
    userId ?? "",
  );

  if (loadingUserId || loadingUserData) {
    return <Spinner />;
  }

  if (!userId || !userData) {
    return <div>User not found</div>;
  }

  let TemplateComponent = null;

  switch (userData.TemplateId) {
    case "140b76f2-b630-4546-bbf0-ae912ea5002b":
      TemplateComponent = <PulseTemplate data={userData} />;
      break;
    case "4c3a1d73-dccc-4406-af9b-90546f601dd5":
      TemplateComponent = <CanvasTemplate data={userData} />;
      break;
    case "9e1b1653-ee01-4f9f-835d-a437b4de87f5":
      TemplateComponent = <HorizonTemplate data={userData} />;
      break;
    case "b53023bb-1fe3-4821-8e9a-318d51d93f1d":
      TemplateComponent = <AtlasTemplate data={userData} />;
      break;
    default:
      return <div>Template not found</div>;
  }

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
