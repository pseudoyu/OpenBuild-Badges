import { Button } from '@nextui-org/react';
import { Link } from "@remix-run/react";

export default function IndexPage() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Adventure X + OpenBuild</h1>
        <Link to="/badges" className="inline-block">
          <Button
            color="primary"
          >
            Start Your Adventure
          </Button>
        </Link>
      </div>
    </div>
  );
}