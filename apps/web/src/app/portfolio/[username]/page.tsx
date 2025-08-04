export default async function Page() {
  // Fetch user data based on the username
  const user = await fetch(`/api/public?username=`).then((res) => res.json());

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.name}&apos;s Portfolio</h1>
      {/* Render user portfolio details here */}
    </div>
  );
}
