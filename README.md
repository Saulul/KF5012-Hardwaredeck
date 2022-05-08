
# Hardwaredeck E-commerce Website
KF5012 module files for a React-Strapi based ecommerce platform selling computer hardware.

## Project participants
- Elliot Potts (W20017851)
- Matthew Shaw (W20013772)
- Mehrdad Najarian (W20021818)
- Stefan Kovacs (W20000442)

## Project Structure
**Front-end React files**
- /public/
- /src/
- package-lock.json
- package.json

**Back-end CMS files**
- /backend/

## Dependencies & Installation
The Hardwaredeck project can be installed and hosted locally using the following commands.

*Clone the repository*
```bash
git clone https://github.com/Saulul/KF5012-Hardwaredeck
```

*Download the node_modules from package.json root*
```bash
npm install
```

*Installing Tensorflow*
```bash
npm install @tensorflow/tfjs @tensorflow-models/toxicity
```

*Running the CMS development server*
```bash
cd backend/hwdeck-cms
npm install
npm run strapi develop
```
The Strapi CMS server will now be running on http://localhost:1337.

*Running the Stripe server + Starting the React app*
```bash
npm start
```

## Deployment
*Not yet deployed. To be updated.*



