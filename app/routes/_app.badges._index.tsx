import { Input, Button } from '@nextui-org/react';

export default function Badges() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Adventure X + OpenBuild Special Badge</h1>
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <Input  fullWidth placeholder="Input your Ethereum address or ENS name or email" className="mb-4" />
        <Button color="primary" className="mt-4">
          Claim Your Badge
        </Button>
      </div>
    </div>
  );
}