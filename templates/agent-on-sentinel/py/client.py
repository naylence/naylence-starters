import asyncio

from common import AGENT_ADDR
from dotenv import load_dotenv
from naylence.agent import Agent, configs
from naylence.fame.core import FameFabric
from naylence.fame.util.logging import enable_logging


load_dotenv(".env.client")
enable_logging(log_level="warning")


async def main() -> None:
    async with FameFabric.create(root_config=configs.CLIENT_CONFIG):
        remote = Agent.remote(address=AGENT_ADDR)
        result = await remote.run_task("Hello, World!")
        print(result)


if __name__ == "__main__":
    asyncio.run(main())
