# Bundled Icons

Only the Iconify icons referenced by the portfolio are bundled in `src/data/iconsets.json` and registered in `src/index.js`. This removes runtime dependency on the external Iconify API. The generated JSON can be refreshed by running `node .tmp/download-portfolio-icons.cjs` from the workspace root.

Upstream icon collections and licenses:

- Material Design Icons: https://github.com/Templarian/MaterialDesign (Apache-2.0).
- SVG Logos: https://github.com/gilbarbara/logos (CC0-1.0).
- Simple Icons: https://github.com/simple-icons/simple-icons (CC0-1.0).
- VSCode Icons: https://github.com/vscode-icons/vscode-icons (CC-BY-4.0 for icons). The Visual Studio Code icon is attributed to the vscode-icons contributors; its appearance is unchanged.
- CoreUI Brands: https://github.com/coreui/coreui-icons (CC0-1.0 for free icons).

Brand marks remain the property of their respective owners and indicate technologies used or studied, not endorsement.
