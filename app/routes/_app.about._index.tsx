export default function AboutPage() {
	return (
		<div className="flex h-screen justify-center items-center">
			<div className="text-center">
				<div className="flex flex-col items-center">
					<img
						src="https://image.pseudoyu.com/images/adventurex-badge.jpg"
						alt="Badge Icon"
						className="w-24 h-24 mb-4"
					/>
					<h1 className="text-4xl font-bold mb-8">OpenBuild Activities</h1>
					<p>
						Customize a commemorative badge for each participant! This workshop
						uses Solidity to write smart contracts and React to build pages,
						implementing functions for the issuance, collection, and display of
						event commemorative badges, helping participants understand and get
						started with smart contract development.
					</p>
				</div>
			</div>
		</div>
	);
}
