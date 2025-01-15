# hetzner-vps-manager

This project is a Nuxt web app made using TailwindCSS and the Hetzner Cloud API.
It allows specific Discord users to start, stop, and delete Hetzner VPS.

I developed this project to enable non-technical users to easily manage Hetzner Cloud servers. It **saves all server data in snapshots before deleting them**, allowing users to relaunch them as needed. This method leverages **Hetzner's hourly billing** model, ensuring users only pay for the actual usage. Making it particularly advantageous for high-compute machines with minimal usage, such as game servers.

## 📑 Planned upgrades

- Internationalization (en and fr at least)
- Update a subdomain record on creation (IPs may change between creations)

## 📸 Preview

![App Server list page](https://i.imgur.com/GKFITkW.png)

![App Specific server page](https://i.imgur.com/cwmh7GM.png)

## 💻 Setup

> [!CAUTION]
> The misuse of the app could lead to unexpectedly high bills; only allow trusted people to interact with it.

In order to set up the app, you will need:
- A [Hetzner Cloud project](https://console.hetzner.cloud/projects), with its corresponding API Key
- A Discord account, a [Discord Developer Application](https://discord.com/developers/applications)
- The Discord unique names list of your most trusted friends  
- A catchy name for the website 😉

With everything listed, you just need to host the app: check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
