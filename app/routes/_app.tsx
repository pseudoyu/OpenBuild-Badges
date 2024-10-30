import { Link, Outlet } from "@remix-run/react";

export default function AppLayout() {
  return (
    <div>
      <nav className="py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-primary transition-colors font-medium"
            >
              <div className="flex items-center gap-2">
                <img src="/openbuild.svg" alt="Logo" className="w-6 h-6" />
                <span>OpenBuild</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/badges"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Claim Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-[640px] mx-auto md:px-0">
        <Outlet />
      </div>
    </div>
  );
}
