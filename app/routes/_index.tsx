import { Button } from "@nextui-org/react";
import { Link } from "@remix-run/react";

export default function IndexPage() {
	return (
		<div className="flex h-screen justify-center items-center white">
			<div className="text-center">
				<div className="flex flex-col items-center">
					<img
						src="/openbuild.svg"
						alt="Badge Icon"
						className="w-24 h-24 mb-4 animate-pulse"
					/>
					<h1 className="text-4xl font-bold mb-8">OpenBuild & Invisible Garden</h1>
					<Link to="/badges" className="inline-block">
						<Button
							type="submit"
								className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg w-240"
							>
							Claim Your Badge
						</Button>
					</Link>
					<Link
						to="/about"
						className="text-sm text-gray-600 hover:text-gray-900 transition-colors pt-2"
					>
						About
					</Link>
				</div>
			</div>
		</div>
	);
}
