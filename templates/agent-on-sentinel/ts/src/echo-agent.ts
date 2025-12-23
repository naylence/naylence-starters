/**
 * EchoAgent - A minimal agent that echoes back any payload it receives.
 *
 * This agent runs on a sentinel node and demonstrates the simplest possible
 * agent implementation. It:
 * - Extends BaseAgent from the Naylence Agent SDK
 * - Overrides runTask() to process incoming requests
 * - Registers itself at a logical address (AGENT_ADDR)
 *
 * To customize: modify the runTask() method to implement your own logic.
 */
import { withFabric } from "@naylence/runtime";
import { BaseAgent, SENTINEL_CONFIG } from "@naylence/agent-sdk";
import { AGENT_ADDR } from "./common.js";

class EchoAgent extends BaseAgent {
  /**
   * Process an incoming task request.
   *
   * @param payload - The data sent by the client
   * @returns The response to send back (in this case, the same payload)
   */
  async runTask(payload: any): Promise<any> {
    // Simply echo back whatever was received
    // Replace this with your own logic!
    return payload;
  }
}

async function main() {
  await withFabric({ rootConfig: SENTINEL_CONFIG }, async () => {
    console.log(`[EchoAgent] Starting at address: ${AGENT_ADDR}`);
    await new EchoAgent().aserve(AGENT_ADDR);
  });
}

// Start the agent when this module is run directly
main().catch((error) => {
  console.error("Echo agent failed:", error);
  process.exit(1);
});
