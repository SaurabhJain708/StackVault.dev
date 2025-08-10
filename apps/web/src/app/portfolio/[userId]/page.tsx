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
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userData = await getFullUser(userId);

  if (!userData) return <div>User not found</div>;

  return (
    <div>
      <h1>{userData.name}&apos;s Portfolio</h1>
    </div>
  );
}
