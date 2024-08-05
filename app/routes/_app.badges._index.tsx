import { Input, Button, Link } from "@nextui-org/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData, useNavigation } from "@remix-run/react";
import { isAddress } from "viem";
import { mintBadge } from "~/services/chain.server";

export const action = async (c: ActionFunctionArgs) => {
	const formData = await c.request.formData();
	const address = formData.get("address")?.toString().trim();

	// Validate address input
	if (!address) {
		return json({
			success: false,
			errors: {
				address: "Ethereum address is required",
			},
		});
	}

	if (!isAddress(address)) {
		return json({
			success: false,
			errors: {
				address: "Please provide a valid Ethereum address",
			},
		});
	}

	try {
		// Attempt to mint the badge
		const result = await mintBadge(address);
		if (result.success) {
			return json({
				success: true,
				transactionHash: result.transactionHash,
			});
		}

		// If minting was unsuccessful, return a JSON error
		return json({
			success: false,
			errors: {
				address: "Failed to mint the badge",
			},
		});
	} catch (error) {
		// Handle unexpected errors in minting process
		console.error("Minting error:", error);
		return json({
			success: false,
			errors: {
				address: "Error processing your request. Please try again later.",
			},
		});
	}
};

export default function Badges() {
	const actionData = useActionData<typeof action>();
	const errors = actionData?.errors;

	const navigation = useNavigation();

	return (
		<Form method="POST">
			<div className="flex flex-col items-center justify-center min-h-screen bg-white">
				<div className="text-center mb-6">
					<div className="flex flex-col items-center">
						<img
							src="https://image.pseudoyu.com/images/adventurex-badge.jpg"
							alt="Badge Icon"
							className="w-24 h-24 mb-4"
						/>
						<h1 className="text-3xl font-bold mb-4">OpenBuild Special Badge</h1>
					</div>
				</div>
				<div className="flex flex-col items-center w-full px-4">
					<Input
						fullWidth
						className="mb-4"
						name="address"
						label="Your Ethereum Address"
						isInvalid={!!errors?.address}
						errorMessage={errors?.address}
					/>
					<Button
						isLoading={navigation.state === "submitting"}
						type="submit"
						color="primary"
						className="mt-4"
					>
						Claim Your Badge
					</Button>
					{actionData?.success && (
						<div className="mt-4">
							<span className="text-success">Badge minted successfully! </span>
							<Link
								color="primary"
								href={`https://sepolia.etherscan.io/tx/${actionData.transactionHash}`}
								target="_blank"
							>
								View Transaction
							</Link>
						</div>
					)}
				</div>
			</div>
		</Form>
	);
}
