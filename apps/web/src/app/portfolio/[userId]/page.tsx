"use client";
import Spinner from "@/components/spinner";
import { useGetFullUser } from "@/lib/query/user";
import dynamic from "next/dynamic";
import { use } from "react";

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
export default function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params); // unwrap the promise
  const { data: userData, isLoading } = useGetFullUser(userId);

  if (isLoading) return <Spinner />;
  if (!userData) return <div>User not found</div>;
  if (!userData.TemplateId) return <div>Template not found</div>;

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

  return <div className="relative">{TemplateComponent}</div>;
}
