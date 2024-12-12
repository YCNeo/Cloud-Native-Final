# Backend

## Installation & Run & Usage of Deno

### Installation and Configuration
- Use Ubuntu or powerShell
  Install Deno on Ubuntu and powershell if use Ubuntu
    ```bash
    # Ubuntu
    $ curl -fsSL https://deno.land/install.sh | sh
    $ deno -v

    # If use powerShell, only this step to install
    # powerShell
    $ winget install DenoLand.Deno
    $ deno -v
    ```
- Use mac
  - by yourselves - Neo

### Run
```bash
cd Cloud-Native-Final/src/backend-ts/

# install
deno install

# run 
deno run --allow-all index.ts
```

### Reference

- [Deno Docs](https://docs.deno.com/)
