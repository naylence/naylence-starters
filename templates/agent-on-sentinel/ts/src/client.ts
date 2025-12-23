/**
 * CLI Client - Sends a request to the EchoAgent and prints the response.
 *
 * This client demonstrates how to:
 * - Connect to a Naylence fabric
 * - Get a remote handle to an agent by its logical address
 * - Send a task and receive the response
 *
 * To customize: change the message or the agent address.
 */
import { withFabric } from "@naylence/runtime";
import { Agent, CLIENT_CONFIG } from "@naylence/agent-sdk";
import { AGENT_ADDR } from "./common.js";

async function main(): Promise<void> {
  await withFabric({ rootConfig: CLIENT_CONFIG }, async () => {
    // Get a handle to the remote agent by its logical address
    const remote = Agent.remoteByAddress(AGENT_ADDR);

    // Send a task and wait for the response
    const result = await remote.runTask("Hello, World!");

    // Print the result - the agent should echo it back
    console.log(result);
  });
}

// Run the client
main().catch((error) => {
  console.error("Client failed:", error);
  process.exit(1);
});
