import UserCard from "../../components/dashboard/UserCard";

export default function DashboardUsers() {
  return (
    <div className="page">
      <div className="flex flex-wrap w-full gap-8 h-fit">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
