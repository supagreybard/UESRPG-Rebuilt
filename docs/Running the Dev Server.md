# Running the Foundry Dev Server
For developer convenience, I've set up a docker compose project in the project's `dev-server/` directory which is intended to run a clean, UESRPG-only instance of Foundry for local development purposes.

## Requirements
- You will need a Foundry VTT license to set up and run this dev server.
- You must have docker and docker compose installed and configured on your machine. If you're new to docker, visit Docker's [Getting Started](https://docs.docker.com/get-started/) page for more info.

## First-Time Setup
1. In a browser, head to the `Purchased Licenses` page of your account dashboard on foundryvtt.com.
2. Select the appropriate version in the `Download Version` drop-down.
3. Select the `Node.js` option in the `Operating System` drop-down and click download.
4. Unzip the contents of the downloaded .zip file into the `dev-server/foundryvtt` directory.
5. Open a terminal in the project root and run `npm i && npm run build`. 
6. Make sure the build went as expected and ensure that a build of the system package exists in `./dist`. If something went wrong, stop here and resolve before continuing.
5. Move into the `dev-server` directory (`cd ./dev-server`) and run `docker compose up -d`.`
6. Foundry should now be available at `localhost:30001` if everything went smoothly. Input your license key and set up the foundry instance as usual.

## Notes
- Foundry's data path is shared between the host and the dev server container at `dev-server/foundrydata`.
- `dist` is shared between the host and the container, pointing to `/data/foundry/Data/systems/uesrpg`. This should make your local build available in foundry as a system with no further action needed if your first time setup went as intended.
- Use `docker compose down` from the `dev-server` directory to spin down the foundry container.
