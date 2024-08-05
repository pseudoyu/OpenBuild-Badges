import { Button } from "@nextui-org/react";
import { Link } from "@remix-run/react";

export default function IndexPage() {
	return (
		<div className="flex h-screen justify-center items-center bg-gray-100">
			<div className="text-center">
				<div className="flex flex-col items-center">
					<img
						src="https://image.pseudoyu.com/images/adventurex-badge.jpg"
						alt="Badge Icon"
						className="w-24 h-24 mb-4"
					/>
					<h1 className="text-4xl font-bold mb-8">OpenBuild Activities</h1>
					<Link to="/badges" className="inline-block">
						<Button color="primary">Start Your Adventure</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
