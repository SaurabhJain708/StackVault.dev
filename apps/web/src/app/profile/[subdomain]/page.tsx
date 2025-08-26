"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/spinner";
import { useGetUserData } from "@/lib/query/fullUser";
import UserHead from "@/lib/overideMetada";
import { useGetUserByDomain } from "@/lib/query/getUserbyDomain";

const AtlasTemplate = dynamic(() => import("@/components/templates/Atlas"), {
  loading: () => <Spinner />,
});
const CanvasTemplate = dynamic(() => import("@/components/templates/Canvas"), {
  loading: () => <Spinner />,
});
const HorizonTemplate = dynamic(
  () => import("@/components/templates/Horizon"),
  { loading: () => <Spinner /> }
);
const PulseTemplate = dynamic(() => import("@/components/templates/Pulse"), {
  loading: () => <Spinner />,
});

const messageContainer =
  "flex flex-col items-center justify-center h-[70vh] text-center gap-4 text-gray-600";

export default function PremiumUserPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = use(params);
  console.log("subdomain:", subdomain);

  const { data: userIdData, isLoading: loadingUserIdData } =
    useGetUserByDomain(subdomain);

  const userId = userIdData?.id || null;

  console.log("userId:", userId);
  const { data: userData, isLoading: loadingUserData } = useGetUserData(
    userId ?? ""
  );

  console.log("userData:", userData);
  if (loadingUserData || loadingUserIdData) {
    return (
      <div className={messageContainer}>
        <Spinner />
        <p className="text-lg font-medium">Loading user data...</p>
      </div>
    );
  }

  if (!userId || !userData) {
    return (
      <div className={messageContainer}>
        <p className="text-xl font-semibold text-red-500">User not found</p>
        <p className="text-gray-500">
          The user you are looking for does not exist.
        </p>
      </div>
    );
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
      return (
        <div className={messageContainer}>
          <p className="text-xl font-semibold text-red-500">
            Template not found
          </p>
          <p className="text-gray-500">
            This user does not have a valid template assigned.
          </p>
        </div>
      );
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
