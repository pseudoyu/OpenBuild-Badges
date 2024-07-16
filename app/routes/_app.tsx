import { Link, Outlet } from "@remix-run/react";

export default function AppLayout() {
  return (
    <div className="">
      <nav className="border-b py-3">
        <div className="max-w-[640px] mx-auto md:px-0">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <Link to="/badges">Badges</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-[640px] mx-auto md:px-0">
        <Outlet />
      </div>
    </div>
  );
}
