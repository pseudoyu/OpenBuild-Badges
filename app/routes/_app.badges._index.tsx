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
			<div className="w-full min-h-screen bg-gradient-to-b from-background to-background/95">
				<div className="w-full px-4 py-12">
					<div className="w-[95%] max-w-xl mx-auto">
						<div className="flex flex-col items-center">
							<img
								src="/openbuild.svg"
								alt="Badge Icon"
								className="w-24 h-24 mb-6 animate-pulse"
							/>
							<h2 className="text-2xl font-bold mb-8 text-foreground/90">OpenBuild & Invisible Garden</h2>

							<Input
								fullWidth
								className="mb-6"
								name="address"
								label="Your Ethereum Address"
								isInvalid={!!errors?.address}
								errorMessage={errors?.address}
								classNames={{
									input: "font-mono",
									label: "text-foreground/70"
								}}
							/>

							<Button
								isLoading={navigation.state === "submitting"}
								type="submit"
								className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg w-240"
							>
								Claim Your Badge
							</Button>

							{actionData?.success && (
								<div className="mt-6 text-center">
									<span className="text-success font-medium block mb-2">Badge minted successfully! </span>
									<Link
										color="primary"
										href={`https://sepolia.etherscan.io/tx/${actionData.transactionHash}`}
										target="_blank"
										className="font-mono text-sm hover:text-primary transition-colors"
									>
										View Transaction
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}
